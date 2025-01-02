import { Button } from "@/Components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { act, useState } from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import LanguageForm from "./forms/LanguageForm";
import SocialMedia from "./forms/SocialMedia";

function ResumeForm({document}) {
    const [activeFormIndex, setActiveFormIndex] = useState(document.current_position);
    // console.log(document)

  const handleNext = () => {
    const newIndex = activeFormIndex + 1;
    setActiveFormIndex(newIndex);
  };
    return (
        <div
            className="flex-1 w-full lg:sticky lg:top-16">
            <div className="shadow-md rounded-md bg-slate-500 !border-2 border-white
            bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')]">
                <div className=" flex items-center gap-1 px-3 justify-end border-b py-[7px] min-h-10">
                    {activeFormIndex > 1 && (
                        <Button
                            variant="outline"
                            size="default"
                            className="!px-2 !py-1 !h-auto"
                            onClick={() =>
                                setActiveFormIndex(activeFormIndex - 1)
                            }
                        >
                            <ArrowLeft size="16px" />
                            Previous
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="default"
                        className="!px-2 !py-1 !h-auto"
                        disabled={
                            activeFormIndex === 7 ||
                            document.status === "archived"
                                ? true
                                : false
                        }
                        onClick={handleNext}
                    >
                        Next
                        <ArrowRight size="16px" />
                    </Button>

                </div>
                <div className="px-5 py-3 pb-5">
                    {/* {PersonalInfo Form} */}
                    {activeFormIndex === 1 && <PersonalInfoForm handleNext={handleNext} document={document}/>}
                    {activeFormIndex === 2 && <SummaryForm handleNext={handleNext} document={document} />}
                    {/* {Professional Exp.} */}
                    {activeFormIndex === 3 && <ExperienceForm handleNext={handleNext} document={document} />}
                    {/* {Eduncational Info} */}
                    {activeFormIndex === 4 && <EducationForm handleNext={handleNext} document={document} />}
                    {/* {Skills} */}
                    {activeFormIndex === 5 && <SkillsForm handleNext={handleNext} document={document}/>}
                    {/* {Languages} */}
                    {activeFormIndex === 6 && <LanguageForm handleNext={handleNext} document={document} />}
                    {/* {Social Media} */}
                    {activeFormIndex === 7 && <SocialMedia document={document} />}
                </div>
            </div>
        </div>
    );
}

export default ResumeForm;
