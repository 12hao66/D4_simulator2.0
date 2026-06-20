import { useState } from 'react';
import { useBBSStore } from '../store/bbsStore';
import type { PostType } from '../types';

// 帖子类型配置
const postTypeOptions: { value: PostType; label: string; icon: string }[] = [
  { value: 'news', label: '资讯', icon: '📰' },
  { value: 'guide', label: '攻略', icon: '📖' },
  { value: 'help', label: '求助', icon: '❓' },
  { value: 'team', label: '组队', icon: '👥' },
  { value: 'trade', label: '交易', icon: '💰' },
  { value: 'discussion', label: '讨论', icon: '💬' }
];

function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<PostType>('discussion');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { createPost } = useBBSStore();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setStatus('error');
      return;
    }

    const success = createPost({
      type,
      title: title.trim(),
      content: content.trim(),
      author: {
        id: 'user-1',
        name: '匿名玩家',
        level: 1
      },
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      status: 'published',
      isPinned: false,
      isHot: false
    });

    if (success) {
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setTitle('');
        setContent('');
        setTags('');
        setType('discussion');
        setStatus('idle');
      }, 1000);
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      {/* 发帖按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-d4-gold text-black rounded-lg font-medium hover:bg-d4-gold/80 transition-colors"
      >
        发布帖子
      </button>

      {/* 发帖弹窗 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#1a1a1f] border border-[#2a2a30] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="p-5 border-b border-[#2a2a30] flex items-center justify-between">
              <h2 className="text-lg font-medium text-stone-100">发布新帖子</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2a2a30] hover:bg-[#3a3a40] transition-colors text-stone-400"
              >
                ✕
              </button>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* 帖子类型 */}
              <div>
                <label className="block text-sm text-stone-400 mb-2">帖子类型</label>
                <div className="flex flex-wrap gap-2">
                  {postTypeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setType(option.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                        type === option.value
                          ? 'bg-d4-gold text-black'
                          : 'bg-[#2a2a30] text-stone-300 hover:bg-[#3a3a40]'
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 标题 */}
              <div>
                <label className="block text-sm text-stone-400 mb-2">标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入帖子标题..."
                  className="w-full bg-[#2a2a30] border border-[#3a3a40] rounded-lg px-4 py-2 text-stone-300 outline-none focus:border-d4-gold"
                />
              </div>

              {/* 内容 */}
              <div>
                <label className="block text-sm text-stone-400 mb-2">内容</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请输入帖子内容..."
                  rows={8}
                  className="w-full bg-[#2a2a30] border border-[#3a3a40] rounded-lg px-4 py-2 text-stone-300 outline-none focus:border-d4-gold resize-none"
                />
              </div>

              {/* 标签 */}
              <div>
                <label className="block text-sm text-stone-400 mb-2">标签（可选，用逗号分隔）</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="例如：野蛮人, 旋风斩, 攻略"
                  className="w-full bg-[#2a2a30] border border-[#3a3a40] rounded-lg px-4 py-2 text-stone-300 outline-none focus:border-d4-gold"
                />
              </div>

              {/* 状态提示 */}
              {status === 'success' && (
                <div className="text-green-400 text-sm">发布成功！</div>
              )}
              {status === 'error' && (
                <div className="text-red-400 text-sm">发布失败，请检查标题和内容是否填写。</div>
              )}
            </div>

            {/* 底部 */}
            <div className="p-4 border-t border-[#2a2a30] flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#2a2a30] border border-[#3a3a40] rounded-lg text-stone-300 hover:bg-[#3a3a40] transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-d4-gold text-black rounded-lg font-medium hover:bg-d4-gold/80 transition-colors"
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePostModal;
