import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import TopSection from "./common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import Swal from "sweetalert2";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";

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
    const colors = [
        { color: "Red", icon: "🔥", hex: "#FF0000" },
        { color: "Blue", icon: "💧", hex: "#0000FF" },
        { color: "Green", icon: "🌿", hex: "#008000" },
        { color: "Yellow", icon: "🌟", hex: "#FFFF00" },
        { color: "Purple", icon: "🔮", hex: "#800080" },
        { color: "Orange", icon: "🍊", hex: "#FFA500" },
        { color: "Pink", icon: "🌸", hex: "#FFC0CB" },
        { color: "Cyan", icon: "🌀", hex: "#00FFFF" },
        { color: "Gray", icon: "🌫️", hex: "#808080" },
        { color: "Black", icon: "⚫", hex: "#000000" },
        { color: "White", icon: "⚪", hex: "#FFFFFF" },
        { color: "Brown", icon: "🍂", hex: "#8B4513" },
        { color: "Indigo", icon: "💙", hex: "#4B0082" },
        { color: "Violet", icon: "💜", hex: "#EE82EE" },
        { color: "Gold", icon: "🌟", hex: "#FFD700" },
        { color: "Silver", icon: "🌕", hex: "#C0C0C0" },
        { color: "Teal", icon: "🌊", hex: "#008080" },
        { color: "Lime", icon: "🍋", hex: "#00FF00" },
        { color: "Maroon", icon: "🍒", hex: "#800000" },
        { color: "Olive", icon: "🌿", hex: "#808000" }
    ];


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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative w-full">
                                <div className="w-full mx-auto max-w-7xl py-4 px-5">
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default EditResume;
