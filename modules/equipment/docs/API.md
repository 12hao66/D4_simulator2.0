# 装备模拟器 API 文档

## 概述

装备模拟器提供以下核心函数接口，包含装备管理、数据库操作、数据导入导出等功能。

---

## 目录

1. [核心函数](#核心函数)
2. [方案管理](#方案管理)
3. [数据库操作](#数据库操作)
4. [数据导入导出](#数据导入导出)
5. [数据存储](#数据存储)
6. [类型定义](#类型定义)

---

## 核心函数

### 1. EquipmentSimulator.init()

初始化装备模拟器。

### 2. EquipmentSimulator.selectClass(className)

选择职业。

**参数**：
- `className` - 职业名称（barbarian, necromancer, sorc, druid, rogue, spiritborn, paladin）

### 3. EquipmentSimulator.equipItem(slotId, item)

装备物品到指定槽位。

**参数**：
- `slotId` - 槽位ID（helmet, chest, gloves, pants, boots, weapon1, weapon2, weapon3, weapon4, amulet, ring1, ring2）
- `item` - 装备对象

```javascript
{
  id: 'uuid',
  name: '卓越的头盔',
  slot: 'helmet',
  rarity: 'rare',
  level: 80,
  affixes: [
    { id: 'strength', name: '力量', value: 35, type: 'additive' },
    { id: 'criticalChance', name: '暴击几率', value: 5, type: 'additive' }
  ],
  icon: 'images/icons/helmet.svg'
}
```

### 4. EquipmentSimulator.unequipItem(slotId)

从指定槽位卸下装备。

**参数**：
- `slotId` - 槽位ID

### 5. EquipmentSimulator.getEquippedItems()

获取所有已装备物品。

**返回值**：装备对象列表。

### 6. EquipmentSimulator.calculateStats()

计算当前装备的属性汇总。

**返回值**：
```javascript
{
  attackPower: 1500,
  armor: 800,
  critChance: 25,
  critDamage: 150,
  vulnerableDamage: 30,
  additiveDamage: 120,
  multiplicativeDamage: 1.5,
  strength: 150,
  dexterity: 80,
  intelligence: 60,
  attackSpeed: 15,
  resistance: 50,
  health: 2500,
  equippedCount: 6,
  legendaryEffects: 2
}
```

### 7. EquipmentSimulator.generateRandomItem(slotId, rarity)

生成随机装备。

**参数**：
- `slotId` - 槽位ID
- `rarity` - 稀有度（common, magic, rare, legendary, unique）

**返回值**：装备对象。

---

## 方案管理

### 8. useEquipmentStore.createEmptyBuild()

创建空白方案并自动加载。

**返回值**：void

**说明**：
- 自动生成方案名称（方案1、方案2...）
- 清空所有装备槽位
- 自动设置为当前方案

### 9. useEquipmentStore.duplicateBuild(buildId)

复制当前方案创建变体。

**参数**：
- `buildId` - 要复制的方案ID

**返回值**：void

**说明**：
- 自动生成新方案名称（原始名称+(副本)）
- 复制方案的装备配置
- 复制方案的职业类型
- 自动加载新创建的副本方案
- 适合创建方案变体（如从输出方案创建坦克方案）

**示例**：
```javascript
// 复制"野蛮人输出方案"
useEquipmentStore.getState().duplicateBuild('build-123456')
// 生成"野蛮人输出方案(副本)"，并自动加载
```

### 10. useEquipmentStore.loadBuild(buildId)

加载指定方案。

**参数**：
- `buildId` - 方案ID

**返回值**：void

**说明**：
- 加载方案的装备配置
- 加载方案的职业类型
- 设置为当前方案

### 11. useEquipmentStore.updateBuildName(buildId, name)

重命名方案。

**参数**：
- `buildId` - 方案ID
- `name` - 新名称

**返回值**：void

### 12. useEquipmentStore.deleteBuild(buildId)

删除方案。

**参数**：
- `buildId` - 方案ID

**返回值**：void

**说明**：
- 如果删除的是当前方案，自动清空 `currentBuildId`

### 13. useEquipmentStore.exportBuild(buildId)

导出方案为JSON字符串。

**参数**：
- `buildId` - 方案ID

**返回值**：JSON字符串或null

**说明**：
- 如果导出的是当前正在编辑的方案，使用最新的 `equipment` 状态
- 导出格式包含版本号、方案名称、职业类型、装备配置

### 14. useEquipmentStore.exportBuildAsFile(buildId)

导出方案为JSON文件并下载。

**参数**：
- `buildId` - 方案ID

**返回值**：boolean（成功返回true）

**说明**：
- 文件名格式：`d4-build-{方案名}.json`
- 自动触发浏览器下载

### 15. useEquipmentStore.importBuild(jsonString)

从JSON字符串导入方案。

**参数**：
- `jsonString` - JSON字符串

**返回值**：boolean（成功返回true）

**说明**：
- 自动验证数据格式
- 导入成功后自动加载装备配置和职业
- 生成新的方案ID

### 17. useEquipmentStore.importBuildFromFile(file)

从JSON文件导入方案。

**参数**：
- `file` - File对象

**返回值**：Promise<boolean>（成功返回true）

**说明**：
- 异步读取文件内容
- 自动调用 `importBuild` 方法

---

## 数据库操作

### 17. useDatabaseStore.addEquipment(item)

向数据库添加装备。

**参数**：
- `item` - 装备对象（EquipmentItem类型）

### 18. useDatabaseStore.removeEquipment(id)

从数据库删除装备。

**参数**：
- `id` - 装备ID

### 19. useDatabaseStore.updateEquipment(id, updates)

更新数据库中的装备。

**参数**：
- `id` - 装备ID
- `updates` - 要更新的字段（Partial<EquipmentItem>）

### 20. useDatabaseStore.getEquipmentBySlot(slot)

按槽位筛选装备。

**参数**：
- `slot` - 槽位ID

**返回值**：装备对象数组。

### 21. useDatabaseStore.getEquipmentByRarity(rarity)

按稀有度筛选装备。

**参数**：
- `rarity` - 稀有度

**返回值**：装备对象数组。

### 22. useDatabaseStore.searchEquipment(query)

搜索装备。

**参数**：
- `query` - 搜索关键词

**返回值**：匹配的装备对象数组。

### 23. useDatabaseStore.getSkillsByClass(charClass)

按职业获取技能。

**参数**：
- `charClass` - 职业名称

**返回值**：技能对象数组。

### 24. useDatabaseStore.addBuild(build)

添加Build方案。

**参数**：
- `build` - Build对象

### 25. useDatabaseStore.updateBuild(id, updates)

更新Build方案。

**参数**：
- `id` - Build ID
- `updates` - 要更新的字段

### 26. useDatabaseStore.removeBuild(id)

删除Build方案。

**参数**：
- `id` - Build ID

### 27. useDatabaseStore.getBuildById(id)

获取指定Build方案。

**参数**：
- `id` - Build ID

**返回值**：Build对象或undefined。

### 28. useDatabaseStore.loadMockData()

加载Mock数据到数据库。

### 29. useDatabaseStore.getStats()

获取数据库统计信息。

**返回值**：
```javascript
{
  totalEquipment: 100,
  totalSkills: 50,
  totalParagonNodes: 200,
  totalBuilds: 10
}
```

---

## 数据导入导出

### 21. D2CoreImporter.importFromUrl(url)

从暗黑核URL导入Build。

**参数**：
- `url` - 暗黑核Build分享链接

**返回值**：Build对象或null。

```javascript
const build = await D2CoreImporter.importFromUrl('https://www.d2core.com/d4/planner/xxx');
```

### 22. D2CoreImporter.importFromJson(jsonString)

从JSON字符串导入Build。

**参数**：
- `jsonString` - 暗黑核格式的JSON字符串

**返回值**：Build对象或null。

### 23. D2CoreImporter.importAndSave(url)

导入并保存Build到数据库。

**参数**：
- `url` - 暗黑核Build分享链接

**返回值**：boolean（成功返回true）。

### 24. D2CoreImporter.validateD2CoreFormat(jsonString)

验证暗黑核数据格式。

**参数**：
- `jsonString` - JSON字符串

**返回值**：
```javascript
{
  valid: true,
  errors: []
}
```

### 25. DataExporter.exportBuildToJson(build)

导出Build为JSON字符串。

**参数**：
- `build` - Build对象

**返回值**：JSON字符串。

### 26. DataExporter.downloadBuild(build)

下载Build为JSON文件。

**参数**：
- `build` - Build对象

### 27. DataExporter.downloadAllEquipment(equipment)

下载所有装备数据。

**参数**：
- `equipment` - 装备数组

### 28. DataExporter.convertToD2CoreFormat(build)

转换为暗黑核格式。

**参数**：
- `build` - Build对象

**返回值**：暗黑核格式的JSON字符串。

### 29. DataExporter.downloadAsD2CoreFormat(build)

以暗黑核格式下载Build。

**参数**：
- `build` - Build对象

---

## 数据存储

使用 Zustand + localStorage 存储，键为 `d4-database-storage`。

### 存储结构

```javascript
{
  equipment: [],           // 装备数据库
  skills: [],              // 技能数据库
  paragonNodes: [],        // 巅峰节点数据库
  builds: [],              // Build方案列表
  selectedCharacterClass: 'barbarian'  // 当前职业
}
```

---

## 类型定义

### EquipmentSlot

```typescript
type EquipmentSlot = 
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'amulet' | 'ring1' | 'ring2'
```

### Rarity

```typescript
type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique'
```

### Affix

```typescript
interface Affix {
  id: string
  name: string
  description: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
  category: string
  minValue: number
  maxValue: number
}
```

### EquipmentItem

```typescript
interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  rarity: Rarity
  level: number
  affixes: Affix[]
  legendaryPower?: string
  legendaryPowerDescription?: string
  uniqueEffect?: string
  uniqueEffectDescription?: string
  icon: string
  weaponType?: string
  damageRange?: [number, number]
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
```

### Build

```typescript
interface Build {
  id: string
  name: string
  description: string
  characterClass: CharacterClass
  level: number
  equipment: Record<EquipmentSlot, EquipmentItem | null>
  skills: EquippedSkill[]
  paragon: ParagonBuild
  createdAt: number
  updatedAt: number
}
```

### D2CoreBuild (暗黑核导入格式)

```typescript
interface D2CoreBuild {
  version: string
  character: {
    class: string
    level: number
  }
  equipment: Record<string, D2CoreEquipment | null>
  skills: D2CoreSkill[]
  paragon?: {
    nodes: string[]
  }
}
```