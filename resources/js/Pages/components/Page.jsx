import React, { useState } from "react";
import AddResume from "./AddResume";
import ResumeList from "./ResumeList";
import { HoverEffect } from "@/Components/ui/card-hover-effect";
import { FileText, CheckCircle, Lock, Archive } from "lucide-react";
import TrashListBox from "./TrashListBox";

function Page({ document}) {
  const [filter, setFilter] = useState(null);

  const data = [
    {
      id: 1,
      title: "Number of all resumes",
      description: "Total resumes in the system",
      count: document.length,
      status: null,
      icon: FileText,
      backgroundColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      hoverColor: "bg-blue-300",
    },
    {
      id: 2,
      title: "Number of public resumes",
      description: "Currently active resumes",
      count: document.filter((item) => item.status === "public").length,
      status: "public",
      icon: CheckCircle,
      backgroundColor: "bg-gradient-to-r from-green-500 to-green-700",
      hoverColor: "bg-green-300",
    },
    {
      id: 3,
      title: "Number of private resumes",
      description: "Resumes marked as private",
      count: document.filter((item) => item.status === "private").length,
      status: "private",
      icon: Lock,
      backgroundColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      hoverColor: "bg-yellow-300",
    },
    {
      id: 4,
      title: "Number of archived resumes",
      description: "Archived resumes for later use",
      count: document.filter((item) => item.status == "archived").length,
      status: "archived",
      icon: Archive,
      backgroundColor: "bg-gradient-to-r from-purple-500 to-purple-700",
      hoverColor: "bg-purple-300",
    },
  ];

  const filteredDocuments = filter
    ? document.filter((item) => item.status === filter)
    : document;
    console.log(filteredDocuments);

  return (
      <div className="w-full mx-auto max-w-12xl">
        <div className="flex items-start justify-between">
          <div>
            <HoverEffect
              items={data}
              onClick={(item) => setFilter(item.status)}
            />
          </div>
          {/* <div className="shrink-0 flex items-center gap-3">
                <TrashListBox document={document} />
            </div> */}
        </div>

        <div className="w-full">
          <h5 className="text-xl font-semibold dark:text-inherit text-white my-5">
            {filter ? `Filtered Resumes (${filter})` : "All Resumes"}
          </h5>
          <div className="shrink-0 inline-flex">
                {/* {Trash List} */}
                <TrashListBox document={document} />
            </div>
          <div className="flex flex-wrap w-full gap-5">

            <AddResume />
            <ResumeList
              document={filteredDocuments}
            />
            {/* <TrashListBox document={document}/> */}
          </div>
        </div>
      </div>

  );
}

export default Page;
