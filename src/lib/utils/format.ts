import { formatUnits, getAddress } from 'viem';

/**
 * Format token balance with proper precision
 * @param balance - Raw balance as bigint
 * @param decimals - Token decimals
 * @param displayDecimals - Number of decimals to display
 */
export const formatTokenBalance = (
  balance: bigint,
  decimals: number,
  displayDecimals = 6
): string => {
  const formatted = formatUnits(balance, decimals);
  const num = parseFloat(formatted);
  
  // Handle zero
  if (num === 0) return '0';
  
  // For very small values, use exponential notation
  if (num > 0 && num < 0.000001) {
    return num.toExponential(2);
  }
  
  // For small values, show more decimals
  if (num < 1) {
    return num.toFixed(displayDecimals);
  }
  
  // For larger values, show fewer decimals
  if (num >= 1000) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
};

/**
 * Format USD value with proper precision for display
 */
export const formatUsdValue = (value: number): string => {
  if (value === 0) return '$0.00';
  
  if (value < 0.01) {
    return `<$0.01`;
  }
  
  if (value < 1) {
    return `$${value.toFixed(4)}`;
  }
  
  if (value < 100) {
    return `$${value.toFixed(2)}`;
  }
  
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format price with appropriate decimals
 */
export const formatPrice = (price: number): string => {
  if (price === 0) return '$0.00';
  
  if (price < 0.01) {
    return `$${price.toExponential(2)}`;
  }
  
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  
  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Calculate USD value maintaining precision
 */
export const calculateUsdValue = (
  balance: bigint,
  decimals: number,
  price: number
): number => {
  if (balance === 0n || price === 0) return 0;
  
  // Use viem's formatUnits to maintain precision
  const formattedBalance = formatUnits(balance, decimals);
  return parseFloat(formattedBalance) * price;
};

/**
 * Truncates an Ethereum address for display
 * @param address - Full Ethereum address
 * @param startChars - Number of characters to show at start (default 6)
 * @param endChars - Number of characters to show at end (default 4)
 */
export const truncateAddress = (
  address: string | undefined,
  startChars = 6,
  endChars = 4
): string => {
  if (!address) return '';
  
  try {
    // Get checksummed address
    const checksummed = getAddress(address);
    return `${checksummed.slice(0, startChars)}...${checksummed.slice(-endChars)}`;
  } catch {
    // If invalid address, return as is
    return address;
  }
};

/**
 * Validates if a string is a valid Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  try {
    getAddress(address);
    return true;
  } catch {
    return false;
  }
};

/**
 * Format percentage change
 */
export const formatPercentageChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};