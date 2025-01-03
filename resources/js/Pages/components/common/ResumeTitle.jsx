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
        <div className="flex items-center gap-1 pb-3">
            <h5
                className="text-lg px-4 text-black border-2 border-black font-semibold opacity-100 !pointer-events-none"
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
                    <Lock size="20px" className="stroke-black" />
                ) : status === "public" ? (
                    <Globe size="20px" className="stroke-black" />
                ) : status === "archived" ? (
                    <Trash2 size="20px" className="stroke-black" />
                ) : null}
            </span>
            <Save
                className="stroke-black cursor-pointer"
                onClick={() => handleSave()}
                size="20px"
            />
        </div>
    );
}

export default ResumeTitle;
