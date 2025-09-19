import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useMemo, useState } from 'react';
import { getAllTokenData } from '@/lib/api/rpc';
import { getTokenPrices, getTokenLogos } from '@/lib/api/coingecko';
import { ERC20_ADDRESSES } from '@/lib/constants/tokens';
import { formatTokenBalance, calculateUsdValue } from '@/lib/utils/format';
import { getAddress } from 'viem';
import type { TokenWithPrice, UseTokenBalancesReturn } from '@/lib/types/token';
import type { TokenAddress } from '@/lib/types/coingecko';
import type { Address } from 'viem';
import { MOCK_TOKENS } from '@/lib/constants/mockData';

const SMALL_BALANCE_THRESHOLD = 0.10; // $0.10 USD

async function fetchTokenBalances(address: Address): Promise<TokenWithPrice[]> {
  const allAddresses: TokenAddress[] = ['0xETH', ...[...ERC20_ADDRESSES] as Address[]];

  // Fetch all data in parallel
  const [tokenData, priceData, logoData] = await Promise.all([
    getAllTokenData(address),
    getTokenPrices(allAddresses),
    getTokenLogos(allAddresses),
  ]);

  // Combine token data with prices using proper formatting
  const tokensWithPrices: TokenWithPrice[] = tokenData.map(token => {
    // Use lowercase for map lookups but keep checksummed addresses for display
    const lookupKey = token.address.toLowerCase();
    const priceInfo = priceData.get(lookupKey) || {
      price: 0,
      priceChange24h: 0,
    };
    
    const logo = logoData.get(lookupKey);
    const usdValue = calculateUsdValue(token.balance, token.decimals, priceInfo.price);
    
    return {
      ...token,
      address: token.address === '0xETH' ? '0xETH' : getAddress(token.address), // Checksum addresses
      formattedBalance: formatTokenBalance(token.balance, token.decimals),
      price: priceInfo.price,
      priceChange24h: priceInfo.priceChange24h,
      usdValue,
      logoUrl: logo,
    };
  });

  // Filter out zero balances and sort by USD value (descending)
  const filtered = tokensWithPrices
    .filter(token => token.balance > BigInt(0))
    .sort((a, b) => b.usdValue - a.usdValue);

  return filtered;
}

export function useTokenBalances(): UseTokenBalancesReturn {
  const { address, isConnected } = useAccount();
  const [smallBalancesExpanded, setSmallBalancesExpanded] = useState(false);

  const { data: tokens = [], isLoading, error, refetch } = useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: () => fetchTokenBalances(address as Address),
    enabled: isConnected && !!address,
    refetchInterval: 30000,
    staleTime: 10000,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry on network errors more than once
      if (error instanceof Error && error.message.includes('network')) {
        return failureCount < 1;
      }
      // Normal retry logic for other errors
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Use mock data ONLY in development when wallet is NOT connected
  const displayTokens = useMemo(() => {
    if (!isConnected && process.env.NODE_ENV === 'development') {
      console.log('Using mock data for UI testing');
      return MOCK_TOKENS;
    }
    return tokens;
  }, [tokens, isConnected]);

  // Memoize the filtered arrays to prevent unnecessary recalculations
  const { largeBalances, smallBalances, smallBalancesTotal, totalPortfolioValue } = useMemo(() => {
    const large = displayTokens.filter(token => token.usdValue >= SMALL_BALANCE_THRESHOLD);
    const small = displayTokens.filter(token => token.usdValue < SMALL_BALANCE_THRESHOLD);
    const smallTotal = small.reduce((sum, token) => sum + token.usdValue, 0);
    const portfolioTotal = displayTokens.reduce((sum, token) => sum + token.usdValue, 0);
    
    return {
      largeBalances: large,
      smallBalances: small,
      smallBalancesTotal: smallTotal,
      totalPortfolioValue: portfolioTotal,
    };
  }, [displayTokens]);

  return {
    tokens: displayTokens,
    largeBalances,
    smallBalances,
    smallBalancesTotal,
    isLoading,
    error: error as Error | null,
    refetch,
    smallBalancesExpanded,
    setSmallBalancesExpanded,
    totalPortfolioValue,
  };
}