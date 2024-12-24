import React, { useMemo, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { format } from "date-fns";
import {
    Archive,
    Dot,
    EllipsisVertical,
    FileText,
    Globe,
    Loader,
    Lock,
} from "lucide-react";
import { Link } from "@inertiajs/react";

function ResumeItem({
    title,
    status,
    themeColor,
    thumbnail,
    updatedAt,
    documentId,
}) {

    console.log(documentId);

    const docDate = useMemo(() => {
        if (!updatedAt) return null;
        const formattedDate = format(new Date(updatedAt), "MMM dd, yyyy");
        return formattedDate;
    }, [updatedAt]);
    return (
        <>
            <Link
                role="button"
                className="cursor-pointer max-w-[164px] w-full border rounded-lg transition-all h-[197px]
                        hover:border-primary hover:shadow-md shadow-primary"
                
                href={route('documents.edit',documentId)}
                style={{ borderColor: themeColor || "" }}
            >
                <div className="flex flex-col w-full h-full items-center rounded-lg justify-center bg-[#fdfdfd] dark:bg-secondary">
                    <div className="w-full flex flex-1 px-1 pt-2">
                        <div className="w-full flex flex-1 bg-white dark:bg-gray-700 rounded-t-lg justify-center items-center">
                            {thumbnail ? (
                                <div className=" relative w-full h-full rounded-t-lg overflow-hidden">
                                    <img
                                        src={thumbnail}
                                        alt={title}
                                        className="w-full h-12 object-cover object-top rounded-t-lg"
                                    />
                                </div>
                            ) : (
                                <FileText size="30px" />
                            )}
                        </div>
                    </div>

                    {/* {Body Content} */}
                    <div className="shrink w-full border-t pt-2 pb-[9px] px-[9px]">
                        <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-sm mb-[2px] truncate block w-[200px]">
                                {title}
                            </h5>
                            <button className="text-muted-foreground">
                                <EllipsisVertical size="20px" />
                            </button>
                        </div>
                        <div className="flex items-center !text-[12px] font-medium text-muted-foreground">
                            <span className="flex items-center gap-[2px]">
                                {status === "private" ? (
                                    <>
                                        <Lock size="12px" />
                                        Private
                                    </>
                                ) : status==="public" ?(
                                    <>
                                        <Globe
                                            size="12px"
                                            className="text-primary"
                                        />
                                        Public
                                    </>
                                ):
                                    <>
                                        <Archive
                                            size="12px"
                                            className="text-primary"
                                        />
                                        Archive
                                    </>
                                    }
                            </span>
                            <Dot size="15px" />
                            <span>{docDate}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default ResumeItem;
