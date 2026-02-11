import React, { useState } from "react";
import {
    EditorProvider,
    Editor,
    Toolbar,
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnStrikeThrough,
    Separator,
    BtnNumberedList,
    BtnBulletList,
    BtnLink,
} from "react-simple-wysiwyg";

import { AlignLeft, Loader, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { AIChatSession } from "@/lib/google-ai-model";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


const PROMPT = `Given the job title "{jobTitle}",
 create 6-7 concise and personal bullet points in
  HTML stringify format that highlight my key
  skills, relevant technologies, and significant
   contributions in that role. Do not include
    the job title itself in the output. Provide
     only the bullet points inside an unordered
     list.`;
const RichTextEditor = (props) => {
    const { jobTitle, initialValue, onEditorChange } = props;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(initialValue || "");
    const { t } = useTranslation();
    //---------------------------------------------------------------------------------

    const GenerateSummaryFromAI = async () => {
        try {
            if (!jobTitle) {
                toast({
                    title: "Must provide Job Position",
                    variant: "destructive",
                });
                Swal.fire({
                    title: "Must provide Job Position",
                    text: "Please provide a job position to generate the summary.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            setLoading(true);

            // Remplacement du placeholder dans le prompt
            const prompt = PROMPT.replace("{jobTitle}", jobTitle);

            // Appel à l'API AI
            const result = await AIChatSession.sendMessage(prompt);

            // Récupération de la réponse brute
            const responseText = await result.response.text();

            // Vérification et parsing JSON
            let validJsonArray;
            try {
                validJsonArray = JSON.parse(`[${responseText}]`);
            } catch (error) {
                console.error("Invalid JSON:", responseText);
                Swal.fire({
                    title: "Failed to generate summary",
                    text: "Something went wrong while generating the summary.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            const summary = validJsonArray?.[0]?.html || validJsonArray?.[0]?.bulletPoints || "<ul><li>No data generated</li></ul>";

            // Mise à jour de l'état de l'éditeur
            setValue(summary); // Stocke le HTML dans l'état
            onEditorChange(summary); // Met à jour le contenu de l'éditeur

            console.log(validJsonArray?.[0]);

        } catch (error) {
            console.error("Error generating summary:", error);
            Swal.fire({
                title: "Failed to generate summary",
                text: "Something went wrong while generating the summary.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    //---------------------------------------------------------------------------------
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap">
                <Label className="text-md font-semibold text-zinc-800">
                    {t("Work_Summary")}
                    <span className="text-[#f68c09] mx-1">({<AlignLeft size={20} className="inline-flex" />})</span> :</Label>
                <Button
                    variant="generate"
                    type="button"
                    className="gap-1 my-2"
                    disabled={loading}
                    onClick={() => GenerateSummaryFromAI()}>
                    <>
                        <Sparkles size={30} className="hover:text-[#f68c09] mr-2" />
                        {t("Generate_with_AI")}
                    </>
                    {loading && <Loader size={30} className="animate-spin mr-2" />}
                </Button>
            </div>

            <EditorProvider>
                <Editor
                    className="bg-white text-black"
                    value={value}
                    containerProps={{
                        style: {
                            resize: "vertical",
                            lineHeight: 1.2,
                            fontSize: "13.5px",
                        },
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onEditorChange(e.target.value);
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};
export default RichTextEditor;
