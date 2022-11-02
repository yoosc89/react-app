
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import json
import pymysql
import uuid
import os

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
    if id == 'undefined':
        return None

    cursor.execute(
        'select * from test_table where id> %s and id <= %s;', [id*10-1, (id+1)*10-1])
    output = cursor.fetchall()
    list = []
    for i in output:
        arrr = {'id': i[0], 'title': i[1], 'writer': i[2], 'date': i[3]}
        list.append(arrr)

    return list


@app.get('/allselect')
async def allselect():
    cursor.execute('select * from test_table order by id desc;')
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
    print(item_dict.values())
    cursor.executemany(
        'insert into test_table(subject_title, subject_writer, content, subject_date) values (%s,%s,%s,%s);', [list(item_dict.values())])
    conn.commit()
    return item_dict


@ app.post('/files')
async def create_files(file: UploadFile):
    UPLOAD_DIR = './photo'
    content = await file.read()
    filetype = file.content_type.split('/')[1]
    filename = f'{str(uuid.uuid4())}.{filetype}'

    with open(os.path.join(UPLOAD_DIR, filename), 'wb') as f:
        f.write(content)
    return {'filename': filename}
