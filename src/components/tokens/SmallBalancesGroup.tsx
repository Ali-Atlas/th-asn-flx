import type { SmallBalancesGroupProps, TokenWithPrice } from '@/lib/types/token';

export function SmallBalancesGroup({ 
  tokens, 
  totalValue, 
  isExpanded, 
  onToggle 
}: SmallBalancesGroupProps) {
  return (
    <div className="border-t border-gray-200 mt-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
        aria-label="Toggle small balance tokens"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {tokens.length}
            </span>
          </div>
          <span className="text-gray-700 font-medium">
            {tokens.length} low value tokens
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900">
            ${totalValue.toFixed(2)}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            strokeWidth="2" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-100 max-h-64 overflow-y-auto">          {tokens.map((token) => (
            <div
              key={token.address}
              className="flex items-center justify-between py-3 px-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {token.logoUrl ? (
                    <img 
                      src={token.logoUrl} 
                      alt={`${token.symbol} logo`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs text-gray-600">
                      {token.symbol.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">{token.formattedBalance}</span>
                  <span className="text-xs text-gray-500">{token.symbol}</span>
                </div>
              </div>
              
              <span className="text-sm font-medium text-gray-700">
                ${token.usdValue.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}