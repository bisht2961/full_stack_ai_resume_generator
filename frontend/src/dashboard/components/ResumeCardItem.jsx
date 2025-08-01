import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useResumeApi } from "../../hooks/useResumeApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, onDelete }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { deleteResume, deleteResumeError } = useResumeApi();

  const onDeleteClicked = async () => {
    setLoading(true);
    const res = await deleteResume(resume.id);
    if (res.data) {
      setLoading(false);
      setOpenAlert(false);
      onDelete(resume.id);
      toast.success("Resume deleted successfully");
    }
    if (deleteResumeError) {
      setLoading(false);
      setOpenAlert(false);
      toast.error("Error deleting resume");
    }
  };
  return (
    <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:ring-2 hover:ring-indigo-300 hover:ring-offset-2 hover:ring-offset-white">
      {/* Clickable Resume Preview */}
      <Link to={`/dashboard/resume/${resume.id}/edit`}>
        <div
          className="h-[280px] flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border-2 rounded-t-lg"
          style={{ borderColor: resume?.themeColor }}
        >
          <Notebook className="w-12 h-12 text-gray-700" />
        </div>
      </Link>

      {/* Footer with title and actions */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-white border-t"
        style={{ borderColor: resume?.themeColor }}
      >
        {/* Resume Title */}
        <h2 className="text-base font-semibold text-gray-800 truncate max-w-[180px]">
          {resume.title}
        </h2>

        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-44 bg-white text-gray-800 shadow-lg border rounded-md py-1"
            sideOffset={4}
          >
            <DropdownMenuCheckboxItem
              className="px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => navigation(`/dashboard/resume/${resume.id}/edit`)}
            >
              Edit
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() =>
                navigation(`/resume-download-share/${resume.id}/view`)
              }
            >
              View
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="px-4 py-2 text-sm hover:bg-red-100 text-red-600"
              onClick={() => setOpenAlert(true)}
            >
              Delete
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete Alert Dialog */}
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteClicked} disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin h-4 w-4" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;
