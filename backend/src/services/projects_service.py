from supabase import create_client, Client
from src.config.env_config import SUPABASE_URL, SUPABASE_KEY, PROJECT_TABLE
from src.models.project import Project

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)

def add_project(project: Project):
    result = supabase.table(PROJECT_TABLE).insert(project.to_dict()).execute()
    return result.data[0]

def update_project(project: Project):
    result = supabase.table(PROJECT_TABLE).upsert(project.to_dict()).execute()
    return result.data[0]

def remove_project(project_id: int):
    result = supabase.table(PROJECT_TABLE).delete().eq('id',project_id).execute()
    if not result.data:
        raise Exception('Failed to find the project details')
    return {'message':'Project details removed successfully','delete':result.data[0]}

def fetch_all_project(resume_id:int):
    result = supabase.table(PROJECT_TABLE).select('*').eq('resume_id',resume_id).execute()
    return result.data