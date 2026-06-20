import { useState } from 'react';
import { useParagonStore } from '../store/paragonStore';
import { ParagonBoard, RotationAngle, EdgeDirection } from '../types';

interface BoardLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceBoardIndex: number;
  sourceEdge: EdgeDirection;
}

// 旋转角度选项
const rotationOptions: { value: RotationAngle; label: string; rotation: number }[] = [
  { value: 0, label: '0°', rotation: 0 },
  { value: 90, label: '90°', rotation: 90 },
  { value: 180, label: '180°', rotation: 180 },
  { value: 270, label: '270°', rotation: 270 },
];

// 旋转后的边对应关系
const getRotatedEdge = (edge: EdgeDirection, rotation: RotationAngle): EdgeDirection => {
  const edges: EdgeDirection[] = ['top', 'right', 'bottom', 'left'];
  let index = edges.indexOf(edge);
  const steps = rotation / 90;
  index = (index + steps) % 4;
  return edges[index];
};

// 获取边的中文名称
const getEdgeName = (edge: EdgeDirection): string => {
  switch (edge) {
    case 'top': return '上边';
    case 'bottom': return '下边';
    case 'left': return '左边';
    case 'right': return '右边';
  }
};

// 盘预览组件
const BoardPreview = ({
  board,
  rotation,
  isSelected,
  onClick
}: {
  board: ParagonBoard;
  rotation: RotationAngle;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-diablo-gold bg-diablo-gold bg-opacity-20'
          : 'border-diablo-border bg-diablo-bg hover:border-diablo-gold hover:bg-diablo-hover'
      }`}
    >
      <div className="text-4xl mb-2">{board.icon}</div>
      <div className="text-sm text-diablo-gold font-medium">{board.name}</div>
      {rotation !== 0 && (
        <div className="text-xs text-diablo-muted mt-1">旋转 {rotation}°</div>
      )}
    </button>
  );
};

export const BoardLinkModal = ({
  isOpen,
  onClose,
  sourceBoardIndex,
  sourceEdge
}: BoardLinkModalProps) => {
  const {
    connectBoard,
    getNextLinkableBoards
  } = useParagonStore();

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [selectedRotation, setSelectedRotation] = useState<RotationAngle>(0);

  if (!isOpen) return null;

  const linkableBoards = getNextLinkableBoards();
  const selectedBoard = linkableBoards.find(b => b.id === selectedBoardId);

  // 旋转后的目标边（用于显示）
  const rotatedTargetEdge = getRotatedEdge(
    sourceEdge === 'top' ? 'bottom' :
    sourceEdge === 'bottom' ? 'top' :
    sourceEdge === 'left' ? 'right' : 'left',
    selectedRotation
  );

  const handleConnect = () => {
    if (!selectedBoardId) return;

    // 目标盘的入口边应该是旋转后的上边（因为是从源盘的下边连接的）
    const targetEntryEdge: EdgeDirection = 'top';

    connectBoard(
      sourceBoardIndex,
      sourceEdge,
      selectedBoardId,
      targetEntryEdge,
      selectedRotation
    );

    // 重置状态并关闭
    setSelectedBoardId(null);
    setSelectedRotation(0);
    onClose();
  };

  const handleClose = () => {
    setSelectedBoardId(null);
    setSelectedRotation(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-diablo-panel border border-diablo-border rounded-xl w-[600px] max-h-[80vh] overflow-hidden shadow-2xl">
        {/* 标题栏 */}
        <div className="px-6 py-4 border-b border-diablo-border bg-diablo-bg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-diablo-gold text-lg font-bold">链接巅峰盘</h2>
              <p className="text-sm text-diablo-muted mt-1">
                从 {getEdgeName(sourceEdge)} 链接 · 最多连接4个盘
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-diablo-muted hover:text-diablo-gold text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {linkableBoards.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🔗</div>
              <p className="text-diablo-muted">已达到最大链接数量（4个盘）</p>
            </div>
          ) : (
            <>
              {/* 选择目标盘 */}
              <div className="mb-6">
                <h3 className="text-sm text-diablo-muted mb-3">选择要链接的巅峰盘</h3>
                <div className="grid grid-cols-3 gap-3">
                  {linkableBoards.map(board => (
                    <BoardPreview
                      key={board.id}
                      board={board}
                      rotation={0}
                      isSelected={selectedBoardId === board.id}
                      onClick={() => {
                        setSelectedBoardId(board.id);
                        setSelectedRotation(0);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 旋转选择（选中盘后显示） */}
              {selectedBoard && (
                <div className="mb-6">
                  <h3 className="text-sm text-diablo-muted mb-3">
                    选择旋转角度（当前：{getEdgeName(sourceEdge)} 连接 目标盘{getEdgeName(rotatedTargetEdge)}）
                  </h3>
                  <div className="flex gap-3">
                    {rotationOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedRotation(opt.value)}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          selectedRotation === opt.value
                            ? 'border-diablo-gold bg-diablo-gold bg-opacity-20 text-diablo-gold'
                            : 'border-diablo-border bg-diablo-bg text-diablo-muted hover:border-diablo-gold'
                        }`}
                      >
                        <div className="text-2xl mb-1">
                          {opt.value === 0 ? '⬜' : opt.value === 90 ? '◻️' : opt.value === 180 ? '🔄' : '◻️'}
                        </div>
                        <div className="text-sm font-medium">{opt.label}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {getEdgeName(sourceEdge)} → {getEdgeName(getRotatedEdge(rotatedTargetEdge, opt.value as RotationAngle))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 预览效果 */}
              {selectedBoard && (
                <div className="bg-diablo-bg rounded-lg p-4 border border-diablo-border">
                  <h4 className="text-sm text-diablo-muted mb-3">连接预览</h4>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-diablo-gold font-medium">源盘</div>
                      <div className="text-xs text-diablo-muted">{getEdgeName(sourceEdge)}</div>
                    </div>
                    <div className="text-2xl text-diablo-gold">→</div>
                    <div className="text-center">
                      <div className="text-4xl">{selectedBoard.icon}</div>
                      <div className="text-sm text-diablo-gold font-medium">{selectedBoard.name}</div>
                      <div className="text-xs text-diablo-muted">
                        旋转 {selectedRotation}° · {getEdgeName(rotatedTargetEdge)} 入口
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="px-6 py-4 border-t border-diablo-border bg-diablo-bg flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-diablo-muted hover:text-diablo-gold hover:bg-diablo-hover transition-all"
          >
            取消
          </button>
          <button
            onClick={handleConnect}
            disabled={!selectedBoardId}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedBoardId
                ? 'bg-diablo-gold text-diablo-dark hover:bg-diablo-gold-hover'
                : 'bg-diablo-border text-diablo-muted cursor-not-allowed'
            }`}
          >
            确认链接
          </button>
        </div>
      </div>
    </div>
  );
};
