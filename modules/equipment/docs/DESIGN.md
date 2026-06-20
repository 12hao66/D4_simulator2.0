# 装备模拟器 设计文档

> Diablo IV Equipment Simulator Design Document

## 1. 系统概述

### 1.1 项目目标
为暗黑破坏神4玩家提供一个装备搭配模拟工具，支持全职业装备选择、属性计算和方案管理。

### 1.2 核心特性
- **7种职业支持**：野蛮人、死灵法师、巫师、德鲁伊、游侠、灵巫、圣骑士
- **12个装备槽位**：头盔、胸部、手套、裤子、靴子、武器1-4、护符、戒指1-2
- **5种稀有度**：普通、魔法、稀有、传奇、暗金
- **方案管理系统**：创建、保存、加载、导入导出装备配置
- **属性实时计算**：根据装备词缀自动计算角色属性
- **数据持久化**：使用localStorage保存所有数据

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
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Header  │  │ Character│  │ Equipment│  │  Stats  │ │
│  │          │  │  Panel   │  │  Slots   │  │  Panel  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Action  │  │ Equipment│  │   Build  │  │ Tooltip │ │
│  │   Bar    │  │ Selector │  │ Manager  │  │         │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │           useEquipmentStore (Zustand)            │   │
│  │  - character: Character                          │   │
│  │  - equipment: Record<EquipmentSlot, Item>       │   │
│  │  - equipmentConfig: Record<EquipmentSlot, Config>│   │
│  │  - builds: Build[]                              │   │
│  │  - currentBuildId: string | null                │   │
│  │  - legendaryPowers: LegendaryPower[]            │   │
│  │  - uniqueEquipment: UniqueEquipment[]           │   │
│  │  - affixes: Affix[]                             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Gems   │  │  Runes   │  │ Amulets  │  │  Other  │ │
│  │  Data    │  │  Data    │  │  Data    │  │  Data   │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Storage Layer                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              localStorage                         │   │
│  │  Key: equipment-simulator-storage                │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
modules/equipment/
├── public/
│   └── images/
│       ├── class/          # 职业图片
│       │   ├── bg-*.jpg    # 背景图片
│       │   └── *.png       # 角色图片
│       ├── icons/          # 装备槽位图标
│       ├── gems/           # 宝石图标
│       ├── runes/          # 符文图标
│       └── amulets/        # 护身符图标
├── src/
│   ├── types/              # 类型定义
│   │   ├── equipment.ts    # 装备相关类型
│   │   └── database.ts     # 数据库类型
│   ├── store/              # 状态管理
│   │   └── equipmentStore.ts
│   ├── services/           # 数据服务
│   │   └── databaseService.ts
│   ├── components/         # UI组件
│   │   ├── Header.tsx
│   │   ├── CharacterPanel.tsx
│   │   ├── EquipmentSlots.tsx
│   │   ├── EquipmentSelector.tsx
│   │   ├── EquipmentTooltip.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── ActionBar.tsx
│   │   └── BuildManager.tsx
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口
│   └── index.css           # 全局样式
├── docs/                   # 文档
│   ├── DESIGN.md           # 设计文档（本文档）
│   ├── README.md           # 模块说明
│   ├── API.md              # API文档
│   ├── CHANGELOG.md        # 更新日志
│   ├── STATS_PANEL.md      # 属性面板设计
│   ├── EQUIPMENT_TOOLTIP.md # 装备Tooltip设计
│   └── EQUIPMENT_SELECTOR.md # 装备选择器设计
└── package.json
```

---

## 3. 数据模型设计

### 3.1 核心类型定义

#### 3.1.1 装备槽位
```typescript
type EquipmentSlot =
  | 'helmet' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'weapon1' | 'weapon2' | 'weapon3' | 'weapon4'
  | 'amulet' | 'ring1' | 'ring2'
```

#### 3.1.2 稀有度
```typescript
type Rarity = 'common' | 'magic' | 'rare' | 'legendary' | 'unique'
```

#### 3.1.3 职业类型
```typescript
type CharacterClass =
  | 'barbarian' | 'necromancer' | 'sorc'
  | 'druid' | 'rogue' | 'spiritborn' | 'paladin'
```

#### 3.1.4 词缀类型
```typescript
interface Affix {
  id: string
  name: string
  value: number
  type: 'additive' | 'multiplicative' | 'independent'
  unit?: '%' | '点'
  symbol?: '+' | 'x' | ''
  suffix?: string  // 后缀标记，如 [x]
}
```

#### 3.1.5 装备物品
```typescript
interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  rarity: Rarity
  level: number
  affixes: Affix[]
  legendaryPower?: string
  uniqueEffect?: string
  icon: string
  gems?: Gem[]           // 镶嵌的宝石
  runes?: Rune[]         // 镶嵌的符文
}
```

#### 3.1.6 方案数据
```typescript
interface Build {
  id: string
  name: string
  characterClass: CharacterClass
  equipment: Record<EquipmentSlot, EquipmentItem | null>
  createdAt: number
}
```

#### 3.1.7 角色属性
```typescript
interface EquipmentStats {
  // 主要属性
  strength: number
  dexterity: number
  intelligence: number

  // 战斗属性
  attackSpeed: number
  critChance: number
  critDamage: number
  vulnerableDamage: number

  // 防御属性
  armor: number
  resistance: number
  health: number

  // 伤害加成
  additiveDamage: number
  multiplicativeDamage: number
  independentMultiplier: number

  // 统计
  equippedCount: number
  legendaryEffects: number
}
```

### 3.2 数据流设计

#### 3.2.1 装备变更流程
```
用户操作 → 组件事件 → Store方法 → 状态更新 → UI重渲染
    ↓           ↓           ↓           ↓           ↓
点击槽位  onClick  equipItem  set(state)  组件更新
```

#### 3.2.2 方案管理流程
```
新建方案 → createEmptyBuild → 创建Build → 设置currentBuildId → 自动加载
复制方案 → duplicateBuild → 创建副本 → 自动加载副本
加载方案 → loadBuild → 查找Build → 更新equipment → 设置currentBuildId
删除方案 → deleteBuild → 过滤builds → 清空currentBuildId
```

#### 3.2.3 属性计算流程
```
装备变更 → calculateStats → 遍历装备 → 累加词缀 → 返回属性
    ↓           ↓           ↓           ↓           ↓
equipItem  计算触发  读取equipment  应用词缀  更新UI
```

---

## 4. 方案管理系统设计

### 4.1 功能概述
方案管理系统允许用户保存、加载、分享装备配置方案，支持浏览器本地持久化存储。

### 4.2 核心功能

| 功能 | 方法 | 自动加载 | 说明 |
|-----|------|---------|------|
| 新建方案 | `createEmptyBuild()` | ✅ | 创建空白方案并自动加载 |
| 复制方案 | `duplicateBuild(buildId)` | ✅ | 复制当前方案创建变体 |
| 加载方案 | `loadBuild(buildId)` | ✅ | 加载指定方案 |
| 重命名方案 | `updateBuildName(buildId, name)` | ❌ | 修改方案名称 |
| 删除方案 | `deleteBuild(buildId)` | ❌ | 删除指定方案 |
| 导出方案 | `exportBuildAsFile(buildId)` | ❌ | 导出为JSON文件 |
| 导入方案 | `importBuildFromFile(file)` | ✅ | 从JSON文件导入 |

### 4.3 自动同步机制

装备变更时自动同步更新当前方案数据：

```typescript
equipItem: (slot, item) => {
  set(state => {
    const newEquipment = { ...state.equipment, [slot]: item }
    // 如果有当前方案，同时更新方案数据
    const newBuilds = state.currentBuildId
      ? state.builds.map(b =>
          b.id === state.currentBuildId
            ? { ...b, equipment: newEquipment }
            : b
        )
      : state.builds
    return {
      equipment: newEquipment,
      builds: newBuilds
    }
  })
}
```

**同步的方法：**
- `equipItem` - 装备普通物品
- `unequipItem` - 卸下装备
- `equipUniqueItem` - 装备暗金物品

### 4.4 永久存储

使用 Zustand 的 `persist` 中间件：

```typescript
persist(
  (set, get) => ({ /* ... */ }),
  {
    name: 'equipment-simulator-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      character: state.character,
      equipment: state.equipment,
      equipmentConfig: state.equipmentConfig,
      builds: state.builds,
      currentBuildId: state.currentBuildId
    })
  }
)
```

### 4.5 导入导出

**导出格式：**
```json
{
  "version": "1.0",
  "name": "我的野蛮人方案",
  "characterClass": "barbarian",
  "equipment": {
    "helmet": { ... },
    "chest": { ... },
    // ... 其他槽位
  }
}
```

**导出特性：**
- 导出当前正在编辑的方案时，使用最新的 `equipment` 状态
- 文件名格式：`d4-build-{方案名}.json`
- 自动下载到本地

**导入特性：**
- 支持点击选择或拖放JSON文件
- 自动验证文件格式和内容
- 导入成功后自动加载装备配置和职业

---

## 5. 属性计算系统设计

### 5.1 伤害乘区分类

| 乘区类型 | 判断条件 | 计算方式 | 示例 |
|---------|---------|---------|------|
| **A类加成** | 伤害类词缀（排除攻击速度、暴击几率、抗性类） | 加法累加 | +50%火焰伤害 |
| **B类乘区** | x前缀或multiplicative类型 | 同名词缀相加后再相乘 | ×1.10 ×1.15 → ×1.265 |
| **独立乘区** | 后缀[x]类型 | 各自独立相乘 | ×1.05[x] ×1.08[x] |

### 5.2 伤害类关键词
```typescript
const damageKeywords = [
  '伤害', '技能', '易伤', '流血', '燃烧', '冰冻',
  '中毒', '暗影', '火焰', '冰霜', '闪电', '神圣', '物理'
]

const excludeKeywords = [
  '攻击速度', '暴击几率', '抗性', '抗'
]
```

### 5.3 属性来源追踪

每个属性都记录详细的来源信息：

```typescript
interface AttributeSource {
  name: string        // 来源名称（装备名）
  value: number       // 贡献值
  type: 'base' | 'affix' | 'power' // 来源类型
}

interface AttributeDetail {
  baseValue: number           // 基础值
  totalValue: number          // 总值
  sources: AttributeSource[]  // 来源列表
}
```

### 5.4 计算流程

```
1. 获取职业基础属性
2. 遍历所有装备槽位
3. 累加装备词缀到对应属性
4. 计算伤害乘区
5. 返回最终属性
```

---

## 6. UI设计规范

### 6.1 布局尺寸

| 区域 | 宽度 | 高度 |
|------|------|------|
| 整体容器 | 850px | 820px |
| 装备槽位 | 55px | 85px |
| 槽位图标 | 38px | 38px |
| 属性面板 | 180px | 100% |
| 角色展示区 | 约450px | 340px |

### 6.2 稀有度颜色

| 稀有度 | 颜色 | 边框 | 发光效果 |
|--------|------|------|----------|
| 普通 | 灰色 | #808080 | 无 |
| 魔法 | 绿色 | #1eff00 | 绿色光晕 |
| 稀有 | 蓝色 | #0070dd | 蓝色光晕 |
| 传奇 | 橙色 | #ff8000 | 橙色光晕 |
| 暗金 | 金色 | #e6cc80 | 金色光晕 |

### 6.3 暗黑风格主题

```css
/* 主色调 */
--d4-base: #1a1a1a;
--d4-panel: #2a2a2a;
--d4-border: #3a3a3a;
--d4-text: #e0e0e0;
--d4-text-secondary: #a0a0a0;

/* 强调色 */
--d4-gold: #e6cc80;
--d4-blue: #0070dd;
--d4-green: #1eff00;
--d4-red: #ff4444;
--d4-yellow: #ffff00;
--d4-purple: #a335ee;
```

### 6.4 交互效果

- **悬停效果**：装备槽位悬停放大1.1倍
- **选中效果**：金色边框 + 发光阴影
- **过渡动画**：200ms ease-in-out
- **模态框**：半透明黑色背景（rgba(0,0,0,0.6)）

---

## 7. 组件设计

### 7.1 组件列表

| 组件 | 功能 | 状态管理 |
|------|------|---------|
| Header | 顶部导航，职业选择器 | useEquipmentStore |
| CharacterPanel | 角色展示，背景切换 | useEquipmentStore |
| EquipmentSlots | 装备槽位展示 | useEquipmentStore |
| EquipmentSelector | 装备选择弹窗 | useEquipmentStore |
| EquipmentTooltip | 装备悬浮提示 | useEquipmentStore |
| StatsPanel | 属性面板 | useEquipmentStore |
| ActionBar | 底部快捷栏 | useEquipmentStore |
| BuildManager | 方案管理 | useEquipmentStore |

### 7.2 组件通信

```
┌─────────────┐
│   Header    │ ←─ 职业选择
└─────────────┘
      ↓
┌─────────────┐  ┌─────────────┐
│   Character │  │ Equipment   │ ←─ 槽位点击
│   Panel     │  │   Slots     │
└─────────────┘  └─────────────┘
      ↓                ↓
┌─────────────┐  ┌─────────────┐
│   Stats     │  │ Equipment   │ ←─ 装备选择
│   Panel     │  │  Selector   │
└─────────────┘  └─────────────┘
                      ↓
              ┌─────────────┐
              │   Build     │ ←─ 方案管理
              │  Manager    │
              └─────────────┘
```

### 7.3 状态共享

所有组件共享同一个 `useEquipmentStore` 实例，通过 Zustand 实现全局状态管理。

---

## 8. 性能优化

### 8.1 状态管理优化
- 使用 Zustand 的 `persist` 中间件实现持久化
- 使用 `partialize` 只持久化必要字段
- 避免不必要的状态更新

### 8.2 渲染优化
- 使用 React.memo 优化组件渲染
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存事件处理函数

### 8.3 数据加载优化
- 异步加载数据库数据
- 使用 Loading 状态提升用户体验
- 数据缓存避免重复加载

---

## 9. 安全性考虑

### 9.1 数据验证
- 导入数据时验证格式
- 防止XSS攻击（React自动转义）
- 文件上传限制为JSON格式

### 9.2 错误处理
- try-catch 捕获异常
- 用户友好的错误提示
- 降级方案处理失败情况

---

## 10. 扩展性设计

### 10.1 模块化设计
- 组件独立封装
- 类型定义集中管理
- 服务层分离业务逻辑

### 10.2 可扩展性
- 支持新增职业
- 支持新增装备槽位
- 支持新增稀有度
- 支持新增词缀类型

### 10.3 国际化
- 文本集中管理
- 支持多语言切换
- 日期/数字格式化

---

## 11. 测试策略

### 11.1 单元测试
- Store 方法测试
- 工具函数测试
- 类型定义验证

### 11.2 集成测试
- 组件交互测试
- 数据流测试
- 导入导出测试

### 11.3 E2E测试
- 完整用户流程测试
- 跨浏览器兼容性测试
- 性能测试

---

## 12. 部署方案

### 12.1 构建流程
```bash
npm run build
```

### 12.2 输出产物
- `dist/index.html` - 入口HTML
- `dist/assets/*.css` - 样式文件
- `dist/assets/*.js` - JavaScript文件

### 12.3 部署方式
- 静态文件部署
- 支持CDN加速
- 支持PWA（可选）

---

## 13. 版本规划

### v1.7.0 (当前)
- ✅ 方案管理系统
- ✅ 导入导出功能
- ✅ 永久存储

### v1.8.0 (计划)
- 技能系统
- 巅峰系统
- 更多职业支持

### v2.0.0 (未来)
- 多语言支持
- 在线分享功能
- 云端存储

---

## 14. 参考文档

- [README.md](./README.md) - 模块说明
- [API.md](./API.md) - API文档
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志
- [STATS_PANEL.md](./STATS_PANEL.md) - 属性面板设计
- [EQUIPMENT_TOOLTIP.md](./EQUIPMENT_TOOLTIP.md) - 装备Tooltip设计
- [EQUIPMENT_SELECTOR.md](./EQUIPMENT_SELECTOR.md) - 装备选择器设计

---

## 15. 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues
- 项目文档
- 开发团队

---

## 15. 词缀单位系统

### 15.1 单位定义

| 单位值 | 显示 | 说明 |
|--------|------|------|
| `'%'` | % | 百分比 |
| `''` (空字符串) | 点 | 固定数值（不显示单位） |

### 15.2 数据同步机制

装备模拟器需要从两个来源加载词缀数据：

1. **JSON文件**：基础词缀数据（`public/data/affixes.json`）
2. **localStorage**：数据库模块保存的自定义词缀（`d4-custom-data`）

**加载流程**：
```
应用启动
    ↓
加载JSON文件词缀
    ↓
读取localStorage['d4-custom-data']
    ↓
---

## 15. 数据存储架构

### 15.1 存储策略概述

本模块采用**分离存储架构**，将系统数据、用户数据和方案配置分开处理：

| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| **系统数据** | 内存（从 JSON 加载） | 词缀、威能、暗金装备、宝石、符文等 |
| **用户数据** | localStorage | 用户在词缀选择器中创建的自定义词缀 |
| **方案配置** | localStorage | 军械库中的装备方案和当前配置 |

### 15.2 系统数据加载

**文件位置**：`src/components/EquipmentSelectorNew.tsx`

系统数据从数据库模块的 JSON 文件加载：

```typescript
const loadData = async () => {
  // 从服务器加载基础数据
  const affixesRes = await fetch(getDatabaseDataUrl('affixes.json'))
  const legendaryPowersRes = await fetch(getDatabaseDataUrl('legendary-powers.json'))
  const uniqueEquipmentRes = await fetch(getDatabaseDataUrl('uniqueEquipment.json'))
  // ...
}
```

**加载的 JSON 文件**：

| 文件 | 说明 |
|------|------|
| `affixes.json` | 词缀数据 |
| `legendary-powers.json` | 传奇威能数据 |
| `uniqueEquipment.json` | 暗金装备数据 |
| `gems.json` | 宝石数据 |
| `runes.json` | 符文数据 |

**特性**：
- ✅ 每次刷新页面从服务器加载最新数据
- ✅ 服务器更新数据后，用户刷新即可获取最新
- ✅ 无需手动清除缓存

### 15.3 自定义词缀加载

**文件位置**：`src/components/EquipmentSelectorNew.tsx` 第141-160行

用户通过数据库模块创建的自定义词缀会持久化到 localStorage：

```typescript
// 加载数据库模块保存的自定义词缀
try {
  const customData = localStorage.getItem('d4-custom-data')
  if (customData) {
    const parsed = JSON.parse(customData)
    const customAffixes = parsed.customAffixes || []
    
    // 合并自定义词缀（避免重复ID）
    const mergedAffixes = [...jsonAffixes]
    for (const custom of customAffixes) {
      if (!mergedAffixes.find(a => a.id === custom.id)) {
        mergedAffixes.push(custom)
      }
    }
    setAffixes(mergedAffixes)
  }
} catch (e) {
  console.error('Failed to load custom affixes:', e)
}
```

**localStorage Key**：`d4-custom-data`

**数据结构**：
```typescript
{
  customLegendaryPowers: [],  // 自定义威能
  customAffixes: []          // 自定义词缀
}
```

### 15.4 方案管理（军械库）持久化

**文件位置**：`src/store/equipmentStore.ts`

军械库中的所有装备方案通过 zustand persist 中间件持久化：

```typescript
{
  name: 'equipment-simulator-storage',  // localStorage key
  storage: createJSONStorage(() => localStorage),
  // 只持久化需要的字段
  partialize: (state) => ({
    character: state.character,           // 当前角色职业
    equipment: state.equipment,          // 当前装备配置
    equipmentConfig: state.equipmentConfig, // 装备配置选项
    builds: state.builds,               // 所有方案数据
    currentBuildId: state.currentBuildId // 当前方案ID
  })
}
```

**localStorage Key**：`equipment-simulator-storage`

**持久化内容**：

| 字段 | 内容 | 说明 |
|------|------|------|
| `character` | 当前角色职业 | 野蛮人、死灵等 |
| `equipment` | 当前装备配置 | 各部位装备和词缀 |
| `equipmentConfig` | 装备配置选项 | 稀有度等设置 |
| `builds` | 所有方案数据 | 军械库中的所有方案 |
| `currentBuildId` | 当前方案ID | 正在使用的方案 |

### 15.5 数据存储流程图

```
┌─────────────────────────────────────────────────────────────┐
│                      装备模拟器启动                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    系统数据加载                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 1. 加载 JSON 文件 (每次刷新从服务器获取最新)          │  │
│  │    - affixes.json     → 基础词缀数据                 │  │
│  │    - legendary-powers.json → 传奇威能数据            │  │
│  │    - uniqueEquipment.json → 暗金装备数据             │  │
│  │    - gems.json        → 宝石数据                     │  │
│  │    - runes.json       → 符文数据                     │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 2. 加载 localStorage (d4-custom-data)              │  │
│  │    - 自定义词缀                                     │  │
│  │    - 自定义威能                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 3. 合并数据 (避免重复ID)                            │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    方案配置加载                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 加载 localStorage (equipment-simulator-storage)     │  │
│  │    - 加载所有方案 (builds)                          │  │
│  │    - 加载当前方案 (currentBuildId)                  │  │
│  │    - 加载当前装备 (equipment)                       │  │
│  │    - 加载角色职业 (character)                       │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    显示完整界面
```

### 15.6 数据存储对比

| 存储类型 | 存储方式 | Key | 持久化内容 | 刷新后变化 |
|---------|---------|-----|-----------|----------|
| **系统数据** | 内存 | 无 | 词缀、威能、暗金等 | 从服务器重新加载 |
| **用户数据** | localStorage | `d4-custom-data` | 自定义词缀、威能 | 保留 |
| **方案配置** | localStorage | `equipment-simulator-storage` | 方案、装备、职业 | 保留 |

### 15.7 为什么这样设计？

**优势**：
- ✅ 系统数据永远是最新版本（每次刷新从服务器加载）
- ✅ 用户自定义数据不会丢失（持久化到 localStorage）
- ✅ 方案配置完整保留（支持跨会话使用）
- ✅ 无需手动清除缓存即可获取最新系统数据

**适用场景**：
- ✅ 词缀数据更新后，用户刷新即可看到最新
- ✅ 用户创建的装备方案不会因刷新丢失
- ✅ 方案支持导出/导入备份

---

## 16. 修复记录

| 问题 | 原因 | 修复方案 |
|------|------|---------|
| 词缀单位显示错误 | 下拉框选项配置不一致 | 统一使用 `value=""` 表示"点" |
| 自定义词缀默认显示% | `customUnit` 默认值为 `'%'` | 改为 `''`（空字符串） |
| 自定义词缀不显示 | 未加载localStorage数据 | 添加localStorage数据合并逻辑 |

---

## 16. 职业配置

### 16.1 职业列表

```typescript
type CharacterClass =
  | 'barbarian'    // 野蛮人
  | 'necromancer'  // 死灵法师
  | 'sorc'         // 法师
  | 'wizard'       // 巫师
  | 'druid'        // 德鲁伊
  | 'rogue'        // 游侠
  | 'ranger'       // 游侠（别名）
  | 'spiritborn'   // 术士
  | 'paladin'      // 圣骑士
  | 'warlock'      // 灵巫
```

### 16.2 武器槽位配置

| 职业 | 武器槽位 | 是否有盾牌 |
|------|---------|-----------|
| 野蛮人 | 4个 | 否 |
| 死灵法师 | 2个 | 否 |
| 巫师 | 1个 | 否 |
| 德鲁伊 | 2个 | 否 |
| 游侠 | 2个 | 否 |
| 术士 | 2个 | 否 |
| 圣骑士 | 1个 | 是 |
| 灵巫 | 1个 | 否 |

---

**文档版本**: v1.1
**最后更新**: 2026-06-17
**维护者**: 开发团队