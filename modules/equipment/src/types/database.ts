// 数据库类型定义（从数据库模块复用）

export type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique'
export type CharacterClass = 'barbarian' | 'necromancer' | 'sorc' | 'wizard' | 'druid' | 'rogue' | 'ranger' | 'spiritborn' | 'paladin' | 'warlock'
export type ItemType = 'mythic' | 'unique'
export type AffixCategory = 'primary' | 'offense' | 'defense' | 'utility'
export type AffixCalculationType = 'additive' | 'multiplicative' | 'independent'
export type AffixRarity = 'normal' | 'transmute' | 'temper'
export type AffixSubcategory = 'weapon' | 'offense' | 'defense' | 'mobility' | 'resource' | 'general'

/**
 * 暗金装备
 */
export interface UniqueEquipment {
  id: string
  name: string
  itemType: ItemType
  slot: string
  rarity?: Rarity
  description: string
  level: number
  affixes: UniqueAffix[]
  uniqueEffects: UniqueEffect[]
  icon: string
  dropBoss?: string
  manuallyVerified?: boolean
}

export interface UniqueAffix {
  id: string
  name: string
  value: number
  unit: string
  description: string
}

export interface UniqueEffect {
  id: string
  name: string
  description: string
  condition?: string
}

/**
 * 威能
 */
export interface LegendaryPower {
  id: string
  name: string
  description: string
  type: string  // 职业类型
  powerType?: string  // 威能类型
  applicableSlots?: string[]  // 适用装备类型
  applicableClasses?: CharacterClass[]  // 适用职业
  boss?: string
  level?: number
  icon?: string
  manuallyVerified?: boolean
}

/**
 * 词缀
 */
export interface Affix {
  id: string
  name: string
  category: AffixCategory
  subcategory: AffixSubcategory
  rarity: AffixRarity
  calculationType: AffixCalculationType
  minValue: number
  maxValue: number
  unit: string
  description: string
  applicableSlots: string[]
  applicableClasses?: CharacterClass[]
  icon?: string
}

/**
 * 装备槽位类型
 */
export type EquipmentSlot = 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots' | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4' | 'shield' | 'amulet' | 'ring1' | 'ring2'

/**
 * 装备物品
 */
export interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot | string
  rarity: Rarity
  level: number
  affixes: EquipmentAffix[]
  legendaryPower?: string
  legendaryPowerDescription?: string
  uniqueEffect?: string
  uniqueEffectDescription?: string
  weaponType?: string
  damageRange?: [number, number]
  icon: string
}

export interface EquipmentAffix {
  id: string
  name: string
  description?: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
  category?: string
  minValue?: number
  maxValue?: number
}

/**
 * 技能
 */
export interface Skill {
  id: string
  name: string
  description: string
  type: string
  category: string
  damageType?: string
  characterClass: CharacterClass
  skillTree?: string
  skillTreePath?: string[]
  maxRank: number
  baseCooldown?: number
  baseResourceCost?: number
  damageCoefficient?: number
  effects?: SkillEffect[]
  icon?: string
}

export interface SkillEffect {
  id: string
  name: string
  description: string
}

/**
 * 威能节点
 */
export interface ParagonNode {
  id: string
  name: string
  description: string
  type: string
  position: { x: number; y: number }
  effects: ParagonEffect[]
  adjacentNodes: string[]
  icon?: string
}

export interface ParagonEffect {
  id: string
  name: string
  value: number
  type: string
}

/**
 * 构建/配装
 */
export interface Build {
  id: string
  name: string
  description?: string
  characterClass: CharacterClass
  level: number
  equipment: Record<string, EquipmentItem | null>
  skills: BuildSkill[]
  paragonNodes: string[]
  paragon?: {
    selectedNodes: string[]
    allocatedPoints: number
  }
  createdAt: number | string
  updatedAt: number | string
}

/**
 * 构建技能
 */
export interface BuildSkill {
  skillId: string
  rank: number
  slot: string
}

/**
 * 数据库统计
 */
export interface DatabaseStats {
  totalEquipment: number
  totalSkills: number
  totalParagonNodes: number
  totalBuilds: number
}

/**
 * D2Core 构建导入格式
 */
export interface D2CoreBuild {
  id: string
  name: string
  version?: string
  character: {
    class: string
    level: number
  }
  equipment: Record<string, D2CoreEquipment | null>
  skills: D2CoreSkill[]
  paragon?: {
    nodes: string[]
  }
  stats?: Record<string, number>
}

export interface D2CoreEquipment {
  id: string
  name: string
  slot: string
  rarity: string
  level: number
  affixes: D2CoreAffix[]
  legendaryPower?: {
    name: string
    description: string
  }
  icon?: string
}

export interface D2CoreAffix {
  id: string
  name: string
  value: number
  unit: string
}

export interface D2CoreSkill {
  id: string
  rank: number
  slot: string
}

/**
 * 装备槽位映射（英文 -> 中文）
 */
export const slotNameMap: Record<string, string> = {
  helmet: '头盔',
  chest: '胸甲',
  gloves: '手套',
  pants: '裤子',
  boots: '靴子',
  amulet: '护符',
  ring: '戒指',
  'ring1': '戒指',
  'ring2': '戒指',
  weapon: '武器',
  'weapon1': '武器',
  'weapon2': '武器',
  'weapon3': '武器',
  'weapon4': '武器',
  shield: '盾牌',
  offhand: '副手'
}

/**
 * 中文槽位 -> 英文槽位映射
 */
export const slotNameReverseMap: Record<string, string> = {
  '头盔': 'helmet',
  '胸甲': 'chest',
  '手套': 'gloves',
  '裤子': 'pants',
  '靴子': 'boots',
  '护符': 'amulet',
  '戒指': 'ring',
  '单手武器': 'weapon',
  '双手武器': 'weapon',
  '副手': 'offhand'
}
