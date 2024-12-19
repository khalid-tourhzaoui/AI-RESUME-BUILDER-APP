import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useForm } from "@inertiajs/react";
import ResumeTitle from "./ResumeTitle";
import ThemeColor from "./ThemeColor";
import PreviewModal from "./PreviewModal";
import Download from "./Download";
import Share from "./Share";
import MoreOption from "./MoreOption";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/Components/ui/button";

const TopSection = ({ document }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: document.title,
        status: document.status,
    });

    const isArchived = document.status === "archived"; // Improved check for archived status

    const handleTitleChange = (title) => {
        setData("title", title);
    };

    const handleSave = () => {
        // Directly use data.title, which is managed by useForm
        put(route("documents.update", document.document_id), {
            title: data.title,
        })
            .then(() => {
                toast({
                    title: "Success",
                    description: "Title updated successfully",
                });
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "Failed to update the title",
                    variant: "destructive",
                });
            });
    };

    return (
        <>
            {isArchived && (
                <div className="absolute z-[9] inset-0 h-6 top-0 bg-rose-500 text-center text-base p-2 text-white flex items-center gap-x-2 justify-center font-medium">
                    <AlertCircle size="16px" />
                    This resume is in the trash bin
                </div>
            )}
            <div className="w-full flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                    <ResumeTitle
                        isLoading={processing}
                        initialTitle={data.title} // Use data.title from useForm
                        status={data.status}
                        onSave={handleTitleChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <ThemeColor />
                    <PreviewModal />
                    <Download
                        title={data.title}
                        status={data.status}
                        isLoading={processing}
                    />
                    <Share />
                    <MoreOption />
                </div>
            </div>
            <div>
                {/* <Button 
          onClick={handleSave} 
          disabled={processing} 
          className="btn btn-primary"
        >
          Save Changes
        </Button> */}
            </div>
        </>
    );
};

export default TopSection;
