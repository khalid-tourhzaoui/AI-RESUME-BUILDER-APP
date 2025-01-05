import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { Globe, Mail, MapPin, Phone, Send } from "lucide-react";
import React from "react";
import { socialMediaListData } from "@/constant/socialMedia";
import { SocialIcon } from "react-social-icons";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function PersonalInfoPreview({ document, isLoading }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    console.log(document);
    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        // <div className="w-full min-h-14">
        //     <h2 className="font-bold text-xl text-center"style={{color: themeColor,}}>
        //         {document?.personal_info?.first_name || "First Name"}{" "}
        //         {document?.personal_info?.last_name || "Last Name"}
        //     </h2>
        //     <h5 className="text-center text-sm font-medium">
        //         {document?.personal_info?.job_title || "Job Title"}
        //     </h5>
        //     <p className="text-center font-normal text-[13px]">
        //         {document?.personal_info?.address || "House Address"}
        //     </p>

        //     <div className="flex items-center justify-between pt-3">
        //         <h5 className="font-normal text-[13px]">
        //             {document?.personal_info?.phone || "Phone number"}
        //         </h5>
        //         <h5 className="font-normal text-[13px]">
        //             {document?.personal_info?.email || "Email address"}
        //         </h5>
        //     </div>

        //     <hr className="border-[1.5px] my-2"style={{borderColor: themeColor,}}/>
        // </div>
        //---------------------------------------------------------------------------

        <>
            <div className="space-y-6">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                    <img
                    src="https://preline.co/assets/svg/examples/polygon-bg-element.svg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-md font-bold text-gray-800">
                        {document?.personal_info?.first_name+" "+document?.personal_info?.last_name || "John Doe"}
                    </h1>
                    <h2 className="text-lg" style={{color: themeColor}}>
                        {document?.personal_info?.job_title || "Full-Stack Designer"}

                    </h2>
                </div>
            </div>
            <hr className="border-[1.5px]"style={{borderColor: themeColor,}}/>
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">Personal Details</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="w-5 h-5" /> <span>{document?.personal_info?.email || "john.doe@gmail.com"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <Globe className="w-5 h-5" /> <span>{document?.personal_info?.email || "john.doe@gmail.com"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="w-5 h-5" /> <span>{document?.personal_info?.phone || "(+212) 766-56-24-12"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5" /> <span>{document?.personal_info?.address || "Los Angeles, California"}</span>
                    </div>
                </div>
            </div>
            <hr className="border-[1.5px] my-2"style={{borderColor: themeColor}}/>
            {/* Socials */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">Social</h3>
                <div className="space-y-3">
                {
                    document?.social_medias?.map((item, index) => {
                        // const flagClass = `fi fi-${item.code}`;
                        const flagClass = `fi fi-fr`;
                        return (
                        <div className="flex items-center gap-1" key={index}>
                            <div>
                                {/* <span className={`w-full h-full ${flagClass} object-cover`}></span> */}
                                <SocialIcon className="mr-2" url={item.link} style={{height: 30,width: 30,}}/>
                            </div>
                            <div>
                                <div className="text-gray-800">{item.name}</div>
                                <a href={item.link} target="_blank" className="text-sm text-gray-500">
                                    {document?.personal_info?.first_name}'s {item.name}
                                </a>
                            </div>
                        </div>
                        );
                    })
                }
                </div>
            </div>
            <hr className="border-[1.5px] my-2"style={{borderColor: themeColor}}/>
            {/* Langues */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">Languages</h3>
                <div className="space-y-3">
                {
                    document?.languages?.map((item, index) => {
                        // const flagClass = `fi fi-${item.code}`;
                        const flagClass = `fi fi-fr`;
                        return (
                        <div className="flex items-center gap-3" key={index}>
                            <div>
                                <span className={`${flagClass} object-cover`}></span>
                            </div>
                            <div>
                                <div className="text-gray-800">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.level}</div>
                            </div>
                        </div>
                        );
                    })
                }
                </div>
            </div>
        </>
    );
}


export default PersonalInfoPreview;
