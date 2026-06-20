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