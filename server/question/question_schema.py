import datetime
from pydantic import BaseModel, validator

from answer.answer_schema import Answer


class Question(BaseModel):
    id: int
    subject: str
    content: str
    create_date: datetime.datetime
    answers: list[Answer] = []

    class Config:
        orm_mode = True


class QusetionCreate(BaseModel):
    subject: str
    content: str

    @validator('subject', 'content')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 칸은 허용되지 않습니다.')
        return v
