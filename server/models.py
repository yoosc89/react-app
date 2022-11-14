from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

from database import Base


class Question(Base):
    __tablename__ = 'question'

    id = Column(Integer, primary_key=True)
    subject = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey(
        "user.id"), nullable=True)
    user = relationship("User", backref="question_users")
    modify_date = Column(DateTime, nullable=True)


class Answer(Base):
    __tablename__ = 'answer'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)
    question_id = Column(Integer, ForeignKey(
        "question.id", ondelete="CASCADE"))
    question = relationship(
        "Question", backref=backref("answers", cascade='all,delete'))
    user_id = Column(Integer, ForeignKey(
        "user.id"), nullable=True)
    user = relationship("User", backref="answer_users")
    modify_date = Column(DateTime, nullable=True)


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    user_id = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phonenumber = Column(String(50), unique=True, nullable=False)
    address1 = Column(String(255), nullable=False)
    address2 = Column(String(255), nullable=False)


class File(Base):
    __tablename__ = 'file'

    id = Column(Integer, primary_key=True)
    file = Column(Text, nullable=True)
    create_date = Column(DateTime, nullable=False)
    question_id = Column(Integer, ForeignKey(
        'question.id'))
    question = relationship(
        "Question", backref=backref("files", cascade='all, delete', passive_deletes=True))
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User", backref="file_users")
