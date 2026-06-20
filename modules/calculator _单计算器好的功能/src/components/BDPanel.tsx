import { useState } from 'react'
import { BD_DATA, type BuildData } from '../config/BD_DATA'
import { useDamageStore } from '../store/damageStore'
import { usePlanStore } from '../store/planStore'
import { affixTotal, calcBMult, formatNumber } from '../store/damageStore'

function BDPanel() {
  const { setInputs, calculateDamage } = useDamageStore()
  const { updatePlanData, activeId } = usePlanStore()
  const [selectedBD, setSelectedBD] = useState<string | null>(null)

  const applyBD = (build: BuildData) => {
    setInputs(build.data)
    if (activeId) {
      updatePlanData(activeId, build.data)
    }
    calculateDamage()
    setSelectedBD(build.id)
  }

  const compareBD = (build: BuildData) => {
    setSelectedBD(build.id)
  }

  return (
    <div className="section-group">
      {/* BD列表 */}
      <div className="section">
        <div className="section-header">
          <span>参考BD</span>
          <span style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>
            {BD_DATA.season} · 更新: {BD_DATA.updated}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {BD_DATA.builds.map((build: BuildData) => (
            <div
              key={build.id}
              style={{
                padding: '12px',
                borderRadius: '4px',
                border: selectedBD === build.id ? '1px solid var(--d4-red)' : '1px solid var(--d4-border)',
                background: selectedBD === build.id ? 'rgba(165, 9, 5, 0.15)' : 'var(--d4-dark)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{build.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{build.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>{build.tier}</div>
                    <div style={{ fontSize: '11px', color: 'var(--d4-text-secondary)', marginTop: '4px' }}>{build.desc}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => compareBD(build)}
                    className="d4-btn d4-btn-sm"
                    style={{ background: '#444' }}
                  >
                    对比
                  </button>
                  <button
                    onClick={() => applyBD(build)}
                    className="d4-btn d4-btn-sm d4-btn-gold"
                  >
                    套用
                  </button>
                </div>
              </div>
              
              {/* 展开详情 */}
              {selectedBD === build.id && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--d4-border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--d4-text-secondary)' }}>武器伤害</span>
                      <span>{build.data.wpn1}{build.data.wpn2 > 0 ? '+' + build.data.wpn2 : ''}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--d4-text-secondary)' }}>主属性</span>
                      <span>{build.data.str}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="color-add">A类合计</span>
                      <span className="color-add">+{affixTotal(build.data.affix_a)}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="color-crit">暴击率</span>
                      <span className="color-crit">{build.data.crit_chance}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--d4-text-secondary)' }}>技能倍率</span>
                      <span>{build.data.skill_pct}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--d4-text-secondary)' }}>APS</span>
                      <span>{build.data.aps}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BD对比面板 */}
      {selectedBD && <BDComparePanel buildId={selectedBD} />}
    </div>
  )
}

// BD对比面板组件
function BDComparePanel({ buildId }: { buildId: string }) {
  const { inputs } = useDamageStore()
  const build = BD_DATA.builds.find(b => b.id === buildId)
  
  if (!build) return null

  // 计算伤害
  const calculateDamageForData = (data: typeof inputs) => {
    const wpnBase = (data.wpn1 || 0) + (data.wpn2 || 0)
    if (wpnBase <= 0) return null

    const skillMult = (data.skill_pct || 100) / 100
    const afterSkill = wpnBase * skillMult

    const addTotal = affixTotal(data.affix_a || [])
    const addMult = 1 + addTotal / 100
    const afterAdd = afterSkill * addMult

    const bMult = calcBMult(data.affix_b)
    const afterB = afterAdd * bMult

    const legMult = (data.multi_leg || []).filter((r: { enabled?: boolean; val: number }) => r.enabled !== false && r.val > 0)
      .reduce((acc: number, r: { val: number }) => acc * (1 + r.val / 100), 1)

    const vulnMult = data.vuln_active ? 1.2 : 1.0
    const critMult = data.crit_active ? 1.5 : 1.0

    return afterB * legMult * vulnMult * critMult
  }

  const currentDamage = calculateDamageForData(inputs)
  const buildDamage = calculateDamageForData(build.data)

  const damageDiff = currentDamage && buildDamage 
    ? ((buildDamage - currentDamage) / currentDamage * 100).toFixed(1)
    : null

  return (
    <div className="section" style={{ background: 'rgba(128, 0, 0, 0.15)', borderColor: '#8b0000' }}>
      <div className="section-header">
        <span style={{ color: '#ff6b6b' }}>与「{build.name}」对比</span>
      </div>
      
      {currentDamage && buildDamage ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 伤害对比 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>当前方案</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatNumber(currentDamage)}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: parseFloat(damageDiff || '0') >= 0 ? '#4caf50' : '#ff6b6b'
              }}>
                {parseFloat(damageDiff || '0') >= 0 ? '+' : ''}{damageDiff}%
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--d4-text-secondary)' }}>参考BD</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#80f' }}>{formatNumber(buildDamage)}</div>
            </div>
          </div>

          {/* 对比条 */}
          <div style={{ height: '8px', background: 'var(--d4-dark)', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                background: 'var(--d4-red)',
                width: `${Math.min((currentDamage / buildDamage) * 100, 100)}%`
              }}
            />
          </div>

          {/* 详细对比 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', fontSize: '12px' }}>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>A类</div>
              <div>+{affixTotal(inputs.affix_a)}%</div>
            </div>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>vs</div>
              <div style={{ color: '#80f' }}>+{affixTotal(build.data.affix_a)}%</div>
            </div>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>差值</div>
              <div style={{ color: affixTotal(build.data.affix_a) >= affixTotal(inputs.affix_a) ? '#4caf50' : '#ff6b6b' }}>
                {affixTotal(build.data.affix_a) >= affixTotal(inputs.affix_a) ? '+' : ''}{(affixTotal(build.data.affix_a) - affixTotal(inputs.affix_a)).toFixed(0)}%
              </div>
            </div>

            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>主属性</div>
              <div>{inputs.str}</div>
            </div>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>vs</div>
              <div style={{ color: '#80f' }}>{build.data.str}</div>
            </div>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>差值</div>
              <div style={{ color: build.data.str >= inputs.str ? '#4caf50' : '#ff6b6b' }}>
                {build.data.str >= inputs.str ? '+' : ''}{(build.data.str - inputs.str).toFixed(0)}
              </div>
            </div>

            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>暴击率</div>
              <div>{inputs.crit_chance}%</div>
            </div>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>vs</div>
              <div style={{ color: '#80f' }}>{build.data.crit_chance}%</div>
            </div>
            <div style={{ padding: '4px', background: 'var(--d4-dark)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--d4-text-secondary)' }}>差值</div>
              <div style={{ color: build.data.crit_chance >= inputs.crit_chance ? '#4caf50' : '#ff6b6b' }}>
                {build.data.crit_chance >= inputs.crit_chance ? '+' : ''}{(build.data.crit_chance - inputs.crit_chance).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--d4-text-secondary)', fontSize: '13px' }}>
          请先设置武器伤害以进行对比
        </div>
      )}
    </div>
  )
}

export default BDPanel