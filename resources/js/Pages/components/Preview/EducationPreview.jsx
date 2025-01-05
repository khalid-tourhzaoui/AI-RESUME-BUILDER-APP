import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { School } from "lucide-react";

function EducationPreview({ document }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full`} style={{backgroundColor:themeColor}}></span>
                Education
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {(document?.education?.length > 0 ? document.education : [{
                    university_name: "University of Columbia",
                    start_date: "2014-08-01",
                    end_date: "2025-05-01",
                    major: "Computer Science",
                    degree: "Bachelor of Science",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. a aliqua."
                }]).map((item, index) => {
                    const startDate = new Date(item.start_date).toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    });
                    const endDate = new Date(item.end_date).toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    });
                    return (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <School className="w-8 h-8 rounded-md"/>
                                <span className="font-medium">
                                    {item.university_name}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                {startDate && endDate ? `${startDate} - ${endDate}` : 'August 2014 - May 2025'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {item.major} - {item.degree}
                            </div>
                            <div className="text-sm text-gray-500">
                                {item.description}
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}

export default EducationPreview;
