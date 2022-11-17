from pydantic import BaseModel, validator, EmailStr


class SellerCreate(BaseModel):
    user_id: str
    email: EmailStr
    user_name: str
    password1: str
    password2: str
    phone_number: str
    regist_number: str
    address1: str
    address2: str
    point: int
    cache: int

    class Config:
        orm_mode = True

    @validator('user_id', 'user_name', 'password1', 'password2', 'phone_number', 'address1', 'address2', 'regist_number')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다')
        return v

    @validator('password2')
    def passwords_match(cls, v, values):
        if 'password1' in values and v != values['password1']:
            raise ValueError('비밀번호가 일치 하지 않습니다')
        return v


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    mode: str


class Seller(BaseModel):
    id: int
    user_id: int
    user_name: str
    email: str
    point: int
    cache: int


class ProductListSeller(BaseModel):
    user_name: str

    class Config:
        orm_mode = True


class ProductDetailSeller(BaseModel):
    user_name:  str
    phone_number: str
    regist_number: str
    address1: str
    address2: str
    email: EmailStr

    class Config:
        orm_mode = True


class Existing(BaseModel):
    user_id: str | None
    email: EmailStr | None
    phone_number: str | None
    regist_number: str | None

    class Config:
        orm_mode = True


class Exist(BaseModel):
    exist: bool
