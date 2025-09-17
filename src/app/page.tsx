'use client';

import { WalletButton } from '@/components/wallet/WalletButton';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAccount } from 'wagmi';
import { useStore } from '@/lib/store';
import { useApi } from '@/hooks/useApi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { testData, setTestData } = useStore();

  // Example API call 
  const { data, loading, error, refetch } = useApi<any>({
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    enabled: false, // auto-fetch
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Felix Live Coding</h1>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Wallet Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Setup Status</h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                isConnected ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
              }`} />
              <span className="text-sm text-slate-700">
                Wallet: {isConnected ? (
                  <span className="font-mono text-slate-900">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                ) : (
                  <span className="text-slate-500">Not connected</span>
                )}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-3" />
              <span className="text-sm text-slate-700">Environment: Ready</span>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-3" />
              <span className="text-sm text-slate-700">State Management: Zustand configured</span>
            </div>
          </div>
        </div>

        {/* Test Components */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Component Test Area</h2>
          
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <p className="text-sm font-medium text-slate-700 mb-3">Loading State:</p>
              <LoadingState message="Fetching data..." />
            </div>
            
            <div className="border-b border-slate-100 pb-6">
              <p className="text-sm font-medium text-slate-700 mb-3">Error State:</p>
              <ErrorState 
                error="Sample error message" 
                onRetry={() => console.log('Retry clicked')} 
              />
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">Empty State:</p>
              <EmptyState message="No data available" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}