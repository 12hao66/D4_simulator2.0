import type { Post, PostType } from '../types';
import { useBBSStore } from '../store/bbsStore';

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

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
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// 格式化数字
function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
}

function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const { likePost } = useBBSStore();

  const handleLike = () => {
    likePost(post.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1f] border border-[#2a2a30] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="p-5 border-b border-[#2a2a30]">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {/* 作者头像 */}
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#2a2a30] flex items-center justify-center text-d4-gold font-medium text-lg">
                  {post.author.name.charAt(0)}
                </div>
              )}

              <div>
                {/* 作者信息 */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base text-stone-100">{post.author.name}</span>
                  <span className="text-xs text-stone-500">Lv.{post.author.level}</span>
                  {post.author.badge && (
                    <span className="text-xs bg-d4-gold/20 text-d4-gold px-1.5 py-0.5 rounded">
                      {post.author.badge}
                    </span>
                  )}
                </div>

                {/* 发布时间 */}
                <div className="text-xs text-stone-500">{formatTime(post.createdAt)}</div>
              </div>
            </div>

            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2a2a30] hover:bg-[#3a3a40] transition-colors text-stone-400"
            >
              ✕
            </button>
          </div>

          {/* 标题 */}
          <h2 className="text-xl font-medium text-stone-100 mt-4">
            {post.isPinned && <span className="text-red-400 mr-1">[置顶]</span>}
            {post.isHot && <span className="text-orange-400 mr-1">[热门]</span>}
            {post.title}
          </h2>

          {/* 标签 */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded text-white ${postTypeConfig[post.type].color}`}>
              {postTypeConfig[post.type].label}
            </span>
            {post.tags?.map((tag, idx) => (
              <span key={idx} className="text-xs text-stone-400 bg-[#2a2a30] px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* 正文 */}
          <div className="text-stone-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {/* 图片 */}
          {post.images && post.images.length > 0 && (
            <div className="mt-4 space-y-3">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="p-4 border-t border-[#2a2a30] flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1">
              <span>👁</span>
              <span>{formatNumber(post.views)}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>💬</span>
              <span>{formatNumber(post.comments)}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 px-4 py-2 bg-[#2a2a30] border border-[#3a3a40] rounded-lg text-stone-300 hover:bg-[#3a3a40] transition-colors"
            >
              <span>👍</span>
              <span>{formatNumber(post.likes)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailModal;
