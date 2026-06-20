# 巅峰盘模拟器 设计文档

> Diablo IV Paragon Simulator Design Document

## 1. 系统概述

### 1.1 项目目标
为暗黑破坏神4玩家提供一个巅峰盘节点规划模拟工具，支持可视化编辑、属性计算和配置管理。

### 1.2 核心特性
- **10个巅峰盘**：1个核心盘 + 9个可选巅峰盘
- **6种节点类型**：普通、稀有、传奇、空节点、链接节点、巅峰起始节点
- **21×21网格系统**：固定网格布局，节点紧密排列
- **多巅峰盘系统**：支持5个巅峰盘同时激活（1初始 + 4可选）
- **雕纹系统**：中心雕纹槽位，支持12种雕纹
- **相邻解锁机制**：节点必须从入口点开始相邻解锁（上下左右）
- **路径高亮**：显示从入口到已解锁节点的路径
- **可视化编辑器**：拖拽调整节点位置，实时预览
- **配置导出**：支持导出巅峰盘配置为JSON
- **数据持久化**：使用localStorage保存用户配置

### 1.3 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |
| Canvas 2D | - | 图形渲染 |

---

## 2. 架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                       UI Layer                           │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   App    │  │ParagonCanvas │  │ ParagonPanel/    │   │
│  │  Header  │  │  (Canvas)    │  │ EditorPanel      │   │
│  └──────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │           useParagonStore (Zustand)              │   │
│  │  - boards: ParagonBoard[]                       │   │
│  │  - availableBoards: ParagonBoard[]              │   │
│  │  - activeBoardIndex: number                     │   │
│  │  - unlockedNodes: string[]                      │   │
│  │  - selectedNode: string | null                  │   │
│  │  - selectedGlyph: Glyph | null                  │   │
│  │  - zoom: number                                 │   │
│  │  - position: { x: number; y: number }          │   │
│  │  - editMode: boolean                            │   │
│  │  - totalPoints: number                          │   │
│  │  - spentPoints: number                          │   │
│  │  - highlightedPaths: string[][]                 │   │
│  │  - clickableNodes: string[]                     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐   │
│  │ Paragon  │  │   Glyphs │  │ BoardDefinitions   │   │
│  │  Data    │  │  Data    │  │  (固定结构定义)    │   │
│  └──────────┘  └──────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Storage Layer                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              localStorage                         │   │
│  │  Key: paragon-simulator-storage                  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
modules/paragon/
├── src/
│   ├── types/              # 类型定义
│   │   └── index.ts        # ParagonNode, ParagonBoard等
│   ├── store/              # 状态管理
│   │   └── paragonStore.ts # Zustand状态定义
│   ├── data/               # 数据层
│   │   └── paragon.ts      # 巅峰盘数据和雕纹数据
│   ├── components/         # UI组件
│   │   ├── ParagonCanvas.tsx   # Canvas渲染组件
│   │   ├── ParagonPanel.tsx    # 信息面板组件
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

#### 3.1.1 节点类型
```typescript
type ParagonNodeType = 'normal' | 'rare' | 'legendary' | 'empty' | 'link' | 'paragon'
```

#### 3.1.2 节点接口
```typescript
interface ParagonNode {
  id: string;                    // 节点唯一标识
  type: ParagonNodeType;         // 节点类型
  name: string;                  // 节点名称
  icon: string;                  // 图标（Emoji）
  image?: string;                // 图片URL（可选）
  x: number;                     // X坐标
  y: number;                     // Y坐标
  effects: ParagonEffect[];      // 属性效果列表
  bonuses?: ParagonBonus[];      // 条件加成（稀有/传奇）
  connections: string[];         // 连接的节点ID列表
  isEntryPoint?: boolean;        // 是否为入口点（可直接解锁）
  description?: string;          // 节点描述
}
```

#### 3.1.3 属性效果
```typescript
interface ParagonEffect {
  id: string;           // 效果ID
  name: string;         // 效果名称
  description: string;  // 效果描述
  value: number;        // 效果数值
  unit: string;         // 单位（如"%", "点"）
}
```

#### 3.1.4 条件加成
```typescript
interface ParagonBonus {
  condition: string;      // 条件描述
  description: string;    // 加成描述
  currentValue: number;   // 当前值
  requiredValue: number;  // 需求值
  bonusEffect: string;    // 加成效果
}
```

#### 3.1.5 雕纹接口
```typescript
interface Glyph {
  id: string;           // 雕纹ID
  name: string;         // 雕纹名称
  icon: string;         // 图标
  description: string;  // 描述
  effect: string;       // 效果说明
  radius: number;       // 影响半径（1或2）
  type: 'offensive' | 'defensive' | 'utility'; // 类型
}
```

#### 3.1.6 巅峰盘接口
```typescript
interface ParagonBoard {
  id: string;                 // 巅峰盘ID
  name: string;               // 巅峰盘名称
  icon: string;               // 图标
  nodes: ParagonNode[];       // 节点列表
  centerSlot: {               // 中心雕纹槽
    x: number;
    y: number;
    glyph: Glyph | null;
  };
  entryPoints: string[];      // 入口点节点ID列表
}
```

#### 3.1.7 状态接口
```typescript
interface ParagonState {
  boards: ParagonBoard[];           // 已选择的巅峰盘
  availableBoards: ParagonBoard[];  // 可用的巅峰盘
  activeBoardIndex: number;         // 当前激活的巅峰盘索引
  unlockedNodes: string[];          // 已解锁的节点ID列表
  selectedNode: string | null;      // 当前选中的节点
  selectedGlyph: Glyph | null;      // 当前选中的雕纹
  zoom: number;                     // 缩放比例
  position: { x: number; y: number }; // 画布位置
  totalPoints: number;              // 总巅峰点数
  spentPoints: number;              // 已使用点数
}

interface ExtendedParagonState extends ParagonState {
  editMode: boolean;              // 是否处于编辑模式
  highlightedPaths: string[][];   // 高亮路径（节点ID数组）
  clickableNodes: string[];       // 可点击的节点ID列表
}
```

### 3.2 数据流设计

#### 3.2.1 节点解锁流程
```
用户点击节点 → toggleNode(nodeId) 
    ↓
检查是否可解锁（入口点或与已解锁节点相邻）
    ↓
更新unlockedNodes → 计算highlightedPaths → 计算clickableNodes → 重新渲染Canvas
```

#### 3.2.2 巅峰盘切换流程
```
点击巅峰盘 → switchBoard(index) → 更新activeBoardIndex → 重置视图 → 重新渲染Canvas
```

#### 3.2.3 编辑模式流程
```
进入编辑 → setEditMode(true) → 切换EditorPanel → 启用节点拖拽
    ↓
拖拽节点 → updateNodePosition → 更新节点坐标 → 重新渲染
    ↓
导出配置 → exportBoardConfig → 生成JSON → 复制到剪贴板
```

---

## 4. 核心功能设计

### 4.1 多巅峰盘系统

#### 4.1.1 巅峰盘配置
| 巅峰盘ID | 名称 | 主题 | 传奇节点 |
|----------|------|------|----------|
| core | 核心 | 基础属性 | 核心意志 |
| offensive | 猛攻 | 攻击导向 | 猛攻大师 |
| defense | 守护 | 防御导向 | 钢铁堡垒 |
| technique | 技巧 | 暴击速度 | 致命节奏 |
| endurance | 耐力 | 生命意志 | 不朽意志 |
| insight | 洞察 | 智力冷却 | 神秘智慧 |
| berserker | 狂暴 | 高风险高回报 | 狂战士 |
| elemental | 元素 | 元素伤害 | 元素支配 |
| shadow | 暗影 | 敏捷潜行 | 暗影步 |
| sacred | 神圣 | 治疗护盾 | 神圣庇护 |

#### 4.1.2 选择机制
- 核心盘始终存在（无法移除）
- 从9个可选盘中选择4个
- 最多同时激活5个巅峰盘

### 4.2 21×21网格系统

#### 4.2.1 网格配置
- **网格尺寸**：21列 × 21行
- **节点尺寸**：直径32px（半径16px）
- **网格间距**：32px（等于节点直径，紧密排列）
- **大正方形尺寸**：21 × 32 = 672px
- **中心位置**：(10, 10) 对应坐标 (0, 0)

#### 4.2.2 坐标转换
```typescript
// col/row → 像素坐标
const colRowToXY = (col: number, row: number) => {
  const centerX = 10 * GRID_SPACING;
  const centerY = 10 * GRID_SPACING;
  return {
    x: col * GRID_SPACING - centerX,
    y: row * GRID_SPACING - centerY
  };
};
```

### 4.3 节点系统

#### 4.3.1 节点类型特性
| 类型 | 视觉标识 | 效果强度 | 点数消耗 | 说明 |
|------|----------|----------|----------|------|
| normal | 金色圆形 | 低 | 1点 | 基础属性加成 |
| rare | 蓝色圆形+◆ | 中 | 1点 | 条件加成效果 |
| legendary | 橙色圆形+★ | 高 | 2点 | 独特被动效果 |
| empty | 虚线圆 | 无 | 0点 | 预留扩展位置 |
| link | 金色圆形 | 无 | 0点 | 面板间连接入口 |
| paragon | 皇冠图标 | 无 | 0点 | 巅峰等级起始节点 |

#### 4.3.2 相邻解锁规则
- 入口点（entry/link/paragon类型）可以直接解锁
- 普通节点必须与已解锁节点**上下左右相邻**才能解锁
- 对角线相邻不算有效连接
- 已解锁节点可以取消解锁（会影响后续节点的可用性）

#### 4.3.3 路径高亮机制
- 使用BFS算法计算从入口点到所有已解锁节点的路径
- 高亮路径显示为金色发光线条
- 实时更新路径状态

### 4.4 雕纹系统

#### 4.4.1 雕纹分类
| 类型 | 图标 | 数量 | 效果特点 |
|------|------|------|----------|
| offensive | ⚔️ | 5 | 伤害加成 |
| defensive | 🛡️ | 4 | 防御加成 |
| utility | ⚡ | 3 | 功能效果 |

#### 4.4.2 雕纹列表
```typescript
const glyphs: Glyph[] = [
  { id: 'glyph_berserk', name: '狂暴', icon: '💥', radius: 2, type: 'offensive', ... },
  { id: 'glyph_protection', name: '守护', icon: '🛡️', radius: 2, type: 'defensive', ... },
  { id: 'glyph_fortitude', name: '坚韧', icon: '❤️', radius: 1, type: 'defensive', ... },
  // ...更多雕纹
];
```

### 4.5 可视化编辑器

#### 4.5.1 编辑功能
| 功能 | 操作方式 | 说明 |
|------|----------|------|
| 节点拖拽 | 点击拖拽 | 自动吸附32px网格 |
| 添加节点 | 右键菜单/面板按钮 | 添加6种类型节点 |
| 删除节点 | 右键菜单/面板按钮 | 删除选中节点 |
| 属性编辑 | 右侧面板 | 修改类型、名称、图标、图片 |
| 导出配置 | 按钮 | 生成JSON配置 |
| 网格显示 | 编辑模式自动显示 | 21×21网格辅助线 |

#### 4.5.2 网格系统
- 网格间距：32像素
- 自动吸附：拖拽时自动对齐
- 坐标单位：像素

---

## 5. Canvas渲染系统

### 5.1 渲染流程

```
1. 清空画布
2. 绘制背景网格
3. 绘制编辑模式网格线（仅编辑模式）
4. 绘制正方形边框
5. 绘制高亮路径
6. 绘制雕纹影响范围（如果有雕纹）
7. 绘制节点（按类型渲染不同样式）
8. 绘制选中节点高亮
9. 绘制入口点标记
10. 绘制可点击节点高亮（绿色虚线圆环）
```

### 5.2 节点渲染逻辑

#### 5.2.1 普通节点
```
外圈边框 → 渐变填充 → 图标 → 类型标识
```

#### 5.2.2 空节点
```
虚线圆 → 中心点
```

#### 5.2.3 链接节点
```
金色圆形 → 🔗图标
```

#### 5.2.4 巅峰起始节点
```
金色圆形 → 👑皇冠图标
```

### 5.3 缩放和平移

#### 5.3.1 坐标转换
```typescript
// 屏幕坐标 → 画布坐标
const canvasX = (screenX - position.x) / zoom;
const canvasY = (screenY - position.y) / zoom;

// 画布坐标 → 屏幕坐标  
const screenX = canvasX * zoom + position.x;
const screenY = canvasY * zoom + position.y;
```

#### 5.3.2 缩放限制
- 最小缩放：0.5x
- 最大缩放：2x

### 5.4 可点击节点高亮
- 绿色虚线圆环（rgba(0, 255, 136, 0.6)）
- 发光效果（rgba(0, 255, 136, 0.8)）
- 编辑模式下不显示

---

## 6. 状态管理设计

### 6.1 Store Actions

| Action | 说明 | 参数 |
|--------|------|------|
| selectNode | 选择节点 | nodeId: string \| null |
| toggleNode | 切换节点解锁状态 | nodeId: string |
| setZoom | 设置缩放比例 | zoom: number |
| setPosition | 设置画布位置 | position: {x, y} |
| resetView | 重置视图 | 无 |
| switchBoard | 切换巅峰盘 | index: number |
| selectBoard | 添加巅峰盘 | board: ParagonBoard |
| deselectBoard | 移除巅峰盘 | boardIndex: number |
| equipGlyph | 装备雕纹 | glyph: Glyph |
| unequipGlyph | 卸下雕纹 | 无 |
| setTotalPoints | 设置总点数 | points: number |
| setEditMode | 设置编辑模式 | mode: boolean |
| updateNodePosition | 更新节点位置 | nodeId, x, y |
| addNode | 添加节点 | nodeData |
| deleteNode | 删除节点 | nodeId: string |
| updateNode | 更新节点属性 | nodeId, updates |
| exportBoardConfig | 导出配置 | 无 |

### 6.2 状态持久化

使用 Zustand persist 中间件：
```typescript
persist(
  (set, get) => ({ /* ... */ }),
  {
    name: 'paragon-simulator-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      boards: state.boards,
      activeBoardIndex: state.activeBoardIndex,
      unlockedNodes: state.unlockedNodes,
      totalPoints: state.totalPoints
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
| Canvas区域 | 自适应 | 自适应 |
| 侧边面板 | 320px | 100% |
| 节点尺寸 | 32px直径 | 32px直径 |
| 大正方形边框 | 672px | 672px |

### 7.2 颜色方案

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 背景色 | #0a0a0f | 暗黑风格背景 |
| 面板色 | #1a1a2e | 面板背景 |
| 金色 | #c9a962 | 主要强调色 |
| 稀有蓝 | #0070dd | 稀有节点 |
| 传奇橙 | #ff8c00 | 传奇节点 |
| 链接色 | #c9a962 | 链接节点 |
| 空节点 | #666666 | 空节点 |
| 可点击高亮 | rgba(0, 255, 136, 0.6) | 绿色虚线圆环 |

### 7.3 暗黑风格主题

```css
/* 主色调 */
--diablo-bg: #0a0a0f;
--diablo-panel: #1a1a2e;
--diablo-border: #2a2a3e;
--diablo-text: #e0e0e0;
--diablo-muted: #888888;

/* 强调色 */
--diablo-gold: #c9a962;
--diablo-blue: #0070dd;
--diablo-orange: #ff8c00;
--diablo-green: #1eff00;
--diablo-red: #ff4444;
```

### 7.4 交互效果

- **悬停效果**：节点放大1.1倍，显示发光效果
- **选中效果**：金色边框（4px）+ 发光阴影（20px）
- **可点击效果**：绿色虚线圆环 + 发光
- **过渡动画**：200ms ease-in-out
- **拖拽反馈**：实时更新位置，网格吸附

---

## 8. 组件设计

### 8.1 组件列表

| 组件 | 功能 | 核心职责 |
|------|------|----------|
| ParagonCanvas | 画布渲染 | Canvas绘制、交互处理、网格渲染 |
| ParagonPanel | 信息面板 | 巅峰盘选择、雕纹管理、属性统计 |
| EditorPanel | 编辑面板 | 节点编辑、添加删除、配置导出 |
| App | 主应用 | 布局管理、编辑模式切换 |

### 8.2 组件通信

```
App
  ├── ParagonCanvas (Canvas渲染 + 交互)
  └── ParagonPanel / EditorPanel (根据editMode切换)
          └── 共享useParagonStore状态
```

---

## 9. 性能优化

### 9.1 Canvas优化
- 使用 requestAnimationFrame 进行流畅渲染
- 分层渲染（背景、网格、边框、路径、节点、UI）
- 避免不必要的重绘

### 9.2 状态管理优化
- 使用 Zustand 的 shallow 比较避免不必要重渲染
- 使用 useCallback 缓存事件处理函数
- 使用 useMemo 缓存计算结果

### 9.3 内存管理
- 及时清理事件监听器
- 避免内存泄漏
- 合理使用 React 生命周期

---

## 10. 安全性考虑

### 10.1 数据验证
- 导入配置时验证JSON格式
- 防止XSS攻击（React自动转义）
- 限制导出数据大小

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
- 支持新增巅峰盘
- 支持新增节点类型
- 支持新增雕纹

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

### v2.0.0 (当前)
- ✅ 10个固定结构巅峰盘（21×21网格）
- ✅ 6种节点类型（含巅峰起始节点）
- ✅ 相邻解锁机制
- ✅ 路径高亮功能
- ✅ 可点击节点高亮
- ✅ 编辑模式网格线
- ✅ 可视化编辑器
- ✅ 配置导出功能

### v2.1.0 (计划)
- 职业专属巅峰盘
- 更丰富的雕纹系统
- 节点连接可视化

---

## 14. 参考文档

- [README.md](./README.md) - 模块说明
- [API.md](./API.md) - API文档
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志
- [USAGE.md](./USAGE.md) - 使用指南

---

**文档版本**: v2.0  
**最后更新**: 2026-06-17  
**维护者**: 开发团队