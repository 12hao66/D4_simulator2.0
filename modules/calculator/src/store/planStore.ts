import { create } from 'zustand'
import type { DamageInputs } from './damageStore'
import { getDefaultData } from '../config/BD_DATA'

export interface Plan {
  id: string
  name: string
  data: DamageInputs
}

export interface Snapshot {
  id: string
  time: string
  planName: string
  data: DamageInputs
}

interface PlanStore {
  plans: Plan[]
  activeId: string | null
  snapshots: Snapshot[]
  maxSnapshots: number
  
  loadPlans: () => void
  savePlans: () => void
  getActivePlan: () => Plan | undefined
  switchPlan: (planId: string) => void
  newPlan: () => void
  clonePlan: () => void
  deletePlan: (planId: string) => void
  renamePlan: (planId: string, newName: string) => void
  updatePlanData: (planId: string, data: DamageInputs) => void
  exportPlan: (planId: string) => void
  importPlan: (file: File) => Promise<void>
  
  loadSnapshots: () => void
  saveSnapshots: () => void
  takeSnapshot: () => void
  restoreSnapshot: (snapshotId: string) => void
  deleteSnapshot: (snapshotId: string) => void
}

const STORAGE_KEYS = {
  PLANS: 'd4_s13_v2',
  SNAPS: 'd4_s13_snaps'
}

const generateId = (): string => {
  return 'p' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  activeId: null,
  snapshots: [],
  maxSnapshots: 5,
  
  loadPlans: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PLANS)
      const parsed = stored ? JSON.parse(stored) : null
      
      if (parsed && Array.isArray(parsed.plans)) {
        set({ plans: parsed.plans, activeId: parsed.activeId })
      } else {
        // 创建默认方案
        const defaultPlan: Plan = {
          id: generateId(),
          name: 'D4伤害计算器',
          data: getDefaultData()
        }
        set({ plans: [defaultPlan], activeId: defaultPlan.id })
        get().savePlans()
      }
    } catch {
      const defaultPlan: Plan = {
        id: generateId(),
        name: 'D4伤害计算器',
        data: getDefaultData()
      }
      set({ plans: [defaultPlan], activeId: defaultPlan.id })
    }
  },
  
  savePlans: () => {
    const { plans, activeId } = get()
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify({ plans, activeId }))
  },
  
  getActivePlan: () => {
    const { plans, activeId } = get()
    return plans.find(p => p.id === activeId)
  },
  
  switchPlan: (planId: string) => {
    const { plans } = get()
    if (plans.find(p => p.id === planId)) {
      set({ activeId: planId })
      get().savePlans()
    }
  },
  
  newPlan: () => {
    const { plans } = get()
    const newPlan: Plan = {
      id: generateId(),
      name: `方案 ${plans.length + 1}`,
      data: getDefaultData()
    }
    set(state => ({
      plans: [...state.plans, newPlan],
      activeId: newPlan.id
    }))
    get().savePlans()
  },
  
  clonePlan: () => {
    const { plans, activeId } = get()
    const activePlan = plans.find(p => p.id === activeId)
    if (!activePlan) return
    
    const clonedPlan: Plan = {
      id: generateId(),
      name: activePlan.name + ' (副本)',
      data: deepClone(activePlan.data)
    }
    set(state => ({
      plans: [...state.plans, clonedPlan],
      activeId: clonedPlan.id
    }))
    get().savePlans()
  },
  
  deletePlan: (planId: string) => {
    const { plans, activeId } = get()
    if (plans.length <= 1) return
    
    const newPlans = plans.filter(p => p.id !== planId)
    let newActiveId = activeId
    
    if (activeId === planId) {
      newActiveId = newPlans[0]?.id || null
    }
    
    set({ plans: newPlans, activeId: newActiveId })
    get().savePlans()
  },
  
  renamePlan: (planId: string, newName: string) => {
    set(state => ({
      plans: state.plans.map(p => 
        p.id === planId ? { ...p, name: newName || '未命名方案' } : p
      )
    }))
    get().savePlans()
  },
  
  updatePlanData: (planId: string, data: DamageInputs) => {
    set(state => ({
      plans: state.plans.map(p => 
        p.id === planId ? { ...p, data: deepClone(data) } : p
      )
    }))
    get().savePlans()
  },
  
  exportPlan: (planId: string) => {
    const { plans } = get()
    const plan = plans.find(p => p.id === planId)
    if (!plan) return
    
    const content = JSON.stringify(plan, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `d4_plan_${plan.name.replace(/[\\/:*?"<>|]/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  },
  
  importPlan: async (file: File) => {
    try {
      const content = await file.text()
      const importedPlan = JSON.parse(content) as Plan
      
      if (!importedPlan.id || !importedPlan.name || !importedPlan.data) {
        throw new Error('无效的方案文件')
      }
      
      // 生成新ID避免冲突
      const newPlan: Plan = {
        ...importedPlan,
        id: generateId()
      }
      
      set(state => ({
        plans: [...state.plans, newPlan],
        activeId: newPlan.id
      }))
      get().savePlans()
    } catch (e) {
      console.error('导入方案失败:', e)
      throw e
    }
  },
  
  loadSnapshots: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SNAPS)
      const parsed = stored ? JSON.parse(stored) : []
      set({ snapshots: Array.isArray(parsed) ? parsed : [] })
    } catch {
      set({ snapshots: [] })
    }
  },
  
  saveSnapshots: () => {
    const { snapshots } = get()
    localStorage.setItem(STORAGE_KEYS.SNAPS, JSON.stringify(snapshots))
  },
  
  takeSnapshot: () => {
    const { plans, activeId, snapshots, maxSnapshots } = get()
    const activePlan = plans.find(p => p.id === activeId)
    if (!activePlan) return
    
    const now = new Date()
    const time = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    
    const snapshot: Snapshot = {
      id: 'snap_' + Date.now(),
      time,
      planName: activePlan.name,
      data: deepClone(activePlan.data)
    }
    
    const newSnapshots = [snapshot, ...snapshots].slice(0, maxSnapshots)
    set({ snapshots: newSnapshots })
    get().saveSnapshots()
  },
  
  restoreSnapshot: (snapshotId: string) => {
    const { snapshots, activeId } = get()
    const snapshot = snapshots.find(s => s.id === snapshotId)
    if (!snapshot || !activeId) return
    
    set(state => ({
      plans: state.plans.map(p => 
        p.id === activeId ? { ...p, data: deepClone(snapshot.data) } : p
      )
    }))
    get().savePlans()
  },
  
  deleteSnapshot: (snapshotId: string) => {
    set(state => ({
      snapshots: state.snapshots.filter(s => s.id !== snapshotId)
    }))
    get().saveSnapshots()
  }
}))