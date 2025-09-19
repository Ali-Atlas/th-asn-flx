import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
import { http } from 'wagmi';
import { RPC_URL } from './constants/tokens';

export const config = getDefaultConfig({
  appName: 'Token Portfolio Viewer',
  projectId: 'default', // Use 'default' for testing
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(RPC_URL),
  },
  ssr: true,
});