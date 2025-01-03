import { Button } from "@/Components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DownloadCloud } from "lucide-react";
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
        9;
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
            description: "Error generating PDF:",
            variant: "destructive",
        });
        } finally {
        setLoading(false);
        }
    }, [title]);


    return (
        <div className="pb-3">
            <Button
                disabled={
                    isLoading || loading || status === "archived" ? true : false
                }
                variant="generate"
                className="gap-1 !p-2 min-w-9 lg:min-w-auto lg:p-4"
                onClick={handleDownload}
            >
                <div className="flex items-center gap-1">
                    <DownloadCloud size="17px" />
                    <span className="hidden lg:flex">
                        {loading ? "Generating PDF" : "Download Resume"}
                    </span>
                </div>
            </Button>
        </div>
    );
}

export default Download;
