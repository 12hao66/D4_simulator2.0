# 伤害计算器 API 文档

## 概述

伤害计算器提供以下核心函数接口。

## 核心函数

### 1. calculateDamage(data)

计算最终伤害值。

**参数**：
```javascript
{
  class: 'barbarian',          // 职业
  weaponDamage: [100, 200],    // 武器伤害范围
  attackSpeed: 1.0,            // 攻击速度
  skillMultiplier: 1.5,        // 技能系数
  mainStat: 500,               // 主属性值
  aZone: {                     // A类区加成
    damage: 0.3,
    skillDamage: 0.2
  },
  bZone: {                     // B类区加成（分组）
    '暗黑伤害': 0.4,
    '物理伤害': 0.2
  },
  independentX: {              // 独立X加成
    criticalDamage: 1.5,
    vulnerableDamage: 1.2
  },
  criticalChance: 0.3,         // 暴击几率
  vulnerableChance: 0.8        // 易伤几率
}
```

**返回值**：
```javascript
{
  baseDamage: 150,             // 基础伤害
  aZone: 1.5,                  // A类区总加成
  bZone: 1.72,                 // B类区总加成
  independentX: 1.8,           // 独立X总加成
  criticalExpectation: 1.45,   // 暴击期望
  vulnerableExpectation: 1.16, // 易伤期望
  finalDamage: 658.2           // 最终伤害
}
```

### 2. getClassConfig(className)

获取职业配置。

**参数**：
- `className` - 职业名称（barbarian, sorcerer, rogue, druid, necromancer, paladin, monk）

**返回值**：职业配置对象。

### 3. saveScheme(scheme)

保存方案到本地存储。

**参数**：
```javascript
{
  id: 'uuid',
  name: '野蛮人旋风斩',
  class: 'barbarian',
  data: {...}  // 计算数据
}
```

### 4. loadScheme(id)

从本地存储加载方案。

**参数**：
- `id` - 方案ID

**返回值**：方案对象。

### 5. deleteScheme(id)

删除方案。

**参数**：
- `id` - 方案ID

## 数据存储

使用 LocalStorage 存储，键前缀为 `d4_simulator_`。

### 存储结构

```javascript
{
  schemes: [],      // 方案列表
  config: {},       // 配置
  currentScheme: '' // 当前方案ID
}
```