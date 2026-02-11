import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import TopSection from "./common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import Swal from "sweetalert2";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";
import { colors } from "@/constant/colors";

function EditResume() {
    const { document, success, error, locale, translations } = usePage().props;
    console.log(locale, translations);

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
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
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

            <div className="py-2 sm:py-2 md:py-3 lg:py-4">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-3 lg:px-4">
                    <div className="relative overflow-hidden">
                        {/* Background with gradient overlay */}
                        {/* <div
                            className="absolute inset-0 bg-cover bg-center opacity-30"
                            style={{
                                backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/332/110/571/polygon-material-design-abstract-3d-wallpaper-preview.jpg')"
                            }}
                        /> */}
                        {/* Content */}
                        <div className="relative z-10 p-3 sm:p-4 md:p-3 lg:p-4 xl:p-5">
                            <div className="w-full mx-auto max-w-screen-2xl">
                                <TopSection
                                    document={document}
                                    locale={locale}
                                    translations={translations}
                                />
                                <div className="w-full mt-2 sm:mt-6 md:mt-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                                        {/* Form Section */}
                                        <div className="w-full">
                                            <ResumeForm document={document} />
                                        </div>
                                        {/* Preview Section */}
                                        {/* <div className="w-full">
                                            <ResumePreview document={document} />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scan line effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default EditResume;
