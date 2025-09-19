'use client';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { TokenList } from '@/components/tokens/TokenList';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { useWallet } from '@/hooks/useWallet';
import { useTokenBalances } from '@/hooks/useTokenBalances';
import { useCallback } from 'react';

export default function Home() {
  const { isConnected } = useWallet();
  const { 
    largeBalances, 
    smallBalances, 
    smallBalancesTotal,
    totalPortfolioValue, 
    smallBalancesExpanded,
    setSmallBalancesExpanded,
    isLoading, 
    error,
    refetch
  } = useTokenBalances();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Token Portfolio
          </h1>
          <div className="flex items-center gap-4">
            {isConnected && !isLoading && (
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Refresh token data"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              </button>
            )}
            <ConnectWallet />
          </div>
        </header>
        
        <section className="relative min-h-[70vh] flex items-center justify-center">
          {!isConnected ? (
            <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-2">Connect your wallet to view your token portfolio</p>
              <p className="text-sm text-gray-400">Ethereum Mainnet Only</p>
            </div>
          ) : isLoading ? (
            <SkeletonLoader rows={4} />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <p className="text-red-600 flex items-center">
                {/* ... icon ... */}
                {error.message.includes('network') || error.message.includes('fetch') 
                  ? 'Network connection issue' 
                  : 'Error loading tokens'}
              </p>
              <p className="text-sm text-red-500 mt-2">{error.message}</p>
              <button 
                onClick={() => refetch()}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : largeBalances.length === 0 && smallBalances.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                  />
                </svg>
              </div>
              <p className="text-gray-600">No tokens found in your wallet</p>
              <p className="text-sm text-gray-400 mt-2">Transfer some tokens to this address to get started</p>
            </div>
          ) : (
            <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <TokenList
                largeBalances={largeBalances}
                smallBalances={smallBalances}
                smallBalancesTotal={smallBalancesTotal}
                totalPortfolioValue={totalPortfolioValue} // Add this
                smallBalancesExpanded={smallBalancesExpanded}
                onToggleSmallBalances={() => setSmallBalancesExpanded(!smallBalancesExpanded)}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}