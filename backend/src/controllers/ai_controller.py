from fastapi import APIRouter, Depends, UploadFile, File
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.services.ai_service import (
    get_summary_groq, get_ai_description_groq, get_regenerate_ai_description_groq, get_json_resume_information
)

ai_router = APIRouter(
    prefix='/ai',
    tags=['AI API'],
    dependencies=[Depends(verify_jwt_token)]
)

@ai_router.get('/summary/{job_title}')
def get_sample_summary_(job_title:str):
    return JSONResponse(get_summary_groq(job_title))

@ai_router.post('/generate')
def get_resume_description(input_dict: dict[str,str]):
    return JSONResponse(get_ai_description_groq(input_dict['user_input']))

@ai_router.post('/regenerate')
def get_resume_regenerate_description(input_dict: dict[str,str]):
    return JSONResponse(get_regenerate_ai_description_groq(input_dict['user_input']))

@ai_router.post('/extract/{user_email}')
async def extract_user_info(user_email:str,resume: UploadFile = File(...)):
    return JSONResponse(await get_json_resume_information(resume))