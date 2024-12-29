import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { useForm } from "@inertiajs/react";
import { Loader, MoreHorizontal, Redo, Trash2 } from "lucide-react";
import React from "react";

function MoreOption({ document, isLoading }) {
    const { delete: destroy,patch, processing } = useForm(); // Récupération de la fonction `delete` pour supprimer

    // Fonction pour gérer les actions de suppression ou de restauration
    const handleClick = (newStatus) => {
        if (newStatus === "archived") {
            patch(route("documents.archive", { id: document.id }), {
                onSuccess: () => {
                    console.log("Document archived successfully.");
                },
                onError: (error) => {
                    console.error("Failed to archive document:", error);
                },
            });
        } else if (newStatus === "private") {
            patch(route("documents.restore", { id: document.id }), {
                onSuccess: () => {
                    console.log("Document restored successfully.");
                },
                onError: (error) => {
                    console.error("Failed to restore document:", error);
                },
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white hover:bg-[#f68c09] hover:text-white"
                >
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    {document.status === "archived" ? (
                        <Button
                            variant="ghost"
                            className="gap-1 !py-2 !cursor-pointer"
                            disabled={isLoading || processing}
                            onClick={() => handleClick("private")}
                        >
                            <Redo size="15px" />
                            Restore Document
                            {processing && (
                                <Loader
                                    size="15px"
                                    className="animate-spin"
                                />
                            )}
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            className="gap-1 !py-2 !cursor-pointer"
                            disabled={isLoading || processing}
                            onClick={() => handleClick("archived")}
                        >
                            <Trash2 size="15px" />
                            Move to Trash
                            {processing && (
                                <Loader
                                    size="15px"
                                    className="animate-spin"
                                />
                            )}
                        </Button>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default MoreOption;
