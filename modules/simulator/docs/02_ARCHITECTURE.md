# 架构设计文档

## 一、架构概述

本项目采用**模块化单体应用架构**，将功能拆分为独立的模块文件，通过全局对象 `window.D4Sim` 实现模块间通信。无需构建工具，直接通过浏览器加载即可运行。

## 二、模块职责说明

| 模块文件 | 职责描述 | 对外暴露 |
|----------|----------|----------|
| `constants.js` | 全局常量定义（存储键名、配置键、职业数据） | `D4Sim.Constants` |
| `utils.js` | 通用工具函数（DOM操作、数值处理、格式化） | `D4Sim.Utils`、全局快捷函数 |
| `config.js` | BD参考数据、默认配置、职业配置 | `D4Sim.Config` |
| `calculator.js` | 伤害计算核心引擎 | `D4Sim.Calculator` |
| `storage.js` | LocalStorage持久化、导入导出 | `D4Sim.Storage` |
| `ui.js` | UI渲染和交互管理 | `D4Sim.UIManager` |
| `main.js` | 应用入口、状态管理、事件绑定 | `window.app` |

## 三、模块依赖关系

```
main.js (入口)
    │
    ├── constants.js  ← 无依赖
    ├── utils.js      ← 依赖 constants.js
    ├── config.js     ← 依赖 constants.js, utils.js
    ├── calculator.js ← 依赖 constants.js, config.js
    ├── storage.js    ← 依赖 constants.js, utils.js
    └── ui.js         ← 依赖 constants.js, utils.js, config.js, calculator.js
```

## 四、数据流

```
用户输入 → UI层 → AppState → Calculator → 计算结果 → UI层 → 用户展示
              ↓                    ↓
           Storage              Storage
              ↓                    ↓
         LocalStorage          LocalStorage
```

### 数据流转步骤

1. **输入层**：用户在表单输入数据
2. **状态层**：`AppState` 收集并存储数据
3. **计算层**：`Calculator` 执行伤害计算
4. **渲染层**：`UIManager` 更新页面显示
5. **持久化**：`Storage` 将数据保存到 LocalStorage

## 五、核心数据结构

### 方案数据结构

```javascript
{
  id: "plan_xxx",           // 方案唯一ID
  name: "方案名称",          // 方案名称
  data: {
    class_id: "barbarian",   // 职业ID
    wpn1: 4500,              // 主武器伤害
    wpn2: 0,                 // 副武器伤害
    aps: 1.3,                // 攻击速度
    str: 7200,               // 主属性
    skill_pct: 215,          // 技能倍率(%)
    is_dot: false,           // 是否DoT伤害
    hits: 1,                 // 每次攻击命中次数
    affix_a: [...],          // A类词缀列表
    affix_b: [...],          // B类词缀列表
    multi_leg: [...],        // Legendary乘区列表
    crit_chance: 60,         // 暴击率(%)
    crit_active: true,       // 是否计算暴击
    vuln_add: 45,            // 易伤加成(%)
    vuln_active: true,       // 是否计算易伤
    vuln_uptime: 85,         // 易伤覆盖时间(%)
    op_stacks: 3,            // 压制叠层数
    op_stack_add: 20,        // 每层压制加成(%)
    monster_dr: 80,          // 怪物减伤(%)
    apply_dr: false          // 是否应用怪物减伤
  }
}
```

### 词缀数据结构

```javascript
// A类词缀
{ name: "力量加成", val: 50, enabled: true }

// B类词缀（按名称分组计算）
{ name: "核心技能伤害", val: 30, enabled: true }

// Legendary词缀（独立相乘）
{ name: "撕裂伤害", val: 15, enabled: true }
```

## 六、设计模式

### 1. 单例模式
- 计算器引擎：`D4Sim.Calculator`
- 存储管理器：`D4Sim.Storage`
- 配置管理器：`D4Sim.Config`

### 2. 全局对象模式
所有模块通过 `window.D4Sim` 对象共享，避免ES6模块的CORS问题，支持直接打开HTML运行。

### 3. 观察者模式（隐式）
通过事件监听机制实现UI更新：
- 用户操作 → 事件触发 → 状态更新 → UI重渲染

## 七、状态管理

### 全局状态

| 状态项 | 说明 | 存储位置 |
|--------|------|----------|
| `plans` | 方案列表 | `AppState.plans` |
| `activeId` | 当前活跃方案ID | `AppState.activeId` |
| `selectedBdId` | 选中的BD参考ID | `AppState.selectedBdId` |
| `lastCalcResult` | 上次计算结果 | `AppState.lastCalcResult` |
| `lastCalcData` | 上次计算输入数据 | `AppState.lastCalcData` |

### 持久化策略

- **自动保存**：方案数据在修改后自动保存到 LocalStorage
- **快照系统**：最多保存5个快照，手动触发保存
- **导入导出**：支持JSON格式的方案导入导出

## 八、关键技术点

### 1. 无服务器运行
通过全局对象模式替代ES6模块，避免`file://`协议下的CORS限制。

### 2. 模块化拆分
将单一HTML文件拆分为多个JS模块，提高可维护性。

### 3. CSS变量系统
使用CSS变量统一管理颜色、间距等设计参数。

### 4. 响应式设计
使用CSS Grid实现自适应布局，适配不同屏幕尺寸。