# 装备模拟器

> Diablo IV Equipment Simulator

模拟暗黑4角色装备搭配的工具，支持全职业装备槽位选择和属性预览。

## 🎯 功能特性

### 职业系统
- **7种职业支持**：野蛮人、死灵法师、巫师、德鲁伊、游侠、灵巫、圣骑士
- **职业选择器**：顶部栏职业切换，选中时显示金色边框高亮效果
- **职业背景图片**：支持每个职业单独配置背景图片（路径：`public/images/class/bg-{职业}.jpg`）
- **职业角色图片**：支持每个职业单独配置角色图片（路径：`public/images/class/{职业}.png`）
- **职业剪影Fallback**：图片加载失败时显示默认剪影SVG

### 装备系统
- **12个装备槽位**：头盔、胸部、手套、裤子、靴子、武器1、武器2、武器3、武器4、护符、戒指1、戒指2
- **5种稀有度**：普通、魔法、稀有、传奇、暗金
- **稀有度显示**：不同稀有度有不同颜色边框和发光效果
- **装备槽位图标**：支持外部SVG图片引用（路径：`public/images/icons/`）
- **悬停交互**：装备槽位悬停显示装备名称
- **装备选择弹窗**：点击槽位打开装备选择面板，支持搜索、查看词缀和特效
- **词缀编辑**：支持修改词缀的数值、单位、符号类型和名称
- **自定义词缀**：使用自定义词缀替代嬗变和回风功能，最多添加2条
- **暗金装备**：从数据库选择，自动带出默认词缀和数值
- **威能支持**：传奇和暗金模式下都支持选择威能
- **宝石镶嵌**：支持从数据库选择宝石，效果根据装备类型动态显示
- **符文镶嵌**：支持添加符文，每种最多2个

### 属性系统
- **属性面板**：独立右侧面板显示完整属性
- **主要属性**：力量、敏捷、智力（卡片式布局）
- **战斗属性**：攻击速度、暴击几率、暴击伤害、易伤伤害
- **防御属性**：护甲、抗性、生命值
- **伤害加成**：A类加成、B类乘区
- **装备统计**：装备数量进度条、传奇特效计数
- **实时计算**：装备变化时属性实时更新

### 方案管理系统
- **新建方案**：点击"新建方案"按钮直接创建空白方案并自动加载
- **复制方案**：复制当前方案创建变体，适合创建方案的不同配置版本
- **加载方案**：在多个已保存方案间切换查看
- **重命名方案**：修改方案名称
- **删除方案**：删除不需要的方案
- **导出分享**：导出方案为JSON文件，便于分享给其他玩家
- **导入方案**：从JSON文件导入方案，支持点击选择或拖放
- **永久存储**：使用localStorage持久化存储，刷新页面不丢失
- **自动同步**：装备变更时自动更新当前方案数据

### 数据库系统
- **装备数据库**：支持装备CRUD、按槽位/稀有度筛选、搜索
- **技能数据库**：支持按职业/类型筛选技能
- **巅峰节点数据库**：支持巅峰节点数据存储和管理
- **Build方案管理**：支持Build的创建、更新、删除
- **Mock数据**：内置完整的装备、技能、巅峰节点Mock数据
- **本地持久化**：使用Zustand + localStorage实现数据持久化

### 数据导入导出
- **暗黑核导入**：支持从d2core.com导入Build方案
- **JSON导出**：支持导出Build、装备、技能、巅峰节点数据
- **格式转换**：支持转换为暗黑核格式导出
- **数据验证**：支持验证暗黑核数据格式

### UI设计
- **暗黑风格UI**：游戏内风格的界面设计
- **布局结构**：角色居中、装备槽位分布两侧、右侧属性面板、底部快捷栏
- **容器尺寸**：850px × 820px
- **职业选择**：金色边框 + 发光效果
- **悬停效果**：装备槽位悬停放大效果
- **分区显示**：属性面板按类别分组，带分隔线和标题

## 📁 文件结构

```
modules/equipment/
├── index.html              # 入口HTML
├── package.json            # 依赖配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.js      # Tailwind CSS配置
├── postcss.config.js       # PostCSS配置
├── public/
│   └── images/
│       ├── class/          # 职业图片目录
│       │   ├── bg-*.jpg    # 职业背景图片
│       │   └── *.png       # 职业角色图片
│       └── icons/          # 装备槽位图标
│           ├── helmet.svg
│           ├── chest.svg
│           ├── gloves.svg
│           ├── pants.svg
│           ├── boots.svg
│           ├── weapon1.svg ~ weapon4.svg
│           ├── amulet.svg
│           └── ring.svg
├── src/
│   ├── main.tsx           # React入口
│   ├── App.tsx            # 主应用组件（850x820布局）
│   ├── index.css          # 全局样式（暗黑风格主题）
│   ├── types/
│   │   ├── equipment.ts   # TypeScript类型定义（装备相关）
│   │   └── database.ts    # 数据库类型定义（装备/技能/巅峰/Build）
│   ├── data/
│   │   └── equipmentData.ts # Mock数据和常量
│   ├── store/
│   │   ├── equipmentStore.ts # 装备状态管理
│   │   └── databaseStore.ts  # 数据库状态管理（含Mock数据）
│   ├── utils/
│   │   ├── d2coreImporter.ts # 暗黑核数据导入器
│   │   └── dataExporter.ts   # JSON数据导出器
│   └── components/
│       ├── Header.tsx          # 顶部导航（含职业选择器）
│       ├── CharacterPanel.tsx  # 角色展示面板（含背景切换）
│       ├── EquipmentSlots.tsx  # 装备槽位展示（55x85尺寸）
│       ├── EquipmentSelector.tsx # 装备选择弹窗
│       ├── ActionBar.tsx       # 底部快捷栏
│       └── StatsPanel.tsx      # 右侧属性面板
└── docs/                   # 文档目录
    ├── README.md           # 模块说明
    ├── API.md             # 接口文档
    └── CHANGELOG.md       # 更新日志

## 💾 数据存储说明

### 存储策略

本模块采用**分层存储架构**，将系统数据、用户数据和方案配置分开处理：

| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| **系统数据** | 内存（从 JSON 加载） | 词缀、威能、暗金装备、宝石、符文等 |
| **用户数据** | localStorage | 用户创建的自定义词缀 |
| **方案配置** | localStorage | 军械库中的装备方案和当前配置 |

### 系统数据

以下数据为系统数据，每次刷新从服务器 JSON 文件加载：

- 词缀数据 (`affixes.json`)
- 传奇威能数据 (`legendary-powers.json`)
- 暗金装备数据 (`uniqueEquipment.json`)
- 宝石数据 (`gems.json`)
- 符文数据 (`runes.json`)

**特性**：
- ✅ 每次刷新页面从服务器加载最新数据
- ✅ 服务器更新数据后，用户刷新即可获取最新
- ✅ 无需手动清除浏览器缓存

### 用户数据

用户在词缀选择器中创建的自定义词缀会持久化到 localStorage。

**localStorage Key**：`d4-custom-data`

**特性**：
- ✅ 不会因页面刷新丢失
- ✅ 不会因服务器更新被覆盖
- ✅ 支持导出/导入 JSON 文件进行备份

### 方案配置（军械库）

军械库中的所有装备方案通过 zustand persist 中间件持久化。

**localStorage Key**：`equipment-simulator-storage`

**持久化内容**：
- 所有方案数据 (builds)
- 当前装备配置 (equipment)
- 当前角色职业 (character)
- 当前方案ID (currentBuildId)

**特性**：
- ✅ 创建/修改/删除方案自动保存
- ✅ 刷新浏览器数据完整保留
- ✅ 关闭浏览器后下次打开仍然存在
- ✅ 支持导出/导入方案备份

## 🚀 快速开始

```bash
# 进入模块目录
cd modules/equipment

# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:5173

# 生产构建
npm run build
# 产物输出到 dist/ 目录
```

## 🎮 使用说明

### 职业选择
1. 点击顶部职业选择器切换职业
2. 支持7种职业：野蛮人、死灵法师、巫师、德鲁伊、游侠、灵巫、圣骑士
3. 选中的职业显示金色边框高亮 + 发光效果
4. 切换职业会更换角色背景图片

### 装备管理
1. **选择装备**：点击装备槽位打开装备选择弹窗
2. **搜索装备**：在弹窗搜索框中输入关键词搜索
3. **更换装备**：点击已装备的槽位可更换装备
4. **卸下装备**：在装备选择弹窗中点击"卸下"按钮

### 属性查看
- 右侧属性面板实时显示当前角色的属性
- 包括力量、敏捷、智力、战斗属性、防御属性等
- 装备变化时属性自动更新

### 自定义图片
**职业背景图片**：
- 路径：`modules/equipment/public/images/class/bg-{职业}.jpg`
- 支持格式：JPG、PNG
- 示例：`bg-barbarian.jpg`、`bg-necromancer.jpg`

**职业角色图片**：
- 路径：`modules/equipment/public/images/class/{职业}.png`
- 支持格式：PNG（透明背景推荐）
- 示例：`barbarian.png`、`necromancer.png`

**装备槽位图标**：
- 路径：`modules/equipment/public/images/icons/{部位}.svg`
- 尺寸：38x38像素
- 示例：`helmet.svg`、`chest.svg`

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

## 📊 数据模型

### 装备槽位
```typescript
type EquipmentSlot = 
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'amulet' | 'ring1' | 'ring2'
```

### 稀有度
```typescript
type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique'
```

### 装备属性
```typescript
interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  rarity: Rarity
  level: number
  affixes: Affix[]
  legendaryPower?: string  // 传奇特效
  uniqueEffect?: string   // 暗金特效
  icon: string
}
```

### 属性词缀
```typescript
interface Affix {
  id: string
  name: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
}
```

### 角色属性
```typescript
interface EquipmentStats {
  attackPower: number
  armor: number
  critChance: number
  critDamage: number
  vulnerableDamage: number
  additiveDamage: number
  multiplicativeDamage: number
  strength: number
  dexterity: number
  intelligence: number
  attackSpeed: number
  resistance: number
  health: number
  equippedCount: number
  legendaryEffects: number
}
```

### 方案数据
```typescript
interface Build {
  id: string                    // 方案唯一标识
  name: string                  // 方案名称
  characterClass: Character['class']  // 职业类型
  equipment: Record<EquipmentSlot, EquipmentItem | null>  // 装备配置
  createdAt: number             // 创建时间戳
}
```

## 🔧 核心模块

### Store (状态管理)
- `useEquipmentStore` - 装备状态管理
- 包含角色信息、装备数据、属性计算
- 方法：`setCharacterClass`、`equipItem`、`unequipItem`、`selectSlot`、`calculateStats`

### Components (组件)
| 组件 | 功能 |
|------|------|
| Header | 顶部导航，包含职业选择器和标签页 |
| CharacterPanel | 角色展示面板，支持背景图片切换 |
| EquipmentSlots | 装备槽位展示，55x85尺寸 |
| EquipmentSelector | 装备选择弹窗，支持搜索 |
| ActionBar | 底部快捷栏 |
| StatsPanel | 右侧属性面板，显示完整属性 |

## 📱 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | ≥ 90 | ✅ 支持 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 15 | ✅ 支持 |
| Edge | ≥ 90 | ✅ 支持 |

## 🎨 UI特性

### 稀有度颜色
| 稀有度 | 颜色 | 边框 | 发光效果 |
|--------|------|------|----------|
| 普通 | 灰色 | #808080 | 无 |
| 魔法 | 绿色 | #1eff00 | 绿色光晕 |
| 稀有 | 蓝色 | #0070dd | 蓝色光晕 |
| 传奇 | 橙色 | #ff8000 | 橙色光晕 |
| 暗金 | 金色 | #e6cc80 | 金色光晕 |

### 布局尺寸
| 区域 | 宽度 | 高度 |
|------|------|------|
| 整体容器 | 850px | 820px |
| 装备槽位 | 55px | 85px |
| 槽位图标 | 38px | 38px |
| 属性面板 | 180px | 100% |
| 角色展示区 | 约450px | 340px |

### 职业背景
- 野蛮人：支持本地图片 bg-barbarian.jpg
- 死灵法师：支持本地图片 bg-necro.jpg
- 巫师：支持本地图片 bg-sorc.jpg
- 德鲁伊：支持本地图片 bg-druid.jpg
- 游侠：支持本地图片 bg-rogue.jpg
- 灵巫：支持本地图片 bg-spiritborn.jpg
- 圣骑士：支持本地图片 bg-paladin.jpg
