export type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique'

export type EquipmentSlot = 
  | 'helmet' 
  | 'chest' 
  | 'gloves' 
  | 'pants' 
  | 'boots' 
  | 'weapon1' 
  | 'weapon2' 
  | 'weapon3'
  | 'weapon4'
  | 'shield'
  | 'amulet' 
  | 'ring1' 
  | 'ring2'

export interface Affix {
  id: string
  name: string
  value: number
  unit?: string
  type: 'additive' | 'multiplicative' | 'independent'
  calculationType?: 'additive' | 'multiplicative' | 'independent'  // 计算类型
}

export interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  rarity: Rarity
  level: number
  itemType?: 'mythic' | 'unique'  // 神话暗金标记
  affixes: Affix[]
  legendaryPower?: string
  legendaryPowerDescription?: string
  uniqueEffect?: string
  uniqueEffectDescription?: string
  icon: string
  gems?: any[]
  runes?: any[]
}

export interface Character {
  class: 'barbarian' | 'necromancer' | 'sorc' | 'druid' | 'rogue' | 'spiritborn' | 'paladin' | 'warlock'
  level: number
}

export interface EquipmentState {
  character: Character
  equipment: Record<EquipmentSlot, EquipmentItem | null>
  selectedSlot: EquipmentSlot | null
  
  setCharacterClass: (charClass: Character['class']) => void
  equipItem: (slot: EquipmentSlot, item: EquipmentItem | null) => void
  unequipItem: (slot: EquipmentSlot) => void
  selectSlot: (slot: EquipmentSlot | null) => void
  calculateStats: () => EquipmentStats
}

// 属性来源明细
export interface AttributeSource {
  name: string        // 来源名称（装备名）
  value: number       // 贡献值
  type: 'base' | 'affix' | 'power' // 来源类型
}

// 属性明细记录
export interface AttributeDetail {
  baseValue: number           // 基础值
  totalValue: number          // 总值
  sources: AttributeSource[]  // 来源列表
}

export interface EquipmentStats {
  // 主要属性
  strength: number
  dexterity: number
  intelligence: number
  
  // 战斗属性
  attackPower: number
  attackSpeed: number
  critChance: number
  critDamage: number
  vulnerableDamage: number
  weaponDamage: number
  
  // 防御属性
  armor: number
  resistance: number
  health: number
  
  // 伤害加成乘区
  additiveDamage: number           // A区 - 伤害类加法加成
  multiplicativeDamage: number     // B区 - 乘法加成（初始为1）
  independentMultipliers: number[] // 独立乘区 - 后缀[x]
  
  // B类乘区分组信息（同名词缀相加后的结果）
  multiplicativeGroups: {
    name: string        // 词缀名称
    totalValue: number  // 该组词缀的总值
    sources: string[]   // 来源装备列表
  }[]
  
  // 独立乘区详细信息（带来源）
  independentDetails: {
    name: string        // 词缀名称
    value: number       // 词缀值
    source: string      // 来源装备
    multiplier: number  // 乘数 (1 + value/100)
  }[]
  
  // 其他属性（未明确分类的属性）
  otherAttributes: Record<string, { value: number; detail: AttributeDetail }>
  
  // 属性来源明细（用于悬停显示）
  details: {
    strength?: AttributeDetail
    dexterity?: AttributeDetail
    intelligence?: AttributeDetail
    attackPower?: AttributeDetail
    attackSpeed?: AttributeDetail
    critChance?: AttributeDetail
    critDamage?: AttributeDetail
    vulnerableDamage?: AttributeDetail
    weaponDamage?: AttributeDetail
    armor?: AttributeDetail
    resistance?: AttributeDetail
    health?: AttributeDetail
    additiveDamage?: AttributeDetail
    multiplicativeDamage?: AttributeDetail
    independentMultiplier?: AttributeDetail
  }
  
  // 装备统计
  equippedCount: number
  legendaryEffects: number
}
