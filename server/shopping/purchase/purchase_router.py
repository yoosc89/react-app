from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Consumer, Product
from shopping.consumer.consumer_router import get_current_consumer
from shopping.product.product_router import get_current_product
from shopping.purchase import purchase_crud, purchase_schema


router = APIRouter(
    prefix='/api/shopping/purchase'
)


@router.get('/list', response_model=purchase_schema.PurchaseLists)
def get_purchase_list(db: Session = Depends(get_db), current_consumer: Consumer = Depends(get_current_consumer), page: int = 0, size: int = 10):
    total, _purchase_list = purchase_crud.get_purchase_list(
        db, skip=page*size, limit=size, consumer=current_consumer)

    return {'total': total, 'purchase_list': _purchase_list}


@router.get("/list/detail/{purchase_id}", response_model=purchase_schema.PurchaseCreate)
def purchase_detail(purchase_id: int, db: Session = Depends(get_db)):
    purchase = purchase_crud.get_purchase(db, purchase_id=purchase_id)
    return purchase


@router.get("/detail/{purchase_id}", response_model=purchase_schema.PurchaseDetail)
def purchase_detail(purchase_id: int, db: Session = Depends(get_db)):
    purchase = purchase_crud.get_purchase(db, purchase_id=purchase_id)
    return purchase


@router.post("/create")
def purchase_create(_purchase_cretae: purchase_schema.PurchaseCreate, db: Session = Depends(get_db), current_consumer: Consumer = Depends(get_current_consumer), current_product: Product = Depends(get_current_product)):
    purchase_crud.create_purchase(
        db=db, purchase_create=_purchase_cretae,
        consumer=current_consumer, product=current_product)
