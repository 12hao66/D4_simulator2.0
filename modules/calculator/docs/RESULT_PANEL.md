# 结果面板文档

## 概述

结果面板 (ResultPanel) 展示伤害计算结果，包括伤害分解、DPS计算和步骤详情。

## 组件位置

```
src/components/ResultPanel.tsx
```

## 功能结构

### 伤害展示区域

```tsx
<div className="section info-box result-section">
  <div className="section-title">最终伤害</div>
  {result ? (
    <>
      <div className="result-row">
        <span className="result-label">普通命中</span>
        <span className="result-value">{formatNumber(result.normalHit)}</span>
      </div>
      <div className="result-row">
        <span className="result-label">暴击命中</span>
        <span className="result-value crit">{formatNumber(result.critHit)}</span>
      </div>
      <div className="result-row final">
        <span className="result-label">最终伤害</span>
        <span className="result-value gold">{formatNumber(inputs.apply_dr ? result.finalDisplay : result.finalHit)}</span>
      </div>
    </>
  ) : (
    <div className="result-placeholder">请输入武器伤害</div>
  )}
</div>
```

### DPS展示区域

```tsx
{dpsResult && (
  <>
    <div className="result-divider"></div>
    <div className="result-row">
      <span className="result-label">基础DPS</span>
      <span className="result-value">{formatNumber(dpsResult.baseDPS)}</span>
    </div>
    <div className="result-row">
      <span className="result-label">期望DPS</span>
      <span className="result-value gold">{formatNumber(dpsResult.expectedDPS)}</span>
    </div>
  </>
)}
```

### 伤害分解区域

```tsx
<div className="section info-box">
  <div className="section-title">伤害分解</div>
  {steps.map((step, idx) => (
    <div key={idx} className={`step-row ${step.isFinal ? 'final' : ''}`}>
      <span className="step-icon">{step.icon}</span>
      <span className="step-label">{step.label}</span>
      <span className="step-note">{step.note}</span>
      <span className="step-mult">{step.mult}</span>
    </div>
  ))}
</div>
```

## 数据显示格式

### 伤害数字格式化

```typescript
const formatNumber = (n: number): string => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + ' 亿'
  if (n >= 1e6) return (n / 1e6).toFixed(2) + ' M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + ' K'
  return Math.round(n).toLocaleString()
}
```

**格式化规则**：

| 数值范围 | 格式 | 示例 |
|---------|------|------|
| ≥ 1亿 | X.XX亿 | 1.23亿 |
| ≥ 1百万 | X.XXM | 456.78M |
| ≥ 1千 | X.XK | 789.0K |
| < 1千 | 千分位 | 1,234 |

### 乘数格式化

```typescript
const formatMult = (mult: number): string => {
  return `×${(mult).toFixed(2)}`
}
```

## 伤害计算流程

### 1. 武器基础伤害

```
wpnBase = wpn1 + wpn2
```

### 2. 技能加成

```
afterSkill = wpnBase × skill_pct / 100
```

### 3. 主属性加成

```
statMult = 1 + str / stat_div
afterStat = afterSkill × statMult
```

### 4. A类词缀加成（加法）

```
addTotal = Σ(启用的A类词缀val) + opStackBonus
addMult = 1 + addTotal / 100
afterAdd = afterStat × addMult
```

### 5. B类词缀加成（分组乘法）

```
B类计算逻辑：
1. 同名词缀值相加
2. 各组相乘

示例：
  物理伤害: 22%
  核心技能: 18%
  
结果: (1 + 22/100) × (1 + 18/100) = 1.22 × 1.18 = 1.4396

afterB = afterAdd × bMult
```

### 6. 暴击加成

```
暴击启用时:
critHit = afterB × (1 + 50%)  // 基础暴击伤害+50%

暴击禁用时:
normalHit = critHit = afterB
```

### 7. 易伤加成

```
vulnMult = 1.2 + vuln_add / 100  // 基础20% + 额外加成
afterVuln = (启用暴击 ? critHit : normalHit) × vulnMult
```

### 8. 独立乘区加成

```
legMult = Π(1 + 启用的独立词缀val / 100)

示例：
  传奇威能: 60%
  套装效果: 40%
  
结果: (1 + 60/100) × (1 + 40/100) = 1.6 × 1.4 = 2.24

afterLeg = afterVuln × legMult
```

### 9. 最终伤害

```
finalHit = afterLeg
```

### 10. 怪物减伤（可选）

```
finalDisplay = finalHit × (1 - monster_dr / 100)
```

## DPS计算

### 基础DPS

```
baseDPS = finalHit × aps × hits
```

### 易伤期望

```
vulnExpectation = (1 - vuln_uptime) × 1 + vuln_uptime × 1.2
               = 1 - vuln_uptime + vuln_uptime × 1.2
```

### 暴击期望

```
critExpectation = (1 - crit_chance) × 1 + crit_chance × 1.5
                = 1 - crit_chance + crit_chance × 1.5
```

### 期望DPS

```
expectedDPS = baseDPS × vulnExpectation × critExpectation
```

## 步骤数据结构

```typescript
interface StepData {
  icon: string              // 图标 emoji
  label: string           // 步骤标签
  note: string            // 备注/计算说明
  mult: string            // 当前乘数
  val: number             // 当前数值
  isFinal?: boolean       // 是否为最终步骤
}
```

### 步骤示例

```typescript
const steps: StepData[] = [
  { icon: '⚔', label: '武器伤害', note: '3000 + 0', mult: '', val: 3000 },
  { icon: '🎯', label: '技能加成', note: '× 215%', mult: '×2.15', val: 6450 },
  { icon: '💪', label: '主属性加成', note: '力量6554', mult: '×8.28', val: 53406 },
  { icon: '➕', label: 'A类词缀', note: '+250%', mult: '×3.50', val: 186921 },
  { icon: '✖️', label: 'B类词缀', note: '物伤×1.22 核心×1.18', mult: '×1.44', val: 269167 },
  { icon: '💥', label: '暴击', note: '基础+50%', mult: '×1.50', val: 403751 },
  { icon: '💢', label: '易伤', note: '+20% 覆盖80%', mult: '×1.16', val: 468351 },
  { icon: '⭐', label: '独立乘区', note: '威能×1.6 套装×1.4', mult: '×2.24', val: 1049146 },
  { icon: '🏆', label: '最终伤害', note: '', mult: '', val: 1049146, isFinal: true },
]
```

## 样式定义

### 结果区域

```css
.result-section {
  background: var(--d4-darker);
  border: 2px solid var(--d4-red);
  margin-top: 8px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 2px;
}

.result-row.final {
  background: rgba(165, 9, 5, 0.3);
  border: 1px solid var(--d4-red);
  margin-top: 4px;
}

.result-label {
  color: var(--d4-text);
  font-size: 13px;
}

.result-value {
  font-weight: bold;
  font-size: 14px;
  color: #fff;
}

.result-value.crit {
  color: #ff6b6b;
}

.result-value.gold {
  color: var(--d4-gold);
  font-size: 16px;
}
```

### 伤害分解

```css
.step-row {
  display: flex;
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid var(--d4-border);
  font-size: 13px;
}

.step-row.final {
  background: rgba(165, 9, 5, 0.2);
  color: var(--d4-gold);
  font-weight: bold;
}

.step-icon {
  width: 24px;
  text-align: center;
}

.step-label {
  flex: 1;
}

.step-note {
  flex: 1;
  color: var(--d4-text-secondary);
  font-size: 12px;
}

.step-mult {
  width: 60px;
  text-align: right;
  color: var(--d4-gold);
}
```

## 与其他组件交互

```
InputPanel ──────► damageStore.inputs ──────► calculateDamage()
                                                     │
                                                     ▼
                                               damageStore.result
                                               damageStore.dpsResult
                                               damageStore.steps
                                                     │
                                                     ▼
                                        ResultPanel ◄────── useDamageStore()
```

## 数据源

结果面板从 `useDamageStore` 获取数据：

```typescript
const { inputs, result, dpsResult, steps } = useDamageStore()
```

- `inputs` - 用于判断是否应用减伤
- `result` - 伤害计算结果
- `dpsResult` - DPS计算结果
- `steps` - 伤害分解步骤数据
