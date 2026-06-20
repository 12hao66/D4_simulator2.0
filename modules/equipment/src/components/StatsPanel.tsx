import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useEquipmentStore } from '../store/equipmentStore'

function StatsPanel() {
  const { calculateStats } = useEquipmentStore()
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showDamageInfo, setShowDamageInfo] = useState(false)
  
  const stats = calculateStats()
  
  // 计算独立乘区总倍率
  const independentTotalMultiplier = stats.independentDetails.reduce((acc, item) => acc * item.multiplier, 1)
  
  // 处理鼠标悬停，记录元素位置（用于定位弹窗）
  const handleMouseEnter = (statName: string, e: React.MouseEvent) => {
    setHoveredStat(statName)
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,  // 元素水平中心点
      y: rect.top                     // 元素顶部
    })
  }
  
  return (
    <div 
      className="stats-panel flex flex-col h-full bg-d4-dark"
    >
      {/* 面板标题 */}
      <div className="stats-header px-2 py-1.5 border-b border-d4-border bg-gradient-to-r from-d4-card to-d4-dark">
        <span className="text-d4-gold text-[11px] font-bold tracking-wider">📊 属性面板</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {/* 主要属性 */}
        <div className="stats-section mb-3">
          <div className="section-header">
            <span className="section-title">主要属性</span>
            <span className="section-line"></span>
          </div>
          <div className="stat-grid">
            <div 
              className="stat-card stat-str"
              onMouseEnter={(e) => handleMouseEnter('strength', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-icon">💪</div>
              <div className="stat-content">
                <div className="stat-label">力量</div>
                <div className="stat-value">{stats.strength.toLocaleString()}</div>
              </div>
            </div>
            <div 
              className="stat-card stat-dex"
              onMouseEnter={(e) => handleMouseEnter('dexterity', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-icon">🔮</div>
              <div className="stat-content">
                <div className="stat-label">敏捷</div>
                <div className="stat-value">{stats.dexterity.toLocaleString()}</div>
              </div>
            </div>
            <div 
              className="stat-card stat-int"
              onMouseEnter={(e) => handleMouseEnter('intelligence', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-icon">✨</div>
              <div className="stat-content">
                <div className="stat-label">智力</div>
                <div className="stat-value">{stats.intelligence.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 战斗属性 */}
        <div className="stats-section mb-3">
          <div className="section-header">
            <span className="section-title">战斗属性</span>
            <span className="section-line"></span>
          </div>
          <div className="stat-list">
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('attackSpeed', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">攻击速度</span>
              <span className="stat-value text-[#ff6b6b]">{stats.attackSpeed.toFixed(2)} APS</span>
            </div>
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('critChance', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">暴击几率</span>
              <span className="stat-value text-[#ffd700]">{stats.critChance}%</span>
            </div>
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('critDamage', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">暴击伤害</span>
              <span className="stat-value text-[#ffd700]">{stats.critDamage}%</span>
            </div>
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('vulnerableDamage', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">易伤伤害</span>
              <span className="stat-value text-[#ff9500]">{stats.vulnerableDamage}%</span>
            </div>
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('weaponDamage', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">武器伤害</span>
              <span className="stat-value text-[#ff6b6b]">+{stats.weaponDamage}%</span>
            </div>
          </div>
        </div>
        
        {/* 防御属性 */}
        <div className="stats-section mb-3">
          <div className="section-header">
            <span className="section-title">防御属性</span>
            <span className="section-line"></span>
          </div>
          <div className="stat-list">
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('armor', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">护甲</span>
              <span className="stat-value">{stats.armor.toLocaleString()}</span>
            </div>
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('resistance', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">抗性</span>
              <span className="stat-value text-[#4ecdc4]">{stats.resistance}</span>
            </div>
            <div 
              className="stat-row"
              onMouseEnter={(e) => handleMouseEnter('health', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="stat-name">生命值</span>
              <span className="stat-value text-[#2ecc71]">{stats.health.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* 伤害加成 */}
        <div className="stats-section mb-3">
          <div className="section-header">
            <span className="section-title">伤害加成</span>
            <button
              className="ml-1.5 w-4 h-4 rounded-full bg-gray-600/40 hover:bg-gray-600/60 text-gray-400 hover:text-gray-300 text-[10px] font-light flex items-center justify-center transition-colors"
              onClick={() => setShowDamageInfo(!showDamageInfo)}
              title="伤害加成说明"
            >
              ?
            </button>
            <span className="section-line"></span>
          </div>
          
          {/* 伤害加成说明弹窗 */}
          {showDamageInfo && (
            <div className="bg-d4-card/90 border border-d4-border rounded-lg p-3 mb-2 text-xs">
              <div className="text-d4-gold font-bold mb-2 border-b border-d4-border pb-1">
                伤害加成计算说明
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-green-400 font-semibold w-20">A类加成</span>
                  <span className="text-gray-300">伤害类词缀加法累加</span>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-400 font-semibold w-20">B类乘区</span>
                  <span className="text-gray-300">同名词缀合并后相乘</span>
                </div>
                <div className="flex items-start">
                  <span className="text-pink-400 font-semibold w-20">独立乘区</span>
                  <span className="text-gray-300">后缀[x]词缀各自独立相乘</span>
                </div>
              </div>
            </div>
          )}
          
          {/* A类加成 */}
          <div className="damage-bonus">
            <div 
              className="bonus-item"
              onMouseEnter={(e) => handleMouseEnter('additiveDamage', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="bonus-label">A类加成</span>
              <span className="bonus-value text-[#4ade80]">+{stats.additiveDamage}%</span>
            </div>
            
            {/* B类乘区 */}
            <div 
              className="bonus-item"
              onMouseEnter={(e) => handleMouseEnter('multiplicativeDamage', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="bonus-label">B类乘区</span>
              <span className="bonus-value text-[#a78bfa]">×{stats.multiplicativeDamage.toFixed(2)}</span>
            </div>
            
            {/* 独立乘区 */}
            <div 
              className="bonus-item"
              onMouseEnter={(e) => handleMouseEnter('independentMultiplier', e)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <span className="bonus-label">独立乘区</span>
              <span className="bonus-value text-[#f472b6]">×{independentTotalMultiplier.toFixed(2)}</span>
            </div>
          </div>
          
          {/* B类乘区分组详情 */}
          {stats.multiplicativeGroups.length > 0 && (
            <div className="mt-2 p-2 bg-d4-card/50 rounded">
              <div className="text-xs text-gray-400 mb-1">B类分组详情</div>
              {stats.multiplicativeGroups.map((group, index) => (
                <div key={index} className="text-xs mb-1">
                  <span className="text-purple-300">{group.name}</span>
                  <span className="text-gray-500 ml-1">+{group.totalValue}%</span>
                  <span className="text-gray-600 ml-1">({group.sources.join(', ')})</span>
                </div>
              ))}
            </div>
          )}
          
          {/* 独立乘区详情 */}
          {stats.independentDetails.length > 0 && (
            <div className="mt-2 p-2 bg-d4-card/50 rounded">
              <div className="text-xs text-gray-400 mb-1">独立乘区详情</div>
              {stats.independentDetails.map((detail, index) => (
                <div key={index} className="text-xs mb-1">
                  <span className="text-pink-300">{detail.name}</span>
                  <span className="text-gray-500 ml-1">×{detail.multiplier.toFixed(2)}</span>
                  <span className="text-gray-600 ml-1">({detail.source})</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 其他属性 */}
        {Object.keys(stats.otherAttributes).length > 0 && (
          <div className="stats-section mb-3">
            <div className="section-header">
              <span className="section-title">其他属性</span>
              <span className="section-line"></span>
            </div>
            <div className="stat-list">
              {Object.entries(stats.otherAttributes).map(([name, data]) => (
                <div 
                  key={name} 
                  className="stat-row"
                  onMouseEnter={(e) => handleMouseEnter(name, e)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <span className="stat-name">{name}</span>
                  <span className="stat-value text-[#94a3b8]">
                    {data.value}
                    {data.value >= 0 && data.value <= 100 ? '%' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 装备统计 */}
        <div className="stats-section">
          <div className="section-header">
            <span className="section-title">装备统计</span>
            <span className="section-line"></span>
          </div>
          <div className="equipment-summary">
            <div className="equip-bar">
              <div 
                className="equip-fill" 
                style={{ width: `${(stats.equippedCount / 12) * 100}%` }}
              ></div>
            </div>
            <div className="equip-info">
              <span className="equip-count">{stats.equippedCount}/12</span>
              <span className="equip-label">装备</span>
            </div>
            {stats.legendaryEffects > 0 && (
              <div className="legendary-count">
                <span className="legendary-star">★</span>
                <span className="legendary-value">{stats.legendaryEffects}</span>
                <span className="legendary-label">传奇特效</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 属性来源明细弹窗 */}
      {hoveredStat && stats.details && stats.details[hoveredStat as keyof typeof stats.details] &&
        createPortal(
          <div 
            className="source-tooltip"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-50%, -100%) translateY(-10px)'
            }}
          >
            <div className="tooltip-header">属性来源</div>
            <div className="tooltip-content">
              {stats.details[hoveredStat as keyof typeof stats.details]?.sources.map((source, index) => (
                <div key={index} className="source-item">
                  <span className="source-name">{source.name}</span>
                  <span className="source-value">
                    {source.value > 0 ? '+' : ''}
                    {source.value}
                    {source.type === 'base' ? '' : source.value >= 0 && source.value <= 100 ? '%' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default StatsPanel