export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  image?: string;
}

export interface Position {
  id: string;
  tokenSymbol: string;
  amount: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

export interface User {
  address: string;
  balance: number;
  positions: Position[];
}

