import { useEquipmentStore } from '../store/equipmentStore'
import type { EquipmentSlot } from '../types/equipment'
import { getDatabaseImageUrl } from '../config/appConfig'

interface EquipmentTooltipProps {
  slot: EquipmentSlot
  position: { x: number; y: number }
}

// 解析描述中的数值（[]和%染成蓝色）
const parsePowerDescription = (description: string): JSX.Element[] => {
  const parts = description.split(/(\[.*?\]|%)/g)
  return parts.map((part, index) => {
    if (part.match(/^\[.*?\]$/) || part === '%') {
      return <span key={index} className="text-blue-400">{part}</span>
    }
    return <span key={index}>{part}</span>
  })
}

// 稀有度配置（包含神话暗金）
const rarityConfig: Record<string, { color: string; border: string; bg: string; effectColor: string }> = {
  legendary: { 
    color: 'text-[#ff8000]', 
    border: 'border-[#ff8000]', 
    bg: 'bg-gradient-to-b from-[#2a1a0a] to-[#1a0f05]',
    effectColor: 'text-yellow-600'
  },
  unique: { 
    color: 'text-[#e6cc80]', 
    border: 'border-[#e6cc80]', 
    bg: 'bg-gradient-to-b from-[#2a2210] to-[#1a1608]',
    effectColor: 'text-yellow-600'
  },
  mythic: { 
    color: 'text-purple-400', 
    border: 'border-purple-500', 
    bg: 'bg-gradient-to-b from-[#1a0a2a] to-[#0f051a]',
    effectColor: 'text-purple-400'
  },
  rare: { 
    color: 'text-[#0070dd]', 
    border: 'border-[#0070dd]', 
    bg: 'bg-gradient-to-b from-[#0a1a2a] to-[#050f15]',
    effectColor: 'text-blue-400'
  },
  magic: { 
    color: 'text-[#1eff00]', 
    border: 'border-[#1eff00]', 
    bg: 'bg-gradient-to-b from-[#0a2a0a] to-[#051505]',
    effectColor: 'text-green-400'
  },
  common: { 
    color: 'text-gray-400', 
    border: 'border-gray-600', 
    bg: 'bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]',
    effectColor: 'text-gray-400'
  }
}

const slotNames: Record<string, string> = {
  helmet: '头盔', chest: '胸甲', gloves: '手套', pants: '裤子', boots: '靴子',
  weapon1: '武器', weapon2: '副手', weapon3: '武器', weapon4: '副手',
  amulet: '护符', ring1: '戒指', ring2: '戒指'
}

// 左侧装备槽（卡片显示在右边）- 与 equipmentData.ts 保持一致
const leftSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'weapon1', 'weapon3']
// 武器槽位（卡片从下往上展开）
const weaponSlots = ['weapon1', 'weapon2', 'weapon3', 'weapon4']

function EquipmentTooltip({ slot, position }: EquipmentTooltipProps) {
  const { equipment } = useEquipmentStore()
  const item = equipment[slot]
  
  if (!item) return null
  
  // 判断是否为神话暗金
  const isMythic = item.itemType === 'mythic'
  const rarityKey = isMythic ? 'mythic' : item.rarity
  const rarity = rarityConfig[rarityKey] || rarityConfig.common
  
  // 计算弹窗位置
  const isLeftSlot = leftSlots.includes(slot)
  const isWeapon = weaponSlots.includes(slot)
  
  // X坐标：左侧槽位显示在右边，右侧槽位显示在左边
  const tooltipX = isLeftSlot ? position.x + 100 : position.x - 290
  
  // Y坐标：武器槽位从下往上展开，其他槽位居中显示
  let tooltipY: number
  const tooltipHeight = 420 // 卡片高度
  
  if (isWeapon) {
    // 武器槽位：从下往上展开（卡片底部对齐槽位底部）
    tooltipY = position.y - tooltipHeight + 90 // 90是槽位高度
  } else {
    // 其他槽位：居中显示
    tooltipY = position.y - 100
  }
  
  // 确保不会超出屏幕边界
  tooltipY = Math.max(10, Math.min(tooltipY, window.innerHeight - tooltipHeight - 10))
  
  return (
    <div
      className="fixed z-[100] w-[280px] rounded-lg overflow-hidden pointer-events-auto"
      style={{
        left: `${tooltipX}px`,
        top: `${tooltipY}px`,
        border: '1px solid #333',
        boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)'
      }}
    >
      {/* 顶部标签 */}
      <div className="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between">
        <span className="text-xs text-gray-400">已装备</span>
        {isMythic && (
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          </div>
        )}
      </div>
      
      {/* 头部 */}
      <div className={`px-4 py-3 ${rarity.bg} border-b ${rarity.border}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-bold text-lg ${rarity.color}`}>{item.name}</h3>
            <div className="text-xs text-gray-400 mt-1">
              {isMythic ? '先祖神话' : item.rarity === 'unique' ? '先祖暗金' : '先祖传奇'} {slotNames[slot]}
            </div>
          </div>
          <div className="w-16 h-16 rounded border border-[#333] flex items-center justify-center overflow-hidden">
            {item.icon ? (
              <img 
                src={item.icon.startsWith('./images/items/') ? getDatabaseImageUrl(item.icon) : item.icon} 
                alt={item.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-500"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
                  }
                }}
              />
            ) : (
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
          <span>900 物品强度</span>
          <span>25 品质</span>
        </div>
      </div>
      
      {/* 属性区域 */}
      <div className="p-4 bg-[#0d0d0d]">
        <div className="mb-4 pb-3 border-b border-[#222]">
          <div className="text-xs text-gray-500 mb-1">{isWeapon ? '武器伤害' : '护甲值'}</div>
          <div className="text-xl font-bold text-white">
            {item.rarity === 'unique' || isMythic ? '1,001' : '288'}{!isWeapon && ' 护甲值'}
          </div>
        </div>
        
        {item.affixes && item.affixes.length > 0 && (
          <div className="space-y-1.5">
            {item.affixes.map((affix, index) => {
              const calcType = (affix as any).calculationType || 'additive'
              // 独立乘区：不显示前缀，只显示 [x] 后缀
              let prefix = calcType === 'independent' ? '' : (calcType === 'additive' ? '+' : '×')
              let suffix = calcType === 'independent' ? '[x]' : ''
              return (
                <div key={affix.id || index} className="flex items-center gap-1 text-sm">
                  {prefix && <span className="text-yellow-500 font-medium">{prefix}</span>}
                  <span className="text-yellow-500 font-medium">{affix.value}{affix.unit || ''}{suffix}</span>
                  <span className="text-gray-300 flex-1">{affix.name}</span>
                </div>
              )
            })}
          </div>
        )}
        
        {/* 宝石和符文 */}
        {(item.gems && item.gems.length > 0 || item.runes && item.runes.length > 0) && (
          <div className="mt-4 pt-3 border-t border-[#222]">
            <div className="text-xs text-gray-400 mb-2">插槽</div>
            <div className="space-y-1">
              {item.gems?.map((gem: any, index: number) => {
                // 根据装备类型判断宝石效果（使用组件的slot prop）
                const weaponSlots = ['weapon', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'mainhand', 'offhand']
                const armorSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'shield']
                const slotType = weaponSlots.includes(slot) ? 'weapon' : armorSlots.includes(slot) ? 'armor' : 'jewelry'
                const gemEffect = slotType === 'weapon' ? gem.weaponEffect : slotType === 'armor' ? gem.armorEffect : gem.jewelryEffect
                return (
                  <div key={`gem-${index}`} className="flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 bg-red-500/30 rounded flex items-center justify-center text-xs text-red-400">◆</span>
                    <span className="text-red-400">{gem.name}</span>
                    {gemEffect && <span className="text-gray-500 text-xs">{gemEffect}</span>}
                  </div>
                )
              })}
              {item.runes?.map((rune: any, index: number) => {
                const isInvocation = rune.category === 'Invocation'
                const textColor = isInvocation ? 'text-purple-400' : 'text-yellow-500'
                const bgColor = isInvocation ? 'bg-purple-500/30' : 'bg-yellow-600/30'
                return (
                  <div key={`rune-${index}`} className="flex items-center gap-2 text-sm">
                    {rune.icon ? (
                      <img 
                        src={getDatabaseImageUrl(rune.icon)}
                        alt=""
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : (
                      <span className={`w-4 h-4 ${bgColor} rounded flex items-center justify-center text-xs ${textColor}`}>◆</span>
                    )}
                    <span className={textColor}>{rune.name}</span>
                    {rune.nameEn && <span className="text-gray-500 text-xs">({rune.nameEn})</span>}
                    {rune.effects?.[0] && <span className="text-gray-500 text-xs">{rune.effects[0]}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {(item.legendaryPower || item.uniqueEffect) && (
          <div className="mt-4 pt-3 border-t border-[#222]">
            <div className={`text-xs mb-2 flex items-center gap-1 ${rarity.effectColor}`}>
              <span className={`w-2 h-2 rotate-45 ${isMythic ? 'bg-purple-500' : 'bg-yellow-600'}`}></span>
              {isMythic ? '神话特效' : item.rarity === 'unique' ? '暗金特效' : '威能'}
            </div>
            <div className="text-sm leading-relaxed">
              {item.legendaryPower && (
                <div className={rarityKey === 'legendary' ? 'text-[#ff8000]' : 'text-gray-300'}>{parsePowerDescription(item.legendaryPowerDescription || '')}</div>
              )}
              {item.uniqueEffect && <div className={`whitespace-pre-line ${rarity.effectColor}`}>{parsePowerDescription(item.uniqueEffect)}</div>}
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-[#222] text-xs text-gray-600 space-y-1">
          <div>需要等级: 70</div>
          <div>账号绑定</div>
          {(item.rarity === 'unique' || isMythic) && <div>憎恨之王物品</div>}
          <div className="mt-2 pt-2 border-t border-[#222]">
            <div className="flex justify-between"><span>出售价格:</span><span className="text-yellow-600">20,704 金币</span></div>
            <div className="flex justify-between mt-1"><span>耐久度:</span><span>70/100</span></div>
            {(item.rarity === 'unique' || isMythic) && <div className="flex justify-between mt-1"><span>回火:</span><span>1/3</span></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentTooltip