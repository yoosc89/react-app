from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json
import os

with open(f'{os.getcwd()}/mysql_info.json')as f:
    DBINFO = json.load(f)

DB_URL = f"mysql+pymysql://{DBINFO['user']}:{DBINFO['password']}@{DBINFO['host']}:{DBINFO['port']}/{DBINFO['db']}?charset=utf8"

engine = create_engine(
    DB_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
