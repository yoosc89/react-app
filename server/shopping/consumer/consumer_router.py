from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette import status
from datetime import timedelta, datetime
from database import get_db
from . import consumer_crud, consumer_schema
from shopping.consumer.consumer_crud import pwd_context


ACCESS_TOKEN_EXPIRE_MINUTES = 60*24
SECRET_KEY = '2a5cff8a79313d7b3d75b700c6a0805ef0fe32199476d4d0c4518b830724f2fe'
ALGORITHM = 'HS256'
oauth2_cheme = OAuth2PasswordBearer(tokenUrl='/api/shopping/consumer/login')

router = APIRouter(
    prefix='/api/shopping/consumer'
)


@router.post('/existing', response_model=consumer_schema.Exist)
def consumer_existing(_consumer_create: consumer_schema.Existing, db: Session = Depends(get_db)):
    consumer = consumer_crud.existing_consumer(
        db=db, consumer_create=_consumer_create)
    if consumer:
        return {'exist': True}
    return {'exist': False}


@router.post('/create', status_code=status.HTTP_204_NO_CONTENT)
def consumer_create(_consumer_create: consumer_schema.ConsumerCreate, db: Session = Depends(get_db)):
    consumer = consumer_crud.get_existing_consumer(
        db=db, consumer_create=_consumer_create)
    if consumer:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="이미 계정이 존재합니다.")
    consumer_crud.create_consumer(db=db, consumer_create=_consumer_create)


@router.post('/login', response_model=consumer_schema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    consumer = consumer_crud.get_consumer(db, form_data.username)
    if not consumer or not pwd_context.verify(form_data.password, consumer.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='계정 또는 비밀번호가 일치하지 않습니다', headers={'WWW-Authenticate': "Bearer"})

    data = {
        'sub': consumer.user_id,
        'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        'access_token': access_token,
        'token_type': "Bearer",
        'user_id': consumer.user_id,
        'mode': 'Consumer'
    }


@router.get('/getaccount', response_model=consumer_schema.ConsumerOrder)
def get_current_consumer(token: str = Depends(oauth2_cheme), db: Session = Depends(get_db)):
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
        consumer = consumer_crud.get_consumer(db, consumer_id=username)
        if consumer is None:
            raise credentials_exception
        return consumer
