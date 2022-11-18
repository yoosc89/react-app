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
        "user.id", ondelete='CASCADE'), nullable=True)
    user = relationship("User", backref=backref(
        "question_user", cascade='all,delete'))
    modify_date = Column(DateTime, nullable=True)


class Answer(Base):
    __tablename__ = 'answer'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)
    question_id = Column(Integer, ForeignKey(
        "question.id", ondelete="CASCADE"))
    question = relationship(
        "Question", backref=backref("answers_question", cascade='all,delete'))
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
        'question.id', ondelete="CASCADE"))
    question = relationship(
        "Question", backref=backref("file_question", cascade='all, delete'))
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User", backref="file_users")


class Consumer(Base):
    __tablename__ = 'consumer'

    id = Column(Integer, primary_key=True)
    user_id = Column(String(30), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    user_name = Column(String(30), nullable=False)
    phone_number = Column(String(20), unique=True, nullable=False)
    address1 = Column(String(100), nullable=False)
    address2 = Column(String(100), nullable=False)
    point = Column(Integer, nullable=False)
    cache = Column(Integer, nullable=False)
    create_date = Column(DateTime, nullable=False)


class Seller(Base):
    __tablename__ = 'seller'

    id = Column(Integer, primary_key=True)
    user_id = Column(String(30), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    user_name = Column(String(30), nullable=False)
    phone_number = Column(String(20), unique=True, nullable=False)
    regist_number = Column(String(20), unique=True, nullable=False)
    address1 = Column(String(100), nullable=False)
    address2 = Column(String(100), nullable=False)
    point = Column(Integer, nullable=False)
    cache = Column(Integer, nullable=False)
    create_date = Column(DateTime, nullable=False)


class Product(Base):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True)
    item_name = Column(String(30), nullable=False)
    item_content = Column(Text, nullable=False)
    cache = Column(Integer, nullable=False)
    create_date = Column(DateTime, nullable=False)
    modify_date = Column(DateTime, nullable=True)
    close_date = Column(DateTime, nullable=False)
    discount = Column(Integer, nullable=True)
    shipping_fee = Column(Integer, nullable=True)
    seller_id = Column(Integer, ForeignKey(
        'seller.id', ondelete='CASCADE'))
    seller = relationship('Seller', backref=backref(
        'product_seller', cascade='all, delete'))


class ProductFile(Base):
    __tablename__ = 'productfile'

    id = Column(Integer, primary_key=True)
    path = Column(String(255), nullable=True)
    product_id = Column(Integer, ForeignKey('product.id', ondelete="CASCADE"))
    product = relationship('Product', backref=backref(
        'file_products', cascade='all, delete'))


class Purchase(Base):
    __tablename__ = 'purchase'

    id = Column(Integer, primary_key=True)
    purchase_number = Column(String(100), nullable=False, unique=True)
    count = Column(Integer, nullable=False)
    cache = Column(Integer, nullable=False)
    create_date = Column(DateTime, nullable=False)
    name = Column(String(20), nullable=False)
    shipping_fee = Column(Integer, nullable=False)
    phone_number = Column(String(20), nullable=False)
    address1 = Column(String(50), nullable=False)
    address2 = Column(String(50), nullable=False)
    consumer_id = Column(Integer, ForeignKey(
        'consumer.id', ondelete='CASCADE'))
    consumer = relationship('Consumer', backref=backref(
        'pruchase_consumer', cascade='all, delete'))
    product_id = Column(Integer, ForeignKey(
        'product.id', ondelete='CASCADE'))
    product = relationship('Product', backref=backref(
        'purchase_product', cascade='all, delete'))


class Sale(Base):
    __tablename__ = 'sale'

    id = Column(Integer, primary_key=True)
    purchase_id = Column(Integer, ForeignKey(
        'purchase.id', ondelete="CASCADE"))
    purchase = relationship('Purchase', backref=backref(
        'sale_purchase', cascade='all, delete'))
    product_id = Column(Integer, ForeignKey(
        'product.id', ondelete="CASCADE"))
    product = relationship('Product', backref=backref(
        'sale_product', cascade='all, delete'))
