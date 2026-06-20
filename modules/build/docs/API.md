# 构筑浏览器 API 文档

## 概述

构筑浏览器提供以下核心函数接口，包含数据加载、筛选排序、导入导出等功能。

---

## 目录

1. [Store方法](#store方法)
2. [数据服务](#数据服务)
3. [存储工具](#存储工具)
4. [类型定义](#类型定义)

---

## Store方法

### 1. useBuildStore.loadBuilds()

加载构筑数据。

**返回值**：Promise<void>

**说明**：
- 从JSON文件加载构筑数据
- 自动更新Store状态

```typescript
await useBuildStore.getState().loadBuilds()
```

### 2. useBuildStore.loadMetadata()

加载元数据。

**返回值**：Promise<void>

**说明**：
- 从JSON文件加载赛季、职业等元数据
- 自动更新Store状态

```typescript
await useBuildStore.getState().loadMetadata()
```

### 3. useBuildStore.setFilters(filters)

设置筛选条件。

**参数**：
- `filters` - 筛选条件对象

```typescript
interface FilterState {
  season: string
  characterClass: string
  sortBy: 'likes' | 'downloads' | 'views' | 'createdAt'
  searchQuery: string
}
```

**返回值**：void

```typescript
useBuildStore.getState().setFilters({
  season: 'S8',
  characterClass: 'barbarian',
  sortBy: 'likes',
  searchQuery: ''
})
```

### 4. useBuildStore.setSelectedBuild(build)

设置当前选中的构筑。

**参数**：
- `build` - 构筑对象或null

**返回值**：void

```typescript
useBuildStore.getState().setSelectedBuild(build)
```

### 5. useBuildStore.exportBuild(build)

导出单个构筑为JSON文件。

**参数**：
- `build` - 构筑对象

**返回值**：void

**说明**：
- 自动下载JSON文件
- 文件名格式：`build-{构筑名称}.json`

```typescript
useBuildStore.getState().exportBuild(build)
```

### 6. useBuildStore.exportAllBuilds()

导出所有构筑为JSON文件。

**返回值**：void

**说明**：
- 自动下载JSON文件
- 文件名格式：`all-builds-{时间戳}.json`

```typescript
useBuildStore.getState().exportAllBuilds()
```

### 7. useBuildStore.getFilteredBuilds()

获取筛选后的构筑列表。

**返回值**：Build[]

**说明**：
- 根据当前筛选条件过滤构筑
- 根据排序条件排序

```typescript
const filteredBuilds = useBuildStore.getState().getFilteredBuilds()
```

---

## 数据服务

### 8. buildService.loadBuilds()

从JSON文件加载构筑数据。

**返回值**：Promise<Build[]>

```typescript
const builds = await buildService.loadBuilds()
```

### 9. buildService.loadMetadata()

从JSON文件加载元数据。

**返回值**：Promise<Metadata>

```typescript
const metadata = await buildService.loadMetadata()
```

### 10. buildService.exportBuild(build)

导出构筑为JSON字符串。

**参数**：
- `build` - 构筑对象

**返回值**：string

```typescript
const json = buildService.exportBuild(build)
```

### 11. buildService.downloadBuild(build)

下载构筑为JSON文件。

**参数**：
- `build` - 构筑对象

**返回值**：void

```typescript
buildService.downloadBuild(build)
```

### 12. buildService.downloadAllBuilds(builds)

下载所有构筑为JSON文件。

**参数**：
- `builds` - 构筑数组

**返回值**：void

```typescript
buildService.downloadAllBuilds(builds)
```

---

## 存储工具

### 13. directImportToEquipment(build)

将构筑导入到装备模拟器。

**参数**：
- `build` - 构筑对象

**返回值**：boolean（成功返回true）

**说明**：
- 通过localStorage与装备模拟器共享数据
- 自动创建新方案
- 自动设置为当前方案

```typescript
import { directImportToEquipment } from './utils/storage'

const success = directImportToEquipment(build)
if (success) {
  console.log('导入成功')
}
```

### 14. getEquipmentSimulatorData()

获取装备模拟器的数据。

**返回值**：object | null

```typescript
import { getEquipmentSimulatorData } from './utils/storage'

const data = getEquipmentSimulatorData()
```

---

## 类型定义

### Build

```typescript
interface Build {
  id: string                    // 构筑唯一标识
  name: string                  // 构筑名称
  author: string                // 作者名称
  authorLevel: number           // 作者等级
  authorRank: number            // 作者天梯排名
  characterClass: CharacterClass // 职业类型
  description: string           // 构筑描述
  season: string                // 赛季
  tags: string[]                // 标签
  playStyle?: string            // 玩法风格
  difficulty?: string           // 难度
  rating?: number               // 评分
  likes: number                 // 点赞数
  downloads: number             // 下载量
  views: number                 // 浏览量
  equipment: Record<EquipmentSlot, EquipmentItem | null> // 装备配置
  skills: Skill[]               // 技能配置
  createdAt: number             // 创建时间
  updatedAt: number             // 更新时间
}
```

### EquipmentSlot

```typescript
type EquipmentSlot = 
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'shield' | 'amulet' | 'ring1' | 'ring2'
```

### CharacterClass

```typescript
type CharacterClass =
  | 'barbarian' | 'necromancer' | 'sorc'
  | 'druid' | 'rogue' | 'spiritborn' | 'paladin' | 'warlock'
```

### EquipmentItem

```typescript
interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  rarity: 'common' | 'magic' | 'rare' | 'legendary' | 'unique'
  level: number
  affixes: Affix[]
  icon?: string
}
```

### Affix

```typescript
interface Affix {
  id: string
  name: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
}
```

### Skill

```typescript
interface Skill {
  id: string
  skillName: string
  slot: string
  icon: string
}
```

### Metadata

```typescript
interface Metadata {
  seasons: string[]
  classes: string[]
}
```

### FilterState

```typescript
interface FilterState {
  season: string
  characterClass: string
  sortBy: 'likes' | 'downloads' | 'views' | 'createdAt'
  searchQuery: string
}
```

---

## 使用示例

### 加载数据

```typescript
import { useBuildStore } from './store/buildStore'

// 在组件中使用
function MyComponent() {
  const { builds, metadata, loadBuilds, loadMetadata } = useBuildStore()
  
  useEffect(() => {
    loadBuilds()
    loadMetadata()
  }, [])
  
  return (
    <div>
      {builds.map(build => (
        <div key={build.id}>{build.name}</div>
      ))}
    </div>
  )
}
```

### 筛选构筑

```typescript
import { useBuildStore } from './store/buildStore'

// 设置筛选条件
useBuildStore.getState().setFilters({
  season: 'S8',
  characterClass: 'barbarian',
  sortBy: 'likes',
  searchQuery: '旋风斩'
})

// 获取筛选结果
const filteredBuilds = useBuildStore.getState().getFilteredBuilds()
```

### 导入到装备模拟器

```typescript
import { directImportToEquipment } from './utils/storage'

function ImportButton({ build }) {
  const handleImport = () => {
    const success = directImportToEquipment(build)
    if (success) {
      alert('导入成功！请在装备模拟器中查看。')
    } else {
      alert('导入失败，请重试。')
    }
  }
  
  return (
    <button onClick={handleImport}>
      导入到装备模拟器
    </button>
  )
}
```

### 导出构筑

```typescript
import { useBuildStore } from './store/buildStore'

// 导出单个构筑
const build = builds[0]
useBuildStore.getState().exportBuild(build)

// 导出所有构筑
useBuildStore.getState().exportAllBuilds()
```

---

## 错误处理

### 数据加载失败

```typescript
try {
  await useBuildStore.getState().loadBuilds()
} catch (error) {
  console.error('加载构筑数据失败:', error)
  // 显示错误提示
}
```

### 导入失败

```typescript
const success = directImportToEquipment(build)
if (!success) {
  // 检查localStorage是否可用
  if (typeof localStorage === 'undefined') {
    console.error('localStorage不可用')
  }
}
```

---

## 注意事项

1. **数据格式**：确保JSON文件格式正确
2. **跨域问题**：开发环境需要配置CORS
3. **localStorage限制**：注意localStorage的容量限制
4. **数据同步**：导入后需要在装备模拟器中刷新页面
