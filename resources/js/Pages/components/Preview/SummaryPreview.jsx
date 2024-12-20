import { Skeleton } from '@/Components/ui/skeleton'
import React from 'react'

function SummaryPreview({document, isLoading}) {
  return (
    <div className="w-full min-h-10">
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <p className="text-[13px] !leading-4">
          {document?.summary ||
            "Enter a brief description of your profession baground."}
        </p>
      )}
    </div>
  )
}

export default SummaryPreview
