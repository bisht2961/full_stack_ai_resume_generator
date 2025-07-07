from typing import List

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.services.projects_service import add_project,fetch_all_project,remove_project,update_project

from src.models.project import Project

projects_router = APIRouter(
    prefix='/projects',
    tags=['Project Api'],
    dependencies=[Depends(verify_jwt_token)]
)

@projects_router.post('/add')
def add_update_project(projects:List[Project]):
    try:
        res = []
        for project in projects:
            if project.id:
                res.append(update_project(project))
            else:
                res.append(add_project(project))
        return JSONResponse(res)
    except Exception as e:
        return JSONResponse("Failed to update information",status_code=404)

@projects_router.get('/fetch/all/{resume_id}')
def get_projects(resume_id:int):
    try:
        return fetch_all_project(resume_id)
    except Exception as e:
        print("Exception:", str(e))
        return JSONResponse("Failed to fetch all project details",status_code=404)

@projects_router.delete('/delete/{project_id}')
def delete_project(project_id:int):
    try:
        return remove_project(project_id)
    except Exception as e:
        return JSONResponse("Failed to delete or project id doesn't exist",status_code=404)

