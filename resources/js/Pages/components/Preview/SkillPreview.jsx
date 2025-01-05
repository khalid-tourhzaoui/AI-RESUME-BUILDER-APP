import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { Star } from "lucide-react";

function SkillPreview({document, isLoading}) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor:themeColor}}></span>
                Skills
            </h3>
            <div className="flex flex-wrap gap-2">

                {document?.skills?.map((skill, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-purple-50 text-gray-800 rounded-full text-sm flex items-center gap-2"
                    >
                        {skill.name}
                        <span>
                            {Array(skill.rating)
                                .fill()
                                .map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 inline-flex"
                                        style={{ color: themeColor }}
                                    />
                                ))}
                        </span>
                    </span>
                ))}

            </div>
        </section>
    );
}

export default SkillPreview;
