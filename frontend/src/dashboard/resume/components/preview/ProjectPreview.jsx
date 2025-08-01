import React from "react";

const ProjectPreview = ({ resumeInfo }) => {
  const themeColor = resumeInfo?.resume?.themeColor || "#4B5563";
  const projects = resumeInfo?.projects || [];
  const dummyProject = [
    {
      title: "AI Chatbot",
      description:
        "A chatbot that uses AI to answer questions\nA chatbot that uses AI to answer questions ",
      link: "",
    },
    {
      title: "Algorithm Visualizer",
      description: "A web app that visualizes algorithms in real time",
      link: "",
    },
    {
      title: " Youtube Clone",
      description: "A clone of youtube that allows you to watch videos",
      link: "",
    },
  ];
  const empty =
    projects?.length === 0 ||
    (projects[0]?.title === "" &&
      projects[0]?.description === "" &&
      projects[0]?.link === "");
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: empty ? "gray" : themeColor }}
      >
        Projects
      </h2>
      <hr style={{ borderColor: empty ? "gray" : themeColor }} />

      {empty ? (
        <div className="my-2 text-gray-400 italic text-xs">
          <div className="text-xs text-gray-500">
            {dummyProject.map((item, index) => (
              <div key={index} className="my-5">
                <h2
                  className="text-base font-bold"
                  style={{ color: 'gray' }}
                >
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-xs font-normal">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs mt-4 space-y-5">
          {projects.map((project, index) => (
            <div key={project?.id} className="flex justify-between items-start">
              {/* Left: Title and Description */}
              <div className="w-3/4">
                <h2
                  className="text-base font-bold"
                  style={{ color: themeColor }}
                >
                  {project.title}
                </h2>

                {project?.description && (
                  <div
                    className="text-sm my-2 prose prose-sm w-full max-w-none font-normal leading-relaxed font-['Inter'] text-gray-800"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
              </div>

              {/* Right: Link */}
              {project?.link && (
                <div className="w-1/4 text-right">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium"
                    style={{ color: themeColor }}
                  >
                    Visit ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPreview;
