
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from datetime import datetime
import json
import pymysql
import uuid
import os
import jwt

with open("mysql_info.json") as f:
    mysql_info = json.load(f)

conn = pymysql.connect(host=mysql_info['host'], user=mysql_info['user'],
                       password=mysql_info['password'], db=mysql_info['db'], charset='utf8')
cursor = conn.cursor()

app = FastAPI()

origins = ['http://192.168.0.43:8000',
           'http://192.168.0.43', 'http://192.168.0.43:3000', 'http://192.168.0.43:80', 'http://localhost', 'http://localhost:3000', 'http://localhost:8000']
app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=['*'], allow_headers=['*'])


def convert_list_to_dict(tuple: tuple):
    dict = []
    for i in tuple:
        arrr = {'id': i[0], 'title': i[1],
                'writer': i[2], 'content': i[4], 'date': i[3]}
        dict.append(arrr)
    return dict


@app.get('/contents/lastnumber')
async def lastnumber():
    cursor.execute('select id from test_table order by id desc limit 1')
    lastid = cursor.fetchall()[0][0]
    return lastid


@app.get('/contents/{id}')
async def select(id: int):
    id -= 1
    if id == 'undefined':
        return None

    cursor.execute('select id from test_table order by id desc limit 1')
    lastid = cursor.fetchall()[0][0]

    cursor.execute(
        'select * from test_table  where id<= %s and id > %s order by id desc;', [lastid-(id*10), lastid-((id+1)*10)])
    output = cursor.fetchall()

    return convert_list_to_dict(output)


@app.get('/allselect')
async def allselect():
    cursor.execute('select * from test_table order by id desc;')
    output = cursor.fetchall()

    return convert_list_to_dict(output)


class Item(BaseModel):
    title: str
    writer: str
    content: str


@app.post('/post')
async def create_title(item: Item):
    item_dict = item.dict()

    item_dict['date'] = datetime.now().strftime("%Y%m%d%H%M%S")

    cursor.executemany(
        'insert into test_table(subject_title, subject_writer, content, subject_date) values (%s,%s,%s,%s);', [list(item_dict.values())])
    conn.commit()
    return item_dict


@app.post('/files')
async def create_files(file: UploadFile):
    UPLOAD_DIR = './photo'
    content = await file.read()
    filetype = file.content_type.split('/')[1]
    filename = f'{str(uuid.uuid4())}.{filetype}'

    with open(os.path.join(UPLOAD_DIR, filename), 'wb') as f:
        f.write(content)
    return {'filename': filename}


class ContentItem(BaseModel):
    id: int
    title: str
    writer: str
    content: str


@app.get('/content/{id}')
async def content_search(id: int):
    cursor.execute('select * from test_table where id = %s;', id)
    output = cursor.fetchall()
    dict = convert_list_to_dict(output)
    dict[0]['disablewriter'] = 'true'
    return dict


@app.post('/content/modify')
async def modify_content(item: ContentItem):
    item_dict = item.dict()

    cursor.execute(
        "update test_table set subject_title = %s, subject_writer =%s, content =%s where id= %s ", [item_dict['title'], item_dict['writer'], item_dict['content'], item_dict['id'], ])
    conn.commit()
    return item_dict


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='tokent')
