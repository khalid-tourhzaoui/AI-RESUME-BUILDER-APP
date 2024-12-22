import React from "react";
import { usePage } from "@inertiajs/react";
import PreviewResume from "./PreviewResume";
import Error from "../errors/Error";

function PublicResume() {
    const { document, isLoading, isSuccess } = usePage().props;
    console.log("preview data : ",document)

    // Si le chargement est en cours, affichez un message ou un spinner
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Si l'opération échoue, affichez une erreur
    if (!isSuccess) {
        return <Error />;
    }

    return (
        <div className="w-full min-h-screen h-auto bg-black">
            <nav className="w-full px-8 border-b sticky top-0 border-gray-700 bg-black/50 h-12 py-2">
                <div className="flex items-center gap-1">
                    <img
                        src="/images/pdf_icon.png"
                        width={20}
                        height={20}
                        alt="pdf logo"
                    />
                    <h5 className="text-[20px] px-1 text-gray-300 font-semibold">
                        {document?.title || "Untitled Resume"}.pdf
                    </h5>
                </div>
            </nav>
            <div className="w-full flex-1 flex items-center justify-center">
                <div className="max-w-[90%] mx-auto lg:max-w-[50%] w-full bg-white">
                    <PreviewResume {...{ document, isLoading }} />
                </div>
            </div>
        </div>
    );
}

export default PublicResume;
