from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from models import Question
from . import question_schema, question_crud

router = APIRouter(prefix='/api/question')


@router.get('/list', response_model=list[question_schema.Question])
def question_list(db: Session = Depends(get_db)):
    _question_list = question_crud.get_question_list(db)

    return _question_list


@router.get("/list/detail/{question_id}", response_model=question_schema.Question)
def question_detail(question_id: int, db: Session = Depends(get_db)):
    question = question_crud.get_question(db, question_id=question_id)
    return question


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def question_create(_question_cretae: question_schema.QusetionCreate, db: Session = Depends(get_db)):
    question_crud.create_question(db=db, question_create=_question_cretae)
