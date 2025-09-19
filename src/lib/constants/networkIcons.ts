// Network icon mappings

export const NETWORK_ICONS: Record<string, string> = {
  ethereum: '/networks/ethereum.png', 
  
};

// Get network icon for a token
export function getNetworkIcon(tokenSymbol: string, tokenAddress?: string): string | null {
  // In the future, check the actual network based on tokenAddress or metadata and retrieve network icons from an appropriate source
  return NETWORK_ICONS.ethereum;
}