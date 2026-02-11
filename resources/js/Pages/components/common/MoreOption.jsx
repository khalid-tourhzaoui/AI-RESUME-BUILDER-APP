import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { useForm } from "@inertiajs/react";
import { Loader, MoreHorizontal, Redo, Trash2 } from "lucide-react";
import React from "react";

function MoreOption({ document, isLoading }) {
    const { delete: destroy, patch, processing } = useForm();

    const handleClick = (newStatus) => {
        if (newStatus === "archived") {
            patch(route("documents.archive", { id: document.id }), {
                onSuccess: () => {
                    console.log("Document archived successfully.");
                },
                onError: (error) => {
                    console.error("Failed to archive document:", error);
                },
            });
        } else if (newStatus === "private") {
            patch(route("documents.restore", { id: document.id }), {
                onSuccess: () => {
                    console.log("Document restored successfully.");
                },
                onError: (error) => {
                    console.error("Failed to restore document:", error);
                },
            });
        }
    };

    return (
        <div className="flex-1 sm:flex-initial">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="w-full bg-zinc-700 border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 flex items-center justify-center text-white transition-all hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px] hover:translate-y-[2px] sm:hover:translate-y-[3px] active:shadow-none active:translate-y-[4px] sm:active:translate-y-[6px] hover:bg-zinc-600 h-[44px] sm:h-[48px]"
                    >
                        <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-yellow-50 border-4 border-zinc-800 rounded-xl shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] p-2 min-w-[200px]">
                    <DropdownMenuItem asChild className="p-0">
                        {document.status === "archived" ? (
                            <button
                                className={`w-full bg-green-500 border-4 border-zinc-800 rounded-lg shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] px-4 py-3 flex items-center gap-2 font-black uppercase text-sm text-white transition-all ${
                                    isLoading || processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] hover:bg-green-600'
                                }`}
                                disabled={isLoading || processing}
                                onClick={() => handleClick("private")}
                            >
                                <Redo className="w-4 h-4 flex-shrink-0" />
                                <span className="flex-grow text-left">Restore</span>
                                {processing && (
                                    <Loader className="w-4 h-4 animate-spin flex-shrink-0" />
                                )}
                            </button>
                        ) : (
                            <button
                                className={`w-full bg-red-400 border-4 border-zinc-800 rounded-lg shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] px-4 py-3 flex items-center gap-2 font-black uppercase text-sm text-zinc-800 transition-all ${
                                    isLoading || processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] hover:bg-red-500'
                                }`}
                                disabled={isLoading || processing}
                                onClick={() => handleClick("archived")}
                            >
                                <Trash2 className="w-4 h-4 flex-shrink-0" />
                                <span className="flex-grow text-left">Move to Trash</span>
                                {processing && (
                                    <Loader className="w-4 h-4 animate-spin flex-shrink-0" />
                                )}
                            </button>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default MoreOption;
