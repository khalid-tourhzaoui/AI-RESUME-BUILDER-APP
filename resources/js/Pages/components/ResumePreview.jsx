import React from "react";
import SkillPreview from "./Preview/SkillPreview";
import EducationPreview from "./Preview/EducationPreview";
import ExperiencePreview from "./Preview/ExperiencePreview";
import SummaryPreview from "./Preview/SummaryPreview";
import PersonalInfoPreview from "./Preview/PersonalInfoPreview";
import { cn } from './../../lib/utils';

function ResumePreview({document,isLoading}) {

    return (
        <div id="resume-preview-id" className={cn(
            ` shadow-lg w-full flex-[1.02] h-full !font-open-sansdark:border max-w-6xl mx-auto p-8 bg-white min-h-screen flex gap-8`)}
            style={{
                borderTop: `13px solid ${document?.theme_color}`,
            }}
        >
            {/* Colonne de gauche */}
            <div className="w-1/3 space-y-4">
                {/* {Personnal Info} */}
                <PersonalInfoPreview isLoading={isLoading} document={document} />
            </div>
            {/* {Personnal Info}
            <PersonalInfoPreview isLoading={isLoading} document={document} />

            {/* {Summary} */}
            {/* <SummaryPreview isLoading={isLoading} document={document} /> */}

            {/* {Professional Exp} */}
            {/* <ExperiencePreview isLoading={isLoading} document={document} /> */}

            {/* {Educational Info} */}
            {/* <EducationPreview isLoading={isLoading} document={document} /> */}

            {/* {Skills} */}
            {/* <SkillPreview isLoading={isLoading} document={document} /> */}
        </div>
    );
}

export default ResumePreview;
