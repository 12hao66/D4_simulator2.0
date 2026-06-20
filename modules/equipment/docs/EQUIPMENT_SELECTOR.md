# 装备选择器设计文档

> 版本: v1.5.0
> 更新日期: 2026-06-15

## 1. 概述

装备选择器是玩家配置装备的核心交互组件，提供直观的弹窗式界面，支持稀有/传奇/暗金三种装备类型的差异化配置。

### 设计目标
- 简化配置流程，移除不必要的字段（核心装备、品质）
- 支持完整的词缀编辑功能
- 支持宝石和符文镶嵌
- 暗金装备从数据库选择并支持修改词缀

---

## 2. 界面结构

### 2.1 主选择器布局

```
┌──────────────────────────────────────┐
│  [×]  选择装备: {槽位名称}    [图标]  │  标题栏
├──────────────────────────────────────┤
│                                      │
│  装备类型: [类型徽章] {中文名称}      │  装备类型（只读）
│                                      │
│  物品强度: [ - ] [输入框] [ + ]      │  物品强度
│                                      │
│  稀有度: ○稀有 ●传奇 ○暗金          │  稀有度选择
│                                      │
│  ┌────────────────────────────────┐  │
│  │ 传奇威能 / 暗金装备（根据模式）  │  │  威能/暗金选择区
│  │ [选择按钮] 未选择/已选名称      │  │
│  └────────────────────────────────┘  │
│                                      │
│  词缀 (3/8) [+选择]                  │  词缀区域
│  ┌────────────────────────────────┐  │
│  │ [位置▼] [数值] [单位▼] [名称]   │  │  词缀卡片
│  │                    [移除]       │  │
│  └────────────────────────────────┘  │
│                                      │
│  自定义词缀 (1/2) [+添加]            │  自定义词缀
│  ┌────────────────────────────────┐  │
│  │ 紫色边框显示                     │  │
│  │ 支持完整的编辑功能               │  │
│  └────────────────────────────────┘  │
│                                      │
│  插槽 (1/2)                          │  插槽区域
│  ┌──────────────┐ ┌──────────────┐  │
│  │ 宝石         │ │ 符文         │  │
│  │ [已选宝石×]  │ │ [已选符文×]  │  │
│  │ [+宝石]      │ │ [+符文]      │  │
│  └──────────────┘ └──────────────┘  │
│                                      │
├──────────────────────────────────────┤
│  [确定]              [移除当前物品]   │  底部按钮
└──────────────────────────────────────┘
```

### 2.2 弹窗类型

| 弹窗类型 | 触发条件 | 功能说明 |
|---------|---------|---------|
| 威能选择 | 传奇/暗金模式下点击选择 | 显示威能列表，支持按类型筛选 |
| 词缀选择 | 点击"+选择" | 显示可选词缀列表 |
| 暗金选择 | 暗金模式下点击选择 | 从数据库选择暗金装备 |
| 自定义词缀 | 点击"+添加" | 添加自定义词缀条目 |
| 宝石选择 | 点击"+宝石" | 从数据库加载宝石列表 |
| 符文选择 | 点击"+符文" | 显示符文列表 |

---

## 3. 稀有度模式

### 3.1 三种模式对比

| 特性 | 稀有(rare) | 传奇(legendary) | 暗金(unique) |
|-----|-----------|----------------|--------------|
| 威能 | ❌ | ✅ | ✅ |
| 暗金装备 | ❌ | ❌ | ✅ |
| 词缀 | ✅ (最多8条) | ✅ (最多8条) | ✅ (可修改) |
| 自定义词缀 | ✅ (最多2条) | ✅ (最多2条) | ✅ (最多2条) |
| 宝石/符文 | ✅ | ✅ | ✅ |

### 3.2 模式切换
- 切换稀有度时自动清空：威能、暗金装备、词缀
- 保留：自定义词缀、宝石、符文

---

## 4. 词缀系统

### 4.1 词缀配置项

| 字段 | 类型 | 可选值 | 说明 |
|-----|------|-------|------|
| 位置(position) | select | additive/prefix/suffix | + / x前缀 / 后缀[x] |
| 数值(value) | number | 任意数字 | 词缀数值 |
| 单位(unit) | select | % / 点 | 数值单位 |
| 名称(name) | text | 任意字符串 | 词缀显示名称 |

### 4.2 词缀多选功能

- 词缀选择弹窗支持**多选**（复选框形式）
- 点击词缀切换选中状态，选中项高亮显示
- 底部"确认添加"按钮，批量添加选中的词缀
- 超出8条限制时自动截断
- 已添加的词缀显示灰色（不可重复添加）
- 待添加的词缀显示"待添加"标签

### 4.3 格式显示函数

```typescript
const formatAffix = (affix: ConfiguredAffix): string => {
  const symbol = affix.calculationType === 'additive' ? '+' : '×'
  return `${symbol}${affix.value}${affix.unit} ${affix.name}`
}
```

### 4.4 词缀计算类型与符号显示

#### 4.4.1 计算类型定义

| 计算类型 | calculationType | 显示符号 | 说明 |
|---------|----------------|---------|------|
| 加法 | `additive` | `+` | 多个词缀加法累加 |
| 乘法 | `multiplicative` | `×` | 同名词缀合并后相乘 |
| 独立乘区 | `independent` | `×` + `[x]` 后缀 | 各自独立相乘 |

#### 4.4.2 数据流向

```
词缀JSON (calculationType: "multiplicative")
    ↓
词缀选择弹窗 (显示 ×50% 暴击伤害增倍)
    ↓
确认添加词缀 (传递 calculationType)
    ↓
词缀列表 (显示 ×26% 暴击伤害增倍)
    ↓
确认装备 (保存 calculationType 到 equipmentItem.affixes)
    ↓
装备槽卡片 (显示 ×26% 暴击伤害增倍)
```

#### 4.4.3 关键代码位置

| 环节 | 文件 | 函数/位置 |
|-----|------|---------|
| 词缀类型定义 | `types/equipment.ts` | `interface Affix` |
| 词缀选择弹窗显示 | `EquipmentSelectorNew.tsx` | 词缀列表渲染 |
| 确认添加词缀 | `EquipmentSelectorNew.tsx` | `onClick` 确认添加按钮 |
| 确认装备保存 | `EquipmentSelectorNew.tsx` | `handleConfirm` |
| 装备槽显示 | `EquipmentTooltip.tsx` | 词缀渲染区域 |

#### 4.4.4 确认装备时的词缀数据结构

```typescript
affixes: allAffixes.map(a => ({
  id: a.id,
  name: a.name,
  value: a.value,
  unit: a.unit,
  type: a.calculationType || 'additive',      // 兼容旧字段
  position: a.position,                        // 位置类型
  calculationType: a.calculationType || 'additive'  // 计算类型
}))
```

### 4.5 自定义词缀
- 紫色边框显示（border-purple-500/50）
- 最多添加2条
- 完整编辑功能与普通词缀相同

---

## 5. 宝石和符文系统

### 5.1 宝石数据来源
- 从数据库 `http://localhost:5175/data/gems.json` 动态加载
- 数据结构：
```typescript
interface Gem {
  id: string
  name: string           // 宝石名称（巨型红宝石）
  type: string            // 类型（ruby）
  icon?: string           // 图标路径
  weaponEffect?: string   // 武器效果
  armorEffect?: string    // 防具效果
  jewelryEffect?: string  // 首饰效果
  requiredLevel?: number  // 需要等级
}
```

### 5.2 插槽类型判断
```typescript
const getSlotGemType = (slot: string): 'weapon' | 'armor' | 'jewelry' => {
  const weaponSlots = ['weapon', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'mainhand', 'offhand']
  const armorSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'shield']
  
  if (weaponSlots.includes(slot)) return 'weapon'
  if (armorSlots.includes(slot)) return 'armor'
  return 'jewelry'
}
```

### 5.3 效果显示规则

| 插槽类型 | 使用的效果字段 | 示例 |
|---------|--------------|------|
| 武器 | weaponEffect | x24% 火焰与神圣伤害增倍 |
| 防具 | armorEffect | +90 点力量 |
| 首饰 | jewelryEffect | +2,625 点火焰抗性 |

### 5.4 符文数据
- 从数据库 `http://localhost:5175/data/runes.json` 动态加载
- 数据结构：
```typescript
interface Rune {
  id: string
  name: string           // 符文名称（中文）
  nameEn?: string        // 英文名称
  type?: string          // 类型
  category?: string      // Invocation(祈告符文) / Supplication(仪祭符文)
  icon?: string          // 图标路径
  effects?: string[]     // 效果描述数组
  obtainedFrom?: string  // 获得方式
  runeWordDesc?: string  // 符文之语描述
}
```

### 5.5 符文分类样式

| 分类 | category值 | 颜色 | Tailwind | 说明 |
|-----|-----------|------|----------|------|
| 祈告符文 | Invocation | 紫色 | text-purple-400 | 紫色边框、紫色标签 |
| 仪祭符文 | Supplication | 金色 | text-yellow-500 | 金色边框、金色标签 |

### 5.6 符文选择弹窗
- 显示符文图标、中文名称、英文名称、分类标签
- 根据分类显示不同颜色和边框
- 显示符文效果描述（effects[0]）

### 5.7 互斥规则
- 宝石和符文**独立选择**，系统不强制互斥
- 用户自行决定如何搭配使用

### 5.8 数据加载机制

词缀选择器中的数据加载采用**分层存储架构**：

#### 系统数据加载（从服务器 JSON）
```typescript
const loadData = async () => {
  // 每次刷新从服务器加载最新数据
  const affixesRes = await fetch(getDatabaseDataUrl('affixes.json'))
  const legendaryPowersRes = await fetch(getDatabaseDataUrl('legendary-powers.json'))
  const uniqueEquipmentRes = await fetch(getDatabaseDataUrl('uniqueEquipment.json'))
  // ...
}
```

**加载的 JSON 文件**：

| 文件 | 说明 | 加载频率 |
|------|------|---------|
| `affixes.json` | 词缀数据 | 每次刷新 |
| `legendary-powers.json` | 传奇威能数据 | 每次刷新 |
| `uniqueEquipment.json` | 暗金装备数据 | 每次刷新 |
| `gems.json` | 宝石数据 | 每次刷新 |
| `runes.json` | 符文数据 | 每次刷新 |

#### 自定义数据加载（从 localStorage）
```typescript
// 加载数据库模块保存的自定义词缀
const customData = localStorage.getItem('d4-custom-data')
const customAffixes = JSON.parse(customData).customAffixes || []
```

**localStorage Key**：`d4-custom-data`

#### 数据合并流程
```
服务器 JSON 词缀
    ↓
合并 localStorage 自定义词缀
    ↓
去重（避免重复 ID）
    ↓
显示完整词缀列表
```

**优势**：
- ✅ 基础词缀永远是最新版本
- ✅ 用户自定义词缀不会丢失
- ✅ 无需手动清除缓存

---

## 6. 数据模型

### 6.1 组件状态

```typescript
// 稀有度类型
type RarityType = 'rare' | 'legendary' | 'unique'

// 弹窗类型
type ModalType = 'power' | 'affix' | 'unique' | 'custom' | 'gem' | 'rune' | null

// 组件内部状态
const [rarityType, setRarityType] = useState<RarityType>('legendary')  // 默认传奇
const [itemPower, setItemPower] = useState(900)
const [pendingAffixSelections, setPendingAffixSelections] = useState<Affix[]>([]) // 待确认的词缀多选
const [selectedUnique, setSelectedUnique] = useState<UniqueEquipment | null>(null)
const [selectedPower, setSelectedPower] = useState<LegendaryPower | null>(null)
const [selectedAffixes, setSelectedAffixes] = useState<ConfiguredAffix[]>([])
const [customAffixes, setCustomAffixes] = useState<ConfiguredAffix[]>([])
const [selectedGems, setSelectedGems] = useState<(Gem | null)[]>([null, null])
const [selectedRunes, setSelectedRunes] = useState<(Rune | null)[]>([null, null])
const [activeModal, setActiveModal] = useState<ModalType>(null)
```

### 6.2 装备保存结构

```typescript
const equipmentItem: EquipmentItem = {
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
    type: 'additive' as const,
    position: a.position
  })),
  gems: selectedGems.filter(g => g !== null),
  runes: selectedRunes.filter(r => r !== null),
  icon: selectedUnique?.icon || slotIcons[slot] || ''
}

// 暗金额外字段
if (rarityType === 'unique' && selectedUnique) {
  equipmentItem.rarity = 'unique'
  equipmentItem.itemType = selectedUnique.itemType
  equipmentItem.uniqueEffect = selectedUnique.uniqueEffects.map(e => e.description).join('\n')
}

// 威能额外字段
if ((rarityType === 'legendary' || rarityType === 'unique') && selectedPower) {
  equipmentItem.legendaryPower = selectedPower.name
  equipmentItem.legendaryPowerDescription = selectedPower.description
}
```

---

## 7. 威能筛选系统

### 7.1 威能类型标签

```typescript
const powerTypes = [
  { key: 'defense', label: '防御' },
  { key: 'offense', label: '攻击' },
  { key: 'utility', label: '机动' },
  { key: 'resource', label: '资源' },
  { key: 'mobility', label: '通用' },
  { key: 'weapon', label: '武器' },
]
```

### 7.2 筛选逻辑

```typescript
const filteredPowers = selectedType
  ? legendaryPowers.filter(p => p.powerType === selectedType)
  : legendaryPowers
```

---

## 8. UI样式规范

### 8.1 布局宽度
- 主选择器: `max-w-2xl` (672px+)
- 子弹窗: `max-w-4xl` (896px+)

### 8.2 颜色规范

| 用途 | 颜色 | Tailwind类 |
|-----|------|-----------|
| 稀有度-稀有 | 蓝色 | text-[#0070dd] |
| 稀有度-传奇 | 橙色 | text-[#ff8000] |
| 稀有度-暗金 | 金色 | text-[#e6cc80] |
| 词缀-普通 | 绿色 | text-green-400 |
| 词缀-自定义 | 紫色 | text-purple-400 / border-purple-500/50 |
| 宝石 | 红色 | text-red-400 / border-red-500/50 |
| 符文 | 蓝色 | text-blue-400 / border-blue-500/50 |
| 背景-深色 | #1a1a1a | bg-[#1a1a1a] |
| 边框-分隔 | #333 | border-[#333] |

### 8.3 字体规范
- 标题: 14px bold
- 标签: 12px
- 输入: 14px
- 按钮: 14px bold

---

## 9. 组件接口

```typescript
interface EquipmentSelectorProps {
  slot: EquipmentSlot  // 装备槽位类型
}
```

---

## 10. 未来优化方向

1. **符文数据库化** - 将符文数据移至数据库动态加载
2. **宝石等级选择** - 支持选择不同等级的宝石
3. **词缀模板** - 保存常用词缀配置为模板
4. **批量编辑** - 支持复制粘贴词缀配置
5. **装备对比** - 支持对比两件装备的差异
