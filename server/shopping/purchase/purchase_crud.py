from datetime import datetime

from models import Purchase
from shopping.consumer import consumer_schema
from shopping.purchase import purchase_schema
from shopping.product import product_schema
from sqlalchemy.orm import Session
import random


def create_purchase(db: Session, purchase_create: purchase_schema.PurchaseCreate,
                    consumer: consumer_schema.Consumer, product : product_schema.Product ):
    purchase_number1 = datetime.utcnow().strftime(f'%Y%m%d%H%M%S_%f{random.randrange(1000,9999)}')
    db_purchase = Purchase(name=purchase_create.name,
                           phone_number=purchase_create.phone_number,
                           address1=purchase_create.address1,
                           address2=purchase_create.address2,
                           count=purchase_create.count,
                           cache=purchase_create.cache,
                           shipping_fee=purchase_create.shipping_fee,
                           create_date=datetime.now(),
                           purchase_number=purchase_number1, 
                           consumer=consumer,
                           product=product
                           )
    
    db.add(db_purchase)
    db.commit()

def get_purchase(db: Session, purchase_id: int):
    purchase = db.query(Purchase).get(purchase_id)
    return purchase

def get_purchase_list(db: Session,consumer:consumer_schema.Consumer, skip: int = 0, limit: int = 10):
    purchase_list = db.query(Purchase).filter(Purchase.consumer_id == consumer.id)
    total = purchase_list.distinct().count()
    purchase_list = purchase_list.order_by(
        Purchase.create_date.desc()).offset(skip).limit(limit).distinct().all()
    return total, purchase_list