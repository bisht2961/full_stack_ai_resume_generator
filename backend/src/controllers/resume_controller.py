from fastapi import APIRouter, Depends, HTTPException, status
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.models.resume import ResumeBase
from src.services.resume_service import (get_all_resume_by_user_email, delete_resume_by_id,
                                         add_new_resume, get_resume_by_id,update_resume)

resume_router = APIRouter(
    prefix='/resumes',
    tags=['Resume API'],
    dependencies=[Depends(verify_jwt_token)]
)

@resume_router.get('/fetch/all/{user_email}')
def get_all_resumes(user_email: str):
    try:
        return get_all_resume_by_user_email(user_email)
    except Exception as e:
        print(f"An unexpected error occurred during resume fetch: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected server error occurred."
        )

@resume_router.get('/fetch/id/{resume_id}')
def get_resume(resume_id: int):
    try:
        return get_resume_by_id(resume_id)
    except Exception as e:
        print(f"An unexpected error occurred during resume fetch: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected server error occurred."
        )
@resume_router.delete('/delete/{resume_id}')
def delete_resume(resume_id:int):
    try:
        return delete_resume_by_id(resume_id)
    except Exception as e:
        print(f"An unexpected error occurred during resume fetch: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected server error occurred."
        )

@resume_router.post('/add')
async def add_resume(resume:ResumeBase):
    try:
        if not resume.id:
            return add_new_resume(resume)
        else:
            return update_resume(resume)
    except Exception as e:
        print(f"An unexpected error occurred during resume fetch: {e}")
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An unexpected server error occurred."
        )