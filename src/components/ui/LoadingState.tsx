import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ 
  message = "Loading...", 
  className,
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 space-y-4",
      className
    )}>
      <div className={cn(
        "animate-spin rounded-full border-b-2 border-indigo-600",
        sizeClasses[size]
      )} />
      {message && (
        <p className="text-slate-600 text-sm">{message}</p>
      )}
    </div>
  );
}