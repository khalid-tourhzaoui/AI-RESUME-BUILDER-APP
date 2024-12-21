import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import TopSection from "./common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import Swal from "sweetalert2";

function EditResume() {
    const { document, success, error,next } = usePage().props;

    useEffect(() => {
        if (success) {
            Swal.fire({
                position: 'top-end',
                icon: "success",
                title: "Succès!",
                text: success,
                showConfirmButton: true,
                timer: 5000
            });

        }

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Erreur!",
                text: error,
            });
        }
    }, [success, error]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Update Resume
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="mx-auto max-w-12xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative w-full">
                                <div className="w-full mx-auto max-w-7xl py-4 px-5">
                                    <TopSection document={document}/>
                                    <div className="w-full mt-1">
                                        <div className="flex flex-col lg:flex-row items-start w-full py-3 gap-6">
                                            {/* {Form Section} */}
                                            <ResumeForm document={document} next={next} />
                                            {/* {Preview Section} */}
                                            <ResumePreview document={document} />
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
