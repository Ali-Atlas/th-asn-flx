export interface WalletState {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

export type TruncatedAddress = string;