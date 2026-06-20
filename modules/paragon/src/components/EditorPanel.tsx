import { useState, useEffect } from 'react';
import { useParagonStore } from '../store/paragonStore';
import { ParagonBoard } from '../types';

export const EditorPanel = () => {
  const { 
    editMode, 
    boards, 
    activeBoardIndex,
    availableBoards,
    switchBoard,
    selectBoard,
    deselectBoard,
    exportBoardConfig
  } = useParagonStore();
  
  const [showBoardSelector, setShowBoardSelector] = useState(false);

  // ESC键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBoardSelector(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeBoard = boards[activeBoardIndex];

  const handleExportToFile = () => {
    const config = exportBoardConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeBoard?.id || 'board'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectBoardForEdit = (board: ParagonBoard) => {
    selectBoard(board);
    setShowBoardSelector(false);
  };

  if (!editMode) return null;

  return (
    <>
      <div className="w-64 bg-diablo-panel bg-opacity-95 backdrop-blur-sm border-l border-diablo-border flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-diablo-border bg-gradient-to-r from-orange-600 to-orange-700">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <span>✏️</span>
            编辑器工具
          </h2>
        </div>

        <div className="p-4 border-b border-diablo-border">
          <div className="mb-2">
            <label className="text-xs text-diablo-muted mb-1 block">当前编辑的盘</label>
            <select
              value={activeBoardIndex}
              onChange={(e) => switchBoard(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-diablo-bg border border-diablo-border rounded text-diablo-gold text-sm"
            >
              {boards.map((board, index) => (
                <option key={board.id} value={index}>
                  {board.icon} {board.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setShowBoardSelector(true)}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>➕</span>
            添加盘进行编辑
          </button>

          {boards.length > 1 && activeBoardIndex > 0 && (
            <button
              onClick={() => deselectBoard(activeBoardIndex)}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span>✖️</span>
              移除当前盘
            </button>
          )}
        </div>

        <div className="p-4 border-b border-diablo-border space-y-2">
          <button
            onClick={handleExportToFile}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>💾</span>
            导出当前盘JSON
          </button>
        </div>

        <div className="p-4 text-xs text-diablo-muted space-y-2">
          <div className="flex items-start gap-2">
            <span>💡</span>
            <span>右键点击画布添加/编辑/删除节点</span>
          </div>
          <div className="flex items-start gap-2">
            <span>💡</span>
            <span>拖拽节点调整位置</span>
          </div>
        </div>
      </div>

      {/* 选择盘弹窗 */}
      {showBoardSelector && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBoardSelector(false);
          }}
        >
          <div className="bg-diablo-panel border border-diablo-border rounded-lg p-6 w-80">
            <h3 className="text-diablo-gold text-lg font-bold mb-4">选择巅峰盘进行编辑</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableBoards.slice(0, 10 - boards.length).map(board => (
                <button
                  key={board.id}
                  onClick={() => handleSelectBoardForEdit(board)}
                  className="w-full px-4 py-3 bg-diablo-bg hover:bg-diablo-hover border border-diablo-border rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{board.icon}</span>
                    <div>
                      <div className="text-diablo-gold font-bold">{board.name}</div>
                      <div className="text-xs text-diablo-muted">{board.nodes.length} 个节点</div>
                    </div>
                  </div>
                </button>
              ))}
              {availableBoards.length === 0 && (
                <div className="text-center text-diablo-muted py-4">没有可用的巅峰盘</div>
              )}
            </div>
            <button
              onClick={() => setShowBoardSelector(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
};