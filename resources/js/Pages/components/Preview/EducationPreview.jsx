import React from "react";
import SkeletonLoader from "../skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";

function EducationPreview({document, isLoading}) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full my-5">
            <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>
                Education
            </h5>
            <hr className="border-[1.5px] my-2" style={{borderColor: themeColor}}/>

            <div className="flex flex-col gap-2 min-h-9">
                {document?.education?.map((item, index) => (
                    <div key={index}>
                        <h5
                            className="text-sm font-bold"
                            style={{ color: themeColor }}
                        >
                            {item?.universityName}
                        </h5>
                        <div className="flex items-start justify-between">
                            <h5 className="text-[13px]">
                                {item?.degree}
                                {item?.degree &&
                                    item?.major &&
                                    " in "}
                                {item?.major}
                            </h5>
                            <span className="text-[13px]">
                                {item?.start_date}
                                {item?.start_date && " - "}
                                {item?.end_date}
                            </span>
                        </div>
                        <p className="text-[13px] my-2">
                            {item?.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EducationPreview;
