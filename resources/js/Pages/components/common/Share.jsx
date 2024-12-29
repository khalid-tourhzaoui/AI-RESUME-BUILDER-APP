import { Button } from "@/Components/ui/button";
import { Popover, PopoverContent } from "@/Components/ui/popover";
import { Check, ChevronDown, Copy, Globe, Loader, ShareIcon } from "lucide-react";
import React, { useState } from "react";
import { PopoverTrigger } from '@/components/ui/popover';
import { useForm } from "@inertiajs/react";

function Share({document,isLoading}) {
    const { data, setData, patch,processing} = useForm();
    const [copied, setCopied] = useState(false);

    // Assuming the document ID is passed as a prop
    const url = `${window.location.origin}/preview/${document.document_id}/resume`;

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const handleClick = async (status) => {
        if (status === "public") {
            await patch(route("documents.public", { id: document.id }), {
                onSuccess: () => {
                    setData((prevData) => ({ ...prevData, status }));
                    console.log("Document set to public");
                },
                onError: (error) => {
                    console.error("Failed to set document to public:", error);
                },
            });
        }else{
            await patch(route("documents.restore", { id: document.id }), {
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
                    variant="secondary"
                    className="bg-white hover:bg-[#f68c09] hover:text-white !p-2 lg:w-auto lg:p-4">
                    <div className="flex items-center gap-1">
                        <ShareIcon size="17px" />
                        <span className="hidden lg:flex">Share</span>
                    </div>
                    <ChevronDown size="14px" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="bg-background"
                align="end"
                alignOffset={0}
                forceMount
            >
                {document?.status === "public" ? (
                    <div className="space-y-3">
                        <div className="flex gap-x-2 items-center">
                            <Globe
                                size="15px"
                                className="text-[#f68c09] animate-pulse"
                            />
                            <p className="font-medium text-xs text-[#f68c09]">
                                This resume is shareable, copy the link!
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                            />
                            <Button
                                className="h-8 rounded-l-none"
                                disabled={copied}
                                onClick={onCopy}
                            >
                                {copied ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                        <hr className="border-muted !mb-0" />
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-[#f68c09] text-[#f68c09] text-xs font-semibold"
                            onClick={() => handleClick("private")}
                            disabled={processing}
                        >
                            {processing && (
                                <Loader size="15px" className="animate-spin" />
                            )}
                            Private
                        </Button>
                    </div>
                ) : (
                    <div
                        className="w-full flex flex-col gap-2 items-center justify-center">
                        <Globe size="40px" />
                        <div className="text-center mb-1">
                            <h5 className="font-semibold text-sm">
                                Set to Public
                            </h5>
                            <p className="text-xs text-muted-foreground">
                                To share it with others, you need to make it
                                public.
                            </p>
                        </div>
                        <Button className=" w-full h-8 !bg-black text-xs dark:!bg-primary gap-1 font-semibold text-white"
                            type="button"
                            onClick={() => handleClick("public")}
                        >
                            {processing && (
                                <Loader size="15px" className="animate-spin" />
                            )}
                            Public
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

export default Share;
