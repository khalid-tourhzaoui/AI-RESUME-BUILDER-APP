import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import TopSection from "./common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import Swal from "sweetalert2";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";
import { colors } from "@/constant/colors";
import { Vortex } from "@/Components/ui/vortex"; // Importer le composant Vortex

function EditResume() {
    const { document, success, error,locale,translations} = usePage().props;
    console.log(locale,translations)

    useEffect(() => {
        if (success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Succès!",
                text: success,
                showConfirmButton: true,
                timer: 5000,
            });
        }

        if (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Erreur!",
                text: error,
                showConfirmButton: true,
                timer: 5000,
            });
        }
    }, [success, error]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 ">
                    {/* Composant InfiniteMovingCards */}
                    <div className="w-full">
                        <InfiniteMovingCards
                            items={colors}
                            direction="right"
                            speed="slow"
                            documentId={document.id}
                        />
                    </div>
                </div>
            }
        >
            <Head title="Update Resume" />

            <div className="py-2">
                <div className="mx-auto max-w-12xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[url('https://c4.wallpaperflare.com/wallpaper/332/110/571/polygon-material-design-abstract-3d-wallpaper-preview.jpg')]
                    shadow-sm sm:rounded-lg p-5">
                            <div className="relative z-10 w-full">
                                <div className="w-full mx-auto max-w-12xl py-4 px-5">
                                    <TopSection document={document} locale={locale} translations={translations} />
                                    <div className="w-full mt-1">
                                        <div className="flex flex-col lg:flex-row items-start w-full py-3 gap-10">
                                            {/* {Form Section} */}
                                            <ResumeForm document={document} />
                                            {/* {Preview Section} */}
                                            <ResumePreview
                                                document={document}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default EditResume;
