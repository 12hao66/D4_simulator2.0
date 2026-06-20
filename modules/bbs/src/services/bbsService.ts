import type { Post, Metadata } from '../types';

const DATA_BASE_URL = './data';

export const bbsService = {
  // 加载帖子列表
  async loadPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${DATA_BASE_URL}/posts.json`);
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  },

  // 加载元数据
  async loadMetadata(): Promise<Metadata> {
    try {
      const response = await fetch(`${DATA_BASE_URL}/metadata.json`);
      if (!response.ok) {
        throw new Error('Failed to load metadata');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading metadata:', error);
      return {
        postTypes: [
          { value: 'news', label: '资讯', icon: '📰' },
          { value: 'guide', label: '攻略', icon: '📖' },
          { value: 'help', label: '求助', icon: '❓' },
          { value: 'team', label: '组队', icon: '👥' },
          { value: 'trade', label: '交易', icon: '💰' },
          { value: 'discussion', label: '讨论', icon: '💬' }
        ]
      };
    }
  },

  // 保存帖子到localStorage
  savePost(post: Post): boolean {
    try {
      const storageKey = 'd4-bbs-posts';
      const existingData = localStorage.getItem(storageKey);
      const posts: Post[] = existingData ? JSON.parse(existingData) : [];
      
      const existingIndex = posts.findIndex(p => p.id === post.id);
      if (existingIndex >= 0) {
        posts[existingIndex] = post;
      } else {
        posts.unshift(post);
      }
      
      localStorage.setItem(storageKey, JSON.stringify(posts));
      return true;
    } catch (error) {
      console.error('Error saving post:', error);
      return false;
    }
  },

  // 获取本地帖子
  getLocalPosts(): Post[] {
    try {
      const storageKey = 'd4-bbs-posts';
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting local posts:', error);
      return [];
    }
  },

  // 导出帖子
  exportPost(post: Post): string {
    return JSON.stringify(post, null, 2);
  },

  // 下载帖子
  downloadPost(post: Post): void {
    const json = this.exportPost(post);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `post-${post.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
