import React, { useState, useEffect } from "react";
import { FileText, Globe, Lock, Save, Trash2, Zap } from "lucide-react";

function ResumeTitle({ initialTitle, status, isLoading, onSave, handleSave }) {
    const [title, setTitle] = useState(initialTitle || "Untitled Resume");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (initialTitle) setTitle(initialTitle);
    }, [initialTitle]);

    const handleBlur = (e) => {
        const newTitle = e.target.innerText;
        setTitle(newTitle);
        setIsEditing(false);
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

    const getStatusConfig = () => {
        switch (status) {
            case "archived":
                return {
                    icon: Trash2,
                    color: "bg-red-400",
                    label: "Archived"
                };
            case "public":
                return {
                    icon: Globe,
                    color: "bg-green-500",
                    label: "Public"
                };
            case "private":
            default:
                return {
                    icon: Lock,
                    color: "bg-blue-500",
                    label: "Private"
                };
        }
    };

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
            {/* Title Editor Card */}
            <div className="flex-grow bg-white border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] overflow-hidden group hover:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] transition-all w-full">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                    <h5
                        className={`text-sm sm:text-base md:text-lg font-black uppercase flex-grow ${
                            isEditing ? 'text-orange-500' : 'text-zinc-800'
                        } ${
                            isLoading || status === "archived"
                                ? 'cursor-not-allowed opacity-60'
                                : 'cursor-text hover:text-orange-500'
                        } transition-colors outline-none break-words`}
                        contentEditable={
                            isLoading || status === "archived" ? false : true
                        }
                        suppressContentEditableWarning={true}
                        onFocus={() => setIsEditing(true)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                    >
                        {title}
                    </h5>
                </div>
            </div>

            {/* Status Badge & Save Button Container */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                {/* Status Badge */}
                <div className={`${statusConfig.color} border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] p-2 sm:p-2 flex items-center gap-2 group hover:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] transition-all flex-1 sm:flex-initial justify-center sm:justify-start`}>
                    <StatusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-800 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-black uppercase text-zinc-800">
                        {statusConfig.label}
                    </span>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={isLoading || status === "archived"}
                    className={`bg-yellow-400 border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] p-2 sm:p-2 flex items-center gap-2 font-black uppercase text-xs sm:text-sm transition-all flex-1 sm:flex-initial justify-center ${
                        isLoading || status === "archived"
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px] hover:translate-y-[2px] sm:hover:translate-y-[3px] active:shadow-none active:translate-y-[4px] sm:active:translate-y-[6px]'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-800 animate-pulse" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-800" />
                            <span>Save</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ResumeTitle;
