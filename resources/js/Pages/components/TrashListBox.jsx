import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useForm } from "@inertiajs/react";
import { Dot, FileText, Search, Trash, Trash2, Undo } from "lucide-react";
import React, {  useState } from "react";
import { format } from "date-fns"; // Ensure you have the date-fns package if you're using `format`

function TrashListBox({ document }) {
    const {  get ,delete:destroy} = useForm();
    const [search, setSearch] = useState("");

    // Filter documents based on the archived status
    const filteredDocuments = document.filter(
        (doc) => doc.status === "archived"
    );

    // Handle the restoration of a document
    const onRestore = (e, documentId) => {
        e.stopPropagation();
        get(route("documents.updateStatus", { id:documentId ,status:"private"}), {
            onSuccess: () => {
                console.log("Document restored successfully");
            },
            onError: (error) => {
                console.error("Failed to restore document:", error);
            },
        });
    };
    // Handle the permanent deletion of a document
    const onDelete = (e, documentId) => {
        e.stopPropagation();
        destroy(route('documents.delete', { id: documentId }), {
            onSuccess: () => {
                console.log('Document deleted permanently');
            },
            onError: (error) => {
                console.error('Failed to delete document:', error);
            }
        });
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    className="text-[15px] gap-[2px] items-center hover:bg-[#f68c09] hover:text-white hover:border-[#f68c09]"
                    variant="outline"
                >
                    <Trash2 size="15px" />
                    <span>All Trash</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="bg-background w-[22rem] !px-2"
                align="end"
                alignOffset={0}
                forceMount
            >
                <div className="text-sm">
                    <div className="flex items-center gap-x-1 p-2">
                        <Search className="w-4 h-4" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-7 px-2 bg-secondary"
                            placeholder="Filter by document title"
                        />
                    </div>
                    <div className="mt-2 px-1 pb-1">
                        {filteredDocuments.length === 0 ? (
                            <p className="text-xs text-center text-muted-foreground">
                                No documents found
                            </p>
                        ) : (
                            filteredDocuments
                                .filter((doc) =>
                                    doc.title
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .map((doc) => (
                                    <div
                                        key={doc.id}
                                        role="button"
                                        className="text-sm rounded-s w-full hover:bg-primary/5 flex items-center justify-between
                                         py-1 px-1"
                                    >
                                        <div className="flex items-start gap-1">
                                            <FileText
                                                size="15px"
                                                className="mt-[3px]"
                                            />
                                            <div className="flex flex-col">
                                                <h5 className="font-semibold text-sm truncate block w-[200px]">
                                                    {doc.title}
                                                </h5>
                                                <div className="flex items-center !text-[12px]">
                                                    <span className="flex items-center capitalize gap-[2px]">
                                                        {doc.status}
                                                    </span>
                                                    <Dot size="15px" />
                                                    <span className="items-center">
                                                        {doc.updated_at &&
                                                            format(
                                                                new Date(
                                                                    doc.updated_at
                                                                ),
                                                                "MMM dd, yyyy"
                                                            )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div
                                                role="button"
                                                onClick={(e) =>
                                                    onRestore(e, doc.id)
                                                }
                                                className="rounded-sm hover:bg-neutral-200 w-6 h-6 flex items-center justify-center
                                                 dark:hover:bg-gray-700"
                                            >
                                                <Undo className="h-4 w-4" />
                                            </div>
                                            {/* Delete Permanently button */}
                                            <div
                                                role="button"
                                                onClick={(e) =>
                                                    onDelete(e, doc.id)
                                                }
                                                className="rounded-sm hover:bg-neutral-200 w-6 h-6 flex items-center justify-center
                                                 dark:hover:bg-gray-700"
                                            >
                                                <Trash className="h-4 w-4 text-red-600" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default TrashListBox;
