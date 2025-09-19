export interface SkeletonLoaderProps {
  rows?: number;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}