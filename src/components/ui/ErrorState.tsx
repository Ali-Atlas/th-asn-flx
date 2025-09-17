import { cn } from '@/lib/utils';

interface ErrorStateProps {
  error?: Error | string | null;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  error, 
  onRetry,
  className 
}: ErrorStateProps) {
  const message = error instanceof Error 
    ? error.message 
    : error || "Something went wrong";
  
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 space-y-4",
      className
    )}>
      <div className="text-rose-500">
        <svg 
          className="w-12 h-12" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>
      
      <div className="text-center">
        <p className="text-slate-900 font-medium">Error</p>
        <p className="text-slate-600 text-sm mt-1 max-w-md">{message}</p>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}