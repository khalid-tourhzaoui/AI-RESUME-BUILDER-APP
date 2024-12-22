import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { AIChatSession } from "@/lib/google-ai-model";
import { useForm } from "@inertiajs/react";
import { Loader, Sparkles } from "lucide-react";
import React, { useState } from "react";
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
            <div className="w-full">
                <h2 className="font-bold text-lg">Summary</h2>
                <p className="text-sm">Add summary for your resume</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-end justify-between">
                        <Label>Add Summary</Label>
                        <Button
                            variant="outline"
                            type="button"
                            className="gap-1"
                            disabled={loading}
                            onClick={GenerateSummaryFromAI}
                        >
                            <Sparkles size="15px" className="text-purple-500" />
                            Generate with AI
                        </Button>
                    </div>

                    <Textarea
                        className="mt-5 min-h-36"
                        required
                        max={500}
                        min={10}
                        value={data.summary}
                        onChange={(e) => setData("summary", e.target.value)}
                    />

                    {aiGeneratedSummary && (
                        <div>
                            <h5 className="font-semibold text-[15px] my-4">
                                Suggestions
                            </h5>
                            <div className="grid grid-cols-1 gap-2">
                                {aiGeneratedSummary?.summaries?.map(
                                    (suggestion, index) => (
                                        <Card
                                            key={index}
                                            className="my-4 bg-primary/5 shadow-none border-primary/30 cursor-pointer"
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
                                                <p>{suggestion.summary}</p>
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <Button
                        className="mt-4"
                        type="submit"
                        disabled={loading || document?.status === "archived"}
                    >
                        {loading && <Loader size="15px" className="animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SummaryForm;
