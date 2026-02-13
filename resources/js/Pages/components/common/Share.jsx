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
        await get(route("documents.updateStatus", { id: document.id, status }), {
            onSuccess: () => {
                setData((prevData) => ({ ...prevData, status }));
            },
            onError: (error) => {
                console.error(`Failed to set document to ${status}:`, error);
            },
        });
    };

    const isDisabled = isLoading || document?.status === "archived";

    return (
        <div className="flex-1 sm:flex-initial">
            <Popover>
                <PopoverTrigger disabled={isDisabled} asChild>
                    <Button
                        disabled={isDisabled}
                        className={`w-full bg-purple-500 border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-brutal sm:shadow-brutal-md px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 font-black uppercase text-xs sm:text-sm text-white transition-all h-[40px] sm:h-[44px] ${
                            isDisabled
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:shadow-brutal-sm sm:hover:shadow-brutal hover:translate-y-[2px] sm:hover:translate-y-[3px] active:shadow-none active:translate-y-[4px] sm:active:translate-y-[6px] hover:bg-purple-600'
                        }`}
                    >
                        <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="hidden sm:inline">Share</span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="bg-yellow-50 border-4 border-zinc-800 mt-2 rounded-xl shadow-brutal-lg p-0 w-[calc(100vw-2rem)] sm:w-80 md:w-96"
                    align="end"
                    sideOffset={8}
                >
                    {document?.status === "public" ? (
                        <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
                            {/* Header */}
                            {/* <div className="bg-green-500 border-4 border-zinc-800 rounded-lg p-2.5 sm:p-3 flex gap-2 sm:gap-3 items-center shadow-brutal">
                                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-800 animate-pulse flex-shrink-0" />
                                <p className="font-black text-xs sm:text-sm text-zinc-800 uppercase">
                                    Resume is shareable!
                                </p>
                            </div> */}

                            {/* URL Copy Section */}
                            <div className="bg-white border-4 border-zinc-800 rounded-lg overflow-hidden shadow-brutal">
                                <div className="flex items-center">
                                    <input
                                        className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white truncate font-mono text-zinc-800 outline-none border-none"
                                        value={url}
                                        readOnly
                                    />
                                    <button
                                        className={`px-3 sm:px-4 py-2 border-l-4 border-zinc-800 font-black uppercase text-xs transition-colors flex-shrink-0 ${
                                            copied
                                                ? 'bg-green-500 text-zinc-800'
                                                : 'bg-yellow-400 text-zinc-800 hover:bg-yellow-500 active:bg-yellow-600'
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

                            <div className="border-t-4 border-dashed border-zinc-800"></div>

                            {/* Make Private Button */}
                            <button
                                className={`w-full bg-red-400 border-4 border-zinc-800 rounded-lg shadow-brutal px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-center gap-2 font-black uppercase text-xs sm:text-sm text-zinc-800 transition-all ${
                                    processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-brutal-sm hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] hover:bg-red-500'
                                }`}
                                onClick={() => handleClick("private")}
                                disabled={processing}
                            >
                                {processing && <Loader className="w-4 h-4 animate-spin" />}
                                <span>Make Private</span>
                            </button>
                        </div>
                    ) : (
                        <div className="p-3 sm:p-2 md:p-2 space-y-3 sm:space-y-4">
                            {/* Make Public Button */}
                            <button
                                className={`w-full bg-green-500 border-4 border-zinc-800 rounded-lg shadow-brutal px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-center gap-2 font-black uppercase text-xs sm:text-sm text-white transition-all ${
                                    processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-brutal-sm hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] hover:bg-green-600'
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
