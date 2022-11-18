from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Seller
from shopping.seller.seller_router import get_current_seller
from shopping.product import product_curd, product_schema


router = APIRouter(
    prefix='/api/shopping/product'
)


@router.get('/list', response_model=product_schema.ProductLists)
def get_product_list(db: Session = Depends(get_db), page: int = 0, size: int = 10):
    total, _product_list = product_curd.get_product_list(
        db, skip=page*size, limit=size)

    return {'total': total, 'product_list': _product_list}


@router.get("/list/detail/{product_id}", response_model=product_schema.Product)
def product_detail(product_id: int, db: Session = Depends(get_db)):
    product = product_curd.get_product(db, product_id=product_id)
    return product


@router.post("/create", response_model=product_schema.Product)
def product_create(_product_cretae: product_schema.ProductCreate, db: Session = Depends(get_db), current_seller: Seller = Depends(get_current_seller)):
    product = product_curd.create_product(
        db=db, product_create=_product_cretae, seller=current_seller)
    return product


@router.put('/update', status_code=status.HTTP_204_NO_CONTENT)
def product_update(_product_update: product_schema.ProductUpdate, db: Session = Depends(get_db), current_seller: Seller = Depends(get_current_seller)):
    db_product = product_curd.get_product(
        db, product_id=_product_update.product_id)
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='데이터를 찾을 수 없습니다.')
    if current_seller.id != db_product.seller_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='수정 권한이 없습니다')
    product_curd.update_product(
        db=db, db_product=db_product, product_update=_product_update)

def get_current_product(product_id : int, db: Session = Depends(get_db)):
    product = product_curd.get_product(db,product_id=product_id)
    return product
    