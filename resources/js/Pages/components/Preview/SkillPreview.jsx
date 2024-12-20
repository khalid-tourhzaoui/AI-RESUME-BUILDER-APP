import React from "react";
import SkeletonLoader from "../skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";

function SkillPreview({document, isLoading}) {
    const themeColor = document?.themeColor || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full my-5">
            <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>
                Skills
            </h5>
            <hr className="border-[1.5px] my-2" style={{borderColor: themeColor,}}/>

            <div className="grid grid-cols-2  gap-3 pt-3 my-1 min-h-9">
                {document?.skills?.map((skill, index) => (
                    <div key={index}
                        className="flex items-center justify-between">
                        <h5 className="text-[13px]">{skill?.name}</h5>
                        {skill?.rating && skill?.name ? (
                            <div className="h2 bg-gray-200 w-[120px]">
                                <div
                                    className="h-2"
                                    style={{
                                        background: themeColor,
                                        width: skill?.rating * 20 + "%",
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillPreview;
