import type { SkeletonLoaderProps } from '@/lib/types/ui';

export function SkeletonLoader({ rows = 3 }: SkeletonLoaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-4 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}