import { useState, useRef, useEffect } from 'react'
import { CLASSES, type AffixItem, type DamageInputs, type DamageResult, type DPSResult, type StepData, affixTotal, calcBMult, formatNumber } from '../store/damageStore'

interface CalculatorUnitProps {
  title: string
  onClose?: () => void
  onTitleChange?: (title: string) => void
}

// 默认输入值（与原计算器一致）
const createDefaultInputs = (): DamageInputs => ({
  class_id: 'barbarian',
  wpn1: 3000,
  wpn2: 0,
  aps: 1.2,
  str: 5000,
  skill_pct: 215,
  is_dot: false,
  hits: 1,
  affix_a: [
    { label: '核心技能伤害', val: 120, enabled: true },
    { label: '近战伤害', val: 80, enabled: true }
  ],
  affix_b: [
    { label: '物理伤害倍增', val: 22, enabled: true },
    { label: '核心技能倍增', val: 18, enabled: true }
  ],
  multi_leg: [
    { label: '传奇威能', val: 60, enabled: true },
    { label: '套装效果', val: 40, enabled: true }
  ],
  crit_chance: 50,
  crit_active: true,
  vuln_add: 0,
  vuln_active: true,
  vuln_uptime: 80,
  op_stacks: 0,
  op_stack_add: 15,
  monster_dr: 80,
  apply_dr: false
})

// 计算伤害
const calculateDamage = (inputs: DamageInputs): DamageResult | null => {
  const wpnBase = (inputs.wpn1 || 0) + (inputs.wpn2 || 0)
  if (wpnBase <= 0) return null

  const skillMult = (inputs.skill_pct || 100) / 100
  const afterSkill = wpnBase * skillMult

  const cls = CLASSES.find(c => c.id === inputs.class_id) || CLASSES[0]
  const statMult = 1 + (inputs.str || 0) / cls.stat_div
  const afterStat = afterSkill * statMult

  const vulnActive = !!inputs.vuln_active
  const opStackBonus = (inputs.op_stack_add || 15) * (inputs.op_stacks || 0)
  const aGearTotal = affixTotal(inputs.affix_a || [])
  const addTotal = aGearTotal + opStackBonus + (vulnActive ? (inputs.vuln_add || 0) : 0)

  const addMult = 1 + addTotal / 100
  const afterAdd = afterStat * addMult

  const bMult = calcBMult(inputs.affix_b)
  const afterB = afterAdd * bMult

  const isDot = !!inputs.is_dot
  const critDmgBonus = 0.5
  let normalHit: number, critHit: number, afterCrit: number

  if (isDot) {
    normalHit = critHit = afterCrit = afterB
  } else {
    normalHit = afterB
    critHit = afterB * (1 + critDmgBonus)
    afterCrit = inputs.crit_active ? critHit : normalHit
  }

  const vulnMult = vulnActive ? 1.2 : 1.0
  const afterVuln = afterCrit * vulnMult

  const legMult = (inputs.multi_leg || []).filter((r: AffixItem) => r.enabled !== false && r.val > 0)
    .reduce((acc: number, r: AffixItem) => acc * (1 + r.val / 100), 1)

  const afterLeg = afterVuln * legMult
  const finalHit = afterLeg
  const finalDisplay = inputs.apply_dr ? finalHit * (1 - (inputs.monster_dr || 0) / 100) : finalHit

  return {
    wpnBase,
    afterSkill,
    afterStat,
    afterAdd,
    afterB,
    afterCrit,
    afterVuln,
    afterLeg,
    normalHit,
    critHit,
    finalHit,
    finalDisplay,
    statMult,
    addMult,
    bMult,
    vulnMult,
    legMult,
    critDmgBonus,
    addTotal,
    opStackBonus,
    isDot,
    vulnActive
  }
}

// 计算 DPS
const calculateDPS = (result: DamageResult | null, inputs: DamageInputs): DPSResult | null => {
  if (!result) return null

  const aps = inputs.aps || 1.0
  const hits = inputs.hits || 1
  const critChance = (inputs.crit_chance || 0) / 100
  const vulnUptime = (inputs.vuln_uptime || 80) / 100

  const baseDPS = result.finalHit * aps * hits
  const avgDPS = baseDPS * (1 - vulnUptime + vulnUptime * 1.2)
  const expectedDPS = avgDPS * (1 - critChance + critChance * 1.5)

  return { baseDPS, avgDPS, expectedDPS, aps, hits, critChance, vulnUptime }
}

// 构建步骤数据
const buildStepData = (result: DamageResult, inputs: DamageInputs): StepData[] => {
  const isCrit = !result.isDot && inputs.crit_active
  const cls = CLASSES.find(c => c.id === inputs.class_id) || { stat_label: '力量', stat_div: 900 }

  const noteA = [
    `A类词缀 +${affixTotal(inputs.affix_a || []).toFixed(0)}%`,
    result.opStackBonus > 0 ? `压制叠层 +${result.opStackBonus.toFixed(0)}%` : '',
    result.vulnActive && inputs.vuln_add > 0 ? `易伤 +${inputs.vuln_add}%` : ''
  ].filter(Boolean).join(' + ')

  // 获取B类词缀说明
  const getBNote = (affixB: AffixItem[]): string => {
    const rows = (affixB || []).filter(r => r.enabled !== false && (r.val || 0) > 0)
    if (!rows.length) return '无B类词缀'

    const groups: Record<string, number> = {}
    rows.forEach(r => {
      const key = (r.label || '').trim() || '未命名'
      if (!groups[key]) groups[key] = 0
      groups[key] += r.val || 0
    })

    return Object.entries(groups)
      .map(([k, v]) => `${k} +${v.toFixed(0)}% → ×${(1 + v / 100).toFixed(3)}`)
      .join('  ·  ')
  }

  // 获取独立X词缀说明
  const getLegNote = (multiLeg: AffixItem[]): string => {
    const rows = (multiLeg || []).filter(r => r.enabled !== false && r.val > 0)
    if (!rows.length) return '无独立X词缀'

    return rows.map(r => `${r.label} ×${(1 + r.val / 100).toFixed(3)}`).join(' × ')
  }

  const steps: StepData[] = [
    {
      icon: '⚔',
      label: '武器基础点伤',
      note: inputs.wpn2 > 0 ? `主手 ${formatNumber(inputs.wpn1)} + 副手 ${formatNumber(inputs.wpn2)}` : '单手武器',
      mult: '',
      val: result.wpnBase
    },
    {
      icon: '⚡',
      label: `技能系数 ×${inputs.skill_pct}%`,
      note: '',
      mult: `×${(inputs.skill_pct / 100).toFixed(3)}`,
      val: result.afterSkill
    },
    {
      icon: '💪',
      label: `主属区（${cls.stat_label} ${inputs.str}）`,
      note: `1 + ${inputs.str} / ${cls.stat_div} = ×${result.statMult.toFixed(4)}`,
      mult: `×${result.statMult.toFixed(4)}`,
      val: result.afterStat
    },
    {
      icon: '📊',
      label: `A类区 [+] ${result.addTotal.toFixed(0)}%`,
      note: noteA,
      mult: `×${result.addMult.toFixed(4)}`,
      val: result.afterAdd
    },
    {
      icon: '✖',
      label: 'B类区',
      note: getBNote(inputs.affix_b),
      mult: `×${result.bMult.toFixed(4)}`,
      val: result.afterB
    }
  ]

  if (!result.isDot) {
    steps.push({
      icon: '💥',
      label: isCrit ? '暴击命中 ×1.5（固定基础加成）' : '普通命中',
      note: isCrit ? '暴击伤害[+]%已归入A类区' : '未触发暴击',
      mult: isCrit ? '×1.500' : '×1.000',
      val: result.afterCrit
    })
  }

  steps.push({
    icon: '🔴',
    label: '易伤区 ×1.2',
    note: result.vulnActive ? '目标携带易伤（固定 ×1.2）' : '目标无易伤',
    mult: result.vulnActive ? '×1.200' : '×1.000',
    val: result.afterVuln
  })

  steps.push({
    icon: '⭐',
    label: '独立X连乘',
    note: getLegNote(inputs.multi_leg),
    mult: `×${result.legMult.toFixed(4)}`,
    val: result.afterLeg,
    isFinal: true
  })

  return steps
}

// localStorage 保存/加载
const STORAGE_PREFIX = 'd4_calc_unit_'

const saveToStorage = (name: string, data: DamageInputs) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

const loadFromStorage = (name: string): DamageInputs | null => {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + name)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const getSavedNames = (): string[] => {
  const names: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(STORAGE_PREFIX)) {
      names.push(key.replace(STORAGE_PREFIX, ''))
    }
  }
  return names
}

function CalculatorUnit({ title, onClose, onTitleChange }: CalculatorUnitProps) {
  const [inputs, setInputs] = useState<DamageInputs>(createDefaultInputs)
  const [result, setResult] = useState<DamageResult | null>(null)
  const [dpsResult, setDpsResult] = useState<DPSResult | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(title)
  const [showDetail, setShowDetail] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [savedNames, setSavedNames] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 计算结果
  useEffect(() => {
    const newResult = calculateDamage(inputs)
    setResult(newResult)
    setDpsResult(calculateDPS(newResult, inputs))
  }, [inputs])

  // 更新保存的名称列表
  useEffect(() => {
    setSavedNames(getSavedNames())
  }, [showLoadModal])

  const updateInput = (field: string, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const addAffix = (type: 'affix_a' | 'affix_b' | 'multi_leg') => {
    setInputs(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), { label: '', val: 0, enabled: true }]
    }))
  }

  const removeAffix = (type: 'affix_a' | 'affix_b' | 'multi_leg', index: number) => {
    setInputs(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter((_, i) => i !== index)
    }))
  }

  const handleAffixChange = (type: 'affix_a' | 'affix_b' | 'multi_leg', index: number, field: keyof AffixItem, value: any) => {
    const newAffixes = [...(inputs[type] || [])]
    newAffixes[index] = { ...newAffixes[index], [field]: value }
    updateInput(type, newAffixes)
  }

  const handleTitleClick = () => {
    setTempName(title)
    setEditingName(true)
  }

  const handleTitleSave = () => {
    if (tempName.trim() && onTitleChange) {
      onTitleChange(tempName.trim())
    }
    setEditingName(false)
  }

  const handleCalculate = () => {
    setHasCalculated(true)
  }

  const handleReset = () => {
    const defaultInputs = createDefaultInputs()
    setInputs({
      ...defaultInputs,
      affix_a: [...defaultInputs.affix_a],
      affix_b: [...defaultInputs.affix_b],
      multi_leg: [...defaultInputs.multi_leg]
    })
    setHasCalculated(false)
  }

  const handleSave = (name: string) => {
    const success = saveToStorage(name, inputs)
    if (success) {
      alert(`方案「${name}」已保存！`)
      setShowSaveModal(false)
    } else {
      alert('保存失败！')
    }
  }

  const handleLoad = (name: string) => {
    const data = loadFromStorage(name)
    if (data) {
      setInputs(data)
      alert(`方案「${name}」已加载！`)
      setShowLoadModal(false)
    } else {
      alert('加载失败！')
    }
  }

  const handleExport = () => {
    const data = JSON.stringify(inputs, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const text = await file.text()
        const data = JSON.parse(text) as DamageInputs
        setInputs(data)
        alert('导入成功！')
      } catch (err) {
        alert('导入失败：无效的配置文件')
      }
    }
    e.target.value = ''
  }

  const cls = CLASSES.find(c => c.id === inputs.class_id) || CLASSES[0]

  // 渲染词缀列表
  const renderAffixList = (
    type: 'affix_a' | 'affix_b' | 'multi_leg',
    titleText: string,
    colorClass: string,
    placeholder: string
  ) => {
    const affixes = inputs[type] || []
    const borderClass = type === 'affix_a' ? 'border-col-add' : type === 'affix_b' ? 'border-col-multi' : 'border-col-crit'
    
    return (
      <div className="section">
        <div className="section-header">
          <span className={colorClass}>{titleText}</span>
          <button className="d4-btn d4-btn-sm" onClick={() => addAffix(type)}>+</button>
        </div>
        
        {affixes.length === 0 ? (
          <div style={{ padding: '8px', color: 'var(--d4-text-secondary)', fontSize: '12px' }}>
            {placeholder}
          </div>
        ) : (
          affixes.map((affix, index) => {
            const isEnabled = affix.enabled !== false
            return (
              <div 
                key={index} 
                className={`form-group ${isEnabled ? '' : 'disabled-row'}`} 
                style={{ flexWrap: 'nowrap', opacity: isEnabled ? 1 : 0.6 }}
              >
                <button
                  className={`d4-btn d4-btn-sm d4-toggle ${isEnabled ? 'on' : 'off'}`}
                  onClick={() => handleAffixChange(type, index, 'enabled', !isEnabled)}
                  title={isEnabled ? '点击禁用' : '点击启用'}
                  style={{ fontSize: '14px' }}
                >
                  {isEnabled ? '👁' : '👁‍🗨'}
                </button>
                <input
                  type="text"
                  value={affix.label}
                  onChange={(e) => handleAffixChange(type, index, 'label', e.target.value)}
                  placeholder="词缀名称"
                  className="d4-input"
                  style={{ flex: 1, minWidth: 0 }}
                  disabled={!isEnabled}
                />
                <input
                  type="number"
                  value={affix.val || ''}
                  onChange={(e) => handleAffixChange(type, index, 'val', parseFloat(e.target.value) || 0)}
                  className={`d4-input ${borderClass}`}
                  style={{ width: '60px' }}
                  disabled={!isEnabled}
                />
                <span style={{ margin: '0 4px' }}>%</span>
                <button
                  className="d4-btn d4-btn-sm"
                  onClick={() => removeAffix(type, index)}
                >
                  ×
                </button>
              </div>
            )
          })
        )}
      </div>
    )
  }

  // 渲染详细步骤
  const renderSteps = () => {
    if (!result) return null
    const steps = buildStepData(result, inputs)
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {steps.map((step, index) => (
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

  // 渲染输入面板
  const renderInputPanel = () => (
    <div className="section-group">
      {/* 标题与操作 */}
      <div className="section">
        <div className="section-header" style={{ justifyContent: 'space-between' }}>
          <span>⚔</span>
          {editingName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
              className="d4-input"
              style={{ width: '150px', textAlign: 'center' }}
              autoFocus
            />
          ) : (
            <span
              onClick={handleTitleClick}
              style={{ cursor: 'pointer', color: 'var(--d4-gold)' }}
              title="点击修改名称"
            >
              {title}
            </span>
          )}
          <span>⚖</span>
        </div>
        
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px', justifyContent: 'center' }}>
          <button onClick={() => setShowSaveModal(true)} className="d4-btn d4-btn-sm">保存</button>
          <button onClick={() => setShowLoadModal(true)} className="d4-btn d4-btn-sm">加载</button>
          <button onClick={handleExport} className="d4-btn d4-btn-sm">导出</button>
          <button onClick={handleImportClick} className="d4-btn d4-btn-sm">导入</button>
          <button onClick={handleReset} className="d4-btn d4-btn-sm">重置</button>
          {onClose && (
            <button onClick={onClose} className="d4-btn d4-btn-sm">关闭</button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* 保存弹窗 */}
        {showSaveModal && (
          <div style={{ padding: '8px', background: 'var(--d4-darker)', marginBottom: '8px', borderRadius: '4px' }}>
            <div style={{ marginBottom: '8px' }}>
              <input
                type="text"
                placeholder="输入方案名称"
                id="save-name-input"
                className="d4-input"
                style={{ width: '100%', marginBottom: '4px' }}
                defaultValue={title}
              />
              <button
                onClick={() => {
                  const input = document.getElementById('save-name-input') as HTMLInputElement
                  if (input?.value.trim()) {
                    handleSave(input.value.trim())
                  }
                }}
                className="d4-btn d4-btn-sm"
              >
                确认保存
              </button>
              <button onClick={() => setShowSaveModal(false)} className="d4-btn d4-btn-sm" style={{ marginLeft: '4px' }}>取消</button>
            </div>
          </div>
        )}

        {/* 加载弹窗 */}
        {showLoadModal && (
          <div style={{ padding: '8px', background: 'var(--d4-darker)', marginBottom: '8px', borderRadius: '4px' }}>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', marginBottom: '4px' }}>已保存的方案：</div>
              {savedNames.length === 0 ? (
                <div style={{ color: 'var(--d4-text-secondary)', fontSize: '12px' }}>暂无保存的方案</div>
              ) : (
                savedNames.map(name => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <button onClick={() => handleLoad(name)} className="d4-btn d4-btn-sm">{name}</button>
                  </div>
                ))
              )}
              <button onClick={() => setShowLoadModal(false)} className="d4-btn d4-btn-sm" style={{ marginTop: '8px' }}>关闭</button>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>职业:</label>
          <select
            value={inputs.class_id}
            onChange={(e) => updateInput('class_id', e.target.value)}
            className="d4-select"
            style={{ width: '120px' }}
          >
            {CLASSES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>主属性:</label>
          <input
            type="number"
            value={inputs.str}
            onChange={(e) => updateInput('str', parseInt(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>
      </div>

      {/* 武器伤害 */}
      <div className="section">
        <div className="section-header">
          <span>武器伤害</span>
        </div>
        
        <div className="form-group">
          <label>主武器伤害:</label>
          <input
            type="number"
            value={inputs.wpn1}
            onChange={(e) => updateInput('wpn1', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>副武器伤害:</label>
          <input
            type="number"
            value={inputs.wpn2}
            onChange={(e) => updateInput('wpn2', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>攻击速度(APS):</label>
          <input
            type="number"
            value={inputs.aps}
            onChange={(e) => updateInput('aps', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
            step="0.1"
          />
        </div>
      </div>

      {/* 技能设置 */}
      <div className="section">
        <div className="section-header">
          <span>技能设置</span>
        </div>
        
        <div className="form-group">
          <label>技能伤害(%):</label>
          <input
            type="number"
            value={inputs.skill_pct}
            onChange={(e) => updateInput('skill_pct', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>命中次数:</label>
          <input
            type="number"
            value={inputs.hits}
            onChange={(e) => updateInput('hits', parseInt(e.target.value) || 1)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>DoT伤害:</label>
          <input
            type="checkbox"
            checked={inputs.is_dot}
            onChange={(e) => updateInput('is_dot', e.target.checked)}
            className="d4-checkbox"
          />
        </div>
      </div>

      {/* 词缀区域 */}
      {renderAffixList('affix_a', '📊 A类区 - 加法伤害', 'color-add', '点击 + 添加A类词缀')}
      {renderAffixList('affix_b', '✖ B类区 - 乘法伤害组', 'color-multi', '点击 + 添加B类词缀')}
      {renderAffixList('multi_leg', '⭐ Legendary区 - 独立乘区', 'color-crit', '点击 + 添加传奇特效')}

      {/* 暴击与易伤 */}
      <div className="section">
        <div className="section-header">
          <span>暴击与易伤</span>
        </div>
        
        <div className="form-group">
          <label>暴击率(%):</label>
          <input
            type="number"
            value={inputs.crit_chance}
            onChange={(e) => updateInput('crit_chance', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-crit"
          />
        </div>

        <div className="form-group">
          <label>暴击加成:</label>
          <input
            type="checkbox"
            checked={inputs.crit_active}
            onChange={(e) => updateInput('crit_active', e.target.checked)}
            className="d4-checkbox"
          />
          <span style={{ color: 'var(--d4-text-secondary)', fontSize: '12px' }}>×1.5</span>
        </div>

        <div className="form-group">
          <label>易伤加成(%):</label>
          <input
            type="number"
            value={inputs.vuln_add}
            onChange={(e) => updateInput('vuln_add', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-vul"
          />
        </div>

        <div className="form-group">
          <label>易伤生效:</label>
          <input
            type="checkbox"
            checked={inputs.vuln_active}
            onChange={(e) => updateInput('vuln_active', e.target.checked)}
            className="d4-checkbox"
          />
          <span style={{ color: 'var(--d4-text-secondary)', fontSize: '12px' }}>×1.2</span>
        </div>

        <div className="form-group">
          <label>易伤覆盖率(%):</label>
          <input
            type="number"
            value={inputs.vuln_uptime}
            onChange={(e) => updateInput('vuln_uptime', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-vul"
          />
        </div>
      </div>

      {/* 压制 */}
      <div className="section">
        <div className="section-header">
          <span>压制机制</span>
        </div>
        
        <div className="form-group">
          <label>压制叠层:</label>
          <input
            type="number"
            value={inputs.op_stacks}
            onChange={(e) => updateInput('op_stacks', parseInt(e.target.value) || 0)}
            className="d4-input border-col-op"
          />
        </div>

        <div className="form-group">
          <label>每层加成(%):</label>
          <input
            type="number"
            value={inputs.op_stack_add}
            onChange={(e) => updateInput('op_stack_add', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-op"
          />
        </div>
      </div>

      {/* 怪物设置 */}
      <div className="section">
        <div className="section-header">
          <span>怪物设置</span>
        </div>
        
        <div className="form-group">
          <label>怪物护甲减伤(%):</label>
          <input
            type="number"
            value={inputs.monster_dr}
            onChange={(e) => updateInput('monster_dr', parseFloat(e.target.value) || 0)}
            className="d4-input"
          />
        </div>

        <div className="form-group">
          <label>应用减伤:</label>
          <input
            type="checkbox"
            checked={inputs.apply_dr}
            onChange={(e) => updateInput('apply_dr', e.target.checked)}
            className="d4-checkbox"
          />
        </div>
      </div>
    </div>
  )

  // 渲染结果面板
  const renderResultPanel = () => {
    if (!result || !hasCalculated) {
      return (
        <div className="section-group">
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
        {dpsResult && (
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
        )}

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

  return (
    <div className="content-box" style={{ flex: '0 0 400px', maxWidth: '400px' }}>
      {renderInputPanel()}
      {renderResultPanel()}
    </div>
  )
}

export default CalculatorUnit
