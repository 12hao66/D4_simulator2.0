import { useState, useRef, useEffect, useCallback } from 'react';
import { useSkillStore } from '../store/skillStore';
import { SkillNode } from '../types';

const NODE_RADIUS = 30;
const KEY_NODE_RADIUS = 45;
const GRID_SIZE = 50; // 网格大小

export const SkillCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { skillTree, unlockedSkills, selectedSkill, zoom, position, selectSkill, toggleSkill, setZoom, setPosition, editMode, updateSkillNode } = useSkillStore();
  
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isCanvasDragging, setIsCanvasDragging] = useState(false);

  const drawKeyNode = useCallback((ctx: CanvasRenderingContext2D, node: SkillNode) => {
    const x = node.position.x * zoom + position.x;
    const y = node.position.y * zoom + position.y;
    const radius = KEY_NODE_RADIUS * zoom;
    
    // 绘制星形核心节点（暗黑4风格）
    const spikes = 8;
    const outerRadius = radius;
    const innerRadius = radius * 0.5;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / spikes) * i - Math.PI / 2;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    
    // 渐变填充
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, '#ff4444');
    gradient.addColorStop(0.5, '#8b0000');
    gradient.addColorStop(1, '#4a0000');
    ctx.fillStyle = gradient;
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 15 * zoom;
    ctx.fill();
    
    // 边框
    ctx.strokeStyle = '#ff6666';
    ctx.lineWidth = 3 * zoom;
    ctx.stroke();
    
    // 内部圆形
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
    const innerGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.6);
    innerGradient.addColorStop(0, '#ffdddd');
    innerGradient.addColorStop(1, '#8b0000');
    ctx.fillStyle = innerGradient;
    ctx.shadowBlur = 0;
    ctx.fill();
    
    // 图标
    ctx.font = `${radius * 0.7}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(node.icon, x, y);
    
    // 名称
    ctx.font = `${11 * zoom}px 'Noto Sans SC', sans-serif`;
    ctx.fillStyle = '#d4c4a8';
    ctx.fillText(node.name, x, y + radius + 12 * zoom);
  }, [zoom, position]);

  const drawNode = useCallback((ctx: CanvasRenderingContext2D, node: SkillNode) => {
    const x = node.position.x * zoom + position.x;
    const y = node.position.y * zoom + position.y;
    const radius = NODE_RADIUS * zoom;
    const currentRank = unlockedSkills[node.id] || 0;
    const isUnlocked = currentRank > 0;
    const isSelected = selectedSkill === node.id;
    
    // 检查前置技能是否全部解锁
    const canUnlock = node.requires.length === 0 || node.requires.every(reqId => unlockedSkills[reqId] !== undefined);
    
    // 基础阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5 * zoom;
    ctx.shadowOffsetX = 2 * zoom;
    ctx.shadowOffsetY = 2 * zoom;
    
    // 绘制外框（金属质感）
    const outerGradient = ctx.createRadialGradient(
      x - radius * 0.3, y - radius * 0.3, 0,
      x, y, radius
    );
    
    if (isUnlocked) {
      const nodeColor = node.color || '#c9a962';
      outerGradient.addColorStop(0, nodeColor);
      outerGradient.addColorStop(1, adjustColor(nodeColor, -30));
    } else if (canUnlock) {
      outerGradient.addColorStop(0, '#4a4a4a');
      outerGradient.addColorStop(1, '#2a2a2a');
    } else {
      outerGradient.addColorStop(0, '#2a2a2a');
      outerGradient.addColorStop(1, '#1a1a1a');
    }
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = outerGradient;
    ctx.fill();
    
    // 边框
    ctx.shadowBlur = 0;
    ctx.strokeStyle = isSelected ? '#ffd700' : (isUnlocked ? '#a08040' : '#4a4a4a');
    ctx.lineWidth = isSelected ? 3 * zoom : 2 * zoom;
    ctx.stroke();
    
    // 内部阴影层
    ctx.beginPath();
    ctx.arc(x - radius * 0.15, y - radius * 0.15, radius * 0.85, 0, Math.PI * 2);
    ctx.fillStyle = isUnlocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    
    // 图标
    ctx.font = `${radius * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isUnlocked ? '#ffffff' : '#5a5a5a';
    ctx.fillText(node.icon, x, y);
    
    // 技能等级显示（3/15 格式）
    if (node.maxRank > 1) {
      ctx.font = `${10 * zoom}px 'Noto Sans SC', sans-serif`;
      ctx.fillStyle = isUnlocked ? '#c9a962' : '#555';
      ctx.fillText(`${currentRank}/${node.maxRank}`, x, y + radius + 10 * zoom);
    }
    
    // 技能名称
    ctx.font = `${10 * zoom}px 'Noto Sans SC', sans-serif`;
    ctx.fillStyle = isUnlocked ? '#d4c4a8' : '#555';
    const nameY = node.maxRank > 1 ? y + radius + 22 * zoom : y + radius + 12 * zoom;
    ctx.fillText(node.name, x, nameY);
    
    // 可解锁提示
    if (canUnlock && !isUnlocked) {
      ctx.beginPath();
      ctx.arc(x, y, radius + 4 * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
      ctx.lineWidth = 2 * zoom;
      ctx.setLineDash([4 * zoom, 4 * zoom]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // 选中高亮光环
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(x, y, radius + 8 * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
      ctx.lineWidth = 2 * zoom;
      ctx.stroke();
    }
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }, [unlockedSkills, selectedSkill, zoom, position]);

  const drawConnection = useCallback((ctx: CanvasRenderingContext2D, from: SkillNode, to: SkillNode) => {
    const fromRadius = from.isKeyNode ? KEY_NODE_RADIUS : NODE_RADIUS;
    const toRadius = to.isKeyNode ? KEY_NODE_RADIUS : NODE_RADIUS;
    
    const fromX = from.position.x * zoom + position.x;
    const fromY = from.position.y * zoom + position.y;
    const toX = to.position.x * zoom + position.x;
    const toY = to.position.y * zoom + position.y;
    
    const isUnlocked = unlockedSkills[from.id] !== undefined && unlockedSkills[to.id] !== undefined;
    const canUnlock = unlockedSkills[from.id] !== undefined;
    
    // 计算角度和控制点（弧形连接）
    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 起点和终点（考虑节点半径）
    const startAngle = Math.atan2(dy, dx);
    const endAngle = Math.atan2(fromY - toY, fromX - toX);
    
    const startX = fromX + Math.cos(startAngle) * fromRadius * zoom;
    const startY = fromY + Math.sin(startAngle) * fromRadius * zoom;
    const endX = toX + Math.cos(endAngle) * toRadius * zoom;
    const endY = toY + Math.sin(endAngle) * toRadius * zoom;
    
    // 计算控制点以创建弧形
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const perpX = -(dy / distance) * distance * 0.2;
    const perpY = (dx / distance) * distance * 0.2;
    const cpX = midX + perpX;
    const cpY = midY + perpY;
    
    // 绘制连接线
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(cpX, cpY, endX, endY);
    
    if (isUnlocked) {
      // 已解锁路径 - 发光效果
      ctx.strokeStyle = '#c9a962';
      ctx.lineWidth = 3 * zoom;
      ctx.shadowColor = '#c9a962';
      ctx.shadowBlur = 8 * zoom;
      ctx.stroke();
      
      // 内部高亮线
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1 * zoom;
      ctx.shadowBlur = 0;
      ctx.stroke();
    } else if (canUnlock) {
      // 可解锁路径
      ctx.strokeStyle = 'rgba(201, 169, 98, 0.4)';
      ctx.lineWidth = 2 * zoom;
      ctx.shadowBlur = 0;
      ctx.setLineDash([6 * zoom, 6 * zoom]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // 不可解锁路径
      ctx.strokeStyle = 'rgba(60, 60, 60, 0.5)';
      ctx.lineWidth = 1 * zoom;
      ctx.shadowBlur = 0;
      ctx.stroke();
    }
    
    ctx.shadowBlur = 0;
  }, [unlockedSkills, zoom, position]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !skillTree) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布尺寸
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    
    // 清空画布
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制暗黑风格背景纹理
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制装饰性圆环（暗黑4风格）
    const centerX = canvas.width / 2 + position.x;
    const centerY = canvas.height / 2 + position.y;
    
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, i * 150 * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(74, 58, 30, ${0.1 + i * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // 编辑模式下绘制网格线
    if (editMode) {
      ctx.strokeStyle = 'rgba(74, 58, 30, 0.3)';
      ctx.lineWidth = 1;
      
      const gridSize = GRID_SIZE * zoom;
      const offsetX = position.x % gridSize;
      const offsetY = position.y % gridSize;
      
      // 绘制垂直线
      for (let x = offsetX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // 绘制水平线
      for (let y = offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
    
    // 绘制连接线（先于节点）
    skillTree.nodes.forEach(node => {
      node.requires.forEach(reqId => {
        const fromNode = skillTree.nodes.find(n => n.id === reqId);
        if (fromNode) {
          drawConnection(ctx, fromNode, node);
        }
      });
    });
    
    // 绘制节点
    skillTree.nodes.forEach(node => {
      if (node.isKeyNode) {
        drawKeyNode(ctx, node);
      } else {
        drawNode(ctx, node);
      }
    });
  }, [skillTree, drawNode, drawConnection, drawKeyNode, zoom, position]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(Math.max(0.5, Math.min(2, zoom + delta)));
  }, [zoom, setZoom]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !skillTree) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 检查是否点击了节点
    for (const node of skillTree.nodes) {
      const nodeRadius = node.isKeyNode ? KEY_NODE_RADIUS : NODE_RADIUS;
      const nodeX = node.position.x * zoom + position.x;
      const nodeY = node.position.y * zoom + position.y;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      
      if (distance <= nodeRadius * zoom) {
        selectSkill(node.id);
        
        if (editMode) {
          // 编辑模式下开始拖拽节点
          setDraggingNodeId(node.id);
          setDragStart({ x: e.clientX - node.position.x, y: e.clientY - node.position.y });
        } else {
          // 正常模式下切换技能
          toggleSkill(node.id);
        }
        return;
      }
    }
    
    // 拖拽画布（编辑模式和正常模式都支持）
    setIsCanvasDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    selectSkill(null);
    setDraggingNodeId(null);
  }, [skillTree, zoom, position, toggleSkill, selectSkill, editMode]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingNodeId && editMode) {
      // 编辑模式下拖拽节点
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      updateSkillNode(draggingNodeId, { position: { x: newX, y: newY } });
    } else if (isCanvasDragging) {
      // 拖拽画布（编辑模式和正常模式都支持）
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isCanvasDragging, dragStart, setPosition, editMode, draggingNodeId, updateSkillNode]);

  const handleMouseUp = useCallback(() => {
    setIsCanvasDragging(false);
    setDraggingNodeId(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full overflow-hidden ${editMode ? 'cursor-grab' : 'cursor-move'}`}
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* 编辑模式提示 */}
      {editMode && (
        <div className="absolute top-4 left-4 bg-[#1a1a2e] border border-[#c9a962] rounded-lg px-4 py-3">
          <div className="text-[#c9a962] text-sm font-medium flex items-center gap-2 mb-1">
            <span>✏️</span>
            编辑模式
          </div>
          <div className="text-[#8b7355] text-xs space-y-1">
            <div>• 点击并拖拽节点可调整位置</div>
            <div>• 拖拽空白区域移动画布</div>
            <div>• 滚轮缩放画布</div>
          </div>
        </div>
      )}
    </div>
  );
};

// 辅助函数：调整颜色亮度
function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
