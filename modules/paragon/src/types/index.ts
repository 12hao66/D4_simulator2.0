// 节点类型（7种）：
// paragon - 巅峰等级起始节点
// link - 面板链接关口
// normal - 普通节点
// magic - 魔法节点
// rare - 稀有节点
// legendary - 传奇节点
// socket - 雕纹插槽
export type ParagonNodeType = 'paragon' | 'link' | 'normal' | 'magic' | 'rare' | 'legendary' | 'socket';

// 边的方向
export type EdgeDirection = 'top' | 'bottom' | 'left' | 'right';

// 盘的旋转角度
export type RotationAngle = 0 | 90 | 180 | 270;

// 节点属性效果
export interface ParagonEffect {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
}

// 盘的连接关系
export interface BoardConnection {
  fromBoardIndex: number;        // 源盘索引
  fromEdge: EdgeDirection;       // 源盘链接边
  toBoardId: string;             // 目标盘ID
  toEdge: EdgeDirection;          // 目标盘入口边
  rotation: RotationAngle;       // 目标盘旋转角度
  offsetX: number;                // 目标盘X偏移（像素）
  offsetY: number;                // 目标盘Y偏移（像素）
}

// 链接链（从主盘开始的所有连接）
export interface BoardLinkChain {
  connections: BoardConnection[];
}

// 稀有节点的条件加成
export interface ParagonBonus {
  condition: string;
  description: string;
  currentValue: number;
  requiredValue: number;
  bonusEffect: string;
}

// 节点接口
export interface ParagonNode {
  id: string;
  type: ParagonNodeType;
  name: string;
  icon: string; // 可以是emoji或图片路径
  image?: string; // 图片URL（可选，用于显示图片）
  x: number;
  y: number;
  effects: ParagonEffect[];
  bonuses?: ParagonBonus[];
  connections: string[];
  isEntryPoint?: boolean;
  description?: string; // 节点描述（传奇节点使用）
}

export interface Glyph {
  id: string;
  name: string;
  icon: string;
  type: 'offensive' | 'defensive' | 'utility';
  description: string;
  effect: ParagonEffect;
  radius: number;
}

export interface ParagonBoard {
  id: string;
  name: string;
  icon: string;
  nodes: ParagonNode[];
  centerSlot: {
    x: number;
    y: number;
    glyph: Glyph | null;
  };
  entryPoints: string[];
}

export interface ParagonState {
  boards: ParagonBoard[];
  availableBoards: ParagonBoard[];
  activeBoardIndex: number;
  unlockedNodes: string[];
  selectedNode: string | null;
  selectedGlyph: Glyph | null;
  zoom: number;
  position: { x: number; y: number };
  totalPoints: number;
  spentPoints: number;
  // 巅峰盘链接链
  linkChain: BoardLinkChain;
  // 激活的链接点（解锁后才能连接下一个盘）
  activatedLinkPoints: string[];
}
