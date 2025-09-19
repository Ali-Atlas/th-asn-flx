import type { SmallBalancesGroupProps } from '@/lib/types/token';
import { formatUsdValue } from '@/lib/utils/format';
import { getNetworkIcon } from '@/lib/constants/networkIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

export function SmallBalancesGroup({
  tokens,
  totalValue,
  isExpanded,
  onToggle
}: SmallBalancesGroupProps) {
  return (
    <>
      {/* Small balances row - styled EXACTLY like TokenRow */}
      <div className="flex items-center px-6 py-3.5 bg-row rounded-lg mb-2 mx-2">
        <button
          onClick={onToggle}
          className="w-full flex items-center"
        >
          {/* Left: Icon and text */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faCoins} style={{ color: '#6B7280', fontSize: '24px' }} />
            </div>
            <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">
              {tokens.length} low value tokens
            </span>
          </div>

          {/* Center: Empty for alignment */}
          <div className="flex-1"></div>

          {/* Right: Total value with arrow */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <span className="text-lg font-bold text-gray-900">
              {formatUsdValue(totalValue)}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Expanded tokens */}
      {isExpanded && (
        <>
          {tokens.map((token) => (
            <div
              key={token.address}
              className="flex items-center px-6 py-3.5 bg-white rounded-lg mb-2 mx-2"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 relative">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {token.logoUrl ? (
                      <img
                        src={token.logoUrl}
                        alt={`${token.symbol} logo`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        {token.symbol.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  {/* Network badge for expanded items too */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-white">
                    <img src={getNetworkIcon(token.symbol, token.address)} alt="Ethereum" className="w-full h-full" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">{token.formattedBalance}</span>
                  <span className="text-base uppercase text-muted-custom">{token.symbol}</span>
                </div>
              </div>
              
              {/* Center: empty for alignment */}
              <div className="flex-1"></div>
              
              {/* Right: USD Value */}
              <div className="flex-1 text-right">
                <span className="text-lg font-bold text-gray-900">
                  {formatUsdValue(token.usdValue)}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}