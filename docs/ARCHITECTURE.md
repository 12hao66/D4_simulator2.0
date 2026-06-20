# 🏗️ 暗黑4模拟器 - 架构设计文档

## 📋 文档目录分工说明

### 项目级文档（`docs/`）
| 文档 | 定位 | 内容说明 |
|------|------|----------|
| `ARCHITECTURE.md` | 架构设计 | 整体架构、模块划分、数据流 |
| `TECH_STACK.md` | 技术栈 | 前端技术、兼容性、依赖 |
| `CONTRIBUTING.md` | 贡献指南 | 开发规范、PR流程 |
| `CODE_STYLE.md` | 代码规范 | 命名、格式、最佳实践 |
| `ROADMAP.md` | 路线图 | 功能规划、里程碑 |
| `SECURITY.md` | 安全说明 | 安全实践、风险提示 |

### 模块级文档（`modules/{module}/docs/`）
| 文档 | 定位 | 内容说明 |
|------|------|----------|
| `README.md` | 模块介绍 | 功能特性、快速开始 |
| `API.md` | 接口文档 | 函数签名、参数返回值 |
| `CHANGELOG.md` | 更新日志 | 版本历史、变更记录 |
| `USAGE.md` | 使用指南 | 用户操作说明 |

---

## 🏗️ 整体架构

### 设计原则
1. **模块化**：每个模块完全独立，可单独运行和部署
2. **共享资源**：公共样式、脚本、数据集中管理
3. **文档化**：每个模块自带 `docs/` 目录
4. **渐进式升级**：保留旧版模拟器，新版使用 React + TypeScript

### 架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                     暗黑4模拟器 (D4 Simulator)                    │
├─────────────────────────────────────────────────────────────────┤
│  index.html                  首页导航入口                        │
├─────────────────────────────────────────────────────────────────┤
│                        shared/  (共享资源)                       │
│  ├── css/        │  ├── js/         │  └── data/               │
│  │ reset.css     │  │ utils.js      │      └── equipment.js    │
│  │ variables.css │  │ storage.js    │                          │
│  └── utilities.css│                │                          │
├─────────────────────────────────────────────────────────────────┤
│                       modules/  (功能模块)                        │
│  ├── calculator/     │  ├── equipment/     │  ├── skills/      │
│  │   docs/           │  │   docs/           │  │   docs/        │
│  │   src/            │  │   src/            │  │   src/         │
│  │   ├─ components/  │  │   ├─ components/  │  │   ├─ components│
│  │   ├─ store/       │  │   ├─ store/       │  │   ├─ store/    │
│  │   └─ App.tsx      │  │   └─ App.tsx      │  │   └─ App.tsx   │
│  │   index.html      │  │   index.html      │  │   index.html   │
│  │   package.json    │  │   package.json    │  │   package.json │
│  │   vite.config.ts  │  │   vite.config.ts  │  │   vite.config.ts│
│  ├── simulator/      │  └── paragon/       │                  │
│  │   docs/           │      docs/           │                  │
│  │   css/            │      src/            │                  │
│  │   js/             │      package.json    │                  │
│  │   images/         │      vite.config.ts  │                  │
│  │   index.html      │      index.html      │                  │
├─────────────────────────────────────────────────────────────────┤
│  images/  (公共图片)   │  miniprogram/  (微信小程序)              │
│  └── paladin-bg.jpg   │  ├── pages/          │                  │
│                       │  ├── app.js          │                  │
│                       │  ├── app.json        │                  │
│                       │  └── app.wxss        │                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 模块职责划分

| 模块 | 职责 | 技术栈 | 说明 |
|------|------|--------|------|
| `shared/` | 共享资源 | 原生CSS/JS | 所有模块共用的样式、脚本、数据 |
| `modules/calculator/` | 伤害计算器3.0 | React + TS + Vite + Zustand | 新版精确伤害计算 |
| `modules/simulator/` | 伤害计算器2.0 | 原生HTML/CSS/JS | 经典版本（保留不动） |
| `modules/equipment/` | 装备模拟器 | React + TS + Vite + Zustand | 装备搭配模拟 |
| `modules/skills/` | 技能模拟器 | React + TS + Vite + Zustand | 技能树展示 |
| `modules/paragon/` | 巅峰盘模拟器 | React + TS + Vite + Zustand | 巅峰节点规划 |

---

## 🔄 数据流说明

### 页面跳转流程
```
首页 (index.html)
    ↓
选择模块 → 对应模块首页 (modules/{module}/index.html)
    ↓
模块内交互 → Zustand State (React模块) / 原生对象 (旧版)
    ↓
数据持久化 → LocalStorage
```

### 存储结构
```javascript
{
  "d4_simulator_schemes": [],      // 方案列表
  "d4_simulator_config": {},       // 配置
  "d4_simulator_currentScheme": "", // 当前方案ID
  "d4_simulator_snapshots": {}     // 快照数据
}
```

---

## 🎯 核心设计决策

### 1. 模块化架构
- 每个模块独立运行，无相互依赖
- 模块可单独打包、部署、迁移
- 通过首页统一导航

### 2. 双层资源管理
- **公共资源**：`images/`、`shared/` 存放全局共享文件
- **模块专属**：`modules/{module}/images/` 存放模块私有资源
- 确保模块独立性的同时避免资源重复

### 3. 技术栈选择
- **旧版保留**：`modules/simulator/` 使用原生JS，保持稳定
- **新版重构**：其他模块使用 React + TypeScript + Vite
- **状态管理**：使用 Zustand 进行集中状态管理
- **样式**：使用 Tailwind CSS 快速构建UI

### 4. 数据持久化
- 使用 LocalStorage 实现本地数据持久化
- 支持方案保存、快照、配置存储
- 无需后端服务，纯前端运行

### 5. 暗黑风格UI
- 深色主题配色
- 金属质感边框
- 稀有度颜色标识
- 悬停发光效果

---

## 📁 文件命名规范

### 目录命名
- 全小写，使用连字符 `-` 分隔
- 例：`modules/calculator/`, `shared/css/`

### 文件命名
- 全小写，使用连字符 `-` 分隔
- React组件使用 PascalCase
- 例：`calculator.css`, `EquipmentSlot.tsx`

### 资源文件命名
- 全小写，使用连字符 `-` 分隔
- 例：`slot-helm.svg`, `paladin-bg.jpg`

---

## 🔗 模块间通信

### 首页导航
```javascript
function navigateTo(module) {
  const paths = {
    calculator: 'modules/calculator/index.html',
    simulator: 'modules/simulator/index.html',
    equipment: 'modules/equipment/index.html',
    skills: 'modules/skills/index.html',
    paragon: 'modules/paragon/index.html'
  };
  window.location.href = paths[module];
}
```

### 返回首页
```javascript
function goHome() {
  window.location.href = '../../index.html';
}
```

---

## 📱 微信小程序

微信小程序代码位于 `miniprogram/` 目录，独立于Web版本：

```
miniprogram/
├── pages/           # 页面目录
│   └── index/       # 首页
├── app.js           # 小程序入口
├── app.json         # 全局配置
├── app.wxss         # 全局样式
└── sitemap.json     # 站点地图
```

小程序版本可以通过微信开发者工具打开和调试。
