import { TokenRow } from './TokenRow';
import { SmallBalancesGroup } from './SmallBalancesGroup';
import type { TokenWithPrice } from '@/lib/types/token';

interface TokenListProps {
  largeBalances: TokenWithPrice[];
  smallBalances: TokenWithPrice[];
  smallBalancesTotal: number;
  smallBalancesExpanded: boolean;
  onToggleSmallBalances: () => void;
}

export function TokenList({
  largeBalances,
  smallBalances,
  smallBalancesTotal,
  smallBalancesExpanded,
  onToggleSmallBalances,
}: TokenListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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