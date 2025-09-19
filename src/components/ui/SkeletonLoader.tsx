import type { SkeletonLoaderProps } from '@/lib/types/ui';

export function SkeletonLoader({ rows = 3 }: SkeletonLoaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full max-w-2xl">
      {/* Header skeleton */}
      <div className="px-6 py-3 bg-[#f8f9fa] border-b border-gray-100">
        <div className="flex text-xs">
          <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse ml-auto"></div>
        </div>
      </div>
      
      {/* Row skeletons */}
      <div className="bg-white">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center px-6 py-3 border-b border-gray-50">
            {/* Asset/Amount skeleton */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
            
            {/* Price skeleton */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
            
            {/* USD Value skeleton */}
            <div className="flex-1 flex justify-end">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}