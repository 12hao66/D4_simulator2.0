# 数据库管理模块设计说明

## 1. 模块概述

**功能定位**：管理暗黑破坏神4游戏数据，包括暗金装备、威能、词缀、技能、护身符、制作材料、符文、宝石等。

**访问地址**：`http://localhost:8081/modules/database/dist/index.html`

**技术栈**：React 18 + TypeScript + Vite + Tailwind CSS + Zustand

---

## 2. 数据模型设计

**文件位置**：`src/types/index.ts`

### 2.1 装备类型定义

```typescript
// 装备类型
export type ItemType = 'mythic' | 'unique';
```

| 类型 | 说明 | 视觉样式 |
|------|------|---------|
| `mythic` | 神话暗金 | 紫色边框/文字 |
| `unique` | 暗金 | 暗金色边框/文字 |

### 2.2 暗金装备数据模型

```typescript
export interface UniqueEquipment {
  id: string;                    // 唯一标识
  name: string;                  // 装备名称
  itemType: ItemType;            // 装备类型：神话暗金 / 暗金
  slot: string;                  // 装备部位
  description: string;           // 描述文本
  level: number;                 // 等级要求
  affixes: UniqueAffix[];        // 词缀列表
  uniqueEffects: UniqueEffect[]; // 威能列表
  icon: string;                  // 图标路径
  dropBoss?: string;             // 掉落Boss（可选）
  manuallyVerified?: boolean;     // 是否手动维护（可选）
}
```

### 2.3 词缀模型

```typescript
export interface UniqueAffix {
  id: string;
  name: string;      // 词缀名称
  value: number;     // 数值
  unit: string;      // 单位（%、点等）
  description: string; // 描述
}
```

### 2.4 威能模型（UniqueEffect - 装备上的威能效果）

```typescript
export interface UniqueEffect {
  id: string;
  name: string;        // 威能名称
  description: string;  // 威能描述
  condition?: string;  // 生效条件（如：仅限德鲁伊）
}
```

### 2.5 传奇威能数据模型（LegendaryPower - 独立威能数据库）

```typescript
export interface LegendaryPower {
  id: string;                    // 唯一标识
  name: string;                  // 威能名称
  description: string;            // 威能描述
  type: string;                  // 职业类型（barbarian、necromancer等）
  powerType?: string;            // 威能类型（resource、offense、defense等）
  applicableSlots?: string[];    // 适用装备类型（如：护符、戒指）
  level?: number;                // 等级要求
  icon?: string;                 // 图标路径
  manuallyVerified?: boolean;    // 是否已手动维护
}
```

**职业类型映射**：
| 类型 | 职业 |
|------|------|
| barbarian | 野蛮人 |
| necromancer | 死灵法师 |
| sorc | 法师 |
| druid | 德鲁伊 |
| rogue | 游侠 |
| spiritborn | 灵巫 |
| paladin | 圣骑士 |
| all | 全职业 |

**威能类型映射**：
| 类型 | 说明 | 卡片颜色 |
|------|------|---------|
| resource | 资源 | 蓝色 |
| offense | 攻击 | 红色 |
| defense | 防御 | 绿色 |
| utility | 通用 | 黄色 |
| mobility | 移动 | 紫色 |

---

## 4. 数据存储架构

**文件位置**：`src/store/`

### 4.1 架构设计原则

本模块采用**数据分离存储**架构，将系统数据和用户数据分开处理：

| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| **系统数据** | 内存（从 JSON 加载） | 每次刷新从 JSON 文件加载，永远是最新的 |
| **用户自定义数据** | localStorage | 通过 customDataStore 持久化，不会因刷新丢失 |

### 4.2 Store 设计

#### 4.2.1 databaseStore（系统数据管理）

**文件位置**：`src/store/databaseStore.ts`

```typescript
export const useDatabaseStore = create<DatabaseStore>()(persist((set, get) => ({
  // 数据状态
  uniqueEquipment: [],      // 暗金装备
  legendaryPowers: [],      // 传奇威能
  affixes: [],             // 词缀
  skills: [],              // 技能
  amulets: [],            // 护身符
  craftingMaterials: [],   // 制作材料
  runes: [],              // 符文
  gems: [],               // 宝石
  
  // 数据加载方法
  reloadUniqueEquipment: async () => { ... },
  reloadLegendaryPowers: async () => { ... },
  reloadAffixes: async () => { ... },
  // ...
  
}), {
  name: 'd4-database-manager',
  // 只持久化用户数据，不持久化系统数据
  partialize: () => ({})
}));
```

**关键特性：**
- ✅ `partialize: () => ({})` - 不持久化任何系统数据
- ✅ 每次页面加载自动从 JSON 文件读取最新数据
- ✅ 使用 zustand 管理内存中的数据状态

#### 4.2.2 customDataStore（用户自定义数据）

**文件位置**：`src/store/customDataStore.ts`

```typescript
export const useCustomDataStore = create<CustomDataStore>()(persist((set, get) => ({
  // 用户自定义数据
  customLegendaryPowers: [],  // 自定义威能
  customAffixes: [],         // 自定义词缀
  
  // CRUD 方法
  addCustomLegendaryPower: (power) => set((state) => ({
    customLegendaryPowers: [...state.customLegendaryPowers, power]
  })),
  // ...
  
}), {
  name: 'd4-custom-data',
  // 持久化所有用户自定义数据
}));
```

**关键特性：**
- ✅ 专门管理用户创建的自定义数据
- ✅ 自动持久化到 localStorage
- ✅ 不会因页面刷新丢失

### 4.3 数据加载流程

```
页面加载
    ↓
┌─────────────────┐
│  databaseStore  │
└─────────────────┘
    ↓
从 JSON 文件加载系统数据
    ↓
    ↓
┌──────────────────┐
│ customDataStore │
└──────────────────┘
    ↓
从 localStorage 加载用户自定义数据
    ↓
合并显示
```

### 4.4 为什么这样设计？

#### 4.4.1 旧方案的问题

**旧实现：** 使用单个 zustand store + persist 缓存所有数据

```typescript
// 旧代码
partialize: (state) => ({
  uniqueEquipment: state.uniqueEquipment,  // ❌ 系统数据被缓存
  legendaryPowers: state.legendaryPowers,  // ❌ 系统数据被缓存
  affixes: state.affixes,                  // ❌ 系统数据被缓存
  skills: state.skills,
  // ...
})
```

**问题：**
- ❌ 服务器更新数据后，用户看不到最新内容
- ❌ 需要维护版本号，手动清除缓存
- ❌ 用户需要手动清除浏览器缓存

#### 4.4.2 新方案的优势

**新实现：** 分离系统数据和用户数据

```typescript
// 新代码
partialize: () => ({})  // ✅ 不持久化系统数据
```

**优势：**
- ✅ 系统数据永远是最新版本
- ✅ 无需维护版本号
- ✅ 用户无需手动清除缓存
- ✅ 用户自定义数据仍然持久化

### 4.5 JSON 数据文件

系统数据存储在 `public/data/` 目录：

```
modules/database/public/data/
├── uniqueEquipment.json   # 暗金装备数据
├── legendaryPowers.json  # 传奇威能数据
├── affixes.json          # 词缀数据
├── gems.json             # 宝石数据
├── runes.json            # 符文数据
└── amulets.json          # 护身符数据
```

**加载方式：**
```typescript
const loadAffixes = async () => {
  const response = await fetch('./data/affixes.json');
  const data = await response.json();
  return data;
};
```

### 4.6 localStorage Keys

| Key | 说明 | 持久化内容 |
|-----|------|-----------|
| `d4-database-manager` | 系统数据缓存 | 空（`{}`） |
| `d4-custom-data` | 用户自定义数据 | 自定义威能、词缀等 |

### 4.7 HTTP 缓存机制

#### 4.7.1 为什么本地开发时需要禁用缓存？

使用 `http-server` 启动的静态服务器，默认会缓存静态文件。当修改 JSON 数据文件后，浏览器可能仍然使用缓存的旧数据，导致看不到更新。

**现象：**
- 修改 `affixes.json` 后刷新页面，数据没有变化
- `Ctrl+Shift+R`（强制刷新）也不起作用

#### 4.7.2 解决方案

**方法一：启动服务时禁用缓存（推荐）**

```powershell
# 构建后启动服务时使用 -c-1 参数禁用缓存
cd D:\ClaudeProject\D4_simulator2.0\dist
npx http-server -p 8080 -s -c-1
# -c-1 表示禁用缓存
```

**方法二：手动清除浏览器缓存**

1. 打开开发者工具（F12）
2. 切换到 Application 面板
3. 在左侧找到 Local Storage → 选择当前域名
4. 右键删除相关数据
5. 刷新页面

**方法三：控制台命令清除缓存**

```javascript
// 清除所有缓存数据
localStorage.clear();
location.reload();
```

#### 4.7.3 GitHub Pages 的缓存行为

部署到 GitHub Pages 后，**不需要担心缓存问题**：

| 特性 | 说明 |
|------|------|
| ETag | GitHub Pages 内置 ETag 机制，文件更新后自动变化 |
| Cache-Control | 通常 `max-age=600`（10分钟） |
| CDN 缓存 | 自动智能缓存 |

**工作原理：**
```
文件更新并部署
    ↓
GitHub 生成新的 ETag
    ↓
用户访问 → 浏览器请求
    ↓
ETag 不匹配 → 返回新文件
    ↓
用户获取最新数据 ✅
```

**结论：**
- **本地开发**：使用 `-c-1` 禁用缓存
- **GitHub Pages**：自动处理，无需额外操作

---

## 5. UI组件设计

**文件位置**：`src/components/`

| 组件 | 功能说明 |
|------|---------|
| `Header.tsx` | 模块顶部导航/标题 |
| `SearchFilter.tsx` | 搜索框、分类筛选（按部位/类型筛选） |
| `DataTable.tsx` | 数据列表展示区域 |
| `ItemCard.tsx` | 单个装备卡片组件 |
| `ItemDetailModal.tsx` | 装备详情弹窗 |
| `Pagination.tsx` | 分页导航组件 |
| `StatsPanel.tsx` | 统计面板 |
| `ImportModal.tsx` | JSON文件导入弹窗 |
| `TextImportModal.tsx` | 文本导入弹窗（支持解析） |

### 3.1 组件结构图

```
App
├── Header
├── SearchFilter
│   ├── 搜索输入框
│   ├── 部位筛选下拉
│   ├── 类型筛选下拉
│   ├── 导入按钮 (JSON)
│   └── 文本导入按钮 (TXT)
├── StatsPanel
├── DataTable
│   ├── ItemCard[] (装备卡片列表 - 暗金装备)
│   │   └── ItemCard.tsx
│   └── PowerCard[] (威能卡片列表 - 威能)
│       └── PowerCard.tsx
│       ├── 图标
│       ├── 类型标签
│       ├── 装备名称
│       ├── 等级
│       ├── 职业标签
│       ├── 掉落Boss
│       ├── 词缀列表
│       ├── 威能
│       └── 描述
├── Pagination
├── ItemDetailModal (详情弹窗)
├── ImportModal (JSON导入弹窗)
└── TextImportModal (文本导入弹窗)
```

### 3.11 PowerCard 威能卡片组件

**文件位置**：`src/components/PowerCard.tsx`

**组件结构**：
```
PowerCard
├── 图标区域 (圆形绿色渐变背景)
│   └── ⚡ 闪电符号
├── 内容区域
│   ├── 威能名称（传奇色粗体）
│   ├── 职业 · 威能类型（彩色标签）
│   └── 适用装备（灰色文字，护符[+50%]、双手武器[+100%]）
├── 分隔线（金色半透明）
└── 威能描述（传奇色，特殊中括号蓝色高亮）
```

**卡片布局图**：
```
┌─────────────────────────────────────────┐
│ [⚡]  安魂威能                           │
│      死灵法师 · 资源                    │
│      护符[+50%], 戒指                    │
│                                         │
│ ──────────────────────────────────────  │
│ ★ 你每有一个激活的仆从，获得 [7.0-10.0] │  ← 蓝色高亮
│   点最大精魂值。                          │
└─────────────────────────────────────────┘
```

**视觉设计**：
- **背景**：渐变 `linear-gradient(180deg, #1a1510 0%, #0a0a0a 100%)`
- **边框**：暗金色 `rgba(201, 162, 39, 0.3)`，悬停时 `#C9A227` + 发光效果
- **图标**：圆形绿色渐变背景，带闪电符号 ⚡
- **名称**：传奇色 `#b8860b`（暗金色）粗体
- **职业标签**：各职业对应颜色（游侠紫色、死灵法师绿色等）
- **威能类型标签**：各类型对应颜色（攻击红色、资源蓝色等）
- **适用装备**：灰色文字，特殊装备显示加成（护符[+50%]、双手武器[+100%]）
- **分隔线**：金色半透明 `border-d4-gold/20`
- **描述**：传奇色文字，特殊中括号内容 `[...]%?` 蓝色高亮显示

**交互效果**：
- 鼠标悬停时边框变为完全不透明暗金色
- 悬停时添加金色发光阴影效果
- 卡片整体为可点击区域

---

## 4. 视觉设计

### 4.1 配色方案

| 元素 | 颜色值 | 说明 |
|------|--------|------|
| 神话暗金边框 | `#9333EA` | 悬停时透明度变化 |
| 暗金边框 | `#C9A227` | 悬停时透明度变化 |
| 神话暗金文字 | `#9333EA` | 名字/威能 |
| 暗金文字 | `#C9A227` | 名字/威能 |
| 卡片背景 | `#000000` | 纯黑色背景 |
| 词缀文字 | `#FFFFFF` | 白色文字 |
| 威能图标 | `#F59E0B` | ⭐ 金黄色 |
| 描述文字 | `#9CA3AF` | 灰色文字 |

### 4.2 交互效果

**卡片边框**：
- 正常显示：边框透明度 30%
- 鼠标悬停：边框 100% 高亮 + 阴影

**卡片背景**：
- 装备图标区域：纯黑色 `#000000`
- 装备卡片区域：纯黑色 `#000000`

### 4.3 数据显示结构

```
装备卡片内容：
├── [图标] 64x64 黑色背景
├── [类型标签] 神话暗金/暗金
├── [装备名称] 对应颜色
├── 等级: 80
├── [职业标签] 生效职业
├── 掉落: [Boss名称]
├── ──────────────
├── 148 所有抗性 (白色)
├── ⭐ 威能描述 (对应颜色)
├── ──────────────
└── 描述文本 (灰色斜体)
```

---

## 5. 数据管理

### 5.1 数据文件

系统数据存储在构建后的 `dist` 目录：

```
dist/database/data/
├── uniqueEquipment.json   # 暗金装备数据
├── legendaryPowers.json   # 传奇威能数据
├── affixes.json          # 词缀数据
├── gems.json             # 宝石数据
├── runes.json            # 符文数据
└── amulets.json          # 护身符数据
```

**加载方式：**
```typescript
const loadAffixes = async () => {
  const response = await fetch('./data/affixes.json');
  const data = await response.json();
  return data;
};
```

### 5.2 数据存储机制

采用 **分离存储** 架构：

| 存储位置 | 用途 | 特点 |
|---------|------|------|
| `dist/database/data/*.json` | 系统数据 | 每次刷新从服务器加载最新数据 |
| `localStorage` | 用户自定义数据 | 通过 customDataStore 持久化（可选功能） |

**数据加载流程：**
```
启动应用
    ↓
reloadAffixes() 从 JSON 文件加载数据
    ↓
数据存入 Zustand Store
    ↓
页面显示最新数据
    ↓
（可选）用户导入的自定义数据通过 customDataStore 单独管理
```

**优势：**
- ✅ 系统数据永远是最新版本
- ✅ 无需维护版本号
- ✅ 用户无需手动清除缓存
- ✅ 修改 JSON 文件后刷新即可看到最新数据

### 5.3 数据更新流程

1. **直接修改 JSON 文件**：`dist/database/data/*.json`
2. **刷新页面**：即可看到最新数据
3. **无需清除缓存**：因为使用了 `-c-1` 参数启动服务，缓存已禁用

### 5.4 localStorage Keys

| Key | 说明 | 持久化内容 |
|-----|------|-----------|
| `d4-database-manager` | 系统数据缓存 | 空（`partialize: () => ({})`） |
| `d4-custom-data` | 用户自定义数据 | 自定义威能、词缀等（可选功能） |

### 5.3 文本导入功能

**文件**：`src/components/TextImportModal.tsx`

**功能**：支持通过粘贴装备文本信息，自动解析并导入数据库。

#### 5.3.1 支持的文本格式

```
装备名称
职业 · 部位
掉落 Boss：Boss名称（可选）
词缀（数字开头，如：148 所有抗性）
威能描述（包含技能效果）
描述："装备描述文本" 或 描述：描述内容（可选）
```

#### 5.3.2 解析规则

| 匹配规则 | 类型 | 说明 |
|---------|------|------|
| 第一行 | 名称 | 装备名称 |
| 第二行包含 `·` | 职业 + 部位 | 如：`灵巫 · 护符` |
| `掉落 Boss：` | 掉落Boss | 可选 |
| 数字开头（非威能） | 词缀 | 如：`148 所有抗性` |
| 包含 `[` 或 `造成` | 威能 | 技能效果描述 |
| `"` 或 `描述：` 开头 | 描述 | 装备背景故事 |

#### 5.3.3 使用示例

**输入文本**：
```
太阳鸟颈饰
灵巫 · 护符
掉落 Boss：格里戈利、乌里瓦尔
148 所有抗性
拾起风暴之羽后，你身边会出现一道持续 8 秒的烈焰风暴，每 0.5 秒造成 [900 - 1,050] 点火焰伤害...
描述："很久以前，太阳鸟曾将整个太阳吞入腹中..."
```

**解析结果**：
| 字段 | 值 |
|------|-----|
| name | 太阳鸟颈饰 |
| slot | amulet |
| characterClass | 灵巫 |
| dropBoss | 格里戈利、乌里瓦尔 |
| affixes | 148 所有抗性 |
| uniqueEffect | 拾起风暴之羽后... |
| description | "很久以前..." |

### 5.4 JSON导入功能

**文件**：`src/components/ImportModal.tsx`

**功能**：支持上传 JSON 文件批量导入装备数据。

**JSON 格式要求**：
```json
[
  {
    "id": "unique-example",
    "name": "示例装备",
    "itemType": "unique",
    "slot": "gloves",
    "description": "装备描述",
    "level": 80,
    "affixes": [
      { "name": "攻击力", "value": 100, "unit": "%" }
    ],
    "uniqueEffects": [
      { "name": "特效名称", "description": "特效描述" }
    ],
    "icon": "./images/items/unique/example.png",
    "manuallyVerified": true
  }
]
```

**导入模式**：
| 模式 | 说明 |
|------|------|
| 合并模式 | 追加到现有数据（相同ID会被覆盖） |
| 覆盖模式 | 替换所有数据 |

### 5.5 导出功能

**功能**：将已手动维护的数据导出为 TypeScript 文件。

**使用方式**：
1. 点击"文本导入"按钮
2. 点击"导出已维护数据"按钮
3. 下载 `uniqueEquipmentData.ts` 文件
4. 用下载的文件替换 `src/data/uniqueEquipmentData.ts`
5. 重新构建项目

**导出内容**：只导出 `manuallyVerified: true` 的数据

### 5.6 数据统计

| 分类 | 数量 |
|------|------|
| 暗金装备 | 24 件 |
| 神话暗金 | 6 件 |
| **总计** | **30 件** |

### 5.3 按部位分布

| 部位 | 数量 |
|------|------|
| 手套 | 4 件 |
| 靴子 | 3 件 |
| 头盔 | 3 件 |
| 胸甲 | 4 件 |
| 裤子 | 2 件 |
| 武器 | 11 件 |
| 护符 | 1 件 |
| 戒指 | 3 件 |

### 5.4 手动维护标记

`manuallyVerified` 字段用于区分数据来源：

| 值 | 含义 |
|----|------|
| `true` | 已人工审核/维护 |
| `false` | 明确标记未审核 |
| 不设置 | 从第三方自动抓取 |

### 5.5 图片管理

**图片目录**：`public/images/items/unique/`

**图片命名规范**：`{装备英文名}.png`

**路径格式**：`./images/items/unique/{图片名}.png`

**示例**：
- 塞利格的溶解之心：`selig_heart_of_dissolution.png`
- 支石墓石：`stone_of_cenotaph.png`

---

## 6. 项目构建

### 6.1 构建命令

```bash
cd modules/database
npm run build
```

### 6.2 构建输出

```
dist/
├── index.html
├── assets/
│   ├── index-*.css
│   └── index-*.js
└── images/
    └── items/
        └── unique/
            └── *.png
```

### 6.3 Vite配置

**文件**：`vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // 使用相对路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true  // 复制public目录
  }
});
```

---

## 7. 后续扩展方向

- [ ] 威能数据管理界面
- [ ] 词缀数据管理界面
- [ ] 技能数据管理界面
- [ ] 护身符/符文/宝石数据管理
- [x] 数据导入功能（JSON格式）- 已实现
- [x] 数据导入功能（文本解析）- 已实现
- [x] 数据导出功能 - 已实现
- [ ] 数据批量编辑功能
- [ ] 数据版本历史记录

---

## 8. 维护记录

| 日期 | 操作 |
|------|------|
| 2026-06-17 | 词缀系统升级：添加职业筛选功能 |
| 2026-06-17 | 词缀模型扩展：添加 `applicableClasses` 和 `icon` 字段 |
| 2026-06-17 | 修正 `subcategory` 字段定义：仅回火词缀使用 |
| 2026-06-17 | 修复词缀单位下拉框问题（"点"选项无法选中） |
| 2026-06-17 | 更新职业配置：术士双武器槽位，新增灵巫职业 |
| 2026-06-17 | 更新 CharacterClass 类型：添加 wizard、ranger、warlock |
| 2026-06-12 | 初始设计文档创建 |
| 2026-06-12 | 添加文本导入功能 (TextImportModal) |
| 2026-06-12 | 添加 JSON 导入功能 (ImportModal) |
| 2026-06-12 | 添加导出已维护数据功能 |
| 2026-06-12 | 更新数据存储架构说明（Zustand + localStorage） |
| 2026-06-12 | 完善文本解析规则文档 |
| 2026-06-12 | 添加护符装备数据（支石墓石、凶邪新月、太阳鸟颈饰、库瓦特里的回音） |
| 2026-06-12 | 更新视觉设计（卡片边框颜色、交互效果） |
| 2026-06-12 | 重构项目，启动开发服务器 |
| 2026-06-12 | 开发威能数据库功能（PowerCard组件、legendaryPowersData数据文件） |
| 2026-06-12 | 添加安魂威能测试数据（死灵法师 · 资源） |
| 2026-06-12 | 更新传奇威能数据模型（LegendaryPower类型定义） |
| 2026-06-12 | 更新威能卡片UI设计（参考暗金装备UI风格） |
| 2026-06-12 | 添加暴烈拳师的威能（全职业 · 攻击） |
| 2026-06-12 | 添加爆炸捕手的威能（游侠 · 通用） |
| 2026-06-12 | 实现描述中特殊中括号蓝色高亮显示 |
| 2026-06-12 | 加深传奇色颜色（从#c9922a改为#b8860b） |
| 2026-06-12 | 添加PowerCard组件详细设计文档 |
| 2026-06-12 | 实现威能数据动态加载功能（JSON文件 + 刷新机制） |

---

## 9. 威能数据动态加载

### 9.1 设计背景

**问题**：威能数据写死在 `*.ts` 文件中，每次更新数据都需要修改代码并重新构建部署。

**目标**：实现运行时动态加载JSON文件，更新JSON后无需重新构建即可生效。

### 9.2 解决方案

采用 **本地JSON文件 + 动态fetch** 方案：

```
public/data/                  ← JSON数据目录（构建时复制到dist）
    └── legendary-powers.json  # 威能数据

src/utils/
    └── dataLoader.ts          # 数据加载工具函数

src/store/
    └── databaseStore.ts       # 状态管理（支持异步加载）
```

### 9.3 文件结构

| 文件 | 路径 | 说明 |
|------|------|------|
| JSON数据 | `public/data/legendary-powers.json` | 威能数据源文件 |
| 加载工具 | `src/utils/dataLoader.ts` | 提供数据加载函数 |
| 状态管理 | `src/store/databaseStore.ts` | 添加异步加载和刷新方法 |

### 9.4 JSON数据格式

**文件**：`public/data/legendary-powers.json`

```json
[
  {
    "id": "lp-eternal-soul",
    "name": "安魂威能",
    "description": "你每有一个激活的仆从，获得 [7.0 - 10.0] 点最大精魂值。",
    "type": "necromancer",
    "powerType": "resource",
    "applicableSlots": ["护符", "戒指"],
    "manuallyVerified": true
  }
]
```

### 9.5 数据加载流程

```
应用启动
    ↓
App.tsx useEffect 触发
    ↓
loadMockData() → 加载其他mock数据
    ↓
reloadLegendaryPowers() → 异步加载JSON
    ↓
fetch('/data/legendary-powers.json')
    ↓
解析JSON → 更新Store状态
    ↓
UI自动渲染最新数据
```

### 9.6 核心代码

#### 9.6.1 数据加载工具

**文件**：`src/utils/dataLoader.ts`

```typescript
import type { LegendaryPower } from '../types';

/**
 * 威能数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadLegendaryPowers(): Promise<LegendaryPower[]> {
  try {
    const response = await fetch('/data/legendary-powers.json');
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load legendary powers:', error);
    return [];
  }
}
```

#### 9.6.2 Store扩展

**文件**：`src/store/databaseStore.ts`

新增字段和方法：

```typescript
interface DatabaseStore {
  // 数据加载状态
  isLoading: boolean;
  dataLoadError: string | null;
  
  // 从JSON重新加载威能数据
  reloadLegendaryPowers: () => Promise<void>;
}

// 实现
reloadLegendaryPowers: async () => {
  set({ isLoading: true, dataLoadError: null });
  try {
    const powers = await loadLegendaryPowers();
    set({ legendaryPowers: powers, isLoading: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载失败';
    set({ dataLoadError: message, isLoading: false });
  }
}
```

#### 9.6.3 UI交互

**文件**：`src/App.tsx`

- 威能分类旁添加 **"刷新数据"** 按钮
- 显示加载状态（loading spinner）
- 加载失败时显示错误提示

### 9.7 使用方式

**更新威能数据流程**：
```
1. 编辑 public/data/legendary-powers.json
2. 保存文件
3. 浏览器刷新页面 (F5)
4. 威能数据自动更新 ✅
```

**手动刷新**：
- 切换到"威能"分类
- 点击旁边的"刷新数据"按钮
- 无需刷新页面即可加载最新数据

### 9.8 技术特点

| 特性 | 说明 |
|------|------|
| **热更新** | 更新JSON后刷新页面即可，无需重新构建 |
| **状态管理** | Zustand统一管理加载状态和错误处理 |
| **错误恢复** | 加载失败时显示友好提示，不影响其他功能 |
| **向后兼容** | 其他数据仍使用原有mock数据机制 |

### 9.9 扩展方向

后续可将更多数据类型迁移到JSON动态加载：

- [ ] 暗金装备数据 `public/data/unique-equipment.json`
- [ ] 词缀数据 `public/data/affixes.json`
- [ ] 技能数据 `public/data/skills.json`
- [ ] 其他游戏数据

### 9.10 注意事项

1. **JSON文件位置**：必须在 `public/data/` 目录下，确保构建时被复制到 `dist/`
2. **数据格式**：必须符合 TypeScript 类型定义，可参考 `src/types/index.ts`
3. **网络请求**：数据通过 `fetch` 加载，需要确保 JSON 文件可访问
4. **跨域限制**：生产环境部署时需注意跨域问题（当前为同源部署，无此问题）

---

## 10. 词缀数据管理

### 10.1 设计背景

**功能目标**：实现词缀数据的动态加载和三列布局展示，支持普通、嬗变、回火三种词缀分类。

**参考设计**：参考暗黑核词缀界面，采用三列卡片布局，每个分类独立展示。

### 10.2 数据模型扩展

**类型定义**：`src/types/index.ts`

```typescript
// 词缀稀有度类型
export type AffixRarity = 'normal' | 'transmute' | 'temper';

// 词缀子分类
export type AffixSubcategory = 'weapon' | 'offense' | 'defense' | 'mobility' | 'resource' | 'general';

// 词缀计算类型
export type AffixCalculationType = 'additive' | 'multiplicative' | 'independent';

export interface Affix {
  id: string;
  name: string;
  category: AffixCategory;
  subcategory: AffixSubcategory;      // 新增：子分类
  rarity: AffixRarity;                // 词缀分类
  calculationType: AffixCalculationType;
  minValue: number;
  maxValue: number;
  unit: string;
  description: string;
  applicableSlots: string[];
  applicableClasses?: CharacterClass[]; // 新增：适用职业
  icon?: string;                        // 新增：图标
}
```

### 10.2.1 字段详细说明

| 字段名 | 类型 | 必填 | 含义 | 参数范围/示例 |
|--------|------|------|------|--------------|
| `id` | string | ✅ | 词缀唯一标识 | `affix-normal-strength` |
| `name` | string | ✅ | 词缀名称 | `力量` |
| `category` | string | ✅ | 词缀主类别 | `primary`（主属性）、`secondary`（次要属性） |
| `subcategory` | string | ❌ | 词缀子类别 | 仅回火词缀使用：`weapon`、`offense`、`defense`、`mobility`、`resource`、`general` |
| `rarity` | string | ✅ | 词缀分类 | `normal`（普通）、`transmute`（嬗变）、`temper`（回火） |
| `calculationType` | string | ✅ | 计算类型 | `additive`（加法）、`multiplicative`（乘法）、`independent`（独立） |
| `minValue` | number | ✅ | 最小值 | `100` |
| `maxValue` | number | ✅ | 最大值 | `121` |
| `unit` | string | ✅ | 单位 | `%`（百分比）、`''`（空字符串，表示"点"） |
| `description` | string | ✅ | 描述文本 | `+[100 - 121] 点力量` |
| `applicableSlots` | string[] | ✅ | 适用装备槽位 | `['helmet', 'chest', 'gloves', 'pants', 'boots']` |
| `applicableClasses` | string[] | ❌ | 适用职业 | `['barbarian', 'druid']`，为空表示全职业适用 |
| `icon` | string | ❌ | 图标路径 | `./images/icons/strength.png` |

### 10.2.2 计算类型说明

| 类型 | 标识 | 显示符号 | 说明 |
|------|------|---------|------|
| 加法 | `additive` | `+` | 数值累加，如 `+50%` 伤害 |
| 乘法 | `multiplicative` | `×` | 倍率相乘，如 `×1.10` |
| 独立 | `independent` | `[x]` | 独立乘区，各自相乘 |

### 10.2.3 示例数据

```json
{
  "id": "affix-normal-strength",
  "name": "力量",
  "category": "primary",
  "subcategory": "general",
  "rarity": "normal",
  "calculationType": "additive",
  "minValue": 100,
  "maxValue": 121,
  "unit": "",
  "description": "+[100 - 121] 点力量",
  "applicableSlots": ["helmet", "chest", "gloves", "pants", "boots"],
  "applicableClasses": ["barbarian", "druid"],
  "icon": "./images/icons/strength.png"
}
```

### 10.3 词缀分类体系

#### 10.3.1 词缀分类（原稀有度）

| 类型 | 标识 | 视觉样式 | 说明 |
|------|------|---------|------|
| 普通 | `normal` | 灰色边框/背景 | 基础词缀，常见属性 |
| 嬗变 | `transmute` | 蓝色边框/背景 | 稀有词缀，百分比属性 |
| 回火 | `temper` | 金色边框/背景 | 传奇词缀，特殊效果 |

> **注**：原字段名 `rarity` 已更名为"词缀分类"，用于区分普通/嬗变/回火三种词缀类型。

#### 10.3.2 子分类

| 分类 | 标识 | 颜色 | 说明 |
|------|------|------|------|
| 武器 | `weapon` | 红色 | 武器专属词缀 |
| 攻击 | `offense` | 橙色 | 伤害相关词缀 |
| 防御 | `defense` | 蓝色 | 防御相关词缀 |
| 机动 | `mobility` | 紫色 | 移动速度相关 |
| 资源 | `resource` | 青色 | 资源/冷却相关 |
| 通用 | `general` | 灰色 | 通用属性词缀 |

> **注**：`subcategory` 字段仅用于回火词缀的分类，普通和嬗变词缀不需要设置此字段。

#### 10.3.3 单位定义

| 单位值 | 显示 | 说明 |
|--------|------|------|
| `'%'` | % | 百分比 |
| `''` (空字符串) | 点 | 固定数值（不显示单位） |

#### 10.3.4 职业配置

| 职业 | 标识 | 武器槽位 | 是否有盾牌 |
|------|------|---------|-----------|
| 野蛮人 | `barbarian` | weapon1, weapon2, weapon3, weapon4 | 否 |
| 死灵法师 | `necromancer` | weapon1, weapon2 | 否 |
| 巫师 | `wizard` | weapon1 | 否 |
| 德鲁伊 | `druid` | weapon1, weapon2 | 否 |
| 游侠 | `ranger` | weapon1, weapon2 | 否 |
| 术士 | `spiritborn` | weapon1, weapon2 | 否 |
| 圣骑士 | `paladin` | weapon1 | 是 |
| 灵巫 | `warlock` | weapon1 | 否 |

### 10.4 动态加载机制

**JSON数据文件**：`public/data/affixes.json`

```json
{
  "id": "affix-temper-lucky-hit-vulnerable",
  "name": "幸运一击易伤",
  "category": "offense",
  "subcategory": "offense",
  "rarity": "temper",
  "calculationType": "additive",
  "minValue": 7,
  "maxValue": 10,
  "unit": "%",
  "description": "幸运一击: 最多有 +[7.0% - 10.0%] 几率使敌人陷入易伤状态，持续 2 秒",
  "applicableSlots": ["weapon1", "weapon2"]
}
```

**加载流程**：与威能数据相同，通过 `fetch` 动态加载。

### 10.5 UI组件设计

**文件**：`src/components/AffixPanel.tsx`

#### 10.5.1 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│  普通词缀                     嬗变词缀                    回火词缀        │
│  ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐ │
│  │ +护甲值         │         │ +敏捷%         │         │ 武器            │ │
│  │ +攻击速度       │         │ +智力%         │         │ ├─攻击速度      │ │
│  │ +冷却缩减       │         │ +力量%         │         │ ├─暴击几率      │ │
│  │ +暴击几率       │         │ +宝石强度      │         │ 攻击            │ │
│  │ +暴击伤害       │         │ +总护甲        │         │ ├─幸运一击易伤  │ │
│  │ +全伤害增伤     │         │ +全元素抗性    │         │ ├─幸运一击虚弱  │ │
│  │ +持续伤害增伤   │         │ +技能等级      │         │ └─幸运一击冻结  │ │
│  │ +生命上限       │         │ +飞行道具两次  │         │                 │ │
│  └─────────────────┘         └─────────────────┘         └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 10.5.2 组件组成

| 组件 | 说明 |
|------|------|
| `AffixPanel` | 主面板，三列布局容器 |
| `AffixCard` | 单个词缀卡片 |
| `AffixGroup` | 回火词缀的子分类分组 |

#### 10.5.3 视觉设计

- **普通词缀**：深灰背景 + 灰色边框
- **嬗变词缀**：蓝灰色背景 + 蓝色边框
- **回火词缀**：金灰色背景 + 金色边框，子分类用彩色标签区分

### 10.6 交互功能

- **搜索过滤**：支持按名称和描述搜索
- **点击查看详情**：点击词缀显示详情弹窗
- **刷新按钮**：词缀分类页提供刷新数据按钮
- **数据动态更新**：修改JSON文件后刷新页面即可生效

### 10.7 文件结构

| 文件 | 路径 | 说明 |
|------|------|------|
| 词缀JSON | `public/data/affixes.json` | 词缀数据源 |
| 数据加载 | `src/utils/dataLoader.ts` | `loadAffixes()` 函数 |
| 状态管理 | `src/store/databaseStore.ts` | `reloadAffixes()` 方法 |
| UI组件 | `src/components/AffixPanel.tsx` | 词缀面板组件 |
| 类型定义 | `src/types/index.ts` | `AffixRarity`、`AffixSubcategory` |

### 10.8 使用方式

**更新词缀数据**：
```
1. 编辑 public/data/affixes.json
2. 保存文件
3. 刷新页面或点击"刷新数据"按钮
4. 数据自动更新 ✅
```

### 10.9 数据示例

#### 普通词缀
```json
{
  "id": "affix-normal-armor",
  "name": "护甲值",
  "category": "defense",
  "subcategory": "defense",
  "rarity": "normal",
  "minValue": 981,
  "maxValue": 1225,
  "unit": "",
  "description": "+[981 - 1225] 护甲值"
}
```

#### 嬗变词缀
```json
{
  "id": "affix-transmute-dexterity",
  "name": "敏捷",
  "category": "primary",
  "subcategory": "general",
  "rarity": "transmute",
  "minValue": 3.5,
  "maxValue": 5,
  "unit": "%",
  "description": "+[3.5% - 5.0%] 敏捷"
}
```

#### 回火词缀
```json
{
  "id": "affix-temper-lucky-hit-vulnerable",
  "name": "幸运一击易伤",
  "category": "offense",
  "subcategory": "offense",
  "rarity": "temper",
  "minValue": 7,
  "maxValue": 10,
  "unit": "%",
  "description": "幸运一击: 最多有 +[7.0% - 10.0%] 几率使敌人陷入易伤状态，持续 2 秒"
}
```

---

## 12. 暗金装备数据动态加载

### 12.1 设计背景

**问题**：暗金装备数据写死在 `src/data/uniqueEquipmentData.ts` 文件中，每次更新数据都需要修改代码并重新构建部署。

**目标**：实现运行时动态加载JSON文件，更新JSON后无需重新构建即可生效。

### 12.2 解决方案

采用 **本地JSON文件 + 动态fetch** 方案：

```
public/data/                  ← JSON数据目录（构建时复制到dist）
    ├── legendary-powers.json  # 威能数据
    ├── affixes.json          # 词缀数据
    └── uniqueEquipment.json  # 暗金装备数据
```

### 12.3 技术实现

#### 12.3.1 数据加载流程

```
页面初始化 → 调用 reloadUniqueEquipment() → fetch uniqueEquipment.json → 更新store → 触发UI渲染
                                    ↑
                           点击"刷新数据"按钮
```

#### 12.3.2 文件结构

| 文件 | 说明 |
|------|------|
| `public/data/uniqueEquipment.json` | 暗金装备JSON数据文件 |
| `src/utils/dataLoader.ts` | 数据加载工具函数 |
| `src/store/databaseStore.ts` | Zustand状态管理 |
| `src/App.tsx` | 页面组件 |

### 12.4 JSON数据格式

```json
{
  "id": "unique-fist-of-fate",
  "name": "命运之拳",
  "itemType": "unique",
  "slot": "gloves",
  "description": "幸运一击几率 +51.8%\n暴击几率 +8.67%",
  "level": 80,
  "affixes": [
    {
      "id": "ua-fist-of-fate-lucky-hit",
      "name": "幸运一击几率",
      "value": 51.8,
      "unit": "%",
      "description": "幸运一击几率 +51.8%"
    },
    {
      "id": "ua-fist-of-fate-crit-chance",
      "name": "暴击几率",
      "value": 8.67,
      "unit": "%",
      "description": "暴击几率 +8.67%"
    }
  ],
  "uniqueEffects": [
    {
      "id": "ue-fist-of-fate-effect",
      "name": "命运之拳",
      "description": "幸运一击：最多有 51.8% 的几率使你的下一次攻击释放两个额外的投射物",
      "condition": ""
    }
  ],
  "icon": "./images/items/unique/fist-of-fate.png",
  "manuallyVerified": true
}
```

### 12.5 核心代码

#### 12.5.1 数据加载工具

**文件**：`src/utils/dataLoader.ts`

```typescript
import type { UniqueEquipment } from '../types';

/**
 * 暗金装备数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadUniqueEquipment(): Promise<UniqueEquipment[]> {
  try {
    const response = await fetch('./data/uniqueEquipment.json');
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load unique equipment:', error);
    return [];
  }
}
```

#### 12.5.2 Store扩展

**文件**：`src/store/databaseStore.ts`

新增字段和方法：

```typescript
interface DatabaseStore {
  // 数据加载状态
  isLoading: boolean;
  dataLoadError: string | null;
  
  uniqueEquipment: UniqueEquipment[];
  
  // 从JSON重新加载暗金装备数据
  reloadUniqueEquipment: () => Promise<void>;
}

// 实现
reloadUniqueEquipment: async () => {
  set({ isLoading: true, dataLoadError: null });
  try {
    const equipment = await loadUniqueEquipment();
    set({ uniqueEquipment: equipment, isLoading: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载失败';
    set({ dataLoadError: message, isLoading: false });
    console.error('Failed to reload unique equipment:', error);
  }
},
```

### 12.6 使用方式

#### 12.6.1 更新数据流程

```
1. 编辑 public/data/uniqueEquipment.json
2. 保存文件
3. 点击页面上的"刷新数据"按钮或刷新页面
4. 数据自动更新 ✅
```

#### 12.6.2 通过数据维护工具更新

1. 进入数据维护页面（点击"数据维护工具"按钮）
2. 选择"暗金装备"分类
3. 📂 从JSON文件加载 → 编辑 → 💾 保存到JSON文件
4. 刷新页面查看更新

### 12.7 与其他数据的对比

| 数据类型 | JSON文件 | 加载方法 | 维护工具 |
|---------|---------|---------|---------|
| 暗金装备 | `uniqueEquipment.json` | `reloadUniqueEquipment()` | 支持 |
| 威能 | `legendary-powers.json` | `reloadLegendaryPowers()` | 支持 |
| 词缀 | `affixes.json` | `reloadAffixes()` | 支持 |

---

## 11. 维护记录

| 日期 | 操作 |
|------|------|
| 2026-06-12 | 词缀功能升级：实现动态加载和三列布局 |
| 2026-06-12 | 添加词缀稀有度类型（普通/嬗变/回火） |
| 2026-06-12 | 创建词缀JSON数据文件 |
| 2026-06-12 | 创建AffixPanel组件 |

---

## 12. 宝石数据动态加载

### 12.1 概述

宝石数据采用与威能、词缀一致的动态加载方案，所有数据存储在JSON文件中，运行时动态加载。

### 12.2 宝石数据模型

**文件位置**：`src/types/index.ts`

```typescript
// 宝石类型
export type GemType = 'ruby' | 'topaz' | 'emerald' | 'sapphire' | 'amethyst' | 'diamond' | 'skull';

export interface Gem {
  id: string;              // 唯一标识
  name: string;            // 宝石名称
  type: GemType;           // 宝石类型
  icon: string;            // 图标路径
  weaponEffect: string;     // 武器效果
  armorEffect: string;      // 防具效果
  jewelryEffect: string;    // 首饰效果
  cubeEffect: string;       // 魔盒效果
  requiredLevel: number;    // 需要等级
}
```

### 12.3 宝石等级体系

暗黑4宝石分为多个等级：

| 等级 | 需要等级 | 武器伤害 | 防具属性 | 首饰抗性 |
|------|----------|----------|----------|----------|
| 巨型 (Grand) | 1 | x24% | +90 | +2,625 |
| 赫拉迪姆 (Horadric) | 30 | x28% | +120 | +3,500 |
| 无瑕赫拉迪姆 (Flawless) | 50 | x32% | +150 | +4,375 |

### 12.4 宝石类型说明

| 类型 | 颜色 | 伤害类型 | 武器效果 | 防具效果 | 首饰效果 |
|------|------|----------|----------|----------|----------|
| 红宝石 (Ruby) | 🔴 | 火焰/神圣 | x% 伤害增倍 | +力量 | +火焰抗性 |
| 黄宝石 (Topaz) | 🟡 | 闪电 | x% 伤害增倍 | +智力 | +闪电抗性 |
| 蓝宝石 (Sapphire) | 🔵 | 冰霜 | x% 伤害增倍 | +意志力 | +冰霜抗性 |
| 绿宝石 (Emerald) | 🟢 | 毒素 | x% 伤害增倍 | +敏捷 | +毒素抗性 |
| 紫宝石 (Amethyst) | 🟣 | 暗影 | x% 伤害增倍 | +意志力 | +暗影抗性 |
| 骷髅 (Skull) | 💀 | 物理 | x% 伤害增倍 | +治疗效果 | +护甲值 |
| 钻石 (Diamond) | 💎 | 全伤害 | x% 伤害增倍 | +全属性 | +全抗性 |

### 12.5 数据来源

宝石数据主要从以下网站获取：

#### 12.5.1 推荐来源

| 网站 | 语言 | URL | 说明 |
|------|------|-----|------|
| Aoeah | 英文 | https://www.aoeah.com/news/4543--diablo-4-royalgrand-gems-farm--horadric-gems-craft-guide-season-13--loh | 提供完整的宝石等级数据 |
| 天翼云 | 中文 | https://m.yesky.com/news/352659.html | 中文宝石说明和用途 |

#### 12.5.2 辅助来源

| 网站 | 语言 | URL | 说明 |
|------|------|-----|------|
| Diablo 4 4Fansites | 德语 | https://diablo.4fansites.de/news,14626,Diablo-4-Alle-geheimen-Horadrischen-Edelsteine-und-ihre-Werte.html | 赫拉迪姆宝石详细数值 |
| TheGeek | 英文 | https://thegeek.games/2026/05/13/one-of-diablo-ivs-new-mechanics-can-give-you-the-best-gems-in-the-game-but-it-barely-explains-how/ | 宝石制作和升级说明 |

### 12.6 数据翻译方法

由于大部分数据来源为英文网站，翻译方法如下：

#### 12.6.1 直接获取中文数据

从 **天翼云 (yesky.com)** 直接获取中文数据，适用于基础翻译。

#### 12.6.2 基于游戏知识翻译

对于游戏特定术语，根据暗黑4游戏中的元素系统翻译：

| 英文 | 中文 | 依据 |
|------|------|------|
| Ruby | 红宝石 | 游戏内宝石颜色 |
| Topaz | 黄宝石 | 游戏内宝石颜色 |
| Sapphire | 蓝宝石 | 游戏内宝石颜色 |
| Emerald | 绿宝石 | 游戏内宝石颜色 |
| Amethyst | 紫宝石 | 游戏内宝石颜色 |
| Skull | 骷髅宝石 | 游戏内宝石类型 |
| Diamond | 钻石 | 游戏内宝石颜色 |
| Fire/Holy | 火焰与神圣 | 伤害类型 |
| Shadow | 暗影 | 伤害类型 |
| Poison | 毒素 | 伤害类型 |
| Cold | 冰霜 | 伤害类型 |
| Lightning | 闪电 | 伤害类型 |
| Physical | 物理 | 伤害类型 |
| Strength | 力量 | 属性名称 |
| Intelligence | 智力 | 属性名称 |
| Dexterity | 敏捷 | 属性名称 |
| Willpower | 意志力 | 属性名称 |
| All Stats | 全属性 | 属性名称 |
| Resistance | 抗性 | 游戏术语 |
| Healing Received | 受到的治疗效果 | 游戏术语 |

#### 12.6.3 数据交叉验证

通过对比多个来源的数据，确保数值一致后再写入JSON：
1. Aoeah（英文）
2. Diablo 4 4Fansites（德语）
3. 天翼云（中文）

### 12.7 图片维护

**图片目录**：`public/images/gems/`

**需要的图片**：

| 文件名 | 对应宝石类型 |
|--------|-------------|
| ruby.png | 红宝石 |
| topaz.png | 黄宝石 |
| sapphire.png | 蓝宝石 |
| emerald.png | 绿宝石 |
| amethyst.png | 紫宝石 |
| skull.png | 骷髅宝石 |
| diamond.png | 钻石 |

**图片规格建议**：
- 格式：PNG（支持透明背景）
- 尺寸：64x64 或 128x128 像素

### 12.8 技术实现

#### 12.8.1 数据加载流程

```
页面加载 → useEffect → reloadGems() → loadGems() → fetch(gems.json) → 更新Store → 渲染UI
```

#### 12.8.2 核心代码

**数据加载工具**（`src/utils/dataLoader.ts`）：
```typescript
export async function loadGems(): Promise<Gem[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}gems.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load gems:', error);
    return [];
  }
}
```

**Store方法**（`src/store/databaseStore.ts`）：
```typescript
reloadGems: async () => {
  set({ isLoading: true, dataLoadError: null });
  try {
    const gemsData = await loadGems();
    set({ gems: gemsData, isLoading: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载失败';
    set({ dataLoadError: message, isLoading: false });
  }
},
```

### 12.9 数据更新流程

1. **获取最新数据**
   - 访问 Aoeah 或其他来源网站
   - 复制最新的宝石数据

2. **翻译数据**
   - 参考天翼云中文数据
   - 使用游戏知识翻译专有名词
   - 交叉验证数值准确性

3. **更新JSON文件**
   - 编辑 `public/data/gems.json`
   - 保存文件

4. **刷新页面**
   - 浏览器刷新页面
   - 数据自动更新显示

### 12.10 与其他数据的对比

| 数据类型 | JSON文件 | 加载方法 | 卡片组件 |
|---------|---------|---------|---------|
| 暗金装备 | `uniqueEquipment.json` | `reloadUniqueEquipment()` | ItemCard |
| 威能 | `legendary-powers.json` | `reloadLegendaryPowers()` | PowerCard |
| 词缀 | `affixes.json` | `reloadAffixes()` | AffixPanel |
| 宝石 | `gems.json` | `reloadGems()` | ItemCard |

---

## 14. 符文数据动态加载

### 14.1 设计概述

符文数据采用与宝石、威能一致的动态加载方案，所有数据存储在JSON文件中，运行时动态加载。符文分为传奇符文和仪祭符文两大类，祈告符文和仪祭符文两个类别。

### 14.2 符文数据模型

**文件位置**：`src/types/index.ts`

```typescript
// 符文类型
export type RuneType = 'legendary' | 'ritual'; // 传奇符文、仪祭符文

// 符文类别
export type RuneCategory = 'Invocation' | 'Supplication'; // 祈告符文、仪祭符文

export interface Rune {
  id: string;              // 唯一标识
  name: string;            // 符文名称
  nameEn: string;          // 英文名称
  type: RuneType;          // 符文类型
  category: RuneCategory;  // 符文类别
  icon: string;            // 图标路径
  obtainedFrom: string;    // 获得方式
  effects: string[];       // 效果列表
  runeWordDesc: string;    // 符文之语说明
}
```

### 14.3 符文分类体系

| 类型 | 说明 | 颜色标识 |
|------|------|---------|
| 传奇符文 (Legendary) | 稀有度最高的符文 | 金色 |
| 仪祭符文 (Ritual) | 普通符文 | 紫色 |

| 类别 | 说明 | 效果颜色 |
|------|------|---------|
| 祈告符文 (Invocation) | 主动技能类符文 | 紫色 |
| 仪祭符文 (Supplication) | 被动效果类符文 | 金色 |

### 14.4 符文之语机制

符文可以组成符文之语，增强装备效果：

- **组合方式**：与一枚祈告符文共同插入装备上的两个镶孔即可关联
- **激活限制**：同一时间只能激活两段符文之语
- **效果叠加**：不同符文之语效果可叠加

### 14.5 文件结构

| 文件 | 路径 | 说明 |
|------|------|------|
| 符文JSON | `public/data/runes.json` | 符文数据源 |
| 数据加载 | `src/utils/dataLoader.ts` | `loadRunes()` 函数 |
| 状态管理 | `src/store/databaseStore.ts` | `reloadRunes()` 方法 |
| UI展示 | `src/components/ItemCard.tsx` | 符文卡片渲染 |

### 14.6 核心代码

**数据加载工具**（`src/utils/dataLoader.ts`）：
```typescript
export async function loadRunes(): Promise<Rune[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}runes.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load runes:', error);
    return [];
  }
}
```

**Store方法**（`src/store/databaseStore.ts`）：
```typescript
reloadRunes: async () => {
  set({ isLoading: true, dataLoadError: null });
  try {
    const runesData = await loadRunes();
    set({ runes: runesData, isLoading: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载失败';
    set({ dataLoadError: message, isLoading: false });
    console.error('Failed to reload runes:', error);
  }
},
```

### 14.7 数据示例

```json
{
  "id": "rune-ahu",
  "name": "阿胡",
  "nameEn": "Ahu",
  "type": "legendary",
  "category": "Invocation",
  "icon": "./images/runes/ahu.png",
  "obtainedFrom": "15 份供品",
  "effects": ["幸运一击：攻击非健康敌人时，最多有 [100%] 几率。"],
  "runeWordDesc": "与一枚祈告符文共同插入装备上的两个镶孔即可关联，组成一段符文之语。同一时间只能激活两段符文之语。"
}
```

### 14.8 视觉设计

| 元素 | 样式 | 说明 |
|------|------|------|
| 传奇符文名字 | `text-d4-gold` | 金色 |
| 祈告符文效果 | `text-purple-400` | 紫色 |
| 仪祭符文效果 | `text-d4-gold` | 金色 |
| 获得方式图标 | `◇` | 菱形符号 |
| 效果列表图标 | `✦` | 星号符号 |

---

## 15. 护身符数据动态加载

### 15.1 设计概述

护身符数据采用与其他数据类型一致的动态加载方案，护身符分为神符和封印两种类型，是玩家可装备的重要饰品。

### 15.2 护身符数据模型

**文件位置**：`src/types/index.ts`

```typescript
// 护身符类型
export type AmuletType = 'talisman' | 'seal'; // 神符、封印

export interface Amulet {
  id: string;                  // 唯一标识
  name: string;                // 护身符名称
  type: AmuletType;            // 类型：神符/封印
  level: number;               // 需要等级
  description: string;         // 效果描述
  flavorText: string;          // 背景故事描述
  icon: string;                // 图标路径
  applicableClasses: string[]; // 适用职业
}
```

### 15.3 护身符分类

| 类型 | 说明 | 示例 |
|------|------|------|
| 神符 (Talisman) | 提供主动/被动技能效果 | 末日使者、安达莉尔的仪容 |
| 封印 (Seal) | 提供特殊被动效果 | 待扩展 |

### 15.4 文件结构

| 文件 | 路径 | 说明 |
|------|------|------|
| 护身符JSON | `public/data/amulets.json` | 护身符数据源 |
| 数据加载 | `src/utils/dataLoader.ts` | `loadAmulets()` 函数 |
| 状态管理 | `src/store/databaseStore.ts` | `reloadAmulets()` 方法 |
| UI展示 | `src/components/ItemCard.tsx` | 护身符卡片渲染 |

### 15.5 核心代码

**数据加载工具**（`src/utils/dataLoader.ts`）：
```typescript
export async function loadAmulets(): Promise<Amulet[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}amulets.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load amulets:', error);
    return [];
  }
}
```

**Store方法**（`src/store/databaseStore.ts`）：
```typescript
reloadAmulets: async () => {
  set({ isLoading: true, dataLoadError: null });
  try {
    const amuletsData = await loadAmulets();
    set({ amulets: amuletsData, isLoading: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载失败';
    set({ dataLoadError: message, isLoading: false });
    console.error('Failed to reload amulets:', error);
  }
},
```

### 15.6 数据示例

```json
{
  "id": "amulet-doomsday-messenger",
  "name": "末日使者",
  "type": "talisman",
  "level": 70,
  "description": "幸运一击：最多有 40% 几率对周围敌人造成 1,500 点暗影伤害，并使其造成的伤害降低 25%，持续 5 秒。",
  "flavorText": "每当这把古剑重现于世，都预示着一个充满纷争的时代，以及无数生命的毁灭。",
  "icon": "./images/amulets/doomsday-messenger.png",
  "applicableClasses": ["巫师", "德鲁伊", "野蛮人", "游侠", "死灵法师", "圣骑士", "术士"]
}
```

### 15.7 视觉设计

| 元素 | 样式 | 说明 |
|------|------|------|
| 名称 | `text-purple-400` | 紫色 |
| 效果描述 | `text-purple-300` | 浅紫色 |
| 背景故事 | `text-d4-text-secondary italic` | 斜体灰色 |
| 图标 | 📿 | emoji占位符 |
| 需要等级标签 | `bg-d4-input` | 深色背景 |

### 15.8 数据判断优先级问题

**问题**：护身符和威能都具有 `type`、`description`、`icon` 属性，需要注意判断顺序。

**解决方案**：在 `ItemCard.tsx` 中，将护身符的判断条件移到威能判断之前：

```typescript
// 护身符类型判断（必须在威能判断之前）
if ('type' in item && 'applicableClasses' in item && 'flavorText' in item) {
  const amulet = item as Amulet;
  // ... 护身符渲染逻辑
}

// 威能类型判断
if ('type' in item && 'description' in item && 'icon' in item) {
  const power = item as LegendaryPower;
  // ... 威能渲染逻辑
}
```

---

## 16. 数据类型对比汇总

| 数据类型 | JSON文件 | 加载方法 | 卡片组件 | 特殊特性 |
|---------|---------|---------|---------|---------|
| 暗金装备 | `uniqueEquipment.json` | `reloadUniqueEquipment()` | ItemCard | 神话/暗金区分 |
| 威能 | `legendary-powers.json` | `reloadLegendaryPowers()` | PowerCard | 职业/类型筛选 |
| 词缀 | `affixes.json` | `reloadAffixes()` | AffixPanel | 三列布局 |
| 技能 | `skills.json` | `reloadSkills()` | ItemCard | 职业分类 |
| 宝石 | `gems.json` | `reloadGems()` | ItemCard | 武器/防具/首饰效果 |
| 符文 | `runes.json` | `reloadRunes()` | ItemCard | 符文之语机制 |
| 护身符 | `amulets.json` | `reloadAmulets()` | ItemCard | 背景故事描述 |
| 制作材料 | `crafting-materials.json` | `reloadCraftingMaterials()` | ItemCard | 分类展示 |

---

## 17. 维护记录

| 日期 | 操作 |
|------|------|
| 2026-06-14 | 符文功能完成：实现动态加载和符文卡片UI |
| 2026-06-14 | 添加符文类型定义（RuneType、RuneCategory） |
| 2026-06-14 | 创建符文JSON数据文件 |
| 2026-06-14 | 护身符功能完成：实现动态加载和护身符卡片UI |
| 2026-06-14 | 添加护身符类型定义（AmuletType） |
| 2026-06-14 | 创建护身符JSON数据文件 |
| 2026-06-14 | 修复护身符判断优先级问题 |
| 2026-06-14 | 添加7种宝石类型 × 3个等级 = 21种宝石 |
| 2026-06-14 | 创建宝石图片目录 `public/images/gems/` |
| 2026-06-14 | 文档化宝石数据获取方法和翻译规则 |
