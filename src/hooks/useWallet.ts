import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import type { WalletState } from '@/lib/types/wallet';

/**
 * Custom hook to manage wallet state
 * Provides a clean interface for wallet connection status
 */
export function useWallet(): WalletState {
  const { address, isConnected, isConnecting, status } = useAccount();

  return useMemo(() => ({
    address,
    isConnected,
    isConnecting,
    error: status === 'disconnected' ? null : null,
  }), [address, isConnected, isConnecting, status]);
}