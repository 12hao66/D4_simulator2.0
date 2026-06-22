import React, { useRef, useEffect, useCallback, useMemo } from 'react';
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
  hoveredNode: { node: GridNode; boardId: string; row: number; col: number } | null;
  onNodeHover: (node: { node: GridNode; boardId: string; row: number; col: number } | null) => void;
  onNodeClick: (boardId: string, row: number, col: number, node: GridNode) => void;
  // 外部状态控制
  zoom: number;
  pan: { x: number; y: number };
  onZoomChange: (zoom: number) => void;
  onPanChange: (pan: { x: number; y: number }) => void;
}



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
  isReachable: boolean
) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2 - 2;
  const type = node.type;
  
  // 基础颜色
  const baseColor = getNodeColor(type, isAllocated);
  
  // 绘制光晕效果
  if (isAllocated || type === 'legendary') {
    const glowSize = type === 'legendary' ? 10 : 8;
    const gradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + glowSize);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(0.5, baseColor + '60');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + glowSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 绘制节点背景
  ctx.fillStyle = baseColor;
  ctx.beginPath();
  
  if (type === 'gate' || type === 'socket') {
    // 菱形
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX + radius, centerY);
    ctx.lineTo(centerX, centerY + radius);
    ctx.lineTo(centerX - radius, centerY);
    ctx.closePath();
  } else if (type === 'legendary') {
    // 六边形
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const px = centerX + radius * Math.cos(angle);
      const py = centerY + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else {
    // 圆形
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
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
    ctx.fillText('◈', centerX, centerY);
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
  hoveredNode,
  onNodeHover,
  onNodeClick,
  zoom,
  pan,
  onZoomChange,
  onPanChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 拖拽状态
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // 防抖定时器
  const hoverTimerRef = useRef<number | null>(null);
  
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
    connectedBoards.forEach(instance => {
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
      
      // 绘制盘面背景
      ctx.fillStyle = '#252525';
      ctx.fillRect(offsetX, offsetY, boardWidth, boardHeight);
      
      // 绘制边框
      ctx.strokeStyle = '#444444';
      ctx.lineWidth = 2 / zoom; // 边框宽度不随缩放变化
      ctx.strokeRect(offsetX, offsetY, boardWidth, boardHeight);
      
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
          
          const x = offsetX + col * CELL_SIZE + NODE_GAP;
          const y = offsetY + row * CELL_SIZE + NODE_GAP;
          
          drawNode(ctx, node, x, y, NODE_SIZE, isAllocated, isHovered, isReachable);
        }
      }
      
      // 绘制盘面名称
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(board.name, offsetX + (board.cols * CELL_SIZE) / 2, offsetY - 10);
      
      ctx.restore();
    });
    
    ctx.restore();
  }, [boards, connectedBoards, allocations, reachableNodes, allConnections, hoveredNode, zoom, pan]);
  
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
  
  // 获取节点世界坐标
  const getNodeWorldRect = useCallback((board: ParagonBoard, instance: BoardInstance, row: number, col: number) => {
    const [gridX, gridY] = PARAGON_GRID_COORDINATES[instance.gridLocation] || [0, 0];
    
    // PARAGON_GRID_COORDINATES存储的是盘面左上角坐标
    const offsetX = gridX;
    const offsetY = gridY;
    
    // 节点实际渲染位置（包含NODE_GAP偏移，与渲染时一致）
    const nodeBaseX = offsetX + col * CELL_SIZE + NODE_GAP;
    const nodeBaseY = offsetY + row * CELL_SIZE + NODE_GAP;
    
    // 如果有旋转，需要计算旋转后的边界框
    if (instance.rotation !== 0) {
      const centerX = board.cols * CELL_SIZE / 2;
      const centerY = board.rows * CELL_SIZE / 2;
      const rad = (instance.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      
      // 节点四个角相对于盘面中心的坐标（包含NODE_GAP）
      const corners = [
        [col * CELL_SIZE + NODE_GAP - centerX, row * CELL_SIZE + NODE_GAP - centerY],
        [col * CELL_SIZE + NODE_GAP + NODE_SIZE - centerX, row * CELL_SIZE + NODE_GAP - centerY],
        [col * CELL_SIZE + NODE_GAP + NODE_SIZE - centerX, row * CELL_SIZE + NODE_GAP + NODE_SIZE - centerY],
        [col * CELL_SIZE + NODE_GAP - centerX, row * CELL_SIZE + NODE_GAP + NODE_SIZE - centerY]
      ].map(([dx, dy]) => {
        // Canvas坐标系y轴向下为正，旋转角度方向相反
        const rotatedDx = dx * cos + dy * sin;
        const rotatedDy = dx * (-sin) + dy * cos;
        
        // 转换回世界坐标
        return [
          offsetX + centerX + rotatedDx,
          offsetY + centerY + rotatedDy
        ] as [number, number];
      });
      
      // 计算边界框
      const xs = corners.map(c => c[0]);
      const ys = corners.map(c => c[1]);
      return {
        minX: Math.min(...xs),
        minY: Math.min(...ys),
        maxX: Math.max(...xs),
        maxY: Math.max(...ys)
      };
    }
    
    return {
      minX: nodeBaseX,
      minY: nodeBaseY,
      maxX: nodeBaseX + NODE_SIZE,
      maxY: nodeBaseY + NODE_SIZE
    };
  }, []);
  
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
          
          if (worldPos.x >= rect.minX && worldPos.x <= rect.maxX &&
              worldPos.y >= rect.minY && worldPos.y <= rect.maxY) {
            foundNode = { node, boardId: instance.boardId, row, col };
            break;
          }
        }
        if (foundNode) break;
      }
      if (foundNode) break;
    }
    
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
  }, [boards, connectedBoards, getWorldPosition, getNodeWorldRect, onNodeHover, hoveredNode]);
  
  // 鼠标点击处理
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) return; // 如果是拖拽，不处理点击
    
    const worldPos = getWorldPosition(e.clientX, e.clientY);
    
    for (const instance of connectedBoards) {
      const board = boards.find(b => b.id === instance.boardId);
      if (!board) continue;
      
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const node = board.grid[row]?.[col];
          if (!node) continue;
          
          const rect = getNodeWorldRect(board, instance, row, col);
          
          if (worldPos.x >= rect.minX && worldPos.x <= rect.maxX &&
              worldPos.y >= rect.minY && worldPos.y <= rect.maxY) {
            onNodeClick(instance.boardId, row, col, node);
            return;
          }
        }
      }
    }
  }, [boards, connectedBoards, getWorldPosition, getNodeWorldRect, onNodeClick]);
  
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
        height: '600px'
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
