import type { LegendaryPower, UniqueEquipment, Affix, CharacterClass } from '../types/database'

/**
 * 数据库数据加载服务
 * 从数据库模块加载 JSON 数据
 */

// 数据库模块的数据路径（使用相对路径，支持统一构建部署）
const DATABASE_BASE_URL = '../database/data/'

/**
 * 加载威能数据
 */
export async function loadLegendaryPowers(): Promise<LegendaryPower[]> {
  try {
    const response = await fetch(`${DATABASE_BASE_URL}legendary-powers.json`)
    if (!response.ok) {
      throw new Error(`Failed to load legendary powers: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to load legendary powers:', error)
    return []
  }
}

/**
 * 加载暗金装备数据
 */
export async function loadUniqueEquipment(): Promise<UniqueEquipment[]> {
  try {
    const url = `${DATABASE_BASE_URL}uniqueEquipment.json`
    console.log('正在加载暗金装备数据:', url)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load unique equipment: ${response.status}`)
    }
    const data = await response.json()
    console.log('暗金装备数据加载成功:', data.length, '条')
    return data
  } catch (error) {
    console.error('Failed to load unique equipment:', error)
    return []
  }
}

/**
 * 加载词缀数据
 */
export async function loadAffixes(): Promise<Affix[]> {
  try {
    const url = `${DATABASE_BASE_URL}affixes.json`
    console.log('正在加载词缀数据:', url)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load affixes: ${response.status}`)
    }
    const data = await response.json()
    console.log('词缀数据加载成功:', data.length, '条')
    return data
  } catch (error) {
    console.error('Failed to load affixes:', error)
    return []
  }
}

/**
 * 加载所有数据库数据
 */
export async function loadAllDatabaseData(): Promise<{
  legendaryPowers: LegendaryPower[]
  uniqueEquipment: UniqueEquipment[]
  affixes: Affix[]
}> {
  const [legendaryPowers, uniqueEquipment, affixes] = await Promise.all([
    loadLegendaryPowers(),
    loadUniqueEquipment(),
    loadAffixes()
  ])
  
  return { legendaryPowers, uniqueEquipment, affixes }
}

/**
 * 根据职业过滤词缀
 * @param affixes 词缀列表
 * @param characterClass 职业标识
 * @returns 适用于该职业的词缀列表
 */
export function filterAffixesByClass(affixes: Affix[], characterClass: CharacterClass): Affix[] {
  return affixes.filter(affix => {
    // 如果词缀没有设置适用职业，则适用于所有职业
    if (!affix.applicableClasses || affix.applicableClasses.length === 0) {
      return true
    }
    // 检查词缀是否适用于当前职业
    return affix.applicableClasses.includes(characterClass)
  })
}
