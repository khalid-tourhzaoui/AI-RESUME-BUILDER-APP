import React from "react";
import ExperiencePreview from "./Preview/ExperiencePreview";
import PersonalInfoPreview from "./Preview/PersonalInfoPreview";
import { cn } from "./../../lib/utils";

function ResumePreview({ document, isLoading }) {
    return (
        <div
            id="resume-preview-id"
            className={cn(
                "shadow-lg !font-open-sans dark:border w-full h-auto flex gap-8 max-w-full mx-auto p-4 sm:p-8 bg-white"
            )}
            style={{ borderTop: `13px solid ${document?.theme_color}` }}
        >
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <PersonalInfoPreview
                    isLoading={isLoading}
                    document={document}
                />
                <ExperiencePreview isLoading={isLoading} document={document} />
            </div>
        </div>
    );
}

export default ResumePreview;
