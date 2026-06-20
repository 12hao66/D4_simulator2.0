/**
 * 装备数据 - 共享数据
 */

const EquipmentData = {
  // 装备槽位
  slots: {
    helm: { id: 'helm', name: '头盔', icon: 'helmet' },
    chest: { id: 'chest', name: '胸部', icon: 'chest' },
    gloves: { id: 'gloves', name: '手套', icon: 'gloves' },
    pants: { id: 'pants', name: '裤子', icon: 'pants' },
    boots: { id: 'boots', name: '靴子', icon: 'boots' },
    mainhand: { id: 'mainhand', name: '主手', icon: 'sword' },
    offhand: { id: 'offhand', name: '副手', icon: 'shield' },
    amulet: { id: 'amulet', name: '护符', icon: 'amulet' },
    ring1: { id: 'ring1', name: '戒指1', icon: 'ring' },
    ring2: { id: 'ring2', name: '戒指2', icon: 'ring' }
  },

  // 稀有度
  rarities: {
    common: { id: 'common', name: '普通', color: '#888888', bgColor: 'rgba(136, 136, 136, 0.1)' },
    magic: { id: 'magic', name: '魔法', color: '#1eff00', bgColor: 'rgba(30, 255, 0, 0.1)' },
    rare: { id: 'rare', name: '稀有', color: '#0070dd', bgColor: 'rgba(0, 112, 221, 0.1)' },
    legendary: { id: 'legendary', name: '传奇', color: '#ff8000', bgColor: 'rgba(255, 128, 0, 0.1)' },
    unique: { id: 'unique', name: '暗金', color: '#e6cc80', bgColor: 'rgba(230, 204, 128, 0.1)' }
  },

  // 词缀类型
  affixTypes: {
    strength: { id: 'strength', name: '力量', category: 'primary' },
    dexterity: { id: 'dexterity', name: '敏捷', category: 'primary' },
    intelligence: { id: 'intelligence', name: '智力', category: 'primary' },
    vitality: { id: 'vitality', name: '活力', category: 'primary' },
    
    maxLife: { id: 'maxLife', name: '最大生命', category: 'defense' },
    armor: { id: 'armor', name: '护甲', category: 'defense' },
    resistAll: { id: 'resistAll', name: '全抗', category: 'defense' },
    
    criticalChance: { id: 'criticalChance', name: '暴击几率', category: 'offense' },
    criticalDamage: { id: 'criticalDamage', name: '暴击伤害', category: 'offense' },
    attackSpeed: { id: 'attackSpeed', name: '攻击速度', category: 'offense' },
    damage: { id: 'damage', name: '伤害', category: 'offense' },
    skillDamage: { id: 'skillDamage', name: '技能伤害', category: 'offense' },
    
    cooldownReduction: { id: 'cooldownReduction', name: '冷却缩减', category: 'utility' },
    resourceCostReduction: { id: 'resourceCostReduction', name: '资源消耗降低', category: 'utility' },
    movementSpeed: { id: 'movementSpeed', name: '移动速度', category: 'utility' }
  },

  // 武器类型
  weaponTypes: {
    sword: { id: 'sword', name: '剑', damageRange: [100, 200] },
    axe: { id: 'axe', name: '斧', damageRange: [120, 220] },
    mace: { id: 'mace', name: '锤', damageRange: [110, 210] },
    bow: { id: 'bow', name: '弓', damageRange: [90, 180] },
    staff: { id: 'staff', name: '法杖', damageRange: [80, 250] },
    dagger: { id: 'dagger', name: '匕首', damageRange: [60, 120] },
    wand: { id: 'wand', name: '魔杖', damageRange: [70, 140] },
    shield: { id: 'shield', name: '盾牌', damageRange: [20, 40], block: true },
    twoHandSword: { id: 'twoHandSword', name: '双手剑', damageRange: [180, 350] },
    twoHandAxe: { id: 'twoHandAxe', name: '双手斧', damageRange: [200, 380] },
    twoHandMace: { id: 'twoHandMace', name: '双手锤', damageRange: [190, 360] }
  },

  // 职业专属装备
  classEquipment: {
    barbarian: ['twoHandAxe', 'twoHandSword', 'twoHandMace'],
    sorcerer: ['staff', 'wand'],
    rogue: ['bow', 'dagger'],
    druid: ['staff', 'mace'],
    necromancer: ['wand', 'dagger'],
    paladin: ['mace', 'sword', 'shield'],
    monk: ['dagger', 'mace']
  },

  // 生成随机装备
  generateRandomEquipment: function(slotId, rarity = 'rare') {
    const slot = this.slots[slotId];
    const rarityInfo = this.rarities[rarity];
    
    // 根据稀有度生成词缀数量
    const affixCount = {
      common: 1,
      magic: 2,
      rare: 3,
      legendary: 4,
      unique: 5
    }[rarity] || 3;

    const affixes = [];
    const allAffixTypes = Object.values(this.affixTypes);
    
    for (let i = 0; i < affixCount; i++) {
      const randomAffix = allAffixTypes[Math.floor(Math.random() * allAffixTypes.length)];
      const value = this.generateAffixValue(randomAffix.id);
      affixes.push({
        ...randomAffix,
        value: value
      });
    }

    return {
      id: Utils.generateId(),
      name: this.generateEquipmentName(slot, rarity),
      slot: slotId,
      rarity: rarity,
      affixes: affixes,
      icon: slot.icon
    };
  },

  // 生成词缀数值
  generateAffixValue: function(affixId) {
    const ranges = {
      strength: [20, 50],
      dexterity: [20, 50],
      intelligence: [20, 50],
      vitality: [20, 50],
      maxLife: [500, 1500],
      armor: [100, 300],
      resistAll: [5, 15],
      criticalChance: [3, 8],
      criticalDamage: [10, 25],
      attackSpeed: [3, 8],
      damage: [5, 15],
      skillDamage: [5, 20],
      cooldownReduction: [3, 10],
      resourceCostReduction: [5, 15],
      movementSpeed: [3, 10]
    };

    const range = ranges[affixId] || [0, 10];
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  },

  // 生成装备名称
  generateEquipmentName: function(slot, rarity) {
    const prefixes = {
      common: ['破旧的', '普通的', '简陋的'],
      magic: ['精良的', '坚固的', '锋利的'],
      rare: ['卓越的', '史诗的', '传奇的'],
      legendary: ['神圣的', '远古的', '不朽的'],
      unique: ['神话的', '传说的', '至尊的']
    };

    const names = {
      helm: ['头盔', '兜帽', '皇冠', '面具'],
      chest: ['胸甲', '铠甲', '法袍', '外套'],
      gloves: ['手套', '护手', '拳套', '护手甲'],
      pants: ['护腿', '战裙', '长裤', '马裤'],
      boots: ['战靴', '皮靴', '长靴', '便鞋'],
      mainhand: ['长剑', '战斧', '法杖', '巨锤'],
      offhand: ['盾牌', '副手武器', '魔杖', '匕首'],
      amulet: ['护符', '项链', '吊坠', '徽章'],
      ring1: ['戒指', '指环', '宝石戒指', '符文戒'],
      ring2: ['戒指', '指环', '宝石戒指', '符文戒']
    };

    const prefixList = prefixes[rarity] || prefixes.common;
    const nameList = names[slot.id] || ['装备'];

    const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];
    const name = nameList[Math.floor(Math.random() * nameList.length)];

    return `${prefix}${name}`;
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EquipmentData;
}