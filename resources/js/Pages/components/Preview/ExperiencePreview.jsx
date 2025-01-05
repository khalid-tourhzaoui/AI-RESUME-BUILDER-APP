import { INITIAL_THEME_COLOR } from "@/lib/helper";
import React from "react";
import SkeletonLoader from "../skeleton-loader";
import { Building, Calendar, MapPin } from "lucide-react";

function ExperiencePreview({document, isLoading}) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;

  if (isLoading) {
    return <SkeletonLoader />;
  }
    return (
        // <div className="w-full my-5">
        //     <h5 className="text-center font-bold mb-2"style={{ color: themeColor }}>
        //         Professional Experience
        //     </h5>
        //     <hr className="border-[1.5px] my-2"style={{borderColor: themeColor,}}/>

        //     <div className="flex flex-col gap-2 min-h-9">
        //         {document?.experience?.map((item, index) => (
        //             <div key={index}>
        //                 <h5 className="text-[15px] font-bold" style={{ color: themeColor }}>
        //                     {item?.title}
        //                 </h5>
        //                 <div className="flex items-start justify-between mb-2">
        //                     <h5 className="text-[13px]">
        //                         {item?.company_name}
        //                         {item?.company_name && item?.city &&", "}
        //                         {item?.city}
        //                         {item?.city && item?.country && ", "}
        //                         {item?.country}
        //                     </h5>
        //                     <span className="text-[13px]">
        //                         {item?.start_date}
        //                         {item?.start_date && " - "}
        //                         {item?.currently_working
        //                             ? "Present"
        //                             : item?.end_date}
        //                     </span>
        //                 </div>
        //                 <div
        //                     style={{ fontSize: "13px" }}
        //                     className="exp-preview leading-[14.6px]"
        //                     dangerouslySetInnerHTML={{
        //                         __html: item?.work_summary || "",
        //                     }}
        //                 />
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                Experience
            </h3>
            <div className="space-y-6">
                {document?.experience?.map((item, index) =>{
                    const startDate = new Date(item.start_date).toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    });
                    const endDate = new Date(item.end_date).toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    });

                    return(
                        <div className="space-y-2" key={index}>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{startDate} - {endDate}</span>
                                    <MapPin className="w-4 h-4" />
                                    <span>{item.country} | {item.city}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {/* <div className="w-8 h-8 rounded-full bg-black" /> */}
                                <Building className="w-8 h-8 rounded-md" />
                                <div>
                                    <div className="font-medium">{item.company_name}</div>
                                    <div className="text-gray-600">{item.title || 'Product Designer'}</div>
                                </div>
                            </div>
                            <p className="text-gray-500 exp-preview leading-[14.6px]"
                                dangerouslySetInnerHTML={{
                                    __html: item?.work_summary || "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                }}>
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}

export default ExperiencePreview;
