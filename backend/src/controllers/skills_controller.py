from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from typing import List

from src.config.supabase_config import verify_jwt_token
from src.services.skills_service import add_skill_rating, get_skill_resume,update_skill_rating, remove_skill
from src.models.skill import SkillBase

skills_router = APIRouter(
    prefix='/skills',
    tags=["Skills API"],
    dependencies=[Depends(verify_jwt_token)]
)

@skills_router.post('/add')
def add_skill(skills: List[SkillBase]):
    try:
        res = []
        for skill in skills:
            print(skill)
            if not skill.id:
                res.append(add_skill_rating(skill))
            else:
                res.append(update_skill_rating(skill))
        return JSONResponse(res)
    except ValueError:
        return JSONResponse("Failed to insert details",status_code=404)


@skills_router.delete('/delete/{skill_id}')
def remove_skill(skill_id:int):
    try:
        return remove_skill(skill_id)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@skills_router.get('/fetch/all/{resume_id}')
def get_skill(resume_id: int):
    return get_skill_resume(resume_id)