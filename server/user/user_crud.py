from passlib.context import CryptContext
from sqlalchemy.orm import Session
from user.user_schema import UserCreate
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(db: Session, user_create: UserCreate):
    db_user = User(user_id=user_create.user_id,
                   password=pwd_context.hash(user_create.password1),
                   email=user_create.email,
                   phonenumber=user_create.phonenumber,
                   address1=user_create.address1,
                   address2=user_create.address2
                   )
    db.add(db_user)
    db.commit()


def get_existing_user(db: Session, user_create: UserCreate):
    return db.query(User).filter(
        (User.user_id == user_create.user_id) |
        (User.email == user_create.email)
    ).first()


def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.user_id == user_id).first()
