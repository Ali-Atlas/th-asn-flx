import { TokenRow } from './TokenRow';
import { SmallBalancesGroup } from './SmallBalancesGroup';
import type { TokenListProps } from '@/lib/types/token';

export function TokenList({
  largeBalances,
  smallBalances,
  smallBalancesTotal,
  smallBalancesExpanded,
  onToggleSmallBalances,
  totalPortfolioValue,
}: TokenListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Add total portfolio value header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Total Portfolio Value</span>
          <span className="text-2xl font-bold text-gray-900">
            ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between text-sm text-gray-500 font-medium uppercase tracking-wider">
          <span className="flex-1">Asset / Amount</span>
          <span className="flex-1 text-center">Price</span>
          <span className="flex-1 text-right">USD Value</span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {largeBalances.map((token) => (
          <TokenRow key={token.address} token={token} />
        ))}
      </div>
      
      {smallBalances.length > 0 && (
        <SmallBalancesGroup
          tokens={smallBalances}
          totalValue={smallBalancesTotal}
          isExpanded={smallBalancesExpanded}
          onToggle={onToggleSmallBalances}
        />
      )}
    </div>
  );
}