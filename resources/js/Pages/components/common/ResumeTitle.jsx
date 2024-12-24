import React, { useState, useEffect } from "react";
import { FileText, Globe, Lock, Save, Trash2 } from "lucide-react";

function ResumeTitle({ initialTitle, status, isLoading, onSave,handleSave }) {
  const [title, setTitle] = useState(initialTitle || "Untitled Resume");

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
  }, [initialTitle]);

  const handleBlur = (e) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle);
    if (onSave && typeof onSave === "function") {
      onSave(newTitle);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();

    }
  };

  return (
    <div className="flex items-center gap-1 pr-4">
      <FileText className=" hidden lg:flex stroke-primary" size="20px" />
      <h5
        className="text-[15px] px-1 text-gray-700 dark:text-gray-300 font-semibold opacity-100 !pointer-events-none"
        contentEditable={isLoading || status === "archived" ? false : true}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      >
        {title}
      </h5>
      <span className={status === "archived" ? "text-red-500" : ""}>
        {status === "private" ? (
          <Lock size="14px" />
        ) : status === "public" ? (
          <Globe size="14px" />
        ) : status === "archived" ? (
          <Trash2 size="14px" />
        ) : null}
      </span>
      <Save  className="stroke-primary cursor-pointer" onClick={()=>handleSave()} size="20px"/>
    </div>
  );
}

export default ResumeTitle;
