import { useState, useRef } from 'react'
import { usePlanStore, type Plan, type Snapshot } from '../store/planStore'

function PlanManager() {
  const {
    plans,
    activeId,
    snapshots,
    switchPlan,
    newPlan,
    clonePlan,
    deletePlan,
    renamePlan,
    exportPlan,
    importPlan,
    takeSnapshot,
    restoreSnapshot,
    deleteSnapshot
  } = usePlanStore()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRename = (plan: Plan) => {
    if (editingName.trim()) {
      renamePlan(plan.id, editingName.trim())
    }
    setEditingId(null)
    setEditingName('')
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await importPlan(file)
        alert('导入成功')
      } catch {
        alert('导入失败')
      }
    }
    e.target.value = ''
  }

  return (
    <div className="section-group">
      {/* 方案列表 */}
      <div className="section">
        <div className="section-header">
          <span>方案管理</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="d4-btn d4-btn-sm"
            >
              导入
            </button>
            <button
              onClick={newPlan}
              className="d4-btn d4-btn-sm d4-btn-gold"
            >
              + 新建
            </button>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto' }}>
          {plans.map((plan: Plan) => (
            <div
              key={plan.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px',
                borderRadius: '4px',
                background: plan.id === activeId ? 'rgba(165, 9, 5, 0.2)' : 'var(--d4-dark)',
                border: plan.id === activeId ? '1px solid var(--d4-red)' : '1px solid var(--d4-border)'
              }}
            >
              <div style={{ flex: 1 }}>
                {editingId === plan.id ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="d4-input"
                      style={{ flex: 1 }}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(plan)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                    />
                    <button
                      onClick={() => handleRename(plan)}
                      className="d4-btn d4-btn-sm"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <div
                    style={{ cursor: 'pointer', fontWeight: plan.id === activeId ? 'bold' : 'normal' }}
                    onClick={() => switchPlan(plan.id)}
                  >
                    {plan.name}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>
                <button
                  onClick={() => {
                    setEditingId(plan.id)
                    setEditingName(plan.name)
                  }}
                  className="d4-btn d4-btn-sm"
                  title="重命名"
                >
                  ✏
                </button>
                <button
                  onClick={() => clonePlan()}
                  className="d4-btn d4-btn-sm"
                  title="复制"
                >
                  📋
                </button>
                <button
                  onClick={() => exportPlan(plan.id)}
                  className="d4-btn d4-btn-sm"
                  title="导出"
                >
                  ↓
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="d4-btn d4-btn-sm"
                  title="删除"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 快照系统 */}
      <div className="section">
        <div className="section-header">
          <span>快照系统</span>
          <button
            onClick={takeSnapshot}
            className="d4-btn d4-btn-sm"
          >
            + 保存快照
          </button>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--d4-text-secondary)', margin: '4px 0' }}>
          最多保存5个快照，用于快速恢复数据
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '150px', overflowY: 'auto' }}>
          {snapshots.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--d4-text-secondary)', fontSize: '13px' }}>
              暂无快照
            </div>
          ) : (
            snapshots.map((snapshot: Snapshot) => (
              <div
                key={snapshot.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  background: 'var(--d4-dark)',
                  borderRadius: '4px'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{snapshot.planName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--d4-text-secondary)' }}>{snapshot.time}</div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => {
                      if (confirm('确定要恢复此快照吗？当前数据将被覆盖')) {
                        restoreSnapshot(snapshot.id)
                      }
                    }}
                    className="d4-btn d4-btn-sm d4-btn-gold"
                  >
                    恢复
                  </button>
                  <button
                    onClick={() => deleteSnapshot(snapshot.id)}
                    className="d4-btn d4-btn-sm"
                    style={{ background: '#8b0000' }}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PlanManager