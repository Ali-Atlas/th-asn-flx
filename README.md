```markdown
# Token Portfolio Viewer

A production-ready Ethereum token portfolio viewer built with Next.js, TypeScript, and Web3 technologies for a DeFi technical interview.

## Features Implemented

### Core Functionality
- **Wallet Connection**: RainbowKit integration supporting MetaMask, WalletConnect, and other popular wallets
- **Token Balance Fetching**: Real-time balance retrieval for native ETH + 8 specified ERC-20 tokens
- **Live Price Data**: CoinGecko API integration with 24-hour price change percentages
- **Smart Aggregation**: Automatic grouping of small balances (<$0.10 USD) with expand/collapse functionality
- **Efficient RPC Calls**: Multicall optimization for batching all token queries into single RPC request
- **Auto-refresh**: 30-second interval updates with manual refresh button

### UI/UX Implementation
- **Design Matching**: recreation of Rabby wallet interface
- **Responsive Layout**: Mobile-friendly design with proper breakpoints
- **Loading States**: Skeleton loaders during data fetching
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Empty States**: Clear messaging when no tokens present
- **Mock Data**: Development mode with sample tokens for UI testing
- **Network Badges**: Ethereum network indicator on token icons
- **Font Awesome Icons**: Professional icon system for UI elements

### Technical Implementation

#### State Management
- **TanStack Query (React Query)**: Server state management with:
  - Intelligent caching (30s for prices, 5min for logos)
  - Background refetching
  - Optimistic updates
  - Retry logic with exponential backoff
  - Stale-while-revalidate pattern

#### Web3 Integration
- **wagmi + viem**: Type-safe Ethereum interactions
- **Multicall Pattern**: Single RPC request for all token data
- **BigInt Preservation**: Maintains precision throughout calculations
- **Checksum Addresses**: Proper address validation with getAddress()

#### API Integration
- **CoinGecko Mapping**: Smart contract-to-ID resolution for all 8 required tokens
- **Rate Limit Protection**: Request caching and throttling
- **Error Recovery**: Graceful fallbacks for API failures
- **Parallel Data Fetching**: Promise.all for concurrent API calls

#### Performance Optimizations
- **Memoization**: Expensive calculations cached with useMemo
- **Lazy Loading**: Token images loaded on-demand
- **Debounced Refresh**: Prevents rapid API calls
- **Efficient Re-renders**: Proper React key usage and component splitting
- **CSS Variables**: Centralized design tokens for consistent theming

#### Code Quality
- **TypeScript Throughout**: Full type safety with strict mode
- **Custom Error Classes**: Specific error handling for RPC/API failures
- **Constants Separation**: Organized configuration files
- **Clean Architecture**: Clear separation of concerns (hooks/api/components/utils)
- **Formatting Utilities**: Consistent number/currency formatting
- **Custom Hooks**: Reusable logic extraction (useTokenBalances)

## Tech Stack
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Web3**: wagmi, viem, RainbowKit
- **State Management**: TanStack Query (React Query)
- **RPC**: Custom Ethereum RPC with multicall optimization
- **API**: CoinGecko for price data
- **Icons**: Font Awesome React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:3000

## Project Structure
```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── tokens/           # Token list components
│   │   ├── TokenList.tsx
│   │   ├── TokenRow.tsx
│   │   └── SmallBalancesGroup.tsx
│   ├── wallet/           # Wallet connection
│   │   └── ConnectWallet.tsx
│   └── ui/              # Shared UI components
│       └── SkeletonLoader.tsx
├── hooks/               # Custom React hooks
│   └── useTokenBalances.ts
├── lib/                 # Utilities and API clients
│   ├── api/            # RPC and CoinGecko clients
│   │   ├── rpc.ts
│   │   └── coingecko.ts
│   ├── constants/      # Token addresses, mock data
│   │   ├── tokens.ts
│   │   ├── mockData.ts
│   │   └── networkIcons.ts
│   ├── types/          # TypeScript type definitions
│   │   ├── token.ts
│   │   ├── wallet.ts
│   │   └── coingecko.ts
│   └── utils/          # Formatting, caching utilities
│       ├── format.ts
│       ├── cache.ts
│       └── errors.ts
└── styles/
    └── globals.css     # CSS variables and global styles
```

## Architecture Decisions

### Why These Choices
- **TanStack Query**: Handles server state complexities like caching, synchronization, and background updates out of the box
- **viem over ethers.js**: Modern, lighter, better TypeScript support, and tree-shakeable
- **Multicall**: Reduces RPC calls from 9+ to just 1 for token data
- **Contract Address Mapping**: CoinGecko requires IDs not symbols - pre-mapped all 8 tokens
- **BigInt Throughout**: Prevents precision loss in financial calculations

### What Could Be More Dynamic

While this implementation meets all assignment requirements, in a production environment I would add:

**Dynamic Token Resolution**:
- Use CoinGecko's contract endpoint instead of hardcoded mappings
- Implement token list standards (Uniswap Token Lists)
- Auto-detect new tokens via event scanning

**Multi-Chain Support**:
- Abstract chain configurations
- Dynamic RPC client creation
- Cross-chain balance aggregation

**Advanced Caching**:
- IndexedDB for persistent cache
- Service Worker for offline support
- WebSocket for real-time updates

**Error Recovery**:
- Multiple RPC fallbacks
- Alternative price providers (DeFiLlama, 1inch)
- Retry queues with exponential backoff

## Testing
The app includes mock data for development. To test with real data, connect a wallet with token balances on Ethereum mainnet.

## Notes for Reviewers
- All 8 required ERC-20 addresses are monitored
- Native ETH balance is included
- Zero balances are filtered out
- Tokens sorted by USD value
- Small balances properly aggregated with expand/collapse
- Design closely matches Rabby wallet interface
- Error handling implemented for all API/RPC calls
- Code is production-ready with proper TypeScript types throughout

## License
MIT
```