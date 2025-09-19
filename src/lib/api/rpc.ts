import { createPublicClient, http, type Address } from 'viem';
import { mainnet } from 'viem/chains';
import { RPC_URL, ERC20_ADDRESSES } from '../constants/tokens';
import type { Token } from '../types/token';
import { RPCError } from '../utils/errors';

// ERC20 ABI - only the functions we need
const ERC20_ABI = [
  {
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Create viem public client
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(RPC_URL),
});

/**
 * Fetch native ETH balance for an address
 */
export async function getETHBalance(address: Address): Promise<bigint> {
  try {
    return await publicClient.getBalance({ address });
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    throw new RPCError('Failed to fetch ETH balance');
  }
}

/**
 * Fetch all token metadata (name, symbol, decimals) using multicall
 */
export async function getTokenMetadata(tokenAddresses: Address[]): Promise<Map<Address, Omit<Token, 'balance' | 'formattedBalance' | 'price' | 'usdValue' | 'priceChange24h' | 'logoUrl'>>> {
  const calls = tokenAddresses.flatMap((address) => [
    {
      address,
      abi: ERC20_ABI,
      functionName: 'name',
    },
    {
      address,
      abi: ERC20_ABI,
      functionName: 'symbol',
    },
    {
      address,
      abi: ERC20_ABI,
      functionName: 'decimals',
    },
  ] as const);

  try {
    const results = await publicClient.multicall({ contracts: calls });
    
    const metadata = new Map();
    for (let i = 0; i < tokenAddresses.length; i++) {
      const baseIndex = i * 3;
      const name = results[baseIndex]?.result as string || 'Unknown';
      const symbol = results[baseIndex + 1]?.result as string || 'UNKNOWN';
      const decimals = results[baseIndex + 2]?.result as number || 18;
      
      metadata.set(tokenAddresses[i], {
        address: tokenAddresses[i],
        name,
        symbol,
        decimals,
      });
    }
    
    return metadata;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw new RPCError('Failed to fetch token metadata');
  }
}

/**
 * Fetch all token balances for a user address using multicall
 */
export async function getTokenBalances(
  userAddress: Address,
  tokenAddresses: Address[]
): Promise<Map<Address, bigint>> {
  const calls = tokenAddresses.map((address) => ({
    address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [userAddress],
  } as const));

  try {
    const results = await publicClient.multicall({ contracts: calls });
    
    const balances = new Map();
    for (let i = 0; i < tokenAddresses.length; i++) {
      const balance = results[i]?.result as bigint || 0n;
      balances.set(tokenAddresses[i], balance);
    }
    
    return balances;
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw new RPCError('Failed to fetch token balances');
  }
}

/**
 * Fetch all token data including ETH
 */
export async function getAllTokenData(userAddress: Address): Promise<Token[]> {
  try {
    // Fetch all data in parallel
    const [ethBalance, tokenMetadata, tokenBalances] = await Promise.all([
      getETHBalance(userAddress),
      getTokenMetadata(ERC20_ADDRESSES as unknown as Address[]),
      getTokenBalances(userAddress, ERC20_ADDRESSES as unknown as Address[]),
    ]);

    const tokens: Token[] = [];
    
    // Add ETH
    tokens.push({
      address: '0xETH', // Special identifier for ETH
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: ethBalance,
      formattedBalance: (Number(ethBalance) / 10 ** 18).toFixed(6),
    });

    // Add ERC20 tokens
    for (const [address, metadata] of tokenMetadata) {
      const balance = tokenBalances.get(address) || 0n;
      
      tokens.push({
        ...metadata,
        balance,
        formattedBalance: (Number(balance) / 10 ** metadata.decimals).toFixed(6),
      });
    }

    return tokens;
  } catch (error) {
    console.error('Error fetching all token data:', error);
    throw new RPCError('Failed to fetch token data. Please check your connection.');
  }
}