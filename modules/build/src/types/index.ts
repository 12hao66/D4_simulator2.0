// 构筑模块类型定义

// 职业类型（与装备模拟器保持一致）
export type CharacterClass = 'barbarian' | 'necromancer' | 'sorc' | 'wizard' | 'druid' | 'rogue' | 'ranger' | 'spiritborn' | 'paladin' | 'warlock'

// 装备槽位
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

// 稀有度
export type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique'

// 词缀
export interface Affix {
  id: string
  name: string
  value: number
  unit?: string
  type: 'additive' | 'multiplicative' | 'independent'
}

// 装备物品
export interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  rarity: Rarity
  level: number
  itemType?: 'mythic' | 'unique'
  affixes: Affix[]
  legendaryPower?: string
  legendaryPowerDescription?: string
  uniqueEffect?: string
  uniqueEffectDescription?: string
  icon: string
  gems?: Gem[]
  runes?: Rune[]
}

// 宝石
export interface Gem {
  id: string
  name: string
  icon: string
  effect: string
}

// 符文
export interface Rune {
  id: string
  name: string
  icon: string
  effect: string
}

// 技能槽位
export interface SkillSlot {
  slot: string
  skillId: string
  skillName: string
  icon: string
  description?: string
}

// 巅峰节点
export interface ParagonNode {
  id: string
  name: string
  type: 'normal' | 'rare' | 'legendary' | 'glyph'
  effect: string
  position: { x: number; y: number }
}

// 巅峰配置
export interface ParagonConfig {
  nodes: ParagonNode[]
  glyphs: { id: string; name: string; level: number; position: { x: number; y: number } }[]
}

// 伤害计算结果
export interface DamageResult {
  dps: number
  averageHit: number
  critChance: number
  critDamage: number
  vulnerableDamage: number
  breakdown: {
    base: number
    additive: number
    multiplicative: number
    independent: number
  }
}

// 赛季信息
export interface Season {
  id: string
  name: string
  displayName: string
  startDate: string
  endDate?: string
  isActive: boolean
}

// 职业信息
export interface ClassInfo {
  id: CharacterClass
  name: string
  icon: string
}

// 排序方式
export type SortType = 'default' | 'popular' | 'latest' | 'rating'

// 筛选条件
export interface FilterOptions {
  season: string
  characterClass: CharacterClass | 'all'
  sortBy: SortType
  playStyle?: string
  difficulty?: string
}

// 构筑方案（完整角色配置）
export interface Build {
  id: string
  author: string
  authorLevel?: number
  authorRank?: number
  name: string
  description: string
  characterClass: CharacterClass
  season: string
  
  // 构筑组成部分
  equipment: Record<EquipmentSlot, EquipmentItem | null>
  skills: SkillSlot[]
  paragon?: ParagonConfig
  damage?: DamageResult
  
  // 统计信息
  likes: number
  downloads: number
  views: number
  rating?: number
  
  // 元数据
  tags: string[]
  playStyle?: string
  difficulty?: string
  createdAt: number
  updatedAt: number
  
  // 封面图
  thumbnail?: string
}

// 构筑列表响应
export interface BuildListResponse {
  builds: Build[]
  total: number
  page: number
  pageSize: number
}

// 构筑详情（包含更多展示信息）
export interface BuildDetail extends Build {
  // 详细属性统计
  stats: {
    strength: number
    dexterity: number
    intelligence: number
    attackPower: number
    critChance: number
    critDamage: number
    attackSpeed: number
    armor: number
    health: number
    resistance: number
  }
  
  // 核心词缀汇总
  keyAffixes: { name: string; value: number; unit?: string }[]
  
  // 构筑说明
  guide?: string
  
  // 视频链接
  videoUrl?: string
}
