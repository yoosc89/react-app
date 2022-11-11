from pydantic import BaseModel
import datetime
from user.user_schema import User
from fastapi import UploadFile


class File(UploadFile):
    id: int
    file: list[UploadFile] = []
    create_date: datetime.datetime
    question_id: int
    user: User | None

    class Config:
        orm_mode = True
