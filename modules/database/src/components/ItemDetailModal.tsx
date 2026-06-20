import React from 'react';
import { UniqueEquipment, LegendaryPower, Affix, Skill, Amulet, CraftingMaterial, Rune, Gem } from '../types';

interface ItemDetailModalProps {
  item: UniqueEquipment | LegendaryPower | Affix | Skill | Amulet | CraftingMaterial | Rune | Gem | null;
  onClose: () => void;
}

const getSlotLabel = (slot: string): string => {
  const slotMap: Record<string, string> = {
    helmet: '头盔',
    chest: '胸甲',
    gloves: '手套',
    pants: '裤子',
    boots: '靴子',
    amulet: '护符',
    ring1: '戒指1',
    ring2: '戒指2',
    weapon1: '主手武器',
    weapon2: '副手武器',
  };
  return slotMap[slot] || slot;
};

const getCharacterClassLabel = (charClass: string): string => {
  const classMap: Record<string, string> = {
    barbarian: '野蛮人',
    necromancer: '死灵法师',
    sorc: '法师',
    druid: '德鲁伊',
    rogue: '游侠',
    spiritborn: '灵巫',
    paladin: '圣骑士',
  };
  return classMap[charClass] || charClass;
};

const getSkillTypeLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    active: '主动',
    passive: '被动',
    ultimate: '终极',
    basic: '基础',
  };
  return typeMap[type] || type;
};

const getCalculationTypeLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    additive: '加法',
    multiplicative: '乘法',
    independent: '独立',
  };
  return typeMap[type] || type;
};

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const renderContent = () => {
    if ('affixes' in item && 'uniqueEffects' in item) {
      const unique = item as UniqueEquipment;
      const isMythic = unique.itemType === 'mythic';
      const nameColorClass = isMythic ? 'text-purple-400' : 'text-d4-gold';
      const effectColorClass = isMythic ? 'text-purple-300' : 'text-d4-gold';
      
      return (
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-d4-input rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={unique.icon} 
                alt={unique.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-4xl hidden">{isMythic ? '🌟' : '💎'}</span>
            </div>
            <div className="flex-1">
              <h2 className={`text-xl font-bold tracking-wide ${nameColorClass}`}>{unique.name}</h2>
              <p className="text-d4-text-secondary text-sm mt-1">
                {isMythic ? '神话暗金' : '暗金'} · 全职业 · {getSlotLabel(unique.slot)}
              </p>
              {unique.dropBoss && (
                <p className="text-d4-text-secondary text-xs mt-1">
                  掉落 Boss：{unique.dropBoss}
                </p>
              )}
            </div>
          </div>
          
          {unique.affixes.length > 0 && (
            <div className="space-y-3 mb-6">
              <div className="text-d4-text text-lg font-semibold">
                {unique.affixes[0].value} {unique.affixes[0].name}
              </div>
              {unique.affixes.slice(1).map((affix) => (
                <div key={affix.id} className="flex items-center gap-2">
                  <span className={effectColorClass}>◇</span>
                  <span className="text-d4-text">
                    {affix.value > 0 ? '+' : ''}{affix.value}{affix.unit} {affix.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {unique.uniqueEffects.length > 0 && (
            <div className="space-y-4 mt-4">
              {unique.uniqueEffects.map((effect) => (
                <div key={effect.id} className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">⭐</span>
                    <span className={effectColorClass}>{effect.description}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {unique.description && (
            <p className="text-d4-text text-sm mt-6 border-t border-d4-border pt-4">
              {unique.description}
            </p>
          )}
        </div>
      );
    }

    if ('type' in item && 'description' in item && 'icon' in item) {
      const power = item as LegendaryPower;
      return (
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{power.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-d4-gold">{power.name}</h2>
              <span className="text-d4-text-secondary text-sm">{power.type}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-d4-gold">◇</span>
            <span className="text-d4-text">{power.description}</span>
          </div>
        </div>
      );
    }

    if ('category' in item && 'minValue' in item) {
      const affix = item as Affix;
      return (
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-d4-gold">{affix.name}</h2>
            <span className="text-d4-text-secondary text-sm">{affix.category}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-d4-gold">◇</span>
            <span className="text-d4-text">{affix.description}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-d4-input p-3 rounded-lg">
              <span className="text-d4-text-secondary text-sm">数值范围</span>
              <p className="text-d4-text font-semibold mt-1">{affix.minValue} - {affix.maxValue}{affix.unit}</p>
            </div>
            <div className="bg-d4-input p-3 rounded-lg">
              <span className="text-d4-text-secondary text-sm">计算类型</span>
              <p className="text-d4-text font-semibold mt-1">{getCalculationTypeLabel(affix.calculationType)}</p>
            </div>
          </div>
          {affix.applicableSlots && affix.applicableSlots.length > 0 && (
            <div>
              <span className="text-d4-text-secondary text-sm">适用部位</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {affix.applicableSlots.map((slot) => (
                  <span key={slot} className="bg-d4-input px-3 py-1 rounded text-d4-text text-sm">
                    {getSlotLabel(slot)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if ('characterClass' in item && 'skillTree' in item && 'category' in item) {
      const skill = item as unknown as Skill;
      return (
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{skill.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-d4-gold">{skill.name}</h2>
              <div className="flex gap-2 mt-1">
                <span className="text-d4-text-secondary text-sm">{getSkillTypeLabel(skill.type)}</span>
                <span className="text-d4-text-secondary text-sm">{getCharacterClassLabel(skill.characterClass)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-d4-gold">◇</span>
            <span className="text-d4-text">{skill.description}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {skill.baseCooldown && (
              <div className="bg-d4-input p-3 rounded-lg">
                <span className="text-d4-text-secondary text-sm">冷却时间</span>
                <p className="text-d4-text font-semibold mt-1">{skill.baseCooldown}秒</p>
              </div>
            )}
            {skill.baseResourceCost && (
              <div className="bg-d4-input p-3 rounded-lg">
                <span className="text-d4-text-secondary text-sm">资源消耗</span>
                <p className="text-d4-text font-semibold mt-1">{skill.baseResourceCost}</p>
              </div>
            )}
            {skill.damageCoefficient && (
              <div className="bg-d4-input p-3 rounded-lg">
                <span className="text-d4-text-secondary text-sm">伤害系数</span>
                <p className="text-d4-text font-semibold mt-1">{skill.damageCoefficient}</p>
              </div>
            )}
          </div>
          {skill.effects && skill.effects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-d4-text mb-3">技能效果</h3>
              <div className="space-y-2">
                {skill.effects.map((effect) => (
                  <div key={effect.id} className="flex gap-2">
                    <span className="text-d4-gold">◇</span>
                    <div>
                      <span className="text-d4-text font-medium">{effect.name}</span>
                      <p className="text-d4-text-secondary text-sm mt-1">{effect.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{(item as any).icon}</span>
          <div>
            <h2 className="text-xl font-bold text-d4-gold">{(item as any).name}</h2>
          </div>
        </div>
        {(item as any).description && (
          <div className="flex gap-2">
            <span className="text-d4-gold">◇</span>
            <span className="text-d4-text">{(item as any).description}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '500px',
          background: 'linear-gradient(135deg, #1a1510 0%, #0d0d0d 100%)',
          border: '1px solid #2a2018',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ItemDetailModal;
