import { useState } from 'react'
import { useEquipmentStore } from '../store/equipmentStore'
import { slotNames, slotIcons, classSlotConfig, leftSlots, rightSlots } from '../data/equipmentData'
import type { EquipmentSlot } from '../types/equipment'
import EquipmentTooltip from './EquipmentTooltip'
import { getDatabaseImageUrl } from '../config/appConfig'

interface EquipmentSlotsProps {
  side: 'left' | 'right'
}

function EquipmentSlots({ side }: EquipmentSlotsProps) {
  const { equipment, selectedSlot, selectSlot, character } = useEquipmentStore()
  
  // 悬停状态
  const [hoveredSlot, setHoveredSlot] = useState<EquipmentSlot | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  
  // 根据职业过滤槽位显示
const filterSlotsByClass = (allSlots: (EquipmentSlot | null)[]): (EquipmentSlot | null)[] => {
  const config = classSlotConfig[character.class]
  const availableWeapons = config?.weaponSlots || ['weapon1', 'weapon2']
  
  return allSlots.map(slot => {
    if (slot === null) return null
    if (slot.startsWith('weapon')) {
      return availableWeapons.includes(slot) ? slot : null
    }
    return slot
  })
}

// 左侧：防具槽位 + 主手武器 + 第三武器（根据职业显示）
// 右侧：副手武器 + 首饰 + 第四武器 + 戒指2（根据职业显示）
const slots = filterSlotsByClass(side === 'left' ? leftSlots : rightSlots)
  
  const getRarityBorder = (slot: EquipmentSlot): string => {
    const item = equipment[slot]
    if (!item) return 'border-d4-border'
    // 检查是否为神话暗金
    if (item.itemType === 'mythic') return 'border-purple-500'
    switch (item.rarity) {
      case 'legendary': return 'border-rarity-legendary'
      case 'unique': return 'border-rarity-unique'
      case 'rare': return 'border-rarity-rare'
      case 'magic': return 'border-rarity-magic'
      default: return 'border-rarity-common'
    }
  }
  
  const getRarityGlow = (slot: EquipmentSlot): string => {
    const item = equipment[slot]
    if (!item) return ''
    // 检查是否为神话暗金
    if (item.itemType === 'mythic') return 'shadow-[0_0_10px_rgba(168,85,247,0.4)]'
    switch (item.rarity) {
      case 'legendary': return 'shadow-[0_0_10px_rgba(255,128,0,0.4)]'
      case 'unique': return 'shadow-[0_0_10px_rgba(230,204,128,0.4)]'
      case 'rare': return 'shadow-[0_0_8px_rgba(0,112,221,0.3)]'
      case 'magic': return 'shadow-[0_0_8px_rgba(30,255,0,0.3)]'
      default: return ''
    }
  }
  
  // 获取悬停时的边框颜色
  const getHoverBorder = (slot: EquipmentSlot): string => {
    const item = equipment[slot]
    if (!item) return 'hover:border-d4-gold'
    // 检查是否为神话暗金
    if (item.itemType === 'mythic') return 'hover:border-purple-400'
    switch (item.rarity) {
      case 'legendary': return 'hover:border-[#ff8000]'
      case 'unique': return 'hover:border-[#e6cc80]'
      case 'rare': return 'hover:border-[#0070dd]'
      case 'magic': return 'hover:border-[#1eff00]'
      default: return 'hover:border-d4-gold'
    }
  }
  
  const hasItem = (slot: EquipmentSlot): boolean => {
    return equipment[slot] !== null
  }
  
  const renderSlot = (slotOrNull: EquipmentSlot | null, index: number) => {
    // 处理空槽位
    if (slotOrNull === null) {
      return (
        <div key={`empty-${index}`} className="w-[55px] h-[85px] opacity-0" />
      )
    }
    
    const slot = slotOrNull
    const item = equipment[slot]
    const isSelected = selectedSlot === slot
    const hasItemFlag = hasItem(slot)
    
    const handleMouseEnter = (e: React.MouseEvent) => {
      if (hasItemFlag) {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltipPosition({ x: rect.left, y: rect.top })
        setHoveredSlot(slot)
      }
    }
    
    const handleMouseLeave = () => {
      setHoveredSlot(null)
    }
    
    return (
      <div
        key={slot}
        onClick={() => selectSlot(isSelected ? null : slot)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`eq-slot w-[55px] h-[85px] rounded border ${getRarityBorder(slot)} ${getRarityGlow(slot)} ${getHoverBorder(slot)} ${isSelected ? 'ring-1 ring-d4-gold' : ''} ${hasItemFlag ? 'has-item' : ''} transition-all duration-200 hover:scale-105 cursor-pointer`}
      >
        <div className="eq-slot-icon w-[50px] h-[50px] flex items-center justify-center">
          {/* 如果有装备且有图标，显示装备图片；否则显示默认槽位图标 */}
          {item && item.icon ? (
            <img 
              src={item.icon.startsWith('./images/items/') ? getDatabaseImageUrl(item.icon) : item.icon} 
              alt={item.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                // 如果装备图片加载失败，显示默认图标
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `<img src="${slotIcons[slot]}" alt="${slotNames[slot]}" class="w-full h-full object-contain opacity-60" onerror="this.style.display='none';this.parentElement.innerHTML='<svg viewBox=\\'0 0 24 24\\' fill=\\'#888\\'><path d=\\'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z\\'/></svg>'"/>`
                }
              }}
            />
          ) : (
            <img 
              src={slotIcons[slot]} 
              alt={slotNames[slot]}
              className="w-full h-full object-contain opacity-60"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `<svg viewBox="0 0 24 24" fill="#888"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`
                }
              }}
            />
          )}
        </div>
        <span className="eq-slot-label text-[9px] text-d4-text-secondary mt-1">{slotNames[slot]}</span>
      </div>
    )
  }
  
  return (
    <>
      <div className="flex flex-col gap-1">
        {slots.map((slot, index) => renderSlot(slot, index))}
      </div>
      
      {/* 装备详情卡片 */}
      {hoveredSlot && (
        <EquipmentTooltip slot={hoveredSlot} position={tooltipPosition} />
      )}
    </>
  )
}

export default EquipmentSlots
