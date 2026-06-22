import { useState, useMemo, useCallback, useEffect } from 'react';
import ParagonCanvas from './components/ParagonCanvas';
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
  CELL_SIZE,
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

type ClassName = 'Barbarian' | 'Druid' | 'Necromancer' | 'Rogue' | 'Sorcerer';

// 网格布局常量
const GRID_LAYOUT = [
  ['V', 'E', 'F', 'G', 'H', 'I', 'U'],
  ['W', 'D', 'J', 'K', 'L', 'M', 'T'],
  ['X', 'C', '7', '8', '9', 'N', 'S'],
  ['Y', 'B', '4', '5', '6', 'O', 'R'],
  ['Z', 'A', '1', '2', '3', 'P', 'Q'],
];

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
  
  // 画布变换
  const [zoom, setZoom] = useState(0.3);
  const [pan, setPan] = useState({ x: -100, y: 1940 });
  
  // 选择巅峰盘时自动聚焦
  useEffect(() => {
    const selectedBoard = connectedBoards[selectedBoardIndex];
    if (!selectedBoard) return;
    
    const [gridX, gridY] = PARAGON_GRID_COORDINATES[selectedBoard.gridLocation] || [0, 0];
    const boardWidth = 21 * CELL_SIZE;
    const boardHeight = 21 * CELL_SIZE;
    
    // 盘面中心坐标
    const centerX = gridX + boardWidth / 2;
    const centerY = gridY + boardHeight / 2;
    
    // 设置缩放
    const newZoom = 0.3;
    
    setPan({
      x: -centerX * newZoom,
      y: -centerY * newZoom
    });
    setZoom(newZoom);
  }, [selectedBoardIndex, connectedBoards]);
  
  // 悬停的节点
  const [hoveredNode, setHoveredNode] = useState<{
    node: GridNode;
    boardId: string;
    row: number;
    col: number;
  } | null>(null);
  
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
      const isEntryGate = currentBoard.entryGate?.row === row && currentBoard.entryGate?.col === col;
      
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
        // 非入口Gate：检查是否已链接（被点亮）
        if (!isAllocated) {
          // 未链接：弹出选择框
          // 找到当前盘面在connectedBoards中的索引
          const boardIndex = connectedBoards.findIndex(b => b.boardId === boardId);
          
          // 根据Gate节点位置确定方向
          let gateDirection: string;
          if (col === 0) {
            gateDirection = 'left';
          } else if (col === 20) {
            gateDirection = 'right';
          } else if (row === 0) {
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
        // 如果已链接，则不处理（可以后续添加替换功能）
      }
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
  
  // 获取节点名称
  const getNodeName = (node: GridNode): string => {
    if (language === 'zhCN' && node.nameCn) return node.nameCn;
    return node.nameEn || node.name || node.id;
  };
  
  // 获取节点描述
  const getNodeDesc = (node: GridNode): string => {
    if (language === 'zhCN' && node.descCn) return node.descCn;
    return node.descEn || node.desc || '';
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
          {/* 网格位置指示 */}
          <div className="grid-overlay">
            {GRID_LAYOUT.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((loc) => {
                  const isOccupied = connectedBoards.some(b => b.gridLocation === loc);
                  return (
                    <button
                      key={loc}
                      className={`grid-cell ${isOccupied ? 'occupied' : ''} ${connectedBoards.find(b => b.gridLocation === loc)?.boardId === connectedBoards[selectedBoardIndex]?.boardId ? 'selected' : ''}`}
                      onClick={() => {
                        const boardAtLocation = connectedBoards.find(b => b.gridLocation === loc);
                        if (boardAtLocation) {
                          setSelectedBoardIndex(boardAtLocation.boardIndex);
                        }
                      }}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          
          <ParagonCanvas
            boards={data.boards}
            connectedBoards={connectedBoards}
            allocations={allocations}
            reachableNodes={reachableNodes}
            hoveredNode={hoveredNode}
            onNodeHover={setHoveredNode}
            onNodeClick={handleNodeClick}
            zoom={zoom}
            pan={pan}
            onZoomChange={setZoom}
            onPanChange={setPan}
          />
        </div>
        
        {/* Gate选择模态框 */}
        {selectingBoardForGate && (
          <div className="modal-overlay" onClick={() => setSelectingBoardForGate(null)}>
            <div className="modal-content gate-select-modal" onClick={e => e.stopPropagation()}>
              <h3>选择连接的巅峰盘</h3>
              <div className="board-grid">
                {data.boards.filter(b => !b.id.includes('Start')).map(board => (
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