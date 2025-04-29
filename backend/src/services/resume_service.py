from supabase import create_client, Client
from src.config.env_config import SUPABASE_URL, SUPABASE_KEY, RESUMES_TABLE
from src.models.resume import ResumeBase
from src.services.persona_info_service import delete_personal_info
from src.services.education_service import delete_education
from src.services.experience_service import delete_experience
from src.services.skills_service import delete_skill
from src.services.summary_service import delete_summary

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)

def get_all_resume_by_user_email(user_email):
    return supabase.table(RESUMES_TABLE).select('*').eq('user_email',user_email).execute()

def get_resume_by_id(resume_id):
    return supabase.table(RESUMES_TABLE).select('*').eq('id',resume_id).execute()

def add_new_resume(resume:ResumeBase):
    return supabase.table(RESUMES_TABLE).insert(resume.to_dict()).execute()

def update_resume(resume:ResumeBase):
    return supabase.table(RESUMES_TABLE).upsert(resume.to_dict()).execute()

def delete_resume_by_id(resume_id):
    delete_personal_info(resume_id)
    delete_education(resume_id)
    delete_experience(resume_id)
    delete_skill(resume_id)
    delete_summary(resume_id)
    delete = supabase.table(RESUMES_TABLE).delete().eq('id', resume_id).execute()
    if delete.data:
        return {"message": "Resume deleted successfully", "deleted": delete.data[0]}
    else:
        raise ValueError("Resume not found or already deleted")