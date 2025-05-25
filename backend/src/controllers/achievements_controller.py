from fastapi import APIRouter
from typing import List
from starlette.responses import JSONResponse
from src.models.achievment import Achievement
from src.services.achievement_service import update_achievement, add_achievement, fetch_achievements, remove_achievement_info

achievements_router = APIRouter(
    prefix='/achievements',
    tags=['Achievements API']
)

@achievements_router.post('/add/{resume_id}')
def add_update_achievements(resume_id:int, achievements: List[Achievement]):
    try:
        res = []
        for achievement in achievements:
            if achievement.id:
                res.append(update_achievement(achievement))
            else:
                res.append(add_achievement(achievement,resume_id))
        return JSONResponse(res)
    except Exception as e:
        return JSONResponse(content=str(f"Error: {str(e)}"),status_code=500)

@achievements_router.get('/fetch/all/{resume_id}')
def get_achievements(resume_id:int):
    try:
        return JSONResponse(fetch_achievements(resume_id))
    except Exception as e:
        return JSONResponse(content=str(f"Error: {str(e)}"), status_code=500)

@achievements_router.delete('/delete/{achievement_id}')
def delete_achievement(achievement_id:int):
    try:
        return remove_achievement_info(achievement_id)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)