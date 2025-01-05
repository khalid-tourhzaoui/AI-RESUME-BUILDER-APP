import { INITIAL_THEME_COLOR } from "@/lib/helper";
import React from "react";
import { Building, Calendar, MapPin } from "lucide-react";
import EducationPreview from "./EducationPreview";
import SummaryPreview from "./SummaryPreview";
import SkillPreview from "./SkillPreview";

function ExperiencePreview({ document, isLoading }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;

    return (
        <div className="w-full lg:w-2/3 space-y-8">
            <SummaryPreview isLoading={isLoading} document={document} />
            <section>
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: themeColor }}
                    ></span>
                    Professional Experience
                </h3>
                <div className="space-y-6">
                    {(document?.experience?.length > 0
                        ? document.experience
                        : [
                              {
                                  company_name: "Example Corp",
                                  start_date: "2020-06-01",
                                  end_date: "2023-06-01",
                                  country: "USA",
                                  city: "New York",
                                  title: "Software Engineer",
                                  work_summary: `<ul>
                                                    <li>Developed and maintained web applications.</li>
                                                    <li>Collaborated with cross-functional teams to improve system performance.</li>
                                                    <li>Participated in code reviews and pair programming sessions</li>
                                                    <li>Worked with the product team to develop new features.</li>
                                                </ul>`,
                              },
                          ]
                    ).map((item, index) => {
                        const startDate = new Date(
                            item.start_date
                        ).toLocaleString("en-US", {
                            month: "long",
                            year: "numeric",
                        });
                        const endDate = new Date(item.end_date).toLocaleString(
                            "en-US",
                            {
                                month: "long",
                                year: "numeric",
                            }
                        );
                        return (
                            <div key={index} className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {startDate} - {endDate}
                                        </span>
                                        <MapPin className="w-4 h-4" />
                                        <span>
                                            {item.country} | {item.city}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Building className="w-8 h-8 rounded-md" />
                                    <div>
                                        <div className="font-medium">
                                            {item.company_name}
                                        </div>
                                        <div className="text-gray-600">
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                                <p
                                    className="text-gray-500 exp-preview"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item?.work_summary ||
                                            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            <EducationPreview document={document} />
            <SkillPreview document={document} />
        </div>
    );
}

export default ExperiencePreview;
