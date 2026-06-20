import { create } from 'zustand'

// 词缀接口定义
export interface AffixItem {
  label: string
  val: number
  enabled: boolean
}

// 输入数据接口
export interface DamageInputs {
  // 基础属性
  class_id: string
  wpn1: number
  wpn2: number
  aps: number
  str: number
  skill_pct: number
  is_dot: boolean
  hits: number
  
  // A类词缀（加法区）
  affix_a: AffixItem[]
  
  // B类词缀（分组乘法区）
  affix_b: AffixItem[]
  
  // Legendary词缀（独立乘法区）
  multi_leg: AffixItem[]
  
  // 暴击
  crit_chance: number
  crit_active: boolean
  
  // 易伤
  vuln_add: number
  vuln_active: boolean
  vuln_uptime: number
  
  // 压制
  op_stacks: number
  op_stack_add: number
  
  // 怪物减伤
  monster_dr: number
  apply_dr: boolean
}

// 计算结果接口
export interface DamageResult {
  // 各阶段伤害
  wpnBase: number
  afterSkill: number
  afterStat: number
  afterAdd: number
  afterB: number
  afterCrit: number
  afterVuln: number
  afterLeg: number
  normalHit: number
  critHit: number
  finalHit: number
  finalDisplay: number
  
  // 乘数
  statMult: number
  addMult: number
  bMult: number
  vulnMult: number
  legMult: number
  
  // 其他数据
  critDmgBonus: number
  addTotal: number
  opStackBonus: number
  isDot: boolean
  vulnActive: boolean
}

// DPS结果接口
export interface DPSResult {
  baseDPS: number
  avgDPS: number
  expectedDPS: number
  aps: number
  hits: number
  critChance: number
  vulnUptime: number
}

// 步骤数据接口
export interface StepData {
  icon: string
  label: string
  note: string
  mult: string
  val: number
  isFinal?: boolean
}

// 职业配置
export const CLASSES = [
  { id: 'barbarian', name: '野蛮人', icon: '⚔', stat_label: '力量', stat_div: 900 },
  { id: 'druid', name: '德鲁伊', icon: '🌿', stat_label: '意志', stat_div: 800 },
  { id: 'sorc', name: '法师', icon: '🔥', stat_label: '智慧', stat_div: 800 },
  { id: 'necro', name: '死灵法师', icon: '💀', stat_label: '智慧', stat_div: 800 },
  { id: 'rogue', name: '游侠', icon: '🗡', stat_label: '敏捷', stat_div: 800 },
  { id: 'paladin', name: '圣骑士', icon: '🛡', stat_label: '力量', stat_div: 900 },
  { id: 'spiritborn', name: '术士', icon: '🦅', stat_label: '敏捷', stat_div: 800 }
]

// 工具函数
const affixTotal = (arr: AffixItem[]): number => {
  return (arr || []).filter(r => r.enabled !== false).reduce((s, r) => s + (r.val || 0), 0)
}

const calcBMult = (arr: AffixItem[]): number => {
  const rows = (arr || []).filter(r => r.enabled !== false && (r.val || 0) > 0)
  if (!rows.length) return 1

  const groups: Record<string, number> = {}
  rows.forEach(r => {
    const key = (r.label || '').trim() || '__unnamed__'
    if (!groups[key]) groups[key] = 0
    groups[key] += r.val || 0
  })

  let mult = 1
  Object.values(groups).forEach(total => {
    mult *= (1 + total / 100)
  })
  return mult
}

const formatNumber = (n: number): string => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + ' 亿'
  if (n >= 1e6) return (n / 1e6).toFixed(2) + ' M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + ' K'
  return Math.round(n).toLocaleString()
}

interface DamageStore {
  inputs: DamageInputs
  result: DamageResult | null
  dpsResult: DPSResult | null
  steps: StepData[]
  
  setInputs: (inputs: Partial<DamageInputs>) => void
  updateInput: <K extends keyof DamageInputs>(key: K, value: DamageInputs[K]) => void
  addAffix: (type: 'affix_a' | 'affix_b' | 'multi_leg') => void
  removeAffix: (type: 'affix_a' | 'affix_b' | 'multi_leg', index: number) => void
  calculateDamage: () => void
  calculateDPS: () => void
  buildStepData: () => StepData[]
  reset: () => void
}

const defaultInputs: DamageInputs = {
  class_id: 'barbarian',
  wpn1: 3000,
  wpn2: 0,
  aps: 1.2,
  str: 5000,
  skill_pct: 215,
  is_dot: false,
  hits: 1,
  affix_a: [
    { label: '核心技能伤害', val: 120, enabled: true },
    { label: '近战伤害', val: 80, enabled: true }
  ],
  affix_b: [
    { label: '物理伤害倍增', val: 22, enabled: true },
    { label: '核心技能倍增', val: 18, enabled: true }
  ],
  multi_leg: [
    { label: '传奇威能', val: 60, enabled: true },
    { label: '套装效果', val: 40, enabled: true }
  ],
  crit_chance: 50,
  crit_active: true,
  vuln_add: 0,
  vuln_active: true,
  vuln_uptime: 80,
  op_stacks: 0,
  op_stack_add: 15,
  monster_dr: 80,
  apply_dr: false
}

export const useDamageStore = create<DamageStore>((set, get) => ({
  inputs: defaultInputs,
  result: null,
  dpsResult: null,
  steps: [],
  
  setInputs: (newInputs) => {
    set(state => ({
      inputs: { ...state.inputs, ...newInputs }
    }))
    get().calculateDamage()
  },
  
  updateInput: (key, value) => {
    set(state => ({
      inputs: { ...state.inputs, [key]: value }
    }))
    get().calculateDamage()
  },
  
  addAffix: (type) => {
    const { inputs } = get()
    const affixes = inputs[type] || []
    set({
      inputs: {
        ...inputs,
        [type]: [...affixes, { label: '', val: 0, enabled: true }]
      }
    })
    get().calculateDamage()
  },
  
  removeAffix: (type, index) => {
    const { inputs } = get()
    const affixes = [...(inputs[type] || [])]
    affixes.splice(index, 1)
    set({
      inputs: {
        ...inputs,
        [type]: affixes
      }
    })
    get().calculateDamage()
  },
  
  calculateDamage: () => {
    const { inputs } = get()
    
    // ① 武器基础
    const wpnBase = (inputs.wpn1 || 0) + (inputs.wpn2 || 0)
    if (wpnBase <= 0) {
      set({ result: null, dpsResult: null, steps: [] })
      return
    }

    // ② 技能系数
    const skillMult = (inputs.skill_pct || 100) / 100
    const afterSkill = wpnBase * skillMult

    // ③ 主属区（各职业系数不同）
    const cls = CLASSES.find(c => c.id === inputs.class_id) || CLASSES[0]
    const statMult = 1 + (inputs.str || 0) / cls.stat_div
    const afterStat = afterSkill * statMult

    // ④ A类区：[+]% 前缀全部加法合算
    const vulnActive = !!inputs.vuln_active
    const opStackBonus = (inputs.op_stack_add || 15) * (inputs.op_stacks || 0)
    const aGearTotal = affixTotal(inputs.affix_a || [])
    const addTotal = aGearTotal + opStackBonus + (vulnActive ? (inputs.vuln_add || 0) : 0)

    const addMult = 1 + addTotal / 100
    const afterAdd = afterStat * addMult

    // ⑤ B类区：同名词缀先合并，不同名各自独立相乘
    const bMult = calcBMult(inputs.affix_b)
    const afterB = afterAdd * bMult

    // ⑥ 暴击
    const isDot = !!inputs.is_dot
    const critDmgBonus = 0.5
    let normalHit: number, critHit: number, afterCrit: number

    if (isDot) {
      normalHit = critHit = afterCrit = afterB
    } else {
      normalHit = afterB
      critHit = afterB * (1 + critDmgBonus)
      afterCrit = inputs.crit_active ? critHit : normalHit
    }

    // ⑦ 易伤区：×1.2 固定
    const vulnMult = vulnActive ? 1.2 : 1.0
    const afterVuln = afterCrit * vulnMult

    // ⑧ 独立X乘区：传奇威能/套装，各自独立相乘
    const legMult = (inputs.multi_leg || []).filter((r: AffixItem) => r.enabled !== false && r.val > 0)
      .reduce((acc: number, r: AffixItem) => acc * (1 + r.val / 100), 1)

    const afterLeg = afterVuln * legMult

    // ⑨ 最终伤害
    const finalHit = afterLeg

    // ⑩ 怪物减伤（可选展示）
    const finalDisplay = inputs.apply_dr ? finalHit * (1 - (inputs.monster_dr || 0) / 100) : finalHit

    const result: DamageResult = {
      wpnBase,
      afterSkill,
      afterStat,
      afterAdd,
      afterB,
      afterCrit,
      afterVuln,
      afterLeg,
      normalHit,
      critHit,
      finalHit,
      finalDisplay,
      statMult,
      addMult,
      bMult,
      vulnMult,
      legMult,
      critDmgBonus,
      addTotal,
      opStackBonus,
      isDot,
      vulnActive
    }

    set({ result })
    get().calculateDPS()
    get().buildStepData()
  },
  
  calculateDPS: () => {
    const { result, inputs } = get()
    if (!result) {
      set({ dpsResult: null })
      return
    }

    const aps = inputs.aps || 1.0
    const hits = inputs.hits || 1
    const critChance = (inputs.crit_chance || 0) / 100
    const vulnUptime = (inputs.vuln_uptime || 80) / 100

    // 基础DPS（不考虑易伤覆盖率）
    const baseDPS = result.finalHit * aps * hits

    // 考虑易伤覆盖率的DPS
    const avgDPS = baseDPS * (1 - vulnUptime + vulnUptime * 1.2)

    // 暴击期望DPS
    const expectedDPS = avgDPS * (1 - critChance + critChance * 1.5)

    const dpsResult: DPSResult = {
      baseDPS,
      avgDPS,
      expectedDPS,
      aps,
      hits,
      critChance,
      vulnUptime
    }

    set({ dpsResult })
  },
  
  buildStepData: () => {
    const { result, inputs } = get()
    if (!result) {
      set({ steps: [] })
      return []
    }

    const isCrit = !result.isDot && inputs.crit_active
    const cls = CLASSES.find(c => c.id === inputs.class_id) || { stat_label: '力量', stat_div: 900 }

    const noteA = [
      `A类词缀 +${affixTotal(inputs.affix_a || []).toFixed(0)}%`,
      result.opStackBonus > 0 ? `压制叠层 +${result.opStackBonus.toFixed(0)}%` : '',
      result.vulnActive && inputs.vuln_add > 0 ? `易伤 +${inputs.vuln_add}%` : ''
    ].filter(Boolean).join(' + ')

    const steps: StepData[] = [
      {
        icon: '⚔',
        label: '武器基础点伤',
        note: inputs.wpn2 > 0 ? `主手 ${formatNumber(inputs.wpn1)} + 副手 ${formatNumber(inputs.wpn2)}` : '单手武器',
        mult: '',
        val: result.wpnBase
      },
      {
        icon: '⚡',
        label: `技能系数 ×${inputs.skill_pct}%`,
        note: '',
        mult: `×${(inputs.skill_pct / 100).toFixed(3)}`,
        val: result.afterSkill
      },
      {
        icon: '💪',
        label: `主属区（${cls.stat_label} ${inputs.str}）`,
        note: `1 + ${inputs.str} / ${cls.stat_div} = ×${result.statMult.toFixed(4)}`,
        mult: `×${result.statMult.toFixed(4)}`,
        val: result.afterStat
      },
      {
        icon: '📊',
        label: `A类区 [+] ${result.addTotal.toFixed(0)}%`,
        note: noteA,
        mult: `×${result.addMult.toFixed(4)}`,
        val: result.afterAdd
      },
      {
        icon: '✖',
        label: 'B类区',
        note: getBNote(inputs.affix_b),
        mult: `×${result.bMult.toFixed(4)}`,
        val: result.afterB
      }
    ]

    if (!result.isDot) {
      steps.push({
        icon: '💥',
        label: isCrit ? '暴击命中 ×1.5（固定基础加成）' : '普通命中',
        note: isCrit ? '暴击伤害[+]%已归入A类区' : '未触发暴击',
        mult: isCrit ? '×1.500' : '×1.000',
        val: result.afterCrit
      })
    }

    steps.push({
      icon: '🔴',
      label: '易伤区 ×1.2',
      note: result.vulnActive ? '目标携带易伤（固定 ×1.2）' : '目标无易伤',
      mult: result.vulnActive ? '×1.200' : '×1.000',
      val: result.afterVuln
    })

    steps.push({
      icon: '⭐',
      label: '独立X连乘',
      note: getLegNote(inputs.multi_leg),
      mult: `×${result.legMult.toFixed(4)}`,
      val: result.afterLeg,
      isFinal: true
    })

    set({ steps })
    return steps
  },
  
  reset: () => {
    set({ inputs: { ...defaultInputs, affix_a: [], affix_b: [], multi_leg: [] }, result: null, dpsResult: null, steps: [] })
  }
}))

// 获取B类词缀说明
function getBNote(affixB: AffixItem[]): string {
  const rows = (affixB || []).filter(r => r.enabled !== false && (r.val || 0) > 0)
  if (!rows.length) return '无B类词缀'

  const groups: Record<string, number> = {}
  rows.forEach(r => {
    const key = (r.label || '').trim() || '未命名'
    if (!groups[key]) groups[key] = 0
    groups[key] += r.val || 0
  })

  return Object.entries(groups)
    .map(([k, v]) => `${k} +${v.toFixed(0)}% → ×${(1 + v / 100).toFixed(3)}`)
    .join('  ·  ')
}

// 获取独立X词缀说明
function getLegNote(multiLeg: AffixItem[]): string {
  const rows = (multiLeg || []).filter(r => r.enabled !== false && r.val > 0)
  if (!rows.length) return '无独立X词缀'

  return rows.map(r => `${r.label} ×${(1 + r.val / 100).toFixed(3)}`).join(' × ')
}

// 导出工具函数
export { affixTotal, calcBMult, formatNumber }