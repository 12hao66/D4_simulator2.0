import { useState, useEffect } from 'react'
import { useEquipmentStore } from '../store/equipmentStore'

function BuildManager() {
  const { builds, currentBuildId, loadBuild, deleteBuild, updateBuildName, createEmptyBuild, duplicateBuild, exportBuildAsFile } = useEquipmentStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [menuBuildId, setMenuBuildId] = useState<string | null>(null)
  const [selectedBuildId, setSelectedBuildId] = useState<string | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importSuccess, setImportSuccess] = useState<string | null>(null)

  // 点击外部关闭弹出菜单和取消选中
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.build-card') && !target.closest('.popup-menu')) {
        setMenuBuildId(null)
        setSelectedBuildId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 创建新方案（直接清空装备槽）
  const handleCreateBuild = () => {
    createEmptyBuild()
  }

  // 导出方案（下载文件）
  const handleExportBuild = (buildId: string) => {
    exportBuildAsFile(buildId)
    setMenuBuildId(null)
  }

  // 导入方案从文件
  const handleImportBuild = async (file: File) => {
    const { importBuildFromFile } = useEquipmentStore.getState()
    const success = await importBuildFromFile(file)
    setImportSuccess(success ? 'success' : 'error')
    if (success) {
      setTimeout(() => setShowImportModal(false), 2000)
    }
  }

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleImportBuild(file)
      } else {
        setImportSuccess('invalid')
      }
    }
  }

  // 开始重命名
  const startRename = (buildId: string, currentName: string) => {
    setEditingId(buildId)
    setEditingName(currentName)
    setMenuBuildId(null)
  }

  // 完成重命名
  const finishRename = () => {
    if (editingId && editingName.trim()) {
      updateBuildName(editingId, editingName.trim())
    }
    setEditingId(null)
    setEditingName('')
  }

  // 取消重命名
  const cancelRename = () => {
    setEditingId(null)
    setEditingName('')
  }

  // 加载方案
  const handleLoad = (buildId: string) => {
    loadBuild(buildId)
    setMenuBuildId(null)
  }

  // 删除方案
  const handleDelete = (buildId: string) => {
    deleteBuild(buildId)
    setMenuBuildId(null)
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* 标题区域 */}
      <div className="px-3 py-2 border-b border-d4-border/30">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-d4-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-xs font-bold tracking-wide text-d4-gold">军械库</span>
        </div>
      </div>

      {/* 按钮区域 */}
          <div className="px-3 py-3">
            <div className="flex flex-col gap-2">
              {/* 新建方案按钮 */}
              <button
                onClick={handleCreateBuild}
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-800 border border-blue-500/50 rounded-lg flex items-center justify-center gap-2 hover:from-blue-500 hover:to-blue-700 hover:border-blue-400 transition-all duration-200 cursor-pointer group shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40"
                title="创建新的空白方案"
              >
                <svg 
                  className="w-4 h-4 text-white group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-semibold text-white">新建方案</span>
              </button>
              {/* 导入方案按钮 */}
              <button
                onClick={() => {
                  setImportSuccess(null)
                  setShowImportModal(true)
                }}
                className="w-full h-10 bg-gradient-to-r from-green-600 to-green-800 border border-green-500/50 rounded-lg flex items-center justify-center gap-2 hover:from-green-500 hover:to-green-700 hover:border-green-400 transition-all duration-200 cursor-pointer group shadow-lg shadow-green-900/30 hover:shadow-green-700/40"
                title="从JSON文件导入方案"
              >
                <svg 
                  className="w-4 h-4 text-white group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-xs font-semibold text-white">导入方案</span>
              </button>
            </div>
          </div>

          {/* 方案列表区域 */}
          <div className="flex-1 overflow-y-auto px-3 pb-3">
            {builds.length > 0 ? (
              <div className="flex flex-col gap-2">
                {builds.map((build) => (
                  <div key={build.id} className="relative">
                    <div
                      className={`build-card rounded-lg border transition-all duration-300 cursor-pointer overflow-hidden ${
                        currentBuildId === build.id 
                          ? 'bg-gradient-to-br from-amber-900/40 to-stone-900/60 border-amber-500/60 shadow-lg shadow-amber-500/15' 
                          : selectedBuildId === build.id
                            ? 'bg-gradient-to-br from-stone-800/60 to-stone-900/80 border-amber-400/40 shadow-lg shadow-amber-500/10'
                            : 'bg-gradient-to-br from-stone-800/40 to-stone-900/60 border-stone-600/40 hover:border-stone-500/60 hover:shadow-md hover:shadow-black/30'
                      }`}
                      onClick={() => {
                        setSelectedBuildId(build.id)
                        setMenuBuildId(menuBuildId === build.id ? null : build.id)
                      }}
                    >
                      {editingId === build.id ? (
                        <div className="p-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1 bg-stone-900/80 border border-amber-500/60 rounded-lg px-3 py-2 text-white text-sm font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') finishRename()
                              if (e.key === 'Escape') cancelRename()
                            }}
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={finishRename}
                              className="w-7 h-7 bg-green-600/20 border border-green-500/60 rounded-lg flex items-center justify-center hover:bg-green-600/40 transition-colors"
                              title="确认"
                            >
                              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={cancelRename}
                              className="w-7 h-7 bg-red-600/20 border border-red-500/60 rounded-lg flex items-center justify-center hover:bg-red-600/40 transition-colors"
                              title="取消"
                            >
                              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {currentBuildId === build.id && (
                                  <div className="w-2 h-2 bg-amber-400 rounded-full shadow-sm shadow-amber-400/50"></div>
                                )}
                                <span className={`text-sm font-medium truncate ${
                                  currentBuildId === build.id ? 'text-amber-300' : 'text-gray-200'
                                }`} title={build.name}>
                                  {build.name}
                                </span>
                              </div>
                            </div>
                            {/* 菜单按钮 */}
                            <div className="flex items-center gap-2">
                              {currentBuildId === build.id && (
                                <span className="text-[10px] text-amber-400 font-medium px-2 py-0.5 bg-amber-500/10 rounded-full">当前</span>
                              )}
                              <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  menuBuildId === build.id ? 'rotate-180 text-amber-400' : 'text-gray-500 hover:text-gray-300'
                                }`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 弹出式操作菜单 */}
                    {menuBuildId === build.id && editingId !== build.id && (
                      <div 
                        className="popup-menu absolute right-0 top-full mt-1 z-50 bg-stone-900/95 border border-stone-600 rounded-lg shadow-xl overflow-hidden backdrop-blur-sm min-w-[110px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleLoad(build.id)}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-stone-800/60 transition-colors text-left"
                        >
                          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span className="text-xs text-gray-200">加载</span>
                        </button>
                        <button
                          onClick={() => startRename(build.id, build.name)}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-stone-800/60 transition-colors text-left border-t border-stone-700/50"
                        >
                          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="text-xs text-gray-200">重命名</span>
                        </button>
                        <button
                          onClick={() => {
                            duplicateBuild(build.id)
                            setMenuBuildId(null)
                          }}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-stone-800/60 transition-colors text-left border-t border-stone-700/50"
                        >
                          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-200">复制方案</span>
                        </button>
                        <button
                          onClick={() => handleExportBuild(build.id)}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-stone-800/60 transition-colors text-left border-t border-stone-700/50"
                        >
                          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-xs text-gray-200">导出</span>
                        </button>
                        <button
                          onClick={() => handleDelete(build.id)}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-red-900/30 hover:text-red-400 transition-colors text-left border-t border-stone-700/50"
                        >
                          <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="text-xs text-red-400">删除</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-3 text-center">
                <div className="w-14 h-14 bg-stone-800/50 border border-stone-700/50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm text-stone-400 mb-1">暂无方案</div>
                <div className="text-xs text-stone-600">点击上方按钮创建或导入</div>
              </div>
            )}
          </div>

          {/* 导入方案模态框 */}
          {showImportModal && (
            <div 
              className="modal-overlay fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setShowImportModal(false)}
            >
              <div 
                className="bg-stone-900/95 border border-stone-600 rounded-xl p-5 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    importSuccess === 'success' ? 'bg-green-500/20' : 
                    importSuccess === 'error' ? 'bg-red-500/20' :
                    importSuccess === 'invalid' ? 'bg-amber-500/20' : 'bg-green-500/20'
                  }`}>
                    {importSuccess === 'success' ? (
                      <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : importSuccess === 'error' ? (
                      <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : importSuccess === 'invalid' ? (
                      <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                  </div>
                  <div className="text-base font-bold text-white">
                    {importSuccess === 'success' ? '导入成功' : 
                     importSuccess === 'error' ? '导入失败' :
                     importSuccess === 'invalid' ? '无效文件' : '导入方案'}
                  </div>
                  <div className="text-sm text-stone-400 mt-1">
                    {importSuccess === 'success' ? '方案已成功导入' : 
                     importSuccess === 'error' ? '文件格式不正确，请检查文件内容' :
                     importSuccess === 'invalid' ? '请选择正确的JSON文件' : '选择或拖放JSON文件'}
                  </div>
                </div>
                
                {!importSuccess || importSuccess === 'error' || importSuccess === 'invalid' ? (
                  <div className="mb-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-600 rounded-lg cursor-pointer hover:border-green-500/50 hover:bg-stone-800/30 hover:border-dashed transition-all">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                        className="hidden"
                        onClick={() => setImportSuccess(null)}
                      />
                      <div className="flex flex-col items-center justify-center py-4">
                        <svg className="w-8 h-8 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-stone-300">点击或拖放文件到此处</p>
                        <p className="text-xs text-stone-500 mt-1">支持 .json 文件</p>
                      </div>
                    </label>
                  </div>
                ) : null}
                
                {!importSuccess || importSuccess !== 'success' ? (
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="w-full h-10 bg-stone-800/60 border border-stone-600 rounded-lg flex items-center justify-center hover:bg-stone-700/60 hover:border-stone-500 transition-all cursor-pointer"
                  >
                    <span className="text-sm text-gray-200">取消</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="w-full h-10 bg-gradient-to-r from-green-600 to-green-800 border border-green-500/50 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-green-700 hover:border-green-400 transition-all cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white">确定</span>
                  </button>
                )}
              </div>
            </div>
          )}
    </div>
  )
}

export default BuildManager
