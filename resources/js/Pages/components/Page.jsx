import React, { useState } from "react";
import AddResume from "./AddResume";
import ResumeList from "./ResumeList";
import { HoverEffect } from "@/Components/ui/card-hover-effect";
import { FileText, CheckCircle, Lock, Archive, Zap, TrendingUp } from "lucide-react";
import TrashListBox from "./TrashListBox";
import { useTranslation } from "react-i18next";

function Page({ document }) {
  const [filter, setFilter] = useState(null);
  const { t } = useTranslation();

  const data = [
    {
      id: 1,
      title: t("Number_of_all_resumes"),
      description: t("Total_resumes_in_the_system"),
      count: document.length,
      status: null,
      icon: FileText,
      backgroundColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      hoverColor: "bg-blue-300",
    },
    {
      id: 2,
      title: t("Number_of_public_resumes"),
      description: t("Currently_active_resumes"),
      count: document.filter((item) => item.status == "public").length,
      status: "public",
      icon: CheckCircle,
      backgroundColor: "bg-gradient-to-r from-green-500 to-green-700",
      hoverColor: "bg-green-300",
    },
    {
      id: 3,
      title: t("Number_of_private_resumes"),
      description: t("Resumes_marked_as_private"),
      count: document.filter((item) => item.status == "private").length,
      status: "private",
      icon: Lock,
      backgroundColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      hoverColor: "bg-yellow-300",
    },
    {
      id: 4,
      title: t("Number_of_archived_resumes"),
      description: t("Archived_resumes_for_later_use"),
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

  console.log(filteredDocuments, filter);

  return (
    <div className="w-full mx-auto max-w-12xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Header Section with Background Effect */}
      <div className="relative mb-8 sm:mb-10 lg:mb-12">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 opacity-10 blur-3xl rounded-full -left-12 -top-12"
            style={{
              background: "radial-gradient(closest-side, rgb(246, 140, 9), rgba(0, 0, 0, 0))"
            }}
          />
          <div
            className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 opacity-10 blur-3xl rounded-full -right-12 top-0"
            style={{
              background: "radial-gradient(closest-side, rgb(59, 130, 246), rgba(0, 0, 0, 0))"
            }}
          />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#f68c09]" />
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-zinc-100"
              style={{
                textShadow: '3px 3px 0px rgba(0,0,0,0.1), -1px -1px 0px rgba(255,255,255,0.5)',
                WebkitTextStroke: '1px rgba(0,0,0,0.1)'
              }}
            >
              Resume Manager
            </h1>
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#f68c09]" />
          </div>
          <p className="text-zinc-200 text-xs sm:text-sm md:text-base font-mono flex items-center justify-center gap-2 flex-wrap">
            <TrendingUp className="w-4 h-4" />
            Manage and organize your professional resumes
            <TrendingUp className="w-4 h-4" />
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 sm:mb-8">
          <HoverEffect
            items={data}
            onClick={(item) => setFilter(item.status)}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full">
        {/* Section Header with Actions */}
        <div className="bg-gradient-to-r from-zinc-100 to-zinc-50 border-4 border-zinc-800 rounded-xl sm:rounded-2xl shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title Section */}
            <div className="flex items-center gap-3">
              <div className="bg-[#f68c09] border-3 border-zinc-800 rounded-lg p-2 sm:p-2.5">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-zinc-800">
                  {filter ? `${filter} Resumes` : t("All_Resumes")}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 font-mono mt-0.5">
                  {filteredDocuments.length} {filteredDocuments.length === 1 ? 'resume' : 'resumes'} found
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial">
                <AddResume />
              </div>
              <div className="flex-1 sm:flex-initial">
                <TrashListBox document={document} />
              </div>
            </div>
          </div>

          {/* Active Filter Badge */}
          {filter && (
            <div className="mt-4 pt-4 border-t-3 border-zinc-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-zinc-600">Active Filter:</span>
                  <span className="px-3 py-1 bg-[#f68c09] text-white text-xs sm:text-sm font-black uppercase border-2 border-zinc-800 rounded-md">
                    {filter}
                  </span>
                </div>
                <button
                  onClick={() => setFilter(null)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-zinc-800 text-xs sm:text-sm font-bold border-2 border-zinc-800 rounded-md hover:bg-zinc-100 transition-all shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px] hover:translate-y-[-1px] active:translate-y-[0px] active:shadow-[rgba(0,0,0,0.9)_0px_1px_0px_0px]"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          <ResumeList document={filteredDocuments} />
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="bg-white border-4 border-zinc-800 rounded-xl sm:rounded-2xl shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] p-8 sm:p-12 text-center">
            <FileText className="w-16 h-16 sm:w-20 sm:h-20 text-zinc-300 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-black uppercase text-zinc-800 mb-2">
              No Resumes Found
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 mb-6">
              {filter
                ? `No ${filter} resumes available. Try a different filter or create a new resume.`
                : 'Get started by creating your first resume!'
              }
            </p>
            {!filter && (
              <div className="flex justify-center">
                <AddResume />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
