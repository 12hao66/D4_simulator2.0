import React from 'react';
import type { LegendaryPower } from '../types';

interface PowerCardProps {
  power: LegendaryPower;
  onClick?: () => void;
}

// 职业颜色映射
const classColors: Record<string, string> = {
  barbarian: 'text-red-400',
  necromancer: 'text-green-400',
  sorc: 'text-blue-400',
  druid: 'text-orange-400',
  rogue: 'text-purple-400',
  spiritborn: 'text-cyan-400',
  paladin: 'text-yellow-400',
  all: 'text-gray-400',
};

// 职业中文名称映射
const classNames: Record<string, string> = {
  barbarian: '野蛮人',
  necromancer: '死灵法师',
  sorc: '法师',
  druid: '德鲁伊',
  rogue: '游侠',
  spiritborn: '灵巫',
  paladin: '圣骑士',
  all: '全职业',
};

// 威能类型颜色
const powerTypeColors: Record<string, string> = {
  resource: 'text-blue-400',
  offense: 'text-red-400',
  defense: 'text-green-400',
  utility: 'text-yellow-400',
  mobility: 'text-purple-400',
};

// 威能类型中文名称
const powerTypeNames: Record<string, string> = {
  resource: '资源',
  offense: '攻击',
  defense: '防御',
  utility: '通用',
  mobility: '移动',
};

// 解析描述，将特殊中括号内容（包括百分号）用蓝色显示
const parseDescription = (description: string): React.ReactNode => {
  const parts = description.split(/(\[.*?\]%?)/g);
  return parts.map((part, index) => {
    if (/^\[.*?\]%?$/.test(part)) {
      return <span key={index} className="text-blue-400">{part}</span>;
    }
    return part;
  });
};

export const PowerCard: React.FC<PowerCardProps> = ({ power, onClick }) => {
  const classColor = classColors[power.type] || classColors.all;
  const className = classNames[power.type] || '未知';
  const powerType = power.powerType || 'utility';
  const powerTypeName = powerTypeNames[powerType] || '通用';
  const powerTypeColor = powerTypeColors[powerType] || powerTypeColors.utility;

  return (
    <div
      onClick={onClick}
      className="relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, #1a1510 0%, #0a0a0a 100%)',
        border: '2px solid rgba(201, 162, 39, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C9A227';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 162, 39, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.3)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="p-4 space-y-3">
        {/* 头部：图标 + 内容 */}
        <div className="flex items-start gap-3">
          {/* 圆形图标 */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1a4d1a 0%, #0d2d0d 100%)',
              border: '2px solid rgba(34, 197, 94, 0.5)',
            }}
          >
            <span className="text-2xl">⚡</span>
          </div>
          
          {/* 内容区域 */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* 威能名称 */}
            <h3 className="text-xl font-bold text-d4-gold truncate">
              {power.name}
            </h3>
            
            {/* 职业和威能类型 */}
            <div className="flex items-center gap-2 text-sm">
              <span className={classColor}>{className}</span>
              <span className="text-gray-500">·</span>
              <span className={powerTypeColor}>{powerTypeName}</span>
            </div>
            
            {/* 适用装备 */}
            {power.applicableSlots && power.applicableSlots.length > 0 && (
              <div className="text-sm text-gray-400">
                {power.applicableSlots!.map((slot, index) => (
                  <span key={index}>
                    {slot === '护符' ? `${slot}[+50%]` : slot === '双手武器' ? `${slot}[+100%]` : slot}
                    {index < power.applicableSlots!.length - 1 && (
                      <span className="text-gray-600">, </span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-d4-gold/20"></div>

        {/* 威能描述 */}
        <div className="text-sm text-d4-gold leading-relaxed">
          <span className="text-amber-500 mr-1">★</span>
          {parseDescription(power.description)}
        </div>

      </div>
    </div>
  );
};
