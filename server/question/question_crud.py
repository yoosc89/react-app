from datetime import datetime

from models import Answer, Question, User
from question.question_schema import QuestionCreate, QuestionUpdate
from sqlalchemy.orm import Session
from user import user_schema


def get_question_list(db: Session, skip: int = 0, limit: int = 10, keyword: str = ''):
    question_list = db.query(Question)
    if keyword:
        search = '%%{}%%'.format(keyword)
        sub_query = db.query(Answer.question_id, Answer.content, User.user_id).outerjoin(
            User, Answer.user_id == User.id).subquery()
        question_list = question_list.outerjoin(User).outerjoin(sub_query, sub_query.c.question_id == Question.id).filter(Question.subject.ilike(search) |

                                                                                                                          Question.content.ilike(search) |

                                                                                                                          User.user_id.ilike(search) |

                                                                                                                          sub_query.c.content.ilike(search) |
                                                                                                                          sub_query.c.user_id.ilike(
                                                                                                                              search))
    total = question_list.distinct().count()
    question_list = question_list.order_by(
        Question.create_date.desc()).offset(skip).limit(limit).distinct().all()
    return total, question_list


def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question


def del_get_question_list(db: Session, question_idlist: list):
    question_list = []
    for i in question_idlist:
        question_list.append(db.query(Question).get(i.question_id))
    return question_list


def create_question(db: Session, question_create: QuestionCreate, user: user_schema.User):

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
    for i in db_question:
        db.delete(i)
    db.commit()
