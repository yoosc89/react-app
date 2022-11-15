from models import Consumer
from datetime import datetime
from shopping.consumer.consumer_schema import ConsumerCreate
from passlib.context import CryptContext
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def get_consumer(db: Session, consumer_id: int):
    consumer = db.query(Consumer).get(consumer_id)
    return consumer


def get_existing_consumer(db: Session, consumer_create: ConsumerCreate):
    return db.query(Consumer).filter(Consumer.user_id == consumer_create.user_id | Consumer.user_name == consumer_create.user_id).first()


def create_consumer(db: Session, consumer_create: ConsumerCreate):
    consumer = Consumer(user_id=consumer_create.user_id,
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
