# 输入面板文档

## 概述

输入面板 (InputPanel) 是伤害计算器的主要输入区域，包含职业选择、武器伤害、属性配置和词缀管理等功能。

## 组件位置

```
src/components/InputPanel.tsx
```

## 功能结构

### 职业选择

```tsx
<div className="section info-box">
  <span>职业</span>
  <select 
    value={inputs.class_id}
    onChange={(e) => updateInput('class_id', e.target.value)}
    className="d4-select"
  >
    {CLASSES.map(c => (
      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
    ))}
  </select>
</div>
```

**支持职业**：
| ID | 名称 | 图标 | 主属性 | 换算除数 |
|----|------|------|--------|----------|
| barbarian | 野蛮人 | ⚔ | 力量 | 900 |
| druid | 德鲁伊 | 🌿 | 意志 | 800 |
| sorc | 法师 | 🔥 | 智慧 | 800 |
| necro | 死灵法师 | 💀 | 智慧 | 800 |
| rogue | 游侠 | 🗡 | 敏捷 | 800 |
| paladin | 圣骑士 | 🛡 | 力量 | 900 |
| spiritborn | 术士 | 🦅 | 敏捷 | 800 |

### 基础属性区域

```tsx
<div className="section info-box">
  <div className="section-title">基础属性</div>
  {/* 输入项 */}
</div>
```

**包含字段**：

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| 主武器伤害 | number | 3000 | 主要武器的基础伤害 |
| 副武器伤害 | number | 0 | 双持时的副手武器伤害 |
| 攻速 | number | 1.2 | 攻击速度，影响DPS |
| 主属性 | number | 5000 | 根据职业显示不同标签 |
| 技能百分比 | number | 215 | 技能基础伤害系数(%) |

### 词缀区域

#### A类词缀（加法区）

```tsx
<div className="section info-box">
  <div className="section-title">A类词缀（加法区）</div>
  {inputs.affix_a?.map((affix, idx) => (
    <div key={`a-${idx}`} className="affix-row">
      <input 
        type="text" 
        placeholder="词缀名"
        value={affix.label}
        onChange={(e) => handleAffixChange('affix_a', idx, 'label', e.target.value)}
        className="d4-input"
      />
      <input 
        type="number" 
        placeholder="%"
        value={affix.val}
        onChange={(e) => handleAffixChange('affix_a', idx, 'val', parseFloat(e.target.value) || 0)}
        className="d4-input"
      />
      <button onClick={() => removeAffix('affix_a', idx)}>×</button>
    </div>
  ))}
  <button onClick={() => addAffix('affix_a')}>+ 添加词缀</button>
</div>
```

**特性**：
- ✅ 支持添加多条词缀
- ✅ 支持删除词缀
- ✅ 支持禁用词缀（不删除数据）
- ✅ 加法叠加

#### B类词缀（分组乘法区）

```tsx
<div className="section info-box">
  <div className="section-title">B类词缀（分组乘法区）</div>
  {/* 结构同上 */}
</div>
```

**特性**：
- ✅ 同名词缀相加
- ✅ 不同组相乘
- ✅ 分组显示计算结果

#### 独立X词缀（独立乘法区）

```tsx
<div className="section info-box">
  <div className="section-title">独立乘区</div>
  {/* 结构同上 */}
</div>
```

**特性**：
- ✅ 各自独立相乘
- ✅ 传奇威能/套装效果适用

### 暴击区域

```tsx
<div className="section info-box">
  <div className="section-title">暴击</div>
  <div className="input-row">
    <label>暴击率 %</label>
    <input 
      type="number" 
      value={inputs.crit_chance}
      onChange={(e) => updateInput('crit_chance', parseFloat(e.target.value) || 0)}
    />
  </div>
  <div className="input-row">
    <label>启用暴击</label>
    <input 
      type="checkbox"
      checked={inputs.crit_active}
      onChange={(e) => updateInput('crit_active', e.target.checked)}
    />
  </div>
</div>
```

### 易伤区域

```tsx
<div className="section info-box">
  <div className="section-title">易伤</div>
  <div className="input-row">
    <label>易伤加成 %</label>
    <input type="number" value={inputs.vuln_add} />
  </div>
  <div className="input-row">
    <label>启用易伤</label>
    <input type="checkbox" checked={inputs.vuln_active} />
  </div>
  <div className="input-row">
    <label>覆盖率 %</label>
    <input type="number" value={inputs.vuln_uptime} />
  </div>
</div>
```

### 压制区域

```tsx
<div className="section info-box">
  <div className="section-title">压制</div>
  <div className="input-row">
    <label>当前层数</label>
    <input type="number" value={inputs.op_stacks} />
  </div>
  <div className="input-row">
    <label>每层加成 %</label>
    <input type="number" value={inputs.op_stack_add} />
  </div>
</div>
```

### 怪物减伤区域

```tsx
<div className="section info-box">
  <div className="section-title">怪物减伤</div>
  <div className="input-row">
    <label>怪物护甲减伤 %</label>
    <input type="number" value={inputs.monster_dr} />
  </div>
  <div className="input-row">
    <label>应用减伤</label>
    <input type="checkbox" checked={inputs.apply_dr} />
  </div>
</div>
```

## 状态管理

输入面板使用 Zustand store (`useDamageStore`) 管理状态：

```typescript
interface DamageStore {
  inputs: DamageInputs
  updateInput: <K extends keyof DamageInputs>(key: K, value: DamageInputs[K]) => void
  addAffix: (type: 'affix_a' | 'affix_b' | 'multi_leg') => void
  removeAffix: (type: 'affix_a' | 'affix_b' | 'multi_leg', index: number) => void
  // ...
}
```

## 数据流

```
用户输入 → updateInput() → store.inputs 更新 
                             ↓
                      calculateDamage() 
                             ↓
                      store.result 更新
                             ↓
                      ResultPanel 自动渲染
```

## 样式类

| 类名 | 用途 |
|------|------|
| `.section` | 区域容器 |
| `.info-box` | 信息卡片 |
| `.section-title` | 区域标题（金色加粗） |
| `.input-row` | 输入行（flex布局） |
| `.affix-row` | 词缀行（flex布局） |

## 示例数据

默认示例数据（野蛮人）：

```typescript
{
  class_id: 'barbarian',
  wpn1: 3000,
  wpn2: 0,
  aps: 1.2,
  str: 5000,
  skill_pct: 215,
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
```
