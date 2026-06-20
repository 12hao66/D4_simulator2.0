import type { EquipmentItem, EquipmentSlot } from '../types/equipment'

export const slotNames: Record<EquipmentSlot, string> = {
  helmet: '头盔',
  chest: '胸甲',
  gloves: '手套',
  pants: '裤子',
  boots: '靴子',
  weapon1: '主手',
  weapon2: '副手',
  weapon3: '武器3',
  weapon4: '武器4',
  shield: '盾牌',
  amulet: '护符',
  ring1: '戒指1',
  ring2: '戒指2'
}

// 装备槽位图标路径 - 支持外部图片文件
// 将图片放入 modules/equipment/public/images/icons/ 目录下即可
export const slotIcons: Record<EquipmentSlot, string> = {
  helmet: './images/icons/helmet08.png',
  chest: './images/icons/chest04.png',
  gloves: './images/icons/gloves04.png',
  pants: './images/icons/pants08.png',
  boots: './images/icons/boots02.png',
  weapon1: './images/icons/weapon106.png',
  weapon2: './images/icons/weapon202.png',
  weapon3: './images/icons/weapon304.png',
  weapon4: './images/icons/weapon402.png',
  shield: './images/icons/shield.svg',
  amulet: './images/icons/amulet04.png',
  ring1: './images/icons/ring06.png',
  ring2: './images/icons/ring06.png'
}

// 职业槽位配置
export interface ClassSlotConfig {
  weaponSlots: EquipmentSlot[]
  hasShield: boolean
}

export const classSlotConfig: Record<string, ClassSlotConfig> = {
  barbarian: {
    weaponSlots: ['weapon1', 'weapon2', 'weapon3', 'weapon4'],
    hasShield: false
  },
  necromancer: {
    weaponSlots: ['weapon1', 'weapon2'],
    hasShield: false
  },
  sorc: {
    weaponSlots: ['weapon1', 'weapon2'],
    hasShield: false
  },
  druid: {
    weaponSlots: ['weapon1', 'weapon2'],
    hasShield: false
  },
  rogue: {
    weaponSlots: ['weapon1', 'weapon2', 'weapon3'],
    hasShield: false
  },
  spiritborn: {
    weaponSlots: ['weapon1', 'weapon2'],
    hasShield: false
  },
  paladin: {
    weaponSlots: ['weapon1', 'weapon2'],
    hasShield: true
  },
  warlock: {
    weaponSlots: ['weapon1'],
    hasShield: false
  }
}

// 左侧固定槽位（防具 + 主手武器 + 第三武器）
export const leftSlots: EquipmentSlot[] = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'weapon1', 'weapon3']

// 右侧槽位（从顶部开始：空、护符、戒指1、戒指2、空、副手武器、第四武器）
export const rightSlots: (EquipmentSlot | null)[] = [null, 'amulet', 'ring1', 'ring2', null, 'weapon2', 'weapon4']

export const mockEquipment: Record<EquipmentSlot, EquipmentItem[]> = {
  helmet: [
    {
      id: 'helm-1',
      name: '战争头盔',
      slot: 'helmet',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '力量', value: 50, type: 'additive' },
        { id: 'a2', name: '暴击几率', value: 5, type: 'additive' },
        { id: 'a3', name: '攻击速度', value: 3, type: 'additive' }
      ],
      icon: 'images/slot-helm.svg'
    },
    {
      id: 'helm-2',
      name: '不朽之王的冠冕',
      slot: 'helmet',
      rarity: 'legendary',
      level: 80,
      affixes: [
        { id: 'a1', name: '力量', value: 80, type: 'additive' },
        { id: 'a2', name: '暴击伤害', value: 15, type: 'multiplicative' },
        { id: 'a3', name: '压制伤害', value: 20, type: 'independent' }
      ],
      legendaryPower: '旋风斩伤害提高40%',
      icon: 'images/slot-helm.svg'
    }
  ],
  chest: [
    {
      id: 'chest-1',
      name: '铁甲战衣',
      slot: 'chest',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '护甲', value: 200, type: 'additive' },
        { id: 'a2', name: '最大生命', value: 500, type: 'additive' },
        { id: 'a3', name: '全属性', value: 20, type: 'additive' }
      ],
      icon: 'images/slot-chest.svg'
    },
    {
      id: 'chest-2',
      name: '死亡使者的外衣',
      slot: 'chest',
      rarity: 'unique',
      level: 80,
      affixes: [
        { id: 'a1', name: '力量', value: 100, type: 'additive' },
        { id: 'a2', name: '暴击伤害', value: 25, type: 'multiplicative' },
        { id: 'a3', name: '易伤伤害', value: 20, type: 'multiplicative' }
      ],
      uniqueEffect: '击杀敌人后获得10%伤害加成，持续5秒',
      icon: 'images/slot-chest.svg'
    }
  ],
  gloves: [
    {
      id: 'gloves-1',
      name: '战斗手套',
      slot: 'gloves',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '暴击几率', value: 8, type: 'additive' },
        { id: 'a2', name: '攻击速度', value: 5, type: 'additive' },
        { id: 'a3', name: '技能伤害', value: 10, type: 'multiplicative' }
      ],
      icon: 'images/slot-gloves.svg'
    }
  ],
  pants: [
    {
      id: 'pants-1',
      name: '战争护腿',
      slot: 'pants',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '护甲', value: 150, type: 'additive' },
        { id: 'a2', name: '移动速度', value: 8, type: 'additive' },
        { id: 'a3', name: '减伤', value: 5, type: 'multiplicative' }
      ],
      icon: 'images/slot-pants.svg'
    }
  ],
  boots: [
    {
      id: 'boots-1',
      name: '疾风之靴',
      slot: 'boots',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '移动速度', value: 15, type: 'additive' },
        { id: 'a2', name: '力量', value: 30, type: 'additive' },
        { id: 'a3', name: '闪避几率', value: 5, type: 'additive' }
      ],
      icon: 'images/slot-boots.svg'
    }
  ],
  weapon1: [
    {
      id: 'weapon1-1',
      name: '传奇双手剑',
      slot: 'weapon1',
      rarity: 'legendary',
      level: 80,
      affixes: [
        { id: 'a1', name: '武器伤害', value: 500, type: 'additive' },
        { id: 'a2', name: '暴击伤害', value: 30, type: 'multiplicative' },
        { id: 'a3', name: '技能伤害', value: 20, type: 'multiplicative' }
      ],
      legendaryPower: '旋风斩攻击次数+2',
      icon: 'images/slot-sword.svg'
    },
    {
      id: 'weapon1-2',
      name: '屠夫之斧',
      slot: 'weapon1',
      rarity: 'unique',
      level: 80,
      affixes: [
        { id: 'a1', name: '武器伤害', value: 800, type: 'additive' },
        { id: 'a2', name: '暴击伤害', value: 50, type: 'multiplicative' },
        { id: 'a3', name: '易伤伤害', value: 30, type: 'multiplicative' }
      ],
      uniqueEffect: '对流血敌人造成双倍伤害',
      icon: 'images/slot-sword.svg'
    }
  ],
  weapon2: [
    {
      id: 'weapon2-1',
      name: '守护之盾',
      slot: 'weapon2',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '护甲', value: 300, type: 'additive' },
        { id: 'a2', name: '格挡几率', value: 15, type: 'additive' },
        { id: 'a3', name: '减伤', value: 10, type: 'multiplicative' }
      ],
      icon: 'images/slot-shield.svg'
    }
  ],
  weapon3: [
    {
      id: 'weapon3-1',
      name: '猎魔长弓',
      slot: 'weapon3',
      rarity: 'legendary',
      level: 80,
      affixes: [
        { id: 'a1', name: '远程伤害', value: 35, type: 'multiplicative' },
        { id: 'a2', name: '暴击伤害', value: 30, type: 'multiplicative' },
        { id: 'a3', name: '攻击速度', value: 8, type: 'additive' }
      ],
      legendaryPower: '暴击几率提高10%',
      icon: 'images/slot-sword.svg'
    }
  ],
  weapon4: [
    {
      id: 'weapon4-1',
      name: '暗影匕首',
      slot: 'weapon4',
      rarity: 'legendary',
      level: 80,
      affixes: [
        { id: 'a1', name: '暗影伤害', value: 30, type: 'multiplicative' },
        { id: 'a2', name: '攻击速度', value: 15, type: 'additive' },
        { id: 'a3', name: '暴击伤害', value: 20, type: 'multiplicative' }
      ],
      legendaryPower: '暗影伤害提高25%',
      icon: 'images/slot-sword.svg'
    }
  ],
  amulet: [
    {
      id: 'amulet-1',
      name: '毁灭护符',
      slot: 'amulet',
      rarity: 'legendary',
      level: 80,
      affixes: [
        { id: 'a1', name: '全属性', value: 50, type: 'additive' },
        { id: 'a2', name: '暴击伤害', value: 20, type: 'multiplicative' },
        { id: 'a3', name: '技能伤害', value: 15, type: 'multiplicative' }
      ],
      legendaryPower: '技能冷却时间减少20%',
      icon: 'images/slot-amulet.svg'
    }
  ],
  ring1: [
    {
      id: 'ring1-1',
      name: '暴击之环',
      slot: 'ring1',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '暴击几率', value: 6, type: 'additive' },
        { id: 'a2', name: '暴击伤害', value: 15, type: 'multiplicative' },
        { id: 'a3', name: '攻击速度', value: 4, type: 'additive' }
      ],
      icon: 'images/slot-ring.svg'
    }
  ],
  ring2: [
    {
      id: 'ring2-1',
      name: '易伤之环',
      slot: 'ring2',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '易伤伤害', value: 15, type: 'multiplicative' },
        { id: 'a2', name: '暴击伤害', value: 10, type: 'multiplicative' },
        { id: 'a3', name: '力量', value: 30, type: 'additive' }
      ],
      icon: 'images/slot-ring.svg'
    }
  ],
  shield: [
    {
      id: 'shield-1',
      name: '神圣之盾',
      slot: 'shield',
      rarity: 'rare',
      level: 80,
      affixes: [
        { id: 'a1', name: '护甲', value: 200, type: 'additive' },
        { id: 'a2', name: '格挡几率', value: 15, type: 'additive' },
        { id: 'a3', name: '减伤', value: 8, type: 'multiplicative' }
      ],
      icon: 'images/slot-shield.svg'
    },
    {
      id: 'shield-2',
      name: '不朽之盾',
      slot: 'shield',
      rarity: 'legendary',
      level: 80,
      affixes: [
        { id: 'a1', name: '护甲', value: 350, type: 'additive' },
        { id: 'a2', name: '格挡几率', value: 20, type: 'additive' },
        { id: 'a3', name: '全抗性', value: 15, type: 'additive' }
      ],
      legendaryPower: '格挡时恢复10%最大生命值',
      icon: 'images/slot-shield.svg'
    }
  ]
}

export const characterClasses = [
  { id: 'barbarian', name: '野蛮人', icon: '⚔️' },
  { id: 'necromancer', name: '死灵法师', icon: '💀' },
  { id: 'sorc', name: '巫师', icon: '🔮' },
  { id: 'druid', name: '德鲁伊', icon: '🌿' },
  { id: 'rogue', name: '游侠', icon: '🏹' },
  { id: 'spiritborn', name: '术士', icon: '✨' },
  { id: 'paladin', name: '圣骑士', icon: '🛡️' },
  { id: 'warlock', name: '灵巫', icon: '🦅' }
] as const
