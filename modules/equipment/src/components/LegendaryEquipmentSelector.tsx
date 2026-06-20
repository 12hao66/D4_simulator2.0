import { useState, useEffect } from 'react'
import { useEquipmentStore } from '../store/equipmentStore'
import { slotNames } from '../data/equipmentData'
import type { EquipmentSlot } from '../types/equipment'
import type { LegendaryPower, Affix } from '../types/database'
import { getDatabaseDataUrl } from '../config/appConfig'

interface LegendaryEquipmentSelectorProps {
  slot: EquipmentSlot
}

type TabType = 'power' | 'affix'

function LegendaryEquipmentSelector({ slot }: LegendaryEquipmentSelectorProps) {
  const { selectSlot, equipItem } = useEquipmentStore()
  
  const [activeTab, setActiveTab] = useState<TabType>('power')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // 数据状态
  const [legendaryPowers, setLegendaryPowers] = useState<LegendaryPower[]>([])
  const [affixes, setAffixes] = useState<Affix[]>([])
  
  // 已选择状态
  const [selectedPower, setSelectedPower] = useState<LegendaryPower | null>(null)
  const [selectedAffixes, setSelectedAffixes] = useState<Array<Affix & { customValue?: number }>>([])
  
  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        // 加载威能数据
        const powersRes = await fetch(getDatabaseDataUrl('legendary-powers.json'))
        if (powersRes.ok) {
          const powersData = await powersRes.json()
          setLegendaryPowers(powersData.legendaryPowers || powersData)
        }
        
        // 加载词缀数据
        const affixesRes = await fetch(getDatabaseDataUrl('affixes.json'))
        if (affixesRes.ok) {
          const affixesData = await affixesRes.json()
          setAffixes(affixesData.affixes || affixesData)
        }
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])
  
  // 筛选威能（根据装备槽）
  const filteredPowers = legendaryPowers.filter(power => {
    const matchesSlot = !power.applicableSlots || 
      power.applicableSlots.includes(slot) ||
      power.applicableSlots.includes(slot.replace(/\d+$/, ''))
    const matchesSearch = !searchKeyword || 
      power.name.toLowerCase().includes(searchKeyword.toLowerCase())
    return matchesSlot && matchesSearch
  })
  
  // 筛选词缀
  const filteredAffixes = affixes.filter(affix => {
    const slotLower = slot.toLowerCase()
    const matchesSlot = !affix.applicableSlots || 
      affix.applicableSlots.includes(slotLower) ||
      affix.applicableSlots.includes(slotLower.replace(/\d+$/, ''))
    const matchesSearch = !searchKeyword || 
      affix.name.toLowerCase().includes(searchKeyword.toLowerCase())
    return matchesSlot && matchesSearch
  })
  
  // 选择威能
  const handleSelectPower = (power: LegendaryPower) => {
    if (selectedPower?.id === power.id) {
      setSelectedPower(null)
    } else {
      setSelectedPower(power)
    }
  }
  
  // 选择词缀
  const handleSelectAffix = (affix: Affix) => {
    const exists = selectedAffixes.find(a => a.id === affix.id)
    if (exists) {
      setSelectedAffixes(selectedAffixes.filter(a => a.id !== affix.id))
    } else if (selectedAffixes.length < 8) {
      setSelectedAffixes([...selectedAffixes, { ...affix, customValue: affix.minValue }])
    }
  }
  
  // 更新词缀数值
  const handleAffixValueChange = (affixId: string, value: number) => {
    setSelectedAffixes(selectedAffixes.map(a => 
      a.id === affixId ? { ...a, customValue: value } : a
    ))
  }
  
  // 移除词缀
  const handleRemoveAffix = (affixId: string) => {
    setSelectedAffixes(selectedAffixes.filter(a => a.id !== affixId))
  }
  
  // 确认装备
  const handleConfirm = () => {
    const equipmentItem = {
      id: `legendary-${Date.now()}`,
      name: selectedPower?.name || '传奇装备',
      slot: slot,
      rarity: 'legendary' as const,
      level: 80,
      legendaryPower: selectedPower?.name,
      legendaryPowerDescription: selectedPower?.description,
      affixes: selectedAffixes.map(a => ({
        id: a.id,
        name: a.name,
        value: a.customValue || a.minValue,
        unit: a.unit,
        type: a.calculationType as 'additive' | 'multiplicative' | 'independent'
      })),
      icon: ''
    }
    equipItem(slot, equipmentItem)
    selectSlot(null)
  }
  
  // 取消
  const handleCancel = () => {
    selectSlot(null)
  }
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-d4-card rounded-lg border border-d4-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-d4-border bg-d4-dark">
          <div className="flex items-center gap-2">
            <h3 className="text-d4-gold font-bold">配置 传奇装备 - {slotNames[slot]}</h3>
            <span className="px-2 py-0.5 text-xs bg-orange-600 text-white rounded-full">LEGENDARY</span>
          </div>
          <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors text-xl">×</button>
        </div>
        
        {/* 主内容区 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧选择区 */}
          <div className="flex-1 border-r border-d4-border flex flex-col">
            {/* Tab 切换 */}
            <div className="flex border-b border-d4-border">
              <button
                onClick={() => setActiveTab('power')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'power'
                    ? 'text-orange-400 border-b-2 border-orange-400 bg-d4-dark/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                威能 ({filteredPowers.length})
              </button>
              <button
                onClick={() => setActiveTab('affix')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'affix'
                    ? 'text-orange-400 border-b-2 border-orange-400 bg-d4-dark/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                词缀 ({filteredAffixes.length})
              </button>
            </div>
            
            {/* 搜索框 */}
            <div className="px-4 py-2 border-b border-d4-border">
              <input
                type="text"
                placeholder="搜索..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full bg-d4-dark border border-d4-border rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
              />
            </div>
            
            {/* 选项列表 */}
            <div className="flex-1 overflow-y-auto p-2">
              {isLoading ? (
                <div className="text-center text-gray-400 py-8">加载中...</div>
              ) : activeTab === 'power' ? (
                <div className="space-y-2">
                  {filteredPowers.map(power => (
                    <div
                      key={power.id}
                      onClick={() => handleSelectPower(power)}
                      className={`p-3 rounded border cursor-pointer transition-colors ${
                        selectedPower?.id === power.id
                          ? 'bg-orange-900/30 border-orange-400'
                          : 'bg-d4-dark border-d4-border hover:border-orange-400/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedPower?.id === power.id ? 'bg-orange-400 border-orange-400' : 'border-gray-500'
                        }`}>
                          {selectedPower?.id === power.id && (
                            <span className="text-xs text-black">✓</span>
                          )}
                        </span>
                        <span className="text-orange-400 font-bold">{power.name}</span>
                        <span className="text-xs text-gray-400">{power.type}</span>
                      </div>
                      <div className="text-xs text-gray-400 ml-6 line-clamp-2">
                        {power.description?.substring(0, 80)}...
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAffixes.map(affix => {
                    const isSelected = selectedAffixes.find(a => a.id === affix.id)
                    const canAdd = !isSelected && selectedAffixes.length < 8
                    return (
                      <div
                        key={affix.id}
                        onClick={() => canAdd && handleSelectAffix(affix)}
                        className={`p-3 rounded border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-green-900/30 border-green-400'
                            : canAdd
                              ? 'bg-d4-dark border-d4-border hover:border-green-400/50'
                              : 'bg-d4-dark/50 border-d4-border/50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-green-400 border-green-400' : 'border-gray-500'
                          }`}>
                            {isSelected && (
                              <span className="text-xs text-black">✓</span>
                            )}
                          </span>
                          <span className="text-white">
                            {affix.calculationType === 'additive' ? '+' : '×'}{affix.minValue}{affix.unit} {affix.name}
                          </span>
                          {selectedAffixes.length >= 8 && !isSelected && (
                            <span className="text-xs text-red-400 ml-2">已达上限</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* 右侧已选区 */}
          <div className="w-80 bg-d4-dark/50 flex flex-col">
            <div className="p-4 border-b border-d4-border">
              <h4 className="text-orange-400 font-bold mb-2">已选威能</h4>
              {selectedPower ? (
                <div className="p-3 bg-d4-dark rounded border border-orange-400/50">
                  <div className="text-orange-400 font-bold">{selectedPower.name}</div>
                  <div className="text-xs text-gray-400 mt-1 line-clamp-2">{selectedPower.description}</div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 p-3 bg-d4-dark rounded border border-d4-border border-dashed">
                  请选择威能（可选）
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-d4-border">
                <h4 className="text-orange-400 font-bold mb-2">
                  已选词缀 <span className="text-gray-400 font-normal">({selectedAffixes.length}/8)</span>
                </h4>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedAffixes.length === 0 ? (
                  <div className="text-sm text-gray-500 p-3 bg-d4-dark rounded border border-d4-border border-dashed text-center">
                    请选择词缀（4-8条）
                  </div>
                ) : (
                  selectedAffixes.map((affix, _index) => (
                    <div key={affix.id} className="p-3 bg-d4-dark rounded border border-d4-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">{affix.name}</span>
                        <button
                          onClick={() => handleRemoveAffix(affix.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={Math.floor(affix.minValue * 0.5)}
                          max={Math.floor(affix.minValue * 1.5)}
                          value={affix.customValue || affix.minValue}
                          onChange={(e) => handleAffixValueChange(affix.id, Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-green-400 font-bold w-16 text-right">
                          {affix.calculationType === 'additive' ? '+' : '×'}{affix.customValue || affix.minValue}{affix.unit}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-d4-border bg-d4-dark">
          <div className="text-sm text-gray-400">
            {selectedAffixes.length < 4 && (
              <span className="text-red-400">还需选择 {4 - selectedAffixes.length} 条词缀</span>
            )}
            {selectedAffixes.length >= 4 && selectedAffixes.length <= 8 && (
              <span className="text-green-400">词缀数量符合要求</span>
            )}
            {selectedAffixes.length > 8 && (
              <span className="text-red-400">词缀数量超出限制</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedAffixes.length < 4 || selectedAffixes.length > 8}
              className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
                selectedAffixes.length >= 4 && selectedAffixes.length <= 8
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              确认装备
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegendaryEquipmentSelector