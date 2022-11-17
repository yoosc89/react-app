from models import Seller
from datetime import datetime
from shopping.seller.seller_schema import SellerCreate, Existing
from passlib.context import CryptContext
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def get_seller(db: Session, seller_id: str):
    seller = db.query(Seller).filter(Seller.user_id == seller_id).first()
    return seller


def existing_seller(db: Session, seller_create: Existing):
    result = db.query(Seller).filter((Seller.user_id == seller_create.user_id) | (Seller.phone_number == seller_create.phone_number) | (
        Seller.email == seller_create.email) | (Seller.regist_number == seller_create.regist_number)).first()

    return result


def get_existing_seller(db: Session, seller_create: SellerCreate):
    result = db.query(Seller).filter((Seller.user_id == seller_create.user_id) | (Seller.phone_number == seller_create.phone_number) | (
        Seller.email == seller_create.email) | (Seller.regist_number == seller_create.regist_number)).first()
    return result


def create_seller(db: Session, seller_create: SellerCreate):
    seller = Seller(user_id=seller_create.user_id,
                    user_name=seller_create.user_name,
                    password=pwd_context.hash(seller_create.password1),
                    email=seller_create.email,
                    phone_number=seller_create.phone_number,
                    regist_number=seller_create.regist_number,
                    address1=seller_create.address1,
                    address2=seller_create.address2,
                    point=0,
                    cache=0,
                    create_date=datetime.now())
    db.add(seller)
    db.commit()
