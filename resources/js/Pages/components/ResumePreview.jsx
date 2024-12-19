import React from "react";
import SkillPreview from "./Preview/SkillPreview";
import EducationPreview from "./Preview/EducationPreview";
import ExperiencePreview from "./Preview/ExperiencePreview";
import SummaryPreview from "./Preview/SummaryPreview";
import PersonalInfoPreview from "./Preview/PersonalInfoPreview";
import { cn } from './../../lib/utils';

function ResumePreview({document}) {
    const isLoading = !document;
    return (
        <div id="resume-preview-id" className={cn(` shadow-lg bg-white w-full flex-[1.02] h-full p-10 !font-open-sansdark:border
             dark:bg-card dark:border-b-gray-800  dark:border-x-gray-800`)}
            style={{
                borderTop: `13px solid ${document?.theme_color}`,
            }}
        >
            {/* {Personnal Info} */}
            <PersonalInfoPreview isLoading={isLoading} document={document} />

            {/* {Summary} */}
            <SummaryPreview isLoading={isLoading} document={document} />

            {/* {Professional Exp} */}
            <ExperiencePreview isLoading={isLoading} document={document} />

            {/* {Educational Info} */}
            <EducationPreview isLoading={isLoading} document={document} />

            {/* {Skills} */}
            <SkillPreview isLoading={isLoading} document={document} />
        </div>
    );
}

export default ResumePreview;
