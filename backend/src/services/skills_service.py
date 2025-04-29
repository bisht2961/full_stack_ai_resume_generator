from supabase import create_client, Client
from src.config.env_config import SUPABASE_URL, SUPABASE_KEY, SKILLS_TABLE, RESUME_SKILLS
from src.models.skill import SkillBase

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)

def update_skill_rating(skill: SkillBase):
    res = supabase.table(RESUME_SKILLS).update({'rating':skill.rating}).eq('skill_id',skill.id).execute()
    return res.data[0]

def add_skill_rating(skill:SkillBase):
    skill_data = {
        "name": skill.name
    }
    response = supabase.table(SKILLS_TABLE).insert(skill_data).execute()
    return add_skill_mapping(skill,response.data[0])

def add_skill_mapping(data:SkillBase, response):
    data = {
        'skill_id': response['id'],
        'resume_id': data.resume_id,
        'rating': data.rating
    }
    res = supabase.table(RESUME_SKILLS).insert(data).execute()
    return {'skill': data, 'mapping':res.data[0]}

def get_skill_resume(resume_id):
    skills = supabase.table(RESUME_SKILLS).select('*').eq('resume_id',resume_id).execute()
    skills_data = {
        'data':[]
    }
    for skill in skills.data:
        res = supabase.table(SKILLS_TABLE).select('*').eq('id',skill['skill_id']).execute()
        skills_data['data'].append({
            'name': res.data[0]['name'],
            'rating': skill['rating'],
            'id': skill['skill_id']
        })
    return skills_data

def remove_skill(skill_id):
    supabase.table(RESUME_SKILLS).delete().eq("skill_id", skill_id).execute()

    # Then delete the actual skill
    delete_res = supabase.table(SKILLS_TABLE).delete().eq("id", skill_id).execute()

    if delete_res.data:
        return {"message": "Experience deleted successfully", "deleted": delete_res.data[0]}
    else:
        raise ValueError("Experience not found or already deleted")

def delete_skill(resume_id):
    skills = supabase.table(RESUME_SKILLS).select('*').eq('resume_id',resume_id).execute()
    if skills.data and len(skills.data[0]) > 0:
        for skill in skills.data[0]:
            delete = supabase.table(SKILLS_TABLE).delete().eq('education_id', skill.id).execute()
            if not delete.data:
                raise Exception("Failed to delete skill")
        delete = supabase.table(RESUME_SKILLS).delete().eq('resume_id', resume_id).execute()
        if not delete.data:
            raise Exception("Failed to delete skill")
        else:
            print("Skill data deleted")
    return {"message": "Skills deleted successfully"}