import React, { Fragment } from "react";
import { Loader, RotateCw } from "lucide-react";
import ResumeItem from "./common/ResumeItem";
import { usePage } from "@inertiajs/react";

export default function ResumeList({document}) {
    const {error,processing} =usePage().props;
    console.log(document);
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
