import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useAchievements from "../../../../hooks/useAchievement";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Achievement({ enableNext }) {
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    achievements,
    updateAchievementContext,
    addAchievementContext,
    removeAchievementContext,
  } = useAchievements();

  const { addUpdateAchievements, addUpdateAchievementsError, deleteAchievements, deleteAchievementsError } = useResumeApi();

  const onSave = async () => {
    setLoading(true);
    const data = achievements.map(({ id, ...rest }) => rest);
    console.log("Achievements updated successfully", data);
    const res = await addUpdateAchievements(resumeId, data);
    if (res.data) {
      setLoading(false);
      toast.success("Achievements updated successfully");
      console.log("Achievements updated successfully", res);
    } else {
      setLoading(false);
      console.error("Error updating achievements", addUpdateAchievementsError);
      toast.error("Something went wrong while updating achievements");
    }
  };

  const handleDelete = async (index) => { 
    setLoading(true);

    if (achievements[index]?.achievementId) {
      const res = await deleteAchievements(achievements[index]?.achievementId);
      if (res.data) {
        setLoading(false);
        removeAchievementContext(index);
        toast.success("Achievement deleted successfully");
      } else {
        setLoading(false);
        toast.error("Error deleting achievement");
        console.error("Error deleting achievement", deleteAchievementsError);
      }
    } else {
      removeAchievementContext(index);
      toast.success("Achievement deleted successfully");
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Achievements</h2>
        <p>Add achievements for your resume</p>
        <div>
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="relative grid grid-cols-2 mt-5 items-center gap-4 border rounded-lg p-3 mb-2"
            >
              <div className="col-span-2">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs">Title</label>
                    <Input
                      onChange={(e) =>
                        updateAchievementContext(index, "title", e.target.value)
                      }
                      defaultValue={achievement.title}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs">Link</label>
                    <Input
                      placeholder="e.g. https://example.com/certificate"
                      onChange={(e) =>
                        updateAchievementContext(index, "link", e.target.value)
                      }
                      defaultValue={achievement.link}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-xs">Description</label>
                <Input
                  className="w-full"
                  onChange={(e) =>
                    updateAchievementContext(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  defaultValue={achievement.description}
                />
              </div>
              {/* Remove button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute w-5 h-5 top-2 right-2 bg-transparent text-red-500 hover:bg-transparent hover:text-red-700"
                title="Remove this skill"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addAchievementContext}
            >
              + Add Achievement
            </Button>
          </div>
          <Button onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Achievement;
