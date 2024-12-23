import React, { Fragment } from "react";
import useSWR from "swr";
import { Loader, RotateCw } from "lucide-react";
import ResumeItem from "./common/ResumeItem";
import { usePage } from "@inertiajs/react";

// const fetcher = (url) =>
//     fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((res) => {
//         if (!res.ok) {
//             throw new Error("Failed to fetch");
//         }
//         return res.json();
//     });

export default function ResumeList() {
    const {document,error,processing} =usePage().props;

    return (
        <Fragment>
            {processing ? (
                <div
                    className="flex items-center mx-5">
                    <Loader
                        className="animate-spin text-black dark:text-white size-10"
                    />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center mx-5">
                    <button
                        className="flex items-center gap-1"
                        onClick={() => mutate()}
                    >
                        <RotateCw size="1em" />
                        <span>Retry</span>
                    </button>
                </div>
            ) : (
                <>
                    {document?.map((resume) => (
                        <ResumeItem
                            key={resume.document_id}
                            id={resume.id}
                            documentId={resume.document_id}
                            title={resume.title}
                            status={resume.status}
                            updatedAt={resume.updated_at}
                            themeColor={resume.theme_color}
                            thumbnail={resume.thumbnail}
                        />
                    ))}
                </>
            )}
        </Fragment>
    );
}
