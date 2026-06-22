# 巅峰盘模拟器 2.0 设计文档

> Diablo IV Paragon Simulator v2.0 Design Document

## 1. 系统概述

### 1.1 项目目标
为暗黑破坏神4玩家提供一个全新的巅峰盘节点规划模拟工具，支持可视化编辑、多盘面连接和属性计算。

### 1.2 核心特性
- **9个巅峰盘**：1个核心起始盘 + 8个可选巅峰盘
- **7种节点类型**：普通、魔法、稀有、传奇、Gate（关口）、Socket（雕文槽）、Start（起始节点）
- **21×21网格系统**：固定网格布局，节点紧密排列
- **多盘面连接系统**：支持通过Gate节点连接多个巅峰盘
- **边挨边显示**：盘面之间紧密相邻显示
- **旋转功能**：支持盘面90度旋转
- **节点点亮机制**：从起始节点开始，逐个点亮相邻节点

### 1.3 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Canvas 2D | - | 图形渲染 |
| CSS | - | 样式 |

---

## 2. 核心功能设计

### 2.1 节点点亮机制

#### 2.1.1 规则
- 点击起始节点（Start）可以直接点亮
- 点亮一个节点后，其上下左右相邻的节点变为"可达"状态
- 点击Gate节点会弹出面板选择框，用于连接新的巅峰盘
- 只有可达节点可以被点亮
- 已点亮的节点保持高亮显示（红色边框）

#### 2.1.2 可达性计算
```typescript
// 计算可达节点 - 只有已分配节点和它们的相邻节点可达
const reachableNodes = useMemo(() => {
  const reachable = new Set<string>();
  const allocatedKeys = new Set<string>();
  
  // 收集所有已分配节点
  allocations.forEach((alloc, key) => {
    allocatedKeys.add(key);
    reachable.add(key);
  });
  
  // 如果没有已分配节点，起始节点应该可达
  if (allocatedKeys.size === 0) {
    // 添加起始节点到可达集合
    ...
  }
  
  // 对每个已分配节点，添加它的相邻节点到可达集合
  allocations.forEach((alloc) => {
    // 检查上下左右四个相邻位置
    const neighbors = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 }
    ];
    
    for (const neighbor of neighbors) {
      if (valid && !allocatedKeys.has(key)) {
        reachable.add(key);
      }
    }
  });
  
  return reachable;
}, [allocations, data.boards, connectedBoards]);
```

### 2.2 盘面连接系统

#### 2.2.1 Gate节点
Gate节点是位于盘面边缘的特殊节点，点击后可以连接新的巅峰盘。

- Gate在顶部（row=0）：新盘面在上方
- Gate在底部（row=20）：新盘面在下方
- Gate在左侧（col=0）：新盘面在左边
- Gate在右侧（col=20）：新盘面在右边

#### 2.2.2 连接流程
1. 点击Gate节点
2. 弹出面板选择框
3. 选择要连接的巅峰盘
4. 新盘面出现在Gate相反方向的相邻位置

### 2.3 边挨边坐标系统

#### 2.3.1 问题背景
初始实现中，使用了原始项目的坐标系统（相邻位置间距3350像素），但由于节点尺寸和间距不同（原始项目：CELL_SIZE=150，我的实现：CELL_SIZE=40），导致盘面之间出现巨大间隙。

#### 2.3.2 解决方案
重新定义了PARAGON_GRID_COORDINATES坐标系统，确保相邻位置间距等于盘面高度（21 × CELL_SIZE = 840像素）。

```typescript
// types.ts
export const PARAGON_GRID_COORDINATES: Record<string, [number, number]> = {
  // 第一行（最上方）
  'V': [-1950, -4200], 'E': [-1300, -4200], ...
  // 第四行（包含起始盘位置'5'）
  'Y': [-1950, -1680], 'B': [-1300, -1680], '4': [-650, -1680], '5': [0, -1680], ...
  // 第五行（最下方）
  'Z': [-1950, -840], 'A': [-1300, -840], '1': [-650, -840], '2': [0, -840], ...
};
```

关键参数：
- CELL_SIZE = NODE_SIZE + NODE_GAP = 36 + 4 = 40
- 盘面尺寸 = 21 × CELL_SIZE = 840像素
- 相邻位置间距 = 盘面高度 = 840像素

#### 2.3.3 网格布局（7×5）
```
V E F G H I U
W D J K L M T
X C 7 8 9 N S   ← 位置'8'在中间
Y B 4 5 6 O R   ← 位置'5'是起始盘
Z A 1 2 3 P Q
```

### 2.4 相邻位置查找算法

使用与原始项目一致的算法来确定Gate连接的相邻位置：

```typescript
// App.tsx
const GRID_LOCATIONS = [
  ['V', 'E', 'F', 'G', 'H', 'I', 'U'],
  ['W', 'D', 'J', 'K', 'L', 'M', 'T'],
  ['X', 'C', '7', '8', '9', 'N', 'S'],
  ['Y', 'B', '4', '5', '6', 'O', 'R'],
  ['Z', 'A', '1', '2', '3', 'P', 'Q'],
];

// 根据Gate节点位置和旋转角度确定相邻grid位置
const findAdjacentGridLocation = (
  currentGridLocation: string,
  gateRow: number,
  gateCol: number,
  rotation: number
): string | null => {
  const gridPos = findGridPosition(currentGridLocation);
  if (!gridPos) return null;
  
  const [gridX, gridY] = gridPos;
  
  // 根据节点位置确定相邻grid位置
  if (gateCol === 0) {
    // Gate在左边缘 → 新盘在左边
    if (gridY > 0) return GRID_LOCATIONS[gridX][gridY - 1];
  } else if (gateCol === 20) {
    // Gate在右边缘 → 新盘在右边
    if (gridY < 6) return GRID_LOCATIONS[gridX][gridY + 1];
  } else if (gateRow === 0) {
    // Gate在上边缘 → 新盘在上方
    if (gridX > 0) return GRID_LOCATIONS[gridX - 1][gridY];
  } else {
    // Gate在下边缘 → 新盘在下方
    if (gridX < 4) return GRID_LOCATIONS[gridX + 1][gridY];
  }
  
  return null;
};
```

---

## 3. 数据模型设计

### 3.1 节点类型
```typescript
type NodeType = 'normal' | 'magic' | 'rare' | 'legendary' | 'gate' | 'socket' | 'start';
```

### 3.2 节点属性
```typescript
interface GridNode {
  id: string;           // 节点唯一标识
  type: NodeType;       // 节点类型
  name?: string;        // 节点名称
  nameCn?: string;      // 中文名称
  nameEn?: string;      // 英文名称
  desc?: string;        // 描述
  descCn?: string;      // 中文描述
  descEn?: string;      // 英文描述
  attribute?: string;    // 属性类型
}
```

### 3.3 Gate定义
```typescript
interface Gate {
  row: number;          // Gate节点行索引
  col: number;          // Gate节点列索引
  direction: string;    // 连接方向（原始数据中的定义）
}
```

### 3.4 盘面实例
```typescript
interface BoardInstance {
  boardIndex: number;       // 盘面索引
  boardId: string;          // 盘面ID
  gridLocation: string;     // 网格位置标识（如'5', '8'）
  rotation: number;         // 旋转角度（0, 90, 180, 270）
  equipIndex: number;       // 装备索引
  equippedGlyph: { glyphId: string; rank: number } | null;
}
```

---

## 4. JSON数据文件结构

### 4.1 文件位置
```
modules/paragonnew/src/data/barbarianData.json
```

### 4.2 根结构
```json
{
  "version": "52025",           // 数据版本
  "className": "Barbarian",     // 职业名称
  "classNameCn": "野蛮人",      // 职业中文名
  "language": "zhCN",           // 语言标识
  "boards": [ ... ]             // 巅峰盘数组
}
```

### 4.3 巅峰盘（Board）
```json
{
  "id": "Paragon_Barb_Start",   // 盘面唯一标识
  "name": "Start",              // 盘面名称
  "rows": 15,                   // 行数（注意：可能小于21）
  "cols": 21,                   // 列数（固定21）
  "grid": [ ... ],              // 21×21网格数组（null表示空节点）
  "gates": [ ... ],             // Gate节点定义数组
  "startNodes": [ ... ],        // 起始节点定义数组
  "gatePositions": { ... }      // 按方向分类的Gate位置
}
```

### 4.4 节点（GridNode）
网格中的每个节点是一个对象，null表示该位置为空：

```json
{
  "id": "Generic_Normal_Str",   // 节点ID
  "type": "normal",             // 节点类型
  "name": "Strength",           // 节点名称
  "nameEn": "Strength",         // 英文名称
  "nameCn": "力量",             // 中文名称
  "desc": "+5 点力量",          // 描述
  "descEn": "+5 Strength",      // 英文描述
  "descCn": "+5 点力量",        // 中文描述
  "tags": ["力量"],             // 标签数组
  "tierValues": []             // 等级值数组
}
```

### 4.5 节点类型说明
| type值 | 说明 | 示例 |
|--------|------|------|
| `normal` | 普通节点 | Generic_Normal_Str |
| `magic` | 魔法节点 | Generic_Magic_Str |
| `rare` | 稀有节点 | Generic_Rare_Will |
| `legendary` | 传奇节点 | Paragon_Barb_Legendary |
| `gate` | Gate关口 | Generic_Gate |
| `socket` | 雕文槽 | Generic_Socket |
| `start` | 起始节点 | StartNodeBarb |

### 4.6 Gate定义
```json
{
  "row": 0,                    // 行索引
  "col": 10,                   // 列索引
  "id": "Generic_Gate",         // Gate节点ID
  "direction": "bottom"         // 连接方向（top/bottom/left/right）
}
```

**direction说明**：
- `bottom`：Gate在顶部，连接向下，新盘面在原盘面上方
- `top`：Gate在底部，连接向上，新盘面在原盘面下方
- `right`：Gate在左侧，连接向右，新盘面在原盘面左侧
- `left`：Gate在右侧，连接向左，新盘面在原盘面右侧

### 4.7 起始节点定义
```json
{
  "row": 14,                   // 行索引
  "col": 10,                   // 列索引
  "id": "StartNodeBarb"        // 起始节点ID
}
```

### 4.8 Gate位置分类
```json
{
  "top": [ ... ],              // 顶部Gate数组
  "bottom": [ ... ],            // 底部Gate数组
  "left": [ ... ],             // 左侧Gate数组
  "right": [ ... ]             // 右侧Gate数组
}
```

### 4.9 数据示例
```json
{
  "boards": [
    {
      "id": "Paragon_Barb_Start",
      "name": "Start",
      "rows": 15,
      "cols": 21,
      "gates": [
        {
          "row": 0,
          "col": 10,
          "id": "Generic_Gate",
          "direction": "bottom"
        }
      ],
      "startNodes": [
        {
          "row": 14,
          "col": 10,
          "id": "StartNodeBarb"
        }
      ],
      "gatePositions": {
        "top": [{ "row": 0, "col": 10, "id": "Generic_Gate", "direction": "bottom" }],
        "bottom": [],
        "left": [],
        "right": []
      }
    }
  ]
}
```

---

## 5. 问题修复记录

### 5.1 问题：盘面不边挨边显示

#### 5.1.1 问题描述
点击Gate节点连接新盘面后，新盘面与原盘面之间存在巨大间隙，没有实现边挨边显示。

#### 5.1.2 根本原因
- 原始项目使用CELL_SIZE=150，相邻位置间距为3350像素
- 我的实现使用CELL_SIZE=40，盘面高度仅为840像素
- 但我仍然使用3350像素的间距来计算相邻位置
- 导致新盘面出现在距离原盘面3350像素的位置，而不是840像素的位置

#### 4.1.3 解决方案
重新定义PARAGON_GRID_COORDINATES坐标系统，使相邻位置间距等于盘面高度（840像素）：
- 位置'5'：[0, -1680]
- 位置'8'：[0, -2520]
- 位置'2'：[0, -840]
- y坐标差距 = 840 = 盘面高度

### 4.2 相关文件修改

| 文件 | 修改内容 |
|------|----------|
| types.ts | 重新定义PARAGON_GRID_COORDINATES坐标系统 |
| App.tsx | 添加GRID_LOCATIONS数组和findAdjacentGridLocation函数 |
| App.tsx | 修改handleNodeClick中Gate节点的处理逻辑 |
| App.tsx | 修改connectBoardViaGate函数使用新的相邻位置查找算法 |

---

## 5. 节点高亮显示

### 5.1 高亮规则
- **起始节点**：未点亮时白色边框，hover时白色高亮
- **可达节点**：绿色边框，表示可以点击点亮
- **已点亮节点**：红色边框 + 红色光晕效果，持续高亮
- **Gate节点**：紫色边框，点击后弹出面板选择框

### 5.2 渲染实现
```typescript
// ParagonCanvas.tsx
if (isAllocated) {
  // 已分配节点：红色边框 + 光晕效果
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#ff4444';
  ctx.shadowBlur = 8;
} else if (isHovered) {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
} else if (isReachable) {
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
} else {
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 1.5;
}
ctx.stroke();
ctx.shadowBlur = 0; // 清除阴影
```

---

## 6. 目录结构

```
modules/paragonnew/
├── src/
│   ├── types.ts           # 类型定义和常量
│   ├── App.tsx            # 主应用组件
│   ├── index.css          # 全局样式
│   ├── main.tsx           # 入口文件
│   ├── components/
│   │   └── ParagonCanvas.tsx  # Canvas渲染组件
│   └── data/
│       └── barbarianData.json  # 野蛮人巅峰盘数据
├── docs/
│   └── DESIGN.md          # 设计文档（本文档）
├── index.html             # HTML模板
├── package.json           # 项目配置
├── vite.config.ts         # Vite配置
└── tsconfig.json          # TypeScript配置
```

---

## 7. 部署方案

### 7.1 开发环境
```bash
cd modules/paragonnew
npm install
npm run dev
```

### 7.2 生产构建
```bash
cd modules/paragonnew
npm run build
```

### 7.3 输出产物
- `dist/index.html` - 入口HTML
- `dist/assets/*.css` - 样式文件
- `dist/assets/*.js` - JavaScript文件
