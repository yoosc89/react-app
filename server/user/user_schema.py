from pydantic import BaseModel, validator, EmailStr


class UserCreate(BaseModel):
    user_id: str
    password1: str
    password2: str
    email: EmailStr
    phonenumber: str
    address1: str
    address2: str

    class Config:
        orm_mode = True

    @validator('user_id', 'password1', 'password2', 'email', 'phonenumber', 'address1', 'address2')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v

    @validator('password2')
    def passwords_match(cls, v, values):
        if 'password1' in values and v != values['password1']:
            raise ValueError('비밀법호가 일치하지 않습니다.')
        return v


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str


class User(BaseModel):
    id: int
    user_id: str
    email: str

    class Config:
        orm_mode = True
