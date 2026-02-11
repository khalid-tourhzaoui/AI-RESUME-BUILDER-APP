import { Button } from "@/Components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DownloadCloud, Zap } from "lucide-react";
import React, { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { formatFileName } from "@/lib/helper";

function Download(props) {
    const { title, status, isLoading } = props;
    const [loading, setLoading] = useState(false);

    const handleDownload = useCallback(async () => {
        const resumeElement = document.getElementById("resume-preview-id");
        if (!resumeElement) {
            toast({
                title: "Error",
                description: "Could not download",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        const fileName = formatFileName(title);
        try {
            const canvas = await html2canvas(resumeElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; //A4 size in mm
            const pageHeight = 300;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save(fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast({
                title: "Error",
                description: "Error generating PDF",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, [title]);

    return (
        <div className="flex-1 sm:flex-initial">
            <Button
                disabled={
                    isLoading || loading || status === "archived" ? true : false
                }
                onClick={handleDownload}
                className={`w-full bg-green-500 border-4 border-zinc-800 rounded-lg sm:rounded-xl shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 flex items-center justify-center gap-2 font-black uppercase text-xs sm:text-sm text-white transition-all h-[44px] sm:h-[48px] ${
                    isLoading || loading || status === "archived"
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] sm:hover:shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px] hover:translate-y-[2px] sm:hover:translate-y-[3px] active:shadow-none active:translate-y-[4px] sm:active:translate-y-[6px] hover:bg-green-600'
                }`}
            >
                {loading ? (
                    <>
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse flex-shrink-0" />
                        <span className="hidden sm:inline">Generating...</span>
                        <span className="sm:hidden">...</span>
                    </>
                ) : (
                    <>
                        <DownloadCloud className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="hidden md:inline">Download</span>
                        <span className="md:hidden hidden sm:inline">Get PDF</span>
                    </>
                )}
            </Button>
        </div>
    );
}

export default Download;
