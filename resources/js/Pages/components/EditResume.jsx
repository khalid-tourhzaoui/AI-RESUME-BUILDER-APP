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

            <div className="py-2 sm:py-4 md:py-6 lg:py-8">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border-4 sm:border-6 md:border-8 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_12px_0px_0px] md:shadow-[rgba(0,0,0,0.9)_0px_16px_0px_0px]">
                        {/* Background with gradient overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-30"
                            style={{
                                backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/332/110/571/polygon-material-design-abstract-3d-wallpaper-preview.jpg')"
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 50%, rgba(4, 120, 87, 0.95) 100%)"
                            }}
                        />

                        {/* Decorative blobs */}
                        <div
                            className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 opacity-20 blur-3xl rounded-full -left-12 -top-12 sm:-left-16 sm:-top-16"
                            style={{
                                background: "radial-gradient(closest-side, rgb(255, 206, 0), rgba(0, 0, 0, 0))"
                            }}
                        />
                        <div
                            className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[448px] lg:h-[448px] opacity-20 blur-3xl rounded-full -right-12 -bottom-12 sm:-right-16 sm:-bottom-16"
                            style={{
                                background: "radial-gradient(closest-side, rgb(255, 126, 0), rgba(0, 0, 0, 0))"
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                            <div className="w-full mx-auto max-w-screen-2xl">
                                <TopSection
                                    document={document}
                                    locale={locale}
                                    translations={translations}
                                />
                                <div className="w-full mt-4 sm:mt-6 md:mt-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                                        {/* Form Section */}
                                        <div className="w-full">
                                            <ResumeForm document={document} />
                                        </div>
                                        {/* Preview Section */}
                                        <div className="w-full">
                                            <ResumePreview document={document} />
                                        </div>
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
