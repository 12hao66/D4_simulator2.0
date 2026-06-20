import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { EquipmentState, Character, EquipmentStats, EquipmentItem, EquipmentSlot } from '../types/equipment'
import type { LegendaryPower, UniqueEquipment, Affix } from '../types/database'
import { loadAllDatabaseData } from '../services/databaseService'

const defaultCharacter: Character = {
  class: 'barbarian',
  level: 100
}

interface DatabaseState {
  legendaryPowers: LegendaryPower[]
  uniqueEquipment: UniqueEquipment[]
  affixes: Affix[]
  isDataLoaded: boolean
  loadData: () => Promise<void>
}

interface EquipmentConfig {
  selectedPower: LegendaryPower | null
  selectedAffixes: Affix[]
}

// Build方案数据结构
export interface Build {
  id: string
  name: string
  characterClass: Character['class']
  equipment: Record<EquipmentSlot, EquipmentItem | null>
  createdAt: number
}

export const useEquipmentStore = create<EquipmentState & DatabaseState & {
  equipmentConfig: Record<EquipmentSlot, EquipmentConfig>
  setEquipmentConfig: (slot: EquipmentSlot, config: EquipmentConfig) => void
  equipUniqueItem: (slot: EquipmentSlot, item: UniqueEquipment) => void
  // Build方案管理功能
  builds: Build[]
  currentBuildId: string | null
  loadBuild: (buildId: string) => void
  deleteBuild: (buildId: string) => void
  updateBuildName: (buildId: string, name: string) => void
  createEmptyBuild: () => void
  duplicateBuild: (buildId: string) => void
  exportBuild: (buildId: string) => string | null
  exportBuildAsFile: (buildId: string) => boolean
  importBuild: (jsonString: string) => boolean
  importBuildFromFile: (file: File) => Promise<boolean>
}>()(
  persist(
    (set, get) => ({
      character: defaultCharacter,
      equipment: {
        helmet: null,
        chest: null,
        gloves: null,
        pants: null,
        boots: null,
        weapon1: null,
        weapon2: null,
        weapon3: null,
        weapon4: null,
        shield: null,
        amulet: null,
        ring1: null,
        ring2: null
      },
      selectedSlot: null,
      
      // 数据库数据状态
      legendaryPowers: [],
      uniqueEquipment: [],
      affixes: [],
      isDataLoaded: false,
      
      // 装备配置状态
      equipmentConfig: {
        helmet: { selectedPower: null, selectedAffixes: [] },
        chest: { selectedPower: null, selectedAffixes: [] },
        gloves: { selectedPower: null, selectedAffixes: [] },
        pants: { selectedPower: null, selectedAffixes: [] },
        boots: { selectedPower: null, selectedAffixes: [] },
        weapon1: { selectedPower: null, selectedAffixes: [] },
        weapon2: { selectedPower: null, selectedAffixes: [] },
        weapon3: { selectedPower: null, selectedAffixes: [] },
        weapon4: { selectedPower: null, selectedAffixes: [] },
        shield: { selectedPower: null, selectedAffixes: [] },
        amulet: { selectedPower: null, selectedAffixes: [] },
        ring1: { selectedPower: null, selectedAffixes: [] },
        ring2: { selectedPower: null, selectedAffixes: [] }
      },
      
      // Build管理状态
      builds: [],
      currentBuildId: null,

  // 加载数据库数据
  loadData: async () => {
    try {
      console.log('开始加载数据库数据...')
      const { legendaryPowers, uniqueEquipment, affixes } = await loadAllDatabaseData()
      console.log('数据加载完成:', {
        legendaryPowers: legendaryPowers.length,
        uniqueEquipment: uniqueEquipment.length,
        affixes: affixes.length
      })
      set({
        legendaryPowers,
        uniqueEquipment,
        affixes,
        isDataLoaded: true
      })
    } catch (error) {
      console.error('Failed to load database data:', error)
    }
  },
  
  setCharacterClass: (charClass) => {
    set(state => ({
      character: { ...state.character, class: charClass }
    }))
  },
  
  equipItem: (slot, item) => {
    set(state => {
      const newEquipment = { ...state.equipment, [slot]: item }
      // 如果有当前方案，同时更新方案数据
      const newBuilds = state.currentBuildId 
        ? state.builds.map(b => 
            b.id === state.currentBuildId 
              ? { ...b, equipment: newEquipment }
              : b
          )
        : state.builds
      return {
        equipment: newEquipment,
        builds: newBuilds
      }
    })
  },
  
  unequipItem: (slot) => {
    set(state => {
      const newEquipment = { ...state.equipment, [slot]: null }
      const newEquipmentConfig = {
        ...state.equipmentConfig,
        [slot]: { selectedPower: null, selectedAffixes: [] }
      }
      // 如果有当前方案，同时更新方案数据
      const newBuilds = state.currentBuildId 
        ? state.builds.map(b => 
            b.id === state.currentBuildId 
              ? { ...b, equipment: newEquipment }
              : b
          )
        : state.builds
      return {
        equipment: newEquipment,
        equipmentConfig: newEquipmentConfig,
        builds: newBuilds
      }
    })
  },
  
  selectSlot: (slot) => {
    set({ selectedSlot: slot })
  },
  
  setEquipmentConfig: (slot, config) => {
    set(state => ({
      equipmentConfig: { ...state.equipmentConfig, [slot]: config }
    }))
  },
  
  equipUniqueItem: (slot, item) => {
    // 将暗金装备转换为 EquipmentItem 格式
    const equipmentItem: EquipmentItem = {
      id: item.id,
      name: item.name,
      slot: slot,
      rarity: item.itemType === 'mythic' ? 'unique' : 'unique',
      level: item.level,
      affixes: item.affixes.map(a => ({
        id: a.id,
        name: a.name,
        value: a.value,
        type: 'additive' as const
      })),
      uniqueEffect: item.uniqueEffects.map(e => e.description).join('\n'),
      icon: item.icon
    }
    
    set(state => {
      const newEquipment = { ...state.equipment, [slot]: equipmentItem }
      const newEquipmentConfig = {
        ...state.equipmentConfig,
        [slot]: { selectedPower: null, selectedAffixes: [] }
      }
      // 如果有当前方案，同时更新方案数据
      const newBuilds = state.currentBuildId 
        ? state.builds.map(b => 
            b.id === state.currentBuildId 
              ? { ...b, equipment: newEquipment }
              : b
          )
        : state.builds
      return {
        equipment: newEquipment,
        equipmentConfig: newEquipmentConfig,
        builds: newBuilds
      }
    })
  },
  
  // 加载指定的Build
  loadBuild: (buildId) => {
    const { builds } = get()
    const build = builds.find(b => b.id === buildId)
    if (build) {
      set({
        equipment: { ...build.equipment },
        character: { ...get().character, class: build.characterClass },
        currentBuildId: buildId
      })
    }
  },
  
  // 删除Build
  deleteBuild: (buildId) => {
    set(state => ({
      builds: state.builds.filter(b => b.id !== buildId),
      currentBuildId: state.currentBuildId === buildId ? null : state.currentBuildId
    }))
  },
  
  // 更新Build名称
  updateBuildName: (buildId, name) => {
    set(state => ({
      builds: state.builds.map(b => 
        b.id === buildId ? { ...b, name } : b
      )
    }))
  },
  
  // 复制当前方案（创建变体）
  duplicateBuild: (buildId) => {
    const { builds, equipment } = get()
    const build = builds.find(b => b.id === buildId)
    if (!build) return
    
    // 生成新的方案名称
    let newName = `${build.name}(副本)`
    let counter = 1
    while (builds.some(b => b.name === newName)) {
      counter++
      newName = `${build.name}(副本${counter})`
    }
    
    // 创建副本方案，使用当前正在编辑的装备配置
    const useEquipment = buildId === get().currentBuildId ? equipment : build.equipment
    
    const newBuild: Build = {
      id: `build-${Date.now()}`,
      name: newName,
      characterClass: build.characterClass,
      equipment: { ...useEquipment },
      createdAt: Date.now()
    }
    
    set(state => ({
      builds: [...state.builds, newBuild],
      currentBuildId: newBuild.id,
      equipment: { ...useEquipment },
      character: { ...state.character, class: build.characterClass }
    }))
  },
  
  // 创建空方案（新建方案功能）
  createEmptyBuild: () => {
    const { character } = get()
    const emptyEquipment: Record<EquipmentSlot, EquipmentItem | null> = {
      helmet: null,
      chest: null,
      gloves: null,
      pants: null,
      boots: null,
      weapon1: null,
      weapon2: null,
      weapon3: null,
      weapon4: null,
      shield: null,
      amulet: null,
      ring1: null,
      ring2: null
    }
    
    // 生成默认方案名
    const existingNames = get().builds.map(b => b.name)
    let num = 1
    while (existingNames.includes(`方案${num}`)) {
      num++
    }
    const defaultName = `方案${num}`
    
    const newBuild: Build = {
      id: `build-${Date.now()}`,
      name: defaultName,
      characterClass: character.class,
      equipment: { ...emptyEquipment },
      createdAt: Date.now()
    }
    
    // 创建方案并自动加载
    set(state => ({
      builds: [...state.builds, newBuild],
      currentBuildId: newBuild.id,
      equipment: { ...emptyEquipment },
      equipmentConfig: {
        helmet: { selectedPower: null, selectedAffixes: [] },
        chest: { selectedPower: null, selectedAffixes: [] },
        gloves: { selectedPower: null, selectedAffixes: [] },
        pants: { selectedPower: null, selectedAffixes: [] },
        boots: { selectedPower: null, selectedAffixes: [] },
        weapon1: { selectedPower: null, selectedAffixes: [] },
        weapon2: { selectedPower: null, selectedAffixes: [] },
        weapon3: { selectedPower: null, selectedAffixes: [] },
        weapon4: { selectedPower: null, selectedAffixes: [] },
        shield: { selectedPower: null, selectedAffixes: [] },
        amulet: { selectedPower: null, selectedAffixes: [] },
        ring1: { selectedPower: null, selectedAffixes: [] },
        ring2: { selectedPower: null, selectedAffixes: [] }
      }
    }))
  },
  
  // 导出方案为JSON字符串
  exportBuild: (buildId: string): string | null => {
    const { builds, currentBuildId, equipment } = get()
    const build = builds.find(b => b.id === buildId)
    if (!build) return null
    
    // 如果导出的是当前正在编辑的方案，使用最新的equipment状态
    const exportEquipment = currentBuildId === buildId ? equipment : build.equipment
    
    const exportData = {
      version: '1.0',
      name: build.name,
      characterClass: build.characterClass,
      equipment: exportEquipment
    }
    
    return JSON.stringify(exportData, null, 2)
  },
  
  // 导出方案为JSON文件（下载）
  exportBuildAsFile: (buildId: string): boolean => {
    const json = get().exportBuild(buildId)
    if (!json) return false
    
    const build = get().builds.find(b => b.id === buildId)
    const fileName = `d4-build-${build?.name || 'unknown'}.json`.replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, '_')
    
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    return true
  },
  
  // 导入方案从JSON字符串
  importBuild: (jsonString: string): boolean => {
    try {
      const importData = JSON.parse(jsonString)
      
      // 验证数据格式
      if (!importData.version || !importData.name || !importData.characterClass || !importData.equipment) {
        return false
      }
      
      // 生成新的方案ID
      const newBuild: Build = {
        id: `build-${Date.now()}`,
        name: importData.name,
        characterClass: importData.characterClass,
        equipment: { ...importData.equipment },
        createdAt: Date.now()
      }
      
      set(state => ({
        builds: [...state.builds, newBuild],
        currentBuildId: newBuild.id,
        equipment: { ...importData.equipment },
        character: { ...state.character, class: importData.characterClass }
      }))
      
      return true
    } catch {
      return false
    }
  },
  
  // 导入方案从JSON文件
  importBuildFromFile: (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const jsonString = e.target?.result as string
        const success = get().importBuild(jsonString)
        resolve(success)
      }
      reader.onerror = () => {
        resolve(false)
      }
      reader.readAsText(file)
    })
  },
  
  calculateStats: (): EquipmentStats => {
    const { equipment, character } = get()
    
    // 暗黑4 70级职业基础属性配置（参考游戏实际数据）
    const classBaseStats: Record<string, { strength: number; dexterity: number; intelligence: number }> = {
      barbarian: { strength: 400, dexterity: 200, intelligence: 100 },     // 力量型
      rogue: { strength: 100, dexterity: 400, intelligence: 150 },          // 敏捷型
      sorc: { strength: 80, dexterity: 120, intelligence: 420 },            // 智力型
      necromancer: { strength: 100, dexterity: 200, intelligence: 300 },    // 智力/敏捷
      druid: { strength: 280, dexterity: 280, intelligence: 140 },          // 平衡型（力量/敏捷）
      spiritborn: { strength: 120, dexterity: 320, intelligence: 160 },     // 敏捷/智力
      paladin: { strength: 320, dexterity: 180, intelligence: 100 }         // 力量型
    }
    
    // 获取当前职业的基础属性
    const classStats = classBaseStats[character.class] || { strength: 200, dexterity: 200, intelligence: 200 }
    
    // 等级缩放：等级70为满值（70/70=1），等级1为10%基础值
    const levelFactor = 0.1 + (character.level / 70) * 0.9
    
    // 计算基础属性（职业基础值 × 等级系数）
    const baseStrength = Math.floor(classStats.strength * levelFactor)
    const baseDexterity = Math.floor(classStats.dexterity * levelFactor)
    const baseIntelligence = Math.floor(classStats.intelligence * levelFactor)
    
    // 初始化属性来源明细
    const createDetail = (baseValue: number, baseName: string = '职业基础'): { baseValue: number; totalValue: number; sources: { name: string; value: number; type: 'base' | 'affix' | 'power' }[] } => ({
      baseValue,
      totalValue: baseValue,
      sources: [{ name: baseName, value: baseValue, type: 'base' }]
    })
    
    const details: EquipmentStats['details'] = {
      strength: createDetail(baseStrength),
      dexterity: createDetail(baseDexterity),
      intelligence: createDetail(baseIntelligence),
      attackPower: createDetail(0, '基础值'),
      attackSpeed: createDetail(1.2, '基础值'),
      critChance: createDetail(5, '基础值'),
      critDamage: createDetail(150, '基础值'),
      vulnerableDamage: createDetail(20, '基础值'),
      weaponDamage: createDetail(0, '基础值'),
      armor: createDetail(0, '基础值'),
      resistance: createDetail(300, '基础值'),
      health: createDetail(15000, '基础值'),
      additiveDamage: createDetail(0, '基础值'),
      multiplicativeDamage: createDetail(1, '基础值'),
      independentMultiplier: createDetail(1, '基础值')
    }
    
    // 初始化属性（包含职业基础属性 + 游戏基础值）
    const stats: EquipmentStats = {
      // 主要属性
      strength: baseStrength,
      dexterity: baseDexterity,
      intelligence: baseIntelligence,
      
      // 战斗属性
      attackPower: 0,
      attackSpeed: 1.2,     // 基础1.2攻击速度
      critChance: 5,        // 基础5%暴击几率
      critDamage: 150,      // 基础150%暴击伤害
      vulnerableDamage: 20, // 基础20%易伤伤害
      weaponDamage: 0,      // 武器伤害加成
      
      // 防御属性
      armor: 0,
      resistance: 300,      // 基础抗性
      health: 15000,       // 基础生命值
      
      // 伤害加成乘区
      additiveDamage: 0,           // A区 - 伤害类加法加成
      multiplicativeDamage: 1,     // B区 - 乘法加成（初始为1）
      independentMultipliers: [],  // 独立乘区 - 后缀[x]
      
      // B类乘区分组信息（同名词缀相加后的结果）
      multiplicativeGroups: [],
      
      // 独立乘区详细信息（带来源）
      independentDetails: [],
      
      // 其他属性（带明细）
      otherAttributes: {},
      
      // 属性来源明细
      details,
      
      // 装备统计
      equippedCount: 0,
      legendaryEffects: 0
    }
    
    // 定义伤害类词缀关键词（只有这些词缀才计入A类加成）
    const damageKeywords = ['伤害', '技能', '易伤', '流血', '燃烧', '冰冻', '中毒', '暗影', '火焰', '冰霜', '闪电', '神圣', '物理']
    
    // 定义排除词缀（这些词缀不计入A类加成）
    const excludeKeywords = ['攻击速度', '暴击几率', '抗性', '抗']
    
    // 判断词缀是否为伤害类（且不在排除列表中）
    const isDamageAffix = (name: string): boolean => {
      const lowerName = name.toLowerCase()
      // 检查是否在排除列表中（包括抗性类）
      if (excludeKeywords.some(exclude => lowerName.includes(exclude.toLowerCase()))) {
        return false
      }
      // 检查是否包含伤害类关键词
      return damageKeywords.some(keyword => lowerName.includes(keyword.toLowerCase()))
    }
    
    // B类乘区分组存储（同名词缀相加）
    const multiplicativeGroups: Record<string, { totalValue: number; sources: string[] }> = {}
    
    // 独立乘区详细信息存储
    const independentDetails: { name: string; value: number; source: string; multiplier: number }[] = []
    
    // 遍历所有装备计算属性
    Object.values(equipment).forEach(item => {
      if (item) {
        stats.equippedCount++
        if (item.legendaryPower) {
          stats.legendaryEffects++
        }
        
        item.affixes.forEach(affix => {
          const name = affix.name || ''
          const value = affix.value || 0
          const unit = affix.unit || ''
          const type = affix.type || 'additive'
          const calculationType = affix.calculationType || affix.type || 'additive'
          
          // 判断是否为独立乘区
          const isSuffixX = calculationType === 'independent' || name.includes('[x]') || name.includes('后缀')
          
          // 判断是否为乘法类型（B类乘区）
          const isPrefixX = calculationType === 'multiplicative' || (name.includes('x%') && !name.includes('[x]'))
          
          // 根据词缀类型分类处理
          if (isSuffixX) {
            // 后缀[x] -> 独立乘区（记录来源）
            independentDetails.push({
              name,
              value,
              source: item.name,
              multiplier: 1 + value / 100
            })
            stats.independentMultipliers.push(value)
            // 添加到明细记录
            details.independentMultiplier?.sources.push({ name: `${item.name} (${name})`, value: 1 + value / 100, type: 'affix' })
          } else if (isPrefixX || type === 'multiplicative') {
            // x前缀或乘法型 -> B类乘区（同名词缀相加）
            if (multiplicativeGroups[name]) {
              multiplicativeGroups[name].totalValue += value
              multiplicativeGroups[name].sources.push(item.name)
            } else {
              multiplicativeGroups[name] = {
                totalValue: value,
                sources: [item.name]
              }
            }
            details.multiplicativeDamage?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          } else if (type === 'additive' && isDamageAffix(name)) {
            // 加法型且是伤害类词缀（排除攻击速度、暴击几率、抗性类）-> A类加成
            stats.additiveDamage += value
            details.additiveDamage?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          }
          
          // 根据词缀名称匹配具体属性
          const lowerName = name.toLowerCase()
          
          // 主要属性处理（支持百分比加成）
          if (lowerName.includes('力量')) {
            if (unit === '%' || lowerName.includes('%')) {
              const bonusValue = Math.floor(stats.strength * value / 100)
              stats.strength += bonusValue
              details.strength?.sources.push({ name: `${item.name} (${name})`, value: bonusValue, type: 'affix' })
            } else {
              stats.strength += value
              details.strength?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
            }
          } else if (lowerName.includes('敏捷')) {
            if (unit === '%' || lowerName.includes('%')) {
              const bonusValue = Math.floor(stats.dexterity * value / 100)
              stats.dexterity += bonusValue
              details.dexterity?.sources.push({ name: `${item.name} (${name})`, value: bonusValue, type: 'affix' })
            } else {
              stats.dexterity += value
              details.dexterity?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
            }
          } else if (lowerName.includes('智力')) {
            if (unit === '%' || lowerName.includes('%')) {
              const bonusValue = Math.floor(stats.intelligence * value / 100)
              stats.intelligence += bonusValue
              details.intelligence?.sources.push({ name: `${item.name} (${name})`, value: bonusValue, type: 'affix' })
            } else {
              stats.intelligence += value
              details.intelligence?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
            }
          }
          // 战斗属性处理
          else if (lowerName.includes('攻击速度')) {
            const bonusValue = value / 100
            stats.attackSpeed += bonusValue
            details.attackSpeed?.sources.push({ name: `${item.name} (${name})`, value: bonusValue, type: 'affix' })
          } else if (lowerName.includes('暴击几率')) {
            stats.critChance += value
            details.critChance?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          } else if (lowerName.includes('暴击伤害')) {
            stats.critDamage += value
            details.critDamage?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          } else if (lowerName.includes('易伤')) {
            stats.vulnerableDamage += value
            details.vulnerableDamage?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          } else if (lowerName.includes('武器伤害') || lowerName.includes('攻击伤害')) {
            stats.attackPower += value
            details.attackPower?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          }
          // 防御属性处理
          else if (lowerName.includes('护甲')) {
            stats.armor += value
            details.armor?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          } else if (lowerName.includes('抗性')) {
            stats.resistance += value
            details.resistance?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          } else if (lowerName.includes('生命') && !lowerName.includes('恢复')) {
            stats.health += value
            details.health?.sources.push({ name: `${item.name} (${name})`, value, type: 'affix' })
          }
          // 其他属性（未明确分类的）
          else {
            // 检查是否已经存在该属性
            if (stats.otherAttributes[name]) {
              stats.otherAttributes[name].value += value
              stats.otherAttributes[name].detail.sources.push({ name: `${item.name}`, value, type: 'affix' })
              stats.otherAttributes[name].detail.totalValue += value
            } else {
              // 创建新的属性明细
              stats.otherAttributes[name] = {
                value,
                detail: {
                  baseValue: 0,
                  totalValue: value,
                  sources: [
                    { name: '基础值', value: 0, type: 'base' },
                    { name: `${item.name}`, value, type: 'affix' }
                  ]
                }
              }
            }
          }
        })
      }
    })
    
    // 计算B类乘区（同名词缀相加后独立相乘）
    Object.entries(multiplicativeGroups).forEach(([, group]) => {
      stats.multiplicativeDamage *= (1 + group.totalValue / 100)
    })
    
    // 设置B类乘区分组信息
    stats.multiplicativeGroups = Object.entries(multiplicativeGroups).map(([name, group]) => ({
      name,
      totalValue: group.totalValue,
      sources: group.sources
    }))
    
    // 设置独立乘区详细信息
    stats.independentDetails = independentDetails
    
    // 更新明细中的总值
    if (details.strength) details.strength.totalValue = stats.strength
    if (details.dexterity) details.dexterity.totalValue = stats.dexterity
    if (details.intelligence) details.intelligence.totalValue = stats.intelligence
    if (details.attackPower) details.attackPower.totalValue = stats.attackPower
    if (details.attackSpeed) details.attackSpeed.totalValue = stats.attackSpeed
    if (details.critChance) details.critChance.totalValue = stats.critChance
    if (details.critDamage) details.critDamage.totalValue = stats.critDamage
    if (details.vulnerableDamage) details.vulnerableDamage.totalValue = stats.vulnerableDamage
    if (details.armor) details.armor.totalValue = stats.armor
    if (details.resistance) details.resistance.totalValue = stats.resistance
    if (details.health) details.health.totalValue = stats.health
    if (details.additiveDamage) details.additiveDamage.totalValue = stats.additiveDamage
    if (details.multiplicativeDamage) details.multiplicativeDamage.totalValue = stats.multiplicativeDamage
    if (details.independentMultiplier) details.independentMultiplier.totalValue = stats.independentDetails.reduce((acc, item) => acc * item.multiplier, 1)
    
    return stats
  }
    }),
    {
      name: 'equipment-simulator-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // 只持久化需要的字段
      partialize: (state) => ({
        character: state.character,
        equipment: state.equipment,
        equipmentConfig: state.equipmentConfig,
        builds: state.builds,
        currentBuildId: state.currentBuildId
      })
    }
  )
)
