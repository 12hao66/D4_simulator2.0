# 数据库管理 API 文档

## 概述

数据库管理模块提供游戏数据的增删改查操作接口，使用 Zustand 状态管理实现本地持久化。

---

## 目录

1. [核心类型](#核心类型)
2. [状态管理接口](#状态管理接口)
3. [数据导入导出](#数据导入导出)
4. [存储结构](#存储结构)

---

## 核心类型

### EquipmentSlot

```typescript
type EquipmentSlot = 
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'amulet' | 'ring1' | 'ring2'
```

### CharacterClass

```typescript
type CharacterClass = 'barbarian' | 'necromancer' | 'sorc' | 'druid' | 'rogue' | 'spiritborn' | 'paladin'
```

### UniqueEquipment

```typescript
interface UniqueEquipment {
  id: string
  name: string
  slot: EquipmentSlot
  description: string
  level: number
  affixes: UniqueAffix[]
  uniqueEffects: UniqueEffect[]
  icon: string
}

interface UniqueAffix {
  id: string
  name: string
  value: number
  unit: string
  description: string
}

interface UniqueEffect {
  id: string
  name: string
  description: string
  condition?: string
}
```

### LegendaryPower

```typescript
interface LegendaryPower {
  id: string
  name: string
  description: string
  type: string  // 'all' | 'barbarian' | 'necromancer' | 'sorc' | 'druid' | 'rogue' | 'spiritborn' | 'paladin'
  icon: string
}
```

### Affix

```typescript
interface Affix {
  id: string
  name: string
  category: string  // 'primary' | 'offense' | 'defense' | 'utility'
  calculationType: 'additive' | 'multiplicative'
  minValue: number
  maxValue: number
  unit: string
  description: string
  applicableSlots: EquipmentSlot[]
}
```

### Skill

```typescript
interface Skill {
  id: string
  name: string
  description: string
  type: 'active' | 'passive' | 'ultimate' | 'basic'
  category: 'offense' | 'defense' | 'utility' | 'mobility'
  damageType: 'physical' | 'fire' | 'cold' | 'lightning' | 'poison' | 'shadow' | 'arcane'
  characterClass: CharacterClass
  skillTree: string
  skillTreePath: string[]
  maxRank: number
  baseCooldown?: number
  baseResourceCost?: number
  damageCoefficient?: number
  effects: SkillEffect[]
  icon: string
}

interface SkillEffect {
  id: string
  name: string
  description: string
}
```

### Amulet

```typescript
interface Amulet {
  id: string
  name: string
  description: string
  level: number
  rarity: Rarity
  affixes: AmuletAffix[]
  legendaryPower?: LegendaryPower
  icon: string
}

interface AmuletAffix {
  id: string
  name: string
  value: number
  unit: string
}
```

### CraftingMaterial

```typescript
interface CraftingMaterial {
  id: string
  name: string
  type: string
  rarity: Rarity
  description: string
  icon: string
}
```

### Rune

```typescript
interface Rune {
  id: string
  name: string
  description: string
  type: string  // 'offense' | 'defense' | 'utility'
  effects: RuneEffect[]
  icon: string
}

interface RuneEffect {
  id: string
  name: string
  value: number
  unit: string
}
```

### Gem

```typescript
interface Gem {
  id: string
  name: string
  type: string  // 'ruby' | 'topaz' | 'emerald' | 'sapphire' | 'amethyst' | 'diamond'
  level: number
  effects: GemEffect[]
  icon: string
}

interface GemEffect {
  id: string
  name: string
  value: number
  unit: string
  slot: 'weapon' | 'armor'
}
```

### DatabaseStats

```typescript
interface DatabaseStats {
  totalUniqueEquipment: number
  totalLegendaryPowers: number
  totalAffixes: number
  totalSkills: number
  totalAmulets: number
  totalCraftingMaterials: number
  totalRunes: number
  totalGems: number
}
```

---

## 状态管理接口

### useDatabaseStore

使用 Zustand 创建的状态管理 Hook，提供以下方法：

#### 暗金装备操作

```typescript
// 添加暗金装备
addUniqueEquipment: (item: UniqueEquipment) => void

// 更新暗金装备
updateUniqueEquipment: (id: string, updates: Partial<UniqueEquipment>) => void

// 删除暗金装备
deleteUniqueEquipment: (id: string) => void
```

#### 威能操作

```typescript
// 添加威能
addLegendaryPower: (power: LegendaryPower) => void

// 更新威能
updateLegendaryPower: (id: string, updates: Partial<LegendaryPower>) => void

// 删除威能
deleteLegendaryPower: (id: string) => void
```

#### 词缀操作

```typescript
// 添加词缀
addAffix: (affix: Affix) => void

// 更新词缀
updateAffix: (id: string, updates: Partial<Affix>) => void

// 删除词缀
deleteAffix: (id: string) => void
```

#### 技能操作

```typescript
// 添加技能
addSkill: (skill: Skill) => void

// 更新技能
updateSkill: (id: string, updates: Partial<Skill>) => void

// 删除技能
deleteSkill: (id: string) => void
```

#### 护身符操作

```typescript
// 添加护身符
addAmulet: (amulet: Amulet) => void

// 更新护身符
updateAmulet: (id: string, updates: Partial<Amulet>) => void

// 删除护身符
deleteAmulet: (id: string) => void
```

#### 制作材料操作

```typescript
// 添加制作材料
addCraftingMaterial: (material: CraftingMaterial) => void

// 更新制作材料
updateCraftingMaterial: (id: string, updates: Partial<CraftingMaterial>) => void

// 删除制作材料
deleteCraftingMaterial: (id: string) => void
```

#### 符文操作

```typescript
// 添加符文
addRune: (rune: Rune) => void

// 更新符文
updateRune: (id: string, updates: Partial<Rune>) => void

// 删除符文
deleteRune: (id: string) => void
```

#### 宝石操作

```typescript
// 添加宝石
addGem: (gem: Gem) => void

// 更新宝石
updateGem: (id: string, updates: Partial<Gem>) => void

// 删除宝石
deleteGem: (id: string) => void
```

#### 统计与数据加载

```typescript
// 获取统计信息
getStats: () => DatabaseStats

// 加载Mock数据
loadMockData: () => void
```

---

## 数据导入导出

### Mock数据

模块内置完整的Mock数据，包含：
- 3件暗金装备示例
- 5个威能示例
- 10个词缀示例
- 5个技能示例
- 2个护身符示例
- 5种制作材料示例
- 3个符文示例
- 6种宝石示例

### 数据加载

```typescript
// 在组件中使用
const { loadMockData } = useDatabaseStore();

// 加载Mock数据（通常在App初始化时调用）
loadMockData();
```

---

## 存储结构

使用 Zustand + localStorage 持久化存储，存储键为 `d4-database-manager`。

### 存储数据结构

```typescript
{
  uniqueEquipment: UniqueEquipment[]    // 暗金装备列表
  legendaryPowers: LegendaryPower[]     // 威能列表
  affixes: Affix[]                      // 词缀列表
  skills: Skill[]                       // 技能列表
  amulets: Amulet[]                     // 护身符列表
  craftingMaterials: CraftingMaterial[] // 制作材料列表
  runes: Rune[]                         // 符文列表
  gems: Gem[]                           // 宝石列表
}
```

### 数据持久化

状态管理使用 Zustand 的 `persist` 中间件，自动将数据同步到 localStorage：

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDatabaseStore = create<DatabaseStore>()(persist((set, get) => ({
  // ... 状态和方法
}), {
  name: 'd4-database-manager'  // localStorage 键名
}));
```

---

## 使用示例

### 在组件中使用

```tsx
import { useDatabaseStore } from './store/databaseStore';

function MyComponent() {
  const { 
    uniqueEquipment, 
    addUniqueEquipment, 
    deleteUniqueEquipment,
    getStats 
  } = useDatabaseStore();
  
  const stats = getStats();
  
  return (
    <div>
      <h2>暗金装备 ({stats.totalUniqueEquipment})</h2>
      <ul>
        {uniqueEquipment.map(item => (
          <li key={item.id}>
            {item.icon} {item.name}
            <button onClick={() => deleteUniqueEquipment(item.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```