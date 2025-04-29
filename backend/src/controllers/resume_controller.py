from fastapi import APIRouter, Body, Header
from starlette.responses import JSONResponse

from src.models.resume import ResumeBase
from src.services.resume_service import (get_all_resume_by_user_email, delete_resume_by_id,
                                         add_new_resume, get_resume_by_id,update_resume)

resume_router = APIRouter(
    prefix='/resumes',
    tags=['Resume API']
)

@resume_router.get('/fetch/all/{user_email}')
def get_all_resumes(user_email: str):
    return get_all_resume_by_user_email(user_email)

@resume_router.get('/fetch/id/{resume_id}')
def get_resume(resume_id: int):
    return get_resume_by_id(resume_id)

@resume_router.delete('/delete/{resume_id}')
def delete_resume(resume_id:int):
    try:
        return delete_resume_by_id(resume_id)
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

@resume_router.post('/add')
async def add_resume(resume:ResumeBase):
    try:
        if not resume.id:
            return add_new_resume(resume)
        else:
            return update_resume(resume)
    except ValueError:
        return JSONResponse("Invalid User Info",status_code=404)