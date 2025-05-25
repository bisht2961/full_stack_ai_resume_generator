// src/hooks/usePersonalInfo.js
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { v4 as uuidv4 } from "uuid";

const useAchievements = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const updateAchievementContext = (index,key, value) => {
    setResumeInfo((prev) => {
        const updatedAchievements = [...(prev.achievements || [])];
        if (updatedAchievements[index]) {
            updatedAchievements[index] = {
            ...updatedAchievements[index],
            [key]: value,
          };
        }
        return {
          ...prev,
          achievements: updatedAchievements,
        };
      });
  };

  const removeAchievementContext = (index) => {
    setResumeInfo((prev) => {
      const updatedAchievements = [...(prev.achievements || [])];
      if (updatedAchievements.length > 0 && index >= 0) {
        updatedAchievements.splice(index, 1); 
      }
      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  };    

  const addAchievementContext = () => {
    setResumeInfo((prev) => ({
      ...prev,
      achievements: [
        ...(prev.achievements || []),
        {
          id: uuidv4(), 
          title: "",
          description: "",
          link: "",
        },
      ]
    }));
  };
  return {
    achievements: resumeInfo?.achievements || [],
    updateAchievementContext,
    addAchievementContext,
    removeAchievementContext
  };
};

export default useAchievements;
