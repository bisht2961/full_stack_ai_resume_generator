from src.config.supabase_config import get_supabase
from src.config.env_config import EXPERIENCE, RESUME_EXPERIENCE
from src.models.experience import Experience

supabase = get_supabase()

def update_experience_info(data: Experience):
    res = supabase.table(EXPERIENCE).upsert(data.to_dict()).execute()
    return res.data[0]

def add_experience_info(data: Experience, resume_id):
    res = supabase.table(EXPERIENCE).insert(data.to_dict()).execute()
    mapping = add_experience_mapping(res.data[0], resume_id)
    return {"experience":res.data[0],"mapping":mapping}


def add_experience_mapping(experience, resume_id):
    map_data = {
        "resume_id": resume_id,
        "experience_id": experience['id']
    }
    map_res = supabase.table(RESUME_EXPERIENCE).insert(map_data).execute()
    return map_res.data[0]

def get_experiences_resume(resume_id):
    map_data = supabase.table(RESUME_EXPERIENCE).select('*').eq('resume_id',resume_id).execute()
    experiences = {
        'data':[]
    }
    for exp_map in map_data.data:
        exp = supabase.table(EXPERIENCE).select('*').eq('id',exp_map['experience_id']).execute()
        experiences['data'].append(exp.data[0])
    return experiences


def remove_experience_info(experience_id):
    # First delete mapping (if exists)
    supabase.table(RESUME_EXPERIENCE).delete().eq("experience_id", experience_id).execute()

    # Then delete the actual experience
    delete_res = supabase.table(EXPERIENCE).delete().eq("id", experience_id).execute()

    if delete_res.data:
        return {"message": "Experience deleted successfully", "deleted": delete_res.data[0]}
    else:
        raise ValueError("Experience not found or already deleted")

def delete_experience(resume_id):
    experiences = supabase.table(RESUME_EXPERIENCE).select('*').eq('resume_id',resume_id).execute()
    if experiences.data and len(experiences.data[0]) > 0:
        for experience in experiences.data[0]:
            delete = supabase.table(EXPERIENCE).delete().eq('education_id', experience.id).execute()
            if not delete.data:
                raise Exception("Failed to delete experience")
        delete = supabase.table(RESUME_EXPERIENCE).delete().eq('resume_id', resume_id).execute()
        if not delete.data:
            raise Exception("Failed to delete experience")
        else:
            print("Experience data deleted")
    return {"message": "Experience deleted successfully"}
