import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/google-ai-model";
import { useForm } from "@inertiajs/react";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { da } from './../../../../../node_modules/date-fns/locale/da';
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
    // const [summary, setSummary] = useState("wc");
    const { data, setData, patch } = useForm({
        summary: document?.summary || "",
    });
   
    const GenerateSummaryFromAI = async () => {
        try {
            const jobTitle = document?.personal_info?.job_title;
            if (!jobTitle) return;
            setLoading(true);
            const PROMPT = prompt.replace("{jobTitle}", jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            setAiGeneratedSummary(JSON.parse(responseText));
            console.log(aiGeneratedSummary.summaries);
        } catch (error) {
            toast({
                title: "Failed to generate summary",
                variant: "destructive",
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
        if (!data.summary.trim()) {
            toast({
                title: "Validation Error",
                description: "Summary cannot be empty.",
                variant: "destructive",
            });
            return;
        }
        try {
            await patch(route("documents.UpdateSummary", document.document_id));
            toast({
                title: "Success",
                description: "Information saved successfully.",
                variant: "success",
            });
            if (handleNext) handleNext();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save information.",
                variant: "destructive",
            });
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
                            onClick={() => GenerateSummaryFromAI()}
                        >
                            <Sparkles size="15px" className="text-purple-500" />
                            Generate with AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5 min-h-36"
                        required
                        value={document?.summary || data.summary}
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
                                            role="button"
                                            key={index}
                                            className="my-4 bg-primary/5 shadow-none
                                                    border-primary/30
                                                "
                                            onClick={() =>
                                                handleSelect(suggestion.summary)
                                            }
                                        >
                                            <CardHeader className="py-2">
                                                <CardTitle className="font-semibold text-md">
                                                    {suggestion.experienceLevel
                                                        ?.charAt(0)
                                                        ?.toUpperCase() +
                                                        suggestion.experienceLevel?.slice(
                                                            1
                                                        )}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-sm">
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
                        disabled={
                            loading || document?.status === "archived"
                                ? true
                                : false
                        }
                    >
                        {loading && (
                            <Loader size="15px" className="animate-spin" />
                        )}
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SummaryForm;
