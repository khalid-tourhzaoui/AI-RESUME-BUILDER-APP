import { Button } from "@/Components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Languages,
  Network,
  Zap,
  Server,
  Smartphone,
  Target,
  TrendingUp,
  Rocket,
  CheckCircle2
} from "lucide-react";
import React, { useState } from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import LanguageForm from "./forms/LanguageForm";
import SocialMedia from "./forms/SocialMedia";

const formSteps = [
  { id: 1, name: "Personal Info", icon: User, color: "bg-blue-400" },
  { id: 2, name: "Summary", icon: FileText, color: "bg-purple-400" },
  { id: 3, name: "Experience", icon: Briefcase, color: "bg-orange-400" },
  { id: 4, name: "Education", icon: GraduationCap, color: "bg-green-400" },
  { id: 5, name: "Skills", icon: Code2, color: "bg-pink-400" },
  { id: 6, name: "Languages", icon: Languages, color: "bg-cyan-400" },
  { id: 7, name: "Social Media", icon: Network, color: "bg-yellow-400" }
];

function ResumeForm({ document }) {
    const [activeFormIndex, setActiveFormIndex] = useState(document.current_position);

    const handleNext = () => {
        const newIndex = activeFormIndex + 1;
        setActiveFormIndex(newIndex);
    };

    const currentStep = formSteps.find(step => step.id === activeFormIndex);
    const CurrentIcon = currentStep?.icon || User;

    return (
        <div className="flex-1 w-full lg:sticky lg:top-16">
            {/* Header with Title */}
            {/* <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white"
                        style={{
                            textShadow: '3px 3px 0px rgba(0,0,0,0.3), -1px -1px 0px rgba(255,255,255,0.1)',
                            WebkitTextStroke: '1px rgba(0,0,0,0.2)'
                        }}
                    >
                        RESUME BUILDER
                    </h2>
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </div>
                <p className="text-zinc-100 text-xs sm:text-sm font-mono flex items-center justify-center gap-2">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                    Form Switchboard • Step {activeFormIndex} of 7
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                </p>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 sm:gap-6">
                {/* LEFT PANEL - SWITCHBOARD */}
                <div className="bg-yellow-50 border-4 sm:border-6 border-zinc-800 rounded-xl sm:rounded-2xl shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] overflow-hidden flex flex-col">
                    {/* Switchboard Header */}
                    <div className="bg-white border-b-4 sm:border-b-6 border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
                            <h3 className="text-xs sm:text-sm font-black uppercase">FORM NAVIGATOR</h3>
                        </div>
                        <span className="text-[10px] sm:text-xs text-zinc-500 font-mono hidden sm:flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Select section
                        </span>
                    </div>

                    {/* Navigation Steps */}
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-grow">
                        {formSteps.map((step) => {
                            const StepIcon = step.icon;
                            const isActive = step.id === activeFormIndex;
                            const isCompleted = step.id < activeFormIndex;

                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveFormIndex(step.id)}
                                    disabled={document.status === "archived"}
                                    className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-3 sm:border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                        isActive
                                            ? 'bg-gradient-to-br from-orange-400 to-orange-500'
                                            : isCompleted
                                            ? 'bg-green-100 hover:bg-green-200'
                                            : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 sm:p-2 rounded-md border-2 border-zinc-800 ${isActive ? 'bg-white' : step.color}`}>
                                            <StepIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-orange-500' : 'text-zinc-800'}`} />
                                        </div>
                                        <div className="text-left">
                                            <span className={`text-xs sm:text-sm font-black uppercase block ${isActive ? 'text-white' : 'text-zinc-800'}`}>
                                                {step.name}
                                            </span>
                                            <span className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-zinc-500'}`}>
                                                Step {step.id}
                                            </span>
                                        </div>
                                        {isActive && (
                                            <Rocket className="bg-white h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800 animate-pulse flex-shrink-0 p-0.5 text-orange-500 ml-auto" />
                                        )}
                                        {isCompleted && !isActive && (
                                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 ml-auto flex-shrink-0" />
                                        )}
                                    </div>

                                    {/* Toggle Switch */}
                                    <div className={`relative w-10 sm:w-12 h-5 sm:h-6 rounded-full border-3 sm:border-4 border-zinc-800 transition-colors flex-shrink-0 ${
                                        isActive ? 'bg-green-500' : isCompleted ? 'bg-green-300' : 'bg-zinc-300'
                                    }`}>
                                        <div className={`absolute top-0 h-full w-1/2 bg-white border-2 border-zinc-800 rounded-full shadow-md transition-transform ${
                                            isActive || isCompleted ? 'translate-x-full' : 'translate-x-0'
                                        }`}></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Switchboard Footer */}
                    <div className="bg-zinc-800 border-t-4 sm:border-t-6 border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 flex-shrink-0">
                        <p className="text-white text-[10px] sm:text-xs font-mono flex items-center gap-2 justify-center">
                            <Zap className="w-3 h-3" />
                            Click to navigate • Auto-save enabled
                        </p>
                    </div>
                </div>

                {/* RIGHT PANEL - CRT MONITOR FORM */}
                <div className="bg-zinc-100 border-4 sm:border-6 border-zinc-800 rounded-xl sm:rounded-2xl shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] overflow-hidden flex flex-col">
                    {/* Monitor Header */}
                    <div className="bg-white border-b-4 sm:border-b-6 border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="bg-red-400 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                            <span className="bg-yellow-400 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                            <span className="bg-green-500 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-zinc-800"></span>
                            <h3 className="text-xs sm:text-sm font-black uppercase ml-1 sm:ml-2 flex items-center gap-1.5">
                                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                                FORM DISPLAY
                            </h3>
                        </div>
                        <span className="text-[10px] sm:text-xs text-zinc-500 font-mono hidden sm:flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {currentStep?.name}
                        </span>
                    </div>

                    {/* Form Content Area with CRT Effect */}
                    <div className="relative bg-gradient-to-b from-zinc-50 to-zinc-100 p-4 sm:p-6 flex-grow overflow-y-auto">
                        {/* CRT Scanline Effect */}
                        <div
                            className="absolute inset-0 pointer-events-none z-0"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px)'
                            }}
                        ></div>

                        {/* Form Badge */}
                        <div className="relative z-10">
                            <div className="bg-gradient-to-br from-orange-400 to-orange-500 border-3 sm:border-4 border-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px]">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <CurrentIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    <div>
                                        <h4 className="text-sm sm:text-base md:text-lg font-black uppercase text-white">
                                            {currentStep?.name}
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-white/80 font-mono">
                                            Section {activeFormIndex} of {formSteps.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Form Content */}
                            <div className="space-y-4">
                                {activeFormIndex === 1 && <PersonalInfoForm handleNext={handleNext} document={document} />}
                                {activeFormIndex === 2 && <SummaryForm handleNext={handleNext} document={document} />}
                                {activeFormIndex === 3 && <ExperienceForm handleNext={handleNext} document={document} />}
                                {activeFormIndex === 4 && <EducationForm handleNext={handleNext} document={document} />}
                                {activeFormIndex === 5 && <SkillsForm handleNext={handleNext} document={document} />}
                                {activeFormIndex === 6 && <LanguageForm handleNext={handleNext} document={document} />}
                                {activeFormIndex === 7 && <SocialMedia document={document} />}
                            </div>
                        </div>
                    </div>

                    {/* Monitor Footer with Navigation */}
                    <div className="bg-zinc-800 border-t-4 sm:border-t-6 border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
                        <p className="text-white text-[10px] sm:text-xs font-mono hidden sm:flex items-center gap-2">
                            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                            Navigation • Press buttons to navigate
                        </p>
                        <div className="flex gap-2 sm:gap-3 ml-auto">
                            {activeFormIndex > 1 && (
                                <Button
                                    onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                                    className="flex items-center gap-1 bg-blue-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded border-2 border-zinc-800 font-bold text-[10px] sm:text-xs md:text-sm hover:bg-blue-600 transition-colors shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_1px_0px_0px] hover:translate-y-[1px]"
                                >
                                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">PREVIOUS</span>
                                </Button>
                            )}

                            {activeFormIndex < 7 && (
                                <Button
                                    onClick={handleNext}
                                    disabled={document.status === "archived"}
                                    className="flex items-center gap-1 bg-green-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded border-2 border-zinc-800 font-bold text-[10px] sm:text-xs md:text-sm hover:bg-green-600 transition-colors shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_1px_0px_0px] hover:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="hidden sm:inline">NEXT</span>
                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeForm;
