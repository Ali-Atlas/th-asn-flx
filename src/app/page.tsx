'use client';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useWallet } from '@/hooks/useWallet';
import { useTokenBalances } from '@/hooks/useTokenBalances';

export default function Home() {
  const { isConnected } = useWallet();
  const { largeBalances, smallBalances, smallBalancesTotal, isLoading, error } = useTokenBalances();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Token Portfolio</h1>
          <ConnectWallet />
        </header>
        
        <section className="flex justify-center items-center min-h-[60vh]">
          {!isConnected ? (
            <div className="text-center">
              <p className="text-gray-500 mb-2">Connect your wallet to view your token portfolio</p>
              <p className="text-xs text-gray-400">Supports MetaMask and WalletConnect</p>
            </div>
          ) : isLoading ? (
            <div className="text-gray-500">
              <p className="animate-pulse">Loading your tokens...</p>
            </div>
          ) : error ? (
            <div className="text-red-500">
              <p>Error loading tokens: {error.message}</p>
            </div>
          ) : largeBalances.length === 0 && smallBalances.length === 0 ? (
            <div className="text-gray-500">
              <p>No tokens found in your wallet</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
              {/* Token list will go here in next step */}
              <p className="text-gray-600">
                Found {largeBalances.length} tokens above $0.10
              </p>
              {smallBalances.length > 0 && (
                <p className="text-gray-600">
                  And {smallBalances.length} small balances totaling ${smallBalancesTotal.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}