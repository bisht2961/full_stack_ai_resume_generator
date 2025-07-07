from fastapi import APIRouter, Body, Header, Depends
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.models.personal_info import PersonalInfo
from src.services.persona_info_service import add_new_user, get_user_by_id, get_user_by_resume_id, update_user_info

user_router = APIRouter(
    prefix='/personal-info',
    tags=['Personal Info API'],
    dependencies=[Depends(verify_jwt_token)]
)

@user_router.post('/update')
async def update_user(user: PersonalInfo):
    try:

        if user.id:
            return update_user_info(user)
        else:
            return add_new_user(user)
    except ValueError:
        return JSONResponse("Invalid User Info",status_code=404)


@user_router.get('/user/{user_id}')
async def get_user_info(user_id:int ):
    return get_user_by_id(user_id)

@user_router.get('/user/resume/{resume_id}')
async def get_user_info(resume_id:int):
    return get_user_by_resume_id(resume_id)

