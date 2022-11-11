from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from files import file_crud
from question import question_crud
from models import User
from user.user_router import get_current_user
from fastapi import UploadFile

router = APIRouter(
    prefix='/api/files'
)


@router.post('/upload_file', status_code=status.HTTP_204_NO_CONTENT)
def file_upload(question_id: int, _upload_file: list[UploadFile], db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    question = question_crud.get_question(db, question_id=question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    file_crud.upload_file(db, question=question,
                          upload_file=_upload_file, user=current_user)
