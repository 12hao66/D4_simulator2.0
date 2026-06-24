import { create } from 'zustand';
import { ParagonState, Glyph, ParagonBoard, ParagonNode, EdgeDirection, RotationAngle, BoardConnection } from '../types';
import { getParagonBoards, getGlyphs } from '../data/paragon';

// 网格间距常量（与 paragon.ts 保持一致）
const GRID_SPACING = 32;

// 21x21网格的尺寸
const BOARD_SIZE = 21;

// 计算两个盘之间的偏移量
const calculateBoardOffset = (
  fromEdge: EdgeDirection
): { offsetX: number; offsetY: number } => {
  const boardPixelSize = BOARD_SIZE * GRID_SPACING;

  // 根据边计算偏移
  switch (fromEdge) {
    case 'top':
      return { offsetX: 0, offsetY: -boardPixelSize };
    case 'bottom':
      return { offsetX: 0, offsetY: boardPixelSize };
    case 'left':
      return { offsetX: -boardPixelSize, offsetY: 0 };
    case 'right':
      return { offsetX: boardPixelSize, offsetY: 0 };
  }
};

// 旋转节点坐标
const rotateNodeCoordinate = (x: number, y: number, rotation: RotationAngle): { x: number; y: number } => {
  switch (rotation) {
    case 90:
      return { x: -y, y: x };
    case 180:
      return { x: -x, y: -y };
    case 270:
      return { x: y, y: -x };
    default:
      return { x, y };
  }
};

// 旋转节点（应用于已链接的盘）
const rotateBoardNodes = (nodes: ParagonNode[], rotation: RotationAngle): ParagonNode[] => {
  if (rotation === 0) return nodes;

  return nodes.map(node => {
    const rotated = rotateNodeCoordinate(node.x, node.y, rotation);
    return { ...node, x: rotated.x, y: rotated.y };
  });
};

// 获取旋转后的下一条边
const getNextEdge = (edge: EdgeDirection, rotation: RotationAngle): EdgeDirection => {
  const edges: EdgeDirection[] = ['top', 'right', 'bottom', 'left'];
  let index = edges.indexOf(edge);
  const steps = rotation / 90;
  index = (index + steps) % 4;
  return edges[index];
};

// 计算从入口点到已解锁节点的路径
const calculateHighlightedPaths = (unlockedNodes: string[], boards: ParagonBoard[], activeBoardIndex: number): string[][] => {
  if (unlockedNodes.length === 0) return [];
  
  const board = boards[activeBoardIndex];
  const entryPoints = board.entryPoints;
  
  // 找到所有入口点中已解锁的
  const unlockedEntryPoints = entryPoints.filter(id => unlockedNodes.includes(id));
  
  if (unlockedEntryPoints.length === 0) return [];
  
  const paths: string[][] = [];
  
  // 为每个入口点计算路径
  unlockedEntryPoints.forEach(entryId => {
    const path: string[] = [entryId];
    const visited = new Set<string>([entryId]);
    
    // 使用BFS找到所有从入口点可达的已解锁节点
    const queue = [entryId];
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentNode = board.nodes.find(n => n.id === currentId);
      
      if (!currentNode) continue;
      
      // 检查所有相邻节点
      currentNode.connections.forEach(connectedId => {
        if (!visited.has(connectedId) && unlockedNodes.includes(connectedId)) {
          visited.add(connectedId);
          queue.push(connectedId);
          path.push(connectedId);
        }
      });
    }
    
    if (path.length > 1) {
      paths.push(path);
    }
  });
  
  return paths;
};

// 计算可点击的节点（与已解锁节点相邻的未解锁节点）
const calculateClickableNodes = (unlockedNodes: string[], boards: ParagonBoard[], activeBoardIndex: number): string[] => {
  const board = boards[activeBoardIndex];
  
  // 找到所有未解锁的节点
  const lockedNodes = board.nodes.filter(n => !unlockedNodes.includes(n.id));
  
  const clickableNodes: string[] = [];
  
  lockedNodes.forEach(node => {
    // 入口点或链接点可以直接解锁
    if (node.isEntryPoint || node.type === 'link') {
      clickableNodes.push(node.id);
      return;
    }
    
    // 检查是否与已解锁节点相邻
    const isAdjacent = unlockedNodes.some(unlockedId => {
      const unlockedNode = board.nodes.find(n => n.id === unlockedId);
      if (!unlockedNode) return false;
      
      const dx = Math.abs(node.x - unlockedNode.x);
      const dy = Math.abs(node.y - unlockedNode.y);
      
      // 只有上下左右相邻才算（距离 <= GRID_SPACING）
      return dx <= GRID_SPACING && dy <= GRID_SPACING && (dx === 0 || dy === 0);
    });
    
    if (isAdjacent) {
      clickableNodes.push(node.id);
    }
  });
  
  return clickableNodes;
};

// 重新计算节点连接关系
const recalculateConnections = (nodes: ParagonNode[]): ParagonNode[] => {
  return nodes.map(node => {
    const connected = nodes.filter(other => {
      if (other.id === node.id) return false;
      
      const dx = Math.abs(node.x - other.x);
      const dy = Math.abs(node.y - other.y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 连接阈值：GRID_SPACING * 1.42 ≈ 51（覆盖相邻和对角线）
      return distance <= GRID_SPACING * 1.42;
    });
    
    return { ...node, connections: connected.map(n => n.id) };
  });
};

interface ParagonActions {
  selectNode: (nodeId: string | null) => void;
  toggleNode: (nodeId: string) => void;
  setZoom: (zoom: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
  resetView: () => void;
  loadBoards: () => void;
  switchBoard: (index: number) => void;
  selectBoard: (board: ParagonBoard) => void;
  deselectBoard: (boardIndex: number) => void;
  selectGlyph: (glyph: Glyph | null) => void;
  equipGlyph: (glyph: Glyph) => void;
  unequipGlyph: () => void;
  setTotalPoints: (points: number) => void;
  // 链接相关
  connectBoard: (fromBoardIndex: number, fromEdge: EdgeDirection, toBoardId: string, toEdge: EdgeDirection, rotation: RotationAngle) => void;
  disconnectBoard: (boardIndex: number) => void;
  rotateBoard: (boardIndex: number, rotation: RotationAngle) => void;
  getBoardOffset: (boardIndex: number) => { offsetX: number; offsetY: number };
  getNextLinkableBoards: () => ParagonBoard[];
  isLinkPointActivated: (nodeId: string) => boolean;
  activateLinkPoint: (nodeId: string) => void;
  // 编辑器相关
  setEditMode: (mode: boolean) => void;
  updateNodePosition: (nodeId: string, x: number, y: number) => void;
  addNode: (node: Omit<ParagonNode, 'id'>) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<ParagonNode>) => void;
  exportBoardConfig: () => string;
  exportFullConfig: () => string;
  exportAsDataFile: (boardIndex?: number) => string;
  importFullConfig: (json: string) => Promise<boolean>;
}

interface ExtendedParagonState extends ParagonState {
  editMode: boolean;
  highlightedPaths: string[][]; // 存储高亮路径，每个路径是一个节点ID数组
  clickableNodes: string[]; // 可点击的节点ID数组
}

export const useParagonStore = create<ExtendedParagonState & ParagonActions>((set, get) => ({
  boards: [],
  availableBoards: [],
  activeBoardIndex: 0,
  unlockedNodes: [],
  selectedNode: null,
  selectedGlyph: null,
  zoom: 1,
  position: { x: 0, y: 0 },
  totalPoints: 100,
  spentPoints: 0,
  editMode: false,
  highlightedPaths: [],
  clickableNodes: [],
  // 链接链
  linkChain: { connections: [] },
  // 已激活的链接点
  activatedLinkPoints: [],

  selectNode: (nodeId: string | null) => {
    set({ selectedNode: nodeId });
  },

  toggleNode: (nodeId: string) => {
    const { unlockedNodes, totalPoints, spentPoints, boards, activeBoardIndex, activatedLinkPoints } = get();
    const isUnlocked = unlockedNodes.includes(nodeId);

    if (isUnlocked) {
      // 解锁状态：可以取消解锁
      const newUnlockedNodes = unlockedNodes.filter(id => id !== nodeId);
      const newHighlightedPaths = calculateHighlightedPaths(newUnlockedNodes, boards, activeBoardIndex);
      const newClickableNodes = calculateClickableNodes(newUnlockedNodes, boards, activeBoardIndex);

      set(state => ({
        unlockedNodes: newUnlockedNodes,
        spentPoints: state.spentPoints - 1,
        highlightedPaths: newHighlightedPaths,
        clickableNodes: newClickableNodes,
        // 如果取消解锁链接点，也移除激活状态
        activatedLinkPoints: state.activatedLinkPoints.filter(id => id !== nodeId)
      }));
    } else {
      if (spentPoints >= totalPoints) return;

      // 检查是否与已解锁节点相邻（上下左右）
      const board = boards[activeBoardIndex];
      const clickedNode = board.nodes.find(n => n.id === nodeId);
      if (!clickedNode) return;

      // 检查是否相邻（距离 <= GRID_SPACING）
      const isAdjacent = unlockedNodes.some(unlockedId => {
        const unlockedNode = board.nodes.find(n => n.id === unlockedId);
        if (!unlockedNode) return false;

        const dx = Math.abs(clickedNode.x - unlockedNode.x);
        const dy = Math.abs(clickedNode.y - unlockedNode.y);

        // 只有上下左右相邻才算（距离 <= GRID_SPACING）
        return dx <= GRID_SPACING && dy <= GRID_SPACING && (dx === 0 || dy === 0);
      });

      // 入口点可以直接解锁
      if (isAdjacent || clickedNode.isEntryPoint) {
        const newUnlockedNodes = [...unlockedNodes, nodeId];
        const newHighlightedPaths = calculateHighlightedPaths(newUnlockedNodes, boards, activeBoardIndex);
        const newClickableNodes = calculateClickableNodes(newUnlockedNodes, boards, activeBoardIndex);

        // 如果解锁的是链接点，自动激活
        const newActivatedLinkPoints = clickedNode.type === 'link'
          ? [...activatedLinkPoints, nodeId]
          : activatedLinkPoints;

        set(state => ({
          unlockedNodes: newUnlockedNodes,
          spentPoints: state.spentPoints + 1,
          highlightedPaths: newHighlightedPaths,
          clickableNodes: newClickableNodes,
          activatedLinkPoints: newActivatedLinkPoints
        }));
      }
    }
  },

  setZoom: (zoom: number) => {
    set({ zoom: Math.max(0.5, Math.min(2, zoom)) });
  },

  setPosition: (position: { x: number; y: number }) => {
    set({ position });
  },

  resetView: () => {
    set({ zoom: 1, position: { x: 0, y: 0 } });
  },

  loadBoards: async () => {
    const { initial, available } = await getParagonBoards();
    const clickableNodes = calculateClickableNodes([], [initial], 0);
    set({ boards: [initial], availableBoards: available, clickableNodes });
  },

  switchBoard: (index: number) => {
    const { boards } = get();
    if (index >= 0 && index < boards.length) {
      set({ activeBoardIndex: index, zoom: 1, position: { x: 0, y: 0 } });
    }
  },

  selectBoard: (board: ParagonBoard) => {
    const { boards } = get();
    if (boards.length >= 5) return; // 最多5个巅峰盘
    if (boards.find(b => b.id === board.id)) return; // 已选择
    
    const newBoardIndex = boards.length;
    set(state => ({
      boards: [...state.boards, board],
      availableBoards: state.availableBoards.filter(b => b.id !== board.id),
      activeBoardIndex: newBoardIndex,
      zoom: 1,
      position: { x: 0, y: 0 }
    }));
  },

  deselectBoard: (boardIndex: number) => {
    const { boards } = get();
    if (boardIndex === 0) return; // 不能移除初始化巅峰盘
    
    const removedBoard = boards[boardIndex];
    set(state => ({
      boards: state.boards.filter((_, i) => i !== boardIndex),
      availableBoards: [...state.availableBoards, removedBoard],
      activeBoardIndex: Math.min(state.activeBoardIndex, state.boards.length - 2)
    }));
  },

  selectGlyph: (glyph: Glyph | null) => {
    set({ selectedGlyph: glyph });
  },

  equipGlyph: (glyph: Glyph) => {
    const { boards, activeBoardIndex } = get();
    const newBoards = [...boards];
    newBoards[activeBoardIndex] = {
      ...newBoards[activeBoardIndex],
      centerSlot: {
        ...newBoards[activeBoardIndex].centerSlot,
        glyph
      }
    };
    set({ boards: newBoards });
  },

  unequipGlyph: () => {
    const { boards, activeBoardIndex } = get();
    const newBoards = [...boards];
    newBoards[activeBoardIndex] = {
      ...newBoards[activeBoardIndex],
      centerSlot: {
        ...newBoards[activeBoardIndex].centerSlot,
        glyph: null
      }
    };
    set({ boards: newBoards });
  },

  setTotalPoints: (points: number) => {
    set({ totalPoints: Math.max(0, points) });
  },

  // ========== 链接相关方法 ==========

  connectBoard: (fromBoardIndex: number, fromEdge: EdgeDirection, toBoardId: string, toEdge: EdgeDirection, rotation: RotationAngle) => {
    const { boards, availableBoards, linkChain } = get();

    // 最多4个额外盘
    if (boards.length >= 5) return;

    // 检查目标盘是否已存在
    if (boards.find(b => b.id === toBoardId) || linkChain.connections.find(c => c.toBoardId === toBoardId)) {
      return;
    }

    // 从可用盘列表中获取目标盘
    const targetBoard = availableBoards.find(b => b.id === toBoardId);
    if (!targetBoard) return;

    // 计算位置偏移
    const offset = calculateBoardOffset(fromEdge);

    // 旋转目标盘的节点
    const rotatedNodes = rotateBoardNodes(targetBoard.nodes, rotation);

    // 旋转后的入口点也需要更新
    const rotatedEntryPoints = targetBoard.entryPoints.map(id => {
      const node = rotatedNodes.find(n => n.id === id);
      return node ? node.id : id;
    });

    // 创建连接关系
    const connection: BoardConnection = {
      fromBoardIndex,
      fromEdge,
      toBoardId,
      toEdge,
      rotation,
      offsetX: offset.offsetX,
      offsetY: offset.offsetY
    };

    // 添加新盘到列表，并应用偏移
    const newBoard: ParagonBoard = {
      ...targetBoard,
      nodes: rotatedNodes,
      entryPoints: rotatedEntryPoints,
      centerSlot: {
        ...targetBoard.centerSlot,
        x: targetBoard.centerSlot.x + offset.offsetX,
        y: targetBoard.centerSlot.y + offset.offsetY
      }
    };

    // 更新所有后续盘的偏移
    const newBoards = [...boards];
    const newLinkChain = [...linkChain.connections];

    // 计算新盘的索引
    const newBoardIndex = newBoards.length;

    // 更新后续连接的偏移（如果新盘会影响到后续盘的位置）
    // 从fromBoardIndex+1开始的盘都需要累加新盘的偏移
    for (let i = 0; i < newLinkChain.length; i++) {
      const conn = newLinkChain[i];
      if (conn.fromBoardIndex >= fromBoardIndex + 1) {
        newLinkChain[i] = {
          ...conn,
          fromBoardIndex: conn.fromBoardIndex + 1,
          offsetX: conn.offsetX + offset.offsetX,
          offsetY: conn.offsetY + offset.offsetY
        };
      }
    }

    // 添加新连接
    newLinkChain.push(connection);

    set({
      boards: [...newBoards, newBoard],
      availableBoards: availableBoards.filter(b => b.id !== toBoardId),
      linkChain: { connections: newLinkChain },
      activeBoardIndex: newBoardIndex
    });
  },

  disconnectBoard: (boardIndex: number) => {
    const { boards, availableBoards, linkChain } = get();

    // 不能移除主盘（index 0）
    if (boardIndex === 0) return;

    // 只能断开最后一个连接的盘（链式结构）
    const lastConnectedIndex = boards.length - 1;
    if (boardIndex !== lastConnectedIndex) return;

    const disconnectedBoard = boards[boardIndex];
    const connection = linkChain.connections.find(c => c.toBoardId === disconnectedBoard.id);
    if (!connection) return;

    // 移除连接
    const newConnections = linkChain.connections.filter(c => c.toBoardId !== disconnectedBoard.id);

    // 重新计算后续盘的偏移（减去断开的盘的偏移）
    const newBoards = boards.filter((_, i) => i !== boardIndex);
    const newLinkChain = newConnections.map(c => {
      if (c.fromBoardIndex > boardIndex) {
        return {
          ...c,
          fromBoardIndex: c.fromBoardIndex - 1
        };
      }
      return c;
    });

    set({
      boards: newBoards,
      availableBoards: [...availableBoards, disconnectedBoard],
      linkChain: { connections: newLinkChain },
      activeBoardIndex: Math.min(boardIndex - 1, newBoards.length - 1)
    });
  },

  rotateBoard: (boardIndex: number, rotation: RotationAngle) => {
    const { boards, linkChain } = get();

    if (boardIndex === 0) return; // 主盘不能旋转

    const board = boards[boardIndex];
    if (!board) return;

    // 找到该盘的连接信息
    const connectionIndex = linkChain.connections.findIndex(c => c.toBoardId === board.id);
    if (connectionIndex === -1) return;

    const connection = linkChain.connections[connectionIndex];

    // 旋转节点
    const rotatedNodes = rotateBoardNodes(board.nodes, rotation);

    // 更新节点
    const newBoards = [...boards];
    newBoards[boardIndex] = {
      ...board,
      nodes: rotatedNodes
    };

    // 更新连接信息
    const newConnections = [...linkChain.connections];
    newConnections[connectionIndex] = {
      ...connection,
      rotation,
      toEdge: getNextEdge(connection.toEdge, rotation)
    };

    set({
      boards: newBoards,
      linkChain: { connections: newConnections }
    });
  },

  getBoardOffset: (boardIndex: number): { offsetX: number; offsetY: number } => {
    const { boards, linkChain } = get();

    if (boardIndex === 0) {
      return { offsetX: 0, offsetY: 0 };
    }

    const board = boards[boardIndex];
    if (!board) return { offsetX: 0, offsetY: 0 };

    // 累加所有祖先连接的偏移
    let totalOffsetX = 0;
    let totalOffsetY = 0;

    for (let i = 0; i < boardIndex; i++) {
      const conn = linkChain.connections.find(c => {
        if (i === 0) {
          return c.fromBoardIndex === 0;
        }
        return c.toBoardId === boards[i].id;
      });
      if (conn) {
        totalOffsetX += conn.offsetX;
        totalOffsetY += conn.offsetY;
      }
    }

    return { offsetX: totalOffsetX, offsetY: totalOffsetY };
  },

  getNextLinkableBoards: (): ParagonBoard[] => {
    const { boards, availableBoards } = get();

    // 最多4个额外盘
    if (boards.length >= 5) return [];

    return availableBoards;
  },

  isLinkPointActivated: (nodeId: string): boolean => {
    const { activatedLinkPoints } = get();
    return activatedLinkPoints.includes(nodeId);
  },

  activateLinkPoint: (nodeId: string) => {
    const { activatedLinkPoints, unlockedNodes } = get();

    // 只有解锁的链接点才能被激活
    if (!unlockedNodes.includes(nodeId)) return;
    if (activatedLinkPoints.includes(nodeId)) return;

    set({ activatedLinkPoints: [...activatedLinkPoints, nodeId] });
  },

  // 编辑器相关方法
  setEditMode: (mode: boolean) => {
    set({ editMode: mode });
  },

  updateNodePosition: (nodeId: string, x: number, y: number) => {
    const { boards, activeBoardIndex } = get();
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    
    // 更新节点位置
    const updatedNodes = board.nodes.map(n => 
      n.id === nodeId ? { ...n, x, y } : n
    );
    
    // 重新计算连接关系
    const nodesWithConnections = recalculateConnections(updatedNodes);
    
    newBoards[activeBoardIndex] = {
      ...board,
      nodes: nodesWithConnections
    };
    set({ boards: newBoards });
  },

  addNode: (nodeData: Omit<ParagonNode, 'id'>) => {
    const { boards, activeBoardIndex } = get();
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    
    const newId = `${board.id}-node-${Date.now()}`;
    
    // 自动计算相邻节点（在同一位置的节点）
    const adjacentNodes = board.nodes.filter(n => 
      Math.abs(n.x - nodeData.x) <= 32 && Math.abs(n.y - nodeData.y) <= 32 &&
      !(n.x === nodeData.x && n.y === nodeData.y)
    );
    const connections = adjacentNodes.map(n => n.id);
    
    const newNode: ParagonNode = { 
      ...nodeData, 
      id: newId,
      connections
    };
    
    // 更新相邻节点的连接
    const updatedNodes = board.nodes.map(n => {
      if (adjacentNodes.find(adj => adj.id === n.id)) {
        return { ...n, connections: [...n.connections, newId] };
      }
      return n;
    });
    
    newBoards[activeBoardIndex] = {
      ...board,
      nodes: [...updatedNodes, newNode]
    };
    set({ boards: newBoards, selectedNode: newId });
  },

  deleteNode: (nodeId: string) => {
    const { boards, activeBoardIndex, unlockedNodes } = get();
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    
    // 从相邻节点的连接中移除被删除的节点
    const updatedNodes = board.nodes
      .filter(n => n.id !== nodeId)
      .map(n => ({
        ...n,
        connections: n.connections.filter(c => c !== nodeId)
      }));
    
    newBoards[activeBoardIndex] = {
      ...board,
      nodes: updatedNodes,
      entryPoints: board.entryPoints.filter(id => id !== nodeId)
    };
    
    set({ 
      boards: newBoards,
      selectedNode: null,
      unlockedNodes: unlockedNodes.filter(id => id !== nodeId)
    });
  },

  updateNode: (nodeId: string, updates: Partial<ParagonNode>) => {
    const { boards, activeBoardIndex } = get();
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    
    newBoards[activeBoardIndex] = {
      ...board,
      nodes: board.nodes.map(n => 
        n.id === nodeId ? { ...n, ...updates } : n
      )
    };
    set({ boards: newBoards });
  },

  exportBoardConfig: () => {
    const { boards, activeBoardIndex } = get();
    const board = boards[activeBoardIndex];

    // 转换为配置格式
    const config = {
      id: board.id,
      name: board.name,
      icon: board.icon,
      centerSlot: {
        x: board.centerSlot.x,
        y: board.centerSlot.y
      },
      nodes: board.nodes.map(node => ({
        id: node.id,
        type: node.type,
        name: node.name,
        icon: node.icon,
        image: node.image,
        x: node.x,
        y: node.y,
        effects: node.effects,
        bonuses: node.bonuses,
        connections: node.connections,
        isEntryPoint: node.isEntryPoint,
        description: node.description
      }))
    };

    return JSON.stringify(config, null, 2);
  },

  // 导出完整配置（包含所有盘和链接关系）
  exportFullConfig: () => {
    const { boards, unlockedNodes, linkChain, activatedLinkPoints, totalPoints, spentPoints } = get();

    const config = {
      version: '1.0',
      boards: boards.map(board => ({
        id: board.id,
        name: board.name,
        icon: board.icon,
        centerSlot: {
          x: board.centerSlot.x,
          y: board.centerSlot.y,
          glyph: board.centerSlot.glyph ? {
            id: board.centerSlot.glyph.id,
            name: board.centerSlot.glyph.name
          } : null
        },
        nodes: board.nodes.map(node => ({
          id: node.id,
          type: node.type,
          name: node.name,
          icon: node.icon,
          x: node.x,
          y: node.y,
          effects: node.effects,
          bonuses: node.bonuses,
          isEntryPoint: node.isEntryPoint,
          description: node.description
        })),
        entryPoints: board.entryPoints
      })),
      linkChain,
      unlockedNodes,
      activatedLinkPoints,
      totalPoints,
      spentPoints
    };

    return JSON.stringify(config, null, 2);
  },

  // 导出为数据文件格式（与加载格式一致）
  exportAsDataFile: (boardIndex?: number) => {
    const { boards } = get();
    const board = boards[boardIndex ?? get().activeBoardIndex];
    if (!board) return '';

    const GRID_SPACING = 64; // 网格间距

    // 提取所有连接关系
    const connections: [string, string][] = [];
    board.nodes.forEach(node => {
      if (node.connections) {
        node.connections.forEach(targetId => {
          // 避免重复添加连接
          const exists = connections.some(
            ([a, b]) => (a === node.id && b === targetId) || (a === targetId && b === node.id)
          );
          if (!exists) {
            connections.push([node.id, targetId]);
          }
        });
      }
    });

    // 转换节点格式
    const dataFileNodes = board.nodes.map(node => {
      // 像素坐标转换为列/行号
      const col = Math.round((node.x + board.centerSlot.x) / GRID_SPACING);
      const row = Math.round((node.y + board.centerSlot.y) / GRID_SPACING);

      // effects 对象数组转换为字符串数组
      const effectStrings = node.effects?.map(e => {
        if (typeof e === 'string') return e;
        return e.description || `${e.name}: ${e.value}${e.unit || ''}`;
      }) || [];

      return {
        id: node.id,
        type: node.type,
        x: col,
        y: row,
        effects: effectStrings
      };
    });

    const dataFile = {
      id: board.id,
      name: board.name,
      nodes: dataFileNodes,
      connections: connections
    };

    return JSON.stringify(dataFile, null, 2);
  },

  // 导入完整配置
  importFullConfig: async (json: string) => {
    try {
      const config = JSON.parse(json);

      if (!config.version || !config.boards) {
        return false;
      }

      const { initial, available } = await getParagonBoards();

      // 恢复盘数据
      const restoredBoards: ParagonBoard[] = config.boards.map((boardConfig: any) => {
        const template = available.find(b => b.id === boardConfig.id) || initial;
        return {
          ...template,
          id: boardConfig.id,
          name: boardConfig.name,
          icon: boardConfig.icon,
          centerSlot: {
            ...boardConfig.centerSlot,
            glyph: boardConfig.centerSlot.glyph
              ? template.centerSlot.glyph
              : null
          },
          nodes: boardConfig.nodes,
          entryPoints: boardConfig.entryPoints
        };
      });

      // 计算恢复后的可用盘
      const restoredAvailableBoards = available.filter(
        b => !restoredBoards.find(rb => rb.id === b.id)
      );

      const clickableNodes = restoredBoards.length > 0
        ? calculateClickableNodes(config.unlockedNodes || [], restoredBoards, 0)
        : [];

      set({
        boards: restoredBoards,
        availableBoards: restoredAvailableBoards,
        unlockedNodes: config.unlockedNodes || [],
        activatedLinkPoints: config.activatedLinkPoints || [],
        linkChain: config.linkChain || { connections: [] },
        totalPoints: config.totalPoints || 100,
        spentPoints: config.spentPoints || 0,
        activeBoardIndex: 0,
        highlightedPaths: [],
        clickableNodes
      });

      return true;
    } catch (e) {
      console.error('Failed to import config:', e);
      return false;
    }
  }
}));

export const useGlyphStore = create(() => ({
  glyphs: getGlyphs()
}));
