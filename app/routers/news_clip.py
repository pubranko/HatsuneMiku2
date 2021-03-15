from fastapi import APIRouter
# from pydantic import BaseModel, ValidationError, validator      #pydantic：バリデーション
from typing import Optional
from models.SolrNewsClip import SolrNewsClip
from models.NewsClipQuery import NewsClipQuery
from parser.NewsClipQueryParse import NewsClipQueryParse

router = APIRouter(
    prefix='/news_clip',
    tags=['news_clip'],
    # dependencies=[Depends(get_token_header)],
    responses={404: {'description': 'そのパスは不正です'}},
)

@router.post('/')
async def news_clip(search_query: NewsClipQuery):
    #print(type(search_query))
    #print(vars(search_query))
    #	http://localhost:8000/saikutu/?sch_query=(((title:) OR article:()))&page_num=1&page_max_lines=10&next_window=same
    #   https://localhost:8984/solr/test1/select?q=article:政治 OR article:政府
    #   https://localhost:8984/solr/test1/select?q=article:政治 AND article:政府

    ncqp = NewsClipQueryParse()
    ncqp.query_parse(search_query.search_conditions)
    solr_query = ''.join(ncqp.parse_result)

    page_num = search_query.page_number
    page_max_lines = search_query.details_number

    #solrへのクエリーを開始
    solr_news_clip = SolrNewsClip()
    results = solr_news_clip.search_query(solr_query, page_num, page_max_lines)
    results_check = solr_news_clip.results_check(results)
    results_article_cut = solr_news_clip.article_cut(results_check)

    return results_article_cut
