from datetime import datetime

from sqlalchemy.orm import Session

from answer.answer_schema import AnswerCreate, AnswerUpdate

from models import Question, Answer, User


def create_answer(db: Session, question: Question, answer_create: AnswerCreate, user: User):
    db_answer = Answer(
        question=question, content=answer_create.content, create_date=datetime.now(), user=user)
    db.add(db_answer)
    db.commit()
    answer = db.query(Answer).filter(
        Answer.content == answer_create.content and question.id == Answer.id).order_by(Answer.id.desc()).first()
    return answer


def get_answer(db: Session, answer_id: int):
    answer = db.query(Answer).get(answer_id)
    return answer


def question_answer(db: Session, question_id: int):
    answers = db.query(Answer).filter_by(question_id=question_id).all()
    total = len(answers)
    return total, answers


def update_answer(db: Session, db_answer: Answer,
                  answer_update: AnswerUpdate):
    db_answer.content = answer_update.content
    db_answer.modify_date = datetime.now()
    db.add(db_answer)
    db.commit()


def delete_answer(db: Session, db_answer: Answer):
    db.delete(db_answer)
    db.commit()
