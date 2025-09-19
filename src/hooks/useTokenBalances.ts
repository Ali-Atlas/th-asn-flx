import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useMemo, useState } from 'react';
import { getAllTokenData } from '@/lib/api/rpc';
import { getTokenPrices, getTokenLogos } from '@/lib/api/coingecko';
import { ERC20_ADDRESSES } from '@/lib/constants/tokens';
import type { TokenWithPrice, UseTokenBalancesReturn } from '@/lib/types/token';
import type { TokenAddress } from '@/lib/types/coingecko';
import type { Address } from 'viem';

const SMALL_BALANCE_THRESHOLD = 0.10; // $0.10 USD

async function fetchTokenBalances(address: Address): Promise<TokenWithPrice[]> {
  const allAddresses: TokenAddress[] = ['0xETH', ...ERC20_ADDRESSES as Address[]];
  
  // Fetch all data in parallel
  const [tokenData, priceData, logoData] = await Promise.all([
    getAllTokenData(address),
    getTokenPrices(allAddresses),
    getTokenLogos(allAddresses),
  ]);

  // Combine token data with prices
  const tokensWithPrices: TokenWithPrice[] = tokenData.map(token => {
    const priceInfo = priceData.get(token.address.toLowerCase()) || {
      price: 0,
      priceChange24h: 0,
    };
    
    const logo = logoData.get(token.address.toLowerCase());
    const balance = Number(token.formattedBalance);
    const usdValue = balance * priceInfo.price;

    return {
      ...token,
      price: priceInfo.price,
      priceChange24h: priceInfo.priceChange24h,
      usdValue,
      logoUrl: logo,
    };
  });

  // Filter out zero balances and sort by USD value (descending)
  let filtered = tokensWithPrices
    .filter(token => token.balance > 0n)
    .sort((a, b) => b.usdValue - a.usdValue);

  // Mock data for development
  if (filtered.length === 0 && process.env.NODE_ENV === 'development') {
    console.log('Using mock data for UI testing');
    filtered = [
      {
        address: '0xETH',
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        balance: 1000000000000000000n,
        formattedBalance: '1.000000',
        price: 2435.50,
        priceChange24h: -2.3,
        usdValue: 2435.50,
        logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
      },
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        balance: 500000000n,
        formattedBalance: '500.000000',
        price: 1.00,
        priceChange24h: 0.1,
        usdValue: 500.00,
        logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
      },
      {
        address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        symbol: 'LINK',
        name: 'ChainLink',
        decimals: 18,
        balance: 5000000000000000n,
        formattedBalance: '0.005000',
        price: 15.00,
        priceChange24h: 3.5,
        usdValue: 0.075,
        logoUrl: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
      }
    ];
  }

  return filtered;
}

export function useTokenBalances(): UseTokenBalancesReturn {
  const { address, isConnected } = useAccount();
  const [smallBalancesExpanded, setSmallBalancesExpanded] = useState(false);

  const { data: tokens = [], isLoading, error, refetch } = useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: () => fetchTokenBalances(address as Address),
    enabled: isConnected && !!address,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes (formerly cacheTime)
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Memoize the filtered arrays to prevent unnecessary recalculations
  const { largeBalances, smallBalances, smallBalancesTotal } = useMemo(() => {
    const large = tokens.filter(token => token.usdValue >= SMALL_BALANCE_THRESHOLD);
    const small = tokens.filter(token => token.usdValue < SMALL_BALANCE_THRESHOLD);
    const total = small.reduce((sum, token) => sum + token.usdValue, 0);
    
    return {
      largeBalances: large,
      smallBalances: small,
      smallBalancesTotal: total,
    };
  }, [tokens]);

  return {
    tokens,
    largeBalances,
    smallBalances,
    smallBalancesTotal,
    isLoading,
    error: error as Error | null,
    refetch,
    smallBalancesExpanded,
    setSmallBalancesExpanded,
  };
}