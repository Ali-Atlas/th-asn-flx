# Token Portfolio Viewer

A production-ready Ethereum token portfolio viewer built with Next.js, TypeScript, and Web3 technologies.

## Features

- 🔗 Wallet connection via RainbowKit (MetaMask, WalletConnect, etc.)
- 💰 Real-time token balance fetching from Ethereum mainnet
- 📊 Live price data from CoinGecko API
- 🔄 Automatic refresh every 30 seconds with manual refresh option
- 📱 Responsive design matching Rabby wallet interface
- 🎨 Small balance aggregation (<$0.10 threshold)
- ⚡ Efficient multicall for batch RPC requests
- 🔒 Production-ready error handling and loading states

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **State Management**: TanStack Query (React Query)
- **RPC**: Custom Ethereum RPC with multicall optimization
- **API**: CoinGecko for price data

## Getting Started

1. Install dependencies:
```bash
npm install