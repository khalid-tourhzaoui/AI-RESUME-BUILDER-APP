import React, { useMemo } from "react";
import { format } from "date-fns";
import { Archive, FileText, Globe, Lock, Trash } from "lucide-react";
import { Link } from "@inertiajs/react";

function Card({
    title,
    status,
    thumbnail,
    updatedAt,
    documentId,
    id,
}) {
    const docDate = useMemo(() => {
        if (!updatedAt) return null;
        const formattedDate = format(new Date(updatedAt), "MMM dd, yyyy");
        return formattedDate;
    }, [updatedAt]);

    const getStatusConfig = () => {
        switch (status) {
            case "private":
                return { icon: Lock, label: "Private", color: "text-orange" };
            case "public":
                return { icon: Globe, label: "Public", color: "text-orange" };
            default:
                return { icon: Archive, label: "Archive", color: "text-orange" };
        }
    };

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
        <div className="w-[280px] sm:w-[300px] md:w-[320px] mx-auto px-2 sm:px-4 md:px-5 animate-fade-in">
            <div className="group relative w-full h-[230px] sm:h-[250px] bg-white rounded-[32px] p-[3px] shadow-card-hover transition-all duration-500 ease-smooth hover:rounded-tl-[55px]">
                {/* Status Badge */}
                <button className="absolute right-6 sm:right-8 top-5 sm:top-6 z-10 bg-transparent border-none flex items-center gap-1.5 text-orange transition-all duration-300 hover:text-orange-hover">
                    <StatusIcon className="w-5 h-5 stroke-[3px]" />
                    <span className="hidden sm:inline text-sm font-semibold">{statusConfig.label}</span>
                </button>

                {/* Profile Picture / Thumbnail */}
                <div className="absolute w-[calc(100%-6px)] h-[calc(100%-6px)] top-[3px] left-[3px] rounded-[29px] z-[1] border-0 overflow-hidden transition-all duration-500 ease-smooth delay-200 group-hover:w-[100px] group-hover:h-[100px] group-hover:top-[10px] group-hover:left-[10px] group-hover:rounded-full group-hover:z-[3] group-hover:border-[7px] group-hover:border-orange group-hover:shadow-card-inset group-hover:delay-100">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 group-hover:bg-orange-100">
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={title}
                                className="w-full h-full object-cover object-center transition-all duration-500 ease-smooth group-hover:scale-[2.5] group-hover:object-[0px_25px] group-hover:delay-500"
                            />
                        ) : (
                            <FileText className="w-[60%] h-[80%] text-orange-400 transition-all duration-500 ease-smooth group-hover:scale-[2.5] group-hover:delay-500" />
                        )}
                    </div>

                    {/* Hover effect on profile pic */}
                    <div className="absolute inset-0 hover:scale-[1.3] hover:rounded-none transition-transform duration-300"></div>
                </div>

                {/* Bottom Content Section */}
                <div className="absolute bottom-[-3px] left-[3px] right-[3px] top-[80%] bg-orange rounded-[29px] z-[2] shadow-card-inset overflow-hidden transition-all duration-500 ease-smooth group-hover:top-[20%] group-hover:rounded-tl-[80px] group-hover:rounded-tr-[29px] group-hover:rounded-bl-[29px] group-hover:rounded-br-[29px] group-hover:delay-200">
                    {/* Content */}
                    <div className="absolute bottom-0 left-6 right-6 h-[160px] flex flex-col justify-end pb-12 sm:pb-14">
                        <span className="block text-base sm:text-lg md:text-xl text-white mt-11 font-bold leading-tight line-clamp-2">
                            {title}
                        </span>
                        <span className="block text-sm sm:text-base text-white/90 mt-1">
                            Last Update: {docDate}
                        </span>
                    </div>

                    {/* Bottom Actions */}
                    <div className="absolute bottom-2 left-6 right-6 flex items-center justify-between">
                        {/* Social Links / Action Icons */}
                        <div className="flex gap-3 sm:gap-4">
                            {status === "private" && (
                                <>
                                    <Link
                                        method="delete"
                                        href={route("documents.delete", id)}
                                        className="group/icon"
                                    >
                                        <Trash className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                    <Link
                                        method="get"
                                        href={route("documents.updateStatus", { id, status: 'public' })}
                                        className="group/icon"
                                    >
                                        <Globe className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                    <Link
                                        method="get"
                                        href={route("documents.updateStatus", { id, status: 'archived' })}
                                        className="group/icon"
                                    >
                                        <Archive className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                </>
                            )}
                            {status === "public" && (
                                <>
                                    <Link
                                        method="delete"
                                        href={route("documents.delete", id)}
                                        className="group/icon"
                                    >
                                        <Trash className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                    <Link
                                        method="get"
                                        href={route("documents.updateStatus", { id, status: 'private' })}
                                        className="group/icon"
                                    >
                                        <Lock className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                    <Link
                                        method="get"
                                        href={route("documents.updateStatus", { id, status: 'archived' })}
                                        className="group/icon"
                                    >
                                        <Archive className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                </>
                            )}
                            {status === "archived" && (
                                <>
                                    <Link
                                        method="delete"
                                        href={route("documents.delete", id)}
                                        className="group/icon"
                                    >
                                        <Trash className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                    <Link
                                        method="get"
                                        href={route("documents.updateStatus", { id, status: 'public' })}
                                        className="group/icon"
                                    >
                                        <Globe className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                    <Link
                                        method="get"
                                        href={route("documents.updateStatus", { id, status: 'private' })}
                                        className="group/icon"
                                    >
                                        <Lock className="h-5 w-5 fill-white drop-shadow-md transition-all duration-300 group-hover/icon:fill-orange-hover group-hover/icon:scale-110" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Edit Button */}
                        <Link
                            href={route("documents.edit", documentId)}
                            className="bg-white text-orange border-none rounded-full text-sm sm:text-base font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-md transition-all duration-300 hover:bg-orange-50 hover:scale-105 active:scale-95"
                        >
                            Edit Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
