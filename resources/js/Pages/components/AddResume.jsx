import { FileText, Loader, Plus } from "lucide-react";
import React from "react";
import { Popover, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

function AddResume() {
    const [isPending, setIsPending] = React.useState(false);
    const { post } = useForm();
    const {t} = useTranslation();

    const onCreate = async () => {
        if (isPending) return; // Prevent multiple submissions
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
                <PopoverTrigger>
                    <Button
                        onClick={onCreate}
                        className="text-[15px] gap-[2px] items-center hover:bg-[#f68c09] hover:text-white hover:border-[#f68c09]"
                        variant="outline"
                        disabled={isPending}
                    >
                        <Plus size="30px" />
                        <span className="text-sm font-semibold">
                            {t('Blank_Resume')}
                        </span>
                    </Button>
                </PopoverTrigger>
            </Popover>
            {isPending && (
                <div
                    className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center
                    backdrop-blur bg-black/30 w-full h-full text-white"
                >
                    <Loader size="35px" className="animate-spin" />
                    <div className="flex items-center gap-2">
                        <FileText />
                        {t('Creating_Blank_Resume...')}
                    </div>
                </div>
            )}
        </>
    );
}

export default AddResume;
