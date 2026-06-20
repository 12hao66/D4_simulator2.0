import { useParagonStore } from '../store/paragonStore';
import { RotationAngle } from '../types';

interface BoardRotationPanelProps {
  boardIndex: number;
  onClose: () => void;
}

const rotationOptions: { value: RotationAngle; label: string; icon: string }[] = [
  { value: 0, label: '0°', icon: '⬆️' },
  { value: 90, label: '90°', icon: '➡️' },
  { value: 180, label: '180°', icon: '⬇️' },
  { value: 270, label: '270°', icon: '⬅️' },
];

export const BoardRotationPanel = ({ boardIndex, onClose }: BoardRotationPanelProps) => {
  const { boards, linkChain, rotateBoard } = useParagonStore();

  const board = boards[boardIndex];
  if (!board) return null;

  const connection = linkChain.connections.find(c => c.toBoardId === board.id);
  const currentRotation = connection?.rotation || 0;

  const handleRotate = (rotation: RotationAngle) => {
    rotateBoard(boardIndex, rotation);
    onClose();
  };

  return (
    <div className="absolute bg-diablo-panel border border-diablo-border rounded-lg shadow-xl p-3 z-50 min-w-[180px]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-diablo-gold font-medium text-sm">
          旋转 {board.name}
        </div>
        <button
          onClick={onClose}
          className="text-diablo-muted hover:text-diablo-gold text-lg"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {rotationOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleRotate(opt.value)}
            className={`py-2 px-3 rounded-lg border transition-all ${
              currentRotation === opt.value
                ? 'border-diablo-gold bg-diablo-gold bg-opacity-20 text-diablo-gold'
                : 'border-diablo-border bg-diablo-bg text-diablo-muted hover:border-diablo-gold hover:text-diablo-gold'
            }`}
          >
            <div className="text-lg">{opt.icon}</div>
            <div className="text-xs mt-1">{opt.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-diablo-border">
        <div className="text-xs text-diablo-muted text-center">
          当前: {currentRotation}°
        </div>
      </div>
    </div>
  );
};
