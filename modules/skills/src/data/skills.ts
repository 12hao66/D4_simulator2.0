import { SkillTree, CharacterClass } from '../types';

const classIcons: Record<CharacterClass, string> = {
  barbarian: '⚔️',
  necromancer: '💀',
  sorc: '🔮',
  wizard: '⏳',
  druid: '🐺',
  rogue: '🗡️',
  ranger: '🏹',
  spiritborn: '✨',
  paladin: '🛡️',
  warlock: '😈'
};

const skillTypeColors: Record<string, string> = {
  basic: '#4a90d9',
  core: '#e67e22',
  defensive: '#27ae60',
  ultimate: '#9b59b6',
  passive: '#7f8c8d',
  key: '#c9a962'
};

const createDiabloSkillTree = (characterClass: CharacterClass): SkillTree => {
  const centerX = 500;
  const centerY = 500;

  const nodes: any[] = [];
  
  // 中心核心节点
  nodes.push({
    id: `${characterClass}-core`,
    name: '核心',
    icon: classIcons[characterClass],
    position: { x: centerX, y: centerY },
    requires: [] as string[],
    rank: 0,
    maxRank: 1,
    effects: [],
    category: '核心',
    characterClass,
    type: 'key' as const,
    isKeyNode: true,
    color: '#8b0000'
  });

  // 6个核心大点（垂直排列，连接到中心）
  const keyNodeConfigs = [
    { name: '基础技能', type: 'basic', icon: '⚡', y: 150 },
    { name: '核心技能', type: 'core', icon: '🔥', y: 300 },
    { name: '防御技能', type: 'defensive', icon: '🛡️', y: 450 },
    { name: '进攻技能', type: 'core', icon: '⚔️', y: 600 },
    { name: '终极技能', type: 'ultimate', icon: '⭐', y: 750 },
    { name: '被动技能', type: 'passive', icon: '💎', y: 900 }
  ];

  keyNodeConfigs.forEach((config, index) => {
    const keyId = `${characterClass}-key-${index}`;
    nodes.push({
      id: keyId,
      name: config.name,
      icon: config.icon,
      position: { x: centerX, y: config.y },
      requires: index === 0 ? [`${characterClass}-core`] : [`${characterClass}-key-${index - 1}`],
      rank: 0,
      maxRank: 1,
      effects: [],
      category: config.name,
      characterClass,
      type: 'key' as const,
      isKeyNode: true,
      color: '#c9a962'
    });

    // 每个核心大点挂5个技能点
    const skillCount = 5;
    const skillNames = ['技能A', '技能B', '技能C', '技能D', '技能E'];
    const skillIcons = ['🗡️', '🛡️', '⚔️', '🌀', '💢'];
    
    for (let i = 0; i < skillCount; i++) {
      const skillId = `${characterClass}-${config.type}-skill-${index}-${i}`;
      const offsetX = (i - 2) * 100;
      nodes.push({
        id: skillId,
        name: skillNames[i],
        icon: skillIcons[i],
        position: { x: centerX + offsetX, y: config.y + 80 },
        requires: [keyId],
        rank: 0,
        maxRank: 15,
        effects: [
          { id: `${skillId}-dmg`, name: '伤害', description: '基础伤害', value: 80 + i * 15, unit: '%' }
        ],
        category: config.name,
        characterClass,
        type: config.type,
        color: skillTypeColors[config.type]
      });

      // 每个技能点有3个分支
      const branches = ['分支1', '分支2', '分支3'];
      const branchIcons = ['🌑', '🌒', '🌓'];
      const leafCounts = [2, 2, 3];
      
      for (let b = 0; b < 3; b++) {
        const branchId = `${skillId}-branch-${b}`;
        const branchX = centerX + offsetX + (b - 1) * 70;
        nodes.push({
          id: branchId,
          name: branches[b],
          icon: branchIcons[b],
          position: { x: branchX, y: config.y + 160 },
          requires: [skillId],
          rank: 0,
          maxRank: 5,
          effects: [
            { id: `${branchId}-effect`, name: '强化', description: '技能强化', value: 10 + b * 5, unit: '%' }
          ],
          category: config.name,
          characterClass,
          type: config.type,
          color: skillTypeColors[config.type]
        });

        // 叶子分支节点
        const leafNames = ['叶子A', '叶子B', '叶子C'];
        const leafIcons = ['✦', '✧', '✩'];
        
        for (let l = 0; l < leafCounts[b]; l++) {
          const leafId = `${branchId}-leaf-${l}`;
          const leafX = branchX + (l - (leafCounts[b] - 1) / 2) * 50;
          nodes.push({
            id: leafId,
            name: leafNames[l],
            icon: leafIcons[l],
            position: { x: leafX, y: config.y + 240 },
            requires: [branchId],
            rank: 0,
            maxRank: 3,
            effects: [
              { id: `${leafId}-effect`, name: '精通', description: '精通效果', value: 5 + l * 3, unit: '%' }
            ],
            category: config.name,
            characterClass,
            type: 'passive' as const,
            color: skillTypeColors['passive']
          });
        }
      }
    }
  });

  return {
    id: `${characterClass}-tree`,
    name: `${characterClass}技能树`,
    characterClass,
    nodes
  };
};

export const getSkillTree = (characterClass: CharacterClass): SkillTree => {
  return createDiabloSkillTree(characterClass);
};

export const classOptions: { value: CharacterClass; label: string }[] = [
  { value: 'barbarian', label: '野蛮人' },
  { value: 'necromancer', label: '死灵法师' },
  { value: 'sorc', label: '法师' },
  { value: 'wizard', label: '巫师' },
  { value: 'druid', label: '德鲁伊' },
  { value: 'rogue', label: '游侠' },
  { value: 'spiritborn', label: '术士' },
  { value: 'paladin', label: '圣骑士' },
  { value: 'warlock', label: '灵巫' }
];
