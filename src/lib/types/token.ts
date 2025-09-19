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

export interface TokenWithUsdValue extends Token {
  usdValue: number;
}