from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Question(Base):
    __tablename__ = 'question'

    id = Column(Integer, primary_key=True)
    subject = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)


class Answer(Base):
    __tablename__ = 'answer'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)
    question_id = Column(Integer, ForeignKey("question.id"))
    question = relationship("Question", backref="answers")


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    user_id = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phonenumber = Column(String(50), unique=True, nullable=False)
    address1 = Column(String(255), nullable=False)
    address2 = Column(String(255), nullable=False)
