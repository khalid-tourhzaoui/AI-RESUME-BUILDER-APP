import { Eye, FileText, Zap } from "lucide-react";
import React from "react";
import ResumePreview from "./ResumePreview";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

function PreviewModal({document, isLoading}) {
    return (
        <div className="flex-1 sm:flex-initial">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        disabled={
                            isLoading || document?.status === "archived"
                                ? true
                                : false
                        }
                        className={`w-full bg-blue-500 border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 flex items-center justify-center gap-2 font-black uppercase text-xs sm:text-sm text-white transition-all h-[44px] sm:h-[48px] ${
                            isLoading || document?.status === "archived"
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px] hover:translate-y-[2px] sm:hover:translate-y-[3px] active:shadow-none active:translate-y-[4px] sm:active:translate-y-[6px] hover:bg-blue-600'
                        }`}
                    >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="hidden sm:inline">Preview</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl p-0 w-full max-h-[90vh] lg:max-h-[95vh] overflow-hidden border-4 border-zinc-800 rounded-xl sm:rounded-2xl shadow-[rgba(0,0,0,0.9)_0px_12px_0px_0px] bg-zinc-100">
                    <DialogHeader className="!pb-0 !m-0 sticky top-0 backdrop-blur bg-white dark:bg-zinc-900/80 z-10 border-b-4 border-zinc-800">
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                            <DialogTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-black opacity-100">
                                <div className="flex items-center gap-1.5">
                                    <span className="bg-red-400 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                                    <span className="bg-yellow-400 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                                    <span className="bg-green-500 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                                </div>
                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500"/>
                                <span className="uppercase truncate">{document?.title}</span>
                            </DialogTitle>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 font-mono">
                                <Zap className="w-3 h-3" />
                                <span>Live Preview</span>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="w-full h-full overflow-y-auto px-2 sm:px-4 pb-4">
                        <div className="py-2">
                            <ResumePreview document={document} isLoading={isLoading} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PreviewModal;
