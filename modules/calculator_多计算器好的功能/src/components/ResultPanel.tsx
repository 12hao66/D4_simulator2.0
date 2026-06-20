import { useState } from 'react'
import { useDamageStore, formatNumber, type StepData } from '../store/damageStore'

function ResultPanel() {
  const { result, dpsResult, steps, calculateDamage } = useDamageStore()
  const [showDetail, setShowDetail] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleCalculate = () => {
    calculateDamage()
    setHasCalculated(true)
  }

  if (!result || !hasCalculated) {
    return (
      <div className="section-group">
        {/* 计算伤害按钮 */}
        <div className="section" style={{ textAlign: 'center', padding: '24px' }}>
          <button
            onClick={handleCalculate}
            className="d4-btn d4-btn-lg d4-btn-gold"
            style={{ fontSize: '18px', padding: '12px 32px' }}
          >
            ⚔ 计算伤害
          </button>
          <p style={{ color: 'var(--d4-text-secondary)', fontSize: '12px', marginTop: '12px' }}>
            点击按钮计算当前配置的伤害
          </p>
        </div>
      </div>
    )
  }

  const renderSteps = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {steps.map((step: StepData, index: number) => (
          <div 
            key={index} 
            style={{ 
              padding: '8px', 
              borderRadius: '4px',
              background: step.isFinal ? 'rgba(165, 9, 5, 0.2)' : 'rgba(10, 10, 10, 0.5)',
              border: step.isFinal ? '1px solid var(--d4-red)' : '1px solid var(--d4-border)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{step.icon}</span>
                <div>
                  <div style={{ fontWeight: 500 }}>{step.label}</div>
                  {step.note && <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>{step.note}</div>}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--d4-gold)' }}>{formatNumber(step.val)}</div>
                {step.mult && <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>{step.mult}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderDPS = () => {
    if (!dpsResult) return null

    return (
      <div className="section">
        <div className="section-header">
          <span>DPS 计算</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ padding: '8px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
            <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>基础DPS</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatNumber(dpsResult.baseDPS)}</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
            <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>含易伤DPS</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4caf50' }}>{formatNumber(dpsResult.avgDPS)}</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
            <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>暴击期望DPS</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffcb00' }}>{formatNumber(dpsResult.expectedDPS)}</div>
          </div>
          <div style={{ padding: '8px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
            <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>攻击频率</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{dpsResult.aps.toFixed(2)} × {dpsResult.hits} = {(dpsResult.aps * dpsResult.hits).toFixed(2)}/s</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-group">
      {/* 计算伤害按钮 */}
      <div className="section" style={{ textAlign: 'center', padding: '12px' }}>
        <button
          onClick={handleCalculate}
          className="d4-btn d4-btn-lg d4-btn-gold"
          style={{ fontSize: '16px', padding: '8px 24px' }}
        >
          ⚔ 重新计算
        </button>
      </div>

      {/* 最终伤害 */}
      <div className="section" style={{ textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '14px', color: 'var(--d4-text-secondary)', marginBottom: '8px' }}>最终伤害</div>
        <div style={{ fontSize: '42px', fontWeight: 'bold', color: 'var(--d4-gold)', textShadow: '0 0 10px rgba(210, 200, 174, 0.3)' }}>
          {formatNumber(result.finalDisplay)}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)', marginTop: '8px' }}>
          {result.isDot ? 'DoT基础伤害（不触发暴击）' : (
            <>
              普通: {formatNumber(result.normalHit)} · 暴击: {formatNumber(result.critHit)}
              {result.opStackBonus > 0 && ` · 含压制叠层 +${result.opStackBonus.toFixed(0)}%`}
            </>
          )}
        </div>
      </div>

      {/* 伤害分解 */}
      <div className="section">
        <div className="section-header">
          <span>伤害分解</span>
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="d4-btn d4-btn-sm"
          >
            {showDetail ? '收起详情' : '展开详情'}
          </button>
        </div>
        
        {showDetail ? renderSteps() : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--d4-text-secondary)' }}>武器基础</span>
              <span style={{ fontWeight: 500 }}>{formatNumber(result.wpnBase)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--d4-text-secondary)' }}>技能后</span>
              <span style={{ fontWeight: 500 }}>{formatNumber(result.afterSkill)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="color-add">主属性 ×{result.statMult.toFixed(2)}</span>
              <span style={{ fontWeight: 500, color: '#009688' }}>{formatNumber(result.afterStat)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="color-add">A类 ×{result.addMult.toFixed(2)}</span>
              <span style={{ fontWeight: 500, color: '#009688' }}>{formatNumber(result.afterAdd)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="color-multi">B类 ×{result.bMult.toFixed(2)}</span>
              <span style={{ fontWeight: 500, color: '#916352' }}>{formatNumber(result.afterB)}</span>
            </div>
            {!result.isDot && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="color-crit">暴击 ×{result.afterCrit !== result.afterB ? '1.500' : '1.000'}</span>
                <span style={{ fontWeight: 500, color: '#ffcb00' }}>{formatNumber(result.afterCrit)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="color-vuln">易伤 ×{result.vulnMult.toFixed(2)}</span>
              <span style={{ fontWeight: 500, color: '#80f' }}>{formatNumber(result.afterVuln)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'var(--d4-gold)' }}>
              <span>独立X ×{result.legMult.toFixed(2)}</span>
              <span>{formatNumber(result.afterLeg)}</span>
            </div>
          </div>
        )}
      </div>

      {/* DPS */}
      {renderDPS()}

      {/* 乘区说明 */}
      <div className="section">
        <div className="section-header">
          <span>乘区说明</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div>
            <span className="color-add" style={{ fontWeight: 500 }}>A类区：</span>
            <span style={{ color: 'var(--d4-text-secondary)' }}>所有加法伤害相加，包括技能加成、装备词缀等</span>
          </div>
          <div>
            <span className="color-multi" style={{ fontWeight: 500 }}>B类区：</span>
            <span style={{ color: 'var(--d4-text-secondary)' }}>同名词缀先相加，不同名组之间各自相乘</span>
          </div>
          <div>
            <span className="color-crit" style={{ fontWeight: 500 }}>Legendary区：</span>
            <span style={{ color: 'var(--d4-text-secondary)' }}>独立乘区，各自相乘（如传奇特效、套装效果）</span>
          </div>
        </div>
      </div>

      {/* 计算公式 */}
      <div className="section">
        <div className="section-header">
          <span>计算公式</span>
        </div>
        <pre style={{ 
          fontSize: '11px', 
          color: 'var(--d4-text-secondary)', 
          background: 'var(--d4-dark)', 
          padding: '8px', 
          borderRadius: '4px',
          overflow: 'auto',
          margin: 0
        }}>
{`最终伤害 = 武器伤害 × 技能系数
           × (1 + 主属性/系数)
           × (1 + A类区总和)
           × Π(1 + B类区各组总和)
           × Π(1 + Legendary区各值)
           × 暴击(×1.5) × 易伤(×1.2)`}
        </pre>
      </div>
    </div>
  )
}

export default ResultPanel