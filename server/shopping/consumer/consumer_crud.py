from models import Consumer
from datetime import datetime
from shopping.consumer.consumer_schema import ConsumerCreate, Existing
from passlib.context import CryptContext
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def get_consumer(db: Session, consumer_id: str):
    consumer = db.query(Consumer).filter(Consumer.user_id == consumer_id).first()
    return consumer


def existing_consumer(db: Session, consumer_create: Existing):
    result = db.query(Consumer).filter((Consumer.user_id == consumer_create.user_id) | (
        Consumer.phone_number == consumer_create.phone_number) | (Consumer.email == consumer_create.email)).first()

    return result


def get_existing_consumer(db: Session, consumer_create: ConsumerCreate):
    result = db.query(Consumer).filter((Consumer.user_id == consumer_create.user_id) | (
        Consumer.phone_number == consumer_create.phone_number) | (Consumer.email == consumer_create.email)).first()
    return result


def create_consumer(db: Session, consumer_create: ConsumerCreate):
    consumer = Consumer(user_id=consumer_create.user_id,
                        user_name=consumer_create.user_name,
                        password=pwd_context.hash(consumer_create.password1),
                        email=consumer_create.email,
                        phone_number=consumer_create.phone_number,
                        address1=consumer_create.address1,
                        address2=consumer_create.address2,
                        point=0,
                        cache=0,
                        create_date=datetime.now())
    db.add(consumer)
    db.commit()
