import { getAddress } from 'viem';
import type { TokenWithPrice } from '@/lib/types/token';

export const MOCK_TOKENS: TokenWithPrice[] = [
  {
    address: '0xETH',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    balance: 1000000000000000000n, // 1 ETH
    formattedBalance: '1',  // Changed from '1.0000'
    price: 2435.50,
    priceChange24h: -2.3,
    usdValue: 2435.50,
    logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
  },
  {
    address: getAddress('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    balance: 500000000n, // 500 USDC
    formattedBalance: '500',  // Changed from '500.00'
    price: 1.00,
    priceChange24h: 0.1,
    usdValue: 500.00,
    logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
  },
  {
    address: getAddress('0x514910771AF9Ca656af840dff83E8264EcF986CA'),
    symbol: 'LINK',
    name: 'ChainLink',
    decimals: 18,
    balance: 75000000000000000n, // 0.075 LINK
    formattedBalance: '0.075',
    price: 15.00,
    priceChange24h: 3.5,
    usdValue: 1.125,
    logoUrl: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
  },
  {
    address: getAddress('0xdAC17F958D2ee523a2206206994597C13D831ec7'),
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    balance: 50000000n, // 50 USDT - small balance
    formattedBalance: '50.00',
    price: 1.00,
    priceChange24h: -0.05,
    usdValue: 0.05,
    logoUrl: 'https://assets.coingecko.com/coins/images/325/small/Tether.png'
  },
  {
    address: getAddress('0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'),
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    balance: 100000n, // 0.001 WBTC - small balance
    formattedBalance: '0.001',
    price: 43250.00,
    priceChange24h: -1.8,
    usdValue: 0.04325,
    logoUrl: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png'
  }
];