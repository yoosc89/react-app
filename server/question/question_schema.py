import datetime
from pydantic import BaseModel, validator

from answer.answer_schema import Answer
from user.user_schema import User
from files.file_schema import File


class Question(BaseModel):
    id: int
    subject: str
    content: str
    create_date: datetime.datetime
    answers_question: list[Answer] = []
    user: User | None
    file_question: list[File] = []

    class Config:
        orm_mode = True


class QuestionCreate(BaseModel):
    subject: str
    content: str

    @validator('subject', 'content')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 칸은 허용되지 않습니다.')
        return v


class QuestionUpdate(QuestionCreate):
    question_id: int


class QuestionList(BaseModel):
    total: int = 0
    question_list: list[Question] = []

    class Config:
        orm_mode = True


class QuestionDelete(BaseModel):
    question_id: int


class QuestionDeleteList(BaseModel):
    question_idlist: list[QuestionDelete]


class QuestionResModel(BaseModel):
    id: int
    subject: str
    content: str

    class Config:
        orm_mode = True
