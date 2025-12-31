/**
 * Question Loading Skeleton
 * Shows a placeholder while questions are loading
 */

export function QuestionSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 animate-pulse">
      {/* Question header */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="ml-4 w-10 h-10 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Answer options */}
      <div className="space-y-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full p-4 rounded-lg border-2 border-gray-200 flex items-start gap-3"
          >
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function QuestionListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <QuestionSkeleton key={i} />
      ))}
    </div>
  );
}
