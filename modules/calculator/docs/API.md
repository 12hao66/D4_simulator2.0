# 伤害计算器 API 文档

## 概述

本文档描述伤害计算器3.0的TypeScript类型定义和接口。

## 类型定义

### DamageInputs - 输入参数接口

```typescript
interface DamageInputs {
  // 基础属性
  class_id: string              // 职业ID: barbarian|druid|sorc|necro|rogue|paladin|spiritborn
  wpn1: number                  // 主武器伤害
  wpn2: number                  // 副武器伤害
  aps: number                   // 攻击速度
  str: number                   // 主属性值
  skill_pct: number             // 技能百分比
  is_dot: boolean               // 是否为DOT伤害
  hits: number                  // 命中次数
  
  // A类词缀（加法区）
  affix_a: AffixItem[]
  
  // B类词缀（分组乘法区）
  affix_b: AffixItem[]
  
  // 独立X词缀（独立乘法区）
  multi_leg: AffixItem[]
  
  // 暴击
  crit_chance: number           // 暴击几率(%)
  crit_active: boolean         // 是否启用暴击
  
  // 易伤
  vuln_add: number             // 易伤加成(%)
  vuln_active: boolean         // 是否启用易伤
  vuln_uptime: number          // 易伤覆盖率(%)
  
  // 压制
  op_stacks: number            // 当前层数
  op_stack_add: number         // 每层加成(%)
  
  // 怪物减伤
  monster_dr: number            // 怪物护甲减伤(%)
  apply_dr: boolean            // 是否应用减伤
}
```

### AffixItem - 词缀接口

```typescript
interface AffixItem {
  label: string                // 词缀名称
  val: number                  // 词缀数值(%)
  enabled: boolean             // 是否启用
}
```

### DamageResult - 伤害计算结果接口

```typescript
interface DamageResult {
  // 各阶段伤害
  wpnBase: number              // 武器基础伤害
  afterSkill: number           // 技能加成后
  afterStat: number            // 主属性加成后
  afterAdd: number             // A类词缀加成后
  afterB: number               // B类词缀加成后
  afterCrit: number            // 暴击加成后
  afterVuln: number            // 易伤加成后
  afterLeg: number             // 独立乘区加成后
  normalHit: number            // 普通命中
  critHit: number              // 暴击命中
  finalHit: number             // 最终伤害
  finalDisplay: number        // 显示伤害（含减伤）
  
  // 乘数
  statMult: number             // 主属性乘数
  addMult: number              // A类乘数
  bMult: number                // B类乘数
  vulnMult: number             // 易伤乘数
  legMult: number              // 独立乘数
  critDmgBonus: number         // 暴击伤害加成
  
  // 其他数据
  addTotal: number             // A类总加成
  opStackBonus: number         // 压制加成
  isDot: boolean              // 是否为DOT
  vulnActive: boolean         // 易伤是否启用
}
```

### DPSResult - DPS计算结果接口

```typescript
interface DPSResult {
  baseDPS: number              // 基础DPS
  avgDPS: number              // 平均DPS
  expectedDPS: number          // 期望DPS
  aps: number                 // 攻击速度
  hits: number                // 命中次数
  critChance: number          // 暴击几率
  vulnUptime: number          // 易伤覆盖率
}
```

### Plan - 方案接口

```typescript
interface Plan {
  id: string                  // 方案ID
  name: string                // 方案名称
  data: DamageInputs          // 方案数据
}
```

### Snapshot - 快照接口

```typescript
interface Snapshot {
  id: string                  // 快照ID
  time: string                // 快照时间
  planName: string            // 对应方案名称
  data: DamageInputs          // 快照数据
}
```

## Store API

### useDamageStore - 伤害计算状态管理

```typescript
interface DamageStore {
  // 状态
  inputs: DamageInputs        // 当前输入参数
  result: DamageResult | null // 伤害计算结果
  dpsResult: DPSResult | null // DPS计算结果
  steps: StepData[]          // 步骤数据
  
  // 方法
  setInputs: (inputs: Partial<DamageInputs>) => void
  updateInput: <K extends keyof DamageInputs>(key: K, value: DamageInputs[K]) => void
  addAffix: (type: 'affix_a' | 'affix_b' | 'multi_leg') => void
  removeAffix: (type: 'affix_a' | 'affix_b' | 'multi_leg', index: number) => void
  calculateDamage: () => void
  calculateDPS: () => void
  buildStepData: () => StepData[]
  reset: () => void
}

// 使用示例
const { inputs, updateInput, result, dpsResult, reset } = useDamageStore()
```

### usePlanStore - 方案管理状态管理

```typescript
interface PlanStore {
  // 状态
  plans: Plan[]               // 方案列表
  activeId: string | null     // 当前激活方案ID
  snapshots: Snapshot[]       // 快照列表
  maxSnapshots: number        // 最大快照数（5）
  
  // 方案管理方法
  loadPlans: () => void
  savePlans: () => void
  getActivePlan: () => Plan | undefined
  switchPlan: (planId: string) => void
  newPlan: () => void
  clonePlan: () => void
  deletePlan: (planId: string) => void
  renamePlan: (planId: string, newName: string) => void
  updatePlanData: (planId: string, data: DamageInputs) => void
  exportPlan: (planId: string) => void
  importPlan: (file: File) => Promise<void>
  
  // 快照管理方法
  loadSnapshots: () => void
  saveSnapshots: () => void
  takeSnapshot: () => void
  restoreSnapshot: (snapshotId: string) => void
  deleteSnapshot: (snapshotId: string) => void
}

// 使用示例
const { plans, activeId, newPlan, switchPlan, exportPlan, importPlan } = usePlanStore()
```

## 职业配置

### CLASSES 常量

```typescript
const CLASSES = [
  { id: 'barbarian', name: '野蛮人', icon: '⚔', stat_label: '力量', stat_div: 900 },
  { id: 'druid', name: '德鲁伊', icon: '🌿', stat_label: '意志', stat_div: 800 },
  { id: 'sorc', name: '法师', icon: '🔥', stat_label: '智慧', stat_div: 800 },
  { id: 'necro', name: '死灵法师', icon: '💀', stat_label: '智慧', stat_div: 800 },
  { id: 'rogue', name: '游侠', icon: '🗡', stat_label: '敏捷', stat_div: 800 },
  { id: 'paladin', name: '圣骑士', icon: '🛡', stat_label: '力量', stat_div: 900 },
  { id: 'spiritborn', name: '术士', icon: '🦅', stat_label: '敏捷', stat_div: 800 }
]

// stat_div: 主属性换算除数
// stat_mult = 1 + stat / stat_div
```

## 工具函数

### affixTotal - 计算词缀总和

```typescript
const affixTotal = (arr: AffixItem[]): number
// 返回所有启用的词缀数值之和
```

### calcBMult - 计算B类词缀乘数

```typescript
const calcBMult = (arr: AffixItem[]): number
// 同名词缀相加，不同组相乘
// 返回: (1 + 同组总合/100) × ...
```

### formatNumber - 格式化数字显示

```typescript
const formatNumber = (n: number): string
// 1亿以上: X.XX亿
// 1M以上: X.XXM
// 1K以上: X.XK
// 其他: 千分位格式化
## 导出内容

```typescript
// 导出接口
export interface AffixItem
export interface DamageInputs
export interface DamageResult
export interface DPSResult
export interface StepData
export interface Plan
export interface Snapshot
export interface DamageStore
export interface PlanStore
export interface CalculatorUnitProps
```

## CalculatorUnit 组件

### 组件接口

```typescript
interface CalculatorUnitProps {
  /** 计算器标题 */
  title: string
  /** 关闭按钮回调 */
  onClose?: () => void
  /** 标题修改回调 */
  onTitleChange?: (title: string) => void
}
```

### 使用示例

```tsx
import CalculatorUnit from './components/CalculatorUnit'

// 在App.tsx中渲染多个计算器
const extraCalcs = [{ id: 1, title: '计算器 B' }, { id: 2, title: '计算器 C' }]

// 主计算器
<InputPanel />
<ResultPanel />

// 新增计算器
{extraCalcs.map(calc => (
  <CalculatorUnit
    key={calc.id}
    title={calc.title}
    onClose={() => removeCalculator(calc.id)}
    onTitleChange={(title) => updateCalcTitle(calc.id, title)}
  />
))}
```

### 内部接口

CalculatorUnit组件内部使用的接口：

```typescript
// 计算器实例接口
interface CalcInstance {
  id: number
  title: string
}

// 伤害计算结果
interface DamageResult {
  wpnBase: number        // 武器基础伤害
  afterSkill: number    // 技能加成后
  afterStat: number     // 主属性加成后
  afterAdd: number      // A类词缀加成后
  afterB: number        // B类词缀加成后
  afterCrit: number     // 暴击加成后
  afterVuln: number     // 易伤加成后
  afterLeg: number      // 独立乘区加成后
  normalHit: number     // 普通命中
  critHit: number       // 暴击命中
  finalHit: number      // 最终伤害
  finalDisplay: number  // 显示伤害（含减伤）
  statMult: number      // 主属性乘数
  addMult: number       // A类乘数
  bMult: number         // B类乘数
  vulnMult: number      // 易伤乘数
  legMult: number       // 独立乘数
  critDmgBonus: number // 暴击伤害加成
  addTotal: number     // A类总加成
  opStackBonus: number // 压制加成
  isDot: boolean        // 是否为DOT
  vulnActive: boolean   // 易伤是否启用
}

// DPS结果
interface DPSResult {
  baseDPS: number       // 基础DPS
  avgDPS: number       // 平均DPS
  expectedDPS: number   // 期望DPS
  aps: number          // 攻击速度
  hits: number         // 命中次数
  critChance: number   // 暴击几率
  vulnUptime: number   // 易伤覆盖率
}

// 步骤数据
interface StepData {
  icon: string         // 图标
  label: string        // 步骤名称
  note?: string        // 计算说明
  mult?: string        // 当前乘数
  val: number          // 当前数值
  isFinal?: boolean    // 是否为最终步骤
}
```

### localStorage 存储

新增计算器使用独立的localStorage空间：

```typescript
const STORAGE_PREFIX = 'd4_calc_unit_'

// 保存方案
const saveToStorage = (name: string, data: DamageInputs) => {
  localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(data))
}

// 加载方案
const loadFromStorage = (name: string): DamageInputs | null => {
  const stored = localStorage.getItem(STORAGE_PREFIX + name)
  return stored ? JSON.parse(stored) : null
}

// 获取所有已保存方案名称
const getSavedNames = (): string[] => {
  // 遍历localStorage，收集所有d4_calc_unit_开头的key
}
```

### 计算函数

CalculatorUnit组件内部实现了完整的伤害计算逻辑：

```typescript
// 创建默认输入
const createDefaultInputs = (): DamageInputs

// 伤害计算
const calculateDamage = (inputs: DamageInputs): DamageResult | null

// DPS计算
const calculateDPS = (result: DamageResult, inputs: DamageInputs): DPSResult | null

// 构建步骤数据
const buildStepData = (result: DamageResult, inputs: DamageInputs): StepData[]
```

## App.tsx 状态管理

### 多计算器状态

```typescript
interface AppState {
  // 计算器列表
  extraCalcs: CalcInstance[]
  // 下一个ID
  nextId: number
}

// 状态管理
const [extraCalcs, setExtraCalcs] = useState<CalcInstance[]>([])
const [nextId, setNextId] = useState(1)

// 添加计算器
const addCalculator = () => {
  const letters = ['B', 'C', 'D']
  const nextLetter = letters[extraCalcs.length]
  setExtraCalcs([...extraCalcs, { id: nextId, title: `计算器 ${nextLetter}` }])
  setNextId(nextId + 1)
}

// 移除计算器
const removeCalculator = (id: number) => {
  setExtraCalcs(extraCalcs.filter(calc => calc.id !== id))
}

// 更新标题
const updateCalcTitle = (id: number, title: string) => {
  setExtraCalcs(extraCalcs.map(calc => calc.id === id ? { ...calc, title } : calc))
}
```

### 限制条件

```typescript
// 最多3个新增计算器（总共4个）
const canAddMore = extraCalcs.length < 3
```
// 导出常量
export const CLASSES

// 导出工具函数
export const affixTotal
export const calcBMult
export const formatNumber

// 导出Hook
export { useDamageStore }
export { usePlanStore }
```
