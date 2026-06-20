import { useEffect } from 'react';
import { useParagonStore } from './store/paragonStore';
import { ParagonCanvas } from './components/ParagonCanvas';
import { ParagonPanel } from './components/ParagonPanel';
import { EditorPanel } from './components/EditorPanel';

function App() {
  const { loadBoards, resetView, editMode, setEditMode } = useParagonStore();
  
  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  return (
    <div className="h-screen flex flex-col bg-diablo-bg text-diablo-text">
      {/* 顶部标题 */}
      <div className="bg-diablo-bg-dark border-b border-diablo-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-diablo-gold text-xl font-bold">巅峰盘模拟器</div>
          <div className="text-sm text-diablo-text-muted">
            暗黑4职业巅峰系统
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
              editMode
                ? 'bg-orange-600 border-orange-500 text-white'
                : 'bg-diablo-bg border-diablo-border hover:border-diablo-gold/50 text-diablo-gold'
            }`}
          >
            <span>{editMode ? '✏️' : '📝'}</span>
            <span className="text-sm">{editMode ? '退出编辑' : '编辑模式'}</span>
          </button>
          <button
            onClick={resetView}
            className="px-4 py-2 bg-diablo-bg border border-diablo-border rounded-lg hover:border-diablo-gold/50 transition-all"
          >
            重置视图
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <ParagonCanvas />
        {editMode ? <EditorPanel /> : <ParagonPanel />}
      </div>
    </div>
  );
}

export default App;
