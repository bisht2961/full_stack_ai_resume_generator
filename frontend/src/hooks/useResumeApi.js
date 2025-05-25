import { useApi } from "./useApi";
import {
  UpdatePersonalInfoDetail,
  GetResumeById,
  DeleteResumeById,
  UpdateResume,
  GetAllResume,
  GetExperienceById,
  GetEducationById,
  GetSkillsById,
  GetPersonalInfo,
  GetSummaryById,
  GetAISummary,
  UpdateResumeSummary,
  UpdateExperienceResume,
  GenerateAIDescription,
  DeleteExperienceById,
  RegenerateAIDescription,
  UpdateEducation,
  DeleteEducationById,
  UpdateSkills,
  DeleteSkillsById,
  UploadResumePdf,
  GetAllAchievements,
  AddUpdateAchievements,
  DeleteAchievementsById,
  UpdateProject,
  DeleteProjectById,
  GetAllProjects,
  
} from "../../services/resumeService";

export const useResumeApi = () => {


  const updateResume = useApi(UpdateResume);
  const deleteResume = useApi(DeleteResumeById);
  const updatePersonalInfo = useApi(UpdatePersonalInfoDetail);
  const fetchResumeId = useApi(GetResumeById);
  const removeResume = useApi(DeleteResumeById);
  const fetchAllResume = useApi(GetAllResume);
  const fetchExperienceById = useApi(GetExperienceById);
  const fetchEducationById = useApi(GetEducationById); 
  const fetchSkillsById = useApi(GetSkillsById);
  const fetchPersonalInfo = useApi(GetPersonalInfo);
  const fetchSummaryById = useApi(GetSummaryById);
  const fetchAISummary = useApi(GetAISummary);
  const updateSummary = useApi(UpdateResumeSummary);
  const updateExperience = useApi(UpdateExperienceResume);
  const generateAiDescription = useApi(GenerateAIDescription);
  const deleteExperience = useApi(DeleteExperienceById)
  const regenerateAiDescription = useApi(RegenerateAIDescription);
  const updateEducation = useApi(UpdateEducation);
  const deleteEducation = useApi(DeleteEducationById);
  const updateSkills = useApi(UpdateSkills);
  const deleteSkills = useApi(DeleteSkillsById);
  const uploadResumePdf = useApi(UploadResumePdf);
  const getAllAchievements = useApi(GetAllAchievements);
  const addUpdateAchievements = useApi(AddUpdateAchievements);
  const deleteAchievements = useApi(DeleteAchievementsById);
  const updateProject = useApi(UpdateProject);
  const deleteProject = useApi(DeleteProjectById);
  const getAllProjects = useApi(GetAllProjects);

  return {
    updatePersonalInfo: updatePersonalInfo.callApi,
    updatePersonalInfoLoading: updatePersonalInfo.loading,
    getResume: fetchResumeId.callApi,
    getResumeLoading: fetchResumeId.loading,
    deleteResume: removeResume.callApi,
    deleteResumeLoading: removeResume.loading,
    createUpdateResume: updateResume.callApi,
    createUpdateResumeLoading: updateResume.loading,
    getAllResumes: fetchAllResume.callApi,
    getAllResumesLoading: fetchAllResume.loading,
    getAllResumesError: fetchAllResume.error,
    getExperienceById: fetchExperienceById.callApi,
    getExperienceByIdLoading: fetchExperienceById.loading,
    getEducationById: fetchEducationById.callApi,
    getEducationByIdLoading: fetchEducationById.loading,
    getSkillsById: fetchSkillsById.callApi,
    getSkillsByIdLoading: fetchSkillsById.loading,
    getPersonalInfo: fetchPersonalInfo.callApi,
    getPersonalInfoLoading: fetchPersonalInfo.loading,
    getSummaryById: fetchSummaryById.callApi,
    getSummaryByIdLoading: fetchSummaryById.loading,
    getAISummary: fetchAISummary.callApi,
    getAISummaryLoading: fetchAISummary.loading,
    updateSummary: updateSummary.callApi,
    updateSummaryLoading: updateSummary.loading,
    updateExperience: updateExperience.callApi,
    updateExperienceLoading: updateExperience.loading,
    updateExperienceError: updateExperience.error,
    generateAiDescription: generateAiDescription.callApi,
    generateAiDescriptionLoading: generateAiDescription.loading,
    generateAiDescriptionError: generateAiDescription.error,
    deleteExperience: deleteExperience.callApi,
    deleteExperienceError: deleteExperience.error,
    deleteExperienceLoading: deleteExperience.loading,
    regenerateAiDescription: regenerateAiDescription.callApi,
    regenerateAiDescriptionLoading: regenerateAiDescription.loading,
    regenerateAiDescriptionError: regenerateAiDescription.error,
    updateEducation: updateEducation.callApi,
    updateEducationLoading: updateEducation.loading,
    updateEducationError: updateEducation.error,
    deleteEducation: deleteEducation.callApi,
    deleteEducationLoading: deleteEducation.loading,
    deleteEducationError: deleteEducation.error,
    updateSkills: updateSkills.callApi,
    updateSkillsLoading: updateSkills.loading,
    updateSkillsError: updateSkills.error,
    deleteSkills: deleteSkills.callApi,
    deleteSkillsLoading: deleteSkills.loading,
    deleteSkillsError: deleteSkills.error,
    deleteResume: deleteResume.callApi,
    deleteResumeLoading: deleteResume.loading,
    deleteResumeError: deleteResume.error,
    uploadResumePdf: uploadResumePdf.callApi,
    uploadResumePdfLoading: uploadResumePdf.loading,
    uploadResumePdfError: uploadResumePdf.error,
    getAllAchievements: getAllAchievements.callApi,
    getAllAchievementsLoading: getAllAchievements.loading,
    getAllAchievementsError: getAllAchievements.error,
    addUpdateAchievements: addUpdateAchievements.callApi,
    addUpdateAchievementsLoading: addUpdateAchievements.loading,
    addUpdateAchievementsError: addUpdateAchievements.error,
    deleteAchievements: deleteAchievements.callApi,
    deleteAchievementsLoading: deleteAchievements.loading,
    deleteAchievementsError: deleteAchievements.error,
    updateProject: updateProject.callApi,
    updateProjectLoading: updateProject.loading,
    updateProjectError: updateProject.error,
    deleteProject: deleteProject.callApi,
    deleteProjectLoading: deleteProject.loading,
    deleteProjectError: deleteProject.error,
    getAllProjects: getAllProjects.callApi,
    getAllProjectsLoading: getAllProjects.loading,
    getAllProjectsError: getAllProjects.error,
  };
};
