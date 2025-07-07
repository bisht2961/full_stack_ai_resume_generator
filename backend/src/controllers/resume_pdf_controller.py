from fastapi import APIRouter, UploadFile, File, Depends
from starlette.responses import JSONResponse

from src.config.supabase_config import verify_jwt_token
from src.services.resume_pdf_service import upload_resume


resume_doc_router = APIRouter(
    prefix='/upload',
    tags=['Upload Resume API'],
    dependencies=[Depends(verify_jwt_token)]
)

@resume_doc_router.post('/resume/{resume_id}')
async def upload_resume_pdf(resume_id:int,file: UploadFile = File(...),):
    try:
        res = await upload_resume(resume_id,file)
        return JSONResponse(res)
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error": "Failed to upload "})