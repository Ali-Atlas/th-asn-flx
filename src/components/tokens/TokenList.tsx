import { TokenRow } from './TokenRow';
import { SmallBalancesGroup } from './SmallBalancesGroup';
import type { TokenListProps } from '@/lib/types/token';

export function TokenList({
  largeBalances,
  smallBalances,
  smallBalancesTotal,
  smallBalancesExpanded,
  onToggleSmallBalances,
}: TokenListProps) {
  return (
    <div className="bg-modal rounded-lg shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 pt-6 pb-3 bg-modal">
        <div className="flex text-base font-medium tracking-wider text-muted-custom">
          <span className="flex-1">ASSET / AMOUNT</span>
          <span className="flex-1 text-left pl-8">PRICE</span>
          <span className="flex-1 text-right">USD VALUE</span>
        </div>
      </div>

      {/* Token Rows */}
      <div className="bg-modal px-2 py-2">
        {largeBalances.map((token) => (
          <TokenRow key={token.address} token={token} />
        ))}
        
        {smallBalances.length > 0 && (
          <SmallBalancesGroup
            tokens={smallBalances}
            totalValue={smallBalancesTotal}
            isExpanded={smallBalancesExpanded}
            onToggle={onToggleSmallBalances}
          />
        )}
      </div>
    </div>
  );
}