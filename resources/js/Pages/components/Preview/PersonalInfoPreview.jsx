import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { Mail, MapPin, Phone} from "lucide-react";
import React from "react";
import { SocialIcon } from "react-social-icons";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { languages } from "@/constant/languages";
import { socialMediaListData } from "@/constant/socialMedia";
function PersonalInfoPreview({ document, isLoading }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    console.log(document);
    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full lg:w-1/3 space-y-2">
            <div className="space-y-4">
                <div className="max-w-[240px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl bg-gray-100">
                    <img
                        src="https://preline.co/assets/svg/examples/polygon-bg-element.svg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center lg:text-left">
                    <h1 className="text-xl font-medium text-gray-800">
                        {document?.personal_info?.first_name && document?.personal_info?.last_name
                            ? `${document.personal_info.first_name} ${document.personal_info.last_name}` : "John Doe"
                        }
                    </h1>
                    <h2 className="text-lg text-purple-500">
                        {document?.personal_info?.job_title ||
                            "Full-Stack Designer"}
                    </h2>
                </div>
            </div>
            <hr
                className="border-[1.5px]"
                style={{ borderColor: themeColor }}
            />
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                    Personal Details
                </h3>
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-gray-600">
                        <Mail className="w-5 h-5 shrink-0" />
                        <span className="break-all">
                            {document?.personal_info?.email ||
                                "john.doe@gmail.com"}
                        </span>
                    </div>
                    {/* <div className="flex flex-wrap items-center gap-3 text-gray-600">
                        <Globe className="w-5 h-5 shrink-0" />
                        <span className="break-all">
                            https://www.luckymedia.dev
                        </span>
                    </div> */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="w-5 h-5 shrink-0" />
                        <span>
                            {document?.personal_info?.phone ||
                                "(+39) 333 0123 765"}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 shrink-0" />
                        <span>
                            {document?.personal_info?.address ||
                                "Los Angeles, California"}
                        </span>
                    </div>
                </div>
            </div>
            <hr
                className="border-[1.5px]"
                style={{ borderColor: themeColor }}
            />
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">Social Medias</h3>
                <div className="space-y-3">
                    {(document.social_medias && document.social_medias.length > 0
                        ? document.social_medias
                        : socialMediaListData.slice(0,3)
                    ).map((social, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <SocialIcon
                                className="w-6 h-6 rounded-full"
                                url={social.link || social.url}
                                style={{ height: 30, width: 30 }}
                                title={social.name}
                            />
                            <div>
                                <div className="text-gray-800">{social.name}</div>
                                <a
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500"
                                >
                                    {document?.personal_info?.first_name || "User"}'s {social.name}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr
                className="border-[1.5px]"
                style={{ borderColor: themeColor }}
            />
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {(document.languages && document.languages.length >0 ?
                    document.languages : languages.slice(0,3)).map((language, index) => {
                        const languageData = languages.find(
                            (l) => l.name === language.name
                        );
                        const flagClass = languageData
                            ? languageData.flagClass
                            : "fi fi-un";
                        console.log(languageData);
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-md overflow-hidden">
                                    <span
                                        className={`w-full h-full ${flagClass}`}
                                    ></span>
                                </div>
                                <div>
                                    <div className="text-gray-800">
                                        {language.name || "English"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {language.level || "Native"}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
}

export default PersonalInfoPreview;
