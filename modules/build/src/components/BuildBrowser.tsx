import { useState, useEffect } from 'react';
import { useBuildStore } from '../store/buildStore';
import type { Build } from '../types';
import BuildDetailModal from './BuildDetailModal';

function BuildBrowser() {
  const { 
    builds, 
    seasons, 
    classes, 
    filters, 
    isLoading, 
    loadInitialData, 
    setFilters,
    exportAll,
    exportBuild
  } = useBuildStore();
  
  const [selectedBuild, setSelectedBuild] = useState<Build | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleBuildClick = (build: Build) => {
    setSelectedBuild(build);
    setShowDetail(true);
  };

  const handleExportAll = () => {
    exportAll();
  };

  const handleExportSingle = () => {
    if (selectedBuild) {
      exportBuild(selectedBuild);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN');
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-gray-100">
      {/* 头部筛选区域 */}
      <div className="sticky top-0 z-20 bg-stone-950/95 backdrop-blur-sm border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* 标题 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚔️</span>
              <h1 className="text-xl font-semibold text-stone-100">构筑浏览器</h1>
              <span className="text-xs text-stone-500 bg-stone-800/50 px-2 py-1 rounded">
                {builds.length} 个构筑
              </span>
            </div>
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg font-medium transition-all flex items-center gap-2 text-stone-300 hover:bg-stone-700 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>导出全部</span>
            </button>
          </div>

          {/* 筛选器 */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 赛季选择 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">赛季:</span>
              <select
                value={filters.season}
                onChange={(e) => setFilters({ season: e.target.value })}
                className="bg-stone-800 border border-stone-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-stone-600"
              >
                {seasons.map(season => (
                  <option key={season.id} value={season.id}>
                    {season.displayName}
                    {season.isActive && ' 🔥'}
                  </option>
                ))}
              </select>
            </div>

            {/* 职业选择 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">职业:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setFilters({ characterClass: 'all' })}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filters.characterClass === 'all'
                      ? 'bg-stone-700 text-stone-100 border border-stone-600'
                      : 'bg-stone-800/50 text-stone-400 hover:bg-stone-700/50 border border-transparent'
                  }`}
                >
                  全部
                </button>
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => setFilters({ characterClass: cls.id })}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1 ${
                      filters.characterClass === cls.id
                        ? 'bg-stone-700 text-stone-100 border border-stone-600'
                        : 'bg-stone-800/50 text-stone-400 hover:bg-stone-700/50 border border-transparent'
                    }`}
                  >
                    <span>{cls.icon}</span>
                    <span className="hidden sm:inline">{cls.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 排序 */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-stone-500">排序:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ sortBy: e.target.value as any })}
                className="bg-stone-800 border border-stone-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-stone-600"
              >
                <option value="default">默认</option>
                <option value="popular">最多点赞</option>
                <option value="latest">最新发布</option>
                <option value="rating">最高评分</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 构筑列表 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-500"></div>
          </div>
        ) : builds.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-stone-500">暂无构筑数据</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {builds.map(build => {
              // 职业颜色映射 - 鲜艳配色
              const classColors: Record<string, { bg: string; border: string; accent: string; tagBg: string }> = {
                barbarian: { bg: 'from-red-900/50 to-stone-900', border: 'border-red-600/40 hover:border-red-500', accent: 'text-red-400', tagBg: 'bg-red-900/30' },
                necromancer: { bg: 'from-cyan-900/50 to-stone-900', border: 'border-cyan-600/40 hover:border-cyan-500', accent: 'text-cyan-400', tagBg: 'bg-cyan-900/30' },
                sorc: { bg: 'from-blue-900/50 to-stone-900', border: 'border-blue-600/40 hover:border-blue-500', accent: 'text-blue-400', tagBg: 'bg-blue-900/30' },
                wizard: { bg: 'from-purple-900/50 to-stone-900', border: 'border-purple-600/40 hover:border-purple-500', accent: 'text-purple-400', tagBg: 'bg-purple-900/30' },
                druid: { bg: 'from-amber-900/50 to-stone-900', border: 'border-amber-600/40 hover:border-amber-500', accent: 'text-amber-400', tagBg: 'bg-amber-900/30' },
                rogue: { bg: 'from-lime-900/50 to-stone-900', border: 'border-lime-600/40 hover:border-lime-500', accent: 'text-lime-400', tagBg: 'bg-lime-900/30' },
                ranger: { bg: 'from-green-900/50 to-stone-900', border: 'border-green-600/40 hover:border-green-500', accent: 'text-green-400', tagBg: 'bg-green-900/30' },
                spiritborn: { bg: 'from-teal-900/50 to-stone-900', border: 'border-teal-600/40 hover:border-teal-500', accent: 'text-teal-400', tagBg: 'bg-teal-900/30' },
                paladin: { bg: 'from-yellow-900/50 to-stone-900', border: 'border-yellow-600/40 hover:border-yellow-500', accent: 'text-yellow-400', tagBg: 'bg-yellow-900/30' },
                warlock: { bg: 'from-violet-900/50 to-stone-900', border: 'border-violet-600/40 hover:border-violet-500', accent: 'text-violet-400', tagBg: 'bg-violet-900/30' }
              };
              const colors = classColors[build.characterClass] || classColors.barbarian;
              
              return (
                <div
                  key={build.id}
                  onClick={() => handleBuildClick(build)}
                  className={`bg-gradient-to-b ${colors.bg} border rounded-xl cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-black/20 ${colors.border}`}
                >
                  {/* 顶部职业标识条 */}
                  <div className={`h-1 bg-gradient-to-r ${colors.bg.replace('from-', 'from-').replace('to-stone-900', 'to-transparent')}`}></div>
                  
                  {/* 内容 */}
                  <div className="p-4">
                    {/* 作者信息 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-stone-800/80 flex items-center justify-center text-sm font-medium ${colors.accent}`}>
                          {build.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-stone-300">{build.author}</div>
                          <div className="text-xs text-stone-500">
                            Lv.{build.authorLevel} · 天梯 #{build.authorRank}
                          </div>
                        </div>
                      </div>
                      {build.rating && (
                        <div className="flex items-center gap-1 bg-stone-800/60 px-2 py-1 rounded">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="text-xs font-medium text-stone-300">{build.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* 构筑名称 */}
                    <h3 className={`text-sm font-semibold mb-1 line-clamp-2 ${colors.accent}`}>
                      {build.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                      {build.description}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {build.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx}
                          className={`text-xs ${colors.tagBg} text-stone-300 px-2 py-0.5 rounded border border-stone-700/50`}
                        >
                          {tag}
                        </span>
                      ))}
                      {build.playStyle && (
                        <span className={`text-xs ${colors.tagBg} ${colors.accent} px-2 py-0.5 rounded border border-stone-700/50 font-medium`}>
                          {build.playStyle}
                        </span>
                      )}
                    </div>

                    {/* 统计信息 */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-800/50">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-stone-400">
                          <span className="text-stone-500">👍</span>
                          <span>{formatNumber(build.likes)}</span>
                        </span>
                        <span className="flex items-center gap-1 text-stone-400">
                          <span className="text-stone-500">📥</span>
                          <span>{formatNumber(build.downloads)}</span>
                        </span>
                      </div>
                      <span className="text-stone-600">{formatDate(build.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      {showDetail && selectedBuild && (
        <BuildDetailModal 
          build={selectedBuild} 
          onClose={() => setShowDetail(false)}
          onExport={handleExportSingle}
        />
      )}
    </div>
  );
}

export default BuildBrowser;
