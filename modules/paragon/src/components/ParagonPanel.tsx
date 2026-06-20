import { useEffect, useState } from 'react';
import { useParagonStore, useGlyphStore } from '../store/paragonStore';
import { ParagonNode } from '../types';
import { BoardExportImport } from './BoardExportImport';

export const ParagonPanel = () => {
  const { 
    boards, 
    availableBoards, 
    activeBoardIndex, 
    selectedNode, 
    totalPoints, 
    spentPoints,
    loadBoards, 
    switchBoard, 
    selectBoard, 
    equipGlyph,
    unequipGlyph,
    setTotalPoints,
    resetView,
    disconnectBoard
  } = useParagonStore();
  
  const { glyphs } = useGlyphStore();
  const [showExportImport, setShowExportImport] = useState(false);

  const activeBoard = boards[activeBoardIndex];
  const selectedNodeData = activeBoard?.nodes.find(n => n.id === selectedNode);
  const currentGlyph = activeBoard?.centerSlot.glyph;

  useEffect(() => {
    if (boards.length === 0) {
      loadBoards();
    }
  }, [boards.length, loadBoards]);

  const getNodeTypeLabel = (type: ParagonNode['type']) => {
    switch (type) {
      case 'paragon': return '巅峰等级起始节点';
      case 'link': return '面板链接关口';
      case 'normal': return '普通节点';
      case 'magic': return '魔法节点';
      case 'rare': return '稀有节点';
      case 'legendary': return '传奇节点';
      case 'socket': return '雕纹插槽';
      default: return '普通节点';
    }
  };

  const getNodeTypeColor = (type: ParagonNode['type']) => {
    switch (type) {
      case 'paragon': return 'text-yellow-400';      // 金色
      case 'link': return 'text-purple-400';         // 紫色
      case 'normal': return 'text-white';            // 白色
      case 'magic': return 'text-blue-400';          // 蓝色
      case 'rare': return 'text-yellow-400';         // 黄色
      case 'legendary': return 'text-orange-500';    // 橙红色
      case 'socket': return 'text-gray-300';         // 银色
      default: return 'text-amber-400';
    }
  };

  return (
    <div className="w-80 bg-diablo-panel bg-opacity-95 backdrop-blur-sm border-l border-diablo-border flex flex-col">
      {/* 顶部：巅峰盘选择 */}
      <div className="p-4 border-b border-diablo-border">
        <h2 className="text-diablo-gold text-lg font-bold mb-3">巅峰盘</h2>
        
        {/* 已选择的巅峰盘 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {boards.map((board, index) => (
            <div
              key={board.id}
              className={`relative group ${index > 0 ? 'mr-6' : ''}`}
            >
              {/* 连接线指示 */}
              {index > 0 && (
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-diablo-gold">
                  →
                </div>
              )}
              <button
                onClick={() => switchBoard(index)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  index === activeBoardIndex
                    ? 'bg-diablo-gold text-diablo-dark'
                    : 'bg-diablo-bg text-diablo-gold hover:bg-diablo-hover'
                } ${index === 0 ? 'ring-2 ring-diablo-gold' : ''}`}
              >
                <span className="text-lg">{board.icon}</span>
                <span className="text-sm font-medium">{board.name}</span>
              </button>
              {/* 断开按钮（仅非主盘且是最后一个） */}
              {index > 0 && index === boards.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    disconnectBoard(index);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  title="断开连接"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* 添加巅峰盘按钮 */}
        {boards.length < 5 && (
          <div className="mb-3">
            <div className="text-xs text-diablo-muted mb-2">选择巅峰盘 ({boards.length}/5)</div>
            <div className="flex flex-wrap gap-1">
              {availableBoards.slice(0, 5 - boards.length).map(board => (
                <button
                  key={board.id}
                  onClick={() => selectBoard(board)}
                  className="flex items-center gap-1 px-2 py-1 rounded text-sm bg-diablo-bg text-diablo-muted hover:text-diablo-gold hover:bg-diablo-hover transition-all"
                >
                  <span>{board.icon}</span>
                  <span>{board.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 点数设置 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-diablo-muted">点数:</span>
          <input
            type="number"
            value={totalPoints}
            onChange={(e) => setTotalPoints(parseInt(e.target.value) || 0)}
            className="w-16 px-2 py-1 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-center text-sm"
          />
          <span className="text-sm text-diablo-gold">{spentPoints}/{totalPoints} 已使用</span>
        </div>
      </div>

      {/* 中间：节点详情 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedNodeData ? (
          <div className="bg-diablo-bg rounded-lg p-4 border border-diablo-border">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                selectedNodeData.type === 'legendary' ? 'bg-gradient-to-br from-yellow-400 to-orange-600' :
                selectedNodeData.type === 'rare' ? 'bg-gradient-to-br from-blue-400 to-blue-700' :
                'bg-gradient-to-br from-amber-200 to-amber-700'
              }`}>
                {selectedNodeData.icon}
              </div>
              <div>
                <div className={`text-sm ${getNodeTypeColor(selectedNodeData.type)}`}>
                  {getNodeTypeLabel(selectedNodeData.type)}
                </div>
                <div className="text-diablo-gold font-bold">{selectedNodeData.name}</div>
              </div>
            </div>
            
            {/* 效果列表 */}
            <div className="space-y-2">
              {selectedNodeData.effects.map((effect, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-diablo-muted">{effect.name}</span>
                  <span className="text-diablo-gold">+{effect.value}{effect.unit}</span>
                </div>
              ))}
            </div>
            
            {/* 加成条件 */}
            {selectedNodeData.bonuses && selectedNodeData.bonuses.length > 0 && (
              <div className="mt-4 pt-4 border-t border-diablo-border">
                <div className="text-xs text-diablo-muted mb-2">条件加成</div>
                {selectedNodeData.bonuses.map((bonus, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex justify-between">
                      <span className="text-diablo-muted">{bonus.condition}</span>
                      <span className={`${
                        bonus.currentValue >= bonus.requiredValue 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {bonus.currentValue}/{bonus.requiredValue}
                      </span>
                    </div>
                    <div className="mt-1">
                      <div className="h-1 bg-diablo-bg rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-diablo-gold transition-all"
                          style={{ width: `${Math.min(100, (bonus.currentValue / bonus.requiredValue) * 100)}%` }}
                        />
                      </div>
                      {bonus.currentValue >= bonus.requiredValue && (
                        <div className="text-xs text-green-400 mt-1">
                          ✅ {bonus.bonusEffect}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 入口点标记 */}
            {selectedNodeData.isEntryPoint && (
              <div className="mt-3 px-2 py-1 bg-diablo-gold bg-opacity-20 rounded text-xs text-diablo-gold text-center">
                🎯 面板链接入口点
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-diablo-muted py-8">
            <div className="text-4xl mb-2">👆</div>
            <div className="text-sm">点击节点查看详情</div>
          </div>
        )}
      </div>

      {/* 底部：雕纹管理 */}
      <div className="p-4 border-t border-diablo-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-diablo-gold font-bold">雕纹</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExportImport(true)}
              className="text-xs text-diablo-muted hover:text-diablo-gold transition-colors"
            >
              导入/导出
            </button>
            <button
              onClick={resetView}
              className="text-xs text-diablo-muted hover:text-diablo-gold transition-colors"
            >
              重置视图
            </button>
          </div>
        </div>
        
        {/* 当前雕纹 */}
        {currentGlyph ? (
          <div className="bg-diablo-bg rounded-lg p-3 border border-diablo-gold mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentGlyph.icon}</span>
                <div>
                  <div className="text-diablo-gold font-bold">{currentGlyph.name}</div>
                  <div className="text-xs text-diablo-muted">
                    +{currentGlyph.effect.value}{currentGlyph.effect.unit} {currentGlyph.effect.name}
                  </div>
                </div>
              </div>
              <button
                onClick={unequipGlyph}
                className="text-red-400 hover:text-red-300 text-lg"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-diablo-bg rounded-lg p-3 border border-diablo-border mb-3 text-center">
            <div className="text-diablo-muted text-sm">点击下方雕纹装备到槽位</div>
          </div>
        )}
        
        {/* 雕纹列表 */}
        <div className="grid grid-cols-4 gap-2">
          {glyphs.map(glyph => (
            <button
              key={glyph.id}
              onClick={() => equipGlyph(glyph)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                currentGlyph?.id === glyph.id
                  ? 'bg-diablo-gold text-diablo-dark'
                  : 'bg-diablo-bg text-diablo-muted hover:text-diablo-gold hover:bg-diablo-hover'
              }`}
            >
              <span className="text-xl">{glyph.icon}</span>
              <span className="text-xs mt-1 truncate w-full text-center">{glyph.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 导入导出弹窗 */}
      {showExportImport && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <BoardExportImport onClose={() => setShowExportImport(false)} />
        </div>
      )}
    </div>
  );
};
