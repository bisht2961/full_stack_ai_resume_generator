import axiosClient from "./axiosClient";
import { apiWrapper } from "./apiHelper";

export const UpdateResume = (data) =>
  apiWrapper(axiosClient.post("/resumes/add", data));

export const GetAllResume = (userEmail) =>
  apiWrapper(axiosClient.get(`/resumes/fetch/all/${userEmail}`));

export const GetPersonalInfo = (resume_id) =>
  apiWrapper(axiosClient.get(`/personal-info/user/resume/${resume_id}`));

export const UpdatePersonalInfoDetail = (data) =>
  apiWrapper(axiosClient.post('/personal-info/update', data));

export const GetResumeById = (resume_id) =>
  apiWrapper(axiosClient.get(`/resumes/fetch/id/${resume_id}`));

export const DeleteResumeById = (resume_id) =>
  apiWrapper(axiosClient.delete(`/resumes/delete/${resume_id}`));

export const GetEducationById = (resume_id) =>
  apiWrapper(axiosClient.get(`/education/fetch/all/${resume_id}`));

export const GetExperienceById = (resume_id) =>
  apiWrapper(axiosClient.get(`/experience/fetch/all/${resume_id}`));

export const GetSkillsById = (resume_id) =>  
  apiWrapper(axiosClient.get(`/skills/fetch/all/${resume_id}`));

export const GetSummaryById = (resume_id) =>
  apiWrapper(axiosClient.get(`/summary/fetch/${resume_id}`));

export const GetAISummary = (job_title)=>
  apiWrapper(axiosClient.get(`/ai/summary/${job_title}`));

export const UpdateResumeSummary = (data) =>
  apiWrapper(axiosClient.post(`/summary/update`, data));

export const UpdateExperienceResume = (resumeId,data) =>
  apiWrapper(axiosClient.post(`/experience/add/${resumeId}`, data));

export const GenerateAIDescription = (input) =>
  apiWrapper(axiosClient.post(`/ai/generate`, input));

export const RegenerateAIDescription = (input) =>
  apiWrapper(axiosClient.post(`/ai/regenerate`, input));

export const DeleteExperienceById = (experience_id) =>
  apiWrapper(axiosClient.delete(`/experience/delete/${experience_id}`));

export const UpdateEducation = (resumeId, data) =>
  apiWrapper(axiosClient.post(`/education/add/${resumeId}`, data));

export const DeleteEducationById = (education_id) =>
  apiWrapper(axiosClient.delete(`/education/delete/${education_id}`));

export const UpdateSkills = (data) =>
  apiWrapper(axiosClient.post(`/skills/add`, data));

export const DeleteSkillsById = (skill_id) =>
  apiWrapper(axiosClient.delete(`/skills/delete/${skill_id}`));

export const UploadResumePdf = (resumeId, data) =>
  apiWrapper(axiosClient.post(`/upload/resume/${resumeId}`, data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }));

export const GetAllAchievements = (resumeId) =>
  apiWrapper(axiosClient.get(`/achievements/fetch/all/${resumeId}`));

export const AddUpdateAchievements = (resume_id,data) =>
  apiWrapper(axiosClient.post(`/achievements/add/${resume_id}`, data));

export const DeleteAchievementsById = (achievement_id) =>
  apiWrapper(axiosClient.delete(`/achievements/delete/${achievement_id}`));

export const UpdateProject = (data) =>
  apiWrapper(axiosClient.post(`/projects/add`, data));

export const GetAllProjects = (resumeId) =>
  apiWrapper(axiosClient.get(`/projects/fetch/all/${resumeId}`));

export const DeleteProjectById = (project_id) =>
  apiWrapper(axiosClient.delete(`/projects/delete/${project_id}`));