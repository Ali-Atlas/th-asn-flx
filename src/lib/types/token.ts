import type { Address } from 'viem';

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: bigint;
  formattedBalance: string;
  price?: number;
  usdValue?: number;
  priceChange24h?: number;
  logoUrl?: string;
}

export interface TokenWithPrice extends Token {
  price: number;
  usdValue: number;
  priceChange24h: number;
  logoUrl?: string;
}

export interface TokenBalancesState {
  tokens: TokenWithPrice[];
  largeBalances: TokenWithPrice[];
  smallBalances: TokenWithPrice[];
  smallBalancesTotal: number;
  isLoading: boolean;
  error: Error | null;
}

export interface UseTokenBalancesReturn extends TokenBalancesState {
  refetch: () => void;
}

// For components
export interface TokenDisplayProps {
  token: TokenWithPrice;
  isLast?: boolean;
}

export interface SmallBalancesGroupProps {
  tokens: TokenWithPrice[];
  totalValue: number;
  isExpanded: boolean;
  onToggle: () => void;
}