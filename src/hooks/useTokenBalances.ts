import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { getAllTokenData } from '@/lib/api/rpc';
import { getTokenPrices, getTokenLogos } from '@/lib/api/coingecko';
import { ERC20_ADDRESSES } from '@/lib/constants/tokens';
import type { TokenWithPrice, TokenBalancesState } from '@/lib/types/token';
import type { TokenAddress } from '@/lib/types/coingecko';
import type { Address } from 'viem';

const SMALL_BALANCE_THRESHOLD = 0.10; // $0.10 USD

interface UseTokenBalancesReturn extends TokenBalancesState {
  refetch: () => void;
}

export function useTokenBalances(): UseTokenBalancesReturn {
  const { address, isConnected } = useAccount();
  const [state, setState] = useState<TokenBalancesState>({
    tokens: [],
    largeBalances: [],
    smallBalances: [],
    smallBalancesTotal: 0,
    isLoading: false,
    error: null,
  });

  const fetchTokenData = async () => {
    if (!address || !isConnected) {
      setState(prev => ({ ...prev, tokens: [], largeBalances: [], smallBalances: [] }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const allAddresses: TokenAddress[] = ['0xETH', ...ERC20_ADDRESSES as Address[]];
      
      const [tokenData, priceData, logoData] = await Promise.all([
        getAllTokenData(address as Address),
        getTokenPrices(allAddresses),
        getTokenLogos(allAddresses),
      ]);

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
      const filteredAndSorted = tokensWithPrices
        .filter(token => token.balance > 0n)
        .sort((a, b) => b.usdValue - a.usdValue);
 
      // Separate by threshold
      const large = filteredAndSorted.filter(token => token.usdValue >= SMALL_BALANCE_THRESHOLD);
      const small = filteredAndSorted.filter(token => token.usdValue < SMALL_BALANCE_THRESHOLD);
      const smallTotal = small.reduce((sum, token) => sum + token.usdValue, 0);

      setState({
        tokens: filteredAndSorted,
        largeBalances: large,
        smallBalances: small,
        smallBalancesTotal: smallTotal,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error('Error fetching token data:', err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch token data'),
      }));
    }
  };

  useEffect(() => {
    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000);
    return () => clearInterval(interval);
  }, [address, isConnected]);

  return {
    ...state,
    refetch: fetchTokenData,
  };
}