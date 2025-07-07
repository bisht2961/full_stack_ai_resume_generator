from src.config.supabase_config import get_supabase
from src.config.env_config import  PERSONAL_INFO_TABLE
from src.models.personal_info import PersonalInfo

supabase = get_supabase()

def get_all_users():
    return supabase.table(PERSONAL_INFO_TABLE).select('*').execute()

def add_new_user(data: PersonalInfo):
    return supabase.table(PERSONAL_INFO_TABLE).insert(data.to_dict()).execute()

def get_user_by_id(user_id):
    return supabase.table(PERSONAL_INFO_TABLE).select('*').eq("id",user_id).execute()

def get_user_by_resume_id(resume_id):
    return supabase.table(PERSONAL_INFO_TABLE).select('*').eq('resume_id',resume_id).execute()

def update_user_info(data:PersonalInfo):
    return supabase.table(PERSONAL_INFO_TABLE).upsert(data.to_dict()).execute()

def delete_personal_info(resume_id):
    personal_info = get_user_by_resume_id(resume_id)
    if personal_info.data and len(personal_info.data[0]) > 0:
        removed_resume = supabase.table(PERSONAL_INFO_TABLE).delete().eq("id",personal_info.data[0]['id']).execute()
        if not removed_resume.data:
            raise Exception("Failed to remove Personal Info")
        else:
            print("Personal Info deleted")
    return {"message": "Personal Info deleted successfully"}