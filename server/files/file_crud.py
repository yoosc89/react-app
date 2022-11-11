from fastapi import UploadFile
from models import File
from sqlalchemy.orm import Session
from datetime import datetime
import uuid
import os
from models import Question, User

UPLOAD_DIR = os.path.abspath(os.getcwd())


def upload_file(db: Session, upload_file: list[UploadFile], user: User, question: Question):

    for i in upload_file:
        content = i.file.read()
        filetype = i.content_type.split('/')[-1]
        filename = f'{str(uuid.uuid4())}.{filetype}'
        db_file = File(question=question, file=filename,
                       create_date=datetime.now(), user=user)
        db.add(db_file)

        with open(os.path.join(UPLOAD_DIR+'/data', filename), 'wb') as f:
            f.write(content)

    db.commit()
