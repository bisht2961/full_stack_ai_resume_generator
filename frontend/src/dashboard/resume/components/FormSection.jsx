import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Achievement from "./forms/Achievement";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Project from "./forms/Project";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className=""
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft /> Back{" "}
            </Button>
          )}

          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Details */}

      {activeFormIndex === 1 && (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Summary*/}
      {activeFormIndex === 2 && (
        <Summary enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Education */}
      {activeFormIndex == 3 && (
        <Education enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Experience */}
      {activeFormIndex == 4 && (
        <Experience enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Projects */}
      {activeFormIndex == 5 && <Project enableNext={(v) => setEnableNext(v)} />}

      {/* Skills */}
      {activeFormIndex == 6 && <Skills enableNext={(v) => setEnableNext(v)} />}

      {/* Achievements */}
      {activeFormIndex == 7 && (
        <Achievement enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Preview */}
      {activeFormIndex == 8 && (
        <Navigate to={"/resume-download-share/" + resumeId + "/view"} />
      )}
    </div>
  );
}

export default FormSection;
