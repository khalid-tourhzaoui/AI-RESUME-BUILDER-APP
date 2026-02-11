import React from "react";
import { AlertCircle, Zap } from "lucide-react";
import { useForm } from "@inertiajs/react";
import ResumeTitle from "./ResumeTitle";
import PreviewModal from "../PreviewModal";
import Download from "./Download";
import Share from "./Share";
import MoreOption from "./MoreOption";

const TopSection = ({ document, locale, translations }) => {
    const { data, setData, put, processing } = useForm({
        title: document.title,
        status: document.status,
    });

    const isArchived = document.status === "archived";

    const handleTitleChange = (title) => {
        setData("title", title);
    };

    const handleSave = () => {
        put(route("documents.update", document.document_id), {
            title: data.title,
        });
    };

    return (
        <div className="relative">
            {/* Archived Alert Banner */}
            {isArchived && (
                <div className="mb-4 sm:mb-6">
                    <div className="bg-red-400 border-4 border-zinc-800 rounded-xl sm:rounded-2xl shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-800 flex-shrink-0" />
                        <p className="text-xs sm:text-sm md:text-base font-black uppercase text-zinc-800 text-center">
                            This resume is in the trash bin
                        </p>
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-800 flex-shrink-0" />
                    </div>
                </div>
            )}

            {/* Main Header Card */}
            <div className="bg-yellow-50 border-4 sm:border-6 border-zinc-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_12px_0px_0px] overflow-hidden">
                {/* Header Top Bar */}
                <div className="bg-white border-b-4 sm:border-b-6 border-zinc-800 px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="bg-red-400 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                            <span className="bg-yellow-400 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                            <span className="bg-green-500 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                        </div>
                        <h3 className="text-xs sm:text-sm md:text-base font-black uppercase ml-2 hidden sm:block">
                            Resume Editor
                        </h3>
                    </div>
                    <span className="text-[10px] sm:text-xs text-zinc-500 font-mono hidden md:flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Auto-save enabled
                    </span>
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-4 md:p-3">
                    <div className="flex justify-between gap-3 sm:gap-6">
                        {/* Title Section */}
                        <div className="w-full">
                            <ResumeTitle
                                isLoading={processing}
                                initialTitle={data.title}
                                status={data.status}
                                onSave={handleTitleChange}
                                handleSave={handleSave}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-stretch mt-2 gap-2 sm:gap-3 w-full flex-wrap">
                            <PreviewModal document={document} isLoading={processing} />
                            <Download
                                title={data.title}
                                status={data.status}
                                isLoading={processing}
                            />
                            <Share document={document} isLoading={processing} />
                            <MoreOption document={document} isLoading={processing} />
                        </div>
                    </div>
                </div>

                {/* Footer Bar */}
                {/* <div className="bg-zinc-800 border-t-4 sm:border-t-6 border-zinc-800 px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between flex-wrap gap-2">
                    <p className="text-white text-[10px] sm:text-xs font-mono flex items-center gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Edit • Save • Download • Share</span>
                        <span className="sm:hidden">Quick actions</span>
                    </p>
                    {!isArchived && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="bg-green-500 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full border-2 border-white animate-pulse"></div>
                            <span className="text-white text-[10px] sm:text-xs font-mono">Active</span>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default TopSection;
