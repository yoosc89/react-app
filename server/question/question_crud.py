from models import Question
from sqlalchemy.orm import Session
from datetime import datetime
from question.question_schema import QusetionCreate


def get_question_list(db: Session):
    question_list = db.query(Question).order_by(
        Question.create_date.desc()).all()
    return question_list


def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question


def create_question(db: Session, question_create: QusetionCreate):
    db_question = Question(subject=question_create.subject,
                           content=question_create.content, create_date=datetime.now())
    db.add(db_question)
    db.commit()
