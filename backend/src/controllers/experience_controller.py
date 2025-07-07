from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from typing import List

from src.config.supabase_config import verify_jwt_token
from src.models.experience import Experience
from src.services.experience_service import (add_experience_info, get_experiences_resume,
                                             update_experience_info,remove_experience_info)

experience_router = APIRouter(
    prefix='/experience',
    tags=['Experience API'],
    dependencies=[Depends(verify_jwt_token)]
)


@experience_router.post("/add/{resume_id}")
def add_or_update_experience(resume_id:int, experiences: List[Experience]):
    try:
        res = []
        for exp in experiences:
            # print(exp)
            if exp.id:
                # print("Updating ")
                res.append(update_experience_info(exp))
            else:
                # print("Adding")
                res.append(add_experience_info(exp, resume_id))
        return JSONResponse(res)
    except ValueError:
        return JSONResponse("Failed to insert/update details", status_code=404)

@experience_router.delete("/delete/{experience_id}")
def delete_experience(experience_id: str):
    try:
        return remove_experience_info(experience_id)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@experience_router.get('/fetch/all/{resume_id}')
def get_experiences(resume_id:int):
    return get_experiences_resume(resume_id)