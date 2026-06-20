import { useSkillStore } from '../store/skillStore';

export const SkillPanel = () => {
  const { skillTree, selectedSkill, unlockedSkills, toggleSkill } = useSkillStore();
  const unlockedCount = Object.keys(unlockedSkills).length;
  const totalCount = skillTree?.nodes.length || 0;

  return (
    <div className="w-80 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-l border-[#3a2a1a] flex flex-col h-full">
      {/* 头部统计 */}
      <div className="p-4 border-b border-[#3a2a1a]">
        <div className="text-[#c9a962] text-lg font-bold mb-2 flex items-center gap-2">
          <span>⚔️</span>
          {skillTree?.name || '技能树'}
        </div>
        <div className="flex justify-between text-sm text-[#8b7355]">
          <span>已解锁: <span className="text-[#c9a962]">{unlockedCount}</span></span>
          <span>总计: {totalCount}</span>
        </div>
      </div>
      
      {/* 技能列表 */}
      <div className="flex-1 overflow-y-auto p-3">
        {skillTree?.nodes.map((node) => {
          const currentRank = unlockedSkills[node.id] || 0;
          const isUnlocked = currentRank > 0;
          const isSelected = selectedSkill === node.id;
          const canUnlock = node.requires.length === 0 || node.requires.every(reqId => unlockedSkills[reqId] !== undefined);
          const nodeColor = node.color || '#c9a962';
          
          return (
            <div
              key={node.id}
              onClick={() => {
                if (canUnlock || isUnlocked) {
                  toggleSkill(node.id);
                }
              }}
              className={`
                p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200
                ${isSelected ? 'bg-[#c9a962]/15 border border-[#c9a962]' : 'bg-[#1a1a2e]/50 hover:bg-[#2a2a4e]/50'}
                ${!canUnlock && !isUnlocked ? 'opacity-40 cursor-not-allowed' : ''}
              `}
              style={{
                borderColor: isSelected ? nodeColor : 'transparent',
              }}
            >
              <div className="flex items-center gap-3">
                {/* 技能图标 */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: isUnlocked 
                      ? `linear-gradient(135deg, ${nodeColor} 0%, ${adjustColor(nodeColor, -30)} 100%)`
                      : 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
                    boxShadow: isUnlocked ? `0 0 10px ${nodeColor}40` : 'none',
                  }}
                >
                  {node.icon}
                </div>
                
                <div className="flex-1">
                  <div className={`font-medium ${isUnlocked ? 'text-[#d4c4a8]' : 'text-[#6b6b6b]'}`}>
                    {node.name}
                  </div>
                  <div className="text-xs text-[#8b7355]">{node.category}</div>
                  {node.maxRank > 1 && (
                    <div className="text-xs" style={{ color: isUnlocked ? nodeColor : '#555' }}>
                      {currentRank}/{node.maxRank}
                    </div>
                  )}
                </div>
                
                {/* 解锁状态 */}
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${isUnlocked ? 'bg-[#27ae60] border-[#27ae60]' : 'border-[#555]'}
                `}>
                  {isUnlocked && <span className="text-xs text-white">✓</span>}
                </div>
              </div>
              
              {/* 效果列表 */}
              {isSelected && node.effects.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#3a2a1a]">
                  <div className="text-xs text-[#8b7355] mb-2 flex items-center gap-1">
                    <span>✨</span> 技能效果
                  </div>
                  {node.effects.map((effect) => (
                    <div key={effect.id} className="text-sm mb-1">
                      <span className="text-[#c9a962]">{effect.name}:</span>
                      <span className="ml-2 text-[#d4c4a8]">+{effect.value}{effect.unit}</span>
                      <span className="ml-1 text-[#8b7355]">- {effect.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* 底部提示 */}
      <div className="p-3 border-t border-[#3a2a1a] text-xs text-[#8b7355]">
        <div className="mb-1">💡 点击技能节点解锁/取消</div>
        <div>🔄 滚轮缩放 | 拖拽平移</div>
      </div>
    </div>
  );
};

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
