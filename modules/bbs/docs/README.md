# 社区论坛

> Diablo IV BBS

暗黑破坏神4社区论坛，支持资讯发布、玩家攻略分享和交流讨论。

## 🎯 功能特性

### 帖子类型
- **资讯** 📰 - 游戏新闻、更新公告
- **攻略** 📖 - 玩家分享的BD攻略、技巧
- **求助** ❓ - 新手提问、游戏疑问
- **组队** 👥 - 寻找队友、组队邀请
- **交易** 💰 - 装备交易、物品交换
- **讨论** 💬 - 游戏讨论、职业交流

### 核心功能
- **帖子浏览** - 查看各类帖子内容
- **筛选排序** - 按类型筛选、按热度/时间排序
- **搜索功能** - 搜索帖子标题、内容、作者
- **发布帖子** - 创建新帖子分享内容
- **点赞互动** - 为喜欢的帖子点赞

### 数据管理
- **JSON数据源** - 帖子数据从JSON文件加载
- **本地存储** - 用户发布的帖子保存到localStorage
- **数据合并** - 自动合并JSON数据和本地数据

## 📁 文件结构

```
modules/bbs/
├── index.html              # 入口HTML
├── package.json            # 依赖配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.js      # Tailwind CSS配置
├── postcss.config.js       # PostCSS配置
├── public/
│   └── data/
│       ├── posts.json      # 帖子数据
│       └── metadata.json   # 元数据
├── src/
│   ├── main.tsx           # React入口
│   ├── App.tsx            # 主应用组件
│   ├── index.css          # 全局样式
│   ├── types/
│   │   └── index.ts       # 类型定义
│   ├── store/
│   │   └── bbsStore.ts    # 状态管理
│   ├── services/
│   │   └── bbsService.ts  # 数据服务
│   └── components/
│       ├── PostList.tsx       # 帖子列表
│       ├── PostDetailModal.tsx # 帖子详情弹窗
│       └── CreatePostModal.tsx # 发帖弹窗
└── docs/                   # 文档目录
    ├── README.md           # 模块说明
    ├── DESIGN.md           # 设计文档
    ├── API.md              # API文档
    └── CHANGELOG.md        # 更新日志
```

## 🚀 快速开始

```bash
# 进入模块目录
cd modules/bbs

# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:5175

# 生产构建
npm run build
# 产物输出到 dist/ 目录
```

## 📊 数据模型

### 帖子数据
```typescript
interface Post {
  id: string                    // 帖子唯一标识
  type: PostType                // 帖子类型
  title: string                 // 标题
  content: string               // 内容
  author: User                  // 作者信息
  images?: string[]             // 图片列表
  tags?: string[]               // 标签
  views: number                 // 浏览量
  likes: number                 // 点赞数
  comments: number              // 评论数
  status: PostStatus            // 状态
  isPinned: boolean             // 是否置顶
  isHot: boolean                // 是否热门
  createdAt: number             // 创建时间
  updatedAt: number             // 更新时间
}
```

### 用户信息
```typescript
interface User {
  id: string                    // 用户ID
  name: string                  // 用户名
  avatar?: string               // 头像URL
  level: UserLevel              // 等级(1-20)
  badge?: string                // 徽章
}
```

### 帖子类型
```typescript
type PostType = 'news' | 'guide' | 'help' | 'team' | 'trade' | 'discussion'
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

## 🎨 UI特性

### 帖子类型颜色
| 类型 | 颜色 | 说明 |
|------|------|------|
| 资讯 | 蓝色 | 官方新闻、更新公告 |
| 攻略 | 绿色 | 玩家攻略、技巧分享 |
| 求助 | 橙色 | 新手提问、游戏疑问 |
| 组队 | 紫色 | 寻找队友、组队邀请 |
| 交易 | 金色 | 装备交易、物品交换 |
| 讨论 | 灰色 | 游戏讨论、职业交流 |

### 暗黑风格设计
- 深色背景 (#0a0a0f)
- 金色主题色 (#c9a962)
- 卡片式布局
- 响应式设计

## 💾 数据维护

### JSON文件结构

**posts.json**
```json
[
  {
    "id": "post-001",
    "type": "news",
    "title": "S8赛季更新公告",
    "content": "更新内容...",
    "author": {
      "id": "admin",
      "name": "官方公告",
      "level": 20,
      "badge": "官方"
    },
    "views": 12580,
    "likes": 356,
    "comments": 89,
    "status": "published",
    "isPinned": true,
    "isHot": true,
    "createdAt": 1718668800000,
    "updatedAt": 1718668800000
  }
]
```

### 数据更新流程
1. 编辑 `public/data/posts.json` 文件
2. 刷新页面自动加载最新数据
3. 无需重新构建项目

## 📱 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | ≥ 90 | ✅ 支持 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 15 | ✅ 支持 |
| Edge | ≥ 90 | ✅ 支持 |

## 🔗 相关模块

- [装备模拟器](../equipment) - 装备搭配模拟工具
- [构筑浏览器](../build) - 构筑方案浏览
- [数据库管理](../database) - 游戏数据管理

## 📖 文档

- [设计文档](./DESIGN.md) - 详细设计说明
- [API文档](./API.md) - 接口文档
- [更新日志](./CHANGELOG.md) - 版本更新记录
