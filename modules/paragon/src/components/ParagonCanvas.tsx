import { useState, useRef, useEffect, useCallback } from 'react';
import { useParagonStore } from '../store/paragonStore';
import { ParagonNode, EdgeDirection, ParagonNodeType } from '../types';
import { BoardLinkModal } from './BoardLinkModal';

// 节点尺寸配置：21×21节点紧密排列
// 节点半径 = 16px，直径 = 32px
// 网格间距 = 32px（等于节点直径，实现紧密排列）
// 大正方形尺寸 = 21 × 32 = 672px
const NODE_SIZE = 16; // 节点半径（直径32），GRID_SPACING=32，节点紧密排列无间隙
const GRID_SPACING = 32;
const BOARD_SIZE = 21;
const BOARD_PIXEL_SIZE = BOARD_SIZE * GRID_SPACING; // 672px

// 根据节点ID获取边的方向
const getNodeEdge = (nodeId: string): EdgeDirection | null => {
  if (nodeId.includes('top')) return 'top';
  if (nodeId.includes('bottom')) return 'bottom';
  if (nodeId.includes('left')) return 'left';
  if (nodeId.includes('right')) return 'right';
  return null;
};

// 根据节点类型获取默认图标
const getDefaultIcon = (type: ParagonNodeType): string => {
  switch (type) {
    case 'normal': return '●';
    case 'magic': return '◈';
    case 'rare': return '◆';
    case 'legendary': return '★';
    case 'socket': return '🔘';
    case 'link': return '🔗';
    case 'paragon': return '⭐';
    default: return '●';
  }
};

export const ParagonCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    boards, 
    activeBoardIndex, 
    unlockedNodes, 
    selectedNode, 
    zoom, 
    position, 
    editMode,
    highlightedPaths,
    clickableNodes,
    linkChain,
    selectNode, 
    toggleNode, 
    setZoom, 
    setPosition,
    updateNodePosition,
    isLinkPointActivated,
    addNode,
    deleteNode,
    updateNode
  } = useParagonStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addPos, setAddPos] = useState({ x: 0, y: 0 });
  const [nodeForm, setNodeForm] = useState({
    type: 'normal' as ParagonNodeType,
    name: '',
    icon: '',
    isEntryPoint: false
  });

  // 链接弹窗状态
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkSourceBoardIndex, setLinkSourceBoardIndex] = useState(0);
  const [linkSourceEdge, setLinkSourceEdge] = useState<EdgeDirection>('top');

  // 计算每个盘的偏移量
  const getBoardOffset = useCallback((boardIndex: number): { x: number; y: number } => {
    if (boardIndex === 0) return { x: 0, y: 0 };

    let totalOffsetX = 0;
    let totalOffsetY = 0;

    for (let i = 1; i <= boardIndex; i++) {
      const conn = linkChain.connections.find(c => c.toBoardId === boards[i].id);
      if (conn) {
        totalOffsetX += conn.offsetX;
        totalOffsetY += conn.offsetY;
      }
    }

    return { x: totalOffsetX, y: totalOffsetY };
  }, [boards, linkChain.connections]);

  const activeBoard = boards[activeBoardIndex];

  const getNodeColor = (node: ParagonNode, isUnlocked: boolean, isSelected: boolean, isActivated: boolean) => {
    if (isSelected) return '#ffd700';
    if (isActivated) return '#00ff88'; // 激活的链接点特殊颜色
    if (isUnlocked) {
      switch (node.type) {
        case 'paragon': return '#ffd700'; // 金色 - 巅峰等级起始节点
        case 'link': return '#9b59b6';    // 紫色 - 面板链接关口
        case 'normal': return '#ffffff';  // 白色 - 普通节点
        case 'magic': return '#3b82f6';   // 蓝色 - 魔法节点
        case 'rare': return '#ffd700';    // 黄色 - 稀有节点
        case 'legendary': return '#ff4500'; // 橙红色 - 传奇节点
        case 'socket': return '#c0c0c0';  // 银色 - 雕纹插槽
        default: return '#c9a962';
      }
    }
    return '#4a4a5a';
  };

  // 获取节点背景颜色
  const getNodeBgColor = (node: ParagonNode, isUnlocked: boolean) => {
    if (!isUnlocked) return '#2a2a3a';
    switch (node.type) {
      case 'paragon': return 'rgba(255, 215, 0, 0.3)'; // 金色背景
      case 'link': return 'rgba(155, 89, 182, 0.3)';   // 紫色背景
      case 'normal': return 'rgba(255, 255, 255, 0.1)'; // 白色背景
      case 'magic': return 'rgba(59, 130, 246, 0.3)';  // 蓝色背景
      case 'rare': return 'rgba(255, 215, 0, 0.3)';    // 黄色背景
      case 'legendary': return 'rgba(255, 69, 0, 0.3)'; // 橙红色背景
      case 'socket': return 'rgba(192, 192, 192, 0.3)'; // 银色背景
      default: return 'rgba(201, 169, 98, 0.2)';
    }
  };

  const drawNode = useCallback((ctx: CanvasRenderingContext2D, node: ParagonNode, boardOffset: { x: number; y: number } = { x: 0, y: 0 }) => {
    const x = (node.x + boardOffset.x) * zoom + position.x;
    const y = (node.y + boardOffset.y) * zoom + position.y;
    const size = NODE_SIZE * zoom;

    const isUnlocked = unlockedNodes.includes(node.id);
    const isSelected = selectedNode === node.id;
    const isActivated = isLinkPointActivated(node.id);
    const color = getNodeColor(node, isUnlocked, isSelected, isActivated);
    const isClickable = clickableNodes.includes(node.id) && !isUnlocked && !editMode;

    // 激活链接点的特殊效果（发光脉冲）
    if (node.type === 'link' && isActivated) {
      ctx.beginPath();
      ctx.arc(x, y, size + 8 * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.8)';
      ctx.lineWidth = 3 * zoom;
      ctx.setLineDash([4 * zoom, 4 * zoom]);
      ctx.shadowColor = 'rgba(0, 255, 136, 1)';
      ctx.shadowBlur = 20 * zoom;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
    }

    // 可点击节点高亮效果（虚线圆环）
    if (isClickable) {
      ctx.beginPath();
      ctx.arc(x, y, size + 4 * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
      ctx.lineWidth = 2 * zoom;
      ctx.setLineDash([4 * zoom, 4 * zoom]);
      ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
      ctx.shadowBlur = 10 * zoom;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
    }
    
    // 雕纹插槽节点：显示为空心圆或虚线圆
    if (node.type === 'socket') {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = getNodeBgColor(node, isUnlocked);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * zoom;
      ctx.setLineDash([4 * zoom, 4 * zoom]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 插槽节点图标
      ctx.font = `${size * 0.55}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.shadowBlur = 0;
      ctx.fillText(node.icon || '🔘', x, y);
      return;
    }
    
    // 链接节点：显示为连接点样式
    if (node.type === 'link') {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = getNodeBgColor(node, isUnlocked);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = isSelected ? 3 * zoom : 2 * zoom;
      ctx.shadowColor = isSelected || isUnlocked ? color : 'transparent';
      ctx.shadowBlur = isSelected ? 15 * zoom : isUnlocked ? 8 * zoom : 0;
      ctx.stroke();
      
      // 链接节点图标
      ctx.font = `${size * 0.55}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isUnlocked ? color : '#666';
      ctx.shadowBlur = 0;
      ctx.fillText(node.icon || '🔗', x, y);
      return;
    }
    
    // 绘制节点背景（圆形填满格子）
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    
    if (isUnlocked) {
      // 根据节点类型设置背景色
      ctx.fillStyle = getNodeBgColor(node, isUnlocked);
    } else {
      ctx.fillStyle = '#2a2a3e';
    }
    ctx.fill();
    
    // 边框
    ctx.strokeStyle = color;
    ctx.lineWidth = isSelected ? 3 * zoom : 2 * zoom;
    ctx.shadowColor = isSelected || isUnlocked ? color : 'transparent';
    ctx.shadowBlur = isSelected ? 15 * zoom : isUnlocked ? 8 * zoom : 0;
    ctx.stroke();
    
    // 入口点标记（虚线圆环，不超出格子）
    if (node.isEntryPoint) {
      ctx.beginPath();
      ctx.arc(x, y, size - 3 * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = '#c9a962';
      ctx.lineWidth = 1.5 * zoom;
      ctx.setLineDash([3 * zoom, 3 * zoom]);
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // 绘制图标（支持emoji或图片）
    if (node.image) {
      // 如果有图片，绘制图片
      const img = new Image();
      img.src = node.image;
      img.onload = () => {
        ctx.drawImage(img, x - size * 0.4, y - size * 0.4, size * 0.8, size * 0.8);
      };
    } else {
      // 否则使用emoji
      ctx.font = `${size * 0.55}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isUnlocked ? '#1a1a2e' : '#666';
      ctx.shadowBlur = 0;
      ctx.fillText(node.icon, x, y);
    }
    
    // 绘制类型标识（传奇/稀有）
    if ((node.type === 'legendary' || node.type === 'rare') && isUnlocked) {
      ctx.font = `${8 * zoom}px Arial`;
      ctx.fillStyle = '#fff';
      ctx.fillText(node.type === 'legendary' ? '★' : '◆', x + size * 0.5, y - size * 0.5);
    }
  }, [unlockedNodes, selectedNode, clickableNodes, editMode, zoom, position, isLinkPointActivated]);

  // 绘制编辑模式网格线
  const drawEditGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!editMode) return;
    
    const boardWidth = 21 * 32;
    const boardHeight = 21 * 32;
    const boardX = -boardWidth / 2;
    const boardY = -boardHeight / 2;
    
    // 绘制编辑模式网格线（21×21网格）
    ctx.strokeStyle = 'rgba(201, 169, 98, 0.3)';
    ctx.lineWidth = 1;
    
    // 绘制垂直线
    for (let col = 0; col <= 21; col++) {
      const x = (boardX + col * 32) * zoom + position.x;
      ctx.beginPath();
      ctx.moveTo(x, boardY * zoom + position.y);
      ctx.lineTo(x, (boardY + boardHeight) * zoom + position.y);
      ctx.stroke();
    }
    
    // 绘制水平线
    for (let row = 0; row <= 21; row++) {
      const y = (boardY + row * 32) * zoom + position.y;
      ctx.beginPath();
      ctx.moveTo(boardX * zoom + position.x, y);
      ctx.lineTo((boardX + boardWidth) * zoom + position.x, y);
      ctx.stroke();
    }
    
    // 绘制中心十字线（高亮中心点）
    const centerX = position.x;
    const centerY = position.y;
    ctx.strokeStyle = 'rgba(201, 169, 98, 0.6)';
    ctx.lineWidth = 2;
    
    // 水平中心线
    ctx.beginPath();
    ctx.moveTo(boardX * zoom + position.x, centerY);
    ctx.lineTo((boardX + boardWidth) * zoom + position.x, centerY);
    ctx.stroke();
    
    // 垂直中心线
    ctx.beginPath();
    ctx.moveTo(centerX, boardY * zoom + position.y);
    ctx.lineTo(centerX, (boardY + boardHeight) * zoom + position.y);
    ctx.stroke();
  }, [editMode, zoom, position]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || boards.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // 清空画布
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制网格背景
    ctx.strokeStyle = 'rgba(42, 26, 10, 0.15)';
    ctx.lineWidth = 1;
    const gridSize = 50 * zoom;
    for (let x = position.x % gridSize; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = position.y % gridSize; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 绘制编辑模式网格线（只在主盘上）
    drawEditGrid(ctx);

    // 绘制连接线（先绘制，在盘下面）- 编辑模式下不渲染
    if (!editMode) {
      boards.forEach((board, boardIndex) => {
        if (boardIndex === 0) return; // 主盘没有连接线

      const conn = linkChain.connections.find(c => c.toBoardId === board.id);
      if (!conn) return;

      // 获取源盘和目标盘的链接点位置
      const sourceBoard = boards[conn.fromBoardIndex];
      const sourceNode = sourceBoard.nodes.find(n => getNodeEdge(n.id) === conn.fromEdge);
      const targetNode = board.nodes.find(n => getNodeEdge(n.id) === conn.toEdge);

      if (!sourceNode || !targetNode) return;

      const sourceOffset = getBoardOffset(conn.fromBoardIndex);
      const targetOffset = getBoardOffset(boardIndex);

      const startX = (sourceNode.x + sourceOffset.x) * zoom + position.x;
      const startY = (sourceNode.y + sourceOffset.y) * zoom + position.y;
      const endX = (targetNode.x + targetOffset.x) * zoom + position.x;
      const endY = (targetNode.y + targetOffset.y) * zoom + position.y;

      // 绘制连接线
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#c9a962';
      ctx.lineWidth = 4 * zoom;
      ctx.shadowColor = 'rgba(201, 169, 98, 0.8)';
      ctx.shadowBlur = 15 * zoom;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 绘制连接点装饰
      ctx.beginPath();
      ctx.arc(startX, startY, 6 * zoom, 0, Math.PI * 2);
      ctx.fillStyle = '#c9a962';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(endX, endY, 6 * zoom, 0, Math.PI * 2);
      ctx.fill();
    });
    }

    // 编辑模式下只渲染当前编辑的盘，玩家模式下渲染所有盘
    const boardsToRender = editMode ? [activeBoard] : boards;
    
    boardsToRender.forEach((board, idx) => {
      const boardIndex = editMode ? activeBoardIndex : idx;
      const boardOffset = editMode ? { x: 0, y: 0 } : getBoardOffset(boardIndex);

      // 绘制正方形边框
      const boardWidth = BOARD_PIXEL_SIZE;
      const boardHeight = BOARD_PIXEL_SIZE;
      const boardX = -boardWidth / 2 + boardOffset.x;
      const boardY = -boardHeight / 2 + boardOffset.y;

      // 外发光效果（主盘更亮）
      ctx.shadowColor = boardIndex === 0 ? 'rgba(201, 169, 98, 0.5)' : 'rgba(201, 169, 98, 0.2)';
      ctx.shadowBlur = boardIndex === 0 ? 30 * zoom : 15 * zoom;

      ctx.beginPath();
      ctx.rect(
        boardX * zoom + position.x,
        boardY * zoom + position.y,
        boardWidth * zoom,
        boardHeight * zoom
      );
      ctx.strokeStyle = boardIndex === 0 ? '#c9a962' : '#8b7355';
      ctx.lineWidth = boardIndex === 0 ? 4 * zoom : 2 * zoom;
      ctx.stroke();

      // 内边框
      ctx.beginPath();
      ctx.rect(
        (boardX + 4) * zoom + position.x,
        (boardY + 4) * zoom + position.y,
        (boardWidth - 8) * zoom,
        (boardHeight - 8) * zoom
      );
      ctx.strokeStyle = '#5a4a3a';
      ctx.lineWidth = 1 * zoom;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // 盘名称标签
      ctx.font = `${10 * zoom}px 'Noto Sans SC', sans-serif`;
      ctx.fillStyle = boardIndex === 0 ? '#ffd700' : '#c9a962';
      ctx.textAlign = 'center';
      ctx.fillText(
        board.name,
        (boardX + boardWidth / 2) * zoom + position.x,
        (boardY - 10) * zoom + position.y
      );

      // 绘制高亮路径（只在激活的盘上）
      if (boardIndex === activeBoardIndex && highlightedPaths.length > 0) {
        highlightedPaths.forEach(path => {
          if (path.length < 2) return;

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(201, 169, 98, 0.6)';
          ctx.lineWidth = 3 * zoom;
          ctx.shadowColor = 'rgba(201, 169, 98, 0.8)';
          ctx.shadowBlur = 10 * zoom;

          for (let i = 0; i < path.length - 1; i++) {
            const currentNode = board.nodes.find(n => n.id === path[i]);
            const nextNode = board.nodes.find(n => n.id === path[i + 1]);

            if (currentNode && nextNode) {
              const startX = (currentNode.x + boardOffset.x) * zoom + position.x;
              const startY = (currentNode.y + boardOffset.y) * zoom + position.y;
              const endX = (nextNode.x + boardOffset.x) * zoom + position.x;
              const endY = (nextNode.y + boardOffset.y) * zoom + position.y;

              if (i === 0) {
                ctx.moveTo(startX, startY);
              }
              ctx.lineTo(endX, endY);
            }
          }

          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      }

      // 绘制雕纹槽
      const glyphX = (board.centerSlot.x + boardOffset.x) * zoom + position.x;
      const glyphY = (board.centerSlot.y + boardOffset.y) * zoom + position.y;
      const glyphSize = NODE_SIZE * zoom;
      const { glyph } = board.centerSlot;

      ctx.beginPath();
      ctx.arc(glyphX, glyphY, glyphSize, 0, Math.PI * 2);
      ctx.fillStyle = glyph ? '#1a0f0a' : '#0a0a12';
      ctx.fill();
      ctx.strokeStyle = glyph ? '#c9a962' : '#4a3a2a';
      ctx.lineWidth = glyph ? 4 * zoom : 2 * zoom;
      ctx.shadowColor = glyph ? '#c9a962' : 'transparent';
      ctx.shadowBlur = glyph ? 20 * zoom : 0;
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (glyph) {
        ctx.font = `${glyphSize * 0.7}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15 * zoom;
        ctx.fillText(glyph.icon, glyphX, glyphY);
        ctx.shadowBlur = 0;
      }

      // 绘制节点
      board.nodes.forEach(node => {
        drawNode(ctx, node, boardOffset);
      });
    });
  }, [boards, activeBoardIndex, drawNode, drawEditGrid, zoom, position, highlightedPaths, linkChain.connections, getBoardOffset]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(zoom + delta);
  }, [zoom, setZoom]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !activeBoard) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 编辑模式下盘居中显示，偏移量为0；玩家模式下使用实际偏移量
    const boardOffset = editMode ? { x: 0, y: 0 } : getBoardOffset(activeBoardIndex);

    // 检查是否点击了节点
    for (const node of activeBoard.nodes) {
      const nodeX = (node.x + boardOffset.x) * zoom + position.x;
      const nodeY = (node.y + boardOffset.y) * zoom + position.y;

      const dx = x - nodeX;
      const dy = y - nodeY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= NODE_SIZE * zoom * 1.5) { // 稍微扩大点击区域
        // 编辑器模式：开始拖拽节点
        if (editMode) {
          setDraggingNode(node.id);
          selectNode(node.id);
          return;
        }

        // 链接节点点击处理
        if (node.type === 'link') {
          const isActivated = isLinkPointActivated(node.id);

          // 已激活的链接点：打开面板，不再触发toggleNode
          if (isActivated) {
            // 只有主盘(activeBoardIndex === 0)的顶部链接点可以打开链接弹窗
            if (activeBoardIndex === 0 && node.id.includes('top') && boards.length < 5) {
              const edge = getNodeEdge(node.id);
              if (edge) {
                setLinkSourceBoardIndex(activeBoardIndex);
                setLinkSourceEdge(edge);
                setShowLinkModal(true);
              }
            }

            selectNode(node.id);
            return; // 直接返回，不触发toggleNode
          }

          // 未激活的链接点：先解锁激活
          toggleNode(node.id);
          selectNode(node.id);
          return;
        }

        // 普通节点点击
        toggleNode(node.id);
        selectNode(node.id);
        return;
      }
    }

    // 开始拖拽画布
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    selectNode(null);
  }, [activeBoard, activeBoardIndex, zoom, position, toggleNode, selectNode, editMode, getBoardOffset, unlockedNodes, isLinkPointActivated, boards.length]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingNode) {
      // 编辑器模式：拖拽节点
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 将屏幕坐标转换为画布坐标
      const canvasX = (x - position.x) / zoom;
      const canvasY = (y - position.y) / zoom;
      
      // 网格吸附（32像素网格，与 GRID_SPACING 一致）
      const gridSize = 32;
      const snappedX = Math.round(canvasX / gridSize) * gridSize;
      const snappedY = Math.round(canvasY / gridSize) * gridSize;
      
      updateNodePosition(draggingNode, snappedX, snappedY);
      return;
    }
    
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, draggingNode, dragStart, setPosition, zoom, position, updateNodePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggingNode(null);
  }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (!editMode) return;
    
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setContextMenuPos({ x, y });
    setShowContextMenu(true);
  }, [editMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, handleContextMenu]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full overflow-hidden cursor-move bg-diablo-bg relative"
      onClick={() => setShowContextMenu(false)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* 编辑模式指示器 */}
      {editMode && (
        <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-lg">✏️</span>
          <span className="font-bold">编辑模式</span>
          <span className="text-sm opacity-80">| 拖拽节点调整位置 | 右键添加/删除节点</span>
        </div>
      )}
      
      {/* 右键菜单 */}
      {showContextMenu && editMode && (
        <div 
          className="absolute bg-diablo-panel border border-diablo-border rounded-lg shadow-xl overflow-hidden z-50 min-w-48"
          style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
        >
          <button
            onClick={() => {
              const canvasX = (contextMenuPos.x - position.x) / zoom;
              const canvasY = (contextMenuPos.y - position.y) / zoom;
              const gridSize = 32;
              const snappedX = Math.round(canvasX / gridSize) * gridSize;
              const snappedY = Math.round(canvasY / gridSize) * gridSize;
              setAddPos({ x: snappedX, y: snappedY });
              setNodeForm({ type: 'normal', name: '', icon: '', isEntryPoint: false });
              setShowAddModal(true);
              setShowContextMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-diablo-gold hover:bg-diablo-hover transition-colors"
          >
            ➕ 添加节点
          </button>
          {selectedNode && (
            <>
              <button
                onClick={() => {
                  const node = activeBoard?.nodes.find(n => n.id === selectedNode);
                  if (node) {
                    setNodeForm({ type: node.type, name: node.name, icon: node.icon, isEntryPoint: node.isEntryPoint || false });
                    setShowEditModal(true);
                  }
                  setShowContextMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-blue-400 hover:bg-diablo-hover transition-colors border-t border-diablo-border"
              >
                ✏️ 编辑节点
              </button>
              <button
                onClick={() => {
                  if (confirm('确定要删除这个节点吗？')) {
                    deleteNode(selectedNode);
                    selectNode(null);
                  }
                  setShowContextMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-diablo-hover transition-colors border-t border-diablo-border"
              >
                🗑️ 删除节点
              </button>
            </>
          )}
        </div>
      )}

      {/* 添加节点弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-diablo-panel border border-diablo-border rounded-lg p-6 w-80">
            <h3 className="text-diablo-gold text-lg font-bold mb-4">添加节点</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-diablo-muted mb-1 block">节点类型</label>
                <select
                  value={nodeForm.type}
                  onChange={(e) => setNodeForm({ ...nodeForm, type: e.target.value as ParagonNodeType, icon: getDefaultIcon(e.target.value as ParagonNodeType) })}
                  className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
                >
                  <option value="normal">普通节点 ●</option>
                  <option value="magic">魔法节点 ◈</option>
                  <option value="rare">稀有节点 ◆</option>
                  <option value="legendary">传奇节点 ★</option>
                  <option value="socket">雕纹插槽 🔘</option>
                  <option value="link">面板链接关口 🔗</option>
                  <option value="paragon">巅峰等级起始节点 ⭐</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-diablo-muted mb-1 block">节点名称</label>
                <input
                  type="text"
                  value={nodeForm.name}
                  onChange={(e) => setNodeForm({ ...nodeForm, name: e.target.value })}
                  placeholder="可选"
                  className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-diablo-muted mb-1 block">节点图标</label>
                <input
                  type="text"
                  value={nodeForm.icon}
                  onChange={(e) => setNodeForm({ ...nodeForm, icon: e.target.value })}
                  className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nodeForm.isEntryPoint}
                    onChange={(e) => setNodeForm({ ...nodeForm, isEntryPoint: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-diablo-gold">设为入口节点</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  addNode({
                    type: nodeForm.type,
                    name: nodeForm.name || '新节点',
                    icon: nodeForm.icon || getDefaultIcon(nodeForm.type),
                    x: addPos.x,
                    y: addPos.y,
                    effects: [],
                    connections: [],
                    isEntryPoint: nodeForm.isEntryPoint
                  });
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑节点弹窗 */}
      {showEditModal && selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-diablo-panel border border-diablo-border rounded-lg p-6 w-80">
            <h3 className="text-diablo-gold text-lg font-bold mb-4">编辑节点</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-diablo-muted mb-1 block">节点类型</label>
                <select
                  value={nodeForm.type}
                  onChange={(e) => setNodeForm({ ...nodeForm, type: e.target.value as ParagonNodeType, icon: getDefaultIcon(e.target.value as ParagonNodeType) })}
                  className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
                >
                  <option value="normal">普通节点 ●</option>
                  <option value="magic">魔法节点 ◈</option>
                  <option value="rare">稀有节点 ◆</option>
                  <option value="legendary">传奇节点 ★</option>
                  <option value="socket">雕纹插槽 🔘</option>
                  <option value="link">面板链接关口 🔗</option>
                  <option value="paragon">巅峰等级起始节点 ⭐</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-diablo-muted mb-1 block">节点名称</label>
                <input
                  type="text"
                  value={nodeForm.name}
                  onChange={(e) => setNodeForm({ ...nodeForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-diablo-muted mb-1 block">节点图标</label>
                <input
                  type="text"
                  value={nodeForm.icon}
                  onChange={(e) => setNodeForm({ ...nodeForm, icon: e.target.value })}
                  className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nodeForm.isEntryPoint}
                    onChange={(e) => setNodeForm({ ...nodeForm, isEntryPoint: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-diablo-gold">设为入口节点</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  updateNode(selectedNode, {
                    type: nodeForm.type,
                    name: nodeForm.name,
                    icon: nodeForm.icon || getDefaultIcon(nodeForm.type),
                    isEntryPoint: nodeForm.isEntryPoint
                  });
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 链接选择弹窗 */}
      <BoardLinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        sourceBoardIndex={linkSourceBoardIndex}
        sourceEdge={linkSourceEdge}
      />
    </div>
  );
};
