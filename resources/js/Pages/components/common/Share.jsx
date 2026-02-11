import { Button } from "@/Components/ui/button";
import { Popover, PopoverContent } from "@/Components/ui/popover";
import { Check, ChevronDown, Copy, Globe, Loader, ShareIcon, Zap } from "lucide-react";
import React, { useState } from "react";
import { PopoverTrigger } from '@/components/ui/popover';
import { useForm } from "@inertiajs/react";

function Share({document, isLoading}) {
    const { data, setData, get, processing} = useForm();
    const [copied, setCopied] = useState(false);

    const url = `${window.location.origin}/preview/${document.document_id}/resume`;

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const handleClick = async (status) => {
        if (status === "public") {
            await get(route("documents.updateStatus", { id: document.id, status: status }), {
                onSuccess: () => {
                    setData((prevData) => ({ ...prevData, status }));
                    console.log("Document set to public");
                },
                onError: (error) => {
                    console.error("Failed to set document to public:", error);
                },
            });
        } else {
            await get(route("documents.updateStatus", { id: document.id, status: status}), {
                onSuccess: () => {
                    setData((prevData) => ({ ...prevData, status }));
                    console.log("Document set to private");
                },
                onError: (error) => {
                    console.error("Failed to set document to private:", error);
                },
            });
        }
    };

    return (
        <div className="flex-1 sm:flex-initial">
            <Popover>
                <PopoverTrigger
                    disabled={document?.status === "archived" ? true : false}
                    asChild
                >
                    <Button
                        disabled={
                            isLoading || document?.status === "archived"
                                ? true
                                : false
                        }
                        className={`w-full bg-purple-500 border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 flex items-center justify-center gap-2 font-black uppercase text-xs sm:text-sm text-white transition-all h-[44px] sm:h-[48px] ${
                            isLoading || document?.status === "archived"
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px] hover:translate-y-[2px] sm:hover:translate-y-[3px] active:shadow-none active:translate-y-[4px] sm:active:translate-y-[6px] hover:bg-purple-600'
                        }`}
                    >
                        <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="hidden sm:inline">Share</span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="bg-yellow-50 border-4 border-zinc-800 rounded-xl shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] p-0 w-80 sm:w-96"
                    align="end"
                    alignOffset={0}
                    forceMount
                >
                    {document?.status === "public" ? (
                        <div className="p-4 sm:p-6 space-y-4">
                            {/* Header */}
                            <div className="bg-green-500 border-4 border-zinc-800 rounded-lg p-3 flex gap-x-3 items-center shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px]">
                                <Globe
                                    className="w-6 h-6 text-zinc-800 animate-pulse flex-shrink-0"
                                />
                                <p className="font-black text-xs sm:text-sm text-zinc-800 uppercase">
                                    Resume is shareable!
                                </p>
                            </div>

                            {/* URL Copy Section */}
                            <div className="bg-white border-4 border-zinc-800 rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px]">
                                <div className="flex items-center">
                                    <input
                                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white truncate font-mono text-zinc-800 outline-none"
                                        value={url}
                                        readOnly
                                    />
                                    <button
                                        className={`px-4 py-2 border-l-4 border-zinc-800 font-black uppercase text-xs transition-colors ${
                                            copied
                                                ? 'bg-green-500 text-zinc-800'
                                                : 'bg-yellow-400 text-zinc-800 hover:bg-yellow-500'
                                        }`}
                                        onClick={onCopy}
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t-4 border-dashed border-zinc-800 my-2"></div>

                            {/* Make Private Button */}
                            <button
                                className={`w-full bg-red-400 border-4 border-zinc-800 rounded-lg shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] px-4 py-3 flex items-center justify-center gap-2 font-black uppercase text-sm text-zinc-800 transition-all ${
                                    processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]'
                                }`}
                                onClick={() => handleClick("private")}
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader className="w-4 h-4 animate-spin" />
                                )}
                                Make Private
                            </button>
                        </div>
                    ) : (
                        <div className="p-4 sm:p-6 space-y-4">
                            {/* Icon and Title */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="bg-white border-4 border-zinc-800 rounded-xl p-4 shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px]">
                                    <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
                                </div>
                                <div className="text-center">
                                    <h5 className="font-black text-base sm:text-lg uppercase text-zinc-800 mb-2">
                                        Set to Public
                                    </h5>
                                    <p className="text-xs sm:text-sm text-zinc-600 font-mono">
                                        Share your resume with others by making it public
                                    </p>
                                </div>
                            </div>

                            {/* Make Public Button */}
                            <button
                                className={`w-full bg-green-500 border-4 border-zinc-800 rounded-lg shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] px-4 py-3 flex items-center justify-center gap-2 font-black uppercase text-sm text-white transition-all ${
                                    processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] hover:bg-green-600'
                                }`}
                                type="button"
                                onClick={() => handleClick("public")}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        <span>Make Public</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Share;
