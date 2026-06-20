import { useState } from 'react';
import { useParagonStore } from '../store/paragonStore';

interface BoardExportImportProps {
  onClose: () => void;
}

export const BoardExportImport = ({ onClose }: BoardExportImportProps) => {
  const { exportFullConfig, importFullConfig, boards, linkChain } = useParagonStore();

  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');

  const handleExport = () => {
    const config = exportFullConfig();
    navigator.clipboard.writeText(config).then(() => {
      setMessage({ type: 'success', text: '配置已复制到剪贴板！' });
      setTimeout(() => setMessage(null), 3000);
    }).catch(() => {
      setMessage({ type: 'error', text: '复制失败，请手动复制' });
    });
  };

  const handleDownload = () => {
    const config = exportFullConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paragon-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMessage({ type: 'success', text: '配置文件已下载！' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImport = async () => {
    if (!importText.trim()) {
      setMessage({ type: 'error', text: '请输入配置内容' });
      return;
    }

    const success = await importFullConfig(importText);
    if (success) {
      setMessage({ type: 'success', text: '导入成功！' });
      setImportText('');
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1500);
    } else {
      setMessage({ type: 'error', text: '导入失败，配置格式不正确' });
    }
  };

  const handleLoadFromFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setImportText(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-diablo-panel border border-diablo-border rounded-xl w-[500px] overflow-hidden shadow-2xl">
      {/* 标题栏 */}
      <div className="px-6 py-4 border-b border-diablo-border bg-diablo-bg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-diablo-gold text-lg font-bold">导入/导出配置</h2>
            <p className="text-sm text-diablo-muted mt-1">
              当前: {boards.length}个盘 · {linkChain.connections.length}个链接
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-diablo-muted hover:text-diablo-gold text-2xl"
          >
            ×
          </button>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="flex border-b border-diablo-border">
        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 py-3 text-center transition-all ${
            activeTab === 'export'
              ? 'text-diablo-gold border-b-2 border-diablo-gold'
              : 'text-diablo-muted hover:text-diablo-gold'
          }`}
        >
          导出
        </button>
        <button
          onClick={() => setActiveTab('import')}
          className={`flex-1 py-3 text-center transition-all ${
            activeTab === 'import'
              ? 'text-diablo-gold border-b-2 border-diablo-gold'
              : 'text-diablo-muted hover:text-diablo-gold'
          }`}
        >
          导入
        </button>
      </div>

      {/* 内容区 */}
      <div className="p-6">
        {activeTab === 'export' ? (
          <div>
            <p className="text-sm text-diablo-muted mb-4">
              导出当前所有巅峰盘配置（包括链接关系、解锁状态、雕纹等）
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 py-3 px-4 rounded-lg bg-diablo-gold text-diablo-dark font-medium hover:bg-diablo-gold-hover transition-all flex items-center justify-center gap-2"
              >
                <span>📋</span> 复制到剪贴板
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-3 px-4 rounded-lg bg-diablo-bg border border-diablo-border text-diablo-gold font-medium hover:bg-diablo-hover transition-all flex items-center justify-center gap-2"
              >
                <span>💾</span> 下载文件
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-diablo-muted mb-4">
              粘贴之前导出的配置JSON来恢复巅峰盘状态
            </p>

            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="粘贴配置JSON..."
              className="w-full h-40 p-3 bg-diablo-bg border border-diablo-border rounded-lg text-diablo-gold text-sm resize-none focus:border-diablo-gold focus:outline-none"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleLoadFromFile}
                className="flex-1 py-3 px-4 rounded-lg bg-diablo-bg border border-diablo-border text-diablo-gold font-medium hover:bg-diablo-hover transition-all flex items-center justify-center gap-2"
              >
                <span>📁</span> 从文件加载
              </button>
              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  importText.trim()
                    ? 'bg-diablo-gold text-diablo-dark hover:bg-diablo-gold-hover'
                    : 'bg-diablo-border text-diablo-muted cursor-not-allowed'
                }`}
              >
                导入配置
              </button>
            </div>
          </div>
        )}

        {/* 消息提示 */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            message.type === 'success'
              ? 'bg-green-900 bg-opacity-30 text-green-400 border border-green-700'
              : 'bg-red-900 bg-opacity-30 text-red-400 border border-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};
