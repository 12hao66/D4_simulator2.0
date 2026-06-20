# 伤害计算器 设计文档

## 概述

本文档描述伤害计算器3.0的核心功能架构和设计决策。

## 一、核心计算引擎设计

### 1.1 伤害计算流程

```
┌─────────────────────────────────────────────────────────────────┐
│                         伤害计算流程                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   武器伤害 ──► 技能加成 ──► 主属性 ──► A类区 ──► B类区          │
│      │           │           │         │          │             │
│      │           │           │         │          │             │
│      ▼           ▼           ▼         ▼          ▼             │
│   wpnBase    afterSkill  afterStat  afterAdd   afterB          │
│                                                                 │
│                     ▼                    ▼                       │
│                   暴击                易伤                       │
│                     │                    │                       │
│                     ▼                    ▼                       │
│               afterCrit            afterVuln                     │
│                     │                                              │
│                     ▼                                              │
│               独立乘区 ──► 最终伤害                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 乘区计算设计

#### A类区（加法区）

**设计原则**：所有A类词缀数值相加后再乘

```
A类总加成 = Σ(所有启用的A类词缀值) + 压制加成
A类乘数 = 1 + A类总加成 / 100
```

**示例**：
```
核心技能伤害: 120%
近战伤害: 80%
压制: 3层 × 15% = 45%

A类总加成 = 120 + 80 + 45 = 245%
A类乘数 = 1 + 245/100 = 3.45
```

#### B类区（分组乘法区）

**设计原则**：同名(同组)词缀相加，不同组之间相乘

```typescript
// 计算逻辑
const calcBMult = (arr: AffixItem[]): number => {
  // 1. 按标签分组
  const groups: Record<string, number> = {}
  rows.forEach(r => {
    const key = r.label || '__unnamed__'
    groups[key] = (groups[key] || 0) + r.val
  })
  
  // 2. 各组相乘
  let mult = 1
  Object.values(groups).forEach(total => {
    mult *= (1 + total / 100)
  })
  return mult
}
```

**示例**：
```
物理伤害: 22%
核心技能: 18%

B类乘数 = (1 + 22/100) × (1 + 18/100)
        = 1.22 × 1.18
        = 1.4396
```

#### 独立乘区（独立乘法区）

**设计原则**：每个词缀独立相乘，互不影响

```
独立乘数 = Π(1 + 独立词缀值 / 100)

示例：
传奇威能: 60%
套装效果: 40%

独立乘数 = (1 + 60/100) × (1 + 40/100)
        = 1.6 × 1.4
        = 2.24
```

### 1.3 DPS计算设计

```typescript
// DPS = 伤害 × 攻速 × 命中次数
baseDPS = finalHit × aps × hits

// 易伤期望 = 非易伤占比×1 + 易伤占比×1.2
vulnExpect = (1 - vuln_uptime) × 1 + vuln_uptime × 1.2
           = 1 - vuln_uptime + vuln_uptime × 1.2

// 暴击期望 = 非暴击占比×1 + 暴击占比×1.5
critExpect = (1 - crit_chance) × 1 + crit_chance × 1.5
           = 1 - crit_chance + crit_chance × 1.5

// 期望DPS = 基础DPS × 易伤期望 × 暴击期望
expectedDPS = baseDPS × vulnExpect × critExpect
```

### 1.4 职业属性换算

| 职业 | 主属性 | 换算除数 | 说明 |
|------|--------|----------|------|
| 野蛮人 | 力量 | 900 | 900力量 = 100%伤害 |
| 圣骑士 | 力量 | 900 | 900力量 = 100%伤害 |
| 德鲁伊 | 意志 | 800 | 800意志 = 100%伤害 |
| 法师 | 智慧 | 800 | 800智慧 = 100%伤害 |
| 死灵法师 | 智慧 | 800 | 800智慧 = 100%伤害 |
| 游侠 | 敏捷 | 800 | 800敏捷 = 100%伤害 |
| 术士 | 敏捷 | 800 | 800敏捷 = 100%伤害 |

```typescript
// 主属性乘数计算
statMult = 1 + 主属性值 / 换算除数

示例：野蛮人 5000力量
statMult = 1 + 5000 / 900 = 6.56
```

## 二、状态管理架构

### 2.1 Store 划分

```
┌─────────────────────────────────────────┐
│              App.tsx                     │
│  ┌─────────────┬─────────────────────┐  │
│  │DamageStore │    PlanStore        │  │
│  │  伤害计算   │     方案管理         │  │
│  └─────────────┴─────────────────────┘  │
└─────────────────────────────────────────┘
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│  InputPanel     │  │  PlanManager    │
│  ResultPanel    │  │  LoadModal      │
└─────────────────┘  └─────────────────┘
```

### 2.2 DamageStore 设计

```typescript
interface DamageStore {
  // 状态
  inputs: DamageInputs      // 当前输入参数
  result: DamageResult      // 计算结果
  dpsResult: DPSResult      // DPS结果
  steps: StepData[]         // 分解步骤
  
  // 方法
  setInputs(inputs)         // 批量设置输入
  updateInput(key, value)   // 单个更新输入
  addAffix(type, affix)      // 添加词缀
  removeAffix(type, index)  // 删除词缀
  calculateDamage()          // 计算伤害
  calculateDPS()             // 计算DPS
  reset()                    // 重置
}
```

**设计决策**：
- 输入变化自动触发重新计算
- 计算结果存储在Store中，组件直接读取
- 使用Zustand的subscribe监听方案切换

### 2.3 PlanStore 设计

```typescript
interface PlanStore {
  // 状态
  plans: Plan[]             // 方案列表
  activeId: string          // 当前方案ID
  snapshots: Snapshot[]     // 快照列表
  
  // 方案CRUD
  loadPlans()               // 从localStorage加载
  savePlans()               // 保存到localStorage
  newPlan()                 // 新建方案
  clonePlan()               // 复制方案
  deletePlan(id)            // 删除方案
  renamePlan(id, name)      // 重命名
  switchPlan(id)            // 切换方案
  
  // 快照
  takeSnapshot()            // 拍摄快照
  restoreSnapshot(id)       // 恢复快照
  deleteSnapshot(id)       // 删除快照
  
  // 导入导出
  exportPlan(id)            // 导出JSON
  importPlan(file)          // 导入JSON
}
```

**设计决策**：
- 方案数据存储在localStorage，刷新不丢失
- 快照限制最多5个，自动清理旧记录
- 导出文件名为方案名称，方便识别

## 三、数据流设计

### 3.1 输入 → 结果数据流

```
用户输入 ──► InputPanel
                  │
                  ▼
           useDamageStore.inputs
                  │
                  ▼
          calculateDamage()
                  │
                  ▼
          useDamageStore.result
          useDamageStore.dpsResult
          useDamageStore.steps
                  │
                  ▼
             ResultPanel
```

### 3.2 方案切换数据流

```
用户切换方案 ──► PlanManager
                      │
                      ▼
                switchPlan(id)
                      │
                      ▼
             useDamageStore.setInputs(plan.data)
                      │
                      ▼
               触发重新计算
                      │
                      ▼
               更新结果展示
```

### 3.3 快照系统数据流

```
拍摄快照 ──► PlanStore.takeSnapshot()
                    │
                    ▼
            保存到 snapshots 数组
                    │
                    ▼
            同步到 localStorage
                    │
                    ▼
恢复快照 ──► PlanStore.restoreSnapshot(id)
                    │
                    ▼
          用快照数据更新当前方案
                    │
                    ▼
               触发重新计算
```

## 四、组件架构

### 4.1 组件关系图

```
App.tsx
├── Header.tsx              # 顶部导航
├── InputPanel.tsx         # 输入面板
│   ├── 职业选择
│   ├── 基础属性输入
│   ├── A类词缀管理
│   ├── B类词缀管理
│   ├── 独立词缀管理
│   ├── 暴击/易伤/压制
│   └── 怪物减伤
├── ResultPanel.tsx        # 结果面板
│   ├── 最终伤害展示
│   ├── DPS展示
│   └── 伤害分解步骤
├── PlanManager.tsx        # 方案管理
│   ├── 方案列表
│   ├── 快照列表
│   └── 操作按钮
├── BDPanel.tsx           # 参考BD
└── LoadModal.tsx          # 加载弹窗
```

### 4.2 数据传递方式

| 组件关系 | 传递方式 | 说明 |
|----------|----------|------|
| App → InputPanel | Zustand Store | 通过useDamageStore |
| App → ResultPanel | Zustand Store | 通过useDamageStore |
| App → PlanManager | Props + Store | 通过usePlanStore |
| InputPanel → ResultPanel | Zustand Store | 共享状态 |

## 五、持久化设计

### 5.1 localStorage 结构

```typescript
// 方案数据
const STORAGE_KEYS = {
  PLANS: 'd4_s13_v2',        // 方案存储key
  SNAPS: 'd4_s13_snaps'     // 快照存储key
}

// 存储格式
{
  plans: [
    {
      id: 'p123_abc',
      name: '野蛮人旋风斩',
      data: { /* DamageInputs */ }
    }
  ],
  activeId: 'p123_abc'
}
```

### 5.2 数据迁移策略

- 每次保存前验证数据完整性
- 导入时重新生成ID避免冲突
- 提供导出功能作为数据备份

## 六、关键设计决策

### 6.1 为什么选择Zustand？

| 方案 | 优点 | 缺点 |
|------|------|------|
| Redux | 成熟稳定 | 配置繁琐 |
| MobX | 响应式 | 学习曲线 |
| **Zustand** | **轻量简洁、类型友好** | **生态较小** |

**决策**：选择Zustand，因其API简洁且对TypeScript支持良好。

### 6.2 词缀禁用 vs 删除

**问题**：用户想临时排除某个词缀但不想删除数据

**解决方案**：添加`enabled`字段

```typescript
interface AffixItem {
  label: string
  val: number
  enabled: boolean  // 默认true，设为false可临时禁用
}
```

### 6.3 实时计算 vs 按钮计算

**决策**：实时计算（输入即更新）

**优点**：
- 用户体验更流畅
- 无需额外点击
- 配合Store的自动计算，代码简洁

### 6.4 伤害分解步骤

**目的**：让用户理解每一步计算的来源

```typescript
interface StepData {
  icon: string      // 图标
  label: string     // 步骤名称
  note: string      // 计算说明
  mult: string      // 当前乘数
  val: number       // 当前数值
}
```

## 七、扩展性设计

### 7.1 新增职业

在`CLASSES`数组中添加即可：

```typescript
{
  id: 'new_class',
  name: '新职业',
  icon: '🔮',
  stat_label: '主属性',
  stat_div: 800  // 换算除数
}
```

### 7.2 新增词缀类型

在`DamageInputs`接口中添加新字段，并在计算逻辑中集成。

### 7.3 新增计算乘区

按照A/B类词缀的计算逻辑扩展，需要考虑：
- 与现有乘区的叠加顺序
- 是否为分组乘法
- UI展示方式

## 八、性能考虑

### 8.1 计算优化

- 使用`useMemo`缓存计算结果
- 避免不必要的重渲染
- 大数字使用`formatNumber`格式化显示

### 8.2 存储优化

- localStorage有大小限制（约5MB）
- 快照限制5个防止溢出
- 导出功能作为数据备份手段

## 九、多计算器架构

### 9.1 设计目标

支持同时打开多个计算器实例，用于直观对比不同配置下的伤害差异。

### 9.2 架构设计

```
┌─────────────────────────────────────────────────────────────────┐
│                        App.tsx                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Header.tsx                               │ │
│  │  [➕ 加号按钮] - 创建新计算器（最多3个）                       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                  Content Area                               │ │
│  │                                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │ │
│  │  │ 主计算器      │  │ 计算器 B     │  │ 计算器 C     │     │ │
│  │  │ InputPanel   │  │ Calculator   │  │ Calculator   │     │ │
│  │  │ +           │  │ Unit        │  │ Unit        │     │ │
│  │  │ ResultPanel  │  │ (独立状态)  │  │ (独立状态)  │     │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │ │
│  │                                                            │ │
│  │  justifyContent: center (单个) / flex-start (多个)        │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 布局策略

| 计算器数量 | 布局策略 |
|------------|----------|
| 1个 | `justifyContent: center` 居中显示 |
| 2-4个 | `justifyContent: flex-start` 从左排列 |

```tsx
// App.tsx 布局逻辑
<div style={{ 
  justifyContent: totalCalcs === 1 ? 'center' : 'flex-start',
  paddingLeft: totalCalcs > 1 ? '16px' : '0'
}}>
  {/* 计算器内容 */}
</div>
```

### 9.4 CalculatorUnit 组件

独立封装每个新增的计算器实例：

```typescript
interface CalculatorUnitProps {
  title: string           // 计算器标题
  onClose?: () => void    // 关闭回调
  onTitleChange?: (title: string) => void  // 标题修改回调
}
```

**内部状态管理**：
- 每个CalculatorUnit使用独立的useState管理inputs、result、dpsResult
- 独立的localStorage存储空间（`d4_calc_unit_`前缀）
- 完整的输入面板和结果面板

### 9.5 数据隔离策略

| 数据类型 | 主计算器 | 新增计算器 |
|----------|----------|------------|
| 输入数据 | useDamageStore | useState (CalculatorUnit内部) |
| 方案数据 | usePlanStore | 独立localStorage |
| 计算结果 | useDamageStore | useState (CalculatorUnit内部) |
| 保存的方案 | usePlanStore (共用) | d4_calc_unit_* (独立) |

### 9.6 方案管理对比

| 功能 | 主计算器 | 新增计算器 |
|------|----------|------------|
| 保存到 | usePlanStore → localStorage | d4_calc_unit_* |
| 加载 | usePlanStore | d4_calc_unit_* |
| 导出 | JSON文件 | JSON文件 |
| 导入 | JSON文件 | JSON文件 |

### 9.7 核心实现代码

**伤害计算（内嵌于CalculatorUnit）**：
```typescript
const calculateDamage = (inputs: DamageInputs): DamageResult | null => {
  const wpnBase = inputs.wpn1 + inputs.wpn2
  const afterSkill = wpnBase * (inputs.skill_pct / 100)
  const statMult = 1 + inputs.str / cls.stat_div
  const afterStat = afterSkill * statMult
  // ... 更多计算步骤
}
```

**DPS计算**：
```typescript
const calculateDPS = (result: DamageResult, inputs: DamageInputs): DPSResult => {
  const baseDPS = result.finalHit * inputs.aps * inputs.hits
  const avgDPS = baseDPS * (1 - vulnUptime + vulnUptime * 1.2)
  const expectedDPS = avgDPS * (1 - critChance + critChance * 1.5)
  return { baseDPS, avgDPS, expectedDPS, aps, hits, critChance, vulnUptime }
}
```

### 9.8 展开详情功能

伤害分解步骤展示：

```typescript
const renderSteps = () => {
  const steps = buildStepData(result, inputs)
  return (
    <div className="steps-container">
      {steps.map((step, index) => (
        <div key={index} className={`step ${step.isFinal ? 'final' : ''}`}>
          <span>{step.icon}</span>
          <span>{step.label}</span>
          <span>{step.mult}</span>
          <span>{formatNumber(step.val)}</span>
        </div>
      ))}
    </div>
  )
}
```

### 9.9 UI一致性

确保新增计算器与主计算器UI完全一致：

| 元素 | 实现方式 |
|------|----------|
| 标题居中 | `section-header { justifyContent: 'center' }` |
| 按钮居中 | `div { justifyContent: 'center' }` |
| 输入输出结构 | 上下排列（InputPanel → ResultPanel） |
| 颜色主题 | 使用CSS变量 `--d4-*` |

### 9.10 限制条件

- 最多3个新增计算器（总共4个）
- 每个计算器标题可自定义
- 每个计算器可独立关闭
- 计算器关闭后不保存状态
