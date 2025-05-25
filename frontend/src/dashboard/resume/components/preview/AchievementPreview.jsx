import React from "react";

const AchievementPreview = ({ resumeInfo }) => {
  const themeColor = resumeInfo?.resume?.themeColor || "#4B5563";
  const achievements = resumeInfo?.achievements || [];
  const dummyAchievements = [
    {
      title: "Hackathon Winner",
      description:
        "Won first place in a hackathon organized by XYZ Company, where I developed a mobile application that helps users track their carbon footprint.",
    },
    {
      title: "Top Performer Award",
      description:
        "Recognized as a top performer in my team for consistently exceeding performance targets and delivering high-quality work.",
    },
  ];

  const empty = achievements?.length === 0 || (achievements[0]?.title === "" && achievements[0]?.description === "" && achievements[0]?.link === "");
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Achievements
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {empty ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-xs text-gray-500">
            {dummyAchievements.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.title}:</span>{" "}
                {item.description}
              </li>
            ))}
          </p>
        </div>
      ) : (
        <ul className="list-disc list-inside text-xs mt-4 space-y-2">
          {achievements.map((achieve, index) => (
            <div key={achieve?.id} className="my-3">
              <div className="flex items-start justify-between gap-4">
                {/* Title and description on the left */}
                <div className="flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: themeColor }}
                  >
                    {achieve.title}
                  </p>
                  {achieve.description && (
                    <p className="text-xs font-normal">{achieve.description}</p>
                  )}
                </div>

                {/* Link fixed on the right */}
                {achieve.link && (
                  <a
                    href={achieve.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline whitespace-nowrap"
                  >
                    Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AchievementPreview;
