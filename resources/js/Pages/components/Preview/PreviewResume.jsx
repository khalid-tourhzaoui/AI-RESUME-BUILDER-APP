import React from "react";
import SkillPreview from "./SkillPreview";
import EducationPreview from "./EducationPreview";
import ExperiencePreview from "./ExperiencePreview";
import SummaryPreview from "./SummaryPreview";
import PersonalInfoPreview from "./PersonalInfoPreview";
import { cn } from "@/lib/utils";
import { INITIAL_THEME_COLOR } from "@/lib/helper";

function PreviewResume({document,isLoading}) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    return (
        <div
            className={cn(`
        shadow-lg !bg-white w-full flex-[1.02]
        h-full p-10 !font-open-sans
        !text-black
        `)}
            style={{
                borderTop: `13px solid ${themeColor}`,
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

export default PreviewResume;
