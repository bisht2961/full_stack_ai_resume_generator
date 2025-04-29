from fastapi import APIRouter, Body
from starlette.responses import JSONResponse
from typing import Dict
from src.services.ai_service import get_summary, get_experience, get_regenerated_experience

ai_router = APIRouter(
    prefix='/ai',
    tags=['AI API']
)

@ai_router.get('/summary/{job_title}')
def get_sample_summary_(job_title:str):
    return JSONResponse( get_summary(job_title))

@ai_router.post('/experience')
def get_sample_experience(experiences: dict[str,str]):
    # print(experiences)
    return JSONResponse(get_experience(experiences['experience_str']))

@ai_router.post('/regenerate')
def get_regenerate_experience(experiences: dict[str,str]):
    return JSONResponse(get_regenerated_experience(experiences['experience_str']))