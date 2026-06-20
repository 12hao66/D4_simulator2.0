# 构筑浏览器 设计文档

> Diablo IV Build Browser Design Document

## 1. 系统概述

### 1.1 项目目标
为暗黑破坏神4玩家提供一个构筑方案浏览工具，展示天梯玩家的顶级装备配置，支持导入到装备模拟器进行编辑。

### 1.2 核心特性
- **构筑浏览**：展示天梯玩家的装备配置方案
- **筛选排序**：按赛季、职业筛选，支持多种排序方式
- **详情展示**：完整的构筑信息、技能配置、装备详情
- **跨模块协作**：一键导入到装备模拟器
- **数据维护**：JSON文件存储，便于更新

### 1.3 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

---

## 2. 架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                       UI Layer                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │              BuildBrowser                         │   │
│  │  - 筛选栏（赛季、职业、排序）                      │   │
│  │  - 构筑卡片网格                                    │   │
│  │  - 搜索框                                          │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              BuildDetailModal                     │   │
│  │  - 左侧：构筑信息、技能配置                        │   │
│  │  - 右侧：装备列表、装备详情                        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │           useBuildStore (Zustand)                 │   │
│  │  - builds: Build[]                                │   │
│  │  - metadata: Metadata                             │   │
│  │  - filters: FilterState                           │   │
│  │  - selectedBuild: Build | null                    │   │
│  │  - loading: boolean                               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │           buildService                            │   │
│  │  - loadBuilds()                                   │   │
│  │  - loadMetadata()                                 │   │
│  │  - exportBuild(build)                             │   │
│  │  - exportAllBuilds()                              │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │           JSON Files                              │   │
│  │  - public/data/builds.json                        │   │
│  │  - public/data/metadata.json                      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Storage Layer                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              localStorage                         │   │
│  │  Key: equipment-simulator-storage                │   │
│  │  (与装备模拟器共享)                               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
modules/build/
├── public/
│   └── data/
│       ├── builds.json     # 构筑数据
│       └── metadata.json   # 元数据
├── src/
│   ├── types/              # 类型定义
│   │   ├── index.ts        # 主类型定义
│   │   └── ladder.ts       # 天梯相关类型
│   ├── store/              # 状态管理
│   │   └── buildStore.ts
│   ├── services/           # 数据服务
│   │   └── buildService.ts
│   ├── utils/              # 工具函数
│   │   └── storage.ts
│   ├── components/         # UI组件
│   │   ├── BuildBrowser.tsx
│   │   └── BuildDetailModal.tsx
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口
│   └── index.css           # 全局样式
├── docs/                   # 文档
│   ├── DESIGN.md           # 设计文档（本文档）
│   ├── README.md           # 模块说明
│   ├── API.md              # API文档
│   └── CHANGELOG.md        # 更新日志
└── package.json
```

---

## 3. 数据模型设计

### 3.1 核心类型定义

#### 3.1.1 构筑数据
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

#### 3.1.2 装备槽位
```typescript
type EquipmentSlot =
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'shield' | 'amulet' | 'ring1' | 'ring2'
```

#### 3.1.3 职业类型
```typescript
type CharacterClass =
  | 'barbarian' | 'necromancer' | 'sorc'
  | 'druid' | 'rogue' | 'spiritborn' | 'paladin' | 'warlock'
```

#### 3.1.4 装备物品
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

#### 3.1.5 词缀
```typescript
interface Affix {
  id: string
  name: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
}
```

#### 3.1.6 技能
```typescript
interface Skill {
  id: string
  skillName: string
  slot: string
  icon: string
}
```

### 3.2 数据流设计

#### 3.2.1 数据加载流程
```
应用启动
    ↓
buildService.loadMetadata()
    ↓
buildService.loadBuilds()
    ↓
更新 Store (setBuilds, setMetadata)
    ↓
渲染构筑列表
```

#### 3.2.2 筛选排序流程
```
用户操作 → 更新 filters → 计算过滤结果 → 渲染更新
    ↓           ↓              ↓             ↓
选择赛季  setFilters    filterBuilds()   显示结果
```

#### 3.2.3 导入到装备模拟器流程
```
点击"导入到我的方案"
    ↓
directImportToEquipment(build)
    ↓
写入 localStorage
    ↓
装备模拟器读取数据
```

---

## 4. 组件设计

### 4.1 BuildBrowser 组件

**职责**：
- 展示构筑列表
- 提供筛选和排序功能
- 处理搜索

**状态**：
```typescript
const {
  builds,
  metadata,
  filters,
  setFilters,
  selectedBuild,
  setSelectedBuild
} = useBuildStore()
```

**子组件**：
- 筛选栏（赛季、职业、排序选择器）
- 搜索框
- 构筑卡片网格
- 详情弹窗

### 4.2 BuildDetailModal 组件

**职责**：
- 展示构筑完整信息
- 展示技能配置
- 展示装备配置和详情
- 提供导入和导出功能

**布局**：
```
┌─────────────────────────────────────────────────────┐
│                    弹窗容器                          │
│  ┌────────────────────┬────────────────────────┐   │
│  │      左侧面板       │        右侧面板        │   │
│  │                    │                        │   │
│  │  作者信息          │    装备列表            │   │
│  │  构筑名称          │    ┌──┬──┬──┬──┐      │   │
│  │  描述              │    │头│胸│手│腿│      │   │
│  │  标签              │    └──┴──┴──┴──┘      │   │
│  │  统计数据          │                        │   │
│  │  技能配置          │    装备详情            │   │
│  │                    │    ┌──────────────┐   │   │
│  │                    │    │ 装备名称     │   │   │
│  │                    │    │ 词缀列表     │   │   │
│  │                    │    └──────────────┘   │   │
│  └────────────────────┴────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 5. UI设计规范

### 5.1 职业主题色

| 职业 | 主色调 | 背景渐变 | 边框颜色 |
|------|--------|---------|---------|
| 野蛮人 | 红色 | from-red-900/50 to-stone-900 | border-red-600/40 |
| 死灵法师 | 青色 | from-cyan-900/50 to-stone-900 | border-cyan-600/40 |
| 巫师 | 蓝色 | from-blue-900/50 to-stone-900 | border-blue-600/40 |
| 德鲁伊 | 绿色 | from-green-900/50 to-stone-900 | border-green-600/40 |
| 游侠 | 黄色 | from-yellow-900/50 to-stone-900 | border-yellow-600/40 |
| 灵巫 | 紫色 | from-purple-900/50 to-stone-900 | border-purple-600/40 |
| 圣骑士 | 橙色 | from-orange-900/50 to-stone-900 | border-orange-600/40 |
| 术士 | 粉色 | from-pink-900/50 to-stone-900 | border-pink-600/40 |

### 5.2 稀有度颜色

| 稀有度 | 文字颜色 | 边框颜色 | 背景色 |
|--------|---------|---------|--------|
| 普通 | text-gray-400 | border-gray-600 | bg-gray-900/30 |
| 魔法 | text-blue-400 | border-blue-600 | bg-blue-900/30 |
| 稀有 | text-yellow-400 | border-yellow-600 | bg-yellow-900/30 |
| 传奇 | text-orange-400 | border-orange-600 | bg-orange-900/30 |
| 暗金 | text-purple-400 | border-purple-600 | bg-purple-900/30 |

### 5.3 布局尺寸

| 区域 | 宽度 | 说明 |
|------|------|------|
| 整体容器 | 100% | 全宽响应式 |
| 卡片网格 | auto | 自适应列数 |
| 卡片 | 280px | 固定宽度 |
| 弹窗 | max-w-5xl | 最大宽度 |
| 左侧面板 | 50% | 构筑信息 |
| 右侧面板 | 50% | 装备信息 |

---

## 6. 数据维护

### 6.1 JSON文件结构

**builds.json**
```json
[
  {
    "id": "build-001",
    "name": "野蛮人旋风斩",
    "author": "Player001",
    "authorLevel": 100,
    "authorRank": 1,
    "characterClass": "barbarian",
    "description": "高伤害旋风斩构筑",
    "season": "S8",
    "tags": ["旋风斩", "AOE", "高伤害"],
    "playStyle": "近战输出",
    "difficulty": "简单",
    "rating": 4.8,
    "likes": 1500,
    "downloads": 800,
    "views": 5000,
    "equipment": {
      "helmet": {
        "id": "helmet-001",
        "name": "狂战士之盔",
        "slot": "helmet",
        "rarity": "unique",
        "level": 80,
        "affixes": [
          { "id": "str", "name": "力量", "value": 50, "type": "additive" }
        ]
      }
    },
    "skills": [
      { "id": "skill-001", "skillName": "旋风斩", "slot": "核心", "icon": "🌀" }
    ],
    "createdAt": 1718668800000,
    "updatedAt": 1718668800000
  }
]
```

**metadata.json**
```json
{
  "seasons": ["S8", "S7", "S6"],
  "classes": [
    "barbarian",
    "necromancer",
    "sorc",
    "druid",
    "rogue",
    "spiritborn",
    "paladin",
    "warlock"
  ]
}
```

### 6.2 数据更新流程

```
编辑 JSON 文件
    ↓
保存文件
    ↓
刷新页面
    ↓
自动加载最新数据
```

---

## 7. 跨模块协作

### 7.1 与装备模拟器的数据共享

**共享方式**：localStorage

**共享Key**：`equipment-simulator-storage`

**数据流向**：
```
构筑浏览器
    ↓
directImportToEquipment(build)
    ↓
写入 localStorage
    ↓
装备模拟器读取
    ↓
加载装备配置
```

### 7.2 导入功能实现

```typescript
// storage.ts
export function directImportToEquipment(build: Build): boolean {
  try {
    const storageKey = 'equipment-simulator-storage'
    const existingData = localStorage.getItem(storageKey)
    const data = existingData ? JSON.parse(existingData) : {}
    
    // 创建新方案
    const newBuild = {
      id: `build-${Date.now()}`,
      name: build.name,
      characterClass: build.characterClass,
      equipment: build.equipment,
      createdAt: Date.now()
    }
    
    // 更新数据
    data.builds = data.builds || []
    data.builds.push(newBuild)
    data.currentBuildId = newBuild.id
    data.equipment = build.equipment
    data.character = { class: build.characterClass }
    
    localStorage.setItem(storageKey, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('导入失败:', error)
    return false
  }
}
```

---

## 8. 性能优化

### 8.1 数据加载优化
- 异步加载JSON数据
- 显示Loading状态
- 数据缓存避免重复请求

### 8.2 渲染优化
- 使用React.memo优化组件
- 使用useMemo缓存计算结果
- 虚拟滚动（大量数据时）

### 8.3 状态管理优化
- Zustand轻量级状态管理
- 按需更新状态
- 避免不必要的状态更新

---

## 9. 扩展性设计

### 9.1 模块化设计
- 组件独立封装
- 类型定义集中管理
- 服务层分离业务逻辑

### 9.2 可扩展性
- 支持新增职业
- 支持新增筛选条件
- 支持新增排序方式
- 支持API数据源

### 9.3 国际化
- 文本集中管理
- 支持多语言切换

---

## 10. 版本规划

### v1.0.0 (当前)
- ✅ 构筑浏览功能
- ✅ 筛选排序功能
- ✅ 详情展示
- ✅ 导入导出功能
- ✅ JSON数据源

### v1.1.0 (计划)
- 收藏功能
- 点赞功能
- 分享功能

### v2.0.0 (未来)
- API数据源
- 用户系统
- 云端存储

---

## 11. 参考文档

- [README.md](./README.md) - 模块说明
- [API.md](./API.md) - API文档
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志
