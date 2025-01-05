import React from "react";
import SkeletonLoader from "../skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { School } from "lucide-react";

function EducationPreview({document, isLoading}) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        // <div className="w-full my-5">
        //     <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>
        //         Education
        //     </h5>
        //     <hr className="border-[1.5px] my-2" style={{borderColor: themeColor}}/>

        //     <div className="flex flex-col gap-2 min-h-9">
        //         {document?.education?.map((item, index) => (
        //             <div key={index}>
        //                 <h5
        //                     className="text-sm font-bold"
        //                     style={{ color: themeColor }}
        //                 >
        //                     {item?.universityName}
        //                 </h5>
        //                 <div className="flex items-start justify-between">
        //                     <h5 className="text-[13px]">
        //                         {item?.degree}
        //                         {item?.degree &&
        //                             item?.major &&
        //                             " in "}
        //                         {item?.major}
        //                     </h5>
        //                     <span className="text-[13px]">
        //                         {item?.start_date}
        //                         {item?.start_date && " - "}
        //                         {item?.end_date}
        //                     </span>
        //                 </div>
        //                 <p className="text-[13px] my-2">
        //                     {item?.description}
        //                 </p>
        //             </div>
        //         ))}
        //     </div>
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" style={{ color: themeColor }} />
                Education
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {document?.education?.map((item, index) => {
                    const startDate = new Date(item.start_date).toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    });
                    const endDate = new Date(item.end_date).toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    });
                    return(
                        <div className="p-4 bg-gray-400 rounded-xl" key={index}>
                            <div className="flex items-center gap-3 mb-2">
                                <School className="w-8 h-8 rounded-md"/>
                                <span className="font-medium">{item.university_name || 'University of Columbia'}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {item.major || 'Computer Science'} - {item.degree || 'Bachelor of Science'}
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {startDate && endDate ? `${startDate} - ${endDate}` : 'August 2014 - May 2025'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. a aliqua.'}
                            </div>
                        </div>
                    )})}
            </div>
        </section>
    );
}

export default EducationPreview;
