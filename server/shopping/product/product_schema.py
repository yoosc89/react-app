import datetime
from pydantic import BaseModel, validator
from shopping.seller.seller_schema import ProductListSeller, ProductDetailSeller


class Product(BaseModel):
    id: int
    item_name: str
    item_content: str
    cache: int
    discount: int
    shipping_fee: int
    seller: ProductDetailSeller

    class Config:
        orm_mode = True


class ProductList(BaseModel):
    id: int
    item_name: str
    item_content: str
    cache: int
    discount: int
    shipping_fee: int
    seller: ProductListSeller

    class Config:
        orm_mode = True


class ProductLists(BaseModel):
    total: int = 0
    product_list: list[ProductList] = []

    class Config:
        orm_mode = True


class ProductCreate(BaseModel):
    item_name: str
    item_content: str
    cache: int = 0
    discount: int = 0
    shipping_fee: int = 0

    @validator('item_name', 'item_content')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 칸은 허용되지 않습니다')
        return v


class ProductUpdate(ProductCreate):
    product_id: int


class ProductPurchase(BaseModel):
    item_name: str

    class Config:
        orm_mode = True
