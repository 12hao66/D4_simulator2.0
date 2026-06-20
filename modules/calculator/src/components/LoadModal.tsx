import { useState, useEffect } from 'react'
import type { DamageInputs } from '../store/damageStore'

interface StoredConfig {
  name: string
  data: DamageInputs
  savedAt: string
}

interface LoadModalProps {
  isOpen: boolean
  onClose: () => void
  onLoad: (data: DamageInputs, name: string) => void
}

const STORAGE_KEY = 'd4_damage_configs'

function LoadModal({ isOpen, onClose, onLoad }: LoadModalProps) {
  const [configs, setConfigs] = useState<StoredConfig[]>([])

  useEffect(() => {
    if (isOpen) {
      loadConfigs()
    }
  }, [isOpen])

  const loadConfigs = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const configList = Object.entries(parsed).map(([name, data]: [string, any]) => ({
          name,
          data: data as DamageInputs,
          savedAt: data.savedAt || ''
        }))
        setConfigs(configList)
      } else {
        setConfigs([])
      }
    } catch {
      setConfigs([])
    }
  }

  const handleDelete = (name: string) => {
    if (confirm(`Delete this entry from browser storage?`)) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          delete parsed[name]
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
          loadConfigs()
        }
      } catch (e) {
        console.error('删除失败:', e)
      }
    }
  }

  const handleLoad = (config: StoredConfig) => {
    onLoad(config.data, config.name)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up-message-box" onClick={e => e.stopPropagation()}>
        <div className="pop-up-content">
          <h3 style={{ margin: '0 0 16px 0', textAlign: 'center', color: 'var(--d4-gold)', fontSize: '16px' }}>
            加载方案
          </h3>

          {configs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--d4-text-secondary)' }}>
              <p>浏览器存储中未找到数据</p>
              <p style={{ fontSize: '12px' }}>请先保存一个方案或从文件导入</p>
            </div>
          ) : (
            <div className="list-container">
              {configs.map((config, index) => (
                <div
                  key={index}
                  className="list-item button-style"
                >
                  <div
                    className="list-item-desc"
                    onClick={() => handleLoad(config)}
                  >
                    {config.name}
                  </div>
                  <button
                    onClick={() => handleDelete(config.name)}
                    style={{
                      background: 'var(--d4-gold)',
                      color: '#000',
                      border: 'none',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ─
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="pop-up-buttons">
            <button onClick={onClose} className="button-style">
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadModal

// 导出保存和加载的工具函数
export const saveConfigToStorage = (name: string, data: DamageInputs) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : {}
    parsed[name] = { ...data, savedAt: new Date().toLocaleString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    return true
  } catch (e) {
    console.error('保存失败:', e)
    return false
  }
}

export const hasStoredConfigs = (): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return !!stored && Object.keys(JSON.parse(stored)).length > 0
  } catch {
    return false
  }
}

// 导出保存弹窗组件
interface SaveModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
  defaultName: string
}

export function SaveModal({ isOpen, onClose, onSave, defaultName }: SaveModalProps) {
  const [name, setName] = useState(defaultName)

  useEffect(() => {
    if (isOpen) {
      setName(defaultName)
    }
  }, [isOpen, defaultName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave(name.trim())
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up-message-box" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="pop-up-content">
          <h3 style={{ margin: '0 0 16px 0', textAlign: 'center', color: 'var(--d4-gold)', fontSize: '16px' }}>
            保存方案
          </h3>
          
          <div className="form-section">
            <label style={{ color: 'var(--d4-text)', marginBottom: '4px' }}>
              方案名称:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="d4-input"
              style={{ width: '100%' }}
              autoFocus
              required
            />
          </div>

          <div className="pop-up-buttons">
            <button type="submit" className="button-style">
              保存
            </button>
            <button type="button" onClick={onClose} className="button-style">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
