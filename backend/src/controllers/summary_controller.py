from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.models.summary import Summary
from src.services.summary_service import add_resume_summary, get_resume_summary, update_resume_summary

summary_router = APIRouter(
    prefix='/summary',
    tags=["Summary API"],
    dependencies=[Depends(verify_jwt_token)]
)

@summary_router.post('/update')
def add_summary(summary: Summary):
    try:
        data = {
            'summary': summary.summary,
            'resume_id': summary.resume_id
        }
        if not summary.id:
            return add_resume_summary(data)
        else:
            return update_resume_summary(data,summary.id)
    except ValueError:
        return JSONResponse("Failed to insert details",status_code=404)

@summary_router.get('/fetch/{resume_id}')
def get_summary(resume_id: int):
    return get_resume_summary(resume_id)