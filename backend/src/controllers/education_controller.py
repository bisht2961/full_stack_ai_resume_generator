from typing import List

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.models.education import Education
from src.services.education_service import (add_education_detail, get_education_detail,
                                            update_education_resume, remove_education)

education_router = APIRouter(
    prefix='/education',
    tags=['Education API'],
    dependencies=[Depends(verify_jwt_token)]
)

@education_router.post("/add/{resume_id}")
async def add_education(resume_id:int, educations: List[Education]):
    try:
         res = []
         for edu in educations:
             if not edu.id:
                res.append(add_education_detail(edu,resume_id))
             else:
                 res.append(update_education_resume(edu))
         return JSONResponse(res)
    except ValueError:
        return JSONResponse("Failed Inserting details",status_code=404)

@education_router.delete('/delete/{education_id}')
async def delete_education(education_id:int):
    try:
        return remove_education(education_id)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@education_router.get('/fetch/all/{resume_id}')
async def get_education_for_resume_id(resume_id):
    return get_education_detail(resume_id)