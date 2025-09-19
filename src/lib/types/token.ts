
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
  smallBalancesExpanded: boolean;
  setSmallBalancesExpanded: (expanded: boolean) => void;
  totalPortfolioValue: number;
}

// Component props - only for complex components
export interface SmallBalancesGroupProps {
  tokens: TokenWithPrice[];
  totalValue: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface TokenListProps {
  largeBalances: TokenWithPrice[];
  smallBalances: TokenWithPrice[];
  smallBalancesTotal: number;
  smallBalancesExpanded: boolean;
  onToggleSmallBalances: () => void;
  totalPortfolioValue: number;
}