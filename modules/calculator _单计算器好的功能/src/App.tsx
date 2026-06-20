import { useState, useEffect } from 'react'
import { useDamageStore } from './store/damageStore'
import { usePlanStore } from './store/planStore'
import Header from './components/Header'
import InputPanel from './components/InputPanel'
import ResultPanel from './components/ResultPanel'
import PlanManager from './components/PlanManager'
import BDPanel from './components/BDPanel'
import LoadModal from './components/LoadModal'

type TabType = 'calc' | 'plans' | 'bd'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('calc')
  const [showLoadModal, setShowLoadModal] = useState(false)
  
  const { setInputs } = useDamageStore()
  const { loadPlans, loadSnapshots, getActivePlan } = usePlanStore()

  // 初始化时加载方案数据
  useEffect(() => {
    loadPlans()
    loadSnapshots()
    
    // 同步当前方案数据到damageStore
    const plan = getActivePlan()
    if (plan) {
      setInputs(plan.data)
    }
  }, [])

  // 监听方案切换
  useEffect(() => {
    const unsubscribe = usePlanStore.subscribe((state) => {
      const plan = state.getActivePlan()
      if (plan) {
        setInputs(plan.data)
      }
    })
    return unsubscribe
  }, [])

  const handleLoadConfig = (data: any) => {
    if (data) {
      setInputs(data)
    }
    setShowLoadModal(false)
  }

  return (
    <div className="main-view">
      <Header />
      <main className="content-page">
        {/* 标签页切换 */}
        <div style={{ 
          display: 'flex', 
          gap: '2px', 
          marginBottom: '8px',
          padding: '0 4px',
          width: '100%',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setActiveTab('calc')}
            className={`d4-btn d4-btn-lg ${activeTab === 'calc' ? 'bg-d4-gold text-d4-dark' : 'bg-d4-dark'}`}
          >
            伤害计算
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`d4-btn d4-btn-lg ${activeTab === 'plans' ? 'bg-d4-gold text-d4-dark' : 'bg-d4-dark'}`}
          >
            方案管理
          </button>
          <button
            onClick={() => setActiveTab('bd')}
            className={`d4-btn d4-btn-lg ${activeTab === 'bd' ? 'bg-d4-gold text-d4-dark' : 'bg-d4-dark'}`}
          >
            参考BD
          </button>
        </div>

        {/* 内容区域 */}
        {activeTab === 'calc' ? (
          <div className="section-group">
            <InputPanel />
            <ResultPanel />
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {activeTab === 'plans' && (
              <div className="content-box" style={{ maxWidth: '500px' }}>
                <PlanManager />
              </div>
            )}
            
            {activeTab === 'bd' && (
              <div className="content-box" style={{ maxWidth: '600px' }}>
                <BDPanel />
              </div>
            )}
          </div>
        )}
      </main>

      {/* 加载弹窗 */}
      <LoadModal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        onLoad={handleLoadConfig}
      />
    </div>
  )
}

export default App
