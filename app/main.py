from fastapi import FastAPI,Request,Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import items, users,admin,test,news_clip
from dependencies import get_query_token, get_token_header
from models.SolrNewsClip import SolrNewsClip       #プロジェクト内モジュール
from fastapi.responses import StreamingResponse

#from fastapi_csrf_protect import CsrfProtect
#from fastapi_csrf_protect.exceptions import CsrfProtectError

app = FastAPI(dependencies=[Depends(get_query_token)])
app.include_router(users.router)
app.include_router(items.router)
app.include_router(test.router) #色々な機能のテスト用
app.include_router(news_clip.router) #色々な機能のテスト用

app.include_router(
    admin.router,
    prefix='/admin',
    tags=['admin'],
    dependencies=[Depends(get_token_header)],
    responses={418: {'description': 'admin'}},
)

app.mount('/static', StaticFiles(directory='static'), name='static')    #テンプレート内部で'static'と記載した場合のパスを指定している？
templates = Jinja2Templates(directory='templates')

@app.get('/', response_class=HTMLResponse)  #戻り値(response)をjsonではなくhtmlにする場合は左記のようにレスポンスクラスを指定
async def root(request:Request):
    return templates.TemplateResponse('saikutu.html', {'request': request,})
    #id = 3
    #lists = [1,2,3,4]
    #return templates.TemplateResponse('sample.html', {'request': request, 'id': id,'lists':lists})

@app.get('/favicon.ico')
async def favicon():
    file_like = open('static/favicons/favicon.ico', mode="rb")
    return StreamingResponse(file_like, media_type="image/png")
