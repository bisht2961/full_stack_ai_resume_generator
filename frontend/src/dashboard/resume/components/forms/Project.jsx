import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useProjects from "@/hooks/useProject";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useResumeApi } from "@/hooks/useResumeApi";
import RichTextEditorGeneric from "../RichTextEditorGeneric";
import { useParams } from "react-router-dom";
import { extractText } from "@/utils/utils";
import { toast } from "sonner";

function Project({ enableNext }) {
  const [loading, setLoading] = React.useState(false);
  const {resumeId} = useParams()
  const {
    projects,
    addProjectContext,
    removeProjectContext,
    updateProjectContext,
  } = useProjects();
  const {
    updateProject,
    updateProjectError,
    deleteProject,
    generateAiDescription,
    regenerateAiDescription,
  } = useResumeApi();
  const validationChecks = [
    { field: "title", message: "Please add position title first." },
    {
      field: "description",
      message: "Please provide some project description",
    },
  ];

  const removeProject = async(index) => {
    setLoading(true);
    const projectId = projects[index]?.projectId;
    if (projectId) {
      const res = await deleteProject(projectId);
      if (res.data) {
        removeProjectContext(index);
        toast.success("Project deleted successfully");
        setLoading(false);
      }else{
        toast.error("Something went wrong");
        setLoading(false);
      }
    }else{
      removeProjectContext(index);
      toast.success("Project deleted successfully");
      setLoading(false);
    }

  };
  const onSave = async () => {
    setLoading(true);
    const data = projects.map(({ id, ...data }) => ({
      ...data,
      description: data.description,
      resumeId: resumeId,
    }));
    const res = await updateProject(data);
    if(res.data ){
      toast.success("Project updated successfully");
      setLoading(false);
    }else{
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  const handleRichTextEditor = (event, name, index) => {
    updateProjectContext(index, name, event.target.value);
  };

  const createInputProject = (project) => {
    return  `title: ${project.title}, description: ${project.description}`;
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p>Add personal projects for your resume</p>
        <div>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative grid grid-cols-2 mt-5 items-center gap-4 border rounded-lg p-3 mb-2"
            >
              <div className="col-span-2">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs">Title</label>
                    <input
                      onChange={(e) =>
                        updateProjectContext(index, "title", e.target.value)
                      }
                      defaultValue={project.title}
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs">Link</label>
                    <input
                      placeholder="e.g. https://example.com/certificate"
                      onChange={(e) =>
                        updateProjectContext(index, "link", e.target.value)
                      }
                      defaultValue={project.link}
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <RichTextEditorGeneric
                  label={"Description"}
                  index={index}
                  dataList={projects}
                  fieldName="description"
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "description", index)
                  }
                  validationChecks={validationChecks}
                  generateApi={generateAiDescription}
                  regenerateApi={regenerateAiDescription}
                  inputData={createInputProject(project)}
                />
              </div>
              <button
                onClick={() => removeProject(index)}
                className="absolute top-3 right-3 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addProjectContext}
            >
              + Add Project
            </Button>
          </div>
          <Button onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Project;
