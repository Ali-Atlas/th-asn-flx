import type { TokenWithPrice } from '@/lib/types/token';
import { formatUsdValue, formatPrice, formatPercentageChange } from '@/lib/utils/format';
import { getNetworkIcon } from '@/lib/constants/networkIcons';

export function TokenRow({ token }: { token: TokenWithPrice }) {
  const priceChangeClass = token.priceChange24h >= 0 ? 'text-positive' : 'text-negative';
  
  const networkIcon = getNetworkIcon(token.symbol, token.address);
  
  return (
    <div className="flex items-center px-6 py-3.5 bg-row rounded-lg mb-2 mx-2">
      {/* Left: Asset/Amount - STACKED VERTICALLY */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 relative">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
            {token.logoUrl ? (
              <img
                src={token.logoUrl}
                alt={`${token.symbol}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-gray-500">
                  {token.symbol.slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          {/* Network badge - positioned at top-right */}
          {networkIcon && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-white">
              <img src={networkIcon} alt="Ethereum" className="w-full h-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold text-gray-900 leading-tight">
            {token.formattedBalance}
          </span>
          <span className="text-base uppercase leading-tight text-muted-custom">
            {token.symbol}
          </span>
        </div>
      </div>

      {/* Center: Price with percentage below - LEFT ALIGNED */}
      <div className="flex-1 flex flex-col items-start pl-8">
        <div className="text-lg font-medium text-gray-900">
          {formatPrice(token.price)}
        </div>
        <div className={`text-lg font-semibold ${priceChangeClass}`}>
          {formatPercentageChange(token.priceChange24h)}
        </div>
      </div>

      {/* Right: USD Value */}
      <div className="flex-1 text-right">
        <span className="text-lg font-bold text-gray-900">
          {formatUsdValue(token.usdValue)}
        </span>
      </div>
    </div>
  );
}