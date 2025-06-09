
export const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Frontend Developer",
    text: "This AI resume builder saved me hours. The suggestions were spot-on, and the templates are beautiful!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Rohan Mehta",
    role: "Data Analyst",
    text: "I landed 3 interviews within a week using the resume this app generated. Totally worth it!",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Sarah Thomas",
    role: "Product Manager",
    text: "Loved how easy and intuitive the experience was. AI-generated content was accurate and powerful.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Aarav Singh",
    role: "Backend Engineer",
    text: "The best resume tool I've used—clean templates and really effective AI suggestions!",
    avatar: "https://i.pravatar.cc/150?img=56",
  },
  {
    name: "Emily Chen",
    role: "UX Designer",
    text: "Perfect for job seekers. The interface is sleek, and the results are amazing.",
    avatar: "https://i.pravatar.cc/150?img=63",
  },
];


export const mapResumeData = (data) => ({
    id: data.id,
    resumeId: data.id,
    title: data.title,
    themeColor: data.theme_color,
    userEmail: data.user_email,
})

export const mapPersonalInfo = (data) => ({
    firstName: data?.first_name? data?.first_name : "",
    lastName: data?.last_name? data?.last_name : "",
    jobTitle: data?.job_title? data.job_title : "",
    address: data?.address? data.address : "",
    phone: data?.phone? data.phone : "",
    email: data?.email? data.email : "",
    personalInfoId: data?.id? data.id : "",
});

export const mapExperience = (data) => (data.map((item) => ({
    id: item?.id,
    experienceId: item.id,
    title: item.title,
    companyName: item.company_name,
    city: item.city,
    state: item.state,
    startDate: item.start_date,
    endDate: item.end_date,
    workSummary: item.work_summary,
    currentlyWorking: item.currently_working,
})));

export const mapEducation = (data) => (data.map((item) => ({
    id: item.id,
    educationId: item.id,
    universityName: item.university_name,
    degree: item.degree,
    major: item.major,
    startDate: item.start_date,
    endDate: item.end_date,
    description: item.description,
})));

export const mapSkills = (data) => (data.map((item) => ({
    id: item.id,
    skillId: item.id,
    name: item.name,
    rating: item.rating,
})));

export const mapAchievements = (data) => (data.map((item) => ({
    id: item.id,
    achievementId: item.id,
    title: item.title,
    description: item.description,
    link: item.link,
})));

export const mapProjects = (data) => (data.map((item) => ({
    id: item.id,
    projectId: item.id,
    title: item.title,
    description: item.description,
    link: item.link? item.link : "",
})));

export const extractText = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // First try to extract list items
  const listItems = doc.querySelectorAll("li");
  if (listItems.length > 0) {
    const experiences = Array.from(listItems).map((li) => li.textContent.trim());
    return experiences.join("\n");
  }

  // If no list items, fall back to extracting text from paragraphs or body
  const bodyText = doc.body.textContent || "";
  return bodyText.trim();
};

export const createInputExperience = (data) => {
    return `Position: ${data.title}, Company: ${
        data.companyName
      }, Start Date: ${data.startDate}, End Date: ${
        data.endDate || "Currently Working"
      }`;
};

export const checkValidations = (validationChecks,dataList,index) => {
  for (const { field, message } of validationChecks) {
    const value = dataList[index]?.[field];

    // Handle string inputs (empty or whitespace-only)
    if (typeof value === "string" && value.trim() === "") {
      return { valid: false, message };
    }

    // Handle null, undefined, or other falsy non-zero values
    if (value === null || value === undefined) {
      return { valid: false, message };
    }

    // Optionally: Reject empty arrays or objects
    if (Array.isArray(value) && value.length === 0) {
      return { valid: false, message };
    }
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      return { valid: false, message };
    }
  }

  return { valid: true };
};
