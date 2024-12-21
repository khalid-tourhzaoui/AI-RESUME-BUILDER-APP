import html2canvas from "html2canvas";

export const INITIAL_THEME_COLOR = "#7c3aed";
//---------------------------------------------------------------------
export const formatFileName = (title,useHyphen = true) => {
    const delimiter = useHyphen ? "-" : "_";
    return title.trim().replace(/\s+/g, delimiter) + "pdf";
};
//---------------------------------------------------------------------
export const generateThumbnail = async () => {
    const resumeElement = document.getElementById(
      "resume-preview-id"
    );
    if (!(resumeElement instanceof HTMLElement)) {
      console.error("Resume preview element is not an HTMLElement");
      return;
    }
    if (!resumeElement) {
      console.error("Resume preview element not found");
      return;
    }

    try {
      const canvas = await html2canvas(resumeElement, { scale: 0.5 });
      const thumbnailImage = canvas.toDataURL("image/png");
      return thumbnailImage;
    } catch (error) {
      console.error("Thumbnail generation failed", error);
    }
  };
