// src/utils/resumeUtils.js
import {
  mapResumeData,
  mapPersonalInfo,
  mapExperience,
  mapEducation,
  mapSkills,
  mapAchievements,
  mapProjects,
} from "@/utils/utils";

export const getResumeInfo = async ({
  resumeId,
  getResume,
  getPersonalInfo,
  getExperienceById,
  getEducationById,
  getSkillsById,
  getSummaryById,
  getAllAchievements,
  getAllProjects,
}) => {
  try {
    const [
      resume,
      personalInfo,
      experience,
      education,
      skills,
      summary,
      achievements,
      projects,
    ] = await Promise.allSettled([
      getResume(resumeId),
      getPersonalInfo(resumeId),
      getExperienceById(resumeId),
      getEducationById(resumeId),
      getSkillsById(resumeId),
      getSummaryById(resumeId),
      getAllAchievements(resumeId),
      getAllProjects(resumeId),
    ]);

    const resumeData =
      resume.status === "fulfilled"
        ? mapResumeData(resume.value.data?.data[0])
        : {};
    const personalInfoData =
      personalInfo.status === "fulfilled"
        ? mapPersonalInfo(personalInfo.value.data?.data[0])
        : {};
    const experienceData =
      experience.status === "fulfilled"
        ? mapExperience(experience.value.data?.data)
        : {};
    const educationData =
      education.status === "fulfilled"
        ? mapEducation(education.value.data?.data)
        : {};
      
    const skillsData =
      skills.status === "fulfilled" ? mapSkills(skills.value.data?.data) : {};
    const summaryData =
      summary.status === "fulfilled" ? summary.value.data?.data[0] : {};
    const achievementsData =
      achievements.status === "fulfilled" ? mapAchievements(achievements.value.data?.data) : [];
    const projectsData =
      projects.status === "fulfilled" ? mapProjects(projects.value?.data) : [];
    
    return {
      resume: resumeData,
      experience: experienceData,
      education: educationData,
      skills: skillsData,
      summary: summaryData,
      personalInfo: personalInfoData,
      achievements: achievementsData,
      projects: projectsData,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return null; // Handle the error as needed
  }
};
