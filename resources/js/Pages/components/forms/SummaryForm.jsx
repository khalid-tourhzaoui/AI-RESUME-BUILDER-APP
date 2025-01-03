import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import { Textarea } from "@/Components/ui/textarea";
import { AIChatSession } from "@/lib/google-ai-model";
import { useForm } from "@inertiajs/react";
import { Book, FileText, Loader, Sparkles, SparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const prompt = `Job Title: {jobTitle}. Based on the job title, please generate concise
  and complete summaries for my resume in JSON format, incorporating the following experience
  levels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines,
  reflecting a personal tone and showcasing specific relevant programming languages, technologies,
  frameworks, and methodologies without any placeholders or gaps. Ensure that the summaries are
  engaging and tailored to highlight unique strengths, aspirations, and contributions to collaborative
  projects, demonstrating a clear understanding of the role and industry standards.`;

function SummaryForm({ document, handleNext }) {
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummary, setAiGeneratedSummary] = useState(null);
    const { data, setData, patch } = useForm({
        summary: document?.summary || "",
    });
    const { t } = useTranslation();

    // AI Summary Generation
    const GenerateSummaryFromAI = async () => {
        const jobTitle = document?.personal_info?.job_title;
        if (!jobTitle) return;

        setLoading(true);

        try {
            const PROMPT = prompt.replace("{jobTitle}", jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            const generatedSummary = JSON.parse(responseText);

            setAiGeneratedSummary(generatedSummary);
        } catch (error) {
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

    // Handle AI summary selection
    const handleSelect = (summary) => {
        setData("summary", summary);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await patch(route("documents.UpdateSummary", document.document_id), {
                data: { summary: data.summary },
            });

            if (handleNext) handleNext();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <div className="w-full text-white">
                <h2 className="font-bold text-lg">
                    {t("Summary")} : <span className="text-lg text-[#f68c09]">{t("Add_summary_for_your_resume")}</span>
                </h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between flex-wrap mt-2">
                        <Label className="text-md font-semibold text-white">
                            {t("Add_Summary")} :
                        </Label>
                        <Button
                            variant="outline"
                            type="button"
                            className="gap-1"
                            disabled={loading}
                            onClick={GenerateSummaryFromAI}
                        >
                            <SparklesIcon size={30} className="mr-2" />
                            {t("Generate_with_AI")}
                            {loading && <Loader size="15px" className="animate-spin" />}
                        </Button>
                    </div>

                    <Textarea
                        className="mt-5 min-h-40 border-white"
                        required
                        placeholder={t("Add_summary_for_your_resume")}
                        max={1000}
                        min={10}
                        value={data.summary}
                        onChange={(e) => setData("summary", e.target.value)}
                    />

                    {data.summary.length > 0 && (
                        <p className="text-sm text-right font-bold mt-4 text-white">
                            {data.summary.length} / 1000
                        </p>
                    )}

                    {aiGeneratedSummary && (
                        <div>
                            <h5 className="font-semibold text-md text-white mt-1">
                                {t("Suggestions")}
                            </h5>
                            <div className="grid grid-cols-1 gap-2">
                                {aiGeneratedSummary?.summaries?.map(
                                    (suggestion, index) => (
                                        <Card
                                            key={index}
                                            className="my-4 bg-white shadow-none border-2 border-[#f68c09] cursor-pointer"
                                            onClick={() =>
                                                handleSelect(suggestion.summary)
                                            }
                                        >
                                            <CardHeader className="py-2">
                                                <CardTitle className="font-semibold text-md">
                                                    {suggestion.experienceLevel
                                                        ?.charAt(0)
                                                        ?.toUpperCase() +
                                                        suggestion.experienceLevel?.slice(1)}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-sm cursor-pointer">
                                                {/* <p>{suggestion.summary}</p> */}
                                               <p><TextGenerateEffect words={suggestion?.summary} /></p>
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <Button
                        className="mt-4 w-full"
                        type="submit"
                        disabled={loading || document?.status === "archived"}
                    >
                        {loading && <Loader size="15px" className="animate-spin" />}
                        {t("Save_Changes")}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SummaryForm;
