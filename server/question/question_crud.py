from models import Question
from sqlalchemy.orm import Session
from datetime import datetime
from question.question_schema import QuestionCreate, QuestionUpdate
from user.user_schema import User


def get_question_list(db: Session, skip: int = 0, limit: int = 10):
    _question_list = db.query(Question).order_by(
        Question.create_date.desc())
    total = _question_list.count()
    question_list = _question_list.offset(skip).limit(limit).all()
    return total, question_list


def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question


def del_get_question_list(db: Session, question_idlist: list):
    question_list = []
    for i in question_idlist:
        question_list.append(db.query(Question).get(i.question_id))
    return question_list


def create_question(db: Session, question_create: QuestionCreate, user: User):

    db_question = Question(subject=question_create.subject,
                           content=question_create.content, create_date=datetime.now(), user=user)

    db.add(db_question)
    db.commit()
    question = db.query(Question).filter(
        Question.subject == question_create.subject and Question.content == question_create.content).order_by(Question.id.desc()).first()

    return question


def update_question(db: Session, db_question: Question, question_update: QuestionUpdate):
    db_question.subject = question_update.subject
    db_question.content = question_update.content
    db_question.modify_date = datetime.now()
    db.add(db_question)
    db.commit()


def delete_question(db: Session, db_question: list[Question]):
    print(db_question)
    for i in db_question:
        db.delete(i)
    db.commit()
