from src.config.supabase_config import get_supabase
from src.config.env_config import  RESUME_SUMMARY

supabase = get_supabase()

def add_resume_summary(summary ):
    return supabase.table(RESUME_SUMMARY).insert(summary).execute()

def get_resume_summary(resume_id):
    return supabase.table(RESUME_SUMMARY).select('*').eq('resume_id',resume_id).execute()

def update_resume_summary(data, summary_id:int):
    return supabase.table(RESUME_SUMMARY).update(data).eq('id',summary_id).execute()

def delete_summary(resume_id):
    summary = get_resume_summary(resume_id)
    if summary.data:
        delete = supabase.table(RESUME_SUMMARY).delete().eq('resume_id',resume_id).execute()
        if not delete.data:
            raise Exception("Failed to delete summary")
        else:
            print("Summary data deleted")
    return {"message": "Summary deleted successfully"}