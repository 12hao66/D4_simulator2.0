# 技能模拟器

> Diablo IV Skills Simulator

模拟暗黑4角色技能选择与组合的工具，支持全职业技能树可视化和自定义编辑。

## 🎯 功能特性

### 核心功能
- **技能树展示**：全职业技能树可视化展示（Canvas渲染）
- **技能选择**：选择和取消技能节点
- **技能组合**：预览技能搭配效果
- **技能倍率**：查看技能伤害系数和冷却时间
- **被动技能**：支持被动技能选择和效果叠加

### 编辑模式
- **节点拖拽**：编辑模式下自由拖拽移动技能节点位置
- **虚拟网格线**：编辑模式显示网格辅助线，方便节点对齐
- **节点管理**：添加、删除、修改技能节点属性
- **画布操作**：支持画布平移和缩放（与巅峰盘模拟器一致）
- **配置导出**：导出完整技能树配置为JSON格式

### 职业系统
- **全职业支持**：野蛮人、德鲁伊、死灵法师、圣骑士、游侠、法师、灵巫、术士
- **职业专属技能**：每个职业独特的技能树
- **技能分类**：核心技能、基础技能、防御技能、攻击技能、终极技能

### 技能类型
| 类型 | 标识 | 说明 |
|------|------|------|
| active | 主动技能 | 需要手动释放的技能 |
| passive | 被动技能 | 持续生效的被动效果 |
| ultimate | 终极技能 | 强力技能，有冷却时间 |
| core | 核心技能 | 主要输出技能 |

### 技能界面
- **技能树布局**：层级式技能树结构，核心节点垂直排列
- **技能预览**：悬停查看技能详情
- **技能路径**：显示技能解锁路径和前置需求
- **点数分配**：技能点数管理

### 数据管理
- **Build保存**：保存和加载技能配置
- **数据导出**：导出技能配置JSON
- **LocalStorage**：自动保存用户配置

## 📁 文件结构

```
modules/skills/
├── dist/                    # 构建输出目录
├── src/                     # 源代码目录
│   ├── components/          # React组件
│   │   ├── SkillTree.tsx        # 技能树渲染组件
│   │   ├── SkillPanel.tsx        # 技能面板组件
│   │   ├── SkillNode.tsx         # 技能节点组件
│   │   └── ClassSelector.tsx     # 职业选择器组件
│   ├── data/                # 数据层
│   │   └── skills.ts             # 技能数据定义
│   ├── store/               # 状态管理
│   │   └── skillStore.ts         # Zustand状态管理
│   ├── types/               # TypeScript类型定义
│   │   └── index.ts              # 类型接口定义
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── docs/                    # 文档目录
│   ├── README.md            # 模块说明
│   ├── API.md               # 接口文档
│   ├── CHANGELOG.md         # 更新日志
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
cd modules/skills
npm install
npm run dev
```

### 生产构建
```bash
cd modules/skills
npm run build
```

### 访问地址
- 开发服务器：http://localhost:5175/dist/skills/
- 生产环境：dist/modules/skills/index.html

## 🎮 使用说明

### 基础操作
1. **选择职业**：点击顶部职业选择器切换职业
2. **选择技能**：点击技能树中的技能节点
3. **查看效果**：右侧面板显示已选技能和属性加成
4. **取消选择**：再次点击已选技能取消

### 技能树导航
- **缩放**：鼠标滚轮缩放技能树
- **拖拽**：拖拽画布移动视图
- **重置**：点击重置按钮恢复默认视图

### Build管理
1. **保存Build**：点击保存按钮保存当前配置
2. **加载Build**：选择已保存的Build加载
3. **导出配置**：导出技能配置JSON

## 🛠️ 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 18.x |
| 语言 | TypeScript | 5.x |
| 构建工具 | Vite | 5.x |
| 状态管理 | Zustand | 4.x |
| 样式 | TailwindCSS | 3.x |
| 渲染 | SVG | - |
| 数据持久化 | LocalStorage | - |

## 📊 数据结构

### Skill（技能）
```typescript
interface Skill {
  id: string;                    // 技能唯一标识
  name: string;                  // 技能名称
  icon: string;                  // 图标（Emoji或图片路径）
  image?: string;                // 图片URL（可选）
  type: 'active' | 'passive' | 'ultimate' | 'core';
  category: string;              // 技能分类（核心、基础、防御等）
  damage?: number;               // 伤害值
  damageType?: string;           // 伤害类型（物理、火焰、冰霜等）
  cooldown?: number;             // 冷却时间（秒）
  manaCost?: number;             // 魔力消耗
  requirements: string[];        // 前置技能需求
  description: string;           // 技能描述
  effects: SkillEffect[];        // 技能效果列表
  ranks: SkillRank[];            // 技能等级列表
}
```

### SkillEffect（技能效果）
```typescript
interface SkillEffect {
  id: string;           // 效果ID
  name: string;         // 效果名称
  description: string;  // 效果描述
  value: number;        // 效果数值
  unit: string;         // 单位
}
```

### SkillRank（技能等级）
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

### SkillTree（技能树）
```typescript
interface SkillTree {
  classId: string;      // 职业ID
  className: string;    // 职业名称
  icon: string;         // 职业图标
  categories: SkillCategory[];  // 技能分类列表
}
```

### SkillCategory（技能分类）
```typescript
interface SkillCategory {
  id: string;           // 分类ID
  name: string;         // 分类名称
  skills: Skill[];      // 技能列表
  position: {           // 在技能树中的位置
    x: number;
    y: number;
  };
}
```

## 🎨 设计规范

### 颜色方案
- **背景色**：#0a0a0f（暗黑风格背景）
- **面板色**：#1a1a2e（面板背景）
- **金色**：#c9a962（主要强调色）
- **技能图标背景**：#2a2a3e（技能节点背景）

### 布局规范
- **技能节点尺寸**：60px x 60px
- **节点间距**：80px
- **分类间距**：120px

## 🔧 API

### Store Actions
| 方法 | 说明 | 参数 |
|------|------|------|
| selectSkill | 选择技能 | skillId: string |
| deselectSkill | 取消技能 | skillId: string |
| toggleSkill | 切换技能选择状态 | skillId: string |
| selectClass | 切换职业 | classId: string |
| setSkillPoints | 设置技能点数 | points: number |
| resetSkills | 重置所有技能 | 无 |
| saveBuild | 保存Build | name: string |
| loadBuild | 加载Build | name: string |
| exportBuild | 导出Build配置 | 无 |
| toggleEditMode | 切换编辑模式 | 无 |
| addSkillNode | 添加技能节点 | nodeData: Omit<SkillNode, 'id'> |
| updateSkillNode | 更新技能节点 | nodeId: string, updates: Partial<SkillNode> |
| deleteSkillNode | 删除技能节点 | nodeId: string |

## 📝 配置维护

### 添加新职业
1. 在 `data/skills.ts` 中添加职业配置
2. 定义职业的技能分类和技能列表
3. 配置技能的前置需求和效果
4. 构建并部署

### 添加新技能
1. 在对应职业的技能列表中添加技能配置
2. 定义技能属性（伤害、冷却、效果等）
3. 配置技能等级和加成
4. 更新技能图标

## 📄 许可证

MIT License
