import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Page from "./components/Page";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
    const { document, success, error } = usePage().props;

    useEffect(() => {
        if (success) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Succès!",
                text: success,
                showConfirmButton: true,
                timer: 5000,
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
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="mx-auto max-w-12xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Page document={document} e />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
