import { create } from 'zustand';
import type { Post, FilterState, Metadata } from '../types';
import { bbsService } from '../services/bbsService';

interface BBSState {
  posts: Post[];
  metadata: Metadata | null;
  filters: FilterState;
  selectedPost: Post | null;
  loading: boolean;
  
  // Actions
  loadPosts: () => Promise<void>;
  loadMetadata: () => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  setSelectedPost: (post: Post | null) => void;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'comments'>) => boolean;
  likePost: (postId: string) => void;
  getFilteredPosts: () => Post[];
}

export const useBBSStore = create<BBSState>((set, get) => ({
  posts: [],
  metadata: null,
  filters: {
    type: 'all',
    sortBy: 'latest',
    searchQuery: ''
  },
  selectedPost: null,
  loading: false,

  loadPosts: async () => {
    set({ loading: true });
    try {
      // 先从JSON加载
      const jsonPosts = await bbsService.loadPosts();
      // 再从localStorage加载用户创建的帖子
      const localPosts = bbsService.getLocalPosts();
      // 合并，本地帖子优先
      const allPosts = [...localPosts, ...jsonPosts.filter(jp => !localPosts.find(lp => lp.id === jp.id))];
      set({ posts: allPosts, loading: false });
    } catch (error) {
      console.error('Error loading posts:', error);
      set({ loading: false });
    }
  },

  loadMetadata: async () => {
    try {
      const metadata = await bbsService.loadMetadata();
      set({ metadata });
    } catch (error) {
      console.error('Error loading metadata:', error);
    }
  },

  setFilters: (filters) => {
    set(state => ({
      filters: { ...state.filters, ...filters }
    }));
  },

  setSelectedPost: (post) => {
    set({ selectedPost: post });
  },

  createPost: (postData) => {
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      views: 0,
      likes: 0,
      comments: 0
    };

    const success = bbsService.savePost(newPost);
    if (success) {
      set(state => ({
        posts: [newPost, ...state.posts]
      }));
      return true;
    }
    return false;
  },

  likePost: (postId) => {
    set(state => ({
      posts: state.posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    }));
  },

  getFilteredPosts: () => {
    const { posts, filters } = get();
    let filtered = [...posts];

    // 类型筛选
    if (filters.type !== 'all') {
      filtered = filtered.filter(post => post.type === filters.type);
    }

    // 搜索
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    // 排序
    switch (filters.sortBy) {
      case 'hot':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    return filtered;
  }
}));
