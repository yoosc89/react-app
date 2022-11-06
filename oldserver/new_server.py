
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from pydantic import BaseModel
import json
import pymysql
from sqlalchemy.ext.declarative import declarative
from sqlalchemy.orm import sessionmaker


with open("mysql_info.json") as f:
    DBINFO = json.load(f)

DB_URL = f"myslq+pymysql://{DBINFO['user']}:{DBINFO['password']}@{DBINFO['host']}:{DBINFO['host']}:{DBINFO['port']}/{DBINFO['db']}?charset=utf8"

engine = create_engine(DB_URL, encoding='utf-8')


app = FastAPI()

origins = ['http://192.168.0.43:8000',
           'http://192.168.0.43', 'http://192.168.0.43:3000', 'http://192.168.0.43:80', 'http://localhost', 'http://localhost:3000', 'http://localhost:8000']
app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
