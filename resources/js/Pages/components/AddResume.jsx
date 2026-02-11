import { FileText, Loader, Plus, Zap } from "lucide-react";
import React from "react";
import { Popover, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

function AddResume() {
    const [isPending, setIsPending] = React.useState(false);
    const { post } = useForm();
    const { t } = useTranslation();

    const onCreate = async () => {
        if (isPending) return;
        setIsPending(true);
        try {
            await post(route("documents.store"), {}, {
                onSuccess: () => {
                    setIsPending(false);
                },
                onError: () => {
                    setIsPending(false);
                    alert("An error occurred while creating the document.");
                },
            });
        } catch (error) {
            setIsPending(false);
            console.error(error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        onClick={onCreate}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-black uppercase border-3 sm:border-4 border-zinc-800 rounded-lg transition-all duration-300 shadow-brutal hover:shadow-brutal-md hover:-translate-y-0.5 bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal active:translate-y-0 active:shadow-brutal"
                        variant="outline"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                        ) : (
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        <span className="hidden sm:inline">
                            {isPending ? t('Creating...') : t('Blank_Resume')}
                        </span>
                        <span className="sm:hidden">
                            {isPending ? 'Creating' : 'New'}
                        </span>
                    </Button>
                </PopoverTrigger>
            </Popover>

            {isPending && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white border-4 sm:border-6 border-zinc-800 rounded-xl sm:rounded-2xl shadow-brutal-xl p-6 sm:p-8 md:p-10 max-w-md mx-4 animate-scale-in">
                        {/* Animated Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                {/* Pulse Effect */}
                                <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping"></div>

                                {/* Main Icon Container */}
                                <div className="relative bg-gradient-to-br from-primary to-primary-dark border-4 border-zinc-800 rounded-full p-4 sm:p-5">
                                    <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-center text-zinc-800 mb-3 sm:mb-4" style={{
                            textShadow: '2px 2px 0px rgba(0,0,0,0.1)'
                        }}>
                            {t('Creating_Blank_Resume...')}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-center text-zinc-600 mb-6 font-mono">
                            Setting up your new resume template...
                        </p>

                        {/* Loading Bar */}
                        <div className="w-full bg-zinc-200 border-3 border-zinc-800 rounded-full h-3 sm:h-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-primary to-primary-dark h-full rounded-full animate-loading-bar"></div>
                        </div>

                        {/* Loading Icons */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddResume;
