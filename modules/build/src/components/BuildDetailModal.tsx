import type { Build, EquipmentSlot } from '../types';
import { directImportToEquipment } from '../utils/storage';
import { useState } from 'react';

interface BuildDetailModalProps {
  build: Build;
  onClose: () => void;
  onExport?: () => void;
}

// 装备槽位名称映射
const slotNameMap: Record<EquipmentSlot, string> = {
  helmet: '头盔',
  chest: '胸甲',
  gloves: '手套',
  pants: '护腿',
  boots: '靴子',
  weapon1: '主手武器',
  weapon2: '副手武器',
  weapon3: '武器3',
  weapon4: '武器4',
  shield: '盾牌',
  amulet: '项链',
  ring1: '戒指1',
  ring2: '戒指2'
};

// 稀有度颜色映射
const rarityColorMap: Record<string, { text: string; border: string; bg: string }> = {
  common: { text: 'text-gray-400', border: 'border-gray-600', bg: 'bg-gray-900/30' },
  magic: { text: 'text-blue-400', border: 'border-blue-600', bg: 'bg-blue-900/30' },
  rare: { text: 'text-yellow-400', border: 'border-yellow-600', bg: 'bg-yellow-900/30' },
  legendary: { text: 'text-orange-400', border: 'border-orange-600', bg: 'bg-orange-900/30' },
  unique: { text: 'text-purple-400', border: 'border-purple-600', bg: 'bg-purple-900/30' }
};

// 词缀类型名称映射
const affixTypeMap: Record<string, string> = {
  additive: '加成',
  multiplicative: '百分比',
  independent: '独立'
};

function BuildDetailModal({ build, onClose, onExport }: BuildDetailModalProps) {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isImporting, setIsImporting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>(null);

  const handleImportToMyBuilds = () => {
    setIsImporting(true);
    setImportStatus('idle');
    
    setTimeout(() => {
      const success = directImportToEquipment(build);
      
      if (success) {
        setImportStatus('success');
        setTimeout(() => {
          setImportStatus('idle');
        }, 2000);
      } else {
        setImportStatus('error');
        setTimeout(() => {
          setImportStatus('idle');
        }, 2000);
      }
      
      setIsImporting(false);
    }, 300);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
  };

  // 获取装备列表
  const equipmentList = Object.entries(build.equipment)
    .filter(([_, item]) => item !== null)
    .map(([slot, item]) => ({ slot: slot as EquipmentSlot, item: item! }));

  // 获取当前选中的装备
  const selectedItem = selectedSlot ? build.equipment[selectedSlot] : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-stone-900 border border-stone-700 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 左侧：构筑信息 */}
        <div className="w-1/2 border-r border-stone-800 flex flex-col">
          {/* 头部 */}
          <div className="p-5 border-b border-stone-800">
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors text-stone-400"
            >
              ✕
            </button>

            {/* 操作按钮组 */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={handleImportToMyBuilds}
                disabled={isImporting || importStatus === 'success'}
                className={`px-4 py-2 border rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
                  importStatus === 'success'
                    ? 'bg-green-900/30 border-green-700 text-green-400'
                    : isImporting
                      ? 'bg-stone-800 border-stone-700 text-stone-500 cursor-wait'
                      : 'bg-amber-900/30 border-amber-700 text-amber-400 hover:bg-amber-900/50'
                }`}
              >
                {isImporting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>导入中...</span>
                  </>
                ) : importStatus === 'success' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>已导入</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>导入到我的方案</span>
                  </>
                )}
              </button>

              <button
                onClick={onExport}
                className="px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg font-medium transition-all flex items-center gap-2 text-sm text-stone-300 hover:bg-stone-700"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>导出JSON</span>
              </button>
            </div>

            {/* 作者信息 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-xl text-amber-400 font-medium">
                {build.author.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-medium text-stone-100">{build.author}</div>
                <div className="text-sm text-stone-500">
                  Lv.{build.authorLevel} · 天梯排名 #{build.authorRank}
                </div>
              </div>
              {build.rating && (
                <div className="ml-auto flex items-center gap-1 bg-stone-800 px-3 py-1 rounded-lg">
                  <span className="text-amber-400">★</span>
                  <span className="text-base font-medium text-stone-300">{build.rating}</span>
                </div>
              )}
            </div>

            {/* 构筑名称 */}
            <h2 className="text-xl font-semibold text-amber-400 mb-2">{build.name}</h2>
            <p className="text-sm text-stone-400 mb-3">{build.description}</p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {build.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-stone-800 text-stone-300 px-2 py-1 rounded border border-stone-700"
                >
                  {tag}
                </span>
              ))}
              {build.playStyle && (
                <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-1 rounded border border-amber-800">
                  {build.playStyle}
                </span>
              )}
              {build.difficulty && (
                <span className="text-xs bg-stone-800 text-stone-400 px-2 py-1 rounded border border-stone-700">
                  {build.difficulty}
                </span>
              )}
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-3 p-4 border-b border-stone-800">
            <div className="bg-stone-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-amber-400">{formatNumber(build.likes)}</div>
              <div className="text-xs text-stone-500">点赞</div>
            </div>
            <div className="bg-stone-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-amber-400">{formatNumber(build.downloads)}</div>
              <div className="text-xs text-stone-500">下载</div>
            </div>
            <div className="bg-stone-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-amber-400">{formatNumber(build.views)}</div>
              <div className="text-xs text-stone-500">浏览</div>
            </div>
          </div>

          {/* 技能配置 */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="text-sm font-medium text-stone-300 mb-3 flex items-center gap-2">
              <span>⚡</span>
              <span>技能配置</span>
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {build.skills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="bg-stone-800/50 border border-stone-700 rounded-lg p-3 text-center"
                >
                  <div className="text-2xl mb-1">{skill.icon}</div>
                  <div className="text-xs text-stone-300 truncate">{skill.skillName}</div>
                  <div className="text-xs text-stone-600 mt-1">{skill.slot}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：装备列表和详情 */}
        <div className="w-1/2 flex flex-col">
          {/* 装备列表 */}
          <div className="p-4 border-b border-stone-800">
            <h3 className="text-sm font-medium text-stone-300 mb-3 flex items-center gap-2">
              <span>🛡️</span>
              <span>装备配置</span>
              <span className="text-xs text-stone-500 ml-auto">点击查看详情</span>
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {equipmentList.map(({ slot, item }) => {
                const rarity = rarityColorMap[item.rarity] || rarityColorMap.common;
                const isSelected = selectedSlot === slot;
                return (
                  <div 
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2 rounded-lg cursor-pointer transition-all border ${
                      isSelected 
                        ? `${rarity.bg} ${rarity.border}` 
                        : 'bg-stone-800/50 border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    <div className="text-xs text-stone-500 mb-1">{slotNameMap[slot]}</div>
                    <div className={`text-xs font-medium truncate ${isSelected ? rarity.text : 'text-stone-300'}`}>
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 装备详情 */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedItem ? (
              <div className="space-y-4">
                {/* 装备标题 */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-stone-500 mb-1">{slotNameMap[selectedSlot!]}</div>
                    <h4 className={`text-lg font-semibold ${rarityColorMap[selectedItem.rarity]?.text || 'text-stone-300'}`}>
                      {selectedItem.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${rarityColorMap[selectedItem.rarity]?.bg} ${rarityColorMap[selectedItem.rarity]?.text}`}>
                        {selectedItem.rarity === 'unique' ? '暗金' : selectedItem.rarity === 'legendary' ? '传奇' : '普通'}
                      </span>
                      <span className="text-xs text-stone-500">等级 {selectedItem.level}</span>
                    </div>
                  </div>
                  {selectedItem.icon && (
                    <img src={selectedItem.icon} alt={selectedItem.name} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                </div>

                {/* 词缀列表 */}
                <div>
                  <h5 className="text-sm font-medium text-stone-400 mb-2">词缀属性</h5>
                  <div className="space-y-2">
                    {selectedItem.affixes.map((affix, idx) => (
                      <div 
                        key={idx}
                        className="bg-stone-800/50 border border-stone-700 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-stone-300">{affix.name}</span>
                          <span className="text-sm font-medium text-amber-400">
                            +{affix.value}{affix.type === 'multiplicative' ? '%' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-500">
                            {affixTypeMap[affix.type] || affix.type}
                          </span>
                          {affix.type === 'multiplicative' && (
                            <span className="text-xs bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded">
                              百分比加成
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 装备ID */}
                <div className="text-xs text-stone-600 pt-2 border-t border-stone-800">
                  ID: {selectedItem.id}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-stone-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">🛡️</div>
                  <div>点击左侧装备查看详情</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildDetailModal;
