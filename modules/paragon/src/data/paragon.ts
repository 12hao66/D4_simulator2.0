import { ParagonBoard, ParagonNode, Glyph } from '../types';

export interface BoardJson {
  id: string;
  name: string;
  nodes: {
    id: string;
    type: 'paragon' | 'link' | 'normal' | 'magic' | 'rare' | 'legendary' | 'socket';
    x: number;
    y: number;
    effects?: string[];
    isEntryPoint?: boolean;
  }[];
  connections: string[][];
}

const GRID_SPACING = 32;

const colRowToXY = (col: number, row: number): { x: number; y: number } => {
  const centerX = 10 * GRID_SPACING;
  const centerY = 10 * GRID_SPACING;
  return {
    x: col * GRID_SPACING - centerX,
    y: row * GRID_SPACING - centerY
  };
};

const boardFiles = [
  'core.json',
  'offensive.json', 
  'defensive.json',
  'utility.json',
  'warrior.json',
  'arcane.json',
  'flame.json',
  'cold.json',
  'poison.json',
  'shadow.json',
  'lightning.json'
];

const boardIdToName: Record<string, string> = {
  'core': '核心',
  'offensive': '进攻',
  'defensive': '防御',
  'utility': '通用',
  'warrior': '战士',
  'arcane': '奥术',
  'flame': '火焰',
  'cold': '冰霜',
  'poison': '毒素',
  'shadow': '暗影',
  'lightning': '闪电'
};

const boardIdToIcon: Record<string, string> = {
  'core': '⭐',
  'offensive': '⚔️',
  'defensive': '🛡️',
  'utility': '🔧',
  'warrior': '💪',
  'arcane': '✨',
  'flame': '🔥',
  'cold': '❄️',
  'poison': '☠️',
  'shadow': '🌙',
  'lightning': '⚡'
};

// 根据节点类型获取图标
const getNodeIcon = (type: string): string => {
  switch (type) {
    case 'paragon': return '⭐';
    case 'link': return '🔗';
    case 'normal': return '●';
    case 'magic': return '◈';
    case 'rare': return '◆';
    case 'legendary': return '★';
    case 'socket': return '🔘';
    default: return '●';
  }
};

export const getParagonBoards = async (): Promise<{ initial: ParagonBoard; available: ParagonBoard[] }> => {
  const boards: ParagonBoard[] = [];

  for (const fileName of boardFiles) {
    const boardId = fileName.replace('.json', '');
    try {
      const response = await fetch(`/paragon/data/${fileName}`);
      const boardJson: BoardJson = await response.json();
      
      const nodes: ParagonNode[] = boardJson.nodes.map(nodeJson => {
        const pos = colRowToXY(nodeJson.x, nodeJson.y);
        const effects = nodeJson.effects || [];
        const nodeType = nodeJson.type as any;
        return {
          id: nodeJson.id,
          type: nodeType,
          name: effects.join(', ') || (nodeType === 'link' ? '面板链接关口' : nodeType === 'paragon' ? '巅峰等级起始节点' : '节点'),
          icon: getNodeIcon(nodeType),
          x: pos.x,
          y: pos.y,
          effects: effects.map(effect => ({
            id: effect.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
            name: effect,
            description: effect,
            value: 0,
            unit: ''
          })),
          connections: [],
          isEntryPoint: nodeJson.isEntryPoint || nodeType === 'link' || nodeType === 'paragon'
        };
      });

      const connectionMap = new Map<string, Set<string>>();
      boardJson.connections.forEach(([from, to]) => {
        if (!connectionMap.has(from)) connectionMap.set(from, new Set());
        if (!connectionMap.has(to)) connectionMap.set(to, new Set());
        connectionMap.get(from)!.add(to);
        connectionMap.get(to)!.add(from);
      });

      nodes.forEach(node => {
        node.connections = Array.from(connectionMap.get(node.id) || []);
      });

      const centerPos = colRowToXY(10, 10);
      
      boards.push({
        id: boardJson.id,
        name: boardJson.name || boardIdToName[boardId] || boardId,
        icon: boardIdToIcon[boardId] || '',
        nodes,
        centerSlot: {
          x: centerPos.x,
          y: centerPos.y,
          glyph: null
        },
        entryPoints: nodes.filter(n => n.isEntryPoint).map(n => n.id)
      });
    } catch (error) {
      console.error(`Failed to load board ${fileName}:`, error);
    }
  }

  return {
    initial: boards[0] || createDefaultCoreBoard(),
    available: boards.slice(1)
  };
};

const createDefaultCoreBoard = (): ParagonBoard => {
  const nodes: ParagonNode[] = [
    {
      id: 'core-start',
      type: 'paragon',
      name: '巅峰等级',
      icon: '',
      x: 0,
      y: 0,
      effects: [],
      connections: ['core-path-1'],
      isEntryPoint: true
    },
    {
      id: 'core-path-1',
      type: 'normal',
      name: '+2 力量',
      icon: '',
      x: 0,
      y: -32,
      effects: [{ id: 'str', name: '+2 力量', description: '+2 力量', value: 2, unit: '点' }],
      connections: ['core-start', 'core-link-top'],
      isEntryPoint: false
    },
    {
      id: 'core-link-top',
      type: 'link',
      name: '链接',
      icon: '',
      x: 0,
      y: -64,
      effects: [],
      connections: ['core-path-1'],
      isEntryPoint: true
    }
  ];

  return {
    id: 'core',
    name: '核心',
    icon: '',
    nodes,
    centerSlot: { x: 0, y: 0, glyph: null },
    entryPoints: ['core-start', 'core-link-top']
  };
};

export const glyphs: Glyph[] = [
  { id: 'glyph-1', name: '狂暴', icon: '🔥', type: 'offensive', description: '增加暴击伤害', effect: { id: 'crit-dmg', name: '暴击伤害', description: '增加暴击伤害', value: 15, unit: '%' }, radius: 2 },
  { id: 'glyph-2', name: '守护', icon: '🛡️', type: 'defensive', description: '增加护甲值', effect: { id: 'armor', name: '护甲', description: '增加护甲', value: 100, unit: '点' }, radius: 2 },
  { id: 'glyph-3', name: '迅捷', icon: '⚡', type: 'utility', description: '增加移动速度', effect: { id: 'move-speed', name: '移动速度', description: '增加移动速度', value: 10, unit: '%' }, radius: 1 },
  { id: 'glyph-4', name: '烈焰', icon: '🔥', type: 'offensive', description: '增加火焰伤害', effect: { id: 'fire-dmg', name: '火焰伤害', description: '增加火焰伤害', value: 20, unit: '%' }, radius: 2 },
  { id: 'glyph-5', name: '寒冰', icon: '❄️', type: 'offensive', description: '增加冰冷伤害', effect: { id: 'cold-dmg', name: '冰冷伤害', description: '增加冰冷伤害', value: 18, unit: '%' }, radius: 2 },
  { id: 'glyph-6', name: '暗影', icon: '🌙', type: 'offensive', description: '增加暗影伤害', effect: { id: 'shadow-dmg', name: '暗影伤害', description: '增加暗影伤害', value: 18, unit: '%' }, radius: 2 },
  { id: 'glyph-7', name: '生命', icon: '❤️', type: 'defensive', description: '增加最大生命值', effect: { id: 'max-hp', name: '最大生命', description: '增加最大生命值', value: 200, unit: '点' }, radius: 1 },
  { id: 'glyph-8', name: '再生', icon: '💚', type: 'defensive', description: '增加生命恢复速度', effect: { id: 'hp-regen', name: '生命恢复', description: '增加生命恢复', value: 5, unit: '点/秒' }, radius: 1 },
  { id: 'glyph-9', name: '智慧', icon: '💡', type: 'utility', description: '增加技能伤害', effect: { id: 'skill-dmg', name: '技能伤害', description: '增加技能伤害', value: 10, unit: '%' }, radius: 2 },
  { id: 'glyph-10', name: '力量', icon: '💪', type: 'offensive', description: '增加力量属性', effect: { id: 'strength', name: '力量', description: '增加力量', value: 20, unit: '点' }, radius: 2 },
  { id: 'glyph-11', name: '敏捷', icon: '🏃', type: 'utility', description: '增加敏捷属性', effect: { id: 'agility', name: '敏捷', description: '增加敏捷', value: 20, unit: '点' }, radius: 2 },
  { id: 'glyph-12', name: '智力', icon: '🧠', type: 'offensive', description: '增加智力属性', effect: { id: 'intelligence', name: '智力', description: '增加智力', value: 20, unit: '点' }, radius: 2 }
];

export const getGlyphs = (): Glyph[] => glyphs;
