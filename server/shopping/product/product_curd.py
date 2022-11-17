from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import Product, Seller, ProductFile
from shopping.product import product_schema
from shopping.seller import seller_schema


def create_product(db: Session, product_create: product_schema.ProductCreate, seller: seller_schema.Seller):

    db_product = Product(item_name=product_create.item_name,
                         item_content=product_create.item_content, cache=product_create.cache, discount=product_create.discount, shipping_fee=product_create.shipping_fee, create_date=datetime.now(), close_date=datetime.now()+timedelta(days=93), seller=seller)

    db.add(db_product)
    db.commit()

    product = db.query(Product).filter(
        Product.item_name == product_create.item_name and Product.item_content == product_create.item_content).order_by(Product.id.desc()).first()

    return product


def get_product(db: Session, product_id: int):
    product = db.query(Product).get(product_id)
    return product


def get_product_list(db: Session, skip: int = 0, limit: int = 10):
    product_list = db.query(Product)
    total = product_list.distinct().count()
    product_list = product_list.order_by(
        Product.create_date.desc()).offset(skip).limit(limit).distinct().all()
    return total, product_list


def update_product(db: Session, db_product: Product, product_update: product_schema.ProductUpdate):
    db_product.item_name = product_update.item_content
    db_product.item_content = product_update.item_content
    db_product.cache = product_update.cache
    db_product.discount = product_update.discount
    db_product.shipping_fee = product_update.shipping_fee
    db_product.modify_date = datetime.now()
    db.add(db_product)
    db.commit()


def update_close_product(db: Session, db_product: Product, product_update: product_schema.ProductUpdate):
    db_product.close_date = db_product.close_date+timedelta(days=93)
    db.add(db_product)
    db.commit()
