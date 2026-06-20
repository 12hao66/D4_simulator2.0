import { useSkillStore } from '../store/skillStore';
import { classOptions } from '../data/skills';

export const ClassSelector = () => {
  const { selectedClass, setClass, editMode, toggleEditMode } = useSkillStore();

  return (
    <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-b border-[#3a2a1a] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[#c9a962] font-bold">职业选择:</span>
          <div className="flex flex-wrap gap-2">
            {classOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setClass(option.value)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedClass === option.value
                    ? 'bg-[#c9a962] text-[#0f0f1a]'
                    : 'bg-[#1a1a2e] text-[#d4c4a8] hover:bg-[#c9a962]/20 hover:text-[#c9a962]'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* 编辑模式切换按钮 */}
        <button
          onClick={toggleEditMode}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
            ${editMode
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
            }
          `}
        >
          <span>{editMode ? '🔒' : '✏️'}</span>
          {editMode ? '退出编辑' : '编辑模式'}
        </button>
      </div>
    </div>
  );
};
