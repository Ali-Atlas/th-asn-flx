import type { TokenWithPrice } from '@/lib/types/token';
import { formatUsdValue, formatPrice, formatPercentageChange } from '@/lib/utils/format';

interface TokenRowProps {
  token: TokenWithPrice;
}

export function TokenRow({ token }: TokenRowProps) {
  const priceChangeColor = token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Left side: Logo + Token Info */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {token.logoUrl ? (
            <img 
              src={token.logoUrl} 
              alt={`${token.symbol} logo`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-xs font-medium text-gray-600">
              {token.symbol.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{token.formattedBalance}</span>
            <span className="text-sm text-gray-500">{token.symbol}</span>
          </div>
        </div>
      </div>

      {/* Middle: Price */}
      <div className="flex flex-col items-end px-4">
        <span className="font-medium text-gray-900">
          {formatPrice(token.price)}
        </span>
        <span className={`text-sm ${priceChangeColor}`}>
          {formatPercentageChange(token.priceChange24h)}
        </span>
      </div>

      {/* Right side: USD Value */}
      <div className="flex flex-col items-end min-w-[100px]">
        <span className="font-semibold text-gray-900">
          {formatUsdValue(token.usdValue)}
        </span>
      </div>
    </div>
  );
}