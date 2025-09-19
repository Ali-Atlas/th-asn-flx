# Token Portfolio Viewer

A production-ready Ethereum token portfolio viewer built with Next.js, TypeScript, and Web3 technologies.

## Features

- Wallet connection via RainbowKit (MetaMask, WalletConnect, etc.)
- Real-time token balance fetching from Ethereum mainnet
- Live price data from CoinGecko API
- Automatic refresh every 30 seconds with manual refresh option
- Responsive design matching Rabby wallet interface
- Small balance aggregation (<$0.10 threshold)
- Efficient multicall for batch RPC requests
- Production-ready error handling and loading states

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Web3: wagmi, viem, RainbowKit
- State Management: TanStack Query (React Query)
- RPC: Custom Ethereum RPC with multicall optimization
- API: CoinGecko for price data

## Getting Started

1. Install dependencies:
npm install

2. Run development server:
npm run dev

3. Open http://localhost:3000

## Architecture Decisions

- TanStack Query: For server state management with caching and background refetching
- viem: Modern, type-safe Ethereum interaction library
- Multicall: Batch RPC requests for efficiency
- Contract address mapping: CoinGecko IDs mapped by contract addresses, not symbols
- BigInt preservation: Maintains precision until final display

## Production Enhancements

While this implementation meets the assignment requirements, a production system would include:

### Dynamic Token Resolution
- Dynamic CoinGecko Mapping: Instead of hardcoded address-to-ID mappings, use CoinGecko's /coins/{platform}/contract/{address} endpoint for real-time resolution
- Automatic Token Discovery: Implement event log scanning to automatically detect new tokens in user wallets
- Fallback Strategies: Chain of resolution: cache, contract endpoint, on-chain symbol, manual mapping

### Multi-Chain Architecture
- Extensible chain configuration supporting Ethereum, Polygon, Arbitrum, etc.
- Dynamic RPC client creation based on chain configuration
- Cross-chain balance aggregation

### Scalability Improvements
- Token Registry: Maintain a self-updating registry of known tokens with metadata
- Batch Processing: Queue and batch API requests across multiple chains
- Indexer Integration: Use The Graph or similar for efficient historical data
- WebSocket Connections: Real-time price updates instead of polling

### Infrastructure Changes
- Environment-Driven Config: All chains, RPCs, and tokens configured via environment variables
- Service Layer Abstraction: Separate interfaces for price providers (CoinGecko, DeFiLlama, etc.)
- CDN for Token Assets: Cache token logos and metadata at edge
- Rate Limit Management: Implement request queuing and throttling for API limits
- Fallback RPC Providers: Multiple RPC endpoints with automatic failover

## Project Structure

src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── tokens/      # Token list components
│   ├── wallet/      # Wallet connection
│   └── ui/          # Shared UI components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and API clients
│   ├── api/         # RPC and CoinGecko clients
│   ├── constants/   # Token addresses, mock data
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Formatting, caching utilities

## Performance Optimizations

- Multicall for batch token fetching
- 30-second cache for price data
- Memoized calculations for expensive operations
- Skeleton loaders for perceived performance
- Lazy loading for token images

## Testing

Currently using mock data for development when no tokens are present. To test with real data, connect a wallet with token balances on Ethereum mainnet.

## License

MIT