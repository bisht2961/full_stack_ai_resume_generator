import SummaryPreview from "../preview/SummaryPreview";
import ExperiencePreview from "../preview/ExperiencePreview";
import EduPreview from "../preview/EduPreview";
import SkillsPreview from "../preview/SkillsPreview";
import AchievementPreview from "../preview/AchievementPreview";
import ProjectPreview from "../preview/ProjectPreview";
import PersonalDetailPreview from "../preview/PersonalDetailPreview";

const TemplateOne = ({ resumeInfo }) => (
  <div
    className="shadow-lg h-full p-14 border-t-[20px]"
    style={{ borderColor: resumeInfo?.resume?.themeColor || "#4B5563" }}
  >
    <PersonalDetailPreview resumeInfo={resumeInfo} />
    <SummaryPreview resumeInfo={resumeInfo} />
    <EduPreview resumeInfo={resumeInfo} />
    <ExperiencePreview resumeInfo={resumeInfo} />
    <ProjectPreview resumeInfo={resumeInfo} />
    <SkillsPreview resumeInfo={resumeInfo} />
    <AchievementPreview resumeInfo={resumeInfo} />
  </div>
);
export default TemplateOne;