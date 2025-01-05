import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { Star } from "lucide-react";

function SkillPreview({ document }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    return (
        <section>
    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span>
        Skills
    </h3>
    <div className="flex flex-wrap gap-2">
        {(document?.skills?.length > 0 ? document.skills : [
            { name: "JavaScript", rating: 4 },
            { name: "React", rating: 5 },
            { name: "CSS", rating: 3 },
            { name: "HTML", rating: 4 },
            { name: "HTML", rating: 4 },
            { name: "TailwindCSS", rating: 2},
            { name: "Scrum", rating: 4 },

        ]).map((skill, index) => (
            <div
                key={index}
                className="flex flex-col items-center px-4 py-2 bg-purple-50 text-gray-800 rounded-xl text-sm"
            >
                <span className="font-medium">{skill.name}</span>
                <div className="flex gap-1 mb-1">
                    {Array(skill.rating)
                        .fill()
                        .map((_, i) => (
                            <Star
                                key={i}
                                className="w-3 h-3"
                                style={{ color: themeColor }}
                            />
                        ))}
                </div>
                {/* <span className="font-medium">{skill.name}</span> */}
            </div>
        ))}
    </div>
</section>

    );
}

export default SkillPreview;
