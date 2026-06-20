# 装备卡片（Tooltip）设计文档

> 版本: v1.5.0
> 更新日期: 2026-06-15

## 1. 概述

装备卡片（Tooltip）是当玩家鼠标悬停在已装备的装备槽位上时显示的详情卡片，提供完整的装备信息展示。

### 设计目标
- 实时显示已装备物品的详细信息
- 根据稀有度显示不同的样式效果
- 展示词缀、威能、宝石、符文等所有装备属性
- 暗黑4游戏风格的信息展示

---

## 2. 功能架构

### 2.1 组件关系

```
EquipmentSlots.tsx          EquipmentTooltip.tsx
┌─────────────────┐        ┌─────────────────────┐
│ 装备槽位列表     │───────▶│ 装备详情卡片        │
│ (renderSlot)    │ hover  │ (Tooltip)          │
│                 │        │                    │
│ - handleMouse   │        │ - 头部信息         │
│   Enter/Leave   │        │ - 词缀列表         │
│ - hoveredSlot   │        │ - 宝石/符文        │
│ - tooltipPos    │        │ - 威能/暗金特效    │
└─────────────────┘        └─────────────────────┘
```

### 2.2 交互流程

```
鼠标进入槽位
    ↓
获取槽位位置 getBoundingClientRect()
    ↓
设置 hoveredSlot + tooltipPosition
    ↓
渲染 EquipmentTooltip 组件
    ↓
显示装备卡片
    ↓
鼠标离开槽位
    ↓
设置 hoveredSlot = null
    ↓
隐藏装备卡片
```

---

## 3. 界面结构

### 3.1 卡片布局

```
┌──────────────────────────────┐  ← 280px 宽度
│  已装备                      │  顶部标签栏 (32px)
├──────────────────────────────┤
│  [图标]  装备名称            │  头部区域
│          先祖暗金 头盔        │  (稀有度+类型)
├──────────────────────────────┤
│  物品强度: 800               │  物品强度
│  需要等级: 70                │
├──────────────────────────────┤
│  +125 护甲                   │  词缀列表
│  +15% 护甲                   │  (绿色显示)
│  +10% 移动速度               │
│  ...                         │
├──────────────────────────────┤
│  插槽                        │  宝石/符文区域
│  ◆ 巨型红宝石 +90 点力量     │  (红色宝石/蓝色符文)
│  ◆ 巨型蓝宝石 +90 点意志力   │
├──────────────────────────────┤
│  ◆ 神话特效                  │  威能/暗金特效
│  [描述文本]                  │  (橙色/紫色边框)
├──────────────────────────────┤
│  需要等级: 70                │  底部信息
│  账号绑定                    │
│  憎恨之王物品                 │
└──────────────────────────────┘
```

### 3.2 位置计算

#### 3.2.1 槽位分类

```typescript
// 左侧装备槽（卡片显示在右边）
const leftSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'weapon1', 'weapon3']

// 武器槽位（卡片从下往上展开）
const weaponSlots = ['weapon1', 'weapon2', 'weapon3', 'weapon4']
```

#### 3.2.2 槽位布局图

```
┌──────────────────────────────────────────────────────────────┐
│                        角色模型                              │
├───────────────────┐              ┌──────────────────────────┐
│      左侧槽位      │              │         右侧槽位         │
│                   │              │                          │
│  头盔 ↓ 卡片居中   │              │ [空]                     │
│  胸甲 ↓ 卡片居中   │              │ 护符 ↓ 卡片居中         │
│  手套 ↓ 卡片居中   │              │ 戒指1 ↓ 卡片居中        │
│  裤子 ↓ 卡片居中   │              │ 戒指2 ↓ 卡片居中        │
│  靴子 ↓ 卡片居中   │              │ [空]                     │
│  weapon1 ↑ 向上    │              │ weapon2 ↑ 向上          │
│  weapon3 ↑ 向上    │              │ weapon4 ↑ 向上          │
│          ↑         │              │          ↑              │
│         卡片       │              │         卡片            │
└───────────────────┘              └──────────────────────────┘
```

#### 3.2.3 位置计算逻辑

```typescript
const isLeftSlot = leftSlots.includes(slot)
const isWeapon = weaponSlots.includes(slot)

// X坐标：左侧槽位显示在右边，右侧槽位显示在左边
const tooltipX = isLeftSlot ? position.x + 100 : position.x - 290

// Y坐标：武器槽位从下往上展开，其他槽位居中显示
const tooltipHeight = 420 // 卡片高度
let tooltipY: number

if (isWeapon) {
  // 武器槽位：从下往上展开（卡片底部对齐槽位底部）
  tooltipY = position.y - tooltipHeight + 90 // 90是槽位高度
} else {
  // 其他槽位：居中显示
  tooltipY = position.y - 100
}

// 确保不会超出屏幕边界
tooltipY = Math.max(10, Math.min(tooltipY, window.innerHeight - tooltipHeight - 10))
```

#### 3.2.4 位置规则总结

| 槽位类型 | X方向 | Y方向 |
|---------|------|------|
| 左侧非武器槽 | 右边 | 居中 |
| 右侧非武器槽 | 左边 | 居中 |
| 武器槽位 | 正常（根据左右） | **从下往上展开** |

---

## 4. 稀有度样式

### 4.1 样式配置

```typescript
const rarityConfig: Record<string, { 
  color: string           // 名称颜色
  border: string          // 边框颜色
  bg: string              // 背景渐变
  effectColor: string     // 特效文字颜色
}> = {
  legendary: { 
    color: 'text-[#ff8000]', 
    border: 'border-[#ff8000]', 
    bg: 'bg-gradient-to-b from-[#2a1a0a] to-[#1a0f05]',
    effectColor: 'text-yellow-600'
  },
  unique: { 
    color: 'text-[#e6cc80]', 
    border: 'border-[#e6cc80]', 
    bg: 'bg-gradient-to-b from-[#2a2210] to-[#1a1608]',
    effectColor: 'text-yellow-600'
  },
  mythic: { 
    color: 'text-purple-400', 
    border: 'border-purple-500', 
    bg: 'bg-gradient-to-b from-[#1a0a2a] to-[#0f051a]',
    effectColor: 'text-purple-400'
  },
  rare: { 
    color: 'text-[#0070dd]', 
    border: 'border-[#0070dd]', 
    bg: 'bg-gradient-to-b from-[#0a1a2a] to-[#050f15]',
    effectColor: 'text-blue-400'
  },
  // ... magic, common
}
```

### 4.2 边框发光效果

```typescript
const getRarityGlow = (slot: EquipmentSlot): string => {
  if (item.itemType === 'mythic') return 'shadow-[0_0_10px_rgba(168,85,247,0.4)]'
  switch (item.rarity) {
    case 'legendary': return 'shadow-[0_0_10px_rgba(255,128,0,0.4)]'
    case 'unique': return 'shadow-[0_0_10px_rgba(230,204,128,0.4)]'
    case 'rare': return 'shadow-[0_0_8px_rgba(0,112,221,0.3)]'
    // ...
  }
}
```

---

## 5. 数据展示

### 5.1 词缀显示

- 绿色文字显示 (`text-green-400`)
- 格式：`[符号][数值][单位] [名称]`
- 符号类型：
  - `+` 加法词缀
  - `x` 乘法词缀（前缀）
  - `[数值]` 后缀

### 5.2 宝石/符文显示

**宝石插槽类型判断：**

```typescript
const weaponSlots = ['weapon', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'mainhand', 'offhand']
const armorSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'shield']
const slotType = weaponSlots.includes(slot) 
  ? 'weapon' 
  : armorSlots.includes(slot) 
    ? 'armor' 
    : 'jewelry'

const gemEffect = slotType === 'weapon' 
  ? gem.weaponEffect 
  : slotType === 'armor' 
    ? gem.armorEffect 
    : gem.jewelryEffect
```

**显示格式：**

| 类型 | 颜色 | 图标 |
|-----|------|-----|
| 宝石 | 红色 (text-red-400) | ◆ 红色方块 |
| 祈告符文 | 紫色 (text-purple-400) | 紫色方块或图标 |
| 仪祭符文 | 金色 (text-yellow-500) | 金色方块或图标 |

**符文分类判断：**

```typescript
const isInvocation = rune.category === 'Invocation'
const textColor = isInvocation ? 'text-purple-400' : 'text-yellow-500'
const bgColor = isInvocation ? 'bg-purple-500/30' : 'bg-yellow-600/30'
```

**符文图标加载：**

```typescript
{rune.icon ? (
  <img
    src={`http://localhost:5175/${rune.icon.replace('./', '')}`}
    alt=""
    className="w-5 h-5 object-contain"
    onError={(e) => {
      // 图标加载失败时显示彩色方块替代
      e.target.style.display = 'none'
    }}
  />
) : (
  <span className={`w-4 h-4 ${bgColor} rounded flex items-center justify-center text-xs ${textColor}`}>◆</span>
)}
```

### 5.3 威能/暗金特效

- 显示区域带分隔线
- 标签显示：
  - 传奇：显示"威能"
  - 暗金：显示"暗金特效"
  - 神话：显示"神话特效"
- 描述文本解析：方括号 `[]` 和 `%` 染成蓝色

```typescript
const parsePowerDescription = (description: string): JSX.Element[] => {
  const parts = description.split(/(\[.*?\]|%)/g)
  return parts.map((part, index) => {
    if (part.match(/^\[.*?\]$/) || part === '%') {
      return <span key={index} className="text-blue-400">{part}</span>
    }
    return <span key={index}>{part}</span>
  })
}
```

---

## 6. 组件接口

### 6.1 Props 定义

```typescript
interface EquipmentTooltipProps {
  slot: EquipmentSlot    // 装备槽位类型
  position: { 
    x: number           // 卡片X坐标
    y: number           // 卡片Y坐标
  }
}
```

### 6.2 数据获取

```typescript
function EquipmentTooltip({ slot, position }: EquipmentTooltipProps) {
  const { equipment } = useEquipmentStore()
  const item = equipment[slot]  // 从store获取装备数据
  
  if (!item) return null  // 无装备不显示
  
  // ... 渲染逻辑
}
```

---

## 7. 状态管理

### 7.1 悬停状态 (EquipmentSlots.tsx)

```typescript
const [hoveredSlot, setHoveredSlot] = useState<EquipmentSlot | null>(null)
const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
```

### 7.2 悬停处理

```typescript
const handleMouseEnter = (e: React.MouseEvent) => {
  if (hasItemFlag) {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({ x: rect.left, y: rect.top })
    setHoveredSlot(slot)
  }
}

const handleMouseLeave = () => {
  setHoveredSlot(null)
}
```

---

## 8. UI样式规范

### 8.1 尺寸规范

| 属性 | 值 |
|-----|-----|
| 卡片宽度 | 280px |
| 边框 | 1px solid #333 |
| 阴影 | `0 0 20px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)` |

### 8.2 颜色规范

| 用途 | 颜色值 | Tailwind |
|-----|-------|----------|
| 背景-深色 | #1a1a1a | bg-[#1a1a1a] |
| 边框-分隔 | #333 | border-[#333] |
| 文字-灰色 | #666 | text-gray-600 |
| 文字-灰400 | #9ca3af | text-gray-400 |
| 词缀-绿色 | #4ade80 | text-green-400 |
| 宝石-红色 | #f87171 | text-red-400 |
| 符文-蓝色 | #60a5fa | text-blue-400 |

### 8.3 神话暗金标识

```typescript
// 顶部标签栏显示三个紫色圆点
{isMythic && (
  <div className="flex items-center gap-1">
    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
  </div>
)}
```

---

## 9. 未来优化方向

1. **卡片位置优化** - 防止超出屏幕边界
2. **动画效果** - 添加淡入淡出动画
3. **对比模式** - 支持拖拽对比两件装备
4. **详情折叠** - 复杂装备支持展开/收起详情
5. **属性计算** - 实时显示属性加成数值
6. **图标优化** - 更好的图标显示和错误处理
