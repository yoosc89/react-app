from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware


from question import question_router
from answer import answer_router
from user import user_router


app = FastAPI()

origins = [
    'http://localhost:8000', 'http://localhost:3000', 'http://localhost'
]

app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=['*'], allow_headers=['*'],)


app.include_router(question_router.router)
app.include_router(answer_router.router)
app.include_router(user_router.router)
