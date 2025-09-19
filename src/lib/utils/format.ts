/**
 * Truncates an Ethereum address for display
 * @param address - Full Ethereum address
 * @param startChars - Number of characters to show at start (default 6)
 * @param endChars - Number of characters to show at end (default 4)
 * @returns Truncated address like "0x1234...5678"
 */
export const truncateAddress = (
  address: string | undefined,
  startChars = 6,
  endChars = 4
): string => {
  if (!address) return '';
  
  // Validate Ethereum address format
  if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
    console.error('Invalid Ethereum address format:', address);
    return address;
  }
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Validates if a string is a valid Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};