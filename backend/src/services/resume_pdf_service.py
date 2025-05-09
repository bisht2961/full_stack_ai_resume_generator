import os
from fastapi import UploadFile
from supabase import create_client, Client
from src.config.env_config import SUPABASE_URL,SUPABASE_KEY,UPLOAD_FOLDER,RESUME_BUCKET

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)
os.makedirs(UPLOAD_FOLDER,exist_ok=True)

async def upload_resume(resume_id:int,file: UploadFile):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    filename = f"{resume_id}/{file.filename}"
    supabase.storage.from_(RESUME_BUCKET).upload(filename,file_path,{
        "content-type": "application/pdf",
        "upsert": "true"
    })
    public_url = supabase.storage.from_(RESUME_BUCKET).get_public_url(filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    return {"url":public_url}

