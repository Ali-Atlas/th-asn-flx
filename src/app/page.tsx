'use client';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useWallet } from '@/hooks/useWallet';
import { getAllTokenData } from '@/lib/api/rpc';
import { useEffect } from 'react';
import { getTokenPrices } from '@/lib/api/coingecko';
import { ERC20_ADDRESSES } from '@/lib/constants/tokens';

export default function Home() {
  const { isConnected } = useWallet();
  const { address } = useWallet();

  useEffect(() => {
    if (isConnected && address) {
      Promise.all([
        getAllTokenData(address as Address),
        getTokenPrices(['0xETH', ...ERC20_ADDRESSES] as any)
      ]).then(([tokens, prices]) => {
        console.log('Tokens:', tokens);
        console.log('Prices:', prices);
      });
    }
  }, [isConnected, address]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Token Portfolio</h1>
          <ConnectWallet />
        </header>
        
        <section className="flex justify-center items-center h-[60vh]">
          {isConnected ? (
            <div className="text-gray-500">
              {/* Token list will go here */}
              <p className="animate-pulse">Loading tokens...</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-2">Connect your wallet to view your token portfolio</p>
              <p className="text-xs text-gray-400">Supports MetaMask and WalletConnect</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}