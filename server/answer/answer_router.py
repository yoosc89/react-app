from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from answer import answer_schema, answer_crud
from question import question_crud
from user.user_router import get_current_user
from models import User

router = APIRouter(
    prefix='/api/answer',
)


@router.post("/answer_create/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def answer_create(question_id: int, _answer_create: answer_schema.AnswerCreate,
                  db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    question = question_crud.get_question(db, question_id=question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    answer_crud.create_answer(db, question=question,
                              answer_create=_answer_create, user=current_user)


@router.get("/detail/answer/{question_id}", response_model=answer_schema.Answer)
def answer(question_id: int, db: Session = Depends(get_db)):
    answer = answer_crud.get_answer(db, question_id=question_id)
    return answer
