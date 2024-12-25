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
    const { document, success, error } = usePage().props;

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
                    <div className="overflow-hidden bg-black shadow-sm sm:rounded-lg">
                        {/* Ajout du Vortex ici */}
                        {/* <Vortex
                            backgroundColor="black"
                            rangeY={800}
                            particleCount={500}
                            baseHue={120}
                            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full min-h-screen relative"
                        > */}
                            <div className="relative z-10 w-full">
                                <div className="w-full mx-auto max-w-12xl py-4 px-5">
                                    <TopSection document={document} />
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
                        {/* </Vortex> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default EditResume;
