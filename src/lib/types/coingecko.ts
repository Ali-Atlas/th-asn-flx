// CoinGecko API response types
export interface CoinGeckoPriceResponse {
  [coinId: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface TokenPriceData {
  price: number;
  priceChange24h: number;
  logoUrl?: string;
}

// Special type for ETH address
export type TokenAddress = `0x${string}` | '0xETH';