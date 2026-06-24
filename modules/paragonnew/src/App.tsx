import { useState, useMemo, useCallback, useEffect } from 'react';
import ParagonCanvas from './components/ParagonCanvas';
import { NodeTooltip } from './components/NodeTooltip';
import { 
  ParagonData, 
  GridNode, 
  Language, 
  NodeType,
  NodeAllocation,
  BoardInstance,
  NODE_TYPE_LABELS,
  Glyph,
  PARAGON_GRID_COORDINATES,
  PlayerAttributes,
  BOARD_LOCATIONS
} from './types';
import barbarianData from './data/barbarianData.json';

// 7×5的网格布局（与原始项目一致）
const GRID_LOCATIONS = [
  ['V', 'E', 'F', 'G', 'H', 'I', 'U'],
  ['W', 'D', 'J', 'K', 'L', 'M', 'T'],
  ['X', 'C', '7', '8', '9', 'N', 'S'],
  ['Y', 'B', '4', '5', '6', 'O', 'R'],
  ['Z', 'A', '1', '2', '3', 'P', 'Q'],
];

// 根据节点坐标和旋转角度计算实际坐标（与原始项目一致）
const rotateAngle = (cx: number, cy: number, x: number, y: number, angle: number): [number, number] => {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
  const ny = (sin * (x - cx)) + (cos * (y - cy)) + cy;
  return [nx, ny];
};

// 反向旋转：将旋转后的坐标转换回原始坐标（用于判断Gate方向）
const reverseRotateAngle = (cx: number, cy: number, x: number, y: number, angle: number): [number, number] => {
  const radians = -(angle * Math.PI) / 180; // 反向旋转
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
  const ny = (sin * (x - cx)) + (cos * (y - cy)) + cy;
  return [nx, ny];
};

// 根据gridLocation查找其在gridLocations中的索引
const findGridPosition = (gridLocation: string): [number, number] | null => {
  for (let gridX = 0; gridX < GRID_LOCATIONS.length; gridX++) {
    const gridY = GRID_LOCATIONS[gridX].indexOf(gridLocation);
    if (gridY >= 0) {
      return [gridX, gridY];
    }
  }
  return null;
};

// 根据Gate节点位置和旋转角度确定相邻grid位置（与原始项目一致）
const findAdjacentGridLocation = (
  currentGridLocation: string,
  gateRow: number,
  gateCol: number,
  rotation: number
): string | null => {
  const gridPos = findGridPosition(currentGridLocation);
  if (!gridPos) return null;
  
  const [gridX, gridY] = gridPos;
  
  // 根据旋转角度计算实际坐标
  const [rotatedX, rotatedY] = rotateAngle(10, 10, gateCol, gateRow, rotation);
  
  // 根据节点位置确定相邻grid位置
  if (rotatedX === 0) {
    // Gate在左边缘 → 新盘在左边
    if (gridY > 0) return GRID_LOCATIONS[gridX][gridY - 1];
  } else if (rotatedX === 20) {
    // Gate在右边缘 → 新盘在右边
    if (gridY < 6) return GRID_LOCATIONS[gridX][gridY + 1];
  } else if (rotatedY === 0) {
    // Gate在上边缘 → 新盘在上方
    if (gridX > 0) return GRID_LOCATIONS[gridX - 1][gridY];
  } else {
    // Gate在下边缘 → 新盘在下方
    if (gridX < 4) return GRID_LOCATIONS[gridX + 1][gridY];
  }
  
  return null;
};

// BFS最短路径算法
interface PathNode {
  boardId: string;
  row: number;
  col: number;
}

const findShortestPath = (
  data: ParagonData,
  connectedBoards: BoardInstance[],
  allocations: Map<string, NodeAllocation>,
  startNode: PathNode,
  targetNode: PathNode
): PathNode[] => {
  const visited = new Set<string>();
  const queue: { node: PathNode; path: PathNode[] }[] = [];
  const allocatedKeys = new Set(allocations.keys());
  
  // 1. 先找到所有与起始节点连通的已点亮节点
  const reachableAllocatedNodes = new Set<string>();
  const bfsQueue: PathNode[] = [startNode];
  
  while (bfsQueue.length > 0) {
    const { boardId, row, col } = bfsQueue.shift()!;
    const key = `${boardId}_${row}_${col}`;
    
    if (reachableAllocatedNodes.has(key)) continue;
    reachableAllocatedNodes.add(key);
    
    // 检查四个方向的邻居
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ];
    
    const board = data.boards.find(b => b.id === boardId);
    if (!board) continue;
    
    for (const dir of directions) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;
      
      if (newRow < 0 || newRow >= board.rows || newCol < 0 || newCol >= board.cols) continue;
      
      const neighborKey = `${boardId}_${newRow}_${newCol}`;
      
      // 只处理已点亮的邻居节点
      if (allocatedKeys.has(neighborKey)) {
        const neighborNode = board.grid[newRow]?.[newCol];
        
        if (neighborNode?.type === 'gate') {
          // Gate节点：检查是否是入口Gate
          const currentBoardInstance = connectedBoards.find(b => b.boardId === boardId);
          if (currentBoardInstance?.entryGate?.row === newRow && 
              currentBoardInstance?.entryGate?.col === newCol) {
            // 是入口Gate，跳转到子盘
            const childBoard = connectedBoards.find(cb => {
              if (cb.boardId === boardId) return false;
              // 检查是否相邻
              const [currentX, currentY] = PARAGON_GRID_COORDINATES[currentBoardInstance.gridLocation] || [0, 0];
              const [childX, childY] = PARAGON_GRID_COORDINATES[cb.gridLocation] || [0, 0];
              const dx = Math.abs(childX - currentX);
              const dy = Math.abs(childY - currentY);
              if ((dx === 840 && dy === 0) || (dx === 0 && dy === 840)) {
                // 检查子盘的entryGate是否匹配
                let gateDir: string;
                if (dx > 0) gateDir = childX > currentX ? 'right' : 'left';
                else gateDir = childY > currentY ? 'bottom' : 'top';
                
                let expectedEntryRow: number, expectedEntryCol: number;
                if (gateDir === 'left') { expectedEntryRow = 10; expectedEntryCol = 0; }
                else if (gateDir === 'right') { expectedEntryRow = 10; expectedEntryCol = 20; }
                else if (gateDir === 'top') { expectedEntryRow = 0; expectedEntryCol = 10; }
                else { expectedEntryRow = 20; expectedEntryCol = 10; }
                
                return cb.entryGate?.row === expectedEntryRow && 
                       cb.entryGate?.col === expectedEntryCol;
              }
              return false;
            });
            
            if (childBoard?.entryGate) {
              bfsQueue.push({
                boardId: childBoard.boardId,
                row: childBoard.entryGate.row,
                col: childBoard.entryGate.col
              });
            }
          }
        } else {
          // 普通节点，直接添加到队列
          bfsQueue.push({ boardId, row: newRow, col: newCol });
        }
      }
    }
  }
  
  console.log('[BFS] 与起始节点连通的已点亮节点数量:', reachableAllocatedNodes.size);
  
  // 2. 使用连通的已点亮节点作为起点
  reachableAllocatedNodes.forEach(key => {
    const keyParts = key.split('_');
    const row = parseInt(keyParts[keyParts.length - 2]);
    const col = parseInt(keyParts[keyParts.length - 1]);
    const boardId = keyParts.slice(0, -2).join('_');
    
    visited.add(key);
    queue.push({ node: { boardId, row, col }, path: [] });
  });
  
  // 如果没有连通的已点亮节点，使用起始节点
  if (queue.length === 0) {
    const startKey = `${startNode.boardId}_${startNode.row}_${startNode.col}`;
    visited.add(startKey);
    queue.push({ node: startNode, path: [startNode] });
  }
  
  console.log('[BFS] 起始节点数量:', queue.length);
  
  // 方向：上下左右
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ];
  
  let iterationCount = 0;
  const maxIterations = 10000;
  
  while (queue.length > 0 && iterationCount < maxIterations) {
    iterationCount++;
    const { node, path } = queue.shift()!;
    const { boardId, row, col } = node;
    
    // 到达目标节点
    if (boardId === targetNode.boardId && row === targetNode.row && col === targetNode.col) {
      console.log('[BFS] 找到目标节点!');
      // 返回路径（去除已点亮的节点）
      const newPath = path.filter(p => {
        const key = `${p.boardId}_${p.row}_${p.col}`;
        return !allocatedKeys.has(key);
      });
      console.log('[BFS] 返回路径长度:', newPath.length);
      return newPath;
    }
    
    // 获取当前盘面信息
    const board = data.boards.find(b => b.id === boardId);
    if (!board) {
      console.log('[BFS] 未找到盘面:', boardId);
      continue;
    }
    
    // 检查当前节点是否是Gate节点，如果是，检查是否链接到其他盘面
    const currentNode = board.grid[row]?.[col];
    if (currentNode?.type === 'gate') {
      // 获取当前盘面在connectedBoards中的实例
      const currentBoardInstance = connectedBoards.find(b => b.boardId === boardId);
      if (!currentBoardInstance) continue;
      
      // 遍历所有连接的盘面，找到相邻的盘面
      for (const cb of connectedBoards) {
        if (cb.boardId === boardId) continue; // 跳过当前盘面
        
        // 检查是否相邻
        const [currentX, currentY] = PARAGON_GRID_COORDINATES[currentBoardInstance.gridLocation] || [0, 0];
        const [otherX, otherY] = PARAGON_GRID_COORDINATES[cb.gridLocation] || [0, 0];
        
        const dx = Math.abs(otherX - currentX);
        const dy = Math.abs(otherY - currentY);
        
        // 如果相邻
        if ((dx === 840 && dy === 0) || (dx === 0 && dy === 840)) {
          // 确定当前Gate的方向
          let gateDir: string;
          if (col === 0) gateDir = 'left';
          else if (col === 20) gateDir = 'right';
          else if (row === 0) gateDir = 'top';
          else gateDir = 'bottom';
          
          // 确定相邻盘面相对于当前盘面的方向
          let otherDir: string;
          if (dx > 0) otherDir = otherX > currentX ? 'right' : 'left';
          else otherDir = otherY > currentY ? 'bottom' : 'top';
          
          // 如果Gate方向与相邻盘面方向一致，说明这是连接到该盘面的Gate
          if (gateDir === otherDir && cb.entryGate) {
            const entryGateKey = `${cb.boardId}_${cb.entryGate.row}_${cb.entryGate.col}`;
            if (!visited.has(entryGateKey)) {
              visited.add(entryGateKey);
              queue.push({
                node: {
                  boardId: cb.boardId,
                  row: cb.entryGate.row,
                  col: cb.entryGate.col
                },
                path: [...path, {
                  boardId: cb.boardId,
                  row: cb.entryGate.row,
                  col: cb.entryGate.col
                }]
              });
            }
          }
        }
      }
    }
    
    // 遍历四个方向
    for (const dir of directions) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;
      
      // 检查边界
      if (newRow < 0 || newRow >= board.rows || newCol < 0 || newCol >= board.cols) {
        continue;
      }
      
      const neighborNode = board.grid[newRow]?.[newCol];
      if (!neighborNode) {
        console.log(`[BFS] 邻居节点为空: (${newRow}, ${newCol})`);
        continue;
      }
      
      const newKey = `${boardId}_${newRow}_${newCol}`;
      if (visited.has(newKey)) continue;
      
      visited.add(newKey);
      queue.push({
        node: { boardId, row: newRow, col: newCol },
        path: [...path, { boardId, row: newRow, col: newCol }]
      });
    }
  }
  
  console.log('[BFS] 搜索结束，迭代次数:', iterationCount, '队列长度:', queue.length);
  return []; // 没有找到路径
};

type ClassName = 'Barbarian' | 'Druid' | 'Necromancer' | 'Rogue' | 'Sorcerer';

function App() {
  const data = barbarianData as ParagonData;
  
  // 语言切换
  const [language, setLanguage] = useState<Language>('zhCN');
  
  // 当前职业
  const [currentClass, setCurrentClass] = useState<ClassName>('Barbarian');
  
  // 模拟器状态
  const [totalPoints] = useState(220); // 巅峰总点数
  const [allocations, setAllocations] = useState<Map<string, NodeAllocation>>(new Map());
  
  // 连接的盘面（从起始盘开始，通过Gate连接其他盘面）
  const [connectedBoards, setConnectedBoards] = useState<BoardInstance[]>([
    // 起始盘（固定在中心位置 '5'）
    { boardIndex: 0, boardId: 'Paragon_Barb_Start', gridLocation: '5', rotation: 0, equipIndex: 1, equippedGlyph: null },
  ]);
  
  // 当前选中的盘面索引
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
  
  // Gate选择状态 - 点击Gate节点后弹出选择框
  const [selectingBoardForGate, setSelectingBoardForGate] = useState<{
    boardIndex: number;
    gateDirection: string;
    gateRow: number;
    gateCol: number;
  } | null>(null);
  
  // 快捷路径模式 - 启用后点击节点会自动点亮最短路径
  const [quickPathMode, setQuickPathMode] = useState(false);
  
  // Socket雕纹选择状态 - 点击socket节点后弹出选择框
  const [selectingGlyphForSocket, setSelectingGlyphForSocket] = useState<{
    boardId: string;
    row: number;
    col: number;
  } | null>(null);
  
  // socket节点上安装的雕纹 (key: "boardId_row_col")
  const [socketGlyphs, setSocketGlyphs] = useState<Map<string, { glyphId: string; rank: number }>>(new Map());
  
  // 画布变换
  const [zoom, setZoom] = useState(0.65);
  const [pan, setPan] = useState({ x: -819, y: 819 });
  
  // 悬停的节点
  const [hoveredNode, setHoveredNode] = useState<{
    node: GridNode;
    boardId: string;
    row: number;
    col: number;
  } | null>(null);
  
  // 鼠标位置（用于tooltip定位）
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // 节点搜索
  const [searchQuery, setSearchQuery] = useState('');
  
  // 属性过滤器
  const [typeFilter, setTypeFilter] = useState<NodeType | 'all'>('all');
  
  // 是否显示右侧面板
  const [showRightPanel, setShowRightPanel] = useState(true);
  
  // 当前操作模式
  const [operationMode, setOperationMode] = useState<'select' | 'move' | 'rotate'>('select');
  
  // 计算已用点数
  const usedPoints = useMemo(() => {
    let total = 0;
    allocations.forEach(allocation => {
      total += allocation.points;
    });
    return total;
  }, [allocations]);
  
  // 计算玩家属性
  const playerAttributes = useMemo<PlayerAttributes>(() => {
    const attrs: PlayerAttributes = { Strength: 0, Intelligence: 0, Willpower: 0, Dexterity: 0 };
    
    // 基础属性（每点巅峰点提供属性）
    const basePoints = usedPoints;
    attrs.Strength = Math.floor(basePoints * 0.5);
    attrs.Dexterity = Math.floor(basePoints * 0.2);
    attrs.Intelligence = Math.floor(basePoints * 0.15);
    attrs.Willpower = Math.floor(basePoints * 0.15);
    
    // 节点属性加成
    allocations.forEach((_, key) => {
      const [boardId, row, col] = key.split('_');
      const board = data.boards.find(b => b.id === boardId);
      const node = board?.grid[parseInt(row)]?.[parseInt(col)];
      if (node) {
        const attrMatch = node.id.match(/Generic_Normal_(Str|Int|Will|Dex)/);
        if (attrMatch) {
          const attrType = attrMatch[1] as keyof PlayerAttributes;
          const attrMap: Record<string, keyof PlayerAttributes> = {
            'Str': 'Strength',
            'Int': 'Intelligence',
            'Will': 'Willpower',
            'Dex': 'Dexterity'
          };
          const mappedType = attrMap[attrType];
          if (mappedType) {
            attrs[mappedType] += 5;
          }
        }
      }
    });
    
    return attrs;
  }, [usedPoints, allocations, data.boards]);
  
  // 计算可达节点 - 只有已分配节点和它们的相邻节点可达
  const reachableNodes = useMemo(() => {
    const reachable = new Set<string>();
    const allocatedKeys = new Set<string>();
    
    // 收集所有已分配节点
    allocations.forEach((_alloc, key) => {
      allocatedKeys.add(key);
      reachable.add(key);
    });
    
    // 如果没有已分配节点，起始节点应该可达
    if (allocatedKeys.size === 0) {
      // 找到起始盘的起始节点，添加到可达集合
      const startBoard = connectedBoards.find(b => b.gridLocation === '5');
      if (startBoard) {
        const board = data.boards.find(b => b.id === startBoard.boardId);
        if (board && board.startNodes) {
          board.startNodes.forEach(sn => {
            const key = `${board.id}_${sn.row}_${sn.col}`;
            reachable.add(key);
          });
        }
      }
      return reachable;
    }
    
    // 对每个已分配节点，添加它的相邻节点到可达集合
    allocations.forEach((alloc) => {
      const board = data.boards.find(b => b.id === alloc.boardId);
      if (!board) return;
      
      const { row, col } = alloc;
      
      // 检查是否是Gate节点，如果是Gate节点，检查是否有链接的新盘面
      const allocNode = board.grid[row]?.[col];
      if (allocNode?.type === 'gate') {
        // 找到这个Gate链接的新盘面
        // 通过检查connectedBoards中的entryGate来确定
        const linkedBoard = connectedBoards.find(cb => {
          if (cb.gridLocation === '5') return false; // 起始盘没有entryGate
          return cb.entryGate?.row === alloc.row && cb.entryGate?.col === alloc.col;
        });
        
        if (linkedBoard) {
          // 把新盘面的入口Gate添加到可达集合
          if (linkedBoard.entryGate) {
            const entryKey = `${linkedBoard.boardId}_${linkedBoard.entryGate.row}_${linkedBoard.entryGate.col}`;
            reachable.add(entryKey);
          }
        }
      }
      
      // 检查上下左右四个相邻位置
      const neighbors = [
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 }
      ];
      
      for (const neighbor of neighbors) {
        if (neighbor.row < 0 || neighbor.row >= board.rows || 
            neighbor.col < 0 || neighbor.col >= board.cols) {
          continue;
        }
        
        const neighborNode = board.grid[neighbor.row]?.[neighbor.col];
        if (!neighborNode) continue;
        
        const key = `${alloc.boardId}_${neighbor.row}_${neighbor.col}`;
        if (!allocatedKeys.has(key) && !reachable.has(key)) {
          reachable.add(key);
        }
      }
    });
    
    return reachable;
  }, [allocations, data.boards, connectedBoards]);
  
  // 检查Gate连接
  const checkGateConnections = useMemo(() => {
    const connections: Array<{ from: number; to: number; fromGate: string; toGate: string }> = [];
    
    for (let i = 0; i < connectedBoards.length; i++) {
      for (let j = i + 1; j < connectedBoards.length; j++) {
        const board1 = connectedBoards[i];
        const board2 = connectedBoards[j];
        
        const [x1, y1] = PARAGON_GRID_COORDINATES[board1.gridLocation] || [0, 0];
        const [x2, y2] = PARAGON_GRID_COORDINATES[board2.gridLocation] || [0, 0];
        
        // 检查是否相邻
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        
        // 相邻位置的距离：x方向840，y方向840（等于盘面尺寸）
        if ((dx === 840 && dy === 0) || (dx === 0 && dy === 840)) {
          connections.push({
            from: i,
            to: j,
            fromGate: dx > 0 ? (x2 > x1 ? 'right' : 'left') : (y2 > y1 ? 'bottom' : 'top'),
            toGate: dx > 0 ? (x2 > x1 ? 'left' : 'right') : (y2 > y1 ? 'top' : 'bottom')
          });
        }
      }
    }
    
    return connections;
  }, [connectedBoards]);
  
  // 节点点击处理
  const handleNodeClick = useCallback((boardId: string, row: number, col: number, node: GridNode) => {
    const key = `${boardId}_${row}_${col}`;
    const isAllocated = allocations.has(key);
    
    // 检查是否可达
    const isReachable = reachableNodes.has(key);
    
    // 检查是否有可用点数
    const hasPoints = usedPoints < totalPoints;
    
    // 快捷路径模式：如果启用且节点不可达且未被点亮，则自动计算最短路径
    if (quickPathMode && !isReachable && !isAllocated) {
      console.log('[快捷路径] 模式已启用，开始计算路径...');
      console.log('[快捷路径] 目标节点:', boardId, row, col);
      
      // 找到起始盘的起始节点作为起点参考
      const startBoard = data.boards.find(b => b.id === 'Paragon_Barb_Start');
      if (!startBoard?.startNodes?.[0]) {
        console.log('[快捷路径] 未找到起始盘');
        // 不返回，继续执行后续逻辑
      } else {
        const startNode: PathNode = {
          boardId: 'Paragon_Barb_Start',
          row: startBoard.startNodes[0].row,
          col: startBoard.startNodes[0].col
        };
        
        const targetNode: PathNode = { boardId, row, col };
        
        console.log('[快捷路径] 起点:', startNode, '终点:', targetNode);
        
        // 计算最短路径
        const path = findShortestPath(data, connectedBoards, allocations, startNode, targetNode);
        
        console.log('[快捷路径] 计算出的路径长度:', path.length);
        if (path.length > 0) {
          console.log('[快捷路径] 路径节点:', path);
          // 检查是否有足够的点数
          let totalCost = 0;
          for (const pn of path) {
            const pNode = data.boards.find(b => b.id === pn.boardId)?.grid[pn.row]?.[pn.col];
            if (pNode) {
              if (pNode.type === 'rare') totalCost += 5;
              else if (pNode.type === 'legendary') totalCost += 1;
              else if (pNode.type !== 'gate') totalCost += 1; // Gate不消耗点数
            }
          }
          
          console.log('[快捷路径] 路径总消耗:', totalCost, '当前已用:', usedPoints);
          
          if (usedPoints + totalCost > totalPoints) {
            console.warn('点数不足，无法点亮路径');
            // 不返回，继续执行后续逻辑
          } else {
            // 点亮路径上的所有节点
            setAllocations(prev => {
              const newMap = new Map(prev);
              for (const pn of path) {
                const pKey = `${pn.boardId}_${pn.row}_${pn.col}`;
                const pNode = data.boards.find(b => b.id === pn.boardId)?.grid[pn.row]?.[pn.col];
                newMap.set(pKey, {
                  nodeId: pNode?.id || 'Generic_Node',
                  boardId: pn.boardId,
                  row: pn.row,
                  col: pn.col,
                  points: pNode?.type === 'rare' ? 5 : (pNode?.type === 'legendary' ? 1 : 0)
                });
              }
              return newMap;
            });
            
            // 如果目标节点是Gate节点，不返回，继续执行Gate处理逻辑（弹出选择框）
            if (node.type !== 'gate') {
              return; // 非Gate节点，处理完成返回
            }
            // Gate节点继续执行后续逻辑（弹出选择框）
          }
        } else {
          console.warn('无法找到路径');
          // 不返回，继续执行后续逻辑
        }
      }
    }
    
    // 根据节点类型计算消耗的点数
    let pointsCost = 1;
    if (node.type === 'rare') {
      pointsCost = 5;
    } else if (node.type === 'legendary') {
      pointsCost = 1;
    }
    
    // Gate节点特殊处理
    if (node.type === 'gate') {
      // 找到当前盘面
      const currentBoard = connectedBoards.find(b => b.boardId === boardId);
      if (!currentBoard) return;
      
      // 检查这个Gate是否是入口Gate（被链接的那个Gate）
      // 需要考虑旋转角度：将entryGate的原始坐标旋转后再比较
      const isEntryGate = (() => {
        if (!currentBoard.entryGate) return false;
        
        const eg = currentBoard.entryGate;
        const rotation = currentBoard.rotation || 0;
        
        if (rotation === 0) {
          // 未旋转，直接比较
          return eg.row === row && eg.col === col;
        }
        
        // 旋转后：将entryGate的原始坐标旋转到当前角度，再比较
        const centerRow = 10;
        const centerCol = 10;
        const [rotatedEntryRow, rotatedEntryCol] = rotateAngle(centerRow, centerCol, eg.row, eg.col, rotation);
        
        return Math.round(rotatedEntryRow) === row && Math.round(rotatedEntryCol) === col;
      })();
      
      if (isEntryGate) {
        // 入口Gate：如果未被点亮，则可以点亮
        if (!isAllocated) {
          // 作为入口Gate，可以直接点亮
          setAllocations(prev => {
            const newMap = new Map(prev);
            newMap.set(key, {
              nodeId: node.id || 'Generic_Gate',
              boardId,
              row,
              col,
              points: 0 // Gate不消耗点数
            });
            return newMap;
          });
        }
        // 如果已点亮，则不处理
      } else {
        // 非入口Gate：检查是否已连接盘面
        
        // 根据旋转角度计算原始（未旋转）坐标，用于判断Gate方向
        const rotation = currentBoard.rotation || 0;
        const centerRow = 10; // 盘面中心行（21行的中间）
        const centerCol = 10; // 盘面中心列（21列的中间）
        const [originalRow, originalCol] = rotation !== 0 
          ? reverseRotateAngle(centerRow, centerCol, row, col, rotation) 
          : [row, col];
        
        // 查找是否有盘面通过这个Gate连接
        const linkedBoard = connectedBoards.find(cb => {
          if (cb.boardId === boardId) return false;
          // 检查这个盘面的entryGate是否指向当前Gate
          // 需要找到连接关系：检查这个盘面是否与当前盘面相邻，且entryGate在对应方向
          const [currentX, currentY] = PARAGON_GRID_COORDINATES[currentBoard.gridLocation] || [0, 0];
          const [otherX, otherY] = PARAGON_GRID_COORDINATES[cb.gridLocation] || [0, 0];
          
          const dx = Math.abs(otherX - currentX);
          const dy = Math.abs(otherY - currentY);
          
          // 如果相邻
          if ((dx === 840 && dy === 0) || (dx === 0 && dy === 840)) {
            // 确定当前Gate的方向（使用原始坐标）
            let gateDir: string;
            if (Math.round(originalCol) === 0) gateDir = 'left';
            else if (Math.round(originalCol) === 20) gateDir = 'right';
            else if (Math.round(originalRow) === 0) gateDir = 'top';
            else gateDir = 'bottom';
            
            // 确定相邻盘面相对于当前盘面的方向
            let otherDir: string;
            if (dx > 0) otherDir = otherX > currentX ? 'right' : 'left';
            else otherDir = otherY > currentY ? 'bottom' : 'top';
            
            // 如果Gate方向与相邻盘面方向一致，说明这是连接到该盘面的Gate
            return gateDir === otherDir;
          }
          return false;
        });
        
        if (linkedBoard) {
          // 已连接盘面，弹出选择框替换
          // 需要找到父盘面（通过entryGate反向查找）
          const parentBoard = connectedBoards.find(cb => {
            if (cb.boardId === linkedBoard.boardId) return false;
            
            // 检查父盘和子盘是否相邻
            const [parentX, parentY] = PARAGON_GRID_COORDINATES[cb.gridLocation] || [0, 0];
            const [childX, childY] = PARAGON_GRID_COORDINATES[linkedBoard.gridLocation] || [0, 0];
            
            const dx = Math.abs(childX - parentX);
            const dy = Math.abs(childY - parentY);
            
            // 如果相邻
            if ((dx === 840 && dy === 0) || (dx === 0 && dy === 840)) {
              // 确定父盘上Gate的方向
              let gateDir: string;
              if (dx > 0) gateDir = childX > parentX ? 'right' : 'left';
              else gateDir = childY > parentY ? 'bottom' : 'top';
              
              // 根据方向确定父盘上Gate的位置
              let gateRow: number, gateCol: number;
              if (gateDir === 'left') { gateRow = 10; gateCol = 0; }
              else if (gateDir === 'right') { gateRow = 10; gateCol = 20; }
              else if (gateDir === 'top') { gateRow = 0; gateCol = 10; }
              else { gateRow = 20; gateCol = 10; }
              
              // 检查子盘的entryGate是否匹配（考虑父盘旋转）
              // 将子盘的entryGate坐标根据父盘的旋转角度转换后再比较
              const parentRotation = cb.rotation || 0;
              let matched = false;
              
              if (parentRotation === 0) {
                // 未旋转，直接比较
                matched = linkedBoard.entryGate?.row === gateRow && linkedBoard.entryGate?.col === gateCol;
              } else {
                // 旋转后：将entryGate的原始坐标旋转到当前角度，再比较
                const centerRow = 10;
                const centerCol = 10;
                const [rotatedEntryRow, rotatedEntryCol] = rotateAngle(centerRow, centerCol, linkedBoard.entryGate?.row || 0, linkedBoard.entryGate?.col || 0, parentRotation);
                matched = Math.round(rotatedEntryRow) === gateRow && Math.round(rotatedEntryCol) === gateCol;
              }
              
              if (matched) {
                return true;
              }
            }
            return false;
          });
          
          if (parentBoard) {
            const parentBoardIndex = connectedBoards.findIndex(b => b.boardId === parentBoard.boardId);
            
            // 确定父盘上Gate的方向
            const [parentX, parentY] = PARAGON_GRID_COORDINATES[parentBoard.gridLocation] || [0, 0];
            const [childX, childY] = PARAGON_GRID_COORDINATES[linkedBoard.gridLocation] || [0, 0];
            
            let gateDirection: string;
            let gateRow: number, gateCol: number;
            
            if (childX > parentX) {
              gateDirection = 'right';
              gateRow = 10;
              gateCol = 20;
            } else if (childX < parentX) {
              gateDirection = 'left';
              gateRow = 10;
              gateCol = 0;
            } else if (childY > parentY) {
              gateDirection = 'bottom';
              gateRow = 20;
              gateCol = 10;
            } else {
              gateDirection = 'top';
              gateRow = 0;
              gateCol = 10;
            }
            
            // 考虑父盘旋转：将原始位置旋转到当前角度，得到视觉位置
            const parentRotation = parentBoard.rotation || 0;
            if (parentRotation !== 0) {
              const centerRow = 10;
              const centerCol = 10;
              const [rotatedRow, rotatedCol] = rotateAngle(centerRow, centerCol, gateRow, gateCol, parentRotation);
              gateRow = Math.round(rotatedRow);
              gateCol = Math.round(rotatedCol);
            }
            
            setSelectingBoardForGate({
              boardIndex: parentBoardIndex,
              gateDirection,
              gateRow,
              gateCol
            });
          }
        } else {
          // 未连接盘面，弹出选择框添加新盘面
          // 检查是否已达到最大盘面数量限制
          if (connectedBoards.length >= 5) {
            console.warn('已达到最大盘面数量限制（5个）');
            return;
          }
          
          // 找到当前盘面在connectedBoards中的索引
          const boardIndex = connectedBoards.findIndex(b => b.boardId === boardId);
          
          // 根据Gate节点位置确定方向（使用原始坐标，考虑旋转）
          let gateDirection: string;
          if (Math.round(originalCol) === 0) {
            gateDirection = 'left';
          } else if (Math.round(originalCol) === 20) {
            gateDirection = 'right';
          } else if (Math.round(originalRow) === 0) {
            gateDirection = 'top';
          } else {
            gateDirection = 'bottom';
          }
          
          setSelectingBoardForGate({
            boardIndex,
            gateDirection,
            gateRow: row,
            gateCol: col
          });
        }
      }
      return;
    }
    
    // Socket节点处理 - 弹出雕纹选择框
    if (node.type === 'socket') {
      setSelectingGlyphForSocket({ boardId, row, col });
      return;
    }
    
    // 如果节点已分配，则取消分配
    if (isAllocated) {
      setAllocations(prev => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
      return;
    }
    
    // 检查是否是起始节点（可以直接点击）
    const isStartNode = node.type === 'start';
    
    // 如果可达且有足够点数，则分配
    if ((isReachable || isStartNode) && hasPoints) {
      // 检查传奇节点是否已使用
      if (node.type === 'legendary') {
        let alreadyHasLegendary = false;
        allocations.forEach((alloc) => {
          const allocNode = data.boards.find(b => b.id === alloc.boardId)?.grid[alloc.row]?.[alloc.col];
          if (allocNode?.type === 'legendary') {
            alreadyHasLegendary = true;
          }
        });
        
        if (alreadyHasLegendary && node.type === 'legendary') {
          return;
        }
      }
      
      setAllocations(prev => {
        const newMap = new Map(prev);
        newMap.set(key, {
          nodeId: node.id,
          boardId,
          row,
          col,
          points: pointsCost
        });
        return newMap;
      });
    }
  }, [allocations, reachableNodes, usedPoints, totalPoints, data.boards, connectedBoards]);
  
  // 逆时针旋转
  const rotateBoardCounterClockwise = useCallback((index: number) => {
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      const currentRotation = newBoards[index].rotation;
      const newRotation = ((currentRotation - 90) + 360) % 360 as 0 | 90 | 180 | 270;
      newBoards[index] = { ...newBoards[index], rotation: newRotation };
      return newBoards;
    });
  }, []);
  
  // 顺时针旋转
  const rotateBoardClockwise = useCallback((index: number) => {
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      const currentRotation = newBoards[index].rotation;
      const newRotation = (currentRotation + 90) % 360 as 0 | 90 | 180 | 270;
      newBoards[index] = { ...newBoards[index], rotation: newRotation };
      return newBoards;
    });
  }, []);
  
  // 移动盘面到新位置
  const moveBoard = useCallback((index: number, gridLocation: string) => {
    // 检查位置是否已被占用
    const isOccupied = connectedBoards.some((board, i) => i !== index && board.gridLocation === gridLocation);
    
    if (isOccupied) {
      // 如果目标位置被占用，交换位置
      const targetIndex = connectedBoards.findIndex((board, i) => i !== index && board.gridLocation === gridLocation);
      if (targetIndex !== -1) {
        setConnectedBoards(prev => {
          const newBoards = [...prev];
          const tempLoc = newBoards[index].gridLocation;
          newBoards[index] = { ...newBoards[index], gridLocation };
          newBoards[targetIndex] = { ...newBoards[targetIndex], gridLocation: tempLoc };
          return newBoards;
        });
      }
    } else {
      setConnectedBoards(prev => {
        const newBoards = [...prev];
        newBoards[index] = { ...newBoards[index], gridLocation };
        return newBoards;
      });
    }
  }, [connectedBoards]);
  
  // 更换巅峰盘
  const changeBoard = useCallback((index: number, newBoardId: string) => {
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      newBoards[index] = { ...newBoards[index], boardId: newBoardId };
      return newBoards;
    });
  }, []);
  
  // 通过Gate连接新盘面
  const connectBoardViaGate = useCallback((targetBoardId: string) => {
    if (!selectingBoardForGate) return;
    
    const { boardIndex, gateDirection, gateRow, gateCol } = selectingBoardForGate;
    const currentBoard = connectedBoards[boardIndex];
    
    if (!currentBoard) return;
    
    // 使用findAdjacentGridLocation确定目标grid位置
    const targetGridLocation = findAdjacentGridLocation(
      currentBoard.gridLocation,
      gateRow,
      gateCol,
      currentBoard.rotation
    );
    
    if (!targetGridLocation) {
      setSelectingBoardForGate(null);
      return;
    }
    
    // 根据gateDirection确定新盘面的入口Gate
    // gateDirection表示父盘Gate所在的方向，新盘面在相反方向
    // 入口Gate是与父盘Gate对接的那个Gate
    let entryGate: { row: number; col: number } | undefined;
    
    // 获取新盘面的gatePositions来确定入口Gate的位置
    const targetBoard = data.boards.find(b => b.id === targetBoardId);
    if (targetBoard && targetBoard.gatePositions) {
      // gateDirection="top" → 新盘面在上方 → 新盘面的"bottom" Gate是入口
      // gateDirection="bottom" → 新盘面在下方 → 新盘面的"top" Gate是入口
      // gateDirection="left" → 新盘面在左侧 → 新盘面的"right" Gate是入口
      // gateDirection="right" → 新盘面在右侧 → 新盘面的"left" Gate是入口
      const oppositeDir: Record<string, string> = {
        'top': 'bottom',
        'bottom': 'top',
        'left': 'right',
        'right': 'left'
      };
      const entryGatePosition = oppositeDir[gateDirection] as keyof typeof targetBoard.gatePositions;
      const gateList = targetBoard.gatePositions[entryGatePosition];
      if (gateList && gateList.length > 0) {
        entryGate = { row: gateList[0].row, col: gateList[0].col };
      }
    }
    
    // 检查目标位置是否已被占用，如果已被占用则替换
    const existingIndex = connectedBoards.findIndex(b => b.gridLocation === targetGridLocation);
    if (existingIndex !== -1) {
      // 替换已存在的盘面
      setConnectedBoards(prev => {
        const newBoards = [...prev];
        newBoards[existingIndex] = {
          ...newBoards[existingIndex],
          boardId: targetBoardId,
          equippedGlyph: null,
          entryGate
        };
        return newBoards;
      });
    } else {
        // 添加新盘面
        // 检查是否已达到最大数量（1个起始盘 + 4个连接盘 = 5个）
        if (connectedBoards.length >= 5) {
          console.warn('已达到最大盘面数量限制（5个）');
          setSelectingBoardForGate(null);
          return;
        }
        
        const newBoard: BoardInstance = {
          boardIndex: connectedBoards.length,
          boardId: targetBoardId,
          gridLocation: targetGridLocation,
          rotation: 0,
          equipIndex: connectedBoards.length + 1,
          equippedGlyph: null,
          entryGate
        };
        setConnectedBoards(prev => [...prev, newBoard]);
      }
    
    setSelectingBoardForGate(null);
    
    // 点亮Gate节点
    const gateKey = `${currentBoard.boardId}_${gateRow}_${gateCol}`;
    setAllocations(prev => {
      const newMap = new Map(prev);
      newMap.set(gateKey, {
        nodeId: 'Generic_Gate',
        boardId: currentBoard.boardId,
        row: gateRow,
        col: gateCol,
        points: 1
      });
      return newMap;
    });
  }, [selectingBoardForGate, connectedBoards]);
  
  // 设置装备索引
  const setEquipIndex = useCallback((index: number, equipIndex: number) => {
    if (equipIndex < 1 || equipIndex > 9) return;
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      newBoards[index] = { ...newBoards[index], equipIndex };
      return newBoards;
    });
  }, []);
  
  // 装备雕文
  const equipGlyph = useCallback((index: number, glyphId: string, rank: number) => {
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      newBoards[index] = { 
        ...newBoards[index], 
        equippedGlyph: { glyphId, rank } 
      };
      return newBoards;
    });
  }, []);
  
  // 移除雕文
  const removeGlyph = useCallback((index: number) => {
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      newBoards[index] = { ...newBoards[index], equippedGlyph: null };
      return newBoards;
    });
  }, []);
  
  // 安装socket雕纹
  const equipSocketGlyph = useCallback((boardId: string, row: number, col: number, glyphId: string, rank: number) => {
    const key = `${boardId}_${row}_${col}`;
    setSocketGlyphs(prev => {
      const newMap = new Map(prev);
      newMap.set(key, { glyphId, rank });
      return newMap;
    });
    setSelectingGlyphForSocket(null);
  }, []);
  
  // 获取节点名称
  const getNodeName = (node: GridNode): string => {
    if (language === 'zhCN' && node.nameCn) return node.nameCn;
    return node.nameEn || node.name || node.id;
  };
  
  // 翻译常见英文术语
  const translateTerms = (text: string): string => {
    const translations: [string, string][] = [
      ['Physical', '物理'],
      ['Damage', '伤害'],
      ['Strength', '力量'],
      ['Intelligence', '智力'],
      ['Willpower', '意力'],
      ['Dexterity', '敏捷'],
      ['Armor', '护甲'],
      ['Life', '生命'],
      ['Bonus', '加成'],
      ['Another', '额外'],
      ['if requirements met', '满足门槛要求'],
      ['requirements', '门槛要求'],
      ['met', '满足'],
      ['\\+', '+'],
      ['%', '%']
    ];
    
    let result = text;
    for (const [en, cn] of translations) {
      const regex = new RegExp(en, 'g');
      result = result.replace(regex, cn);
    }
    
    // 去掉 "Tags:" 及其后面的内容
    const tagsIndex = result.indexOf('\n\nTags:');
    if (tagsIndex !== -1) {
      result = result.substring(0, tagsIndex);
    }
    
    // 清理多余的空行
    result = result.replace(/\n{3,}/g, '\n\n').trim();
    
    return result;
  };

  // 计算门槛要求的实际值
  const calculateThresholdRequirements = (node: GridNode, equipIndex: number = 1, className: string = 'Barbarian'): string => {
    if (!node.thresholdRequirements) return '';
    
    const classRequirements = node.thresholdRequirements[className];
    if (!classRequirements || classRequirements.length === 0) return '';
    
    // 计算第一个门槛要求
    let requirement = classRequirements[0];
    
    // 替换 {160 + (90 * ParagonBoardEquipIndex)} 这样的表达式
    const expressionMatch = requirement.match(/\{(.+?)\}/);
    if (expressionMatch) {
      const expression = expressionMatch[1];
      // 替换 ParagonBoardEquipIndex 为实际值
      const evaluatedExpression = expression.replace(/ParagonBoardEquipIndex/g, equipIndex.toString());
      try {
        const result = eval(evaluatedExpression);
        requirement = requirement.replace(/\{.+?\}/, Math.round(result).toString());
      } catch (e) {
        console.error('Failed to evaluate threshold expression:', e);
      }
    }
    
    return requirement;
  };

  // 属性名称翻译映射
  const attributeTranslations: Record<string, string> = {
    'Strength': '力量',
    'Intelligence': '智力',
    'Willpower': '意力',
    'Dexterity': '敏捷'
  };
  
  // 翻译门槛要求中的属性名称
  const translateAttributeName = (requirement: string): string => {
    for (const [en, cn] of Object.entries(attributeTranslations)) {
      requirement = requirement.replace(new RegExp(en, 'g'), cn);
    }
    return requirement;
  };
  
  // 获取节点描述
  const getNodeDesc = (node: GridNode, equipIndex: number = 1, className: string = 'Barbarian'): string => {
    let desc = '';
    if (language === 'zhCN' && node.descCn) {
      desc = node.descCn;
    } else {
      desc = node.descEn || node.desc || '';
    }
    
    // 去掉 "Tags:" 及其后面的内容
    const tagsIndex = desc.indexOf('\n\nTags:');
    if (tagsIndex !== -1) {
      desc = desc.substring(0, tagsIndex);
    }
    
    // 翻译英文术语（仅中文模式）- 先翻译
    if (language === 'zhCN') {
      desc = translateTerms(desc);
    }
    
    // 动态替换 {thresholdRequirements} 为实际计算值 - 后替换
    if (desc.includes('{thresholdRequirements}')) {
      const thresholdRequirement = calculateThresholdRequirements(node, equipIndex, className);
      if (thresholdRequirement) {
        // 根据语言翻译属性名称
        let translatedRequirement = thresholdRequirement;
        if (language === 'zhCN') {
          translatedRequirement = translateAttributeName(thresholdRequirement);
        }
        desc = desc.replace(/{thresholdRequirements}/g, translatedRequirement);
      }
    }
    
    return desc.trim();
  };
  
  // 获取雕纹名称
  const getGlyphName = (glyph: Glyph): string => {
    if (language === 'zhCN' && glyph.nameCn) return glyph.nameCn;
    return glyph.name || glyph.nameEn || glyph.id;
  };
  
  // 过滤节点列表
  const filteredNodes = useMemo(() => {
    const nodes: Array<{ node: GridNode; boardId: string; row: number; col: number }> = [];
    
    connectedBoards.forEach(instance => {
      const board = data.boards.find(b => b.id === instance.boardId);
      if (!board) return;
      
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const node = board.grid[row]?.[col];
          if (!node) continue;
          
          // 类型过滤
          if (typeFilter !== 'all' && node.type !== typeFilter) continue;
          
          // 搜索过滤
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const name = getNodeName(node).toLowerCase();
            const desc = getNodeDesc(node).toLowerCase();
            if (!name.includes(query) && !desc.includes(query) && !node.id.toLowerCase().includes(query)) {
              continue;
            }
          }
          
          nodes.push({ node, boardId: instance.boardId, row, col });
        }
      }
    });
    
    return nodes;
  }, [data.boards, connectedBoards, typeFilter, searchQuery, language]);
  
  // 重置模拟器
  const resetSimulator = useCallback(() => {
    setAllocations(new Map());
  }, []);
  
  // 清理指定盘面的所有节点分配
  const clearBoardAllocations = useCallback((index: number) => {
    const board = connectedBoards[index];
    if (!board) return;
    
    setAllocations(prev => {
      const newMap = new Map(prev);
      newMap.forEach((_, key) => {
        if (key.startsWith(board.boardId + '_')) {
          newMap.delete(key);
        }
      });
      return newMap;
    });
  }, [connectedBoards]);
  
  // 替换盘面（弹出选择框）
  const [replacingBoardIndex, setReplacingBoardIndex] = useState<number | null>(null);
  
  const handleReplaceBoard = useCallback((index: number) => {
    setReplacingBoardIndex(index);
  }, []);
  
  const confirmReplaceBoard = useCallback((newBoardId: string) => {
    if (replacingBoardIndex === null) return;
    
    setConnectedBoards(prev => {
      const newBoards = [...prev];
      newBoards[replacingBoardIndex] = {
        ...newBoards[replacingBoardIndex],
        boardId: newBoardId,
        equippedGlyph: null,
        entryGate: undefined
      };
      return newBoards;
    });
    
    // 同时清除该盘面的所有节点分配
    const board = connectedBoards[replacingBoardIndex];
    if (board) {
      setAllocations(prev => {
        const newMap = new Map(prev);
        newMap.forEach((_, key) => {
          if (key.startsWith(board.boardId + '_')) {
            newMap.delete(key);
          }
        });
        return newMap;
      });
    }
    
    setReplacingBoardIndex(null);
  }, [replacingBoardIndex, connectedBoards]);
  
  // 删除盘面
  const handleDeleteBoard = useCallback((index: number) => {
    const board = connectedBoards[index];
    if (!board || board.boardId.includes('Start')) return; // 不能删除起始盘
    
    // 删除该盘面的所有节点分配
    setAllocations(prev => {
      const newMap = new Map(prev);
      newMap.forEach((_, key) => {
        if (key.startsWith(board.boardId + '_')) {
          newMap.delete(key);
        }
      });
      return newMap;
    });
    
    // 删除盘面
    setConnectedBoards(prev => {
      const newBoards = prev.filter((_, i) => i !== index);
      // 更新剩余盘面的boardIndex
      return newBoards.map((b, i) => ({ ...b, boardIndex: i }));
    });
    
    // 更新选中状态
    if (selectedBoardIndex === index) {
      setSelectedBoardIndex(0);
    } else if (selectedBoardIndex > index) {
      setSelectedBoardIndex(selectedBoardIndex - 1);
    }
  }, [connectedBoards, selectedBoardIndex]);
  
  // 获取选中的雕文数据
  const selectedGlyph = useMemo(() => {
    const selectedBoard = connectedBoards[selectedBoardIndex];
    if (!selectedBoard?.equippedGlyph) return null;
    return data.glyphs.find(g => g.id === selectedBoard.equippedGlyph?.glyphId);
  }, [selectedBoardIndex, connectedBoards, data.glyphs]);

  return (
    <div className="app">
      <header className="header">
        <h1>暗黑破坏神4 巅峰盘模拟器</h1>
        <div className="header-controls">
          <select 
            value={currentClass} 
            onChange={(e) => setCurrentClass(e.target.value as ClassName)}
            className="class-select"
          >
            <option value="Barbarian">野蛮人</option>
            <option value="Druid">德鲁伊</option>
            <option value="Necromancer">死灵法师</option>
            <option value="Rogue">游侠</option>
            <option value="Sorcerer">法师</option>
          </select>
          
          <button 
            className={`lang-btn ${language === 'zhCN' ? 'active' : ''}`}
            onClick={() => setLanguage('zhCN')}
          >
            中文
          </button>
          <button 
            className={`lang-btn ${language === 'enUS' ? 'active' : ''}`}
            onClick={() => setLanguage('enUS')}
          >
            English
          </button>
        </div>
      </header>
      
      <div className="main-container">
        {/* 左侧面板 - 盘面选择 */}
        <div className="left-panel">
          {/* 操作模式 */}
          <div className="panel-section">
            <h3>操作模式</h3>
            <div className="mode-buttons">
              <button 
                className={`mode-btn ${operationMode === 'select' ? 'active' : ''}`}
                onClick={() => setOperationMode('select')}
              >
                选择
              </button>
              <button 
                className={`mode-btn ${operationMode === 'move' ? 'active' : ''}`}
                onClick={() => setOperationMode('move')}
              >
                移动
              </button>
              <button 
                className={`mode-btn ${operationMode === 'rotate' ? 'active' : ''}`}
                onClick={() => setOperationMode('rotate')}
              >
                旋转
              </button>
            </div>
            
            {/* 快捷路径模式切换 */}
            <div className="quick-path-toggle">
              <button 
                className={`quick-path-btn ${quickPathMode ? 'active' : ''}`}
                onClick={() => setQuickPathMode(!quickPathMode)}
              >
                {quickPathMode ? '✓ 快捷路径模式' : '快捷路径模式'}
              </button>
              <p className="quick-path-hint">启用后，点击任意未点亮节点会自动点亮最短路径</p>
            </div>
          </div>
          
          {/* 已连接的巅峰盘 */}
          <div className="panel-section">
            <h3>已连接的巅峰盘 ({connectedBoards.length}/5)</h3>
            <div className="board-list">
              {connectedBoards.map((instance, index) => {
                const board = data.boards.find(b => b.id === instance.boardId);
                return (
                  <div 
                    key={index}
                    className={`board-item ${selectedBoardIndex === index ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedBoardIndex(index);
                    }}
                  >
                    <div className="board-header">
                      <span className="board-name">{board?.name || instance.boardId}</span>
                      <span className="board-location">位置: {instance.gridLocation}</span>
                    </div>
                    
                    {/* 旋转控制 */}
                    <div className="board-controls">
                      <div className="rotation-controls">
                        <button 
                          className="rot-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            rotateBoardCounterClockwise(index);
                          }}
                          title="逆时针旋转"
                        >
                          ↺
                        </button>
                        <span className="rotation-value">{instance.rotation}°</span>
                        <button 
                          className="rot-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            rotateBoardClockwise(index);
                          }}
                          title="顺时针旋转"
                        >
                          ↻
                        </button>
                      </div>
                    </div>
                    
                    {/* 更换巅峰盘 */}
                    <div className="board-change">
                      <select 
                        value={instance.boardId}
                        onChange={(e) => {
                          changeBoard(index, e.target.value);
                        }}
                        className="board-select"
                      >
                        {data.boards.map(b => (
                          <option key={b.id} value={b.id}>
                            {b.name || b.id}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* 装备索引 */}
                    <div className="equip-index">
                      <label>装备索引:</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="9" 
                        value={instance.equipIndex}
                        onChange={(e) => setEquipIndex(index, parseInt(e.target.value))}
                        className="equip-index-input"
                      />
                    </div>
                    
                    {/* 网格位置选择 */}
                    <div className="grid-position">
                      <label>网格位置:</label>
                      <select 
                        value={instance.gridLocation}
                        onChange={(e) => moveBoard(index, e.target.value)}
                        className="grid-select"
                      >
                        <option value="">选择位置</option>
                        {BOARD_LOCATIONS.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* 雕文插槽 */}
                    <div className="glyph-socket">
                      <label>雕文:</label>
                      <select 
                        value={instance.equippedGlyph?.glyphId || ''}
                        onChange={(e) => {
                          if (e.target.value) {
                            equipGlyph(index, e.target.value, 1);
                          } else {
                            removeGlyph(index);
                          }
                        }}
                        className="glyph-select"
                      >
                        <option value="">选择雕文</option>
                        {data.glyphs.map(glyph => (
                          <option key={glyph.id} value={glyph.id}>
                            {getGlyphName(glyph)}
                          </option>
                        ))}
                      </select>
                      {instance.equippedGlyph && (
                        <div className="glyph-rank">
                          <label>等级:</label>
                          <input 
                            type="range" 
                            min="1" 
                            max="21" 
                            value={instance.equippedGlyph!.rank}
                            onChange={(e) => {
                              equipGlyph(index, instance.equippedGlyph!.glyphId, parseInt(e.target.value));
                            }}
                            className="glyph-rank-slider"
                          />
                          <span>{instance.equippedGlyph!.rank}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 属性统计 */}
          <div className="panel-section">
            <h3>属性统计</h3>
            <div className="stats-panel">
              <div className="stat-item">
                <span className="stat-label">剩余点数</span>
                <span className="stat-value">{totalPoints - usedPoints}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">已用点数</span>
                <span className="stat-value">{usedPoints}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Strength</span>
                <span className="stat-value">{playerAttributes.Strength}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Intelligence</span>
                <span className="stat-value">{playerAttributes.Intelligence}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Willpower</span>
                <span className="stat-value">{playerAttributes.Willpower}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Dexterity</span>
                <span className="stat-value">{playerAttributes.Dexterity}</span>
              </div>
            </div>
          </div>
          
          {/* 连接状态 */}
          <div className="panel-section">
            <h3>连接状态</h3>
            <div className="connections-panel">
              {checkGateConnections.length > 0 ? (
                checkGateConnections.map((conn, i) => (
                  <div key={i} className="connection-item">
                    <span>{connectedBoards[conn.from].boardId.split('_').pop()}</span>
                    <span className="connection-arrow">↔</span>
                    <span>{connectedBoards[conn.to].boardId.split('_').pop()}</span>
                  </div>
                ))
              ) : (
                <span className="no-connections">暂无连接</span>
              )}
            </div>
          </div>
          
          {/* 操作按钮 */}
          <button className="reset-btn" onClick={resetSimulator}>
            重置模拟器
          </button>
          
          <button 
            className={`toggle-panel-btn ${showRightPanel ? 'active' : ''}`} 
            onClick={() => setShowRightPanel(!showRightPanel)}
          >
            {showRightPanel ? '隐藏右侧面板' : '显示右侧面板'}
          </button>
        </div>
        
        {/* 中间 - 画布 */}
        <div className={`center-panel ${!showRightPanel ? 'full-width' : ''}`}>
          <ParagonCanvas
            boards={data.boards}
            connectedBoards={connectedBoards}
            allocations={allocations}
            reachableNodes={reachableNodes}
            socketGlyphs={socketGlyphs}
            hoveredNode={hoveredNode}
            onNodeHover={setHoveredNode}
            onNodeClick={handleNodeClick}
            zoom={zoom}
            pan={pan}
            onZoomChange={setZoom}
            onPanChange={setPan}
            onRotateBoard={rotateBoardClockwise}
            onClearBoard={clearBoardAllocations}
            onReplaceBoard={handleReplaceBoard}
            onDeleteBoard={handleDeleteBoard}
          />
        </div>
        
        {/* Gate选择模态框 */}
        {selectingBoardForGate && (
          <div className="modal-overlay" onClick={() => setSelectingBoardForGate(null)}>
            <div className="modal-content gate-select-modal" onClick={e => e.stopPropagation()}>
              <h3>选择连接的巅峰盘</h3>
              <div className="board-grid">
                {data.boards.filter(b => !b.id.includes('Start') && !connectedBoards.some(cb => cb.boardId === b.id)).map(board => (
                  <button
                    key={board.id}
                    className="board-select-btn"
                    onClick={() => connectBoardViaGate(board.id)}
                  >
                    {board.name}
                  </button>
                ))}
              </div>
              <button 
                className="cancel-btn"
                onClick={() => setSelectingBoardForGate(null)}
              >
                取消
              </button>
            </div>
          </div>
        )}
        
        {/* 替换盘面模态框 */}
        {replacingBoardIndex !== null && (
          <div className="modal-overlay" onClick={() => setReplacingBoardIndex(null)}>
            <div className="modal-content gate-select-modal" onClick={e => e.stopPropagation()}>
              <h3>替换巅峰盘</h3>
              <div className="board-grid">
                {data.boards.filter(b => !b.id.includes('Start') && !connectedBoards.some((cb, i) => i !== replacingBoardIndex && cb.boardId === b.id)).map(board => (
                  <button
                    key={board.id}
                    className={`board-select-btn ${connectedBoards[replacingBoardIndex]?.boardId === board.id ? 'selected' : ''}`}
                    onClick={() => confirmReplaceBoard(board.id)}
                  >
                    {board.name}
                  </button>
                ))}
              </div>
              <button 
                className="cancel-btn"
                onClick={() => setReplacingBoardIndex(null)}
              >
                取消
              </button>
            </div>
          </div>
        )}
        
        {/* Socket雕纹选择模态框 */}
        {selectingGlyphForSocket && (
          <div className="modal-overlay" onClick={() => setSelectingGlyphForSocket(null)}>
            <div className="modal-content glyph-select-modal" onClick={e => e.stopPropagation()}>
              <h3>选择雕纹</h3>
              <div className="glyph-grid">
                {data.glyphs.map(glyph => (
                  <button
                    key={glyph.id}
                    className="glyph-select-btn"
                    onClick={() => equipSocketGlyph(selectingGlyphForSocket.boardId, selectingGlyphForSocket.row, selectingGlyphForSocket.col, glyph.id, 1)}
                  >
                    <span className="glyph-name">{getGlyphName(glyph)}</span>
                    {glyph.thresholdCn && <span className="glyph-threshold">{glyph.thresholdCn}</span>}
                  </button>
                ))}
              </div>
              <button 
                className="cancel-btn"
                onClick={() => setSelectingGlyphForSocket(null)}
              >
                取消
              </button>
            </div>
          </div>
        )}
        
        {/* 节点Tooltip */}
        {hoveredNode && (
          <NodeTooltip 
            node={hoveredNode.node}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            language={language}
          />
        )}
        
        {/* 右侧面板 - 节点详情 */}
        {showRightPanel && (
          <div className="right-panel">
            {/* 搜索和过滤 */}
            <div className="panel-section">
              <input
                type="text"
                placeholder="搜索节点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('all')}
                >
                  全部
                </button>
                <button 
                  className={`filter-btn ${typeFilter === 'normal' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('normal')}
                >
                  普通
                </button>
                <button 
                  className={`filter-btn ${typeFilter === 'magic' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('magic')}
                >
                  魔法
                </button>
                <button 
                  className={`filter-btn ${typeFilter === 'rare' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('rare')}
                >
                  稀有
                </button>
                <button 
                  className={`filter-btn ${typeFilter === 'legendary' ? 'active' : ''}`}
                  onClick={() => setTypeFilter('legendary')}
                >
                  传奇
                </button>
              </div>
            </div>
            
            {/* 悬停节点详情 */}
            <div className="panel-section node-detail">
              {hoveredNode ? (
                <>
                  <h3>{getNodeName(hoveredNode.node)}</h3>
                  <div className="node-type-badge" data-type={hoveredNode.node.type}>
                    {NODE_TYPE_LABELS[hoveredNode.node.type][language]}
                  </div>
                  <p className="node-desc">{getNodeDesc(hoveredNode.node)}</p>
                  <div className="node-coords">
                    位置: {hoveredNode.boardId} ({hoveredNode.row}, {hoveredNode.col})
                  </div>
                  {reachableNodes.has(`${hoveredNode.boardId}_${hoveredNode.row}_${hoveredNode.col}`) && 
                   !allocations.has(`${hoveredNode.boardId}_${hoveredNode.row}_${hoveredNode.col}`) && (
                    <div className="node-hint">点击分配点数</div>
                  )}
                </>
              ) : (
                <>
                  <h3>节点详情</h3>
                  <div className="node-empty">
                    鼠标悬停在节点上查看详情
                  </div>
                </>
              )}
            </div>
            
            {/* 当前选中雕文详情 */}
            {selectedGlyph && (
              <div className="panel-section glyph-detail">
                <h3>当前雕文: {getGlyphName(selectedGlyph)}</h3>
                <div className="glyph-info">
                  <div className="glyph-desc">
                    {selectedGlyph.descCn || selectedGlyph.desc}
                  </div>
                  {selectedGlyph.threshold && (
                    <div className="glyph-threshold">
                      需求: {selectedGlyph.thresholdCn || selectedGlyph.threshold}
                    </div>
                  )}
                  {selectedGlyph.bonus && (
                    <div className="glyph-bonus">
                      {selectedGlyph.bonusCn || selectedGlyph.bonus}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* 节点列表 */}
            <div className="panel-section">
              <h3>节点列表 ({filteredNodes.length})</h3>
              <div className="node-list">
                {filteredNodes.slice(0, 50).map(({ node, boardId, row, col }) => {
                  const key = `${boardId}_${row}_${col}`;
                  const isAllocated = allocations.has(key);
                  return (
                    <div 
                      key={key}
                      className={`node-list-item ${isAllocated ? 'allocated' : ''}`}
                      onClick={() => handleNodeClick(boardId, row, col, node)}
                    >
                      <span className={`node-dot ${node.type}`}></span>
                      <span className="node-name">{getNodeName(node)}</span>
                      <span className="node-board">{boardId}</span>
                      {isAllocated && <span className="allocated-badge">已分配</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* 雕纹列表 */}
            <div className="panel-section">
              <h3>可用雕纹 ({data.glyphs.length})</h3>
              <div className="glyph-list">
                {data.glyphs.slice(0, 10).map(glyph => (
                  <div key={glyph.id} className="glyph-item">
                    <div className="glyph-name">{getGlyphName(glyph)}</div>
                    {glyph.tiers && (
                      <div className="glyph-tiers">
                        {glyph.tiers.slice(0, 5).map((t, i) => (
                          <span key={i} className="tier-badge">Lv{i+1}: +{t}</span>
                        ))}
                        ...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;