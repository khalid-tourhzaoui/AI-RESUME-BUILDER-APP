import React from "react";

function SummaryPreview({ document }) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span
                    className={`w-2 h-2 rounded-full`}
                    style={{ backgroundColor: document.theme_color }}
                ></span>
                Summary
            </h3>
            <div className="grid grid-cols-1 gap-2">
                <p className="">
                    {document?.summary ||
                        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nulla enim excepturi optio nesciunt
                         numquam eaque fugiat, accusantium, consectetur, laborum exercitationem. Ipsam cumque quas amet, deserunt ullam
                          quis minus asperiores.`}
                </p>
            </div>
        </section>
    );
}

export default SummaryPreview;
