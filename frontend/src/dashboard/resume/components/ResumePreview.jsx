import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";  
import TemplateThree from "./templates/TemplateThree";

const ResumePreview = ({ resumeInfo, selectedTemplate }) => {
  switch (selectedTemplate) {
    case "template2":
      return <TemplateTwo resumeInfo={resumeInfo} />;
    case "template3":
      return <TemplateThree resumeInfo={resumeInfo} />;
    case "template1":
    default:
      return <TemplateOne resumeInfo={resumeInfo} />;
  }
};


// function ResumePreview() {
//   const { resumeInfo} = useContext(ResumeInfoContext);
//   const selectedTemplate = resumeInfo?.resume?.template || "templateOne";

//   const templates = {
//     templateOne: TemplateOne,
//     templateTwo: TemplateTwo,
//     templateThree: TemplateThree,
//   };
//   const SelectedTemplate = templates[selectedTemplate] || TemplateOne;
//   return <SelectedTemplate resumeInfo={resumeInfo} />;
//   return (
//     <div
//       className="shadow-lg h-full p-14 border-t-[20px]"
//       style={{
//         borderColor: resumeInfo?.resume?.themeColor || "#4B5563",
//       }}
//     >
//       {/* Personal Details */}
//       <PersonalDetailPreview resumeInfo={resumeInfo} />

//       {/* Summary */}
//       <SummaryPreview resumeInfo={resumeInfo} />

//       {/* Education */}
//       <EduPreview resumeInfo={resumeInfo} />

//       {/* Professional Experience */}
//       <ExperiencePreview resumeInfo={resumeInfo} />

      
//       {/* Projects */}
//       <ProjectPreview resumeInfo={resumeInfo} />

//       {/* Skills */}
//       <SkillsPreview resumeInfo={resumeInfo} />

//       {/* Achievements */}
//       <AchievementPreview resumeInfo={resumeInfo} />

//     </div>
//   );
// }

export default ResumePreview;
