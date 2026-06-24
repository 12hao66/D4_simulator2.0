import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { 
  ParagonBoard, 
  GridNode, 
  NODE_TYPE_COLORS,
  ALLOCATED_COLORS,
  NODE_SIZE,
  NODE_GAP,
  CELL_SIZE,
  NodeType,
  NodeAllocation,
  BoardInstance,
  PARAGON_GRID_COORDINATES
} from '../types';

interface ParagonCanvasProps {
  boards: ParagonBoard[];
  connectedBoards: BoardInstance[];
  allocations: Map<string, NodeAllocation>;
  reachableNodes: Set<string>;
  socketGlyphs: Map<string, { glyphId: string; rank: number }>;
  hoveredNode: { node: GridNode; boardId: string; row: number; col: number } | null;
  onNodeHover: (node: { node: GridNode; boardId: string; row: number; col: number } | null) => void;
  onNodeClick: (boardId: string, row: number, col: number, node: GridNode) => void;
  // 外部状态控制
  zoom: number;
  pan: { x: number; y: number };
  onZoomChange: (zoom: number) => void;
  onPanChange: (pan: { x: number; y: number }) => void;
  // 工具栏操作回调
  onRotateBoard: (index: number) => void;
  onClearBoard: (index: number) => void;
  onReplaceBoard: (index: number) => void;
  onDeleteBoard: (index: number) => void;
}

// 工具栏按钮类型
type ToolbarAction = 'rotate' | 'clear' | 'replace' | 'delete';

// 工具栏按钮定义
const TOOLBAR_BUTTONS: { action: ToolbarAction; icon: string; title: string; tooltip: string }[] = [
  { action: 'rotate', icon: '↻', title: '旋转盘面', tooltip: '顺时针旋转90°' },
  { action: 'clear', icon: '⊗', title: '清理盘面', tooltip: '清除所有点亮节点' },
  { action: 'replace', icon: '⊕', title: '替换盘面', tooltip: '重新选择盘面' },
  { action: 'delete', icon: '⊖', title: '删除盘面', tooltip: '移除该盘面' },
];

const TOOLBAR_BUTTON_SIZE = 24;
const TOOLBAR_BUTTON_GAP = 8;
const TOOLBAR_PADDING = 10;



// 根据节点类型获取颜色
function getNodeColor(type: NodeType, isAllocated: boolean): string {
  return isAllocated 
    ? ALLOCATED_COLORS[type] || '#ff6600'
    : NODE_TYPE_COLORS[type] || '#6b6052';
}

// 计算节点在世界坐标中的位置
function getNodeWorldPosition(
  board: ParagonBoard,
  instance: BoardInstance,
  row: number,
  col: number,
  cellSize: number
): { x: number; y: number } {
  const [gridX, gridY] = PARAGON_GRID_COORDINATES[instance.gridLocation] || [0, 0];
  
  // PARAGON_GRID_COORDINATES存储的是盘面左上角坐标
  const offsetX = gridX;
  const offsetY = gridY;
  
  // 基础位置（相对于盘的左上角）
  const baseX = col * cellSize;
  const baseY = row * cellSize;
  
  // 如果盘旋转了，需要计算旋转后的位置
  if (instance.rotation !== 0) {
    const centerX = (board.cols * cellSize) / 2;
    const centerY = (board.rows * cellSize) / 2;
    const rad = (instance.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    
    // 旋转后的坐标
    const dx = baseX - centerX;
    const dy = baseY - centerY;
    const rotatedX = dx * cos - dy * sin + centerX;
    const rotatedY = dx * sin + dy * cos + centerY;
    
    return {
      x: offsetX + rotatedX,
      y: offsetY + rotatedY
    };
  }
  
  return {
    x: offsetX + baseX,
    y: offsetY + baseY
  };
}

// 计算节点的世界坐标（Canvas 中心）
function getNodeCenterWorld(
  board: ParagonBoard,
  instance: BoardInstance,
  row: number,
  col: number,
  cellSize: number
): { x: number; y: number } {
  const pos = getNodeWorldPosition(board, instance, row, col, cellSize);
  return {
    x: pos.x + cellSize / 2,
    y: pos.y + cellSize / 2
  };
}

// 绘制单个节点
function drawNode(
  ctx: CanvasRenderingContext2D,
  node: GridNode,
  x: number,
  y: number,
  size: number,
  isAllocated: boolean,
  isHovered: boolean,
  isReachable: boolean,
  glyphData?: { glyphId: string; rank: number } | null
) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // 内边距（小方块与圆形之间的间距）
  const padding = 4;
  const circleRadius = (size - padding * 2) / 2;
  
  const type = node.type;
  
  // ========== 步骤1：绘制背景小方块 ==========
  ctx.fillStyle = '#1a1a1a'; // 方块背景色（深灰色）
  ctx.fillRect(x, y, size, size);
  
  // 方块边框
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, size, size);
  
  // 基础颜色
  const baseColor = getNodeColor(type, isAllocated);
  
  // 绘制光晕效果
  if (isAllocated || type === 'legendary') {
    const glowSize = type === 'legendary' ? 10 : 8;
    const gradient = ctx.createRadialGradient(centerX, centerY, circleRadius, centerX, centerY, circleRadius + glowSize);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(0.5, baseColor + '60');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius + glowSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // ========== 步骤2：绘制居中的圆形节点 ==========
  ctx.fillStyle = baseColor;
  ctx.beginPath();
  
  if (type === 'gate' || type === 'socket') {
    // 菱形（在方块内居中）
    ctx.moveTo(centerX, centerY - circleRadius);
    ctx.lineTo(centerX + circleRadius, centerY);
    ctx.lineTo(centerX, centerY + circleRadius);
    ctx.lineTo(centerX - circleRadius, centerY);
    ctx.closePath();
  } else if (type === 'legendary') {
    // 六边形（居中）
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const px = centerX + circleRadius * Math.cos(angle);
      const py = centerY + circleRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else {
    // 圆形（居中）
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
  }
  ctx.fill();
  
  // 边框 - 点亮的节点用红色边框保持高亮
  if (isAllocated) {
    // 已分配节点：红色边框 + 光晕效果
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 8;
  } else if (isHovered) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
  } else if (isReachable) {
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
  } else {
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1.5;
  }
  ctx.stroke();
  ctx.shadowBlur = 0; // 清除阴影
  
  // 绘制节点图标/文字
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.35}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 根据类型绘制不同内容
  if (type === 'start') {
    ctx.fillText('★', centerX, centerY);
  } else if (type === 'gate') {
    ctx.fillText('▸', centerX, centerY);
  } else if (type === 'socket') {
    // 如果socket有雕纹，显示雕纹等级
    if (glyphData) {
      ctx.font = `bold ${size * 0.3}px Arial`;
      ctx.fillText(`${glyphData.rank}`, centerX, centerY);
    } else {
      ctx.fillText('◈', centerX, centerY);
    }
  } else if (type === 'legendary') {
    ctx.fillText('◆', centerX, centerY);
  }
}

// 绘制节点连接线
function drawConnectionLine(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  isActive: boolean
) {
  ctx.strokeStyle = isActive ? '#ff4444' : '#666666';
  ctx.lineWidth = isActive ? 4 : 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

export const ParagonCanvas: React.FC<ParagonCanvasProps> = ({
  boards,
  connectedBoards,
  allocations,
  reachableNodes,
  socketGlyphs,
  hoveredNode,
  onNodeHover,
  onNodeClick,
  zoom,
  pan,
  onZoomChange,
  onPanChange,
  onRotateBoard,
  onClearBoard,
  onReplaceBoard,
  onDeleteBoard,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 拖拽状态
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // 防抖定时器
  const hoverTimerRef = useRef<number | null>(null);
  
  // 悬停的工具栏按钮
  const [hoveredToolbarButton, setHoveredToolbarButton] = useState<{
    boardIndex: number;
    action: ToolbarAction;
    x: number;
    y: number;
  } | null>(null);
  
  // 计算所有连接线（节点之间的连接）
  const allConnections = useMemo(() => {
    const connections: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      isActive: boolean;
    }> = [];
    
    connectedBoards.forEach(instance => {
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) return;
      
      // 遍历所有节点，找相邻节点
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const node = board.grid[row]?.[col];
          if (!node) continue;
          
          const key = `${instance.boardId}_${row}_${col}`;
          const nodeAllocated = allocations.has(key);
          
          // 只绘制水平和垂直方向的连接
          const directions = [
            { dr: 0, dc: 1, name: 'right' },
            { dr: 1, dc: 0, name: 'down' }
          ];
          
          for (const dir of directions) {
            const nr = row + dir.dr;
            const nc = col + dir.dc;
            
            if (nr >= board.rows || nc >= board.cols) continue;
            const neighborNode = board.grid[nr]?.[nc];
            if (!neighborNode) continue;
            
            const neighborKey = `${instance.boardId}_${nr}_${nc}`;
            const neighborAllocated = allocations.has(neighborKey);
            
            // 只有至少有一个节点已分配时才绘制线
            if (nodeAllocated || neighborAllocated) {
              const fromPos = getNodeCenterWorld(board, instance, row, col, CELL_SIZE);
              const toPos = getNodeCenterWorld(board, instance, nr, nc, CELL_SIZE);
              
              connections.push({
                from: fromPos,
                to: toPos,
                isActive: nodeAllocated && neighborAllocated
              });
            }
          }
        }
      }
    });
    
    return connections;
  }, [boards, connectedBoards, allocations]);
  
  // 渲染函数
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置 Canvas 尺寸
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 填充背景色
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 应用变换
    ctx.save();
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
    ctx.scale(zoom, zoom);
    
    // 绘制所有连接线（节点之间的连接）
    allConnections.forEach(conn => {
      drawConnectionLine(ctx, conn.from.x, conn.from.y, conn.to.x, conn.to.y, conn.isActive);
    });
    
    // 绘制所有盘面和节点
    connectedBoards.forEach((instance, index) => {
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) return;
      
      const [gridX, gridY] = PARAGON_GRID_COORDINATES[instance.gridLocation] || [0, 0];
      
      // 计算盘面尺寸
      const boardWidth = board.cols * CELL_SIZE;
      const boardHeight = board.rows * CELL_SIZE;
      
      // PARAGON_GRID_COORDINATES存储的是盘面左上角坐标
      // 所有盘面使用统一的坐标系统，不进行额外偏移
      const offsetX = gridX;
      const offsetY = gridY;
      
      // 如果有旋转，应用旋转变换
      ctx.save();
      if (instance.rotation !== 0) {
        const centerX = boardWidth / 2;
        const centerY = boardHeight / 2;
        ctx.translate(offsetX + centerX, offsetY + centerY);
        ctx.rotate((instance.rotation * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
      }
      
      // 旋转后坐标系已改变，使用相对坐标(0,0)开始绘制
      const drawX = instance.rotation !== 0 ? 0 : offsetX;
      const drawY = instance.rotation !== 0 ? 0 : offsetY;
      
      // 绘制盘面背景（始终覆盖完整21×21范围）
      const fullBoardSize = 21 * CELL_SIZE; // 完整21×21逻辑范围
      ctx.fillStyle = '#252525';
      ctx.fillRect(drawX, drawY, fullBoardSize, fullBoardSize);
      
      // 绘制边框（始终覆盖完整21×21范围，红色描边）
      ctx.strokeStyle = '#ff0000'; // 红色边框
      ctx.lineWidth = 2 / zoom; // 边框宽度不随缩放变化
      ctx.strokeRect(drawX, drawY, fullBoardSize, fullBoardSize);
      
      // 绘制节点
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const node = board.grid[row]?.[col];
          if (!node) continue;
          
          const key = `${instance.boardId}_${row}_${col}`;
          const isAllocated = allocations.has(key);
          const isHovered = hoveredNode?.boardId === instance.boardId && 
                           hoveredNode?.row === row && 
                           hoveredNode?.col === col;
          const isReachable = reachableNodes.has(key) && !isAllocated;
          
          const x = drawX + col * CELL_SIZE + NODE_GAP;
          const y = drawY + row * CELL_SIZE + NODE_GAP;
          
          const glyphKey = `${instance.boardId}_${row}_${col}`;
          const glyphData = socketGlyphs.get(glyphKey);
          
          drawNode(ctx, node, x, y, NODE_SIZE, isAllocated, isHovered, isReachable, glyphData);
        }
      }
      
      ctx.restore();
      
      // 绘制盘面名称（在restore之后，使用原始坐标系）
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(board.name, offsetX + (board.cols * CELL_SIZE) / 2, offsetY - 10);
      
      // 绘制工具栏（右上角）- 不跟随旋转，始终保持在右上角
      drawToolbar(ctx, instance, board, index, offsetX, offsetY, boardWidth);
    });
    
    ctx.restore();
  }, [boards, connectedBoards, allocations, reachableNodes, allConnections, hoveredNode, zoom, pan, hoveredToolbarButton]);
  
  // 绘制工具栏
  const drawToolbar = (ctx: CanvasRenderingContext2D, instance: BoardInstance, board: ParagonBoard, boardIndex: number, offsetX: number = 0, offsetY: number = 0, boardWidth: number = 0) => {
    if (boardWidth === 0) {
      boardWidth = board.cols * CELL_SIZE;
    }
    
    // 工具栏位置：右上角，距离边缘有padding
    const toolbarX = offsetX + boardWidth - TOOLBAR_PADDING - TOOLBAR_BUTTON_SIZE;
    const toolbarY = offsetY + TOOLBAR_PADDING;
    
    // 计算需要显示的按钮
    const isStartBoard = instance.boardId.includes('Start');
    const buttonsToShow = isStartBoard 
      ? TOOLBAR_BUTTONS.filter(b => b.action === 'clear')
      : TOOLBAR_BUTTONS;
    
    // 绘制按钮
    buttonsToShow.forEach((btn, btnIndex) => {
      const btnX = toolbarX - btnIndex * (TOOLBAR_BUTTON_SIZE + TOOLBAR_BUTTON_GAP);
      const btnY = toolbarY;
      
      // 检查是否悬停
      const isHovered = hoveredToolbarButton?.boardIndex === boardIndex && 
                        hoveredToolbarButton?.action === btn.action;
      
      // 绘制按钮背景
      ctx.fillStyle = isHovered ? 'rgba(201, 161, 59, 0.3)' : 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, TOOLBAR_BUTTON_SIZE, TOOLBAR_BUTTON_SIZE, 4);
      ctx.fill();
      
      // 绘制按钮边框
      ctx.strokeStyle = isHovered ? '#c9a13b' : '#444';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // 绘制图标
      ctx.fillStyle = isHovered ? '#c9a13b' : '#ccc';
      ctx.font = `${TOOLBAR_BUTTON_SIZE * 0.6}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(btn.icon, btnX + TOOLBAR_BUTTON_SIZE / 2, btnY + TOOLBAR_BUTTON_SIZE / 2);
      
      // 绘制tooltip提示
      if (isHovered && btn.tooltip) {
        const tooltipPadding = 6;
        const tooltipFontSize = 12;
        ctx.font = `${tooltipFontSize}px Arial`;
        const tooltipWidth = ctx.measureText(btn.tooltip).width + tooltipPadding * 2;
        const tooltipHeight = tooltipFontSize + tooltipPadding * 2;
        
        // tooltip位置：按钮下方居中
        const tooltipX = btnX + TOOLBAR_BUTTON_SIZE / 2 - tooltipWidth / 2;
        const tooltipY = btnY + TOOLBAR_BUTTON_SIZE + 4;
        
        // 绘制tooltip背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4);
        ctx.fill();
        
        // 绘制tooltip边框
        ctx.strokeStyle = '#c9a13b';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // 绘制tooltip文字
        ctx.fillStyle = '#c9a13b';
        ctx.font = `${tooltipFontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(btn.tooltip, tooltipX + tooltipWidth / 2, tooltipY + tooltipHeight / 2);
      }
    });
  };
  
  // 获取鼠标在世界坐标中的位置
  const getWorldPosition = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const canvasX = clientX - rect.left;
    const canvasY = clientY - rect.top;
    
    return {
      x: (canvasX - canvas.width / 2 - pan.x) / zoom,
      y: (canvasY - canvas.height / 2 - pan.y) / zoom
    };
  }, [zoom, pan, canvasRef]);
  
  // 获取节点世界坐标（返回旋转后的四个角坐标）
  const getNodeWorldCorners = useCallback((board: ParagonBoard, instance: BoardInstance, row: number, col: number) => {
    const [gridX, gridY] = PARAGON_GRID_COORDINATES[instance.gridLocation] || [0, 0];
    
    const offsetX = gridX;
    const offsetY = gridY;
    const centerX = board.cols * CELL_SIZE / 2;
    const centerY = board.rows * CELL_SIZE / 2;
    
    if (instance.rotation !== 0) {
      const rad = (instance.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      
      // 节点四个角相对于盘面中心的坐标
      const corners = [
        [col * CELL_SIZE + NODE_GAP - centerX, row * CELL_SIZE + NODE_GAP - centerY],
        [col * CELL_SIZE + NODE_GAP + NODE_SIZE - centerX, row * CELL_SIZE + NODE_GAP - centerY],
        [col * CELL_SIZE + NODE_GAP + NODE_SIZE - centerX, row * CELL_SIZE + NODE_GAP + NODE_SIZE - centerY],
        [col * CELL_SIZE + NODE_GAP - centerX, row * CELL_SIZE + NODE_GAP + NODE_SIZE - centerY]
      ].map(([dx, dy]) => {
        // 使用与渲染一致的顺时针旋转公式
        // Canvas的ctx.rotate()在y轴向下的坐标系中，顺时针为正
        const rotatedDx = dx * cos - dy * sin;
        const rotatedDy = dx * sin + dy * cos;
        
        return [
          offsetX + centerX + rotatedDx,
          offsetY + centerY + rotatedDy
        ] as [number, number];
      });
      
      return corners;
    }
    
    // 没有旋转，直接返回四个角
    const nodeBaseX = offsetX + col * CELL_SIZE + NODE_GAP;
    const nodeBaseY = offsetY + row * CELL_SIZE + NODE_GAP;
    
    return [
      [nodeBaseX, nodeBaseY],
      [nodeBaseX + NODE_SIZE, nodeBaseY],
      [nodeBaseX + NODE_SIZE, nodeBaseY + NODE_SIZE],
      [nodeBaseX, nodeBaseY + NODE_SIZE]
    ] as [number, number][];
  }, []);
  
  // 获取节点边界框
  const getNodeWorldRect = useCallback((board: ParagonBoard, instance: BoardInstance, row: number, col: number) => {
    const corners = getNodeWorldCorners(board, instance, row, col);
    const xs = corners.map(c => c[0]);
    const ys = corners.map(c => c[1]);
    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys),
      corners
    };
  }, [getNodeWorldCorners]);
  
  // 点是否在多边形内（射线法）
  const isPointInPolygon = (x: number, y: number, corners: [number, number][]) => {
    let inside = false;
    const n = corners.length;
    
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = corners[i][0], yi = corners[i][1];
      const xj = corners[j][0], yj = corners[j][1];
      
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    
    return inside;
  };
  
  // 获取工具栏按钮的边界框
  const getToolbarButtonRect = (instance: BoardInstance, board: ParagonBoard, btnIndex: number) => {
    const [gridX, gridY] = PARAGON_GRID_COORDINATES[instance.gridLocation] || [0, 0];
    const boardWidth = board.cols * CELL_SIZE;
    
    const toolbarX = gridX + boardWidth - TOOLBAR_PADDING - TOOLBAR_BUTTON_SIZE;
    const toolbarY = gridY + TOOLBAR_PADDING;
    
    const btnX = toolbarX - btnIndex * (TOOLBAR_BUTTON_SIZE + TOOLBAR_BUTTON_GAP);
    const btnY = toolbarY;
    
    return {
      minX: btnX,
      minY: btnY,
      maxX: btnX + TOOLBAR_BUTTON_SIZE,
      maxY: btnY + TOOLBAR_BUTTON_SIZE
    };
  };
  
  // 鼠标移动处理
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 如果正在拖拽
    if (isDragging.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      onPanChange({ x: pan.x + dx, y: pan.y + dy });
      return;
    }
    
    // 计算鼠标在世界坐标中的位置
    const worldPos = getWorldPosition(e.clientX, e.clientY);
    
    // 先检查是否悬停在工具栏按钮上
    let foundToolbarButton: { boardIndex: number; action: ToolbarAction; x: number; y: number } | null = null;
    
    for (let boardIndex = 0; boardIndex < connectedBoards.length; boardIndex++) {
      const instance = connectedBoards[boardIndex];
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) continue;
      
      const isStartBoard = instance.boardId.includes('Start');
      const buttonsToShow = isStartBoard 
        ? TOOLBAR_BUTTONS.filter(b => b.action === 'clear')
        : TOOLBAR_BUTTONS;
      
      for (let btnIndex = 0; btnIndex < buttonsToShow.length; btnIndex++) {
        const rect = getToolbarButtonRect(instance, board, btnIndex);
        
        if (worldPos.x >= rect.minX && worldPos.x <= rect.maxX &&
            worldPos.y >= rect.minY && worldPos.y <= rect.maxY) {
          foundToolbarButton = {
            boardIndex,
            action: buttonsToShow[btnIndex].action,
            x: (rect.minX + rect.maxX) / 2,
            y: rect.minY - 10
          };
          break;
        }
      }
      if (foundToolbarButton) break;
    }
    
    // 更新工具栏按钮悬停状态
    if (foundToolbarButton) {
      setHoveredToolbarButton(foundToolbarButton);
      // 设置鼠标样式
      canvas.style.cursor = 'pointer';
      return;
    }
    
    // 清除工具栏悬停状态
    setHoveredToolbarButton(null);
    
    // 查找悬停的节点
    let foundNode: { node: GridNode; boardId: string; row: number; col: number } | null = null;
    
    for (const instance of connectedBoards) {
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) continue;
      
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const node = board.grid[row]?.[col];
          if (!node) continue;
          
          const rect = getNodeWorldRect(board, instance, row, col);
          
          // 先进行快速边界框检测
          if (worldPos.x < rect.minX || worldPos.x > rect.maxX ||
              worldPos.y < rect.minY || worldPos.y > rect.maxY) {
            continue;
          }
          
          // 如果有旋转，使用精确的多边形检测
          if (instance.rotation !== 0 && rect.corners) {
            if (isPointInPolygon(worldPos.x, worldPos.y, rect.corners)) {
              foundNode = { node, boardId: instance.boardId, row, col };
              break;
            }
          } else {
            // 没有旋转，直接使用边界框
            foundNode = { node, boardId: instance.boardId, row, col };
            break;
          }
        }
        if (foundNode) break;
      }
      if (foundNode) break;
    }
    
    // 设置鼠标样式
    canvas.style.cursor = foundNode ? 'pointer' : 'default';
    
    // 使用防抖减少 hoveredNode 更新频率
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    // 只有当节点变化时才触发更新
    const currentKey = hoveredNode ? `${hoveredNode.boardId}_${hoveredNode.row}_${hoveredNode.col}` : null;
    const newKey = foundNode ? `${foundNode.boardId}_${foundNode.row}_${foundNode.col}` : null;
    
    if (currentKey !== newKey) {
      hoverTimerRef.current = window.setTimeout(() => {
        onNodeHover(foundNode);
      }, 30);
    }
  }, [boards, connectedBoards, getWorldPosition, getNodeWorldRect, isPointInPolygon, onNodeHover, hoveredNode]);
  
  // 鼠标点击处理
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) return; // 如果是拖拽，不处理点击
    
    const worldPos = getWorldPosition(e.clientX, e.clientY);
    
    // 先检查是否点击了工具栏按钮
    for (let boardIndex = 0; boardIndex < connectedBoards.length; boardIndex++) {
      const instance = connectedBoards[boardIndex];
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) continue;
      
      const isStartBoard = instance.boardId.includes('Start');
      const buttonsToShow = isStartBoard 
        ? TOOLBAR_BUTTONS.filter(b => b.action === 'clear')
        : TOOLBAR_BUTTONS;
      
      for (let btnIndex = 0; btnIndex < buttonsToShow.length; btnIndex++) {
        const rect = getToolbarButtonRect(instance, board, btnIndex);
        
        if (worldPos.x >= rect.minX && worldPos.x <= rect.maxX &&
            worldPos.y >= rect.minY && worldPos.y <= rect.maxY) {
          // 处理工具栏按钮点击
          const action = buttonsToShow[btnIndex].action;
          switch (action) {
            case 'rotate':
              onRotateBoard(boardIndex);
              break;
            case 'clear':
              onClearBoard(boardIndex);
              break;
            case 'replace':
              onReplaceBoard(boardIndex);
              break;
            case 'delete':
              onDeleteBoard(boardIndex);
              break;
          }
          return;
        }
      }
    }
    
    // 检查是否点击了节点
    for (const instance of connectedBoards) {
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) continue;
      
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const node = board.grid[row]?.[col];
          if (!node) continue;
          
          const rect = getNodeWorldRect(board, instance, row, col);
          
          // 先进行快速边界框检测
          if (worldPos.x < rect.minX || worldPos.x > rect.maxX ||
              worldPos.y < rect.minY || worldPos.y > rect.maxY) {
            continue;
          }
          
          // 如果有旋转，使用精确的多边形检测
          if (instance.rotation !== 0 && rect.corners) {
            if (isPointInPolygon(worldPos.x, worldPos.y, rect.corners)) {
              onNodeClick(instance.boardId, row, col, node);
              return;
            }
          } else {
            // 没有旋转，直接使用边界框
            onNodeClick(instance.boardId, row, col, node);
            return;
          }
        }
      }
    }
  }, [boards, connectedBoards, getWorldPosition, getNodeWorldRect, isPointInPolygon, onNodeClick, onRotateBoard, onClearBoard, onReplaceBoard, onDeleteBoard]);
  
  // 鼠标按下（开始拖拽）
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'grabbing';
    }
  }, []);
  
  // 鼠标释放（结束拖拽）
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'default';
    }
  }, []);
  
  // 鼠标离开
  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    onNodeHover(null);
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'default';
    }
  }, [onNodeHover]);
  
  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    // 移除preventDefault以避免passive event listener错误
    // e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.05, Math.min(2, zoom * delta));
    
    // 以鼠标位置为中心缩放
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const scale = newZoom / zoom;
      onPanChange({
        x: mouseX - (mouseX - pan.x) * scale,
        y: mouseY - (mouseY - pan.y) * scale
      });
    }
    
    onZoomChange(newZoom);
  }, [zoom, pan, onZoomChange, onPanChange]);
  
  // 重新渲染
  useEffect(() => {
    render();
  }, [render]);
  
  return (
    <div 
      ref={containerRef}
      style={{
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #444',
        background: '#1a1a1a',
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onWheel={handleWheel}
        style={{
          display: 'block',
          cursor: 'default'
        }}
      />
      
      {/* 缩放指示器 */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: '#d2c8ae',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        {Math.round(zoom * 100)}%
      </div>
      
      {/* 操作提示 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.5)',
        color: '#888',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px'
      }}>
        拖拽移动 · 滚轮缩放 · 点击节点分配
      </div>
    </div>
  );
};

export default ParagonCanvas;
