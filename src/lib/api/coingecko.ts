import { COINGECKO_API_KEY } from '../constants/tokens';
import type { 
  CoinGeckoPriceResponse, 
  CoinGeckoMarketData, 
  TokenPriceData, 
  TokenAddress 
} from '../types/coingecko';
import { SimpleCache } from '@/lib/utils/cache';

// Create cache instances (30 seconds for prices, 5 minutes for logos)
const priceCache = new SimpleCache<Map<string, TokenPriceData>>(30);
const logoCache = new SimpleCache<Map<string, string>>(300);

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Map contract addresses to CoinGecko IDs (case-insensitive)
const CONTRACT_TO_COINGECKO_ID: Record<string, string> = {
  // Native ETH
  '0xeth': 'ethereum',
  // WETH
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'weth',
  // WBTC
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': 'wrapped-bitcoin',
  // SOL (Wrapped)
  '0xd31a59c85ae9d8edefec411d448f90841571b89c': 'wrapped-solana',
  // BNB
  '0xb8c77482e45f1f44de1745f52c74426c631bdd52': 'binancecoin',
  // stETH
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84': 'staked-ether',
  // LINK
  '0x514910771af9ca656af840dff83e8264ecf986ca': 'chainlink',
  // USDC
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'usd-coin',
  // USDT
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 'tether',
};

/**
 * Fetch prices for multiple tokens from CoinGecko
 * Uses the /simple/price endpoint with multiple IDs
 */
export async function getTokenPrices(
  tokenAddresses: readonly TokenAddress[]
): Promise<Map<string, TokenPriceData>> {
  // Check cache first
  const cacheKey = tokenAddresses.slice().sort().join(',');
  const cached = priceCache.get(cacheKey);
  if (cached) {
    console.log('Using cached price data');
    return cached;
  }

  try {
    // Convert addresses to CoinGecko IDs
    const geckoIds = tokenAddresses
      .map(addr => CONTRACT_TO_COINGECKO_ID[addr.toLowerCase()])
      .filter(Boolean);

    if (geckoIds.length === 0) {
      console.error('No valid CoinGecko IDs found');
      return new Map();
    }

    // Fetch prices from CoinGecko
    const params = new URLSearchParams({
      ids: geckoIds.join(','),
      vs_currencies: 'usd',
      include_24hr_change: 'true',
      x_cg_api_key: COINGECKO_API_KEY,
    });

    const response = await fetch(
      `${COINGECKO_BASE_URL}/simple/price?${params}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CoinGeckoPriceResponse = await response.json();
    
    // Map back from CoinGecko IDs to contract addresses
    const priceMap = new Map<string, TokenPriceData>();
    
    for (const [address, geckoId] of Object.entries(CONTRACT_TO_COINGECKO_ID)) {
      const priceData = data[geckoId];
      if (priceData) {
        priceMap.set(address, {
          price: priceData.usd ?? 0,
          priceChange24h: priceData.usd_24h_change ?? 0,
        });
      }
    }

    // Cache the result before returning
    priceCache.set(cacheKey, priceMap);
    return priceMap;
  } catch (error) {
    console.error('Error fetching prices from CoinGecko:', error);
    return new Map();
  }
}

/**
 * Fetch token logos from CoinGecko
 * Optional enhancement - can be called separately if needed
 */
export async function getTokenLogos(
  tokenAddresses: readonly TokenAddress[]
): Promise<Map<string, string>> {
  // Check cache first
  const cacheKey = tokenAddresses.slice().sort().join(',');
  const cached = logoCache.get(cacheKey);
  if (cached) {
    console.log('Using cached logo data');
    return cached;
  }

  try {
    const geckoIds = tokenAddresses
      .map(addr => CONTRACT_TO_COINGECKO_ID[addr.toLowerCase()])
      .filter(Boolean);

    if (geckoIds.length === 0) {
      return new Map();
    }

    const params = new URLSearchParams({
      ids: geckoIds.join(','),
      x_cg_api_key: COINGECKO_API_KEY,
    });

    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&${params}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CoinGeckoMarketData[] = await response.json();
    const logoMap = new Map<string, string>();

    for (const coin of data) {
      // Find the address that maps to this coin ID
      for (const [address, geckoId] of Object.entries(CONTRACT_TO_COINGECKO_ID)) {
        if (geckoId === coin.id && coin.image) {
          logoMap.set(address, coin.image);
        }
      }
    }

    // Cache the result before returning
    logoCache.set(cacheKey, logoMap);
    return logoMap;
  } catch (error) {
    console.error('Error fetching logos from CoinGecko:', error);
    return new Map();
  }
}