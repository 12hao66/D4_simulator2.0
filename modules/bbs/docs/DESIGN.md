# 社区论坛 设计文档

> Diablo IV BBS Design Document

## 1. 系统概述

### 1.1 项目目标
为暗黑破坏神4玩家提供一个社区交流平台，支持资讯发布、攻略分享、组队交流等功能。

### 1.2 核心特性
- **多种帖子类型**：资讯、攻略、求助、组队、交易、讨论
- **筛选排序**：按类型筛选、按热度/时间排序
- **搜索功能**：搜索帖子标题、内容、作者
- **发布帖子**：用户可以创建新帖子
- **点赞互动**：为喜欢的帖子点赞

### 1.3 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

---

## 2. 架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                       UI Layer                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │              PostList                             │   │
│  │  - 筛选栏（类型、排序、搜索）                      │   │
│  │  - 帖子卡片列表                                    │   │
│  │  - 发帖按钮                                        │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              PostDetailModal                      │   │
│  │  - 帖子完整内容                                    │   │
│  │  - 点赞功能                                        │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              CreatePostModal                      │   │
│  │  - 选择帖子类型                                    │   │
│  │  - 输入标题和内容                                  │   │
│  │  - 添加标签                                        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │           useBBSStore (Zustand)                   │   │
│  │  - posts: Post[]                                  │   │
│  │  - metadata: Metadata                             │   │
│  │  - filters: FilterState                           │   │
│  │  - selectedPost: Post | null                      │   │
│  │  - loading: boolean                               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │           bbsService                              │   │
│  │  - loadPosts()                                    │   │
│  │  - loadMetadata()                                 │   │
│  │  - savePost()                                     │   │
│  │  - getLocalPosts()                                │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │           JSON Files                              │   │
│  │  - public/data/posts.json                         │   │
│  │  - public/data/metadata.json                      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Storage Layer                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              localStorage                         │   │
│  │  Key: d4-bbs-posts                               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
modules/bbs/
├── public/
│   └── data/
│       ├── posts.json     # 帖子数据
│       └── metadata.json  # 元数据
├── src/
│   ├── types/              # 类型定义
│   │   └── index.ts
│   ├── store/              # 状态管理
│   │   └── bbsStore.ts
│   ├── services/           # 数据服务
│   │   └── bbsService.ts
│   ├── components/         # UI组件
│   │   ├── PostList.tsx
│   │   ├── PostDetailModal.tsx
│   │   └── CreatePostModal.tsx
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口
│   └── index.css           # 全局样式
├── docs/                   # 文档
│   ├── DESIGN.md           # 设计文档
│   ├── README.md           # 模块说明
│   ├── API.md              # API文档
│   └── CHANGELOG.md        # 更新日志
└── package.json
```

---

## 3. 数据模型设计

### 3.1 核心类型定义

#### 3.1.1 帖子数据
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

#### 3.1.2 帖子类型
```typescript
type PostType = 'news' | 'guide' | 'help' | 'team' | 'trade' | 'discussion'
```

#### 3.1.3 用户信息
```typescript
interface User {
  id: string                    // 用户ID
  name: string                  // 用户名
  avatar?: string               // 头像URL
  level: UserLevel              // 等级(1-20)
  badge?: string                // 徽章
}
```

#### 3.1.4 筛选状态
```typescript
interface FilterState {
  type: PostType | 'all'        // 帖子类型
  sortBy: 'latest' | 'hot' | 'views' // 排序方式
  searchQuery: string           // 搜索关键词
}
```

### 3.2 数据流设计

#### 3.2.1 数据加载流程
```
应用启动
    ↓
bbsService.loadPosts()
    ↓
合并JSON数据 + localStorage数据
    ↓
更新 Store (setPosts)
    ↓
渲染帖子列表
```

#### 3.2.2 发帖流程
```
用户填写表单
    ↓
createPost(postData)
    ↓
生成帖子ID和时间戳
    ↓
保存到localStorage
    ↓
更新Store (posts数组)
    ↓
渲染新帖子
```

---

## 4. 组件设计

### 4.1 PostList 组件

**职责**：
- 展示帖子列表
- 提供筛选和排序功能
- 处理搜索

**状态**：
```typescript
const {
  metadata,
  filters,
  loading,
  selectedPost,
  loadPosts,
  loadMetadata,
  setFilters,
  setSelectedPost
} = useBBSStore()
```

### 4.2 PostDetailModal 组件

**职责**：
- 展示帖子完整内容
- 提供点赞功能

### 4.3 CreatePostModal 组件

**职责**：
- 提供发帖表单
- 选择帖子类型
- 输入标题、内容、标签

---

## 5. UI设计规范

### 5.1 帖子类型颜色

| 类型 | 颜色 | CSS类 |
|------|------|-------|
| 资讯 | 蓝色 | tag-news |
| 攻略 | 绿色 | tag-guide |
| 求助 | 橙色 | tag-help |
| 组队 | 紫色 | tag-team |
| 交易 | 金色 | tag-trade |
| 讨论 | 灰色 | tag-discussion |

### 5.2 暗黑风格主题

```css
/* 主色调 */
--d4-dark: #0a0a0f;
--d4-panel: #1a1a1f;
--d4-border: #2a2a30;
--d4-gold: #c9a962;
```

---

## 6. 数据维护

### 6.1 JSON文件结构

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

### 6.2 数据更新流程

```
编辑 JSON 文件
    ↓
保存文件
    ↓
刷新页面
    ↓
自动加载最新数据
```

---

## 7. 版本规划

### v1.0.0 (当前)
- ✅ 帖子浏览功能
- ✅ 筛选排序功能
- ✅ 发帖功能
- ✅ 点赞功能
- ✅ JSON数据源

### v1.1.0 (计划)
- 评论功能
- 用户系统
- 图片上传

### v2.0.0 (未来)
- API数据源
- 实时通知
- 私信功能

---

## 8. 参考文档

- [README.md](./README.md) - 模块说明
- [API.md](./API.md) - API文档
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志
