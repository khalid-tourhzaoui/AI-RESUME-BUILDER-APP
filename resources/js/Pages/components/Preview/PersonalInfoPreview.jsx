import { Skeleton } from "@/Components/ui/skeleton";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import React from "react";

function PersonalInfoPreview({ document, isLoading }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    console.log(document);
    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full min-h-14">
            <h2 className="font-bold text-xl text-center"style={{color: themeColor,}}>
                {document?.personal_info?.first_name || "First Name"}{" "}
                {document?.personal_info?.last_name || "Last Name"}
            </h2>
            <h5 className="text-center text-sm font-medium">
                {document?.personal_info?.job_title || "Job Title"}
            </h5>
            <p className="text-center font-normal text-[13px]">
                {document?.personal_info?.address || "House Address"}
            </p>

            <div className="flex items-center justify-between pt-3">
                <h5 className="font-normal text-[13px]">
                    {document?.personal_info?.phone || "Phone number"}
                </h5>
                <h5 className="font-normal text-[13px]">
                    {document?.personal_info?.email || "Email address"}
                </h5>
            </div>

            <hr className="border-[1.5px] my-2"style={{borderColor: themeColor,}}/>
        </div>
    );
}

const SkeletonLoader = () => {
    return (
        <div className="w-full min-h-14">
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
            <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-[1.5] w-full my-2" />
        </div>
    );
};

export default PersonalInfoPreview;
