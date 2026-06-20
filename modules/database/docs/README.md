# 数据库管理模块

> Diablo IV Database Manager

暗黑4游戏数据管理工具，支持管理暗金装备、威能、词缀、技能、护身符、制作材料、符文、宝石等数据。

## 🎯 功能特性

### 数据类型支持
- **暗金装备**：管理游戏中所有暗金品质装备
- **威能**：传奇威能效果管理
- **词缀**：装备词缀属性管理
- **技能**：全职业技能数据管理
- **护身符**：护身符专属装备管理
- **制作材料**： crafting材料管理
- **符文**：符文效果管理
- **宝石**：宝石属性管理

### 核心功能
- **数据浏览**：表格形式展示各类数据
- **搜索功能**：支持按名称、描述搜索
- **CRUD操作**：完整的增删改查功能
- **数据详情**：点击查看完整数据详情
- **统计面板**：实时显示各类数据数量
- **Mock数据**：内置完整测试数据

### UI设计
- **暗黑风格**：游戏内风格界面设计
- **响应式布局**：侧边栏导航 + 主内容区 + 统计面板
- **稀有度颜色**：不同稀有度显示不同颜色
- **平滑交互**：悬停高亮、点击选中效果

## 📁 文件结构

```
modules/database/
├── index.html              # 入口HTML
├── package.json            # 依赖配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.js      # Tailwind CSS配置
├── postcss.config.cjs      # PostCSS配置
├── src/
│   ├── main.tsx           # React入口
│   ├── App.tsx            # 主应用组件
│   ├── index.css          # 全局样式（暗黑风格主题）
│   ├── types/
│   │   └── index.ts       # TypeScript类型定义
│   ├── data/
│   │   └── mockData.ts    # Mock数据
│   ├── store/
│   │   └── databaseStore.ts # Zustand状态管理
│   └── components/
│       ├── Header.tsx      # 顶部导航
│       ├── Sidebar.tsx     # 侧边栏分类导航
│       ├── DataTable.tsx   # 数据表格组件
│       └── StatsPanel.tsx  # 统计面板
└── docs/
    ├── README.md           # 模块说明
    ├── API.md             # 接口文档
    └── CHANGELOG.md       # 更新日志
```

## 🚀 快速开始

```bash
# 进入模块目录
cd modules/database

# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:5173

# 生产构建
npm run build
# 产物输出到 dist/ 目录
```

## 💾 数据存储说明

### 数据分类

本模块采用**分离存储架构**，将系统数据和用户数据分开处理：

| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| **系统数据** | 内存 | 每次刷新从 JSON 文件加载，永远是最新的 |
| **用户自定义数据** | localStorage | 持久化存储，不会因刷新丢失 |

### 系统数据

以下数据为系统数据，存储在 `public/data/` 目录的 JSON 文件中：

- 暗金装备数据 (`uniqueEquipment.json`)
- 传奇威能数据 (`legendaryPowers.json`)
- 词缀数据 (`affixes.json`)
- 宝石数据 (`gems.json`)
- 符文数据 (`runes.json`)
- 护身符数据 (`amulets.json`)

**特性：**
- ✅ 每次刷新页面自动从 JSON 文件加载
- ✅ 服务器更新数据后，用户刷新即可获取最新
- ✅ 无需手动清除浏览器缓存

### 用户自定义数据

用户在「词缀维护」等功能中创建的**自定义词缀**、**自定义威能**等数据会持久化到 localStorage。

**存储 Key：** `d4-custom-data`

**特性：**
- ✅ 不会因页面刷新丢失
- ✅ 需要手动清除浏览器缓存才会删除
- ✅ 支持导出/导入 JSON 文件进行备份

## 🎮 使用说明

### 数据分类导航
1. 点击左侧侧边栏选择数据分类
2. 支持8种数据类型：暗金装备、威能、词缀、技能、护身符、制作材料、符文、宝石
3. 每个分类显示当前数据数量

### 数据搜索
1. 在搜索框中输入关键词
2. 支持按名称和描述搜索
3. 实时过滤显示结果

### 数据操作
1. **查看详情**：点击表格行查看完整数据详情
2. **删除数据**：点击🗑️图标删除对应数据

### 返回首页
点击顶部导航的「返回首页」按钮返回模拟器首页

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

## 📊 数据模型

### 暗金装备 (UniqueEquipment)
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
```

### 威能 (LegendaryPower)
```typescript
interface LegendaryPower {
  id: string
  name: string
  description: string
  type: string
  icon: string
}
```

### 词缀 (Affix)
```typescript
interface Affix {
  id: string
  name: string
  category: string
  calculationType: 'additive' | 'multiplicative'
  minValue: number
  maxValue: number
  unit: string
  description: string
  applicableSlots: EquipmentSlot[]
}
```

### 技能 (Skill)
```typescript
interface Skill {
  id: string
  name: string
  description: string
  type: 'active' | 'passive' | 'ultimate' | 'basic'
  category: 'offense' | 'defense' | 'utility' | 'mobility'
  damageType: string
  characterClass: CharacterClass
  skillTree: string
  skillTreePath: string[]
  maxRank: number
  effects: SkillEffect[]
  icon: string
}
```

## 📱 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | ≥ 90 | ✅ 支持 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 15 | ✅ 支持 |
| Edge | ≥ 90 | ✅ 支持 |

## 🎨 UI特性

### 稀有度颜色
| 稀有度 | 颜色 | CSS类名 |
|--------|------|---------|
| 普通 | 灰色 | text-rarity-common |
| 魔法 | 绿色 | text-rarity-magic |
| 稀有 | 蓝色 | text-rarity-rare |
| 传奇 | 橙色 | text-rarity-legendary |
| 暗金 | 金色 | text-rarity-unique |

### 主题颜色
| 颜色 | 变量名 | 用途 |
|------|--------|------|
| 金色 | --d4-gold (#c9922a) | 强调色、标题、按钮 |
| 深色 | --d4-dark (#0d0d0d) | 背景色 |
| 卡片色 | --d4-card (#1a1510) | 卡片背景 |
| 边框色 | --d4-border (#2a2018) | 分隔线、边框 |
| 文字色 | --d4-text (#ffffff) | 主文字 |
| 次要文字 | --d4-text-secondary (#888888) | 辅助文字 |