import { useEffect } from 'react';
import { useBBSStore } from '../store/bbsStore';
import type { Post, PostType } from '../types';
import PostDetailModal from './PostDetailModal';
import CreatePostModal from './CreatePostModal';

// 帖子类型配置
const postTypeConfig: Record<PostType, { label: string; icon: string; color: string }> = {
  news: { label: '资讯', icon: '📰', color: 'tag-news' },
  guide: { label: '攻略', icon: '📖', color: 'tag-guide' },
  help: { label: '求助', icon: '❓', color: 'tag-help' },
  team: { label: '组队', icon: '👥', color: 'tag-team' },
  trade: { label: '交易', icon: '💰', color: 'tag-trade' },
  discussion: { label: '讨论', icon: '💬', color: 'tag-discussion' }
};

// 格式化时间
function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 30) return `${days}天前`;
  
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 格式化数字
function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
}

function PostList() {
  const {
    metadata,
    filters,
    loading,
    selectedPost,
    loadPosts,
    loadMetadata,
    setFilters,
    setSelectedPost
  } = useBBSStore();

  useEffect(() => {
    loadPosts();
    loadMetadata();
  }, [loadPosts, loadMetadata]);

  const filteredPosts = useBBSStore(state => state.getFilteredPosts());

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-[#1a1a1f] border-b border-[#2a2a30]">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-cinzel text-d4-gold">暗黑4社区</h1>
            <CreatePostModal />
          </div>
        </div>
      </header>

      {/* 筛选栏 */}
      <div className="sticky top-[52px] z-30 bg-[#1a1a1f] border-b border-[#2a2a30]">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* 类型筛选 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilters({ type: 'all' })}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filters.type === 'all'
                    ? 'bg-d4-gold text-black'
                    : 'bg-[#2a2a30] text-stone-300 hover:bg-[#3a3a40]'
                }`}
              >
                全部
              </button>
              {metadata?.postTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setFilters({ type: type.value })}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                    filters.type === type.value
                      ? 'bg-d4-gold text-black'
                      : 'bg-[#2a2a30] text-stone-300 hover:bg-[#3a3a40]'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* 排序 */}
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ sortBy: e.target.value as 'latest' | 'hot' | 'views' })}
                className="bg-[#2a2a30] border border-[#3a3a40] rounded-lg px-3 py-1.5 text-sm text-stone-300 outline-none"
              >
                <option value="latest">最新发布</option>
                <option value="hot">最热门</option>
                <option value="views">最多浏览</option>
              </select>

              {/* 搜索框 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索帖子..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ searchQuery: e.target.value })}
                  className="bg-[#2a2a30] border border-[#3a3a40] rounded-lg pl-3 pr-8 py-1.5 text-sm text-stone-300 outline-none w-48 focus:border-d4-gold"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 帖子列表 */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-stone-500">加载中...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-stone-500">暂无帖子</div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-[#1a1a1f] border border-[#2a2a30] rounded-xl overflow-hidden cursor-pointer hover:border-[#3a3a40] transition-colors"
              >
                {/* 帖子头部 */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* 作者头像 */}
                    <div className="flex-shrink-0">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2a2a30] flex items-center justify-center text-d4-gold font-medium">
                          {post.author.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* 帖子内容 */}
                    <div className="flex-1 min-w-0">
                      {/* 作者信息 */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-stone-300">{post.author.name}</span>
                        <span className="text-xs text-stone-500">Lv.{post.author.level}</span>
                        {post.author.badge && (
                          <span className="text-xs bg-d4-gold/20 text-d4-gold px-1.5 py-0.5 rounded">
                            {post.author.badge}
                          </span>
                        )}
                      </div>

                      {/* 标题 */}
                      <h3 className="text-base text-stone-100 mb-2 line-clamp-2">
                        {post.isPinned && <span className="text-red-400 mr-1">[置顶]</span>}
                        {post.isHot && <span className="text-orange-400 mr-1">[热门]</span>}
                        {post.title}
                      </h3>

                      {/* 摘要 */}
                      <p className="text-sm text-stone-500 line-clamp-2 mb-2">
                        {post.content}
                      </p>

                      {/* 标签 */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded text-white ${postTypeConfig[post.type].color}`}>
                          {postTypeConfig[post.type].label}
                        </span>
                        {post.tags?.map((tag, idx) => (
                          <span key={idx} className="text-xs text-stone-500 bg-[#2a2a30] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 帖子图片 */}
                {post.images && post.images.length > 0 && (
                  <div className="px-4 pb-3">
                    <div className="grid grid-cols-3 gap-2">
                      {post.images.slice(0, 3).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt=""
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 帖子底部 */}
                <div className="px-4 py-3 border-t border-[#2a2a30] flex items-center justify-between">
                  <span className="text-xs text-stone-500">{formatTime(post.createdAt)}</span>
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <span>👁</span>
                      <span>{formatNumber(post.views)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>👍</span>
                      <span>{formatNumber(post.likes)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>💬</span>
                      <span>{formatNumber(post.comments)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 帖子详情弹窗 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default PostList;
