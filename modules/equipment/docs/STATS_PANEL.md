# 属性面板 (StatsPanel) 设计文档

> 属性面板是装备模拟器的核心组件之一，负责展示角色的完整属性数据。

## 📋 目录

1. [组件概述](#1-组件概述)
2. [布局结构](#2-布局结构)
3. [面板分区](#3-面板分区)
4. [属性分类](#4-属性分类)
5. [伤害乘区系统](#5-伤害乘区系统)
6. [悬停计算过程](#6-悬停计算过程)
7. [UI组件设计](#7-ui组件设计)
8. [类型定义](#8-类型定义)

---

## 1. 组件概述

### 基本信息

| 属性 | 值 |
|-----|---|
| 组件名称 | StatsPanel |
| 文件路径 | `src/components/StatsPanel.tsx` |
| 依赖组件 | AttributeTooltip |
| 状态管理 | useEquipmentStore |

### 功能特性

- ✅ 实时显示角色完整属性
- ✅ 属性分组展示（主要属性、战斗属性、防御属性、伤害加成）
- ✅ 鼠标悬停显示属性计算过程
- ✅ 伤害加成计算说明弹窗
- ✅ 装备统计显示

---

## 2. 布局结构

### 整体布局

```
┌──────────────────────────────────┐
│ 📊 属性                          │  ← 面板标题
├──────────────────────────────────┤
│                                  │
│  ┌────────────┐ ┌────────────┐   │
│  │ 💪 力量   │ │ 🔮 敏捷   │   │  ← 主要属性卡片
│  │   480     │ │   320     │   │
│  └────────────┘ └────────────┘   │
│                                  │
│  ┌─────────────────────┐        │
│  │ 🔮 智力            │        │
│  │   280              │        │
│  └─────────────────────┘        │
│                                  │
├──────────────────────────────────┤
│ 战斗属性 ────────────────────── │
│ 攻击速度   +15.5%               │
│ 暴击几率   +8%                  │
│ 暴击伤害   +45%                 │
│ 易伤伤害   +30%                 │
│ 武器伤害   +25%                 │
│                                  │
├──────────────────────────────────┤
│ 防御属性 ────────────────────── │
│ 护甲       +150                 │
│ 抗性       +120                 │
│ 生命值     +8500                │
│                                  │
├──────────────────────────────────┤
│ 伤害加成 ❓──────────────────── │
│ A类加成   +150%                 │  ← 问号图标
│ B类乘区   ×1.80                 │
│ 独立乘区  ×1.50                 │
│                                  │
├──────────────────────────────────┤
│ 装备统计                        │
│ ████████████░░░░ 10/12         │
│ ⭐⭐⭐ 3 个传奇特效             │
│                                  │
└──────────────────────────────────┘
```

### 尺寸规格

| 区域 | 宽度 | 说明 |
|-----|------|------|
| 面板容器 | 180px | 固定宽度 |
| 属性卡片 | ~80px | 主要属性卡片宽度 |
| 列表项 | 100% | 战斗/防御属性宽度 |
| 内边距 | 8px | 面板内边距 |
| 分区间距 | 12px | 各分区之间的间距 |

---

## 3. 面板分区

### 3.1 面板标题

```tsx
<div className="stats-header px-2 py-1.5 border-b border-d4-border bg-gradient-to-r from-d4-card to-d4-dark">
  <span className="text-d4-gold text-[11px] font-bold tracking-wider">📊 属性</span>
</div>
```

**样式特点**：
- 金色渐变文字
- 底部边框分隔
- 紧凑的高度

### 3.2 主要属性区域

```tsx
<div className="stats-section mb-3">
  <div className="section-header">
    <span className="section-title">主要属性</span>
    <span className="section-line"></span>
  </div>
  <div className="stat-grid">
    {/* 力量、敏捷、智力卡片 */}
  </div>
</div>
```

**卡片样式**：

```tsx
<div className="stat-card stat-str cursor-pointer">
  <div className="stat-icon">💪</div>
  <div className="stat-content">
    <div className="stat-label">力量</div>
    <div className="stat-value">480</div>
  </div>
</div>
```

### 3.3 战斗属性区域

```tsx
<div className="stats-section mb-3">
  <div className="section-header">
    <span className="section-title">战斗属性</span>
    <span className="section-line"></span>
  </div>
  <div className="stat-list">
    {/* 攻击速度、暴击几率、暴击伤害、易伤伤害、武器伤害 */}
  </div>
</div>
```

**列表项样式**：

```tsx
<div className="stat-row cursor-pointer hover:bg-d4-card/50 rounded">
  <span className="stat-name">攻击速度</span>
  <span className="stat-value text-[#e74c3c]">+15.5%</span>
</div>
```

### 3.4 防御属性区域

```tsx
<div className="stats-section mb-3">
  <div className="section-header">
    <span className="section-title">防御属性</span>
    <span className="section-line"></span>
  </div>
  <div className="stat-list">
    {/* 护甲、抗性、生命值 */}
  </div>
</div>
```

### 3.5 伤害加成区域

```tsx
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
      {/* 说明内容 */}
    </div>
  )}
  
  <div className="damage-bonus">
    {/* A类加成、B类乘区、独立乘区 */}
  </div>
</div>
```

### 3.6 装备统计区域

```tsx
<div className="stats-section">
  <div className="section-header">
    <span className="section-title">装备统计</span>
    <span className="section-line"></span>
  </div>
  
  {/* 装备进度条 */}
  <div className="flex items-center gap-2 mb-2">
    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-d4-gold/60 to-d4-gold rounded-full"
        style={{ width: `${(stats.equippedCount / 12) * 100}%` }}
      />
    </div>
    <span className="text-xs text-gray-400">{stats.equippedCount}/12</span>
  </div>
  
  {/* 传奇特效计数 */}
  <div className="flex items-center gap-1">
    {Array.from({ length: stats.legendaryEffects }).map((_, i) => (
      <span key={i} className="text-yellow-400 animate-pulse">⭐</span>
    ))}
    <span className="text-xs text-gray-400">
      {stats.legendaryEffects} 个传奇特效
    </span>
  </div>
</div>
```

---

## 4. 属性分类

### 4.1 主要属性

| 属性 | 图标 | 颜色 | 说明 |
|-----|------|------|------|
| 力量 | 💪 | 红色 | 主要属性，影响物理伤害 |
| 敏捷 | 🔮 | 绿色 | 主要属性，影响攻击速度和闪避 |
| 智力 | ✨ | 蓝色 | 主要属性，影响技能伤害 |

**样式代码**：

```tsx
{/* 力量卡片 */}
<div className="stat-card stat-str">
  <div className="stat-icon">💪</div>
  <div className="stat-content">
    <div className="stat-label">力量</div>
    <div className="stat-value text-[#e74c3c]">{stats.strength.toLocaleString()}</div>
  </div>
</div>

{/* 敏捷卡片 */}
<div className="stat-card stat-dex">
  <div className="stat-icon">🔮</div>
  <div className="stat-content">
    <div className="stat-label">敏捷</div>
    <div className="stat-value text-[#2ecc71]">{stats.dexterity.toLocaleString()}</div>
  </div>
</div>

{/* 智力卡片 */}
<div className="stat-card stat-int">
  <div className="stat-icon">✨</div>
  <div className="stat-content">
    <div className="stat-label">智力</div>
    <div className="stat-value text-[#3498db]">{stats.intelligence.toLocaleString()}</div>
  </div>
</div>
```

### 4.2 战斗属性

| 属性 | 颜色 | 默认基础值 | 说明 |
|-----|------|-----------|------|
| 攻击速度 | 红色 (#ff6b6b) | 1.2 APS | 武器攻击速度 |
| 暴击几率 | 金色 (#ffd700) | 5% | 暴击触发几率 |
| 暴击伤害 | 金色 (#ffd700) | 150% | 暴击时的伤害倍率 |
| 易伤伤害 | 橙色 (#ff9500) | 20% | 对易伤目标的额外伤害 |
| 武器伤害 | 红色 (#ff6b6b) | 0% | 武器提供的伤害加成 |

### 4.3 防御属性

| 属性 | 颜色 | 默认基础值 | 说明 |
|-----|------|-----------|------|
| 护甲 | 灰色 | 0 | 物理减伤 |
| 抗性 | 青色 (#4ecdc4) | 300 | 元素抗性 |
| 生命值 | 绿色 (#2ecc71) | 15000 | 角色最大生命值 |

### 4.4 属性值颜色编码

```css
/* 主要属性 */
text-[#e74c3c]  /* 力量 - 红色 */
text-[#2ecc71]  /* 敏捷 - 绿色 */
text-[#3498db]  /* 智力 - 蓝色 */

/* 战斗属性 */
text-[#ff6b6b]  /* 攻击速度、武器伤害 - 红色 */
text-[#ffd700]  /* 暴击几率、暴击伤害 - 金色 */
text-[#ff9500]  /* 易伤伤害 - 橙色 */

/* 防御属性 */
text-[#4ecdc4]  /* 抗性 - 青色 */
text-[#2ecc71]  /* 生命值 - 绿色 */

/* 伤害加成 */
text-[#4ade80]  /* A类加成 - 绿色 */
text-[#a78bfa]  /* B类乘区 - 紫色 */
text-[#f472b6]  /* 独立乘区 - 粉色 */
```

---

## 5. 伤害乘区系统

### 5.1 乘区分类规则

| 乘区类型 | 判断条件 | 计算方式 | 展示格式 |
|---------|---------|---------|---------|
| **A类加成** | 伤害类词缀（排除攻击速度、暴击几率、抗性类） | 加法累加 | `+{数值}%` |
| **B类乘区** | x前缀或multiplicative类型 | 同名词缀相加后再相乘 | `×{数值}` |
| **独立乘区** | 后缀[x]类型 | 各自独立相乘 | `×{数值}` |

### 5.2 伤害类关键词

```typescript
// 包含以下关键词的词缀计入A类加成
const damageKeywords = [
  '伤害', '技能', '易伤', '流血', '燃烧', '冰冻', 
  '中毒', '暗影', '火焰', '冰霜', '闪电', '神圣', '物理'
]

// 以下关键词不计入A类加成
const excludeKeywords = [
  '攻击速度', '暴击几率', '抗性', '抗'
]
```

### 5.3 伤害加成说明弹窗

**触发方式**：点击伤害加成标题旁的问号图标

**弹窗内容**：

```tsx
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
```

**问号图标样式**：

```tsx
<button
  className="ml-1.5 w-4 h-4 rounded-full bg-gray-600/40 hover:bg-gray-600/60 text-gray-400 hover:text-gray-300 text-[10px] font-light flex items-center justify-center transition-colors"
  onClick={() => setShowDamageInfo(!showDamageInfo)}
  title="伤害加成说明"
>
  ?
</button>
```

**样式特点**：
- 圆形灰色背景，40% 透明度
- 尺寸：16×16px
- 悬停时背景变深至 60% 透明度
- 不抢夺注意力，低调设计

### 5.4 乘区展示样式

```tsx
<div className="damage-bonus">
  {/* A类加成 */}
  <div className="bonus-item">
    <span className="bonus-label">A类加成</span>
    <span className="bonus-value text-[#4ade80]">+{stats.additiveDamage}%</span>
  </div>
  
  {/* B类乘区 */}
  <div className="bonus-item">
    <span className="bonus-label">B类乘区</span>
    <span className="bonus-value text-[#a78bfa]">×{stats.multiplicativeDamage.toFixed(2)}</span>
  </div>
  
  {/* 独立乘区 */}
  <div className="bonus-item">
    <span className="bonus-label">独立乘区</span>
    <span className="bonus-value text-[#f472b6]">
      ×{stats.independentDetails.reduce((acc, item) => acc * item.multiplier, 1).toFixed(2)}
    </span>
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
```

---

## 6. 悬停计算过程

### 6.1 功能说明

当鼠标移动到任意属性上时，如果该属性有多个来源，会显示一个悬浮提示框，展示该属性的详细计算过程。

### 6.2 触发条件

- 属性来源（sources）数量 > 1
- 或者属性值 > 基础值

### 6.3 AttributeTooltip 组件

```tsx
function AttributeTooltip({ 
  detail, 
  position 
}: { 
  detail: AttributeDetail | undefined; 
  position: { x: number; y: number } 
}) {
  if (!detail) return null
  
  return (
    <div 
      className="fixed z-[200] bg-[#1a1a1a] border border-d4-border rounded-lg p-3 shadow-xl min-w-[200px] pointer-events-none"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%) translateY(-10px)'
      }}
    >
      <div className="text-d4-gold text-sm font-bold mb-2 border-b border-d4-border pb-1">
        计算过程
      </div>
      <div className="space-y-1 text-xs">
        {detail.sources.map((source, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-400">{source.name}</span>
            <span className={source.type === 'base' ? 'text-gray-500' : 'text-green-400'}>
              {source.type === 'base' ? '' : '+'}{source.value}
            </span>
          </div>
        ))}
        <div className="border-t border-d4-border pt-1 mt-1 flex justify-between items-center">
          <span className="text-d4-gold font-bold">总计</span>
          <span className="text-white font-bold">{detail.totalValue}</span>
        </div>
      </div>
    </div>
  )
}
```

### 6.4 悬停提示展示格式

```
┌──────────────────────────────┐
│       计算过程               │  ← 金色标题，带底部边框
├──────────────────────────────┤
│ 职业基础           400      │  ← 灰色（基础值类型）
│ 头盔（+50力量）    +50      │  ← 绿色（词缀加成类型）
│ 护符（+30力量）    +30      │
│ ──────────────────────────  │  ← 分隔线
│ 总计               480      │  ← 白色加粗
└──────────────────────────────┘
```

### 6.5 样式定位

```tsx
const handleMouseEnter = (detail: AttributeDetail | undefined, e: React.MouseEvent) => {
  if (detail && detail.sources.length > 1) {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      detail,
      x: rect.left + rect.width / 2,  // 水平居中
      y: rect.top                      // 垂直对齐到元素顶部
    })
  }
}
```

**定位规则**：
- `left`: 元素水平中心点
- `top`: 元素顶部
- `transform`: 向上偏移 50% 再向上偏移 10px

### 6.6 支持悬停的属性

| 区域 | 属性 | 悬停支持 |
|-----|------|---------|
| 主要属性 | 力量、敏捷、智力 | ✅ |
| 战斗属性 | 攻击速度、暴击几率、暴击伤害、易伤伤害、武器伤害 | ✅ |
| 防御属性 | 护甲、抗性、生命值 | ✅ |
| 伤害加成 | A类加成、B类乘区、独立乘区 | ✅ |
| 其他属性 | 所有未分类属性 | ✅ |

---

## 7. UI组件设计

### 7.1 面板容器

```css
.stats-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;  /* 暗黑背景 */
}
```

### 7.2 分区标题

```css
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.section-title {
  color: #c9aa71;  /* 金色 */
  font-size: 11px;
  font-weight: bold;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, #c9aa71, transparent);
  margin-left: 8px;
}
```

### 7.3 主要属性卡片

```css
.stat-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #2a2a2a;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.stat-card:hover {
  background: #3a3a3a;
  transform: translateY(-2px);
}

.stat-card.stat-str {
  border-left: 3px solid #e74c3c;  /* 红色边框 */
}

.stat-card.stat-dex {
  border-left: 3px solid #2ecc71;  /* 绿色边框 */
}

.stat-card.stat-int {
  border-left: 3px solid #3498db;  /* 蓝色边框 */
}

.stat-icon {
  font-size: 20px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 10px;
  color: #888;
}

.stat-value {
  font-size: 14px;
  font-weight: bold;
}
```

### 7.4 属性列表项

```css
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.stat-name {
  font-size: 12px;
  color: #888;
}

.stat-value {
  font-size: 12px;
  font-weight: bold;
}
```

### 7.5 伤害加成区域

```css
.damage-bonus {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bonus-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: #2a2a2a;
  border-radius: 4px;
}

.bonus-label {
  font-size: 12px;
  color: #888;
}

.bonus-value {
  font-size: 12px;
  font-weight: bold;
  color: #2ecc71;  /* 绿色 */
}
```

---

## 8. 类型定义

### 8.1 AttributeSource

```typescript
/**
 * 属性来源明细
 */
export interface AttributeSource {
  name: string        // 来源名称（装备名）
  value: number       // 贡献值
  type: 'base' | 'affix' | 'power' // 来源类型
}
```

### 8.2 AttributeDetail

```typescript
/**
 * 属性明细记录
 */
export interface AttributeDetail {
  baseValue: number           // 基础值
  totalValue: number          // 总值
  sources: AttributeSource[]  // 来源列表
}
```

### 8.3 EquipmentStats 扩展

```typescript
export interface EquipmentStats {
  // ... 原有字段
  
  // 伤害加成乘区
  additiveDamage: number           // A区 - 伤害类加法加成
  multiplicativeDamage: number     // B区 - 乘法加成（初始为1）
  independentMultipliers: number[] // 独立乘区 - 后缀[x]
  
  // B类乘区分组信息（同名词缀相加后的结果）
  multiplicativeGroups: {
    name: string        // 词缀名称
    totalValue: number // 该组词缀的总值
    sources: string[]  // 来源装备列表
  }[]
  
  // 独立乘区详细信息（带来源）
  independentDetails: {
    name: string        // 词缀名称
    value: number      // 词缀值
    source: string     // 来源装备
    multiplier: number // 乘数 (1 + value/100)
  }[]
  
  // 属性来源明细（用于悬停显示）
  details: {
    strength?: AttributeDetail
    dexterity?: AttributeDetail
    intelligence?: AttributeDetail
    attackPower?: AttributeDetail
    attackSpeed?: AttributeDetail
    critChance?: AttributeDetail
    critDamage?: AttributeDetail
    vulnerableDamage?: AttributeDetail
    armor?: AttributeDetail
    resistance?: AttributeDetail
    health?: AttributeDetail
    additiveDamage?: AttributeDetail
    multiplicativeDamage?: AttributeDetail
    independentMultiplier?: AttributeDetail
  }
  
  // 装备统计
  equippedCount: number
  legendaryEffects: number
}
```

---

## 附录：完整代码结构

```tsx
// src/components/StatsPanel.tsx

import { useState } from 'react'
import { useEquipmentStore } from '../store/equipmentStore'
import type { AttributeDetail } from '../types/equipment'

// 悬停提示组件
function AttributeTooltip({ detail, position }: { detail: AttributeDetail | undefined; position: { x: number; y: number } }) {
  if (!detail) return null
  
  return (
    <div className="fixed z-[200] bg-[#1a1a1a] border border-d4-border rounded-lg p-3 shadow-xl min-w-[200px] pointer-events-none">
      {/* 提示内容 */}
    </div>
  )
}

function StatsPanel() {
  const { calculateStats } = useEquipmentStore()
  const [tooltip, setTooltip] = useState<{ detail: AttributeDetail | undefined; x: number; y: number } | null>(null)
  const [showDamageInfo, setShowDamageInfo] = useState(false)
  
  const stats = calculateStats()
  
  const handleMouseEnter = (detail: AttributeDetail | undefined, e: React.MouseEvent) => {
    if (detail && detail.sources.length > 1) {
      const rect = e.currentTarget.getBoundingClientRect()
      setTooltip({
        detail,
        x: rect.left + rect.width / 2,
        y: rect.top
      })
    }
  }
  
  const handleMouseLeave = () => {
    setTooltip(null)
  }
  
  return (
    <div className="stats-panel">
      {/* 面板标题 */}
      
      {/* 主要属性 */}
      
      {/* 战斗属性 */}
      
      {/* 防御属性 */}
      
      {/* 伤害加成 */}
      {/* - 问号图标 */}
      {/* - 说明弹窗 */}
      {/* - 乘区展示 */}
      
      {/* 装备统计 */}
      
      {/* 悬停提示 */}
      {tooltip && (
        <AttributeTooltip detail={tooltip.detail} position={{ x: tooltip.x, y: tooltip.y }} />
      )}
    </div>
  )
}

export default StatsPanel
```

---

## 更新历史

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| v1.1 | 2026-06-16 | 同步实际实现：添加武器伤害属性、整合伤害加成区域、添加说明弹窗、优化悬停定位算法 |
| v1.0 | 2026-06-15 | 初始文档创建 |
