# 巅峰盘模拟器

> Diablo IV Paragon Simulator

模拟暗黑4角色巅峰节点规划的工具，支持可视化编辑和配置导出。

## 🎯 功能特性

### 核心功能
- **21×21网格系统**：固定网格布局，节点紧密排列（672px × 672px）
- **节点解锁机制**：从入口点开始，只能解锁相邻节点（上下左右）
- **路径高亮**：自动计算并高亮显示从入口到已解锁节点的路径
- **可点击节点提示**：绿色虚线圆环高亮显示可解锁的节点
- **属性计算**：实时计算力量、敏捷、智力、意志等属性加成
- **点数管理**：巅峰点数分配与消耗管理

### 多巅峰盘系统
- **核心盘**：初始巅峰盘，包含巅峰等级起始节点，每个职业必备
- **可选盘**：从9个可选巅峰盘中选择4个搭配
- **入口/链接节点**：支持巅峰盘之间的连接

### 节点类型
| 类型 | 标识 | 说明 |
|------|------|------|
| normal | 金色圆形 | 基础属性加成 |
| rare | 蓝色圆形+◆ | 条件加成效果 |
| legendary | 橙色圆形+★ | 独特被动效果 |
| empty | 虚线圆 | 预留扩展位置 |
| link | 金色圆形 | 面板间连接入口 |
| paragon | 皇冠图标 | 巅峰等级起始节点 |

### 雕纹系统
- **雕纹槽**：每个巅峰盘中心位置的雕纹插槽
- **雕纹效果**：不同雕纹提供不同范围加成
- **影响范围**：雕纹效果覆盖周边节点

### 可视化编辑器
- **编辑模式**：一键切换编辑/浏览模式
- **节点拖拽**：画布上直接拖拽调整节点位置
- **网格吸附**：自动对齐32px网格
- **网格辅助线**：编辑模式下显示21×21网格线
- **属性编辑**：实时修改节点类型、名称、图标
- **配置导出**：一键导出JSON配置数据

## 📁 文件结构

```
modules/paragon/
├── dist/                    # 构建输出目录
├── src/                     # 源代码目录
│   ├── components/          # React组件
│   │   ├── ParagonCanvas.tsx    # 画布渲染组件
│   │   ├── ParagonPanel.tsx     # 信息面板组件
│   │   └── EditorPanel.tsx      # 编辑器面板组件
│   ├── data/                # 数据层
│   │   └── paragon.ts           # 巅峰盘数据定义
│   ├── store/               # 状态管理
│   │   └── paragonStore.ts      # Zustand状态管理
│   ├── types/               # TypeScript类型定义
│   │   └── index.ts             # 类型接口定义
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── docs/                    # 文档目录
│   ├── README.md            # 模块说明
│   ├── API.md               # 接口文档
│   ├── CHANGELOG.md         # 更新日志
│   ├── DESIGN.md            # 设计文档
│   └── USAGE.md             # 使用指南
├── index.html               # HTML模板
├── package.json             # 项目配置
├── vite.config.ts           # Vite配置
├── tailwind.config.js       # TailwindCSS配置
└── tsconfig.json            # TypeScript配置
```

## 🚀 快速开始

### 开发环境
```bash
cd modules/paragon
npm install
npm run dev
```

### 生产构建
```bash
cd modules/paragon
npm run build
```

### 访问地址
- 开发服务器：http://localhost:5175/dist/paragon/
- 生产环境：dist/modules/paragon/index.html

## 🎮 使用说明

### 浏览模式
1. **选择巅峰盘**：点击左侧面板的巅峰盘按钮切换
2. **解锁节点**：点击画布上的可点击节点（绿色虚线圆环标记）
3. **查看属性**：右侧面板显示属性汇总和节点详情
4. **装备雕纹**：从雕纹列表中选择雕纹装备到中心槽
5. **取消解锁**：再次点击已解锁的节点

### 编辑模式
1. **进入编辑**：点击顶部"编辑模式"按钮
2. **拖拽节点**：直接拖拽节点调整位置（自动吸附32px网格）
3. **查看网格**：编辑模式下自动显示21×21网格辅助线
4. **添加节点**：点击"添加节点"按钮或右键菜单
5. **编辑属性**：选中节点后在右侧面板修改属性
6. **导出配置**：点击"导出配置"复制JSON数据

## 🔗 相邻解锁规则
- **入口点**：可以直接解锁（顶部入口、底部链接、巅峰起始节点）
- **普通节点**：必须与已解锁节点**上下左右相邻**才能解锁
- **对角线**：对角线相邻不算有效连接
- **取消解锁**：已解锁节点可以取消，会影响后续节点的可用性

## 🛠️ 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 18.x |
| 语言 | TypeScript | 5.x |
| 构建工具 | Vite | 5.x |
| 状态管理 | Zustand | 4.x |
| 样式 | TailwindCSS | 3.x |
| 渲染 | Canvas 2D | - |
| 数据持久化 | LocalStorage | - |

## 📊 数据结构

### ParagonNode（节点）
```typescript
interface ParagonNode {
  id: string;                    // 节点唯一标识
  type: 'normal' | 'rare' | 'legendary' | 'empty' | 'link' | 'paragon';
  name: string;                  // 节点名称
  icon: string;                  // 图标（Emoji）
  image?: string;                // 图片URL（可选）
  x: number;                     // X坐标
  y: number;                     // Y坐标
  effects: ParagonEffect[];      // 属性效果列表
  bonuses?: ParagonBonus[];      // 条件加成（稀有/传奇节点）
  connections: string[];         // 连接的节点ID列表
  isEntryPoint?: boolean;        // 是否为入口点
  description?: string;          // 节点描述
}
```

### ParagonEffect（效果）
```typescript
interface ParagonEffect {
  id: string;           // 效果ID
  name: string;         // 效果名称
  description: string;  // 效果描述
  value: number;        // 效果数值
  unit: string;         // 单位（如"%", "点"）
}
```

### ParagonBonus（条件加成）
```typescript
interface ParagonBonus {
  condition: string;      // 条件描述
  description: string;    // 加成描述
  currentValue: number;   // 当前值
  requiredValue: number;  // 需求值
  bonusEffect: string;    // 加成效果
}
```

### ParagonBoard（巅峰盘）
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

## 🎨 设计规范

### 颜色方案
- **背景色**：#0a0a0f（暗黑风格背景）
- **面板色**：#1a1a2e（面板背景）
- **金色**：#c9a962（主要强调色）
- **稀有蓝**：#0070dd（稀有节点）
- **传奇橙**：#ff8c00（传奇节点）
- **可点击高亮**：rgba(0, 255, 136, 0.6)（绿色虚线圆环）

### 节点尺寸
- **标准节点**：32px 直径
- **网格间距**：32px（紧密排列）
- **大正方形边框**：672px × 672px

## 🔧 API

### Store Actions
| 方法 | 说明 | 参数 |
|------|------|------|
| selectNode | 选择节点 | nodeId: string \| null |
| toggleNode | 切换节点解锁状态 | nodeId: string |
| setZoom | 设置缩放比例 | zoom: number |
| setPosition | 设置画布位置 | position: {x, y} |
| switchBoard | 切换当前巅峰盘 | index: number |
| selectBoard | 添加巅峰盘 | board: ParagonBoard |
| deselectBoard | 移除巅峰盘 | boardIndex: number |
| equipGlyph | 装备雕纹 | glyph: Glyph |
| setEditMode | 设置编辑模式 | mode: boolean |
| updateNodePosition | 更新节点位置 | nodeId, x, y |
| addNode | 添加节点 | nodeData |
| deleteNode | 删除节点 | nodeId: string |
| exportBoardConfig | 导出配置 | 无 |

## 📝 配置维护

### 添加新巅峰盘
1. 在 `data/paragon.ts` 的 `boardDefinitions` 数组中添加新配置
2. 定义节点位置（使用col/row坐标）
3. 配置节点类型、效果和连接关系
4. 导出配置并复制到生产环境

### 编辑现有巅峰盘
1. 进入编辑模式
2. 调整节点位置和属性
3. 导出配置
4. 复制导出的JSON到 `boardDefinitions` 数组

## 📄 许可证

MIT License