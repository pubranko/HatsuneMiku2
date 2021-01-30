from fastapi import APIRouter, Depends, HTTPException
from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from models.SolrNewsClip import SolrNewsClip       #プロジェクト内モジュール
from dependencies import get_token_header
from pydantic import BaseModel      #pydantic：バリデーション
from typing import Optional

router = APIRouter(
    prefix="/test",
    tags=["test"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

router.mount("/static", StaticFiles(directory="static"), name="static")    #テンプレート内部で"static"と記載した場合のパスを指定している？
templates = Jinja2Templates(directory="templates")


@router.get("/", response_class=HTMLResponse)
async def test(request:Request):
    return templates.TemplateResponse("test.html", {"request": request,})


@router.get("/jinja2", response_class=HTMLResponse)  #戻り値(response)をjsonではなくhtmlにする場合は左記のようにレスポンスクラスを指定
async def testJinja2(request:Request):
    return templates.TemplateResponse("sample2.html", {"request": request,})

#実験的に動かしたいもの用
@router.get("/solr")
async def testsolr():
    #search_query = '*:*'
    #search_query = 'title:中国 and article:安倍'
    #search_query = 'title:中国 or article:安倍'
    search_query = '*:*'
    page_num = 1
    page_max_lines = 10

    solr_news_clip = SolrNewsClip()
    results = solr_news_clip.search_query(search_query,page_num,page_max_lines)
    results_check = solr_news_clip.results_check(results)
    results_article_cut = solr_news_clip.article_cut(results_check)
    return results_article_cut


class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None


@router.post("/ajax")
async def testajax(item:Item):
    print(type(item))
    print(vars(item))
    return item

