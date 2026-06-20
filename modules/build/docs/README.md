# 构筑浏览器

> Diablo IV Build Browser

浏览和分享暗黑4玩家构筑方案的工具，支持天梯玩家顶级装备配置展示。

## 🎯 功能特性

### 构筑浏览
- **天梯构筑展示**：展示天梯玩家的顶级装备配置
- **赛季筛选**：按赛季筛选构筑方案
- **职业筛选**：按职业筛选构筑方案
- **多种排序**：支持按点赞、下载、浏览量排序
- **搜索功能**：支持构筑名称和作者搜索

### 构筑详情
- **完整信息展示**：作者信息、构筑名称、描述、标签
- **技能配置**：展示构筑的技能搭配
- **装备配置**：展示完整的装备配置和词缀详情
- **统计数据**：点赞、下载、浏览量统计

### 数据管理
- **JSON数据源**：构筑数据从JSON文件加载，便于维护
- **导出功能**：支持导出单个构筑或所有构筑为JSON文件
- **导入功能**：支持从装备模拟器导入装备配置

### 跨模块协作
- **导入到装备模拟器**：一键将构筑装备导入到装备模拟器
- **数据共享**：通过localStorage与装备模拟器共享数据

## 📁 文件结构

```
modules/build/
├── index.html              # 入口HTML
├── package.json            # 依赖配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.js      # Tailwind CSS配置
├── postcss.config.js       # PostCSS配置
├── public/
│   └── data/
│       ├── builds.json     # 构筑数据
│       └── metadata.json   # 元数据（赛季、职业等）
├── src/
│   ├── main.tsx           # React入口
│   ├── App.tsx            # 主应用组件
│   ├── index.css          # 全局样式
│   ├── types/
│   │   ├── index.ts       # 类型定义
│   │   └── ladder.ts      # 天梯相关类型
│   ├── store/
│   │   └── buildStore.ts  # 状态管理
│   ├── services/
│   │   └── buildService.ts # 数据服务
│   ├── utils/
│   │   └── storage.ts     # 存储工具
│   └── components/
│       ├── BuildBrowser.tsx      # 构筑浏览器主组件
│       └── BuildDetailModal.tsx  # 构筑详情弹窗
└── docs/                   # 文档目录
    ├── README.md           # 模块说明
    ├── DESIGN.md           # 设计文档
    ├── API.md              # API文档
    └── CHANGELOG.md        # 更新日志
```

## 🚀 快速开始

```bash
# 进入模块目录
cd modules/build

# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:5174

# 生产构建
npm run build
# 产物输出到 dist/ 目录
```

## 📊 数据模型

### 构筑数据
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

### 装备槽位
```typescript
type EquipmentSlot = 
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'shield' | 'amulet' | 'ring1' | 'ring2'
```

### 装备物品
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

### 词缀
```typescript
interface Affix {
  id: string
  name: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
}
```

### 技能
```typescript
interface Skill {
  id: string
  skillName: string
  slot: string
  icon: string
}
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

## 🎨 UI特性

### 职业主题色
| 职业 | 主色调 | 背景渐变 |
|------|--------|---------|
| 野蛮人 | 红色 | from-red-900/50 to-stone-900 |
| 死灵法师 | 青色 | from-cyan-900/50 to-stone-900 |
| 巫师 | 蓝色 | from-blue-900/50 to-stone-900 |
| 德鲁伊 | 绿色 | from-green-900/50 to-stone-900 |
| 游侠 | 黄色 | from-yellow-900/50 to-stone-900 |
| 灵巫 | 紫色 | from-purple-900/50 to-stone-900 |
| 圣骑士 | 橙色 | from-orange-900/50 to-stone-900 |
| 术士 | 粉色 | from-pink-900/50 to-stone-900 |

### 稀有度颜色
| 稀有度 | 颜色 | 边框 |
|--------|------|------|
| 普通 | 灰色 | border-gray-600 |
| 魔法 | 蓝色 | border-blue-600 |
| 稀有 | 黄色 | border-yellow-600 |
| 传奇 | 橙色 | border-orange-600 |
| 暗金 | 紫色 | border-purple-600 |

## 💾 数据维护

### JSON文件结构

**builds.json**
```json
[
  {
    "id": "build-001",
    "name": "野蛮人旋风斩",
    "author": "Player001",
    "characterClass": "barbarian",
    "season": "S8",
    "equipment": { ... },
    "skills": [ ... ]
  }
]
```

**metadata.json**
```json
{
  "seasons": ["S8", "S7", "S6"],
  "classes": ["barbarian", "necromancer", "sorc", "druid", "rogue", "spiritborn", "paladin", "warlock"]
}
```

### 数据更新流程
1. 编辑 `public/data/builds.json` 文件
2. 刷新页面自动加载最新数据
3. 无需重新构建项目

## 📱 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | ≥ 90 | ✅ 支持 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 15 | ✅ 支持 |
| Edge | ≥ 90 | ✅ 支持 |

## 🔗 相关模块

- [装备模拟器](../equipment) - 装备搭配模拟工具
- [数据库管理](../database) - 游戏数据管理

## 📖 文档

- [设计文档](./DESIGN.md) - 详细设计说明
- [API文档](./API.md) - 接口文档
- [更新日志](./CHANGELOG.md) - 版本更新记录
