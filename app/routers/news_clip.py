from fastapi import APIRouter
# from pydantic import BaseModel, ValidationError, validator      #pydantic：バリデーション
from typing import Optional
from models.SolrNewsClip import SolrNewsClip  # プロジェクト内モジュール
from models.SearchQuery import SearchQuery  # プロジェクト内モジュール

router = APIRouter(
    prefix='/news_clip',
    tags=['news_clip'],
    # dependencies=[Depends(get_token_header)],
    responses={404: {'description': 'そのパスは不正です'}},
)

@router.post('/')
async def news_clip(search_query: SearchQuery):
    print(type(search_query))
    print(vars(search_query))
    # search_query.search_conditions
    # search_query.page_number
    # search_query.details_number
    #	http://localhost:8000/saikutu/?sch_query=(((title:) OR article:()))&page_num=1&page_max_lines=10&next_window=same
    #   https://localhost:8984/solr/test1/select?q=article:政治 OR article:政府
    #   https://localhost:8984/solr/test1/select?q=article:政治 AND article:政府

    def search_conditions_parse(search_conditions: list):

        def field_set_parse(field_set: dict):
            pass

        result = []
        for item in search_conditions:
            if type(item) is str:
                result.append(item)
            elif type(item) is dict:
                print(item)
                field_set = item['field_set']
                print(field_set['field'] +':'+ field_set['value1'])
                result.append(field_set['field'] +':'+ field_set['value1'])
                #item['range_flg']
            else:
                print(vars(item))
                raise Exception('変なデータを受信：エラーとして止める。')
        return ''.join(result)

    solr_query = search_conditions_parse(search_query.search_conditions)
    page_num = search_query.page_number
    page_max_lines = search_query.details_number

    solr_news_clip = SolrNewsClip()
    results = solr_news_clip.search_query(solr_query, page_num, page_max_lines)
    results_check = solr_news_clip.results_check(results)
    results_article_cut = solr_news_clip.article_cut(results_check)

    return results_article_cut
