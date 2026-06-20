# 社区论坛 API 文档

## 概述

社区论坛提供以下核心函数接口，包含数据加载、帖子管理、筛选排序等功能。

---

## 目录

1. [Store方法](#store方法)
2. [数据服务](#数据服务)
3. [类型定义](#类型定义)

---

## Store方法

### 1. useBBSStore.loadPosts()

加载帖子数据。

**返回值**：Promise<void>

**说明**：
- 从JSON文件加载帖子数据
- 合并localStorage中的用户帖子
- 自动更新Store状态

```typescript
await useBBSStore.getState().loadPosts()
```

### 2. useBBSStore.loadMetadata()

加载元数据。

**返回值**：Promise<void>

```typescript
await useBBSStore.getState().loadMetadata()
```

### 3. useBBSStore.setFilters(filters)

设置筛选条件。

**参数**：
- `filters` - 筛选条件对象（部分）

```typescript
useBBSStore.getState().setFilters({
  type: 'guide',
  sortBy: 'hot',
  searchQuery: '野蛮人'
})
```

### 4. useBBSStore.setSelectedPost(post)

设置当前选中的帖子。

**参数**：
- `post` - 帖子对象或null

```typescript
useBBSStore.getState().setSelectedPost(post)
```

### 5. useBBSStore.createPost(postData)

创建新帖子。

**参数**：
- `postData` - 帖子数据（不含id、时间戳、统计）

**返回值**：boolean（成功返回true）

```typescript
const success = useBBSStore.getState().createPost({
  type: 'guide',
  title: '我的攻略',
  content: '攻略内容...',
  author: {
    id: 'user-1',
    name: '玩家',
    level: 10
  },
  status: 'published',
  isPinned: false,
  isHot: false
})
```

### 6. useBBSStore.likePost(postId)

点赞帖子。

**参数**：
- `postId` - 帖子ID

```typescript
useBBSStore.getState().likePost('post-001')
```

### 7. useBBSStore.getFilteredPosts()

获取筛选后的帖子列表。

**返回值**：Post[]

```typescript
const filteredPosts = useBBSStore.getState().getFilteredPosts()
```

---

## 数据服务

### 8. bbsService.loadPosts()

从JSON文件加载帖子数据。

**返回值**：Promise<Post[]>

```typescript
const posts = await bbsService.loadPosts()
```

### 9. bbsService.loadMetadata()

从JSON文件加载元数据。

**返回值**：Promise<Metadata>

```typescript
const metadata = await bbsService.loadMetadata()
```

### 10. bbsService.savePost(post)

保存帖子到localStorage。

**参数**：
- `post` - 帖子对象

**返回值**：boolean

```typescript
const success = bbsService.savePost(post)
```

### 11. bbsService.getLocalPosts()

获取本地存储的帖子。

**返回值**：Post[]

```typescript
const localPosts = bbsService.getLocalPosts()
```

### 12. bbsService.downloadPost(post)

下载帖子为JSON文件。

**参数**：
- `post` - 帖子对象

```typescript
bbsService.downloadPost(post)
```

---

## 类型定义

### Post

```typescript
interface Post {
  id: string
  type: PostType
  title: string
  content: string
  author: User
  images?: string[]
  tags?: string[]
  views: number
  likes: number
  comments: number
  status: PostStatus
  isPinned: boolean
  isHot: boolean
  createdAt: number
  updatedAt: number
}
```

### PostType

```typescript
type PostType = 'news' | 'guide' | 'help' | 'team' | 'trade' | 'discussion'
```

### User

```typescript
interface User {
  id: string
  name: string
  avatar?: string
  level: UserLevel
  badge?: string
}
```

### FilterState

```typescript
interface FilterState {
  type: PostType | 'all'
  sortBy: 'latest' | 'hot' | 'views'
  searchQuery: string
}
```

### Metadata

```typescript
interface Metadata {
  postTypes: { value: PostType; label: string; icon: string }[]
}
```
