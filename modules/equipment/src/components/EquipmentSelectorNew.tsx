import { useState, useEffect } from 'react'
import { useEquipmentStore } from '../store/equipmentStore'
import { slotNames, slotIcons } from '../data/equipmentData'
import type { EquipmentSlot } from '../types/equipment'
import type { LegendaryPower, UniqueEquipment, Affix } from '../types/database'
import { getDatabaseDataUrl, getDatabaseImageUrl } from '../config/appConfig'
import { filterAffixesByClass } from '../services/databaseService'

type RarityType = 'rare' | 'legendary' | 'unique'
type AffixPosition = 'additive' | 'multiplicative' | 'independent'

interface ConfiguredAffix {
  id: string
  name: string
  value: number
  unit: string
  calculationType: 'additive' | 'multiplicative' | 'independent'
  isCustom?: boolean
}

type ModalType = 'power' | 'affix' | 'unique' | 'custom' | 'gem' | 'rune' | null

interface Gem {
  id: string
  name: string
  type: string
  icon?: string
  weaponEffect?: string
  armorEffect?: string
  jewelryEffect?: string
  requiredLevel?: number
}

interface Rune {
  id: string
  name: string
  nameEn?: string
  type?: string
  category?: string
  effect?: string
  effects?: string[]
  icon?: string
}

interface EquipmentSelectorProps {
  slot: EquipmentSlot
}

const slotToChinese: Record<string, string> = {
  helmet: '头盔', chest: '胸甲', gloves: '手套', pants: '裤子', boots: '靴子',
  amulet: '护符', ring: '戒指', ring1: '戒指', ring2: '戒指',
  weapon: '武器', weapon1: '武器', weapon2: '武器', weapon3: '武器', weapon4: '武器',
  mainhand: '单手武器', offhand: '副手', shield: '盾牌'
}

// 威能类型标签
const powerTypes = [
  { key: 'defense', label: '防御' },
  { key: 'offense', label: '攻击' },
  { key: 'utility', label: '机动' },
  { key: 'resource', label: '资源' },
  { key: 'mobility', label: '通用' },
  { key: 'weapon', label: '武器' },
]

// 判断插槽类型的函数
const getSlotGemType = (slot: string): 'weapon' | 'armor' | 'jewelry' => {
  const weaponSlots = ['weapon', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'mainhand', 'offhand']
  const armorSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'shield']
  
  if (weaponSlots.includes(slot)) return 'weapon'
  if (armorSlots.includes(slot)) return 'armor'
  return 'jewelry'
}

function EquipmentSelectorNew({ slot }: EquipmentSelectorProps) {
  const { selectSlot, equipItem, equipment, character } = useEquipmentStore()
  
  // 当前显示的弹窗类型
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [pendingAffixSelections, setPendingAffixSelections] = useState<Affix[]>([]) // 待确认的词缀选择
  
  // 品质类型
  const [rarityType, setRarityType] = useState<RarityType>('legendary')
  
  // 物品属性
  const [itemPower, setItemPower] = useState(900)
  
  // 数据状态
  const [legendaryPowers, setLegendaryPowers] = useState<LegendaryPower[]>([])
  const [uniqueEquipment, setUniqueEquipment] = useState<UniqueEquipment[]>([])
  const [affixes, setAffixes] = useState<Affix[]>([])
  const [gems, setGems] = useState<Gem[]>([])
  const [runes, setRunes] = useState<Rune[]>([])
  
  // 已选择状态
  const [selectedUnique, setSelectedUnique] = useState<UniqueEquipment | null>(null)
  const [selectedPower, setSelectedPower] = useState<LegendaryPower | null>(null)
  const [selectedAffixes, setSelectedAffixes] = useState<ConfiguredAffix[]>([])
  const [customAffixes, setCustomAffixes] = useState<ConfiguredAffix[]>([])
  const [selectedGems, setSelectedGems] = useState<(Gem | null)[]>([null, null])
  const [selectedRunes, setSelectedRunes] = useState<(Rune | null)[]>([null, null])
  
  // 搜索关键词
  const [powerSearch, setPowerSearch] = useState('')
  const [uniqueSearch, setUniqueSearch] = useState('')
  const [affixSearch, setAffixSearch] = useState('')
  
  // 筛选条件
  const [selectedPowerType, setSelectedPowerType] = useState('')
  
  // 自定义词缀输入
  const [customPrefix, setCustomPrefix] = useState<AffixPosition>('additive')
  const [customName, setCustomName] = useState('')
  const [customValue, setCustomValue] = useState('')
  const [customUnit, setCustomUnit] = useState('')
  
  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [powersRes, uniqueRes, affixesRes, gemsRes, runesRes] = await Promise.all([
          fetch(getDatabaseDataUrl('legendary-powers.json')),
          fetch(getDatabaseDataUrl('uniqueEquipment.json')),
          fetch(getDatabaseDataUrl('affixes.json')),
          fetch(getDatabaseDataUrl('gems.json')),
          fetch(getDatabaseDataUrl('runes.json'))
        ])
        
        if (powersRes.ok) {
          const data = await powersRes.json()
          setLegendaryPowers(Array.isArray(data) ? data : (data.legendaryPowers || []))
        }
        if (uniqueRes.ok) {
          const data = await uniqueRes.json()
          setUniqueEquipment(Array.isArray(data) ? data : (data.uniqueEquipment || []))
        }
        if (affixesRes.ok) {
          const data = await affixesRes.json()
          const jsonAffixes = Array.isArray(data) ? data : (data.affixes || [])
          
          // 加载数据库模块保存的自定义词缀
          try {
            const customData = localStorage.getItem('d4-custom-data')
            if (customData) {
              const parsed = JSON.parse(customData)
              const customAffixes = parsed.customAffixes || []
              // 合并自定义词缀（避免重复）
              const mergedAffixes = [...jsonAffixes]
              for (const custom of customAffixes) {
                if (!mergedAffixes.find(a => a.id === custom.id)) {
                  mergedAffixes.push(custom)
                }
              }
              setAffixes(mergedAffixes)
            } else {
              setAffixes(jsonAffixes)
            }
          } catch (e) {
            console.error('Failed to load custom affixes:', e)
            setAffixes(jsonAffixes)
          }
        }
        if (gemsRes.ok) {
          const data = await gemsRes.json()
          setGems(Array.isArray(data) ? data : [])
        }
        if (runesRes.ok) {
          const data = await runesRes.json()
          setRunes(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('加载数据失败:', error)
      }
    }
    loadData()
  }, [])
  
  // 加载已有装备数据
  useEffect(() => {
    const existingItem = equipment[slot]
    if (existingItem) {
      if (existingItem.rarity === 'unique') {
        setRarityType('unique')
        const unique = uniqueEquipment.find(u => u.id === existingItem.id)
        if (unique) {
          setSelectedUnique(unique)
        }
      } else if (existingItem.rarity === 'legendary') {
        setRarityType('legendary')
      } else {
        setRarityType('rare')
      }
      
      // 加载威能
      if (existingItem.legendaryPower) {
        const power = legendaryPowers.find(p => p.name === existingItem.legendaryPower)
        if (power) {
          setSelectedPower(power)
        }
      }
      
      // 加载词缀
      if (existingItem.affixes && existingItem.affixes.length > 0) {
        setSelectedAffixes(existingItem.affixes.map(a => ({
          id: a.id,
          name: a.name,
          value: a.value,
          unit: a.unit || '',
          calculationType: (a.calculationType || a.type || 'additive') as 'additive' | 'multiplicative' | 'independent'
        })))
      }
      
      // 加载宝石
      if (existingItem.gems && existingItem.gems.length > 0) {
        const newGems: (Gem | null)[] = [null, null]
        existingItem.gems.forEach((gem: Gem, index: number) => {
          if (index < 2) newGems[index] = gem
        })
        setSelectedGems(newGems)
      }
      
      // 加载符文
      if (existingItem.runes && existingItem.runes.length > 0) {
        const newRunes: (Rune | null)[] = [null, null]
        existingItem.runes.forEach((rune: Rune, index: number) => {
          if (index < 2) newRunes[index] = rune
        })
        setSelectedRunes(newRunes)
      }
    }
  }, [equipment[slot], uniqueEquipment, legendaryPowers])
  
  // 切换品质类型时清空选择
  const handleRarityChange = (type: RarityType) => {
    setRarityType(type)
    setSelectedUnique(null)
    setSelectedPower(null)
    setSelectedAffixes([])
    setCustomAffixes([])
    setSelectedGems([null, null])
    setSelectedRunes([null, null])
  }
  
  // 选择暗金装备
  const handleSelectUnique = (item: UniqueEquipment) => {
    setSelectedUnique(item)
    // 自动填充默认词缀，从词缀数据库中查找calculationType
    setSelectedAffixes(item.affixes.map(a => {
      const matchedAffix = affixes.find(aff => aff.name === a.name)
      return {
        id: a.id,
        name: a.name,
        value: a.value,
        unit: a.unit || '',
        calculationType: matchedAffix?.calculationType || 'additive'
      }
    }))
    setActiveModal(null)
  }
  
  // 选择威能
  const handleSelectPower = (power: LegendaryPower) => {
    setSelectedPower(power)
    setActiveModal(null)
  }
  
  // 添加词缀（保留但未使用）
  // const handleAddAffix = (affix: Affix) => {
  //   if (selectedAffixes.length >= 8) return
  //   if (selectedAffixes.find(a => a.name === affix.name)) return
  //   
  //   setSelectedAffixes([...selectedAffixes, {
  //     id: `affix-${Date.now()}-${Math.random()}`,
  //     name: affix.name,
  //     value: affix.minValue,
  //     unit: affix.unit || '',
  //     position: 'additive'
  //   }])
  //   setActiveModal(null)
  // }
  
  // 移除词缀
  const handleRemoveAffix = (affixId: string) => {
    setSelectedAffixes(selectedAffixes.filter(a => a.id !== affixId))
  }
  
  // 修改词缀
  const handleUpdateAffix = (affixId: string, field: 'name' | 'value' | 'unit' | 'calculationType', newValue: string | number) => {
    setSelectedAffixes(selectedAffixes.map(a => 
      a.id === affixId ? { ...a, [field]: newValue } : a
    ))
  }
  
  // 添加自定义词缀
  const handleAddCustomAffix = () => {
    if (!customName || !customValue) return
    if (customAffixes.length >= 2) return
    
    setCustomAffixes([...customAffixes, {
      id: `custom-${Date.now()}`,
      name: customName,
      value: Number(customValue),
      unit: customUnit,
      calculationType: customPrefix,
      isCustom: true
    }])
    
    setCustomName('')
    setCustomValue('')
    setActiveModal(null)
  }
  
  // 移除自定义词缀
  const handleRemoveCustomAffix = (affixId: string) => {
    setCustomAffixes(customAffixes.filter(a => a.id !== affixId))
  }
  
  // 修改自定义词缀
  const handleUpdateCustomAffix = (affixId: string, field: 'name' | 'value' | 'unit' | 'calculationType', newValue: string | number) => {
    setCustomAffixes(customAffixes.map(a => {
      if (a.id !== affixId) return a
      
      return { ...a, [field]: newValue }
    }))
  }
  
  // 选择宝石
  const handleSelectGem = (gem: Gem, slotIndex: number) => {
    const newGems = [...selectedGems]
    newGems[slotIndex] = gem
    setSelectedGems(newGems)
    setActiveModal(null)
  }
  
  // 移除宝石
  const handleRemoveGem = (slotIndex: number) => {
    const newGems = [...selectedGems]
    newGems[slotIndex] = null
    setSelectedGems(newGems)
  }
  
  // 选择符文
  const handleSelectRune = (rune: Rune, slotIndex: number) => {
    const newRunes = [...selectedRunes]
    newRunes[slotIndex] = rune
    setSelectedRunes(newRunes)
    setActiveModal(null)
  }
  
  // 移除符文
  const handleRemoveRune = (slotIndex: number) => {
    const newRunes = [...selectedRunes]
    newRunes[slotIndex] = null
    setSelectedRunes(newRunes)
  }
  
  // 计算当前品质
  const getCurrentRarity = (): string => {
    if (rarityType === 'unique') return 'unique'
    if (rarityType === 'legendary') return 'legendary'
    if (selectedAffixes.length >= 3) return 'rare'
    if (selectedAffixes.length >= 1) return 'magic'
    return 'common'
  }
  
  // 格式化词缀显示
  const formatAffix = (affix: ConfiguredAffix): string => {
    const calcType = affix.calculationType || 'additive'
    
    // 独立乘区：不显示前缀符号，显示 [x] 后缀
    if (calcType === 'independent') {
      return `${affix.value}${affix.unit}[x] ${affix.name}`
    }
    
    // 加法：显示 + 前缀
    // 乘法：显示 × 前缀
    const symbol = calcType === 'additive' ? '+' : '×'
    return `${symbol}${affix.value}${affix.unit} ${affix.name}`
  }
  
  // 确认装备
  const handleConfirm = () => {
    const currentRarity = getCurrentRarity()
    const allAffixes = [...selectedAffixes, ...customAffixes]
    
    // 调试日志：检查词缀数据传递
    console.log('确认装备 - allAffixes:', JSON.stringify(allAffixes, null, 2))
    
    let equipmentItem: any = {
      id: selectedUnique?.id || `custom-${Date.now()}`,
      name: selectedUnique?.name || selectedPower?.name || '装备',
      slot: slot,
      rarity: currentRarity,
      level: selectedUnique?.level || 80,
      itemPower: itemPower,
      affixes: allAffixes.map(a => ({
        id: a.id,
        name: a.name,
        value: a.value,
        unit: a.unit,
        type: a.calculationType || 'additive',
        calculationType: a.calculationType || 'additive'
      })),
      gems: selectedGems.filter(g => g !== null),
      runes: selectedRunes.filter(r => r !== null),
      icon: selectedUnique?.icon || slotIcons[slot] || ''
    }
    
    console.log('确认装备 - equipmentItem.affixes:', JSON.stringify(equipmentItem.affixes, null, 2))
    
    if (rarityType === 'unique' && selectedUnique) {
      equipmentItem.rarity = 'unique'
      equipmentItem.itemType = selectedUnique.itemType
      equipmentItem.uniqueEffect = selectedUnique.uniqueEffects.map(e => e.description).join('\n')
    }
    
    if ((rarityType === 'legendary' || rarityType === 'unique') && selectedPower) {
      equipmentItem.legendaryPower = selectedPower.name
      equipmentItem.legendaryPowerDescription = selectedPower.description
    }
    
    equipItem(slot, equipmentItem)
    selectSlot(null)
  }
  
  // 移除当前物品
  const handleRemoveItem = () => {
    equipItem(slot, null)
    selectSlot(null)
  }
  
  // 筛选威能
  const filteredPowers = legendaryPowers.filter(power => {
    const matchesSearch = !powerSearch || power.name.toLowerCase().includes(powerSearch.toLowerCase())
    const matchesType = !selectedPowerType || power.powerType === selectedPowerType
    return matchesSearch && matchesType
  })
  
  // 筛选暗金装备
  const filteredUnique = uniqueEquipment.filter(item => {
    const itemSlot = item.slot.toLowerCase()
    const slotLower = slot.toLowerCase()
    let matchesSlot = itemSlot === slotLower
    if (!matchesSlot && (slotLower === 'ring1' || slotLower === 'ring2')) {
      matchesSlot = itemSlot === 'ring'
    }
    if (!matchesSlot && slotLower.startsWith('weapon')) {
      matchesSlot = itemSlot === 'weapon' || itemSlot === 'mainhand' || itemSlot === 'offhand'
    }
    const matchesSearch = !uniqueSearch || item.name.toLowerCase().includes(uniqueSearch.toLowerCase())
    return matchesSlot && matchesSearch
  })
  
  // 筛选词缀（按职业过滤）
  const filteredAffixes = filterAffixesByClass(affixes, character.class).filter(affix => {
    const matchesSearch = !affixSearch || affix.name.toLowerCase().includes(affixSearch.toLowerCase())
    return matchesSearch
  })
  
  // const _currentRarity = getCurrentRarity()
  
  return (
    <>
      {/* 主选择器界面 */}
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <button onClick={() => selectSlot(null)} className="text-gray-400 hover:text-white transition-colors">×</button>
              <h3 className="text-yellow-500 font-bold">选择装备: {slotNames[slot]}</h3>
            </div>
          </div>
          
          {/* 内容区 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* 装备类型 */}
              <div className="flex items-center justify-between py-2 border-b border-[#333]">
                <span className="text-gray-400">装备类型</span>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="text-white">{slotToChinese[slot] || slotNames[slot]}</span>
                </div>
              </div>
              
              {/* 物品强度 */}
              <div className="py-2 border-b border-[#333]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">物品强度</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setItemPower(Math.max(1, itemPower - 1))}
                    className="w-8 h-8 bg-[#2a2a2a] border border-[#444] rounded hover:bg-[#3a3a3a]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={itemPower}
                    onChange={(e) => setItemPower(Number(e.target.value))}
                    className="flex-1 bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-center text-white focus:outline-none focus:border-yellow-500"
                  />
                  <button
                    onClick={() => setItemPower(itemPower + 1)}
                    className="w-8 h-8 bg-[#2a2a2a] border border-[#444] rounded hover:bg-[#3a3a3a]"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* 稀有度 */}
              <div className="py-2 border-b border-[#333]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">稀有度</span>
                </div>
                <div className="flex gap-4">
                  {[
                    { key: 'rare' as const, label: '稀有' },
                    { key: 'legendary' as const, label: '传奇' },
                    { key: 'unique' as const, label: '暗金' }
                  ].map(rarity => (
                    <label key={rarity.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rarity"
                        checked={rarityType === rarity.key}
                        onChange={() => handleRarityChange(rarity.key)}
                        className="w-4 h-4"
                      />
                      <span className={`text-sm ${rarity.key === 'legendary' ? 'text-orange-400' : rarity.key === 'unique' ? 'text-yellow-500' : 'text-gray-300'}`}>
                        {rarity.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 暗金装备（暗金模式） */}
              {rarityType === 'unique' && (
                <div className="py-2 border-b border-[#333]">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">暗金装备</span>
                    <button
                      onClick={() => setActiveModal('unique')}
                      className="text-yellow-500 text-sm hover:text-yellow-400"
                    >
                      + 选择
                    </button>
                  </div>
                  {selectedUnique ? (
                    <div className="mt-2 p-2 bg-[#2a2a2a] rounded border border-[#444]">
                      <div className="text-yellow-500 font-bold text-sm">{selectedUnique.name}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 mt-1">未选择</div>
                  )}
                </div>
              )}
              
              {/* 传奇威能（传奇和暗金模式） */}
              {(rarityType === 'legendary' || rarityType === 'unique') && (
                <div className="py-2 border-b border-[#333]">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">传奇威能</span>
                    <button
                      onClick={() => setActiveModal('power')}
                      className="text-yellow-500 text-sm hover:text-yellow-400"
                    >
                      + 选择
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {selectedPower ? selectedPower.name : '未选择'}
                  </div>
                </div>
              )}
              
              {/* 词缀 */}
              <div className="py-2 border-b border-[#333]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">词缀 ({selectedAffixes.length}/8)</span>
                  <button
                    onClick={() => {
                      setPendingAffixSelections([])
                      setActiveModal('affix')
                    }}
                    className="text-yellow-500 text-sm hover:text-yellow-400"
                  >
                    + 选择
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {selectedAffixes.length === 0 ? (
                    <span className="text-sm text-gray-500">未选择</span>
                  ) : (
                    selectedAffixes.map((affix, _index) => (
                      <div key={affix.id} className="p-2 bg-[#2a2a2a] rounded border border-[#444]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-green-400 text-sm">{formatAffix(affix)}</span>
                          <button onClick={() => handleRemoveAffix(affix.id)} className="text-red-400 hover:text-red-300 text-xs">移除</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={affix.calculationType || 'additive'}
                            onChange={(e) => {
                              handleUpdateAffix(affix.id, 'calculationType', e.target.value as 'additive' | 'multiplicative' | 'independent')
                            }}
                            className="bg-[#333] border border-[#444] rounded px-1 py-0.5 text-xs text-white focus:outline-none"
                          >
                            <option value="additive">+ 加法</option>
                            <option value="multiplicative">× 乘法</option>
                            <option value="independent">[x] 独立</option>
                          </select>
                          <input
                            type="number"
                            value={affix.value}
                            onChange={(e) => handleUpdateAffix(affix.id, 'value', Number(e.target.value))}
                            className="w-16 bg-[#333] border border-[#444] rounded px-2 py-0.5 text-sm text-green-400 text-center focus:outline-none"
                          />
                          <select
                            value={affix.unit}
                            onChange={(e) => handleUpdateAffix(affix.id, 'unit', e.target.value)}
                            className="bg-[#333] border border-[#444] rounded px-1 py-0.5 text-xs text-white focus:outline-none"
                          >
                            <option value="%">%</option>
                            <option value="">点</option>
                          </select>
                          <input
                            type="text"
                            value={affix.name}
                            onChange={(e) => handleUpdateAffix(affix.id, 'name', e.target.value)}
                            className="flex-1 bg-[#333] border border-[#444] rounded px-2 py-0.5 text-sm text-white focus:outline-none"
                            placeholder="词缀名"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* 自定义词缀（嬗变+回火） */}
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">自定义词缀 ({customAffixes.length}/2)</span>
                  <button
                    onClick={() => setActiveModal('custom')}
                    className="text-yellow-500 text-sm hover:text-yellow-400"
                  >
                    + 添加
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {customAffixes.length === 0 ? (
                    <span className="text-sm text-gray-500">未添加</span>
                  ) : (
                    customAffixes.map((affix) => (
                      <div key={affix.id} className="p-2 bg-[#2a2a2a] rounded border border-purple-500/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-purple-400 text-sm">{formatAffix(affix)}</span>
                          <button onClick={() => handleRemoveCustomAffix(affix.id)} className="text-red-400 hover:text-red-300 text-xs">移除</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={affix.calculationType}
                            onChange={(e) => handleUpdateCustomAffix(affix.id, 'calculationType', e.target.value)}
                            className="bg-[#333] border border-[#444] rounded px-1 py-0.5 text-xs text-white focus:outline-none"
                          >
                            <option value="additive">+</option>
                            <option value="multiplicative">×</option>
                            <option value="independent">[x]</option>
                          </select>
                          <input
                            type="number"
                            value={affix.value}
                            onChange={(e) => handleUpdateCustomAffix(affix.id, 'value', Number(e.target.value))}
                            className="w-16 bg-[#333] border border-[#444] rounded px-2 py-0.5 text-sm text-purple-400 text-center focus:outline-none"
                          />
                          <select
                            value={affix.unit}
                            onChange={(e) => handleUpdateCustomAffix(affix.id, 'unit', e.target.value)}
                            className="bg-[#333] border border-[#444] rounded px-1 py-0.5 text-xs text-white focus:outline-none"
                          >
                            <option value="%">%</option>
                            <option value="">点</option>
                          </select>
                          <input
                            type="text"
                            value={affix.name}
                            onChange={(e) => handleUpdateCustomAffix(affix.id, 'name', e.target.value)}
                            className="flex-1 bg-[#333] border border-[#444] rounded px-2 py-0.5 text-sm text-white focus:outline-none"
                            placeholder="词缀名"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* 插槽 */}
              <div className="py-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">插槽 ({selectedGems.filter(g => g !== null).length + selectedRunes.filter(r => r !== null).length}/2)</span>
                </div>
                <div className="flex gap-4">
                  {/* 宝石插槽 */}
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">宝石</div>
                    <div className="flex gap-2">
                      {selectedGems.map((gem, index) => (
                        <div key={index} className="flex-1">
                          {gem ? (
                            <div className="p-2 bg-[#2a2a2a] rounded border border-red-500/50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-red-400 text-sm font-bold">{gem.name}</span>
                                <button onClick={() => handleRemoveGem(index)} className="text-red-400 hover:text-red-300 text-xs">×</button>
                              </div>
                              <div className="text-xs text-green-400">
                                {getSlotGemType(slot) === 'weapon' 
                                  ? gem.weaponEffect 
                                  : getSlotGemType(slot) === 'armor' 
                                    ? gem.armorEffect 
                                    : gem.jewelryEffect}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setActiveModal('gem')}
                              className="w-full p-2 bg-[#2a2a2a] rounded border border-[#444] text-gray-500 text-sm hover:border-red-500/50 hover:text-red-400"
                            >
                              + 宝石
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 符文插槽 */}
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">符文</div>
                    <div className="flex gap-2">
                      {selectedRunes.map((rune, index) => (
                        <div key={index} className="flex-1">
                          {rune ? (
                            <div className="p-2 bg-[#2a2a2a] rounded border border-blue-500/50 flex items-center justify-between">
                              <span className="text-blue-400 text-sm">{rune.name}</span>
                              <button onClick={() => handleRemoveRune(index)} className="text-red-400 hover:text-red-300 text-xs">×</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setActiveModal('rune')}
                              className="w-full p-2 bg-[#2a2a2a] rounded border border-[#444] text-gray-500 text-sm hover:border-blue-500/50 hover:text-blue-400"
                            >
                              + 符文
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 底部按钮 */}
          <div className="flex gap-3 p-4 border-t border-[#333] bg-[#0d0d0d]">
            <button
              onClick={handleConfirm}
              className="flex-1 py-2 bg-yellow-600 text-black font-bold rounded hover:bg-yellow-500 transition-colors"
            >
              确定
            </button>
            <button
              onClick={handleRemoveItem}
              className="flex-1 py-2 bg-[#2a2a2a] border border-[#444] text-gray-300 rounded hover:bg-[#3a3a3a] transition-colors"
            >
              移除当前物品
            </button>
          </div>
        </div>
      </div>
      
      {/* 威能选择弹窗 */}
      {activeModal === 'power' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
              <h3 className="text-yellow-500 font-bold">选择传奇威能</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">× 关闭</button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="搜索威能..."
                  value={powerSearch}
                  onChange={(e) => setPowerSearch(e.target.value)}
                  className="flex-1 bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-[#2a2a2a] border border-[#444] rounded text-gray-300 hover:bg-[#3a3a3a]">
                  筛选
                </button>
              </div>
              {/* 威能类型标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {powerTypes.map(type => (
                  <button
                    key={type.key}
                    onClick={() => setSelectedPowerType(selectedPowerType === type.key ? '' : type.key)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedPowerType === type.key
                        ? 'bg-yellow-600 text-black'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {/* 威能网格 */}
              <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[60vh]">
                {filteredPowers.map(power => (
                  <div
                    key={power.id}
                    onClick={() => handleSelectPower(power)}
                    className="p-3 bg-[#2a2a2a] border border-[#444] rounded cursor-pointer hover:border-yellow-500 hover:bg-yellow-500/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center">
                        <span className="text-orange-400 text-lg">✦</span>
                      </div>
                      <span className="text-orange-400 font-bold text-sm">{power.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-2">{power.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 暗金装备选择弹窗 */}
      {activeModal === 'unique' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
              <h3 className="text-yellow-500 font-bold">选择暗金装备</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">× 关闭</button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="搜索暗金装备..."
                value={uniqueSearch}
                onChange={(e) => setUniqueSearch(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none mb-4"
              />
              <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[60vh]">
                {filteredUnique.map(item => {
                  const isMythic = item.itemType === 'mythic'
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectUnique(item)}
                      className={`p-3 bg-[#2a2a2a] border rounded cursor-pointer transition-colors ${
                        isMythic 
                          ? 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10' 
                          : 'border-[#444] hover:border-yellow-500 hover:bg-yellow-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${
                          isMythic ? 'bg-purple-500/20' : 'bg-yellow-500/20'
                        }`}>
                          {item.icon ? (
                            <img 
                              src={getDatabaseImageUrl(item.icon)} 
                              alt="" 
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                target.parentElement!.innerHTML = `<span class="text-yellow-400">★</span>`
                              }}
                            />
                          ) : (
                            <span className="text-yellow-400">★</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-bold text-sm ${isMythic ? 'text-purple-400' : 'text-yellow-500'}`}>
                            {item.name}
                          </span>
                          <div className="text-xs text-gray-500 truncate">
                            {item.affixes.slice(0, 1).map(a => `+${a.value}${a.unit || ''} ${a.name}`).join('')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 词缀选择弹窗 */}
      {activeModal === 'affix' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
              <h3 className="text-yellow-500 font-bold">选择词缀（已选 {pendingAffixSelections.length} 个）</h3>
              <button onClick={() => {
                setPendingAffixSelections([])
                setActiveModal(null)
              }} className="text-gray-400 hover:text-white">× 关闭</button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="搜索词缀..."
                value={affixSearch}
                onChange={(e) => setAffixSearch(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none mb-4"
              />
              {/* 词缀列表 */}
              <div className="space-y-1 overflow-y-auto max-h-[50vh]">
                {filteredAffixes.map(affix => {
                  const isSelected = pendingAffixSelections.some(a => a.name === affix.name) || selectedAffixes.some(a => a.name === affix.name)
                  const isAlreadyAdded = selectedAffixes.some(a => a.name === affix.name)
                  return (
                    <div
                      key={affix.id}
                      onClick={() => {
                        if (isAlreadyAdded) return
                        if (isSelected) {
                          setPendingAffixSelections(pendingAffixSelections.filter(a => a.name !== affix.name))
                        } else {
                          setPendingAffixSelections([...pendingAffixSelections, affix])
                        }
                      }}
                      className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                        isAlreadyAdded
                          ? 'bg-gray-700/50 border border-gray-600 opacity-50'
                          : isSelected
                            ? 'bg-green-500/20 border border-green-500'
                            : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-green-500"
                          readOnly
                        />
                        <span className="text-green-400">{affix.calculationType === 'additive' ? '+' : '×'}{affix.maxValue}{affix.unit}</span>
                        <span className="text-white">{affix.name}</span>
                      </div>
                      {isAlreadyAdded && <span className="text-gray-500 text-xs">已添加</span>}
                      {isSelected && !isAlreadyAdded && <span className="text-green-400">待添加</span>}
                    </div>
                  )
                })}
              </div>
              {/* 底部按钮 */}
              <div className="flex gap-3 mt-4 pt-4 border-t border-[#333]">
                <button
                  onClick={() => {
                    // 批量添加选中的词缀
                    const availableSlots = 8 - selectedAffixes.length
                    const toAdd = pendingAffixSelections.slice(0, availableSlots).filter(
                      affix => !selectedAffixes.some(a => a.name === affix.name)
                    )
                    const newAffixes = toAdd.map(affix => ({
                      id: `affix-${Date.now()}-${Math.random()}`,
                      name: affix.name,
                      value: affix.minValue,
                      unit: affix.unit || '',
                      calculationType: affix.calculationType as 'additive' | 'multiplicative' | 'independent'
                    }))
                    setSelectedAffixes([...selectedAffixes, ...newAffixes])
                    setPendingAffixSelections([])
                    setActiveModal(null)
                  }}
                  disabled={pendingAffixSelections.length === 0}
                  className={`flex-1 py-2 rounded font-bold transition-colors ${
                    pendingAffixSelections.length > 0
                      ? 'bg-green-600 text-black hover:bg-green-500'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  确认添加 ({pendingAffixSelections.length})
                </button>
                <button
                  onClick={() => {
                    setPendingAffixSelections([])
                    setActiveModal(null)
                  }}
                  className="flex-1 py-2 bg-[#2a2a2a] border border-[#444] text-gray-300 rounded hover:bg-[#3a3a3a] transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 自定义词缀弹窗 */}
      {activeModal === 'custom' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
              <h3 className="text-purple-400 font-bold">添加自定义词缀</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">× 关闭</button>
            </div>
            <div className="p-4 space-y-4">
              {/* 符号类型 */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">符号类型:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="customPosition"
                      checked={customPrefix === 'additive'}
                      onChange={() => setCustomPrefix('additive')}
                      className="w-4 h-4"
                    />
                    <span className="text-white">+</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="customPosition"
                      checked={customPrefix === 'multiplicative'}
                      onChange={() => setCustomPrefix('multiplicative')}
                      className="w-4 h-4"
                    />
                    <span className="text-white">× 乘法</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="customPosition"
                      checked={customPrefix === 'independent'}
                      onChange={() => setCustomPrefix('independent')}
                      className="w-4 h-4"
                    />
                    <span className="text-white">[x] 独立</span>
                  </label>
                </div>
              </div>
              
              {/* 词缀名称 */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">词缀名称:</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="输入词缀名称"
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
              
              {/* 数值 */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">数值:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="输入数值"
                    className="flex-1 bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-green-400 focus:outline-none"
                  />
                  <select
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="%">%</option>
                    <option value="">点</option>
                  </select>
                </div>
              </div>
              
              {/* 预览 */}
              <div className="p-3 bg-[#2a2a2a] rounded border border-[#444]">
                <span className="text-xs text-gray-500">预览: </span>
                <span className="text-purple-400">
                  {customPrefix === 'additive' ? '+' : customPrefix === 'multiplicative' ? '×' : ''}{customValue || '0'}{customUnit}{customPrefix === 'independent' ? '[x]' : ''} {customName || '词缀名称'}
                </span>
              </div>
              
              {/* 添加按钮 */}
              <button
                onClick={handleAddCustomAffix}
                disabled={!customName || !customValue}
                className={`w-full py-2 rounded font-medium transition-colors ${
                  customName && customValue
                    ? 'bg-purple-600 text-white hover:bg-purple-500'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                添加词缀
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 宝石选择弹窗 */}
      {activeModal === 'gem' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
              <h3 className="text-red-400 font-bold">选择宝石</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">× 关闭</button>
            </div>
            <div className="p-4">
              {/* 当前装备类型提示 */}
              <div className="mb-3 text-xs text-gray-500">
                当前插槽：{slotToChinese[slot] || slot}（显示{getSlotGemType(slot) === 'weapon' ? '武器' : getSlotGemType(slot) === 'armor' ? '防具' : '首饰'}效果）
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {gems.map(gem => {
                  const gemEffect = getSlotGemType(slot) === 'weapon' 
                    ? gem.weaponEffect 
                    : getSlotGemType(slot) === 'armor' 
                      ? gem.armorEffect 
                      : gem.jewelryEffect
                  return (
                    <div
                      key={gem.id}
                      onClick={() => {
                        const emptySlot = selectedGems.findIndex(g => g === null)
                        if (emptySlot !== -1) {
                          handleSelectGem(gem, emptySlot)
                        }
                      }}
                      className="p-3 bg-[#2a2a2a] border border-[#444] rounded cursor-pointer hover:border-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {gem.icon && (
                            <img 
                              src={getDatabaseImageUrl(gem.icon)} 
                              alt="" 
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          )}
                          <span className="text-red-400 font-bold">{gem.name}</span>
                        </div>
                        {gem.requiredLevel && (
                          <span className="text-xs text-gray-500">需要等级 {gem.requiredLevel}</span>
                        )}
                      </div>
                      {gemEffect && (
                        <div className="text-xs text-green-400">{gemEffect}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 符文选择弹窗 */}
      {activeModal === 'rune' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#0d0d0d]">
              <h3 className="text-blue-400 font-bold">选择符文</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">× 关闭</button>
            </div>
            <div className="p-4">
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {runes.map(rune => {
                  const isInvocation = rune.category === 'Invocation'
                  const categoryLabel = isInvocation ? '祈告符文' : '仪祭符文'
                  const textColor = isInvocation ? 'text-purple-400' : 'text-yellow-500'
                  const borderColor = isInvocation ? 'border-purple-500/50' : 'border-yellow-600/50'
                  const hoverBorder = isInvocation ? 'hover:border-purple-500' : 'hover:border-yellow-500'
                  const bgHover = isInvocation ? 'hover:bg-purple-500/10' : 'hover:bg-yellow-500/10'
                  
                  return (
                    <div
                      key={rune.id}
                      onClick={() => {
                        const emptySlot = selectedRunes.findIndex(r => r === null)
                        if (emptySlot !== -1) {
                          handleSelectRune(rune, emptySlot)
                        }
                      }}
                      className={`p-3 bg-[#2a2a2a] border ${borderColor} rounded cursor-pointer ${hoverBorder} ${bgHover} transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {rune.icon && (
                            <img 
                              src={getDatabaseImageUrl(rune.icon)} 
                              alt="" 
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          )}
                          <span className={`${textColor} font-bold`}>{rune.name}</span>
                          {rune.nameEn && <span className="text-gray-500 text-xs">({rune.nameEn})</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded ${isInvocation ? 'bg-purple-500/20 text-purple-300' : 'bg-yellow-600/20 text-yellow-400'}`}>
                            {categoryLabel}
                          </span>
                        </div>
                      </div>
                      {rune.effects && rune.effects.length > 0 && (
                        <div className="text-xs text-green-400 ml-8">{rune.effects[0]}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EquipmentSelectorNew