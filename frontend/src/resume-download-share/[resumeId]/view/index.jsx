import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useResumeApi } from "../../../hooks/useResumeApi";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";
import { getResumeInfo } from "../../../utils/resumeUtils";

const base_url = import.meta.env.VITE_APP_URL;
import html2pdf from "html2pdf.js";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams();
  const [resumeUrl, setResumeUrl] = useState("");
  const {
    getResume,
    getPersonalInfo,
    getExperienceById,
    getSkillsById,
    getEducationById,
    getSummaryById,
    uploadResumePdf,
    uploadResumePdfError,
  } = useResumeApi();

  useEffect(() => {
    // console.log(resumeId);
    resumeId && fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    setLoading(true);
    const data = await getResumeInfo({
      resumeId,
      getResume,
      getPersonalInfo,
      getExperienceById,
      getEducationById,
      getSkillsById,
      getSummaryById,
    });
    console.log(data);
    setResumeInfo(data);
    setLoading(false);
  };

  const handleDownload = async () => {
    const element = document.getElementById("print-area"); // your preview wrapper div
    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const worker = html2pdf().set(opt).from(element);
    const pdfBlob = await worker.outputPdf("blob");
    const formData = new FormData();
    formData.append("file", pdfBlob, "resume.pdf");
    const res = await uploadResumePdf(resumeId, formData);

    if (res.data) {
      console.log(res);
      setResumeUrl(res.data.url);
      toast.success("Resume pdf uploaded successfully.");
    }
    if (uploadResumePdfError) {
      toast.error("Error uploading resume pdf.");
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Your AI generated resume is ready to downaload and share.
          </h2>
          <div className="flex justify-between mx-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Checkout my awesome resume generated using AI.",
                url: resumeUrl || "https://placeholder.com", // fallback URL
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " Resume",
              }}
              onClick={(e) => {
                if (!resumeUrl) {
                  e.preventDefault();
                  toast.error("Please wait, resume is uploading...");
                } else {
                  console.log("shared successfully!");
                }
              }}
            >
              <Button disabled={!resumeUrl}>Share 🔗</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        {loading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        ) : (
          <ResumePreview resumeInfo={resumeInfo} />
        )}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
