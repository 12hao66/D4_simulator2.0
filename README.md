# ⚔️ 暗黑4模拟器 (D4 Simulator)

> Diablo IV Simulator - S13 憎恨之躯 3.0

一个基于 Web 的暗黑破坏神4多功能模拟器，支持伤害计算、装备模拟、技能模拟、巅峰盘规划等功能。

---

## 🎮 功能特性

### 核心模块

| 模块 | 描述 | 状态 |
|------|------|------|
| **伤害计算器 3.0** | 精确伤害计算，支持多乘区、暴击、易伤、压制 | ✅ 完成 |
| **伤害计算器 2.0** | 经典版本伤害计算器 | ✅ 完成 |
| **装备模拟器** | 装备搭配模拟，查看词缀效果 | ✅ 完成 |
| **技能模拟器** | 技能选择与组合，预览技能倍率 | ✅ 完成 |
| **巅峰盘模拟器** | 巅峰节点规划，优化属性分配 | ✅ 完成 |
| **数据库管理** | 管理暗金装备、威能、词缀、技能等游戏数据 | ✅ 完成 |

### 高级功能
- **方案管理**：创建、复制、删除方案
- **快照系统**：自动保存数据
- **导入导出**：支持方案数据交换

---

## 📁 项目结构

```
D4_simulator/
├── index.html              # 首页导航入口
├── README.md               # 项目说明文档
├── build-all.bat           # 统一构建脚本（旧版，不推荐）
├── build-all.ps1           # 统一构建脚本（推荐）
├── dist/                   # 统一构建输出目录（运行时）
│   ├── index.html          # 导航页
│   ├── calculator/         # 伤害计算器 3.0
│   ├── simulator/          # 伤害计算器 2.0
│   ├── equipment/          # 装备模拟器
│   ├── skills/             # 技能模拟器
│   ├── paragon/            # 巅峰盘模拟器
│   └── database/           # 数据库管理
├── modules/                # 功能模块源文件
│   ├── calculator/         # 伤害计算器 3.0（React + TypeScript）
│   ├── simulator/          # 伤害计算器 2.0（静态HTML）
│   ├── equipment/          # 装备模拟器（React + TypeScript）
│   ├── skills/             # 技能模拟器（React + TypeScript）
│   ├── paragon/            # 巅峰盘模拟器（React + TypeScript）
│   └── database/           # 数据库管理（React + TypeScript）
├── docs/                   # 项目级文档
│   ├── ARCHITECTURE.md     # 架构设计文档
│   ├── TECH_STACK.md       # 技术栈说明
│   ├── ROADMAP.md          # 开发路线图
│   ├── CONTRIBUTING.md     # 贡献指南
│   ├── CODE_STYLE.md       # 代码风格规范
│   └── SECURITY.md         # 安全说明
└── CompetitorAnalysis/     # 竞品分析文档
```

---

## 🚀 快速开始

### 运行方式（推荐）

**使用 PowerShell 构建脚本（推荐）：**

```powershell
# 1. 进入项目目录
cd D:\ClaudeProject\D4_simulator2.0

# 2. 使用统一构建脚本（生成 dist 目录）
.\build-all.ps1

# 3. 切换到 dist 目录
cd dist

# 4. 启动静态服务器（端口8080）
npx http-server -p 8080 -s

# 5. 访问导航页
# http://localhost:8080
```

**使用旧版批处理脚本（不推荐）：**

```bash
# 1. 进入项目目录
cd D:\ClaudeProject\D4_simulator2.0

# 2. 使用旧版构建脚本（可能存在路径问题）
.\build-all.bat

# 3. 启动静态服务器
cd dist
npx http-server -p 8080
```

**各模块独立开发运行：**

```bash
# 伤害计算器 3.0
cd modules/calculator
npm run dev

# 装备模拟器
cd modules/equipment
npm run dev

# 技能模拟器
cd modules/skills
npm run dev

# 巅峰盘模拟器
cd modules/paragon
npm run dev

# 数据库管理
cd modules/database
npm run dev
```

### 目录结构说明

| 目录 | 说明 |
|------|------|
| `modules/` | 各模块源文件，包含开发版本 |
| `dist/` | 统一构建输出目录，包含生产版本 |
| `docs/` | 项目级文档 |

### 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 📖 使用说明

### 首页导航
访问首页后，可以看到六个模块的入口卡片：
- **伤害计算器 3.0**：新版精确伤害计算
- **伤害计算器 2.0**：经典版本伤害计算
- **装备模拟器**：装备搭配和词缀预览
- **技能模拟器**：技能选择与组合
- **巅峰盘模拟器**：巅峰节点规划
- **数据库管理**：管理游戏数据（暗金装备、威能、词缀、技能等）

### 模块访问路径（通过统一服务）
```
http://localhost:8080/calculator/      # 伤害计算器 3.0
http://localhost:8080/simulator/       # 伤害计算器 2.0
http://localhost:8080/equipment/       # 装备模拟器
http://localhost:8080/skills/          # 技能模拟器
http://localhost:8080/paragon/         # 巅峰盘模拟器
http://localhost:8080/database/        # 数据库管理
```

---

## 🏗️ 架构设计

### 设计原则
1. **模块化开发**：每个模块独立开发，便于维护和迭代
2. **统一构建部署**：通过 `build-all.ps1` 脚本统一构建到 `dist/` 目录（推荐）
3. **单一服务入口**：所有模块通过同一个静态服务器访问
4. **文档化**：每个模块自带 `docs/` 目录，包含模块说明、API文档、更新日志
5. **Vite配置规范**：所有 React 模块的 `vite.config.ts` 应使用 `base: ''`（相对路径）

### 模块职责
| 目录 | 职责 | 技术栈 |
|------|------|--------|
| `modules/calculator/` | 伤害计算器3.0 | React + TypeScript + Vite |
| `modules/simulator/` | 伤害计算器2.0 | 静态HTML/CSS/JS |
| `modules/equipment/` | 装备模拟器 | React + TypeScript + Vite |
| `modules/skills/` | 技能模拟器 | React + TypeScript + Vite |
| `modules/paragon/` | 巅峰盘模拟器 | React + TypeScript + Vite |
| `modules/database/` | 数据库管理 | React + TypeScript + Vite |

### 运行架构
```
┌─────────────────────────────────────────────────────────┐
│                    浏览器访问                            │
│                 http://localhost:8080                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   静态服务器 (dist/)                    │
├────────────┬────────────┬────────────┬─────────────────┤
│ calculator │ simulator  │ equipment  │ skills/paragon  │
│  (构建后)  │ (静态文件) │  (构建后)  │  (静态文件)     │
├────────────┴────────────┴────────────┴─────────────────┤
│                    数据库管理 (database/)               │
│                         (构建后)                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| **前端框架** | React 18 + TypeScript | 核心模块使用 |
| **构建工具** | Vite 5 | 快速构建和热更新 |
| **样式** | TailwindCSS 3 | CSS框架 |
| **状态管理** | Zustand | 轻量级状态管理 |
| **静态模块** | HTML/CSS/JavaScript | 无需框架的独立模块 |
| **存储** | LocalStorage | 本地数据持久化 |
| **图标** | SVG + Emoji | 暗黑风格图标 |

---

## 📝 更新日志

### v3.2.1 (2026-06-18)
- **重构构建系统**：新增 `build-all.ps1` PowerShell 脚本，替代旧版 `build-all.bat`
- **修复构建问题**：所有 React 模块（skills、paragon）现在正确执行 `npm run build` 后再复制到 `dist/`
- **修复路径问题**：修复 `paragon` 模块的 `vite.config.ts`，将 `base: '/dist/paragon/'` 改为 `base: ''`
- **修复导航路径问题**：根目录 `index.html` 文件使用了错误路径 `dist/calculator/`，已修正为相对路径 `calculator/`
- **更新端口配置**：默认启动端口改为 8080
- **更新项目文档**：添加完整的构建和运行说明，包含问题根源分析

**问题根源分析：**
- 根目录的 `index.html` 文件使用了 `dist/calculator/`、`dist/skills/` 等路径
- 构建脚本会将此文件复制到 `dist/` 目录下
- 导致导航链接指向 `dist/dist/calculator/`，产生404错误

**修复方案：**
1. 将 `index.html` 中所有路径从 `dist/xxx/` 改为 `xxx/`（相对路径）
2. 修改 `build-all.ps1` 启动提示命令，确保切换到 `dist` 目录启动服务
3. 更新 `README.md` 文档记录完整的构建和启动流程

**正确的构建和启动步骤：**
```powershell
cd D:\ClaudeProject\D4_simulator2.0
.\build-all.ps1
cd dist
npx http-server -p 8080 -s
```

### v3.2.0 (2026-06-16)
- 统一构建部署方案：通过 `build-all.bat` 脚本构建所有模块到 `dist/` 目录
- 单一服务入口：所有6个模块通过同一个静态服务器访问
- 修复数据库管理模块路径问题（修改 `vite.config.ts` 的 `base` 配置）
- 更新首页导航链接配置为相对路径
- 修复装备模拟器模块TypeScript构建错误（未使用变量）
- 更新项目文档，添加统一构建和运行说明

### v3.1.0 (2026-06-11)
- 新增数据库管理模块 (`modules/database/`)
- 支持8种数据类型管理：暗金装备、威能、词缀、技能、护身符、制作材料、符文、宝石
- 完整的CRUD操作支持
- 数据搜索和筛选功能
- 统计面板实时显示数据数量
- 暗黑风格UI设计

### v3.0.0 (2024-06-11)
- 重构为模块化架构
- 新增首页导航系统（支持伤害计算器2.0/3.0切换）
- 完善装备模拟器功能
- 优化暗黑风格UI
- 为各模块添加专属文档

### v2.0.0 (2024-03-15)
- 支持全7职业
- 更新S13伤害公式
- 添加独立乘区计算

### v1.0.0 (2024-01-01)
- 初始版本发布
- 基础伤害计算功能

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范
1. 每个模块独立开发，不依赖其他模块
2. 使用 `goHome()` 函数返回首页
3. 遵循暗黑风格的视觉设计
4. 代码注释使用中文
5. 每个模块需包含 `docs/` 目录

---

**暗黑4伤害模拟器 © 2024 | S13 憎恨之躯版本**