import SummaryPreview from "../preview/SummaryPreview";
import ExperiencePreview from "../preview/ExperiencePreview";
import EduPreview from "../preview/EduPreview";
import SkillsPreview from "../preview/SkillsPreview";
import AchievementPreview from "../preview/AchievementPreview";
import ProjectPreview from "../preview/ProjectPreview";
import PersonalDetailPreview from "../preview/PersonalDetailPreview";


const TemplateTwo = ({ resumeInfo }) => (
  <div
    className="shadow-lg h-full p-10 grid grid-cols-3 gap-10"
    style={{ borderTop: `20px solid ${resumeInfo?.resume?.themeColor || "#4B5563"}` }}
  >
    <div className="col-span-1 space-y-4">
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SkillsPreview resumeInfo={resumeInfo} />
      <AchievementPreview resumeInfo={resumeInfo} />
    </div>
    <div className="col-span-2 space-y-4">
      <SummaryPreview resumeInfo={resumeInfo} />
      <EduPreview resumeInfo={resumeInfo} />
      <ExperiencePreview resumeInfo={resumeInfo} />
      <ProjectPreview resumeInfo={resumeInfo} />
    </div>
  </div>
);
export default TemplateTwo;
