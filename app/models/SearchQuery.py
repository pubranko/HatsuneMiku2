from pydantic import BaseModel, ValidationError, validator      #pydantic：バリデーション

class SearchQuery(BaseModel):
    search_conditions:list
    page_number:int
    details_number:int
