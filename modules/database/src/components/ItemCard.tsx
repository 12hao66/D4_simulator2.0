import React from 'react';
import { UniqueEquipment, LegendaryPower, Affix, Skill, Amulet, CraftingMaterial, Rune, Gem } from '../types';

interface ItemCardProps {
  item: UniqueEquipment | LegendaryPower | Affix | Skill | Amulet | CraftingMaterial | Rune | Gem;
  onClick: () => void;
}

const getSlotLabel = (slot: string): string => {
  const slotMap: Record<string, string> = {
    helmet: '头盔',
    chest: '胸甲',
    gloves: '手套',
    pants: '裤子',
    boots: '靴子',
    amulet: '护符',
    ring1: '戒指',
    ring2: '戒指',
    weapon1: '武器',
    weapon2: '副手',
  };
  return slotMap[slot] || slot;
};

const getClassLabel = (charClass: string): string => {
  const classMap: Record<string, string> = {
    barbarian: '野蛮人',
    necromancer: '死灵法师',
    sorc: '法师',
    druid: '德鲁伊',
    rogue: '游侠',
    spiritborn: '灵巫',
    paladin: '圣骑士',
    all: '全职业'
  };
  return classMap[charClass] || charClass;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  // 获取边框颜色类
  const getBorderColorClass = (): string => {
    if ('affixes' in item && 'uniqueEffects' in item) {
      const unique = item as UniqueEquipment;
      const isMythic = unique.itemType === 'mythic';
      return isMythic ? 'border-purple-500/30 hover:border-purple-500' : 'border-d4-gold/30 hover:border-d4-gold';
    }
    return 'border-d4-border hover:border-d4-border-light';
  };

  const renderContent = () => {
    if ('affixes' in item && 'uniqueEffects' in item) {
      const unique = item as UniqueEquipment;
      const isMythic = unique.itemType === 'mythic';
      const nameColorClass = isMythic ? 'text-purple-400' : 'text-d4-gold';
      const effectColorClass = isMythic ? 'text-purple-300' : 'text-d4-gold';
      
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={unique.icon} 
                alt={unique.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-3xl hidden">{isMythic ? '🌟' : '💎'}</span>
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${nameColorClass}`}>{unique.name}</h3>
              <p className="text-d4-text-secondary text-sm">
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
            <div className="space-y-2 mb-4">
              <div className="text-d4-text font-semibold pb-2 border-b border-d4-border">
                {unique.affixes[0].value} {unique.affixes[0].name}
              </div>
              {unique.affixes.slice(1).map((affix) => (
                <div key={affix.id} className="flex items-center gap-2 text-sm">
                  <span className={`${effectColorClass} text-xs`}>◇</span>
                  <span className="text-d4-text">
                    {affix.value > 0 ? '+' : ''}{affix.value}{affix.unit} {affix.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {unique.uniqueEffects.length > 0 && (
            <div className="space-y-3 mt-3">
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
            <p className="text-d4-text text-xs mt-4 border-t border-d4-border pt-3">
              {unique.description}
            </p>
          )}
        </div>
      );
    }

    // 符文类型标签
    if ('nameEn' in item && 'category' in item && 'obtainedFrom' in item) {
      const rune = item as Rune;
      const typeLabel = rune.type === 'legendary' ? '传奇符文' : '仪祭符文';
      const categoryLabel = rune.category === 'Invocation' ? '祈告符文' : '仪祭符文';
      
      // 传奇符文名字用传奇色（金色）
      const nameColorClass = 'text-d4-gold';
      // 祈告符文效果用紫色，仪祭符文效果用金色
      const effectColorClass = rune.category === 'Invocation' ? 'text-purple-400' : 'text-d4-gold';
      
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={rune.icon} 
                  alt={rune.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="text-2xl hidden">🔤</span>
              </div>
              <div>
                <h3 className={`text-lg font-bold ${nameColorClass}`}>
                  {rune.name} <span className="text-d4-gold/80 font-normal">{rune.nameEn}</span>
                </h3>
                <p className="text-d4-text-secondary text-sm">{typeLabel}</p>
              </div>
            </div>
            <span className="bg-d4-input px-2 py-1 rounded text-xs text-d4-text-secondary">
              {categoryLabel}
            </span>
          </div>
          
          {/* 获得方式 */}
          <div className="flex items-start gap-2 text-sm mb-3">
            <span className="text-d4-gold text-xs mt-1">◇</span>
            <span className="text-d4-text">
              <span className="text-d4-text-secondary">获得:</span> {rune.obtainedFrom}
            </span>
          </div>
          
          {/* 效果列表 */}
          {rune.effects && rune.effects.length > 0 && (
            <div className="space-y-2 mb-4">
              {rune.effects.map((effect, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-400 text-xs mt-1">✦</span>
                  <span className={effectColorClass}>{effect}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* 符文之语说明 */}
          {rune.runeWordDesc && (
            <div className="pt-3 border-t border-d4-border">
              <p className="text-d4-text-secondary text-xs">{rune.runeWordDesc}</p>
            </div>
          )}
        </div>
      );
    }

    // 护身符类型判断（必须在威能判断之前，因为两者都有type和description属性）
    if ('type' in item && 'applicableClasses' in item && 'flavorText' in item) {
      const amulet = item as Amulet;
      const typeLabel = amulet.type === 'talisman' ? '神符' : '封印';
      
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-purple-500/50" onClick={onClick}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                {amulet.icon && amulet.icon.startsWith('./images/') ? (
                  <img 
                    src={amulet.icon} 
                    alt={amulet.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      img.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <span className={`text-2xl ${amulet.icon && amulet.icon.startsWith('./images/') ? 'hidden' : ''}`}>📿</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-400">{amulet.name}</h3>
                <p className="text-d4-text-secondary text-sm">{typeLabel} · {amulet.applicableClasses.join(', ')}</p>
              </div>
            </div>
            <span className="bg-d4-input px-2 py-1 rounded text-xs text-d4-text-secondary">
              需要等级 {amulet.level}
            </span>
          </div>
          
          {/* 效果描述 */}
          {amulet.description && (
            <div className="flex items-start gap-2 text-sm mb-4">
              <span className="text-purple-400 text-xs mt-1">◇</span>
              <span className="text-purple-300">{amulet.description}</span>
            </div>
          )}
          
          {/* 背景故事 */}
          {amulet.flavorText && (
            <div className="pt-3 border-t border-d4-border">
              <p className="text-d4-text-secondary text-xs italic">{amulet.flavorText}</p>
            </div>
          )}
        </div>
      );
    }

    if ('type' in item && 'description' in item && 'icon' in item) {
      const power = item as LegendaryPower;
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-4xl">{power.icon}</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-d4-gold">{power.name}</h3>
              <p className="text-d4-text-secondary text-sm">{power.type}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-d4-gold text-xs mt-0.5">◇</span>
            <span className="text-d4-text">{power.description}</span>
          </div>
        </div>
      );
    }

    if ('weaponEffect' in item && 'armorEffect' in item && 'jewelryEffect' in item) {
      const gem = item as Gem;
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={gem.icon} 
                alt={gem.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-3xl hidden">💎</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-d4-gold">{gem.name}</h3>
              <p className="text-d4-text-secondary text-sm">宝石</p>
            </div>
          </div>
          
          {gem.weaponEffect && (
            <div className="flex items-start gap-2 text-sm mb-2">
              <span className="text-d4-gold text-xs mt-1">◇</span>
              <span className="text-d4-text">
                <span className="text-d4-text-secondary">武器:</span> {gem.weaponEffect}
              </span>
            </div>
          )}
          
          {gem.armorEffect && (
            <div className="flex items-start gap-2 text-sm mb-2">
              <span className="text-d4-gold text-xs mt-1">◇</span>
              <span className="text-d4-text">
                <span className="text-d4-text-secondary">防具:</span> {gem.armorEffect}
              </span>
            </div>
          )}
          
          {gem.jewelryEffect && (
            <div className="flex items-start gap-2 text-sm mb-2">
              <span className="text-d4-gold text-xs mt-1">◇</span>
              <span className="text-d4-text">
                <span className="text-d4-text-secondary">首饰:</span> {gem.jewelryEffect}
              </span>
            </div>
          )}
          
          {gem.cubeEffect && (
            <div className="flex items-start gap-2 text-sm mb-3 pt-3 border-t border-d4-border">
              <span className="text-amber-400 text-xs mt-1">✦</span>
              <span className="text-d4-text">{gem.cubeEffect}</span>
            </div>
          )}
          
          {gem.requiredLevel && (
            <p className="text-d4-text-secondary text-xs">需要等级: {gem.requiredLevel}</p>
          )}
        </div>
      );
    }

    if ('category' in item && 'minValue' in item) {
      const affix = item as Affix;
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-4xl">📊</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-d4-gold">{affix.name}</h3>
              <p className="text-d4-text-secondary text-sm">{affix.category}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-d4-gold text-xs mt-0.5">◇</span>
            <span className="text-d4-text">{affix.description}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="bg-d4-input px-2 py-1 rounded text-xs text-d4-text-secondary">
              {affix.minValue}-{affix.maxValue}{affix.unit}
            </span>
          </div>
        </div>
      );
    }

    if ('characterClass' in item && 'skillTree' in item && 'category' in item) {
      const skill = item as unknown as Skill;
      return (
        <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-4xl">{skill.icon}</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-d4-gold">{skill.name}</h3>
              <p className="text-d4-text-secondary text-sm">{getClassLabel(skill.characterClass)} · {skill.skillTree}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-d4-gold text-xs mt-0.5">◇</span>
            <span className="text-d4-text">{skill.description}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4 cursor-pointer transition-all hover:border-d4-gold/50" onClick={onClick}>
        <div className="flex items-start gap-3">
          <span className="text-4xl">{(item as any).icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-d4-gold">{(item as any).name}</h3>
            {(item as any).description && (
              <p className="text-d4-text-secondary text-sm mt-1">{(item as any).description}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-black border-2 ${getBorderColorClass()} rounded-lg overflow-hidden hover:shadow-lg hover:shadow-d4-gold/5 transition-all`}>
      {renderContent()}
    </div>
  );
};

export default ItemCard;
