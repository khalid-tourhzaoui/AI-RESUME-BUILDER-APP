import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import { Textarea } from "@/Components/ui/textarea";
import { AIChatSession } from "@/lib/google-ai-model";
import { useForm } from "@inertiajs/react";
import { Book, FileText, Send, Sparkles, SparklesIcon, Zap } from "lucide-react";
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
    const { data, setData, patch } = useForm({summary: document?.summary || ""});
    const { t } = useTranslation();

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

    const handleSelect = (summary) => {
        setData("summary", summary);
    };

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
        <div className="w-full max-w-full mx-auto">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden p-4 sm:p-5 mb-4 sm:mb-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                            <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5">
                                <Book className="w-4 h-4 sm:w-5 sm:h-5" />
                                {t("Add_Summary")}
                            </Label>
                            <Button type="button" disabled={loading} onClick={GenerateSummaryFromAI}
                                className={`w-full sm:w-auto bg-gradient-to-br from-purple-500 to-purple-600 text-white border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-wide transition-all duration-200 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]'
                                }`}>
                                <SparklesIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">{t("Generate_with_AI")}</span>
                                <span className="sm:hidden">AI Generate</span>
                                {loading && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                            </Button>
                        </div>

                        <Textarea
                            className="min-h-[160px] sm:min-h-[180px] border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all p-3 sm:p-4 text-xs sm:text-sm font-medium text-zinc-800"
                            required
                            placeholder={t("Add_summary_for_your_resume")}
                            maxLength={1000}
                            value={data.summary}
                            onChange={(e) => setData("summary", e.target.value)} />

                        {data.summary.length > 0 && (
                            <div className="bg-zinc-100 border-t-[2px] border-zinc-800 rounded-b-lg mt-2 px-3 sm:px-4 py-2 flex items-center justify-between">
                                <span className="text-zinc-700 text-xs font-bold uppercase">Character Count</span>
                                <span className="text-orange-500 font-black text-sm">
                                    {data.summary.length} / 1000
                                </span>
                            </div>
                        )}
                    </div>

                    {aiGeneratedSummary && (
                        <div className="mb-4 sm:mb-5">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 border-[3px] border-zinc-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-3 sm:p-4 mb-3 sm:mb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                    <h5 className="font-black text-sm sm:text-base uppercase text-white tracking-wide">
                                        {t("Suggestions")}
                                    </h5>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {aiGeneratedSummary?.summaries?.map((suggestion, index) => (
                                    <Card key={index}
                                        className="bg-white border-[3px] border-zinc-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                                        onClick={() => handleSelect(suggestion.summary)}>
                                        <CardHeader className="py-3 px-4 sm:px-5 border-b-[3px] border-zinc-800">
                                            <CardTitle className="font-black text-sm sm:text-base uppercase text-orange-500 flex items-center gap-2 tracking-wide">
                                                <Zap className="w-4 h-4" />
                                                {suggestion.experienceLevel?.charAt(0)?.toUpperCase() + suggestion.experienceLevel?.slice(1)}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 sm:p-5 text-xs sm:text-sm font-medium text-zinc-800">
                                            <TextGenerateEffect words={suggestion?.summary} />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-start">
                        <Button type="submit" disabled={loading || document?.status === "archived"}
                            className={`w-full sm:w-auto bg-gradient-to-br from-green-500 to-green-600 text-white border-[2px] border-zinc-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-2 font-black uppercase text-sm tracking-wide transition-all duration-200 ${
                                loading || document?.status === "archived" ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px]'
                            }`}>
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="hidden sm:inline">Processing...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>{t("Save_Changes")}</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SummaryForm;
