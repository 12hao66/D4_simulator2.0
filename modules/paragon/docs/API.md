# 巅峰盘模拟器 API 文档

## 概述

巅峰盘模拟器提供以下核心函数接口。

## 核心函数

### 1. ParagonSimulator.init()

初始化巅峰盘模拟器。

### 2. ParagonSimulator.selectNode(nodeId)

选择巅峰节点。

**参数**：
- `nodeId` - 节点ID

### 3. ParagonSimulator.deselectNode(nodeId)

取消选择巅峰节点。

**参数**：
- `nodeId` - 节点ID

### 4. ParagonSimulator.getSelectedNodes()

获取已选节点列表。

**返回值**：节点对象数组。

### 5. ParagonSimulator.calculateStats()

计算当前属性加成。

**返回值**：属性对象。

### 6. ParagonSimulator.getRemainingPoints()

获取剩余巅峰点数。

**返回值**：剩余点数。

### 7. ParagonSimulator.saveLayout(name)

保存巅峰盘布局。

**参数**：
- `name` - 布局名称

### 8. ParagonSimulator.loadLayout(id)

加载巅峰盘布局。

**参数**：
- `id` - 布局ID

## 数据文件格式（JSON）

巅峰盘使用 JSON 文件存储数据结构，分为**预设盘数据格式**和**用户配置格式**两种。

---

### 预设盘数据格式（public/data/*.json）

用于 `public/data/` 目录下的预设盘文件（如 `core.json`、`offensive.json`）。

#### 完整结构

```json
{
  "id": "core",
  "name": "核心",
  "nodes": [...],
  "connections": [...]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 盘的唯一标识符，如 `core`、`offensive`、`defensive` |
| `name` | string | 是 | 盘的显示名称，如 `核心`、`进攻盘`、`防守盘` |
| `nodes` | array | 是 | 节点数组 |
| `connections` | array | 否 | 连接关系数组（顶层定义） |

#### 节点结构

```json
{
  "id": "core-start",
  "type": "paragon",
  "x": 10,
  "y": 10,
  "effects": ["巅峰等级"],
  "isEntryPoint": true
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 节点唯一标识符 |
| `type` | string | 是 | 节点类型（见下方类型列表） |
| `x` | number | 是 | 列号（以中心为原点，64px/格） |
| `y` | number | 是 | 行号（以中心为原点，64px/格） |
| `effects` | array | 否 | 属性效果字符串数组 |
| `isEntryPoint` | boolean | 否 | 是否为入口点（用于连接其他盘） |

#### 节点类型（type）

| 类型值 | 说明 | 特点 |
|--------|------|------|
| `paragon` | 巅峰等级起始节点 | 每个盘的起点，通常是中心位置 |
| `normal` | 普通节点 | 最基础的节点类型 |
| `magic` | 魔法节点 | 属性比普通节点更高 |
| `rare` | 稀有节点 | 带条件加成属性 |
| `legendary` | 传奇节点 | 稀有属性，通常在盘边缘 |
| `socket` | 雕纹插槽 | 可插入雕纹的节点 |
| `link` | 链接关口 | 用于连接其他巅峰盘的入口 |

#### 连接关系（connections）

```json
"connections": [
  ["core-start", "core-path-1"],
  ["core-path-1", "core-path-2"]
]
```

- 格式：二维数组，每项是一对节点ID
- 说明：第一个ID为源节点，第二个ID为目标节点
- 作用：定义节点之间的连线关系，用于路径计算

#### 示例文件

```json
{
  "id": "core",
  "name": "核心",
  "nodes": [
    {
      "id": "core-start",
      "type": "paragon",
      "x": 10,
      "y": 10,
      "effects": ["巅峰等级"]
    },
    {
      "id": "core-path-1",
      "type": "normal",
      "x": 10,
      "y": 9,
      "effects": ["+2 力量"]
    },
    {
      "id": "core-link-top",
      "type": "link",
      "x": 10,
      "y": 0,
      "isEntryPoint": true
    }
  ],
  "connections": [
    ["core-start", "core-path-1"],
    ["core-path-1", "core-link-top"]
  ]
}
```

---

### 用户配置格式（导出/导入配置）

用户导出的完整配置格式，包含所有盘和解锁状态。

#### 完整结构

```json
{
  "version": "1.0",
  "boards": [...],
  "linkChain": {...},
  "unlockedNodes": [...],
  "activatedLinkPoints": [...],
  "totalPoints": 100,
  "spentPoints": 0
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `version` | string | 配置文件版本号 |
| `boards` | array | 盘数组 |
| `linkChain` | object | 链接链配置 |
| `unlockedNodes` | array | 已解锁的节点ID数组 |
| `activatedLinkPoints` | array | 已激活的链接点数组 |
| `totalPoints` | number | 总共可分配点数 |
| `spentPoints` | number | 已消耗点数 |

#### 盘结构（boards 中的项）

```json
{
  "id": "core",
  "name": "核心",
  "icon": "⚔️",
  "centerSlot": {
    "x": 0,
    "y": 0,
    "glyph": {
      "id": "glyph-1",
      "name": "战争之握"
    }
  },
  "nodes": [...],
  "entryPoints": ["core-link-top"]
}
```

#### 节点结构（用户配置中的节点）

```json
{
  "id": "core-start",
  "type": "paragon",
  "name": "核心",
  "icon": "⚔️",
  "x": 320,
  "y": 320,
  "effects": [
    { "id": "paragon-level", "name": "巅峰等级", "value": 0, "description": "巅峰等级" }
  ],
  "bonuses": [...],
  "connections": ["core-path-1"],
  "isEntryPoint": false,
  "description": ""
}
```

**注意**：用户配置中的节点使用**像素坐标**（x, y），而不是列/行号。

---

### 两种格式的区别

| 特性 | 预设盘数据格式 | 用户配置格式 |
|------|---------------|--------------|
| 用途 | 定义盘的初始结构 | 保存用户的完整状态 |
| x, y | 列/行号（如 10） | 像素坐标（如 320） |
| connections | 顶层数组 | 节点内部属性 |
| effects | 字符串数组 | 对象数组 |
| 包含状态 | 否 | 是（解锁状态、链接链等） |
| 放置位置 | `public/data/` | 用户手动导入 |

---

### 导出功能

应用提供两种导出格式：

1. **导出配置**（完整配置）
   - 包含所有盘、解锁状态、链接关系
   - 用于备份和恢复当前进度

2. **导出为数据文件格式**
   - 仅导出当前盘的节点和连接关系
   - 格式与预设盘数据一致
   - 可放入 `public/data/` 目录作为新的预设盘

## 数据结构

### 节点对象

```javascript
{
  id: 'string',           // 节点ID
  name: 'string',         // 节点名称
  type: 'offensive|defensive|utility', // 节点类型
  effects: array,         // 属性效果
  position: { x, y },     // 位置坐标
  connections: array      // 连接的节点
}
```

### 属性效果

```javascript
{
  attribute: 'string',    // 属性名称
  value: number,          // 属性值
  type: 'additive|multiplicative' // 加成类型
}
```