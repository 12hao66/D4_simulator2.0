import { useState, useCallback, useEffect } from 'react'
import { useDamageStore } from './store/damageStore'
import { usePlanStore } from './store/planStore'
import Header from './components/Header'
import InputPanel from './components/InputPanel'
import ResultPanel from './components/ResultPanel'
import BDPanel from './components/BDPanel'
import CalculatorUnit from './components/CalculatorUnit'

interface CalcInstance {
  id: number
  title: string
}

function App() {
  const [extraCalcs, setExtraCalcs] = useState<CalcInstance[]>([])
  const [nextId, setNextId] = useState(1)
  const [showBDPanel, setShowBDPanel] = useState(false)

  // 初始化planStore
  const { loadPlans, loadSnapshots } = usePlanStore()
  const { setInputs } = useDamageStore()

  useEffect(() => {
    loadPlans()
    loadSnapshots()
  }, [loadPlans, loadSnapshots])

  // 最多增加3个新计算器（总共4个）
  const canAddMore = extraCalcs.length < 3

  const addCalculator = useCallback(() => {
    if (extraCalcs.length >= 3) return
    const letters = ['B', 'C', 'D']
    const nextLetter = letters[extraCalcs.length]
    setExtraCalcs(prev => [...prev, { id: nextId, title: `计算器 ${nextLetter}` }])
    setNextId(prev => prev + 1)
  }, [extraCalcs.length, nextId])

  const removeCalculator = useCallback((id: number) => {
    setExtraCalcs(prev => prev.filter(calc => calc.id !== id))
  }, [])

  const updateCalcTitle = useCallback((id: number, title: string) => {
    setExtraCalcs(prev => prev.map(calc => calc.id === id ? { ...calc, title } : calc))
  }, [])

  // 计算居中偏移量：有额外计算器时，整体往左偏移
  const totalCalcs = 1 + extraCalcs.length

  return (
    <div className="app">
      <Header 
        onAddCalculator={canAddMore ? addCalculator : undefined} 
        onShowBD={() => setShowBDPanel(true)} 
      />

      {/* BD面板模态框 */}
      {showBDPanel && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowBDPanel(false)}
        >
          <div 
            style={{
              background: 'var(--d4-dark)',
              border: '2px solid var(--d4-red)',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '650px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: 'var(--d4-gold)', margin: 0 }}>参考BD</h3>
              <button
                onClick={() => setShowBDPanel(false)}
                style={{
                  background: 'var(--d4-red)',
                  border: 'none',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>
            <BDPanel />
          </div>
        </div>
      )}

      <div className="content-page" style={{ 
        justifyContent: totalCalcs === 1 ? 'center' : 'flex-start',
        paddingLeft: totalCalcs > 1 ? '16px' : '0'
      }}>
        {/* 原有单计算器 - 左右结构 */}
        <div 
          className="content-box" 
          style={{ 
            flex: totalCalcs === 1 ? '0 1 820px' : '0 0 400px',
            maxWidth: totalCalcs === 1 ? '820px' : '400px',
            display: 'flex',
            flexDirection: totalCalcs === 1 ? 'row' : 'column',
            gap: totalCalcs === 1 ? '16px' : '0'
          }}
        >
          <div style={{ flex: '1 1 400px', maxWidth: totalCalcs === 1 ? '400px' : '400px' }}>
            <InputPanel />
          </div>
          <div style={{ flex: '1 1 400px', maxWidth: totalCalcs === 1 ? '400px' : '400px' }}>
            <ResultPanel />
          </div>
        </div>

        {/* 多计算器并排显示 - 上下结构 */}
        {extraCalcs.map(calc => (
          <CalculatorUnit
            key={calc.id}
            title={calc.title}
            onClose={() => removeCalculator(calc.id)}
            onTitleChange={(title) => updateCalcTitle(calc.id, title)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
