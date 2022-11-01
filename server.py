from django.template import Origin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import json
import pymysql

with open("mysql_info.json") as f:
    mysql_info = json.load(f)

conn = pymysql.connect(host=mysql_info['host'], user=mysql_info['user'],
                       password=mysql_info['password'], db=mysql_info['db'], charset='utf8')
cursor = conn.cursor()

app = FastAPI()

origins = ['http://localhost:8000',
           'http://localhost:3000',
           'http://localhost']
app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=['*'], allow_headers=['*'])


@app.get('/select/{id}')
async def select(id: int):
    cursor.execute(
        'select * from test_table where id> %s and id <= %s;', [id*10-1, (id+1)*10-1])
    output = cursor.fetchall()
    list = []
    for i in output:
        arrr = {'id': i[0], 'title': i[1], 'writer': i[2], 'date': i[3]}
        list.append(arrr)

    return list


class Item(BaseModel):
    title: str
    writer: str
    content: str


@app.post('/post')
async def create_title(item: Item):
    item_dict = item.dict()

    item_dict['date'] = datetime.now().strftime("%Y%m%d%H%M%S")
    print(item_dict)
    return item_dict