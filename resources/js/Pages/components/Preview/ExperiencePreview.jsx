import { INITIAL_THEME_COLOR } from "@/lib/helper";
import React from "react";
import SkeletonLoader from "../skeleton-loader";

function ExperiencePreview({document, isLoading}) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;

  if (isLoading) {
    return <SkeletonLoader />;
  }
    return (
        <div className="w-full my-5">
            <h5 className="text-center font-bold mb-2"style={{ color: themeColor }}>
                Professional Experience
            </h5>
            <hr className="border-[1.5px] my-2"style={{borderColor: themeColor,}}/>

            <div className="flex flex-col gap-2 min-h-9">
                {document?.experience?.map((item, index) => (
                    <div key={index}>
                        <h5 className="text-[15px] font-bold" style={{ color: themeColor }}>
                            {item?.title}
                        </h5>
                        <div className="flex items-start justify-between mb-2">
                            <h5 className="text-[13px]">
                                {item?.company_name}
                                {item?.company_name && item?.city &&", "}
                                {item?.city}
                                {item?.city && item?.country && ", "}
                                {item?.country}
                            </h5>
                            <span className="text-[13px]">
                                {item?.start_date}
                                {item?.start_date && " - "}
                                {item?.currently_working
                                    ? "Present"
                                    : item?.end_date}
                            </span>
                        </div>
                        <div
                            style={{ fontSize: "13px" }}
                            className="exp-preview leading-[14.6px]"
                            dangerouslySetInnerHTML={{
                                __html: item?.work_summary || "",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperiencePreview;
