from src.config.supabase_config import get_supabase
from src.config.env_config import ACHIEVEMENTS_TABLE, RESUME_ACHIEVEMENTS
from src.models.achievment import Achievement

supabase = get_supabase()

def add_achievement(achievement: Achievement,resume_id:int):
    res = supabase.table(ACHIEVEMENTS_TABLE).insert(achievement.to_dict()).execute()
    mapping = add_achievement_mapping(res.data[0],resume_id)
    return {"achievement": res.data[0], "mapping": mapping}

def update_achievement(achievement: Achievement):
    res = supabase.table(ACHIEVEMENTS_TABLE).upsert(achievement.to_dict()).execute()
    return res.data[0]

def add_achievement_mapping(achievement,resume_id):
    map_data = {
        "resume_id": resume_id,
        "achievement_id": achievement['id']
    }
    map_res = supabase.table(RESUME_ACHIEVEMENTS).insert(map_data).execute()
    return map_res.data[0]

def fetch_achievements(resume_id:int):
    map_data = supabase.table(RESUME_ACHIEVEMENTS).select('*').eq('resume_id', resume_id).execute()
    experiences = {
        'data': []
    }
    for exp_map in map_data.data:
        exp = supabase.table(ACHIEVEMENTS_TABLE).select('*').eq('id', exp_map['achievement_id']).execute()
        experiences['data'].append(exp.data[0])
    return experiences

def remove_achievement_info(achievement_id:int):
    supabase.table(RESUME_ACHIEVEMENTS).delete().eq("achievement_id", achievement_id).execute()

    # Then delete the actual experience
    delete_res = supabase.table(ACHIEVEMENTS_TABLE).delete().eq("id", achievement_id).execute()

    if delete_res.data:
        return {"message": "Experience deleted successfully", "deleted": delete_res.data[0]}
    else:
        raise ValueError("Experience not found or already deleted")

def delete_achievement(resume_id:int):

    achievements = supabase.table(RESUME_ACHIEVEMENTS).select('*').eq('resume_id',resume_id).execute()
    if achievements.data and len(achievements.data[0]) > 0:
        for achievement in achievements:
            delete = supabase.table(ACHIEVEMENTS_TABLE).delete().eq('id',achievement.id).execute()
            if not delete.data:
                raise Exception("Failed to delete achievement")
        delete = supabase.table(RESUME_ACHIEVEMENTS).delete().eq('resume_id',resume_id).execute()
        if not delete.data:
            raise Exception("Failed to delete achievement")
    return {"message": "Achievement deleted successfully"}
