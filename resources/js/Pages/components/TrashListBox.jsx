import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useForm } from "@inertiajs/react";
import { Dot, FileText, Search, Trash, Trash2, Undo, Archive } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

function TrashListBox({ document }) {
    const { get, delete: destroy } = useForm();
    const [search, setSearch] = useState("");
    const { t } = useTranslation();

    // Filter documents based on the archived status
    const filteredDocuments = document.filter(
        (doc) => doc.status === "archived"
    );

    // Handle the restoration of a document
    const onRestore = (e, documentId) => {
        e.stopPropagation();
        get(route("documents.updateStatus", { id: documentId, status: "private" }), {
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
            <PopoverTrigger asChild>
                <Button
                    className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-black uppercase border-3 sm:border-4 border-zinc-800 rounded-lg transition-all duration-300 shadow-brutal hover:shadow-brutal-md hover:-translate-y-0.5 bg-white text-zinc-800 hover:bg-primary hover:text-white active:translate-y-0 active:shadow-brutal"
                    variant="outline"
                >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{t('All_Trash')}</span>
                    <span className="sm:hidden">Trash</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[90vw] sm:w-[26rem] md:w-[30rem] !px-0 bg-zinc-100 border-4 border-zinc-800 rounded-xl sm:rounded-2xl shadow-brutal-lg animate-slide-down"
                align="end"
                alignOffset={0}
                forceMount
            >
                <div className="text-sm">
                    {/* Header */}
                    <div className="bg-white border-b-4 border-zinc-800 px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Archive className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                            <h3 className="text-base sm:text-lg font-black uppercase text-zinc-800">
                                Archived Documents
                            </h3>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 sm:h-11 pl-10 pr-3 bg-white border-3 border-zinc-800 rounded-lg focus:ring-2 focus:ring-primary font-medium text-sm placeholder:text-zinc-400 transition-all duration-200"
                                placeholder={t('Filter_by_document_title')}
                            />
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto px-2 sm:px-3 py-3 sm:py-4 scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200">
                        {filteredDocuments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 sm:py-12 animate-fade-in">
                                <Archive className="w-12 h-12 sm:w-16 sm:h-16 text-zinc-300 mb-3 sm:mb-4 animate-pulse-slow" />
                                <p className="text-xs sm:text-sm text-center text-zinc-500 font-semibold">
                                    {t('No_documents_found')}
                                </p>
                                <p className="text-xs text-center text-zinc-400 mt-1">
                                    Archived documents will appear here
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {filteredDocuments
                                    .filter((doc) =>
                                        doc.title
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    )
                                    .map((doc, index) => (
                                        <div
                                            key={doc.id}
                                            className="bg-white border-3 border-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-brutal hover:-translate-y-0.5 animate-slide-up"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Icon */}
                                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 border-2 border-zinc-800 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="font-black text-sm sm:text-base text-zinc-800 truncate mb-1">
                                                        {doc.title}
                                                    </h5>
                                                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-zinc-500 font-mono flex-wrap">
                                                        <span className="flex items-center gap-1 capitalize px-2 py-0.5 bg-purple-100 border-2 border-zinc-800 rounded">
                                                            <Archive className="w-3 h-3" />
                                                            {doc.status}
                                                        </span>
                                                        <Dot className="w-4 h-4 hidden sm:block" />
                                                        <span className="hidden sm:flex items-center">
                                                            {doc.updated_at &&
                                                                format(
                                                                    new Date(doc.updated_at),
                                                                    "MMM dd, yyyy"
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={(e) => onRestore(e, doc.id)}
                                                        className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500 text-white rounded border-2 border-zinc-800 hover:bg-green-600 transition-all duration-300 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:translate-y-0 active:shadow-brutal-sm group"
                                                        title="Restore"
                                                    >
                                                        <Undo className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-rotate-12" />
                                                        <span className="hidden lg:inline text-xs font-bold">Restore</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => onDelete(e, doc.id)}
                                                        className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500 text-white rounded border-2 border-zinc-800 hover:bg-red-600 transition-all duration-300 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:translate-y-0 active:shadow-brutal-sm group"
                                                        title="Delete Permanently"
                                                    >
                                                        <Trash className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" />
                                                        <span className="hidden lg:inline text-xs font-bold">Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {filteredDocuments.length > 0 && (
                        <div className="bg-zinc-800 border-t-4 border-zinc-800 px-3 sm:px-4 py-2 sm:py-3">
                            <p className="text-white text-[10px] sm:text-xs font-mono text-center">
                                {filteredDocuments.filter((doc) =>
                                    doc.title.toLowerCase().includes(search.toLowerCase())
                                ).length} {filteredDocuments.filter((doc) =>
                                    doc.title.toLowerCase().includes(search.toLowerCase())
                                ).length === 1 ? 'document' : 'documents'} in trash
                            </p>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default TrashListBox;
