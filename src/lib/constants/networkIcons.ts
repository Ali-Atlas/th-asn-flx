// Network icon mappings

export const NETWORK_ICONS: Record<string, string> = {
  ethereum: '/networks/ethereum.png', 
  
};

export function getNetworkIcon(): string | null {
  // In the future, check the actual network based on tokenAddress or metadata
  return NETWORK_ICONS.ethereum;
}