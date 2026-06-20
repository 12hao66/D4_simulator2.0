import { useState } from 'react';
import { useSkillStore } from '../store/skillStore';
import { SkillType, CharacterClass } from '../types';

export const EditorPanel = () => {
  const { 
    editMode, 
    selectedSkill, 
    skillTree,
    selectedClass,
    toggleEditMode,
    addSkillNode,
    deleteSkillNode,
    updateSkillNode,
    exportSkillTreeConfig
  } = useSkillStore();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newNodeData, setNewNodeData] = useState({
    name: '',
    icon: '✨',
    type: 'basic' as SkillType,
    category: '自定义',
    maxRank: 5,
    requires: ''
  });

  const selectedNodeData = skillTree?.nodes.find(n => n.id === selectedSkill);

  const handleAddNode = () => {
    if (!skillTree) return;
    
    addSkillNode({
      name: newNodeData.name || '新技能',
      icon: newNodeData.icon,
      position: { x: 500, y: 500 },
      requires: newNodeData.requires.split(',').map(s => s.trim()).filter(Boolean),
      rank: 0,
      maxRank: newNodeData.maxRank,
      effects: [],
      category: newNodeData.category,
      characterClass: selectedClass,
      type: newNodeData.type,
      color: getSkillTypeColor(newNodeData.type)
    });
    
    setShowAddForm(false);
    setNewNodeData({
      name: '',
      icon: '✨',
      type: 'basic',
      category: '自定义',
      maxRank: 5,
      requires: ''
    });
  };

  const handleDeleteNode = () => {
    if (!selectedSkill) return;
    if (confirm('确定要删除这个技能节点吗？')) {
      deleteSkillNode(selectedSkill);
    }
  };

  const handleUpdateNodeName = (name: string) => {
    if (!selectedSkill) return;
    updateSkillNode(selectedSkill, { name });
  };

  const handleUpdateNodeIcon = (icon: string) => {
    if (!selectedSkill) return;
    updateSkillNode(selectedSkill, { icon });
  };

  const handleUpdateNodeType = (type: SkillType) => {
    if (!selectedSkill) return;
    updateSkillNode(selectedSkill, { type, color: getSkillTypeColor(type) });
  };

  const handleUpdateNodeCategory = (category: string) => {
    if (!selectedSkill) return;
    updateSkillNode(selectedSkill, { category });
  };

  const handleUpdateNodeMaxRank = (maxRank: number) => {
    if (!selectedSkill) return;
    updateSkillNode(selectedSkill, { maxRank });
  };

  const handleUpdateRequires = (requires: string) => {
    if (!selectedSkill) return;
    const requiresArray = requires.split(',').map(s => s.trim()).filter(Boolean);
    updateSkillNode(selectedSkill, { requires: requiresArray });
  };

  const handleUpdatePosition = (x: number, y: number) => {
    if (!selectedSkill) return;
    updateSkillNode(selectedSkill, { position: { x, y } });
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const copyToClipboard = () => {
    const config = exportSkillTreeConfig();
    navigator.clipboard.writeText(config);
    alert('配置已复制到剪贴板！');
  };

  if (!editMode) return null;

  return (
    <>
      <div className="w-80 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-l border-[#3a2a1a] flex flex-col overflow-y-auto">
        {/* 标题 */}
        <div className="p-4 border-b border-[#3a2a1a] bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg font-bold flex items-center gap-2">
              <span>✏️</span>
              技能编辑器
            </h2>
            <button
              onClick={toggleEditMode}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded transition-colors"
            >
              退出编辑
            </button>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="p-4 border-b border-[#3a2a1a] space-y-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>➕</span>
            添加技能节点
          </button>
          
          {selectedSkill && (
            <button
              onClick={handleDeleteNode}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🗑️</span>
              删除选中节点
            </button>
          )}
          
          <button
            onClick={handleExport}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>📋</span>
            导出配置
          </button>
        </div>

        {/* 选中节点编辑 */}
        {selectedNodeData && (
          <div className="p-4 border-b border-[#3a2a1a]">
            <h3 className="text-[#c9a962] font-bold mb-3 flex items-center gap-2">
              <span>🎯</span>
              编辑技能节点
            </h3>
            
            <div className="space-y-3">
              {/* 技能名称 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能名称</label>
                <input
                  type="text"
                  value={selectedNodeData.name}
                  onChange={(e) => handleUpdateNodeName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              {/* 技能图标 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能图标 (Emoji)</label>
                <input
                  type="text"
                  value={selectedNodeData.icon}
                  onChange={(e) => handleUpdateNodeIcon(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              {/* 技能类型 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能类型</label>
                <select
                  value={selectedNodeData.type}
                  onChange={(e) => handleUpdateNodeType(e.target.value as SkillType)}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                >
                  <option value="basic">基础技能</option>
                  <option value="core">核心技能</option>
                  <option value="defensive">防御技能</option>
                  <option value="ultimate">终极技能</option>
                  <option value="key">关键节点</option>
                  <option value="passive">被动技能</option>
                </select>
              </div>

              {/* 技能分类 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能分类</label>
                <input
                  type="text"
                  value={selectedNodeData.category}
                  onChange={(e) => handleUpdateNodeCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              {/* 最大等级 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">最大等级</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={selectedNodeData.maxRank}
                  onChange={(e) => handleUpdateNodeMaxRank(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              {/* 前置技能 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">前置技能ID (逗号分隔)</label>
                <input
                  type="text"
                  value={selectedNodeData.requires.join(', ')}
                  onChange={(e) => handleUpdateRequires(e.target.value)}
                  placeholder="如: barbarian-key-0, barbarian-key-1"
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              {/* 位置调整 */}
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">位置</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={selectedNodeData.position.x}
                    onChange={(e) => handleUpdatePosition(Number(e.target.value), selectedNodeData.position.y)}
                    className="flex-1 px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                    placeholder="X"
                  />
                  <input
                    type="number"
                    value={selectedNodeData.position.y}
                    onChange={(e) => handleUpdatePosition(selectedNodeData.position.x, Number(e.target.value))}
                    className="flex-1 px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                    placeholder="Y"
                  />
                </div>
              </div>

              {/* 节点信息 */}
              <div className="bg-[#1a1a2e] rounded p-3 text-xs text-[#8b7355] space-y-1">
                <div>ID: {selectedNodeData.id}</div>
                <div>职业: {getClassName(selectedNodeData.characterClass)}</div>
                <div>当前等级: {selectedNodeData.rank}/{selectedNodeData.maxRank}</div>
              </div>
            </div>
          </div>
        )}

        {/* 提示信息 */}
        <div className="p-4 text-xs text-[#8b7355] space-y-2">
          <div className="flex items-start gap-2">
            <span>💡</span>
            <span>点击技能节点可选中进行编辑</span>
          </div>
          <div className="flex items-start gap-2">
            <span>💡</span>
            <span>调整位置后技能树会自动重绘连接线</span>
          </div>
          <div className="flex items-start gap-2">
            <span>💡</span>
            <span>导出配置后可复制到 skills.ts 文件中使用</span>
          </div>
        </div>
      </div>

      {/* 添加节点表单弹窗 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border border-[#3a2a1a] rounded-lg p-6 w-96">
            <h3 className="text-[#c9a962] text-lg font-bold mb-4">添加新技能节点</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能名称</label>
                <input
                  type="text"
                  value={newNodeData.name}
                  onChange={(e) => setNewNodeData({ ...newNodeData, name: e.target.value })}
                  placeholder="输入技能名称"
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能图标 (Emoji)</label>
                <input
                  type="text"
                  value={newNodeData.icon}
                  onChange={(e) => setNewNodeData({ ...newNodeData, icon: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能类型</label>
                <select
                  value={newNodeData.type}
                  onChange={(e) => setNewNodeData({ ...newNodeData, type: e.target.value as SkillType })}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                >
                  <option value="basic">基础技能</option>
                  <option value="core">核心技能</option>
                  <option value="defensive">防御技能</option>
                  <option value="ultimate">终极技能</option>
                  <option value="key">关键节点</option>
                  <option value="passive">被动技能</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">技能分类</label>
                <input
                  type="text"
                  value={newNodeData.category}
                  onChange={(e) => setNewNodeData({ ...newNodeData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">最大等级</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newNodeData.maxRank}
                  onChange={(e) => setNewNodeData({ ...newNodeData, maxRank: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-[#8b7355] mb-1 block">前置技能ID (逗号分隔，可选)</label>
                <input
                  type="text"
                  value={newNodeData.requires}
                  onChange={(e) => setNewNodeData({ ...newNodeData, requires: e.target.value })}
                  placeholder="如: barbarian-key-0"
                  className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#3a2a1a] rounded text-[#c9a962] text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddNode}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                添加
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 导出配置弹窗 */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border border-[#3a2a1a] rounded-lg p-6 w-[600px] max-h-[80vh] flex flex-col">
            <h3 className="text-[#c9a962] text-lg font-bold mb-4">导出技能树配置</h3>
            
            <div className="flex-1 overflow-auto mb-4">
              <pre className="bg-[#1a1a2e] p-4 rounded text-xs text-[#c9a962] overflow-auto">
                {exportSkillTreeConfig()}
              </pre>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                复制到剪贴板
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function getSkillTypeColor(type: SkillType): string {
  const colors: Record<SkillType, string> = {
    basic: '#4a90d9',
    core: '#e67e22',
    defensive: '#27ae60',
    ultimate: '#9b59b6',
    key: '#c9a962',
    passive: '#7f8c8d'
  };
  return colors[type];
}

function getClassName(characterClass: CharacterClass): string {
  const names: Record<CharacterClass, string> = {
    barbarian: '野蛮人',
    necromancer: '死灵法师',
    sorc: '法师',
    wizard: '巫师',
    druid: '德鲁伊',
    rogue: '游侠',
    ranger: '游侠',
    spiritborn: '术士',
    paladin: '圣骑士',
    warlock: '灵巫'
  };
  return names[characterClass];
}
