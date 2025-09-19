export class RateLimitError extends Error {
  constructor(message = 'API rate limit exceeded. Please try again later.') {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class RPCError extends Error {
  constructor(message = 'Failed to connect to Ethereum network.') {
    super(message);
    this.name = 'RPCError';
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof RateLimitError) {
    return error.message;
  }
  if (error instanceof RPCError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}