import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";
import EditableBulletsModal from "./EditableBulletsModal ";
import { extractText, checkValidations } from "../../../utils/utils";

function RichTextEditorGeneric({
  label,
  index,
  dataList,
  fieldName,
  onRichTextEditorChange,
  validationChecks = [],
  generateApi,
  regenerateApi,
  inputData,
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [bullets, setBullets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setValue(dataList?.[index]?.[fieldName]);
  }, [dataList]);

  // const checkValidations = (index) => {
  //   for (const { field, message } of validationChecks) {
  //     if (!dataList[index]?.[field].trim()) {
  //       return { valid: false, message };
  //     }
  //   }
  //   return { valid: true };
  // };

  const handleSave = () => {
    const html = `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
    setValue(html);
    onRichTextEditorChange({ target: { value: html } });
    setShowModal(false);
  };

  const parseHtmlToBulletPoints = (htmlString) => {
    const container = document.createElement("div");
    container.innerHTML = htmlString;
    const listItems = container.querySelectorAll("li");
    return Array.from(listItems).map((li) => li.innerHTML);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const { valid, message } = checkValidations(validationChecks,dataList, index);
    if (!valid) {
      toast.error(message);
      setLoading(false);
      return;
    }
    const data = {
      user_input: inputData,
    };
    if (value && value.trim().length > 0) {
      data.user_input = extractText(value);
    }
    console.log("Data to send", data);
    const res = await generateApi(data);
    if (res?.data && res.data.length > 0) {
      const bulletArray = res.data.map((item) => {
        return `<li>${item}</li>`;
      });
      const htmlString = `<ul>${bulletArray.join("")}</ul>`;
      const bulletsFromAI = parseHtmlToBulletPoints(htmlString);
      setBullets(bulletsFromAI);
      setShowModal(true);
      toast.success("Summary generated");
    } else {
      toast.error("Generation failed. Try again after some time");
    }
    setLoading(false);
  };

  const handleRegenerate = async () => {
    setLoading(true);
    const data = {
      user_input: extractText(value),
    };
    const res = await regenerateApi(data);

    if (res?.data && res.data.length > 0) {
      const bulletArray = res.data.map((item) => {
        return `<li>${item}</li>`;
      });
      const htmlString = `<ul>${bulletArray.join("")}</ul>`;
      const bulletsFromAI = parseHtmlToBulletPoints(htmlString);
      setBullets(bulletsFromAI);
      setShowModal(true);
      toast.success("Summary regenerated");
    } else {
      toast.error("Generation failed. Try again after some time");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">{label}</label>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerate}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onRichTextEditorChange(event);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <EditableBulletsModal
        label={label}
        open={showModal}
        bullets={bullets}
        onBulletChange={(i, val) =>
          setBullets((prev) => prev.map((b, idx) => (idx === i ? val : b)))
        }
        onRemove={(i) =>
          setBullets((prev) => prev.filter((_, idx) => idx !== i))
        }
        onRegenerate={handleRegenerate}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}
export default RichTextEditorGeneric;
