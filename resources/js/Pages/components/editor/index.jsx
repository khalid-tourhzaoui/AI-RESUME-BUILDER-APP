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

import { Loader, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { AIChatSession } from "@/lib/google-ai-model";
import Swal from "sweetalert2";

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
    //---------------------------------------------------------------------------------

    const GenerateSummaryFromAI = async () => {
        try {
            if (!jobTitle) {
                toast({
                    title: "Must provide Job Position",
                    variant: "destructive",
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
            toast({
                title: "Failed to generate summary",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };


    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    return (
        <div>
            <div className="flex items-center justify-between my-2">
                <Label>Work Summary</Label>
                <Button
                    variant="outline"
                    type="button"
                    className="gap-1"
                    disabled={loading}
                    onClick={() => GenerateSummaryFromAI()}>
                    <>
                        <Sparkles size="15px" className="text-purple-500" />
                        Generate with AI
                    </>
                    {loading && <Loader size="13px" className="animate-spin" />}
                </Button>
            </div>

            <EditorProvider>
                <Editor
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
