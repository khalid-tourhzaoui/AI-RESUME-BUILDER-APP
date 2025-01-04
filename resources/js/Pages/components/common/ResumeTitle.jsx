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
                className="text-lg p-1 text-black bg-white rounded-md font-semibold opacity-100 !pointer-events-none"
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
            <span className={`bg-white p-1 rounded-md ${status === 'archived' ? 'text-red-500' : ''}`}>
                {status === "private" ? (
                    <Lock size="25px" className="stroke-black" />
                ) : status === "public" ? (
                    <Globe size="25px" className="stroke-black" />
                ) : status === "archived" ? (
                    <Trash2 size="25px" className="stroke-black" />
                ) : null}
            </span>
            <Save
                className="stroke-black cursor-pointer p-1 bg-white rounded-md"
                onClick={() => handleSave()}
                size="32px"
            />
        </div>
    );
}

export default ResumeTitle;
