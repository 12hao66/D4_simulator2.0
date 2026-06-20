# 数据库管理模块 更新日志

## v1.4.0 (2026-06-19)

### 数据读取优化

- ✅ **移除 localStorage 读取逻辑**：词缀/暗金/威能/护身符/技能/宝石/符文 查询现在直接从 JSON 文件读取
  - `AffixManager.tsx`：移除从 `d4-affix-manager-data` 读取旧数据的 useEffect
  - `UniqueEquipmentManager.tsx`：移除从 localStorage 读取旧数据的逻辑
  - `LegendaryPowerManager.tsx`：移除从 localStorage 读取旧数据的逻辑
  - `AmuletManager.tsx`：移除从 localStorage 读取旧数据的逻辑
  - `SkillManager.tsx`：移除从 localStorage 读取旧数据的逻辑
  - `GemManager.tsx`：移除从 localStorage 读取旧数据的逻辑
  - `RuneManager.tsx`：移除从 localStorage 读取旧数据的逻辑

### 数据更新流程

- ✅ **简化数据更新流程**：修改 `dist/database/data/*.json` 后刷新页面即可生效
- ✅ **无需清除浏览器缓存**：http-server 已使用 `-c-1` 参数禁用缓存

### 文档更新

- ✅ 更新 `DESIGN.md` 数据管理章节，反映最新的存储架构
- ✅ 更新 `BUILD_GUIDE.md`，新增数据文件说明章节

## v1.3.0 (2026-06-19)

### 代码清理

- ✅ **移除废弃的 Mock 数据**：删除以下无用文件
  - `src/data/mockData.ts`
  - `src/data/uniqueEquipmentData.ts`
  - `src/data/legendaryPowersData.ts`
- ✅ **移除 App.tsx 中的 loadMockData 调用**：避免 mock 数据覆盖真实 JSON 数据
- ✅ **移除 databaseStore.ts 中的 loadMockData 函数**：消除数据覆盖隐患

### Bug 修复

- ✅ **修复词缀/威能数据不一致问题**：
  - 原因：loadMockData() 会覆盖从 JSON 加载的真实数据
  - 表现：通过导航页访问数据库显示 10 条词缀，直接访问显示 316 条
  - 解决：移除 loadMockData 调用，所有数据统一从 JSON 加载

## v1.2.0 (2026-06-18)

### 架构优化

- ✅ **数据存储架构重构**：分离系统数据和用户数据
  - 系统数据（词缀、宝石、暗金装备等）不再持久化到 localStorage
  - 用户自定义数据通过 customDataStore 单独持久化
  - 每次刷新页面自动从 JSON 文件加载最新系统数据

### 数据存储策略

| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| 系统数据（词缀、宝石、暗金装备等） | **内存** | 每次刷新从 JSON 加载，永远是最新的 |
| 用户自定义数据 | **localStorage** | 通过 customDataStore 持久化 |

### HTTP 缓存机制

- ✅ **新增 HTTP 缓存机制说明**：解决本地开发时数据不更新的问题
- ✅ **启动命令更新**：使用 `npx http-server -p 8080 -s -c-1` 禁用缓存
- ✅ **GitHub Pages 说明**：部署后自动处理缓存，无需额外操作

### 技术改进

- ✅ **移除 persist 中间件的过度使用**：使用 `partialize: () => ({})` 不持久化任何系统数据
- ✅ **简化版本控制**：无需维护版本号，系统数据更新后用户刷新即可获取最新
- ✅ **提升用户体验**：用户无需手动清除浏览器缓存即可获取最新数据

### Bug修复

- ✅ CSV导入编码问题：支持 UTF-8 和 GBK 两种编码格式
- ✅ CSV导入单位解析：修复空单位被错误解析为 % 的问题
- ✅ 移除未使用的函数，避免 TypeScript 编译警告

### 文件变更

- ✅ 修改 `src/store/databaseStore.ts`：使用 `partialize: () => ({})`
- ✅ 新增 `src/store/customDataStore.ts`：专门处理用户自定义数据的持久化
- ✅ 修改 `src/components/AffixManager.tsx`：改进 CSV 导入逻辑

## v1.1.0 (2026-06-17)

### 新增功能

- ✅ 词缀职业筛选功能：支持按职业过滤词缀
- ✅ 词缀图标字段支持：新增 `icon` 字段用于装备时显示
- ✅ 词缀分类重命名：将 `rarity` 字段改名为"词缀分类"

### 数据模型更新

- ✅ 词缀模型扩展：添加 `applicableClasses` 字段（适用职业列表）
- ✅ 词缀模型扩展：添加 `icon` 字段（图标路径）
- ✅ 修正 `subcategory` 字段定义：仅回火词缀使用，包含"武器/攻击/防御/机动/资源/通用"6个值

### Bug修复

- ✅ 词缀单位下拉框"无"选项无法选中问题
- ✅ 将单位选项"无"改为"点"，空字符串表示点单位

### 职业配置

- ✅ 更新术士（spiritborn）武器槽位为 `['weapon1', 'weapon2']`
- ✅ 新增灵巫（warlock）职业配置：`{ weaponSlots: ['weapon1'], hasShield: false }`
- ✅ 更新 CharacterClass 类型：添加 wizard、ranger、warlock

## v1.0.0 (2026-06-11)

### 新增功能

- ✅ 数据库管理模块初始化
- ✅ 支持8种数据类型管理：
  - 暗金装备 (UniqueEquipment)
  - 威能 (LegendaryPower)
  - 词缀 (Affix)
  - 技能 (Skill)
  - 护身符 (Amulet)
  - 制作材料 (CraftingMaterial)
  - 符文 (Rune)
  - 宝石 (Gem)

### 核心功能

- ✅ 数据分类导航（侧边栏）
- ✅ 数据表格展示
- ✅ 搜索功能（按名称、描述）
- ✅ 数据详情查看
- ✅ CRUD操作（增删改查）
- ✅ 统计面板（实时数据计数）
- ✅ Mock数据自动加载

### 状态管理

- ✅ 使用 Zustand + persist 中间件
- ✅ localStorage 本地持久化
- ✅ 完整的CRUD方法实现

### UI设计

- ✅ 暗黑风格主题设计
- ✅ 响应式布局（侧边栏 + 主内容 + 统计面板）
- ✅ 稀有度颜色区分
- ✅ 悬停高亮、点击选中效果
- ✅ 平滑过渡动画

### 技术实现

- ✅ React 18 + TypeScript
- ✅ Vite 5 构建工具
- ✅ Tailwind CSS 3 样式框架
- ✅ Zustand 4 状态管理

### 文档

- ✅ README.md - 模块说明文档
- ✅ API.md - 接口文档
- ✅ CHANGELOG.md - 更新日志

### Mock数据

- ✅ 3件暗金装备示例数据
- ✅ 5个威能示例数据
- ✅ 10个词缀示例数据
- ✅ 5个技能示例数据
- ✅ 2个护身符示例数据
- ✅ 5种制作材料示例数据
- ✅ 3个符文示例数据
- ✅ 6种宝石示例数据

### 首页集成

- ✅ 添加数据库管理入口卡片
- ✅ 更新首页导航链接