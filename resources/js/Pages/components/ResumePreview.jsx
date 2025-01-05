import React from "react";
import ExperiencePreview from "./Preview/ExperiencePreview";
import PersonalInfoPreview from "./Preview/PersonalInfoPreview";
import { cn } from "./../../lib/utils";

function ResumePreview({ document, isLoading }) {
    return (
        <div
            id="resume-preview-id"
            className={cn(
                ` shadow-lg !font-open-sansdark:border w-full  flex-[1.02] h-full !font-open-sansdark:border flex gap-8 max-w-4xl mx-auto p-4 sm:p-8 bg-white min-h-screen`
            )}
            style={{ borderTop: `13px solid ${document?.theme_color}` }}
        >
            <div className="flex flex-col lg:flex-row gap-8">
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
