from fastapi import Header, HTTPException


#async def get_token_header(x_token: str = Header(...)):
async def get_token_header():
    pass
    #if x_token != "fake-super-secret-token":
    #    raise HTTPException(status_code=400, detail="X-Token header invalid")


#async def get_query_token(token: str):
async def get_query_token(token :str ="jessica"): # -> str:
    #pass
    if token != "jessica":
        raise HTTPException(status_code=400, detail="No Jessica token provided")
