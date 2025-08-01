from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer

from src.controllers.personal_info_controller import user_router
from src.controllers.resume_controller import resume_router
from src.controllers.education_controller import education_router
from src.controllers.experience_controller import experience_router
from src.controllers.skills_controller import skills_router
from src.controllers.ai_controller import ai_router
from src.controllers.summary_controller import summary_router
from src.controllers.resume_pdf_controller import resume_doc_router
from src.controllers.achievements_controller import achievements_router
from src.controllers.projects_controller import projects_router
from src.controllers.user_auth import user_auth_router
import os
os.environ['PYDANTIC_PRIVATE_ALLOW_UNHANDLED_SCHEMA_TYPES'] = '1'
app = FastAPI(
    title="SmartResume AI Backend using Supabase & FastAPI ",
    description="APIs for SmartResume AI.",
    version="1.0.0"
)
bearer_scheme = HTTPBearer()
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

routers = [user_router,resume_router,education_router, experience_router, skills_router, ai_router, summary_router,resume_doc_router,
           achievements_router, projects_router,user_auth_router]
for router in routers:
    app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app=app,host='0.0.0.0',port=8000)