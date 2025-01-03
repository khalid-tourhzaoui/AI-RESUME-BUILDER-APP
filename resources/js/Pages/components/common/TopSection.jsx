import React from "react";
import { AlertCircle } from "lucide-react";
import { useForm } from "@inertiajs/react";
import ResumeTitle from "./ResumeTitle";
import PreviewModal from "../PreviewModal";
import Download from "./Download";
import Share from "./Share";
import MoreOption from "./MoreOption";

const TopSection = ({ document }) => {
    const { data, setData, put, processing } = useForm({
        title: document.title,
        status: document.status,
    });

    const isArchived = document.status === "archived";

    const handleTitleChange = (title) => {
        setData("title", title);
    };

    const handleSave = () => {
        // Directly use data.title, which is managed by useForm
        put(route("documents.update", document.document_id), {
            title: data.title,
        });
    };

    return (
        <>
            {isArchived && (
                <div className="absolute z-[9] inset-0 h-6 top-0 text-center text-base p-2 flex items-center gap-x-2
                    justify-center font-medium">
                    <AlertCircle size="16px" />
                    This resume is in the trash bin
                </div>
            )}
            <div className="w-full flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                    <ResumeTitle
                        isLoading={processing}
                        initialTitle={data.title}
                        status={data.status}
                        onSave={handleTitleChange}
                        handleSave={handleSave}
                    />
                </div>
                <div className="flex items-center gap-2">
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
        </>
    );
};

export default TopSection;
