from supabase import create_client, Client
from src.config.env_config import SUPABASE_URL, SUPABASE_KEY, EDUCATION, RESUME_EDUCATION
from src.models.education import Education

supabase: Client = create_client(SUPABASE_URL,SUPABASE_KEY)

def add_education_detail(education: Education, resume_id):
    res =  supabase.table(EDUCATION).insert(education.to_dict()).execute()
    mapping = add_eduction_resume(res.data[0],resume_id)
    return {"education":res.data[0],"mapping":mapping}

def update_education_resume(education: Education):
    res = supabase.table(EDUCATION).upsert(education.to_dict()).execute()
    return res.data[0]

def add_eduction_resume(education,resume_id):
    # print(education)
    edu_resume_map = {
        "resume_id": resume_id,
        "education_id": education['id']
    }
    res = supabase.table(RESUME_EDUCATION).insert(edu_resume_map).execute()
    return res.data[0]

def get_education_detail(resume_id):
    res = supabase.table(RESUME_EDUCATION).select('*').eq('resume_id',resume_id).execute()
    educations = {
        'data':[]
    }
    for edu in res.data:
        edu_res = supabase.table(EDUCATION).select('*').eq('id',edu['education_id']).execute()
        educations['data'].append(edu_res.data[0])
    return educations

def remove_education(education_id):
    # First delete mapping (if exists)
    supabase.table(RESUME_EDUCATION).delete().eq("education_id", education_id).execute()

    # Then delete the actual education
    delete_res = supabase.table(EDUCATION).delete().eq("id", education_id).execute()

    if delete_res.data:
        return {"message": "Education deleted successfully", "deleted": delete_res.data[0]}
    else:
        raise ValueError("Education not found or already deleted")

def delete_education(resume_id):
    educations = supabase.table(RESUME_EDUCATION).select('*').eq('resume_id',resume_id).execute()
    if educations.data and len(educations.data[0]) > 0:
        for education in educations.data[0]:
            delete = supabase.table(EDUCATION).delete().eq('education_id', education.id).execute()
            if not delete.data:
                raise Exception("Failed to delete education")
        delete = supabase.table(RESUME_EDUCATION).delete().eq('resume_id', resume_id).execute()
        if not delete.data:
            raise Exception("Failed to delete education")
        else:
            print("educations data deleted")
    return {"message": "Education deleted successfully"}