import { Skeleton } from '@/Components/ui/skeleton'
import React from 'react'

function SummaryPreview({document, isLoading}) {
  return (
    // <div className="w-full min-h-10">
    //   {isLoading ? (
    //     <Skeleton className="h-6 w-full" />
    //   ) : (
    //     <p className="text-[13px] !leading-4">
    //       {document?.summary ||
    //         "Enter a brief description of your profession baground."}
    //     </p>
    //   )}
    // </div>
    <section>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full`} style={{backgroundColor:document.theme_color}}></span>
                Summary
            </h3>
            <div className="grid grid-cols-1 gap-2">
                <p className="">
                    {document?.summary ||
                        "Enter a brief description of your profession baground."}
                </p>
            </div>
        </section>
  )
}

export default SummaryPreview
