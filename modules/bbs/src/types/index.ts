// 帖子类型
export type PostType = 'news' | 'guide' | 'help' | 'team' | 'trade' | 'discussion';

// 帖子状态
export type PostStatus = 'published' | 'draft' | 'hidden';

// 用户等级
export type UserLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

// 用户信息
export interface User {
  id: string;
  name: string;
  avatar?: string;
  level: UserLevel;
  badge?: string;
}

// 帖子
export interface Post {
  id: string;
  type: PostType;
  title: string;
  content: string;
  author: User;
  images?: string[];
  tags?: string[];
  views: number;
  likes: number;
  comments: number;
  status: PostStatus;
  isPinned: boolean;
  isHot: boolean;
  createdAt: number;
  updatedAt: number;
}

// 评论
export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  likes: number;
  replyTo?: string;
  createdAt: number;
}

// 筛选状态
export interface FilterState {
  type: PostType | 'all';
  sortBy: 'latest' | 'hot' | 'views';
  searchQuery: string;
}

// 元数据
export interface Metadata {
  postTypes: { value: PostType; label: string; icon: string }[];
}
