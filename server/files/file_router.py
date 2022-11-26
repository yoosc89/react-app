from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session
from starlette import status
from models import User
from database import get_db
from files import file_crud
from question import question_crud
from user.user_router import get_current_user
from fastapi.responses import FileResponse
import os


router = APIRouter(
    prefix='/api/files'
)

UPLOAD_DIR = os.path.abspath(os.getcwd())


@router.post('/upload_file', status_code=status.HTTP_204_NO_CONTENT)
def file_upload(question_id: int, _upload_file: list[UploadFile], db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    question = question_crud.get_question(db, question_id=question_id)
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    file_crud.upload_file(db, question=question,
                          upload_file=_upload_file, user=current_user)


@router.get('/question/{file_id}', response_class=FileResponse)
def question_upload_file(file_id: int, db: Session = Depends(get_db)):
    filepath = file_crud.question_file(db, file_id=file_id)
    return filepath
