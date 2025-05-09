import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import {getResumeInfo} from "@/utils/resumeUtils";
import { LoaderCircle } from "lucide-react";

function EditResume() {
  
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const { getResume,getPersonalInfo ,getExperienceById, getSkillsById, getEducationById,getSummaryById } = useResumeApi()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(resumeId)
    resumeId&&fetchResumeInfo();
  }, []);


  const fetchResumeInfo = async () => {
    try {
      setLoading(true);
      const data = await getResumeInfo({resumeId,
        getResume,
        getPersonalInfo,
        getExperienceById,
        getEducationById,
        getSkillsById,
        getSummaryById});
      // console.log(data)
      setResumeInfo(data);
      setLoading(false);
    } catch (err) {
      console.error("Unexpected error:", err); // Only if something weird happens (not in individual API calls)
      setLoading(false);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <LoaderCircle className="animate-spin" size={50} color="#000" />
        </div>
      ) : (
        <div className="flex gap-10 p-10">
          <div className="w-1/3 border-r-2 pr-5">
            <FormSection resumeInfo={resumeInfo} />
          </div>
          <div className="w-2/3">
            <ResumePreview resumeInfo={resumeInfo} />
          </div>
        </div>
      )}
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
