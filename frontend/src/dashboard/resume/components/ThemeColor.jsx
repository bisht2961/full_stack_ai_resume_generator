import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { useResumeApi } from "@/hooks/useResumeApi";

function ThemeColor() {
  const colors = [
  "#4B5563", // Gray-600
  "#000000", // Black-500
  "#2563EB", // Blue-600
  "#10B981", // Emerald-500
  "#F59E0B", // Amber-500
  "#EF4444", // Red-500
  "#8B5CF6", // Violet-500
  "#EC4899", // Pink-500
  "#14B8A6", // Teal-500
  "#3B82F6", // Blue-500
  "#6366F1", // Indigo-500
  "#F43F5E", // Rose-500
  "#22C55E", // Green-500
  "#EAB308", // Yellow-500
  "#0EA5E9", // Sky-500
  "#D946EF", // Fuchsia-500
  "#A855F7", // Purple-500
  "#FB923C", // Orange-400
];

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [themeColor, setThemeColor] = useState();
  const {createUpdateResume} = useResumeApi();
  const [open, setOpen] = useState(false); 
  
  useEffect(()=>{
    if(resumeInfo?.resume?.themeColor){
      setThemeColor(resumeInfo.resume.themeColor)
    }else{
      setThemeColor(colors[0])
    }
  },[])

  const onColorSelect = async(color)=>{
    setThemeColor(color);
    console.log("Selected color:", color);
    console.log("Resume Info:", resumeInfo);
    const data = {...resumeInfo.resume, themeColor: color};
    console.log(data)
    const res = await createUpdateResume(data);
    if(res.data){
      console.log(res.data)
      setResumeInfo({...resumeInfo, resume:{...resumeInfo.resume, themeColor: color}});
    }
    setOpen(false);

  }



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <Circle /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select theme color</h2>
        <div className="grid grid-cols-5 gap-3">
        {colors.map((color,index) => (
            <div
            key={index}
            className={`w-6 h-6 rounded-full m-1 cursor-pointer hover:border-black border ${themeColor === color ? 'border-black' : ''}`}
            style={{ background: color }}
            onClick={()=>onColorSelect(color)}
          ></div>
        ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
