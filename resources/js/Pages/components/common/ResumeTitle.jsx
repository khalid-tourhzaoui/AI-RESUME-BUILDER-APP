import React, { useState, useEffect } from "react";
import { FileText, Globe, Lock, Save, Trash2 } from "lucide-react";

function ResumeTitle({ initialTitle, status, isLoading, onSave, handleSave }) {
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

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    return (
        <div className="flex items-center gap-1 pr-4">
            <h5
                className="text-xl px-1 text-white dark:text-gray-300 font-semibold opacity-100 !pointer-events-none"
                contentEditable={
                    isLoading || status === "archived" ? false : true
                }
                suppressContentEditableWarning={true}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                spellCheck={false}
            >
                {title}
            </h5>
            <span className={status === "archived" ? "text-red-500" : ""}>
                {status === "private" ? (
                    <Lock size="20px" className="stroke-white" />
                ) : status === "public" ? (
                    <Globe size="20px" className="stroke-white" />
                ) : status === "archived" ? (
                    <Trash2 size="20px" className="stroke-white" />
                ) : null}
            </span>
            <Save
                className="stroke-white cursor-pointer"
                onClick={() => handleSave()}
                size="20px"
            />
        </div>
    );
}

export default ResumeTitle;
