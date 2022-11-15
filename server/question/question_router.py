from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from models import User
from . import question_schema, question_crud
from user.user_router import get_current_user


router = APIRouter(prefix='/api/question')


@router.get('/list', response_model=question_schema.QuestionList)
def question_list(db: Session = Depends(get_db), page: int = 0, size: int = 10, keyword: str = ''):
    total, _question_list = question_crud.get_question_list(
        db, skip=page*size, limit=size, keyword=keyword)

    return {'total': total, 'question_list': _question_list}


@router.get("/list/detail/{question_id}", response_model=question_schema.Question)
def question_detail(question_id: int, db: Session = Depends(get_db)):
    question = question_crud.get_question(db, question_id=question_id)
    return question


@router.post("/create", response_model=question_schema.Question)
def question_create(_question_cretae: question_schema.QuestionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    question = question_crud.create_question(
        db=db, question_create=_question_cretae, user=current_user)

    return question


@router.put('/update', status_code=status.HTTP_204_NO_CONTENT)
def question_update(_question_update: question_schema.QuestionUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = question_crud.get_question(
        db, question_id=_question_update.question_id)
    if not db_question:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='데이터를 찾을 수 없습니다.')
    if current_user.id != db_question.user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='수정 권한이 없습니다')

    result = question_crud.update_question(
        db=db, db_question=db_question, question_update=_question_update)


@router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
def question_delete(_question_delete: question_schema.QuestionDeleteList,
                    db: Session = Depends(get_db),
                    current_user: User = Depends(get_current_user)):
    db_question = question_crud.del_get_question_list(
        db, question_idlist=_question_delete.question_idlist)

    if not db_question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="데이터를 찾을수 없습니다.")
    del_db = [i for i in db_question if current_user.id == i.user.id]

    question_crud.delete_question(db=db, db_question=del_db)
