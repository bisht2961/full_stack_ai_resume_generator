import SummaryPreview from "../preview/SummaryPreview";
import ExperiencePreview from "../preview/ExperiencePreview";
import EduPreview from "../preview/EduPreview";
import SkillsPreview from "../preview/SkillsPreview";
import AchievementPreview from "../preview/AchievementPreview";
import ProjectPreview from "../preview/ProjectPreview";
import PersonalDetailPreview from "../preview/PersonalDetailPreview";


const TemplateThree = ({ resumeInfo }) => (
  <div
    className="shadow-md p-12 space-y-10"
    style={{ borderLeft: `10px solid ${resumeInfo?.resume?.themeColor || "#4B5563"}` }}
  >
    <section>
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <hr className="my-2" />
    </section>
    <section>
      <SummaryPreview resumeInfo={resumeInfo} />
      <hr className="my-2" />
    </section>
    <section>
      <ExperiencePreview resumeInfo={resumeInfo} />
    </section>
    <section>
      <ProjectPreview resumeInfo={resumeInfo} />
    </section>
    <section>
      <EduPreview resumeInfo={resumeInfo} />
    </section>
    <section>
      <SkillsPreview resumeInfo={resumeInfo} />
    </section>
    <section>
      <AchievementPreview resumeInfo={resumeInfo} />
    </section>
  </div>
);
export default TemplateThree;
