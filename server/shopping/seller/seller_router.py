from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette import status
from datetime import timedelta, datetime
from database import get_db
from . import seller_crud, seller_schema
from shopping.seller.seller_crud import pwd_context


ACCESS_TOKEN_EXPIRE_MINUTES = 10
SECRET_KEY = '2a5cff8a79313d7b3d75b700c6a0805ef0fe32199476d4d0c4518b830724f2fe'
ALGORITHM = 'HS256'
oauth2_cheme = OAuth2PasswordBearer(tokenUrl='/api/shopping/seller/login')

router = APIRouter(
    prefix='/api/shopping/seller'
)


@router.post('/existing', response_model=seller_schema.Exist)
def seller_existing(_seller_create: seller_schema.Existing, db: Session = Depends(get_db)):
    seller = seller_crud.existing_seller(
        db=db, seller_create=_seller_create)
    if seller:
        return {'exist': True}
    return {'exist': False}


@router.post('/create', status_code=status.HTTP_204_NO_CONTENT)
def seller_create(_seller_create: seller_schema.SellerCreate, db: Session = Depends(get_db)):
    seller = seller_crud.get_existing_seller(
        db=db, seller_create=_seller_create)
    if seller:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="이미 계정이 존재합니다.")
    seller_crud.create_seller(db=db, seller_create=_seller_create)


@router.post('/login', response_model=seller_schema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    seller = seller_crud.get_seller(db, form_data.username)
    if not seller or not pwd_context.verify(form_data.password, seller.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='계정 또는 비밀번호가 일치하지 않습니다', headers={'WWW-Authenticate': "Bearer"})

    data = {
        'sub': seller.user_id,
        'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        'access_token': access_token,
        'token_type': "Bearer",
        'user_id': seller.user_id,
        'mode': 'Seller'
    }


def get_current_seller(token: str = Depends(oauth2_cheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail='인증되지 않은 사용자 입니다', headers={'WWW-Authenticate': "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')

        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    else:
        seller = seller_crud.get_seller(db, seller_id=username)
        if seller is None:
            raise credentials_exception
        return seller
