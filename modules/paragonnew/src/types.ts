// 巅峰盘节点类型
export type NodeType = 'normal' | 'magic' | 'rare' | 'legendary' | 'gate' | 'socket' | 'start';

// 网格节点
export interface GridNode {
  id: string;
  type: NodeType;
  // 中英文名称
  name?: string;
  nameEn?: string;
  nameCn?: string;
  // 中英文描述
  desc?: string;
  descEn?: string;
  descCn?: string;
  // 标签
  tags?: string[];
  // 雕纹数值（用于稀有节点）
  tierValues?: number[];
  // 节点值（用于计算属性）
  value?: number;
}

// Gate 节点位置
export interface GatePosition {
  row: number;
  col: number;
  id: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

// 巅峰盘
export interface ParagonBoard {
  id: string;
  name: string;
  rows: number;
  cols: number;
  grid: (GridNode | null)[][];
  gates: GatePosition[];
  startNodes: GatePosition[];
  gatePositions: {
    top: GatePosition[];
    bottom: GatePosition[];
    left: GatePosition[];
    right: GatePosition[];
  };
}

// 雕纹
export interface Glyph {
  id: string;
  name: string;
  nameEn?: string;
  nameCn?: string;
  // 描述
  desc?: string;
  descCn?: string;
  // 门槛要求
  threshold?: string;
  thresholdCn?: string;
  // 满级被动效果
  bonus?: string;
  bonusEn?: string;
  bonusCn?: string;
  // 描述模板
  descTemplate?: string;
  // 等级数值数组（21级）
  tiers?: number[];
  tags?: string[];
  levels?: number[];
}

// 传奇节点
export interface LegendaryNode {
  id: string;
  name: string;
  nameEn?: string;
  nameCn?: string;
  desc?: string;
  descEn?: string;
  descCn?: string;
  tags?: string[];
}

// 巅峰盘连接关系
export interface BoardConnection {
  from: {
    boardId: string;
    boardName: string;
    row: number;
    col: number;
  };
  to: {
    boardId: string;
    boardName: string;
    row: number;
    col: number;
  };
  direction: 'horizontal' | 'vertical';
}

// 完整数据
export interface ParagonData {
  version: string;
  className: string;
  classNameCn?: string;
  language?: string;
  boards: ParagonBoard[];
  glyphs: Glyph[];
  legendaryNodes: LegendaryNode[];
  connections: BoardConnection[];
  nodeIndex: Record<string, GridNode>;
}

// 语言类型
export type Language = 'zhCN' | 'enUS';

// ============ 模拟器状态相关类型 ============

// 节点分配状态
export interface NodeAllocation {
  nodeId: string;
  boardId: string;
  row: number;
  col: number;
  points: number;
}

// 雕文装备状态
export interface GlyphEquip {
  glyphId: string;
  rank: number;               // 1-21
}

// 巅峰盘实例（模拟器中实际使用的盘）
export interface BoardInstance {
  boardIndex: number;           // 盘面索引（0-4，0是起始盘）
  boardId: string;               // 对应的 ParagonBoard id
  gridLocation: string;          // 网格位置（如 "5", "U" 等）
  rotation: 0 | 90 | 180 | 270; // 旋转角度
  equipIndex: number;            // 装备索引（1-9，决定稀有节点属性需求）
  equippedGlyph: GlyphEquip | null;
  // 入口Gate信息（被链接的那个Gate，变成入口节点）
  entryGate?: {
    row: number;
    col: number;
  };
}

// 雕文效果半径内的节点
export interface GlyphEffectNode {
  boardId: string;
  row: number;
  col: number;
  bonus: number;  // 雕文提供的额外加成
}

// 玩家属性统计
export interface PlayerAttributes {
  Strength: number;
  Intelligence: number;
  Willpower: number;
  Dexterity: number;
}

// 巅峰盘连接状态
export interface BoardConnectionState {
  fromBoardIndex: number;
  fromGateRow: number;
  fromGateCol: number;
  toBoardIndex: number;
  toGateRow: number;
  toGateCol: number;
}

// 节点属性需求
export interface NodeRequirement {
  type: AttributeType;
  value: number;
}

// 门槛要求配置
export interface ThresholdRequirements {
  [className: string]: string[];
}

// 扩展 GridNode 添加属性需求
export interface GridNode {
  id: string;
  type: NodeType;
  // 中英文名称
  name?: string;
  nameEn?: string;
  nameCn?: string;
  // 中英文描述
  desc?: string;
  descEn?: string;
  descCn?: string;
  // 标签
  tags?: string[];
  // 雕纹数值（用于稀有节点）
  tierValues?: number[];
  // 节点值（用于计算属性）
  value?: number;
  // 属性需求
  requirements?: NodeRequirement[];
  // 门槛要求（用于稀有节点的加成效果）
  thresholdRequirements?: ThresholdRequirements;
}

// 模拟器状态
export interface ParagonSimulatorState {
  // 总点数
  totalPoints: number;
  // 已用点数
  usedPoints: number;
  // 当前连接的盘面实例（最多5个：起始盘+4个）
  connectedBoards: BoardInstance[];
  // 节点分配状态 Map<`${boardId}_${row}_${col}`, NodeAllocation>
  allocations: Map<string, NodeAllocation>;
}

// 节点类型映射
export const NODE_TYPE_LABELS: Record<NodeType, { zhCN: string; enUS: string }> = {
  start: { zhCN: '巅峰起点', enUS: 'Paragon Start' },
  gate: { zhCN: '面板连接关口', enUS: 'Board Attachment Gate' },
  normal: { zhCN: '普通节点', enUS: 'Normal Node' },
  magic: { zhCN: '魔法节点', enUS: 'Magic Node' },
  rare: { zhCN: '稀有节点', enUS: 'Rare Node' },
  legendary: { zhCN: '传奇节点', enUS: 'Legendary Node' },
  socket: { zhCN: '雕纹槽位', enUS: 'Glyph Socket' },
};

export const NODE_TYPE_COLORS: Record<NodeType, string> = {
  start: '#d9c9a8',
  gate: '#e8833a',
  normal: '#6b6052',
  magic: '#3d6b8a',
  rare: '#c9a13b',
  legendary: '#b8362a',
  socket: '#8a4a9e',
};

// 已分配状态的颜色
export const ALLOCATED_COLORS: Record<NodeType, string> = {
  start: '#ffffff',
  gate: '#ffaa00',
  normal: '#8b7355',
  magic: '#4a8fc4',
  rare: '#ffd700',
  legendary: '#ff4444',
  socket: '#b06ec9',
};

// 节点尺寸配置
export const NODE_SIZE = 36;
export const NODE_GAP = 4;
export const CELL_SIZE = NODE_SIZE + NODE_GAP;

// 网格坐标系统（7×5 布局）
// 注意：这里重新定义为边挨边显示的坐标系统
// 相邻位置间距必须 >= 盘面尺寸（840像素），确保不重叠
export const PARAGON_GRID_COORDINATES: Record<string, [number, number]> = {
  // 第一行（最上方）
  'V': [-1680, -4200], 'E': [-840, -4200], 'F': [0, -4200], 'G': [840, -4200], 'H': [1680, -4200], 'I': [2520, -4200], 'U': [3360, -4200],
  // 第二行
  'W': [-1680, -3360], 'D': [-840, -3360], 'J': [0, -3360], 'K': [840, -3360], 'L': [1680, -3360], 'M': [2520, -3360], 'T': [3360, -3360],
  // 第三行
  'X': [-1680, -2520], 'C': [-840, -2520], '7': [0, -2520], '8': [840, -2520], '9': [1680, -2520], 'N': [2520, -2520], 'S': [3360, -2520],
  // 第四行（包含起始盘位置'5'）
  'Y': [-1680, -1680], 'B': [-840, -1680], '4': [0, -1680], '5': [840, -1680], '6': [1680, -1680], 'O': [2520, -1680], 'R': [3360, -1680],
  // 第五行（最下方）
  'Z': [-1680, -840], 'A': [-840, -840], '1': [0, -840], '2': [840, -840], '3': [1680, -840], 'P': [2520, -840], 'Q': [3360, -840],
};

// 盘面位置列表（用于选择连接位置）
export const BOARD_LOCATIONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// 属性类型
export type AttributeType = 'Strength' | 'Intelligence' | 'Willpower' | 'Dexterity';

// 节点属性映射
export const NODE_ATTRIBUTE_MAP: Record<string, AttributeType[]> = {
  'Strength': ['Strength'],
  'Intelligence': ['Intelligence'],
  'Willpower': ['Willpower'],
  'Dexterity': ['Dexterity'],
  'Generic_Gate': ['Strength', 'Intelligence', 'Willpower', 'Dexterity'],
};
