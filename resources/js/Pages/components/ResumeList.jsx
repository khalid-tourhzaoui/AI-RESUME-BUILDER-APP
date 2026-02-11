import React, { Fragment } from "react";
import { Loader, RotateCw, AlertCircle } from "lucide-react";
import ResumeItem from "./common/ResumeItem";
import { usePage } from "@inertiajs/react";

export default function ResumeList({ document }) {
    const { error, processing } = usePage().props;
    console.log(document);

    return (
        <Fragment>
            {processing ? (
                <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 animate-fade-in">
                    <div className="relative">
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping"></div>

                        {/* Main Loader */}
                        <div className="relative bg-gradient-to-br from-primary to-primary-dark border-4 border-zinc-800 rounded-full p-4 sm:p-5">
                            <Loader className="animate-spin text-white w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                    </div>
                    <p className="mt-6 text-base sm:text-lg font-black uppercase text-zinc-800">
                        Loading Resumes...
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 font-mono">
                        Please wait while we fetch your documents
                    </p>
                </div>
            ) : error ? (
                <div className="col-span-full animate-fade-in">
                    <div className="bg-red-50 border-4 border-red-800 rounded-xl sm:rounded-2xl shadow-brutal-red-md p-6 sm:p-8 md:p-10 text-center">
                        {/* Error Icon */}
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="bg-red-500 border-4 border-red-800 rounded-full p-3 sm:p-4 animate-pulse-slow">
                                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                        </div>

                        {/* Error Message */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-red-800 mb-2 sm:mb-3">
                            Oops! Something Went Wrong
                        </h3>
                        <p className="text-sm sm:text-base text-red-700 mb-6 sm:mb-8 font-mono">
                            We encountered an error while loading your resumes
                        </p>

                        {/* Retry Button */}
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-500 text-white rounded-lg border-4 border-red-800 font-black uppercase text-sm sm:text-base transition-all duration-300 shadow-brutal-red hover:shadow-brutal-red-md hover:-translate-y-1 active:translate-y-0 active:shadow-brutal-red group"
                        >
                            <RotateCw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
                            Retry Loading
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {document?.map((resume, index) => (
                        <div
                            key={resume.document_id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <ResumeItem
                                id={resume.id}
                                documentId={resume.document_id}
                                title={resume.title}
                                status={resume.status}
                                updatedAt={resume.updated_at}
                                themeColor={resume.theme_color}
                                thumbnail={resume.thumbnail}
                            />
                        </div>
                    ))}
                </>
            )}
        </Fragment>
    );
}
