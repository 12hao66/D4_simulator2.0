import type { Build, Season, ClassInfo, CharacterClass, EquipmentItem, EquipmentSlot } from '../types';

// 赛季数据
export const seasons: Season[] = [
  {
    id: 's14',
    name: 'S14',
    displayName: 'S14 清算赛季',
    startDate: '2025-06-17',
    isActive: true
  },
  {
    id: 's13',
    name: 'S13',
    displayName: 'S13 暗黑赛季',
    startDate: '2025-03-18',
    endDate: '2025-06-16',
    isActive: false
  },
  {
    id: 's12',
    name: 'S12',
    displayName: 'S12 血色赛季',
    startDate: '2025-01-07',
    endDate: '2025-03-17',
    isActive: false
  }
];

// 职业信息
export const classInfoList: ClassInfo[] = [
  { id: 'barbarian', name: '野蛮人', icon: '🪓' },
  { id: 'necromancer', name: '死灵法师', icon: '💀' },
  { id: 'sorc', name: '法师', icon: '🔮' },
  { id: 'druid', name: '德鲁伊', icon: '🌲' },
  { id: 'rogue', name: '游侠', icon: '🏹' },
  { id: 'spiritborn', name: '魂灵师', icon: '✨' },
  { id: 'paladin', name: '圣骑士', icon: '🛡️' },
  { id: 'warlock', name: '术士', icon: '🔥' }
];

// 生成模拟装备
const createMockEquipment = (charClass: CharacterClass): Record<EquipmentSlot, EquipmentItem | null> => {
  const slots: EquipmentSlot[] = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'shield', 'amulet', 'ring1', 'ring2'];
  
  const rarityMap: Record<CharacterClass, string[]> = {
    barbarian: ['legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    necromancer: ['legendary', 'legendary', 'unique', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    sorc: ['legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'unique', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    wizard: ['legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'unique', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    druid: ['legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    rogue: ['legendary', 'legendary', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    ranger: ['legendary', 'legendary', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    spiritborn: ['unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary'],
    paladin: ['legendary', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary'],
    warlock: ['legendary', 'legendary', 'legendary', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'unique', 'legendary', 'legendary', 'legendary', 'legendary']
  };

  const affixTemplates = [
    { name: '力量', value: 85, unit: '' },
    { name: '暴击伤害', value: 32, unit: '%' },
    { name: '攻击速度', value: 12, unit: '%' },
    { name: '易伤伤害', value: 28, unit: '%' },
    { name: '技能伤害', value: 45, unit: '%' },
    { name: '护甲', value: 240, unit: '' },
    { name: '生命', value: 850, unit: '' },
    { name: '暴击几率', value: 8, unit: '%' }
  ];

  const equipmentNames: Record<string, string[]> = {
    helmet: ['征服者头盔', '勇猛战盔', '暗影兜帽', '烈焰冠冕', '冰霜头冠'],
    chest: ['巨龙胸甲', '暗影护甲', '烈焰战袍', '冰霜铠甲', '神圣铠甲'],
    gloves: ['战争手套', '暗影护手', '烈焰手套', '冰霜护手', '刺客手套'],
    pants: ['战争护腿', '暗影护腿', '烈焰护腿', '冰霜护腿', '龙鳞护腿'],
    boots: ['疾风之靴', '暗影之靴', '烈焰战靴', '冰霜之靴', '刺客之靴'],
    weapon1: ['毁灭之剑', '暗影之刃', '烈焰法杖', '冰霜法杖', '神圣权杖'],
    weapon2: ['雷霆之锤', '暗影匕首', '火焰魔杖', '寒冰法杖', '圣光剑'],
    weapon3: ['风暴之斧', '剧毒之刃', '奥术法杖', '暗影镰刀', '光明之剑'],
    weapon4: ['冰霜巨锤', '烈焰匕首', '暗影法杖', '圣光权杖', '雷霆法杖'],
    shield: ['巨龙之盾', '暗影护盾', '烈焰屏障', '冰霜之盾', '神圣壁垒'],
    amulet: ['毁灭护符', '暗影护符', '烈焰护符', '冰霜护符', '神圣护符'],
    ring1: ['毁灭戒指', '暗影戒指', '烈焰戒指', '冰霜戒指', '神圣戒指'],
    ring2: ['力量戒指', '敏捷戒指', '智力戒指', '生命戒指', '暴击戒指']
  };

  return slots.reduce((acc, slot) => {
    const idx = Math.floor(Math.random() * 5);
    const rarity = rarityMap[charClass][slots.indexOf(slot)] as any;
    const baseAffixes = affixTemplates.slice(0, Math.min(4, affixTemplates.length));
    const affixes = baseAffixes.map((affix, i) => ({
      id: `${slot}-affix-${i}`,
      name: affix.name,
      value: affix.value + Math.floor(Math.random() * 20),
      unit: affix.unit,
      type: 'additive' as const
    }));

    acc[slot] = {
      id: `eq-${slot}-${charClass}-${Math.random().toString(36).substr(2, 9)}`,
      name: equipmentNames[slot][idx],
      slot,
      rarity,
      level: 100,
      affixes,
      icon: `icons/${slot}.svg`
    };
    return acc;
  }, {} as Record<EquipmentSlot, EquipmentItem>);
};

// 生成模拟技能
const createMockSkills = (): { slot: string; skillId: string; skillName: string; icon: string }[] => {
  const skillIcons = ['⚔️', '🛡️', '🔥', '❄️', '⚡', '💀', '🌪️', '🌊'];
  const skillNames = ['旋风斩', '冰冻新星', '暴风雪', '骨矛', '裂地击', '暗影步', '火球术', '召唤亡灵'];
  
  return ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'].map((slot, idx) => ({
    slot,
    skillId: `skill-${idx + 1}`,
    skillName: skillNames[idx % skillNames.length],
    icon: skillIcons[idx % skillIcons.length]
  }));
};

// Mock构筑数据
export const mockBuilds: Build[] = [
  // 野蛮人配置
  {
    id: 'build-barbarian-1',
    author: '文台L',
    authorLevel: 150,
    authorRank: 1,
    name: '【文台L】浴血旋风150',
    description: '后期/速刷/冲层 - S14赛季极限旋风斩BD，轻松突破150层',
    characterClass: 'barbarian',
    season: 's14',
    equipment: createMockEquipment('barbarian'),
    skills: createMockSkills(),
    likes: 8214,
    downloads: 5021,
    views: 25000,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    tags: ['后期', '速刷', '冲层'],
    rating: 4.9,
    playStyle: '旋风斩',
    difficulty: '中等'
  },
  {
    id: 'build-barbarian-2',
    author: '暗黑破坏神',
    authorLevel: 145,
    authorRank: 5,
    name: '【暗黑破坏神】狂战士碾压',
    description: 'S14赛季狂战士流派，高爆发高生存',
    characterClass: 'barbarian',
    season: 's14',
    equipment: createMockEquipment('barbarian'),
    skills: createMockSkills(),
    likes: 3191,
    downloads: 4011,
    views: 18000,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    tags: ['后期', '爆发'],
    rating: 4.7,
    playStyle: '狂战士',
    difficulty: '困难'
  },
  // 死灵法师配置
  {
    id: 'build-necro-1',
    author: '李王孙',
    authorLevel: 148,
    authorRank: 2,
    name: '【李王孙】S14巫师大合集',
    description: '包含多种死灵法师主流BD，新手入门必看',
    characterClass: 'necromancer',
    season: 's14',
    equipment: createMockEquipment('necromancer'),
    skills: createMockSkills(),
    likes: 5835,
    downloads: 3276,
    views: 22000,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    tags: ['合集', '新手'],
    rating: 4.8,
    playStyle: '召唤流',
    difficulty: '简单'
  },
  {
    id: 'build-necro-2',
    author: '泽泽没烦恼',
    authorLevel: 142,
    authorRank: 10,
    name: '【泽泽】末日核弹',
    description: '全屏爆爆爆！更新极限冲层版-145层',
    characterClass: 'necromancer',
    season: 's14',
    equipment: createMockEquipment('necromancer'),
    skills: createMockSkills(),
    likes: 3528,
    downloads: 2376,
    views: 15000,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    tags: ['后期', '冲层'],
    rating: 4.6,
    playStyle: '骨矛',
    difficulty: '困难'
  },
  // 法师配置
  {
    id: 'build-sorc-1',
    author: 'Lion丶',
    authorLevel: 150,
    authorRank: 3,
    name: '【Lion】雷暴索敌',
    description: '狼手柄玩家福利-复制',
    characterClass: 'sorc',
    season: 's14',
    equipment: createMockEquipment('sorc'),
    skills: createMockSkills(),
    likes: 2856,
    downloads: 1876,
    views: 12000,
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    tags: ['雷系', '速刷'],
    rating: 4.8,
    playStyle: '雷暴',
    difficulty: '中等'
  },
  {
    id: 'build-sorc-2',
    author: '冰法大帝',
    authorLevel: 146,
    authorRank: 7,
    name: '【冰法大帝】极致冰冻',
    description: '控制与输出完美结合，140层速刷',
    characterClass: 'sorc',
    season: 's14',
    equipment: createMockEquipment('sorc'),
    skills: createMockSkills(),
    likes: 2156,
    downloads: 1523,
    views: 10000,
    createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    tags: ['冰系', '控制'],
    rating: 4.7,
    playStyle: '冰法',
    difficulty: '中等'
  },
  // 德鲁伊配置
  {
    id: 'build-druid-1',
    author: '森林之子',
    authorLevel: 144,
    authorRank: 8,
    name: '【森林之子】狼人狂怒',
    description: 'S14狼人形态极限输出BD',
    characterClass: 'druid',
    season: 's14',
    equipment: createMockEquipment('druid'),
    skills: createMockSkills(),
    likes: 1876,
    downloads: 1234,
    views: 8000,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    tags: ['变形', '近战'],
    rating: 4.5,
    playStyle: '狼人',
    difficulty: '中等'
  },
  // 游侠配置
  {
    id: 'build-rogue-1',
    author: '暗影猎手',
    authorLevel: 147,
    authorRank: 6,
    name: '【暗影猎手】毒刃爆发',
    description: '剧毒之刃流，DOT伤害拉满',
    characterClass: 'rogue',
    season: 's14',
    equipment: createMockEquipment('rogue'),
    skills: createMockSkills(),
    likes: 2345,
    downloads: 1678,
    views: 9000,
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    tags: ['DOT', '速刷'],
    rating: 4.6,
    playStyle: '毒刃',
    difficulty: '中等'
  },
  // 魂灵师配置
  {
    id: 'build-spiritborn-1',
    author: '灵魂行者',
    authorLevel: 143,
    authorRank: 12,
    name: '【灵魂行者】元素掌控',
    description: '风雷电三系精通，元素伤害最大化',
    characterClass: 'spiritborn',
    season: 's14',
    equipment: createMockEquipment('spiritborn'),
    skills: createMockSkills(),
    likes: 1567,
    downloads: 987,
    views: 6000,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    tags: ['元素', '爆发'],
    rating: 4.4,
    playStyle: '元素',
    difficulty: '困难'
  },
  // 圣骑士配置
  {
    id: 'build-paladin-1',
    author: '圣光使者',
    authorLevel: 149,
    authorRank: 4,
    name: '【圣光使者】神圣裁决',
    description: '圣光普照，正义降临，145层稳过',
    characterClass: 'paladin',
    season: 's14',
    equipment: createMockEquipment('paladin'),
    skills: createMockSkills(),
    likes: 3456,
    downloads: 2456,
    views: 14000,
    createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    tags: ['神圣', '坦克'],
    rating: 4.8,
    playStyle: '神圣',
    difficulty: '简单'
  },
  // 术士配置
  {
    id: 'build-warlock-1',
    author: '地狱领主',
    authorLevel: 141,
    authorRank: 15,
    name: '【地狱领主】火焰统治',
    description: '燃烧一切的火焰术士BD',
    characterClass: 'warlock',
    season: 's14',
    equipment: createMockEquipment('warlock'),
    skills: createMockSkills(),
    likes: 1234,
    downloads: 876,
    views: 5000,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    tags: ['火焰', 'AOE'],
    rating: 4.3,
    playStyle: '火法',
    difficulty: '中等'
  }
];

// 根据筛选条件获取构筑列表
export const getBuilds = (filters: {
  season: string;
  characterClass: CharacterClass | 'all';
  sortBy: 'default' | 'popular' | 'latest' | 'rating';
}): Build[] => {
  let result = [...mockBuilds];

  // 赛季筛选
  if (filters.season && filters.season !== 'all') {
    result = result.filter(b => b.season === filters.season);
  }

  // 职业筛选
  if (filters.characterClass && filters.characterClass !== 'all') {
    result = result.filter(b => b.characterClass === filters.characterClass);
  }

  // 排序
  switch (filters.sortBy) {
    case 'popular':
      result.sort((a, b) => b.likes - a.likes);
      break;
    case 'latest':
      result.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'rating':
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default:
      break;
  }

  return result;
};

// 根据ID获取构筑详情
export const getBuildById = (id: string): Build | undefined => {
  return mockBuilds.find(b => b.id === id);
};
