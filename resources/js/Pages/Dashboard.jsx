import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Page from "./components/Page";
import { useEffect,useState } from "react";
import Swal from "sweetalert2";
import { Loader} from "lucide-react";
import { Vortex } from "@/Components/ui/vortex";
export default function Dashboard() {
    const { document, success, error } = usePage().props;
    console.log(document);

    const [loading, setLoading] = useState(true);

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
                icon: "error",
                title: "Erreur!",
                text: error,
                showConfirmButton: true,
                timer: 5000,
            });
        }

        // Simulate a delay or when the page finishes loading
        setLoading(false);
    }, [success, error]);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            {loading && (
                <div className="loader">
                    <Loader size="35px" className="animate-spin" />
                </div>
            )}
            <Head title="Dashboard" />
            <div className="p-4 mx-auto">
                <div className="mx-auto max-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-black shadow-sm sm:rounded-lg">
                        <Vortex
                            backgroundColor="black"
                            rangeY={800}
                            particleCount={500}
                            baseHue={120}
                            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                        >

                            <Page document={document}  />

                        </Vortex>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
