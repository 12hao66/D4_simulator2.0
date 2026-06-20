import type { DatabaseStats } from '../types';

interface StatsPanelProps {
  stats: DatabaseStats;
}

function StatsPanel({ stats }: StatsPanelProps) {
  const statsItems = [
    { label: '暗金装备', value: stats.totalUniqueEquipment, icon: '💎' },
    { label: '威能', value: stats.totalLegendaryPowers, icon: '✨' },
    { label: '词缀', value: stats.totalAffixes, icon: '📊' },
    { label: '技能', value: stats.totalSkills, icon: '⚔️' },
    { label: '护身符', value: stats.totalAmulets, icon: '📿' },
    { label: '制作材料', value: stats.totalCraftingMaterials, icon: '🧪' },
    { label: '符文', value: stats.totalRunes, icon: '🔤' },
    { label: '宝石', value: stats.totalGems, icon: '💠' }
  ];

  return (
    <div className="w-72 bg-d4-card border border-d4-border rounded-lg p-4">
      <h2 className="text-sm font-medium text-d4-text-secondary mb-4">数据统计</h2>
      <div className="space-y-3">
        {statsItems.map(({ label, value, icon }) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-d4-border/50 last:border-0">
            <div className="flex items-center gap-2">
              <span>{icon}</span>
              <span className="text-sm text-d4-text-secondary">{label}</span>
            </div>
            <span className="text-lg font-bold text-d4-gold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsPanel;
