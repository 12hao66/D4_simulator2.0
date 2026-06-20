export type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique';
export type DamageType = 'physical' | 'fire' | 'cold' | 'lightning' | 'poison' | 'shadow' | 'arcane';
export type SkillType = 'active' | 'passive' | 'ultimate' | 'basic';
export type SkillCategory = 'offense' | 'defense' | 'utility' | 'mobility';
export type CharacterClass = 'barbarian' | 'necromancer' | 'sorc' | 'wizard' | 'druid' | 'rogue' | 'ranger' | 'spiritborn' | 'paladin' | 'warlock';
export type GemType = 'ruby' | 'topaz' | 'emerald' | 'sapphire' | 'amethyst' | 'diamond' | 'skull';
export type AffixCategory = 'primary' | 'offense' | 'defense' | 'utility';
export type AffixCalculationType = 'additive' | 'multiplicative' | 'independent';
export type ItemType = 'mythic' | 'unique';

// 词缀稀有度类型（普通/嬗变/回火）
export type AffixRarity = 'normal' | 'transmute' | 'temper';

// 词缀子分类
export type AffixSubcategory = 'weapon' | 'offense' | 'defense' | 'mobility' | 'resource' | 'general';

export interface UniqueEquipment {
 id: string;
 name: string;
 itemType: ItemType;
 slot: string;
 rarity?: Rarity;  // 装备稀有度
 description: string;
 level: number;
 affixes: UniqueAffix[];
 uniqueEffects: UniqueEffect[];
 icon: string;
 dropBoss?: string;
 manuallyVerified?: boolean; // 是否已手动维护（用于区分自动抓取和人工审核的数据）
}

export interface UniqueAffix {
 id: string;
 name: string;
 value: number;
 unit: string;
 description: string;
}

export interface UniqueEffect {
 id: string;
 name: string;
 description: string;
 condition?: string;
}

export interface LegendaryPower {
 id: string;
 name: string;
 description: string;
 type: string;  // 职业类型
 powerType?: string;  // 威能类型（如：resource、offense、defense等）
 applicableSlots?: string[];  // 适用装备类型
 applicableClasses?: CharacterClass[];  // 适用职业
 boss?: string;  // 掉落Boss
 level?: number;  // 等级要求
 icon?: string;
 manuallyVerified?: boolean; // 是否已手动维护
}

export interface Affix {
 id: string;
 name: string;
 category: AffixCategory;
 subcategory: AffixSubcategory;
 rarity: AffixRarity;
 calculationType: AffixCalculationType;
 minValue: number;
 maxValue: number;
 unit: string;
 description: string;
 applicableSlots: string[];
 applicableClasses?: CharacterClass[];
 icon?: string;
}

export interface Skill {
 id: string;
 name: string;
 description: string;
 type: SkillType;
 category: SkillCategory;
 damageType: DamageType;
 characterClass: CharacterClass;
 skillTree: string;
 skillTreePath: string[];
 maxRank: number;
 baseCooldown?: number;
 baseResourceCost?: number;
 damageCoefficient?: number;
 effects: SkillEffect[];
 icon: string;
}

export interface SkillEffect {
 id: string;
 name: string;
 description: string;
 condition?: string;
}

export type AmuletType = 'talisman' | 'seal'; // 神符、封印

export interface Amulet {
  id: string;
  name: string;
  type: AmuletType;           // 类型：神符/封印
  level: number;              // 需要等级
  description: string;        // 效果描述
  flavorText: string;         // 背景故事描述
  icon: string;
  applicableClasses: string[]; // 适用职业
}

export interface AmuletAffix {
 id: string;
 name: string;
 value: number;
 unit: string;
}

export interface CraftingMaterial {
 id: string;
 name: string;
 type: string;
 rarity: Rarity;
 description: string;
 icon: string;
}

export type RuneType = 'legendary' | 'ritual'; // 传奇符文、仪祭符文

export type RuneCategory = 'Invocation' | 'Supplication'; // 祈告符文、仪祭符文

export interface Rune {
  id: string;
  name: string;
  nameEn: string;           // 英文名称
  type: RuneType;           // 符文类型：传奇符文/仪祭符文
  category: RuneCategory;   // 符文类别：祈告/仪祭
  icon: string;             // 图标路径
  obtainedFrom: string;     // 获得方式
  effects: string[];        // 效果列表
  runeWordDesc: string;     // 符文之语说明
}

export interface RuneEffect {
 id: string;
 name: string;
 value: number;
 unit: string;
}

export interface Gem {
  id: string;
  name: string;
  type: GemType;
  icon: string;
  weaponEffect: string;
  armorEffect: string;
  jewelryEffect: string;
  cubeEffect: string;
  requiredLevel: number;
}

export interface GemEffect {
 id: string;
 name: string;
 value: number;
 unit: string;
 slot: string;
}

export interface DatabaseStats {
 totalUniqueEquipment: number;
 totalLegendaryPowers: number;
 totalAffixes: number;
 totalSkills: number;
 totalAmulets: number;
 totalCraftingMaterials: number;
 totalRunes: number;
 totalGems: number;
}