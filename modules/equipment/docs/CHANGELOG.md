# 装备模拟器 更新日志

## v1.10.0 (2026-06-18)

### 数据存储架构统一

#### 架构优化
- ✅ **数据存储策略统一**：与数据库管理模块保持一致
  - 系统数据（词缀、威能、暗金等）每次刷新从服务器 JSON 加载
  - 用户数据（自定义词缀）持久化到 localStorage
  - 方案配置（军械库）通过 zustand persist 中间件持久化

#### 系统数据加载
- ✅ 词缀数据从 `affixes.json` 每次刷新加载（保证最新）
- ✅ 威能数据从 `legendary-powers.json` 每次刷新加载
- ✅ 暗金装备从 `uniqueEquipment.json` 每次刷新加载
- ✅ 宝石数据从 `gems.json` 每次刷新加载
- ✅ 符文数据从 `runes.json` 每次刷新加载

#### 用户数据持久化
- ✅ 自定义词缀从 `d4-custom-data` (localStorage) 加载
- ✅ 自定义威能从 `d4-custom-data` (localStorage) 加载
- ✅ 合并逻辑避免重复 ID

#### 方案管理持久化
- ✅ 所有方案数据持久化到 `equipment-simulator-storage` (localStorage)
- ✅ 当前装备配置持久化
- ✅ 当前角色职业持久化
- ✅ 刷新浏览器数据完整保留

#### 数据存储对比

| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| 系统数据（词缀、威能、暗金等） | 内存 | 每次刷新从 JSON 加载 |
| 用户数据（自定义词缀、威能） | localStorage | 通过 d4-custom-data 持久化 |
| 方案配置（军械库） | localStorage | 通过 equipment-simulator-storage 持久化 |

### 文档更新
- ✅ DESIGN.md 新增「数据存储架构」章节
- ✅ 记录系统数据加载流程
- ✅ 记录自定义词缀加载机制
- ✅ 记录方案管理持久化实现

## v1.9.1 (2026-06-17)

### 词缀单位显示修复

#### 问题描述
装备模拟器中词缀单位显示存在多个问题：
1. 选择单位为"点"的词缀时，在装备选择界面显示为"%"
2. 自定义词缀添加后，单位下拉框显示不正确
3. 预览显示"点"字而非空字符串

#### 根本原因
1. 单位下拉框选项配置不一致：部分地方使用 `value="点"`，部分使用 `value=""`
2. `customUnit` 状态默认值设置为 `'%'`
3. 装备模拟器未加载数据库模块localStorage中的自定义词缀

#### 修复内容

| 文件 | 修改内容 |
|------|---------|
| `EquipmentSelectorNew.tsx` | 加载词缀时合并localStorage中的自定义词缀 |
| `EquipmentSelectorNew.tsx` | 词缀编辑下拉框：`value="点"` → `value=""` |
| `EquipmentSelectorNew.tsx` | 自定义词缀添加下拉框：`value="点"` → `value=""` |
| `EquipmentSelectorNew.tsx` | 自定义词缀列表下拉框：`value="点"` → `value=""` |
| `EquipmentSelectorNew.tsx` | `customUnit` 默认值从 `'%'` 改为 `''` |

#### 数据流向

```
词缀数据库 (unit: "")
    ↓
装备选择器加载 (合并JSON + localStorage)
    ↓
词缀选择弹窗 (正确显示"点")
    ↓
确认添加词缀 (保存 unit: "")
    ↓
装备槽卡片 (正确显示"点")
    ↓
编辑词缀 (下拉框正确显示"点") ✅
```

#### 单位定义规范

| 单位值 | 显示 | 说明 |
|--------|------|------|
| `'%'` | % | 百分比 |
| `''` (空字符串) | 点 | 固定数值（不显示单位） |

---

## v1.9.0 (2026-06-17)

### 词缀计算类型统一

#### 问题描述
`position` 和 `calculationType` 字段语义重复，导致大量映射代码和维护成本。

#### 分析结果

| `position` 值 | `calculationType` 值 | 显示符号 |
|--------------|---------------------|---------|
| `additive` | `additive` | `+` |
| `prefix` | `multiplicative` | `×` |
| `suffix` | `independent` | `[x]` |

#### 修复内容

| 文件 | 修改内容 |
|------|---------|
| `types/equipment.ts` | 移除 `position` 字段定义 |
| `EquipmentSelectorNew.tsx` | 删除 position ↔ calculationType 映射逻辑 |
| `equipmentStore.ts` | 属性面板计算改用 `calculationType` |
| `EquipmentSelectorNew.tsx` | 更新词缀类型选择器选项 |

#### 优化收益

| 指标 | 优化前 | 优化后 |
|------|-------|-------|
| 相关字段数 | 3个 | 1个（calculationType） |
| 映射代码量 | ~20行 | 0行 |
| 维护成本 | 高 | 低 |
| 代码可读性 | 差 | 好 |

#### 词缀类型选择器更新

```typescript
<select value={affix.calculationType || 'additive'}>
  <option value="additive">+ 加法</option>
  <option value="multiplicative">× 乘法</option>
  <option value="independent">[x] 独立</option>
</select>
```

---

### 首页导航重新设计

#### 功能概述
全新的暗黑4风格首页导航，左侧可收起菜单栏，右侧直接显示功能界面。

#### 设计特点

**1. 左侧菜单栏**
- 可收起/展开，收起后只显示图标
- 包含所有功能模块导航
- 底部显示我的方案区域
- 暗黑4主题配色（深黑 + 金色）

**2. 右侧内容区**
- 顶部状态栏（模块标题、游戏版本、实时时间）
- 直接通过iframe加载对应功能
- 欢迎页面提供快捷入口卡片

**3. 菜单结构**

| 菜单 | 图标 | 路径 |
|------|------|------|
| 首页 | 🏠 | - |
| 伤害计算器 v3.0 | 📐 | dist/calculator/ |
| 伤害计算器 v2.0 | 🧮 | dist/simulator/index.html |
| 装备模拟器 | 🛡️ | dist/equipment/ |
| 技能模拟器 | ⚡ | dist/skills/index.html |
| 巅峰盘模拟器 | ⭐ | dist/paragon/index.html |
| 数据库浏览 | 📊 | dist/database/index.html |
| 数据维护 | ⚙️ | dist/database/index.html?mode=maintenance |

**4. 暗黑风格设计**
- 主背景：`#0a0a0f`（深黑色）
- 主题色：`#c9a962`（暗黑4经典金色）
- 强调色：`#8b4513`（棕色）
- 文字色：`#d4c4a8`（米白色）
- 标题字体：Cinzel（哥特风格）

---

### 数据维护升级为一级菜单

#### 修改内容
- 将数据库模块拆分为两个独立菜单：
  - **数据库浏览**：只读模式，浏览游戏数据
  - **数据维护**：编辑模式，管理和维护数据
- 通过URL参数 `?mode=maintenance` 区分模式
- 数据库模块支持从URL参数读取初始模式

---

### 图标路径修复

#### 问题描述
装备图标路径错误，导致404错误：
- 错误：`/database/images/icons/ring06.png`
- 正确：`/equipment/images/icons/ring06.png`

#### 修复内容

| 文件 | 修改内容 |
|------|---------|
| `EquipmentTooltip.tsx` | 添加路径判断逻辑 |
| `EquipmentSlots.tsx` | 添加路径判断逻辑 |

#### 判断逻辑

```typescript
// 暗金装备图标使用数据库路径
// 槽位图标使用原始相对路径
src={item.icon.startsWith('./images/items/') ? getDatabaseImageUrl(item.icon) : item.icon}
```

---

### Favicon修复

#### 修改内容
- 移除 `/vite.svg` 引用（不存在）
- 添加内嵌SVG favicon（数据URI方式）
- 避免引用外部文件导致404错误

---

## v1.8.0 (2026-06-16)

### 词缀符号显示修复

#### 问题描述
词缀 `×26% 暴击伤害增倍` 在装备槽卡片中错误显示为 `+26% 暴击伤害增倍`。

#### 根本原因
1. `handleConfirm` 函数中词缀的 `type` 字段被硬编码为 `'additive'`
2. `handleSelectUnique` 函数未从词缀数据库查找 `calculationType`
3. `EquipmentTooltip.tsx` 使用 `position` 字段判断符号，而非 `calculationType`

#### 修复内容

| 环节 | 修复内容 | 文件 |
|-----|---------|------|
| 词缀类型定义 | 添加 `calculationType` 字段到 `Affix` 接口 | `types/equipment.ts` |
| 词缀选择弹窗 | 根据 `calculationType` 显示符号 | `EquipmentSelectorNew.tsx` |
| 确认添加词缀 | 传递 `calculationType` 到词缀数据 | `EquipmentSelectorNew.tsx` |
| 确认装备 | 正确设置 `type` 和 `calculationType` | `EquipmentSelectorNew.tsx` |
| 选择暗金装备 | 从词缀数据库查找 `calculationType` | `EquipmentSelectorNew.tsx` |
| 装备槽显示 | 使用 `calculationType` 判断符号 | `EquipmentTooltip.tsx` |

#### 数据流向

```
词缀JSON (calculationType: "multiplicative")
    ↓
词缀选择弹窗 (显示 ×50% 暴击伤害增倍)
    ↓
确认添加词缀 (传递 calculationType)
    ↓
词缀列表 (显示 ×26% 暴击伤害增倍)
    ↓
确认装备 (保存 calculationType)
    ↓
装备槽卡片 (显示 ×26% 暴击伤害增倍) ✅
```

#### 调试功能
- 添加调试日志到 `handleConfirm` 函数，便于追踪词缀数据传递
- 创建 `DEBUG_GUIDE.md` 调试文档，记录问题排查方法

---

## v1.7.0 (2026-06-15)

### 方案管理系统

#### 功能概述
完整的方案（Build）管理系统，支持方案的创建、保存、加载、重命名、删除、导入导出和永久存储，便于玩家保存和分享装备配置。

#### 核心功能

**1. 方案数据结构**

```typescript
interface Build {
  id: string                    // 方案唯一标识
  name: string                  // 方案名称
  characterClass: Character['class']  // 职业类型
  equipment: Record<EquipmentSlot, EquipmentItem | null>  // 装备配置
  createdAt: number             // 创建时间戳
}
```

**2. 方案操作**

| 功能 | 方法 | 说明 | 自动加载 |
|-----|------|------|---------|
| **新建方案** | `createEmptyBuild()` | 创建空白方案并自动加载 | ✅ |
| **复制方案** | `duplicateBuild(buildId)` | 复制当前方案创建变体 | ✅ |
| **加载方案** | `loadBuild(buildId)` | 加载指定方案 | ✅ |
| **重命名方案** | `updateBuildName(buildId, name)` | 修改方案名称 | ❌ |
| **删除方案** | `deleteBuild(buildId)` | 删除指定方案 | ❌ |
| **导出方案** | `exportBuildAsFile(buildId)` | 导出为JSON文件 | ❌ |
| **导入方案** | `importBuildFromFile(file)` | 从JSON文件导入 | ✅ |

**3. 永久存储**

使用 Zustand 的 `persist` 中间件实现浏览器本地持久化：

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

**持久化内容：**
- 职业信息
- 当前装备配置
- 装备配置（词缀等）
- 所有方案列表
- 当前选中方案ID

**4. 导入导出功能**

**导出格式：**
```json
{
  "version": "1.0",
  "name": "我的野蛮人方案",
  "characterClass": "barbarian",
  "equipment": {
    "helmet": { ... },
    "chest": { ... },
    "gloves": { ... },
    "pants": { ... },
    "boots": { ... },
    "weapon1": { ... },
    "weapon2": { ... },
    "weapon3": { ... },
    "weapon4": { ... },
    "shield": { ... },
    "amulet": { ... },
    "ring1": { ... },
    "ring2": { ... }
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
- 显示导入成功/失败状态提示

**5. 自动同步机制**

装备变更时自动同步更新当前方案数据：

```typescript
equipItem: (slot, item) => {
  set(state => {
    const newEquipment = { ...state.equipment, [slot]: item }
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

**6. UI组件**

**BuildManager 组件：**
- 方案列表展示（带选中状态高亮）
- 方案操作菜单（加载、重命名、复制方案、导出、删除）
- 两个主要按钮：
  - 新建方案（蓝色）
  - 导入方案（绿色）

**导入模态框：**
- 文件上传区域（支持点击选择和拖放）
- 状态提示（成功/失败/无效文件）
- 自动关闭机制

**7. 使用场景**

```
玩家场景：
1. 创建了"野蛮人输出方案"
2. 复制了"野蛮人坦克方案"  
3. 创建了"巫师方案"

用户可以通过"加载"功能在不同方案间切换：
- 点击"野蛮人输出方案" → 加载 → 查看输出配置
- 点击"野蛮人坦克方案" → 加载 → 查看坦克配置
- 点击"巫师方案" → 加载 → 查看巫师配置

复制方案场景：
1. 用户有一个"野蛮人输出方案"
2. 想创建变体"野蛮人坦克方案"
3. 点击"复制方案" → 生成"野蛮人输出方案(副本)"
4. 自动加载副本，开始调整装备为坦克配置
5. 重命名为"野蛮人坦克方案"
6. 现在有2个独立方案，互不影响

分享场景：
玩家A                              玩家B
    ↓                                  ↓
配置装备                             接收文件
    ↓                                  ↓
导出方案 → 下载 .json 文件 → 分享 → 导入方案 → 获取配置
    ↓                                  ↓
分享配置文件                         加载配置
```

#### 修复项

- ✅ 修复导出方案时装备不显示的问题（使用最新equipment状态）
- ✅ 修复导入方案后装备不显示的问题（自动加载装备配置）
- ✅ 修复新建方案后配置装备未保存的问题（装备变更自动同步方案）

#### 优化项

- ✅ 方案名称自动生成（方案1、方案2...）
- ✅ 导入后自动加载装备配置和职业
- ✅ 导出当前方案时使用最新装备状态
- ✅ 所有操作自动保存到localStorage
- ✅ 刷新页面后数据完整保留

## v1.6.0 (2026-06-15)

### 属性面板词缀悬停计算过程

#### 功能概述
属性面板支持鼠标悬停显示详细的数值计算过程，让玩家清楚了解每个属性的数值来源。

#### 实现细节

**1. 类型定义扩展** (`types/equipment.ts`)

```typescript
// 属性来源明细
export interface AttributeSource {
  name: string        // 来源名称（装备名）
  value: number       // 贡献值
  type: 'base' | 'affix' | 'power' // 来源类型
}

// 属性明细记录
export interface AttributeDetail {
  baseValue: number           // 基础值
  totalValue: number          // 总值
  sources: AttributeSource[]  // 来源列表
}

// EquipmentStats 新增字段
multiplicativeGroups: {      // B类乘区分组信息
  name: string
  totalValue: number
  sources: string[]
}[]
independentDetails: {        // 独立乘区详细信息
  name: string
  value: number
  source: string
  multiplier: number
}[]
details: {
  // ... 各属性的 AttributeDetail
  independentMultiplier?: AttributeDetail
}
```

**2. 伤害乘区分类规则**

| 乘区类型 | 判断条件 | 计算方式 | 示例 |
|---------|---------|---------|------|
| **A类加成** | 伤害类词缀（排除攻击速度、暴击几率、抗性类） | 加法累加 | +50%火焰伤害 |
| **B类乘区** | x前缀或multiplicative类型 | 同名词缀相加后再相乘 | ×1.10 ×1.15 → ×1.265 |
| **独立乘区** | 后缀[x]类型 | 各自独立相乘 | ×1.05[x] ×1.08[x] |

**3. 伤害类关键词** (`store/equipmentStore.ts`)

```typescript
const damageKeywords = ['伤害', '技能', '易伤', '流血', '燃烧', '冰冻', '中毒', '暗影', '火焰', '冰霜', '闪电', '神圣', '物理']

const excludeKeywords = ['攻击速度', '暴击几率', '抗性', '抗']
```

**4. UI组件更新** (`components/StatsPanel.tsx`)

- 鼠标悬停事件：`onMouseEnter` / `onMouseLeave`
- 悬浮提示组件：`AttributeTooltip`
- 提示框显示位置：属性项上方，居中对齐
- 提示框样式：暗黑风格，金色标题，绿色数值高亮

**5. 伤害加成计算说明**

在伤害加成面板标题旁添加问号图标：
- 圆形灰色背景，尺寸 16×16px
- 悬停时背景变深
- 点击显示计算说明弹窗

```typescript
// 伤害加成说明弹窗内容
| 区域 | 展示格式 | 说明 |
|-----|---------|------|
| A类加成 | +{数值}% | 伤害类词缀加法累加 |
| B类乘区 | ×{数值} | x前缀词缀合并相乘 |
| 独立乘区 | ×{数值} | 后缀[x]词缀各自独立相乘 |
```

#### 支持悬停的属性

| 区域 | 属性 | 说明 |
|-----|------|------|
| 主要属性 | 力量、敏捷、智力 | 支持百分比加成 |
| 战斗属性 | 攻击速度、暴击几率、暴击伤害、易伤伤害、武器伤害 | - |
| 防御属性 | 护甲、抗性、生命值 | - |
| 伤害加成 | A类加成、B类乘区、独立乘区 | - |
| 其他属性 | 所有未分类属性 | - |

#### 悬停提示展示格式

```
┌──────────────────────────────┐
│       计算过程               │  ← 金色标题
├──────────────────────────────┤
│ 职业基础           400      │  ← 灰色（基础值）
│ 头盔（+50力量）    +50      │  ← 绿色（词缀加成）
│ 护符（+30力量）    +30      │
│ ──────────────────────────  │
│ 总计               480      │  ← 白色加粗
└──────────────────────────────┘
```

#### B类乘区计算示例

```
火焰伤害 +50%（武器）
冰霜伤害 +30%（手套）
──────
总计: ×1.80
```

#### 独立乘区计算示例

```
暴击伤害 +25%（戒指） ×1.25
易伤伤害 +20%（武器） ×1.20
──────
总计: ×1.50
```

### 优化项

- ✅ 简化伤害加成展示，去除详细的B类计算过程展开
- ✅ 独立乘区与B类乘区采用一致的简洁展示方式
- ✅ 问号图标使用柔和的圆圈样式，不抢夺注意力

## v1.5.0 (2026-06-15)

### 符文系统完善

- ✅ 符文数据从数据库 runes.json 动态加载，移除模拟数据
- ✅ 符文显示中文名称，英文名作为辅助显示
- ✅ 符文按分类显示不同颜色：
  - 祈告符文 (Invocation)：紫色 (purple-400)
  - 仪祭符文 (Supplication)：金色 (yellow-500)
- ✅ 符文选择弹窗显示图标、中文名、英文名、分类标签
- ✅ 装备卡片正确显示符文图标和分类颜色
- ✅ 图标加载失败时显示彩色方块替代

### 词缀多选功能

- ✅ 词缀选择弹窗支持多选（复选框形式）
- ✅ 底部"确认添加"按钮，批量添加选中的词缀
- ✅ 超出8条限制时自动截断
- ✅ 已添加的词缀显示灰色（不可重复添加）
- ✅ 待添加的词缀显示"待添加"标签

### 装备卡片位置优化

- ✅ 修复武器槽位卡片显示位置问题（weapon3显示在左边）
- ✅ 统一槽位配置：`leftSlots = ['helmet', 'chest', 'gloves', 'pants', 'boots', 'weapon1', 'weapon3']`
- ✅ 武器槽位卡片从下往上展开，防止被屏幕底部遮盖
- ✅ 非武器槽位保持居中显示
- ✅ 左侧槽位卡片显示在右边，右侧槽位卡片显示在左边
- ✅ 添加屏幕边界检测，确保卡片不会超出可视区域

### 其他优化

- ✅ 装备选择器默认稀有度改为**传奇**
- ✅ 符文选择弹窗宽度从 max-w-md 扩大到 max-w-2xl

## v1.4.0 (2026-06-15)

### 装备选择器重构

- ✅ 移除核心装备和品质设置字段，简化配置流程
- ✅ 扩大选择器界面宽度（主选择器 max-w-2xl，子弹窗 max-w-4xl）
- ✅ 移除标题栏图标，避免显示不全问题

### 词缀系统升级

- ✅ 词缀支持修改数值、单位（%/点）、符号类型（+/x前缀/后缀[x]）和名称
- ✅ 使用自定义词缀替代原有的嬗变和回风词缀功能
- ✅ 自定义词缀紫色边框显示，最多添加2条
- ✅ 所有词缀卡片内直接编辑

### 暗金装备增强

- ✅ 暗金装备从数据库选择，自动带出默认词缀和数值
- ✅ 暗金模式下也支持选择威能
- ✅ 修复暗金装备默认图标显示问题（路径处理和错误回退）
- ✅ 支持修改暗金装备的词缀值

### 威能筛选修复

- ✅ 修复威能筛选标签功能，正确匹配数据中的 powerType 字段
- ✅ 标签显示中文：防御、攻击、机动、资源（对应 defense/offense/utility/resource）

### 宝石和符文系统

- ✅ 新增"插槽"区域，支持添加宝石和符文
- ✅ 宝石数据从数据库 gems.json 动态加载
- ✅ 宝石效果根据装备类型动态显示：
  - 武器插槽（weapon1/2/3/4）→ 显示 weaponEffect
  - 防具插槽（helmet/chest/gloves/pants/boots/shield）→ 显示 armorEffect
  - 首饰插槽（amulet/ring/ring1/ring2）→ 显示 jewelryEffect
- ✅ 宝石选择弹窗显示当前装备类型和对应的效果标签
- ✅ 每种宝石/符文最多选择2个
- ✅ 宝石和符文独立选择，系统不再强制互斥（用户自行控制）
- ✅ 符文使用模拟数据：Cem、Lith、Yul、Thul、Ort、Amn、Sol

### 装备Tooltip增强

- ✅ 装备Tooltip中显示已镶嵌的宝石和符文
- ✅ 宝石效果根据当前装备插槽类型动态显示对应数值
- ✅ 使用组件的slot prop正确判断装备类型

## v1.3.0 (2026-06-11)

### 数据库系统

- ✅ 新增数据库类型定义 (`types/database.ts`)
  - EquipmentItem：装备数据模型（支持传奇特效、暗金特效、武器类型）
  - Skill：技能数据模型（支持技能类型、伤害类型、技能树路径）
  - ParagonNode/ParagonBoard：巅峰节点数据模型
  - Build：Build方案数据模型（包含装备、技能、巅峰配置）
  - D2CoreBuild：暗黑核导入格式定义

- ✅ 新增数据库存储层 (`store/databaseStore.ts`)
  - 使用 Zustand + persist 中间件实现本地持久化
  - 装备CRUD操作、按槽位/稀有度筛选、搜索
  - 技能按职业/类型筛选
  - Build方案管理（创建、更新、删除）
  - 内置完整Mock数据

### 数据导入导出

- ✅ 新增暗黑核数据导入器 (`utils/d2coreImporter.ts`)
  - 支持URL导入和JSON字符串导入
  - 自动转换暗黑核数据格式
  - 数据格式验证功能

- ✅ 新增JSON数据导出器 (`utils/dataExporter.ts`)
  - 支持导出Build、装备、技能、巅峰节点
  - 支持下载为JSON文件
  - 支持转换为暗黑核格式导出

### 文档更新

- ✅ 更新API文档，添加数据库操作和导入导出接口
- ✅ 更新README，添加数据库系统和数据导入导出功能说明
- ✅ 更新CHANGELOG记录所有新增功能

## v1.2.0 (2026-06-11)

### 布局调整

- ✅ 整体容器尺寸调整为 850px × 820px
- ✅ 左侧装备栏宽度：68px
- ✅ 右侧装备栏宽度：68px
- ✅ 属性面板独立区域宽度：180px

### 装备槽位优化

- ✅ 槽位尺寸从 56×72 调整为 55×85（长方形）
- ✅ 槽位图标尺寸调整为 38×38
- ✅ 槽位标签字体从 8px 调整为 9px
- ✅ 所有装备部位图标统一调整为 38×38 像素
- ✅ 新增装备部位图标：武器3（锤）、武器4（弓）、护符、戒指

### 职业选择优化

- ✅ 职业选中时边框金色高亮显示
- ✅ 悬停职业显示金色边框和文字
- ✅ 选中时添加发光阴影效果

### 职业背景和角色图片

- ✅ 职业背景改为引用外部图片文件
- ✅ 职业角色图片支持外部PNG文件
- ✅ 定义了职业图片路径映射表
- ✅ 添加图片加载失败时的fallback处理

### 属性面板重新设计

- ✅ 新增独立属性面板组件 StatsPanel.tsx
- ✅ 右侧面板显示完整属性信息
- ✅ 主要属性使用卡片式布局，带图标
- ✅ 战斗属性列表显示（攻击速度、暴击几率、暴击伤害、易伤伤害）
- ✅ 防御属性列表显示（护甲、抗性、生命值）
- ✅ 新增伤害加成区域（A类加成、B类乘区）
- ✅ 装备统计显示进度条和传奇特效计数
- ✅ 数值使用彩色显示区分不同属性类型

### 属性系统扩展

- ✅ EquipmentStats 类型新增字段：
  - resistance（抗性）
  - health（生命值）
  - equippedCount（装备数量）
  - legendaryEffects（传奇特效数量）
- ✅ calculateStats 函数计算逻辑更新

### UI样式增强

- ✅ 属性面板暗黑风格设计
- ✅ 分区标题带金色渐变分隔线
- ✅ 属性卡片悬停效果
- ✅ 装备进度条渐变效果
- ✅ 传奇特效星星发光效果

## v1.1.0 (2026-06-11)

### 新增功能

- ✅ 新增灵巫(spiritborn)职业支持
- ✅ 扩展装备槽位至12个（新增weapon3, weapon4）
- ✅ 职业选择器移至顶部导航栏
- ✅ 属性栏集成到角色展示面板（力量、敏捷、智力、APS）
- ✅ 装备槽位使用内联SVG图标
- ✅ 悬停显示装备名称功能
- ✅ 优化布局：角色居中、装备槽位分布两侧、底部快捷栏

### UI优化

- ✅ 职业选择器金色高亮选中效果
- ✅ 灵巫职业青绿色渐变背景
- ✅ 装备槽位稀有度发光效果增强
- ✅ 整体布局调整为游戏内风格

### 修复

- ✅ 修复Tailwind CSS类名错误（bg-white/03 → bg-white/5）
- ✅ 修复CSS渐变方向错误

## v1.0.0 (2024-06-11)

### 新增功能

- ✅ 10个装备槽位支持
- ✅ 5种稀有度系统（普通、魔法、稀有、传奇、暗金）
- ✅ 全职业支持（6职业）
- ✅ 职业专属背景和剪影
- ✅ 装备选择弹窗
- ✅ 装备搜索功能
- ✅ 属性汇总面板
- ✅ 暗黑风格UI设计
- ✅ 圣骑士专属背景图片支持

### 修复

- ✅ 修复装备槽位点击区域问题
- ✅ 修复稀有度颜色显示问题
