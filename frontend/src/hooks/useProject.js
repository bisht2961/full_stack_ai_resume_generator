// src/hooks/usePersonalInfo.js
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { v4 as uuidv4 } from "uuid";

const useProjects = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const updateProjectContext = (index,key, value) => {
    setResumeInfo((prev) => {
        const updatedProjects = [...(prev.projects || [])];
        if (updatedProjects[index]) {
            updatedProjects[index] = {
            ...updatedProjects[index],
            [key]: value,
          };
        }
        return {
          ...prev,
          projects: updatedProjects,
        };
      });
  };

  const removeProjectContext = (index) => {
    setResumeInfo((prev) => {
      const updatedProjects = [...(prev.projects || [])];
      if (updatedProjects.length > 0 && index >= 0) {
        updatedProjects.splice(index, 1);
      }
      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };    

  const addProjectContext = () => {
    setResumeInfo((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
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
    projects: resumeInfo?.projects || [],
    updateProjectContext,
    addProjectContext,
    removeProjectContext
  };
};

export default useProjects;
