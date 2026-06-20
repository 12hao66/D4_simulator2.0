# 技能模拟器 设计文档

> Diablo IV Skills Simulator Design Document

## 1. 系统概述

### 1.1 项目目标
为暗黑破坏神4玩家提供一个技能选择与组合模拟工具，支持全职业技能树可视化、技能搭配和属性计算，并提供自定义编辑功能。

### 1.2 核心特性
- **全职业支持**：8种职业（野蛮人、德鲁伊、死灵法师、圣骑士、游侠、法师、灵巫、术士）
- **技能树系统**：层级式技能树结构，支持核心、基础、防御、攻击、终极技能
- **技能类型**：主动技能、被动技能、终极技能、核心技能
- **技能预览**：悬停查看技能详情和效果
- **Build管理**：保存、加载、导入导出技能配置
- **数据持久化**：使用localStorage保存用户配置
- **编辑模式**：支持技能节点拖拽移动、属性编辑、添加删除节点
- **虚拟网格线**：编辑模式下显示网格辅助线，方便节点对齐
- **画布操作**：支持缩放和平移，与巅峰盘模拟器交互一致

### 1.3 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |
| Canvas | - | 图形渲染 |

---

## 2. 架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                       UI Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Header   │  │ Skill    │  │ Skill    │  │  Stats  │ │
│  │          │  │ Canvas   │  │ Panel    │  │  Panel  │ │
│  │          │  │(Canvas)  │  │          │  │         │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Class    │  │  Build   │  │ Editor   │              │
│  │Selector  │  │ Manager  │  │  Panel   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │           useSkillStore (Zustand)                │   │
│  │  - currentClass: string                          │   │
│  │  - skillTree: SkillTree | null                   │   │
│  │  - unlockedSkills: Record<string, number>        │   │
│  │  - selectedSkill: string | null                  │   │
│  │  - skillPoints: number                           │   │
│  │  - builds: SkillBuild[]                          │   │
│  │  - currentBuildId: string | null                │   │
│  │  - zoom: number                                 │   │
│  │  - position: { x: number; y: number }           │   │
│  │  - editMode: boolean                            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Skills   │  │ Classes  │  │ Skill    │  │  Other  │ │
│  │  Data    │  │  Data    │  │ Effects  │  │  Data   │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Storage Layer                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              localStorage                         │   │
│  │  Key: skills-simulator-storage                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
modules/skills/
├── src/
│   ├── types/              # 类型定义
│   │   └── index.ts        # Skill, SkillTree等
│   ├── store/              # 状态管理
│   │   └── skillStore.ts   # Zustand状态定义
│   ├── data/               # 数据层
│   │   └── skills.ts       # 技能数据
│   ├── components/         # UI组件
│   │   ├── SkillCanvas.tsx     # 技能树Canvas渲染组件
│   │   ├── SkillPanel.tsx      # 技能面板组件
│   │   ├── ClassSelector.tsx   # 职业选择器组件
│   │   ├── StatsPanel.tsx      # 属性统计面板
│   │   ├── BuildManager.tsx    # Build管理组件
│   │   └── EditorPanel.tsx     # 编辑器面板组件
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口
│   └── index.css           # 全局样式
├── docs/                   # 文档
│   ├── DESIGN.md           # 设计文档（本文档）
│   ├── README.md           # 模块说明
│   ├── API.md              # API文档
│   ├── CHANGELOG.md        # 更新日志
│   └── USAGE.md            # 使用指南
├── index.html              # HTML模板
├── package.json            # 项目配置
├── vite.config.ts          # Vite配置
├── tailwind.config.js      # TailwindCSS配置
└── tsconfig.json           # TypeScript配置
```

---

## 3. 数据模型设计

### 3.1 核心类型定义

#### 3.1.1 技能类型
```typescript
type SkillType = 'active' | 'passive' | 'ultimate' | 'core'
```

#### 3.1.2 技能分类
```typescript
type SkillCategory = 'core' | 'basic' | 'defense' | 'attack' | 'ultimate' | 'passive'
```

#### 3.1.3 技能效果
```typescript
interface SkillEffect {
  id: string;           // 效果ID
  name: string;         // 效果名称
  description: string;  // 效果描述
  value: number;        // 效果数值
  unit: string;         // 单位（如"%", "点"）
}
```

#### 3.1.4 技能等级
```typescript
interface SkillRank {
  rank: number;         // 等级
  cost: number;         // 消耗技能点数
  bonuses: {            // 等级加成
    damage?: number;
    cooldown?: number;
    effects?: SkillEffect[];
  };
}
```

#### 3.1.5 技能接口
```typescript
interface Skill {
  id: string;                    // 技能唯一标识
  name: string;                  // 技能名称
  icon: string;                  // 图标（Emoji或图片路径）
  image?: string;                // 图片URL（可选）
  type: SkillType;               // 技能类型
  category: SkillCategory;       // 技能分类
  damage?: number;               // 伤害值
  damageType?: string;           // 伤害类型（物理、火焰、冰霜等）
  cooldown?: number;             // 冷却时间（秒）
  manaCost?: number;             // 魔力消耗
  requirements: string[];        // 前置技能需求
  description: string;           // 技能描述
  effects: SkillEffect[];        // 技能效果列表
  ranks: SkillRank[];            // 技能等级列表
  maxRank: number;               // 最大等级
}
```

#### 3.1.6 技能树接口
```typescript
interface SkillTree {
  classId: string;      // 职业ID
  className: string;    // 职业名称
  icon: string;         // 职业图标
  categories: SkillCategoryConfig[];  // 技能分类配置
}
```

#### 3.1.7 技能分类配置
```typescript
interface SkillCategoryConfig {
  id: SkillCategory;           // 分类ID
  name: string;               // 分类名称
  skills: Skill[];            // 技能列表
  position: {                 // 在技能树中的位置
    x: number;
    y: number;
  };
}
```

#### 3.1.8 Build接口
```typescript
interface SkillBuild {
  id: string;
  name: string;
  classId: string;
  selectedSkills: Record<string, number>;  // 技能ID -> 等级
  createdAt: number;
}
```

#### 3.1.9 技能节点接口
```typescript
interface SkillNode {
  id: string;                    // 节点唯一标识
  name: string;                  // 技能名称
  icon: string;                  // 图标
  type: SkillType;               // 技能类型
  category: SkillCategory;       // 技能分类
  maxRank: number;               // 最大等级
  requires: string[];            // 前置技能需求
  color?: string;                // 节点颜色
  isKeyNode?: boolean;           // 是否核心节点
  position: {                   // 节点位置
    x: number;
    y: number;
  };
}
```

#### 3.1.10 状态接口
```typescript
interface SkillState {
  currentClass: string;
  skillTree: SkillTree | null;       // 当前职业技能树
  unlockedSkills: Record<string, number>;  // 技能ID -> 等级
  selectedSkill: string | null;            // 当前选中的技能
  skillPoints: number;
  builds: SkillBuild[];
  currentBuildId: string | null;
  zoom: number;
  position: { x: number; y: number };     // 画布位置
  editMode: boolean;                       // 编辑模式
}
```

### 3.2 数据流设计

#### 3.2.1 技能选择流程
```
点击技能 → selectSkill(skillId) → 检查前置需求 → 更新selectedSkills → 更新spentPoints → 重新渲染
```

#### 3.2.2 职业切换流程
```
选择职业 → selectClass(classId) → 加载职业技能树 → 重置selectedSkills → 重新渲染技能树
```

#### 3.2.3 Build管理流程
```
保存Build → saveBuild(name) → 创建Build对象 → 保存到builds → 设置currentBuildId
加载Build → loadBuild(buildId) → 读取Build数据 → 更新selectedSkills → 更新skillPoints
```

---

## 4. 核心功能设计

### 4.1 技能树系统

#### 4.1.1 职业列表
| 职业ID | 名称 | 图标 | 特点 |
|--------|------|------|------|
| barbarian | 野蛮人 | ⚔️ | 近战物理，多武器 |
| druid | 德鲁伊 | 🐻 | 变形，自然魔法 |
| necromancer | 死灵法师 | 💀 | 召唤亡灵 |
| paladin | 圣骑士 | ⚜️ | 神圣伤害，治疗 |
| rogue | 游侠 | 🗡️ | 敏捷，暴击 |
| sorc | 法师 | 🔮 | 元素魔法 |
| spiritborn | 灵巫 | 👻 | 灵魂魔法 |
| warlock | 术士 | 🔥 | 暗影，诅咒 |

#### 4.1.2 技能分类
| 分类 | 说明 | 技能数量 |
|------|------|----------|
| core | 核心技能 | 3-4 |
| basic | 基础技能 | 2-3 |
| defense | 防御技能 | 2-3 |
| attack | 攻击技能 | 4-6 |
| ultimate | 终极技能 | 1-2 |
| passive | 被动技能 | 3-5 |

#### 4.1.3 技能解锁规则
- 核心技能：初始解锁
- 基础技能：无前置需求
- 其他技能：需要前置技能等级

### 4.2 技能效果系统

#### 4.2.1 伤害类型
```typescript
type DamageType = 'physical' | 'fire' | 'cold' | 'lightning' | 'shadow' | 'holy' | 'poison'
```

#### 4.2.2 效果类型
| 类型 | 说明 | 示例 |
|------|------|------|
| damage | 伤害加成 | +50%火焰伤害 |
| buff | 增益效果 | 攻击速度+10% |
| debuff | 减益效果 | 敌人护甲-20% |
| heal | 治疗效果 | 每秒恢复5%生命 |
| shield | 护盾效果 | 获得20%最大生命护盾 |

### 4.3 Build管理系统

#### 4.3.1 Build操作
| 操作 | 方法 | 说明 |
|------|------|------|
| 新建 | createBuild | 创建空白Build |
| 保存 | saveBuild | 保存当前技能配置 |
| 加载 | loadBuild | 加载指定Build |
| 重命名 | renameBuild | 修改Build名称 |
| 删除 | deleteBuild | 删除Build |
| 导出 | exportBuild | 导出为JSON |
| 导入 | importBuild | 从JSON导入 |

#### 4.3.2 导入导出格式
```json
{
  "version": "1.0",
  "name": "我的野蛮人Build",
  "classId": "barbarian",
  "selectedSkills": {
    "skill_whirlwind": 5,
    "skill_battle_trance": 3,
    "skill_berserk": 1
  }
}
```

---

## 5. SVG渲染系统

### 5.1 技能树布局

#### 5.1.1 布局结构
```
┌─────────────────────────────────────────────┐
│              核心技能 (Core)                │
│   [技能A]────[技能B]────[技能C]            │
│       │         │         │                │
├───────┼─────────┼─────────┼───────────────┤
│       ↓         ↓         ↓                │
│   [基础技能]  [防御技能]  [攻击技能]        │
│       │         │         │                │
│       ↓         ↓         ↓                │
│   [进阶技能]  [进阶技能]  [进阶技能]        │
│                       ↓                    │
│              [终极技能]                     │
└─────────────────────────────────────────────┘
```

#### 5.1.2 节点样式
| 技能类型 | 颜色 | 图标 |
|----------|------|------|
| active | 蓝色 | ▶️ |
| passive | 绿色 | ⚡ |
| ultimate | 橙色 | ★ |
| core | 金色 | ◆ |

### 5.2 连接线渲染
- 贝塞尔曲线连接相关技能
- 已解锁技能显示实线
- 未解锁技能显示虚线

---

## 6. 状态管理设计

### 6.1 Store Actions

| Action | 说明 | 参数 |
|--------|------|------|
| selectSkill | 选择技能 | skillId: string \| null |
| toggleSkill | 切换技能选择状态 | skillId: string |
| selectClass | 切换职业 | classId: string |
| setSkillPoints | 设置技能点数 | points: number |
| resetSkills | 重置所有技能 | 无 |
| saveBuild | 保存Build | name: string |
| loadBuild | 加载Build | buildId: string |
| deleteBuild | 删除Build | buildId: string |
| exportBuild | 导出Build | 无 |
| importBuild | 导入Build | data: SkillBuild |
| setZoom | 设置缩放比例 | zoom: number |
| setPosition | 设置画布位置 | position: { x: number; y: number } |
| toggleEditMode | 切换编辑模式 | 无 |
| addSkillNode | 添加技能节点 | nodeData: Omit\<SkillNode, 'id'\> |
| updateSkillNode | 更新技能节点 | nodeId: string, updates: Partial\<SkillNode\> |
| deleteSkillNode | 删除技能节点 | nodeId: string |

### 6.2 状态持久化

使用 Zustand persist 中间件：
```typescript
persist(
  (set, get) => ({ /* ... */ }),
  {
    name: 'skills-simulator-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      currentClass: state.currentClass,
      selectedSkills: state.selectedSkills,
      skillPoints: state.skillPoints,
      builds: state.builds,
      currentBuildId: state.currentBuildId
    })
  }
)
```

---

## 7. UI设计规范

### 7.1 布局尺寸

| 区域 | 宽度 | 高度 |
|------|------|------|
| 整体容器 | 全屏 | 全屏 |
| 技能树区域 | 70% | 100% |
| 侧边面板 | 30% | 100% |
| 技能节点 | 60px x 60px | 60px |

### 7.2 颜色方案

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 背景色 | #0a0a0f | 暗黑风格背景 |
| 面板色 | #1a1a2e | 面板背景 |
| 金色 | #c9a962 | 主要强调色 |
| 蓝色 | #0070dd | 主动技能 |
| 绿色 | #1eff00 | 被动技能 |
| 橙色 | #ff8c00 | 终极技能 |

### 7.3 暗黑风格主题

```css
/* 主色调 */
--d4-bg: #0a0a0f;
--d4-panel: #1a1a2e;
--d4-border: #2a2a3e;
--d4-text: #e0e0e0;
--d4-muted: #888888;

/* 技能颜色 */
--d4-skill-active: #0070dd;
--d4-skill-passive: #1eff00;
--d4-skill-ultimate: #ff8c00;
--d4-skill-core: #c9a962;
```

### 7.4 交互效果

- **悬停效果**：技能节点放大1.1倍，显示技能详情Tooltip
- **选中效果**：金色边框（3px）+ 发光阴影
- **已解锁**：彩色填充，实线连接
- **未解锁**：灰色填充，虚线连接
- **过渡动画**：200ms ease-in-out

---

## 8. 组件设计

### 8.1 组件列表

| 组件 | 功能 | 核心职责 |
|------|------|----------|
| SkillCanvas | 技能树渲染 | Canvas绘制、技能节点、连接线、网格线 |
| SkillPanel | 技能面板 | 技能详情、等级选择 |
| ClassSelector | 职业选择 | 职业切换下拉框、编辑模式切换 |
| StatsPanel | 属性统计 | 属性加成展示 |
| BuildManager | Build管理 | Build列表、操作 |
| EditorPanel | 编辑器面板 | 节点属性编辑、添加删除节点 |

### 8.2 组件通信

```
App
  ├── ClassSelector (职业选择)
  ├── SkillTree (技能树渲染)
  │     └── SkillNode (技能节点)
  ├── SkillPanel (技能详情)
  ├── StatsPanel (属性统计)
  └── BuildManager (Build管理)
          └── 共享useSkillStore状态
```

---

## 9. 性能优化

### 9.1 SVG优化
- 使用 React.memo 优化组件渲染
- 使用 useMemo 缓存计算结果
- 避免不必要的重渲染

### 9.2 状态管理优化
- 使用 Zustand 的 shallow 比较
- 使用 useCallback 缓存事件处理函数
- 延迟计算非关键属性

---

## 10. 安全性考虑

### 10.1 数据验证
- 导入数据时验证JSON格式
- 防止XSS攻击（React自动转义）
- 文件上传限制为JSON格式

### 10.2 错误处理
- try-catch 捕获异常
- 用户友好的错误提示
- 降级方案处理失败情况

---

## 11. 扩展性设计

### 11.1 模块化设计
- 组件独立封装
- 类型定义集中管理
- 数据层与UI分离

### 11.2 可扩展性
- 支持新增职业
- 支持新增技能
- 支持新增技能类型

### 11.3 国际化
- 文本集中管理
- 支持多语言切换

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
- 构建后复制到主项目dist目录

---

## 13. 版本规划

### v2.1.0 (当前)
- ✅ 全职业技能树
- ✅ 技能选择与升级
- ✅ Build管理系统
- ✅ 导入导出功能
- ✅ 编辑模式（节点拖拽、属性编辑）
- ✅ 虚拟网格线
- ✅ 画布缩放和平移

### v2.2.0 (计划)
- 技能组合推荐
- 技能伤害计算器
- 更多职业支持

---

## 14. 参考文档

- [README.md](./README.md) - 模块说明
- [API.md](./API.md) - API文档
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志
- [USAGE.md](./USAGE.md) - 使用指南

---

**文档版本**: v2.1  
**最后更新**: 2026-06-18  
**维护者**: 开发团队