import React from 'react';
import type { Affix, AffixRarity, AffixSubcategory } from '../types';

interface AffixCardProps {
  affix: Affix;
  onClick?: () => void;
}

// 词缀稀有度颜色映射
const rarityColors: Record<AffixRarity, { bg: string; border: string; text: string; label: string }> = {
  normal: {
    bg: 'bg-gray-900/80',
    border: 'border-gray-600/30',
    text: 'text-gray-300',
    label: '普通'
  },
  transmute: {
    bg: 'bg-blue-900/40',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    label: '嬗变'
  },
  temper: {
    bg: 'bg-amber-900/40',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    label: '回火'
  }
};

// 子分类名称映射
const subcategoryNames: Record<AffixSubcategory, string> = {
  weapon: '武器',
  offense: '攻击',
  defense: '防御',
  mobility: '机动',
  resource: '资源',
  general: '通用'
};

// 子分类颜色
const subcategoryColors: Record<AffixSubcategory, string> = {
  weapon: 'text-red-400',
  offense: 'text-orange-400',
  defense: 'text-blue-400',
  mobility: 'text-purple-400',
  resource: 'text-cyan-400',
  general: 'text-gray-400'
};

// 解析描述，将特殊中括号内容用蓝色显示
const parseDescription = (description: string): React.ReactNode => {
  const parts = description.split(/(\[.*?\])/g);
  return parts.map((part, index) => {
    if (/^\[.*?\]$/.test(part)) {
      return <span key={index} className="text-blue-400">{part}</span>;
    }
    return part;
  });
};

export const AffixCard: React.FC<AffixCardProps> = ({ affix, onClick }) => {
  const colors = rarityColors[affix.rarity];

  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 rounded border ${colors.bg} ${colors.border} ${colors.text} hover:border-opacity-60 transition-all cursor-pointer`}
    >
      <div className="flex items-start gap-2">
        <span className="text-green-400 mt-0.5">+</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {parseDescription(affix.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

// 词缀分组组件（用于回火分类下的子分组）
interface AffixGroupProps {
  title: string;
  colorClass: string;
  affixes: Affix[];
  onAffixClick?: (affix: Affix) => void;
}

export const AffixGroup: React.FC<AffixGroupProps> = ({ title, colorClass, affixes, onAffixClick }) => {
  return (
    <div className="mb-4">
      <div className={`text-xs font-semibold ${colorClass} mb-2 px-2 py-1 rounded bg-black/30`}>
        {title}
      </div>
      <div className="space-y-1">
        {affixes.map((affix) => (
          <AffixCard
            key={affix.id}
            affix={affix}
            onClick={() => onAffixClick?.(affix)}
          />
        ))}
      </div>
    </div>
  );
};

// 词缀面板组件（三列布局）
interface AffixPanelProps {
  affixes: Affix[];
  onAffixClick?: (affix: Affix) => void;
}

export const AffixPanel: React.FC<AffixPanelProps> = ({ affixes, onAffixClick }) => {
  // 按稀有度分组
  const normalAffixes = affixes.filter(a => a.rarity === 'normal');
  const transmuteAffixes = affixes.filter(a => a.rarity === 'transmute');
  const temperAffixes = affixes.filter(a => a.rarity === 'temper');

  // 回火词缀按子分类分组
  const temperGroups: Record<AffixSubcategory, Affix[]> = {
    weapon: [],
    offense: [],
    defense: [],
    mobility: [],
    resource: [],
    general: []
  };
  
  temperAffixes.forEach(affix => {
    if (temperGroups[affix.subcategory]) {
      temperGroups[affix.subcategory].push(affix);
    }
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 普通词缀 */}
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 overflow-hidden">
        <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700/50">
          <h3 className="text-gray-300 font-semibold">普通</h3>
        </div>
        <div className="p-3 space-y-1">
          {normalAffixes.map((affix) => (
            <AffixCard
              key={affix.id}
              affix={affix}
              onClick={() => onAffixClick?.(affix)}
            />
          ))}
        </div>
      </div>

      {/* 嬗变词缀 */}
      <div className="bg-gray-900/60 rounded-lg border border-blue-500/30 overflow-hidden">
        <div className="bg-blue-900/30 px-4 py-2 border-b border-blue-500/30">
          <h3 className="text-blue-300 font-semibold">嬗变</h3>
        </div>
        <div className="p-3 space-y-1">
          {transmuteAffixes.map((affix) => (
            <AffixCard
              key={affix.id}
              affix={affix}
              onClick={() => onAffixClick?.(affix)}
            />
          ))}
        </div>
      </div>

      {/* 回火词缀 */}
      <div className="bg-gray-900/60 rounded-lg border border-amber-500/30 overflow-hidden">
        <div className="bg-amber-900/30 px-4 py-2 border-b border-amber-500/30">
          <h3 className="text-amber-300 font-semibold">回火</h3>
        </div>
        <div className="p-3">
          {Object.entries(temperGroups)
            .filter(([, items]) => items.length > 0)
            .map(([subcategory, items]) => (
              <AffixGroup
                key={subcategory}
                title={subcategoryNames[subcategory as AffixSubcategory]}
                colorClass={subcategoryColors[subcategory as AffixSubcategory]}
                affixes={items}
                onAffixClick={onAffixClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
