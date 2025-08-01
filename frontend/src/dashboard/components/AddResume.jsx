import { Loader2, PlusSquare, Upload, FilePlus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeApi } from "../../hooks/useResumeApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import clsx from "clsx";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState(null);
  const navigation = useNavigate();
  const {
    createUpdateResume,
    updateResumeError,
    extractUserInfo,
    extractUserInfoError,
  } = useResumeApi();

  useEffect(() => {
    const user_email = localStorage.getItem("email");
    setEmailAddress(user_email);
  }, []);

  const onCreate = async () => {
    var extractedData = null;
    if (selectedOption === "upload") {
      if (!file) {
        toast.error("Please upload a PDF file");
        return;
      }
      setUploadLoading(true);
      try {
        const formData = new FormData();
        formData.append("resume", file);
        const res = await extractUserInfo(formData, emailAddress);
        if (res?.data && !res.data.error) {
          extractedData = res.data;
          toast.success("Resume extracted successfully");
        } else {
          throw new Error("Error extracting resume");
        }
      } catch (error) {
        setUploadLoading(false);
        console.error("Error extracting resume:", error);
        toast.error("Error extracting resume. Please try again.");
        return;
      }
    }

    setLoading(true);
    const data = {
      title: resumeTitle,
      userEmail: emailAddress.split("@")[0],
    };
    const res = await createUpdateResume(data);
    setLoading(false);
    setOpenDialog(false);
    setResumeTitle("");
    if (res?.data) {
      const resumeId = res.data.data[0].id;
      if(extractedData) {
        console.log("Extracted User Info:", extractedData);
        extractedData["resume"] = {
          'id': resumeId,
          'title': resumeTitle,
          'userEmail': emailAddress.split("@")[0],
          'themeColor': res.data.data[0].themeColor || "#4B5563", // Default to grey-700 if not set
        }
        navigation(`/dashboard/resume/${resumeId}/edit`, {
          state: { extractedResume: extractedData }
        });
      }else{
        navigation(`/dashboard/resume/${resumeId}/edit`);
      }
    } else if (res?.error || updateResumeError) {
      toast.error("Error creating resume");
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] 
      hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        style={{ borderColor: "#FFD700" }}
        onClick={() => {
          setSelectedOption(null);
          setResumeTitle("");
          setFile(null);
          setOpenDialog(true);
        }}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>How would you like to start?</DialogTitle>
            <DialogDescription>
              Choose an option to begin building your resume.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div
              onClick={() => setSelectedOption("create")}
              className={clsx(
                "border rounded-lg p-4 cursor-pointer hover:border-primary transition-all",
                selectedOption === "create" && "border-primary bg-muted"
              )}
            >
              <FilePlus className="mb-2" />
              <p className="font-semibold">Create from Scratch</p>
              <p className="text-xs text-muted-foreground">
                Start with a blank resume
              </p>
            </div>

            <div
              onClick={() => setSelectedOption("upload")}
              className={clsx(
                "border rounded-lg p-4 cursor-pointer hover:border-primary transition-all",
                selectedOption === "upload" && "border-primary bg-muted"
              )}
            >
              <Upload className="mb-2" />
              <p className="font-semibold">Upload Resume</p>
              <p className="text-xs text-muted-foreground">
                Parse from PDF file
              </p>
            </div>
          </div>

          {/* For Create Option */}
          {selectedOption === "create" && (
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium">Resume Title</label>
              <Input
                placeholder="e.g., Frontend Developer"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </div>
          )}

          {/* For Upload Option */}
          {selectedOption === "upload" && (
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-sm font-medium">
                  Upload your PDF Resume
                </label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.name}
                  </p>
                )}
              </div>

              {/* Resume Title input appears only after file is selected */}
              {file && (
                <div>
                  <label className="text-sm font-medium">Resume Title</label>
                  <Input
                    placeholder="e.g., Backend Developer"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-4">
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>

            {selectedOption === "create" && (
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Continue"}
              </Button>
            )}

            {selectedOption === "upload" && (
              <Button
                disabled={!file || !resumeTitle || uploadLoading}
                onClick={onCreate}
              >
                {uploadLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
