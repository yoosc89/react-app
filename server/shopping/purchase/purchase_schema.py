import datetime
from pydantic import BaseModel, validator
from shopping.product.product_schema import Product, ProductPurchase
from shopping.consumer.consumer_schema import Consumer, ConsumerOrder


class Purchase(BaseModel):
    id: int
    purchase_number: int
    count: int
    cache: int
    create_date: datetime.datetime
    phone_number: str
    address1: str
    address2: str
    shipping_fee: int
    product: Product
    cunsumer: Consumer

    class Config:
        orm_mode: True


class PurchaseCreate(BaseModel):
    count: int
    cache: int
    name: str
    phone_number: str
    address1: str
    address2: str
    shipping_fee: int

    class Config:
        orm_mode = True

    @validator('phone_number', 'address1', 'address2', 'name')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다')
        return v


class PurchaseList(BaseModel):
    id: int
    purchase_number: str
    count: int
    cache: int
    shipping_fee: int
    create_date: datetime.datetime
    name: str
    phone_number: str
    address1: str
    address2: str
    product: ProductPurchase

    class Config:
        orm_mode = True


class PurchaseLists(BaseModel):
    total: int
    purchase_list: list[PurchaseList] | None

    class Config:
        orm_mode = True


class PurchaseDetail(PurchaseList):
    product: Product
    consumer: ConsumerOrder

    class Config:
        orm_mode = True
