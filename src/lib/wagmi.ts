import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { 
  mainnet, 
  arbitrum, 
  arbitrumSepolia,
} from 'wagmi/chains';

const hyperliquidTestnet = {
  id: 998,
  name: 'Hyperliquid Testnet',
  network: 'hyperliquid-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://api.hyperliquid-testnet.xyz/evm'] },
    public: { http: ['https://api.hyperliquid-testnet.xyz/evm'] },
  },
  blockExplorers: {
    default: { 
      name: 'Explorer', 
      url: 'https://app.hyperliquid-testnet.xyz/explorer' 
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: 'Felix Live Coding',
  projectId: 'demo', 
  chains: [
    arbitrum,        
    arbitrumSepolia, 
    hyperliquidTestnet,
    mainnet,         
  ],
  ssr: true,
});