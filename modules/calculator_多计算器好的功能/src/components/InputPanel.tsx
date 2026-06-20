import { useState, useRef } from 'react'
import { useDamageStore, CLASSES, type AffixItem, type DamageInputs } from '../store/damageStore'
import { usePlanStore } from '../store/planStore'
import LoadModal, { SaveModal, saveConfigToStorage } from './LoadModal'

function InputPanel() {
  const { inputs, updateInput, addAffix, removeAffix, setInputs } = useDamageStore()
  const { activeId, updatePlanData, plans, renamePlan, exportPlan, importPlan, updatePlanData: updatePlan } = usePlanStore()
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const activePlan = plans.find(p => p.id === activeId)

  const handleSave = (name: string) => {
    const success = saveConfigToStorage(name, inputs)
    if (success) {
      alert(`方案「${name}」已保存到浏览器存储！`)
      // 同时更新当前方案名称
      if (activeId) {
        renamePlan(activeId, name)
      }
    } else {
      alert('保存失败！')
    }
  }

  const handleLoad = (data: DamageInputs, name: string) => {
    // 更新damageStore
    setInputs(data)
    // 更新planStore
    if (activeId) {
      updatePlan(activeId, data)
      renamePlan(activeId, name)
    }
    alert(`方案「${name}」已加载！`)
  }

  const handleNameClick = () => {
    if (activePlan) {
      setTempName(activePlan.name)
      setEditingName(true)
    }
  }

  const handleNameSave = () => {
    if (activeId && tempName.trim()) {
      renamePlan(activeId, tempName.trim())
    }
    setEditingName(false)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await importPlan(file)
        alert('导入成功！')
      } catch (err) {
        alert('导入失败：无效的方案文件')
      }
    }
    e.target.value = ''
  }

  const handleChange = (field: string, value: any) => {
    updateInput(field as keyof typeof inputs, value)
    if (activeId) {
      updatePlanData(activeId, { ...inputs, [field]: value })
    }
  }

  const handleAffixChange = (type: 'affix_a' | 'affix_b' | 'multi_leg', index: number, field: keyof AffixItem, value: any) => {
    const newAffixes = [...(inputs[type] || [])]
    newAffixes[index] = { ...newAffixes[index], [field]: value }
    updateInput(type, newAffixes)
    if (activeId) {
      updatePlanData(activeId, { ...inputs, [type]: newAffixes })
    }
  }

  const renderAffixList = (
    type: 'affix_a' | 'affix_b' | 'multi_leg',
    title: string,
    colorClass: string,
    placeholder: string
  ) => {
    const affixes = inputs[type] || []
    
    return (
      <div className="section">
        <div className="section-header">
          <span className={colorClass}>{title}</span>
          <button
            className="d4-btn d4-btn-sm"
            onClick={() => addAffix(type)}
          >
            +
          </button>
        </div>
        
        {affixes.length === 0 ? (
          <div style={{ padding: '8px', color: 'var(--d4-text-secondary)', fontSize: '12px' }}>
            {placeholder}
          </div>
        ) : (
          affixes.map((affix: AffixItem, index: number) => {
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
                  value={affix.val}
                  onChange={(e) => handleAffixChange(type, index, 'val', parseFloat(e.target.value) || 0)}
                  className={`d4-input border-col-${type === 'affix_a' ? 'add' : type === 'affix_b' ? 'multi' : 'crit'}`}
                  style={{ width: '60px' }}
                  disabled={!isEnabled}
                />
                <span style={{ margin: '0 4px' }}>%</span>
                <button
                  className="d4-btn d4-btn-sm"
                  onClick={() => {
                    removeAffix(type, index)
                    if (activeId) {
                      const newAffixes = affixes.filter((_: any, i: number) => i !== index)
                      updatePlanData(activeId, { ...inputs, [type]: newAffixes })
                    }
                  }}
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

  return (
    <div className="section-group">
      {/* 方案名称与操作 */}
      <div className="section">
        <div className="section-header" style={{ justifyContent: 'space-between' }}>
          <span>⚔</span>
          {editingName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
              className="d4-input"
              style={{ width: '150px', textAlign: 'center' }}
              autoFocus
            />
          ) : (
            <span
              onClick={handleNameClick}
              style={{ cursor: 'pointer', color: 'var(--d4-gold)' }}
              title="点击修改方案名称"
            >
              {activePlan?.name || 'D4伤害计算器'}
            </span>
          )}
          <span>⚖</span>
        </div>
        
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => setShowSaveModal(true)}
            className="d4-btn d4-btn-sm"
          >
            保存
          </button>
          <button
            onClick={() => setShowLoadModal(true)}
            className="d4-btn d4-btn-sm"
          >
            加载
          </button>
          <button
            onClick={() => activeId && exportPlan(activeId)}
            className="d4-btn d4-btn-sm"
          >
            导出
          </button>
          <button
            onClick={handleImportClick}
            className="d4-btn d4-btn-sm"
          >
            导入
          </button>
          <button
            onClick={() => {
              if (confirm('确定要重置所有输入吗？')) {
                useDamageStore.getState().reset()
              }
            }}
            className="d4-btn d4-btn-sm"
          >
            重置
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <LoadModal
          isOpen={showLoadModal}
          onClose={() => setShowLoadModal(false)}
          onLoad={handleLoad}
        />

        <SaveModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSave}
          defaultName={activePlan?.name || 'D4伤害计算器'}
        />

        <div className="form-group">
          <label>职业:</label>
          <select
            value={inputs.class_id}
            onChange={(e) => handleChange('class_id', e.target.value)}
            className="d4-select"
            style={{ width: '120px' }}
          >
            {CLASSES.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>主属性:</label>
          <input
            type="number"
            value={inputs.str}
            onChange={(e) => handleChange('str', parseInt(e.target.value) || 0)}
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
            onChange={(e) => handleChange('wpn1', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>副武器伤害:</label>
          <input
            type="number"
            value={inputs.wpn2}
            onChange={(e) => handleChange('wpn2', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>攻击速度(APS):</label>
          <input
            type="number"
            value={inputs.aps}
            onChange={(e) => handleChange('aps', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => handleChange('skill_pct', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>命中次数:</label>
          <input
            type="number"
            value={inputs.hits}
            onChange={(e) => handleChange('hits', parseInt(e.target.value) || 1)}
            className="d4-input border-col-base"
          />
        </div>

        <div className="form-group">
          <label>DoT伤害:</label>
          <input
            type="checkbox"
            checked={inputs.is_dot}
            onChange={(e) => handleChange('is_dot', e.target.checked)}
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
            onChange={(e) => handleChange('crit_chance', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-crit"
          />
        </div>

        <div className="form-group">
          <label>暴击加成:</label>
          <input
            type="checkbox"
            checked={inputs.crit_active}
            onChange={(e) => handleChange('crit_active', e.target.checked)}
            className="d4-checkbox"
          />
          <span style={{ color: 'var(--d4-text-secondary)', fontSize: '12px' }}>×1.5</span>
        </div>

        <div className="form-group">
          <label>易伤加成(%):</label>
          <input
            type="number"
            value={inputs.vuln_add}
            onChange={(e) => handleChange('vuln_add', parseFloat(e.target.value) || 0)}
            className="d4-input border-col-vul"
          />
        </div>

        <div className="form-group">
          <label>易伤生效:</label>
          <input
            type="checkbox"
            checked={inputs.vuln_active}
            onChange={(e) => handleChange('vuln_active', e.target.checked)}
            className="d4-checkbox"
          />
          <span style={{ color: 'var(--d4-text-secondary)', fontSize: '12px' }}>×1.2</span>
        </div>

        <div className="form-group">
          <label>易伤覆盖率(%):</label>
          <input
            type="number"
            value={inputs.vuln_uptime}
            onChange={(e) => handleChange('vuln_uptime', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => handleChange('op_stacks', parseInt(e.target.value) || 0)}
            className="d4-input border-col-op"
          />
        </div>

        <div className="form-group">
          <label>每层加成(%):</label>
          <input
            type="number"
            value={inputs.op_stack_add}
            onChange={(e) => handleChange('op_stack_add', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => handleChange('monster_dr', parseFloat(e.target.value) || 0)}
            className="d4-input"
          />
        </div>

        <div className="form-group">
          <label>应用减伤:</label>
          <input
            type="checkbox"
            checked={inputs.apply_dr}
            onChange={(e) => handleChange('apply_dr', e.target.checked)}
            className="d4-checkbox"
          />
        </div>
      </div>
    </div>
  )
}

export default InputPanel