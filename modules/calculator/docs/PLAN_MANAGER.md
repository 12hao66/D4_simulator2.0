# 方案管理文档

## 概述

方案管理 (PlanManager) 提供伤害计算方案的创建、保存、切换、导出和导入功能，支持多方案管理和快照历史。

## 组件位置

```
src/components/PlanManager.tsx
```

## Store 定义

```typescript
// src/store/planStore.ts

interface PlanStore {
  plans: Plan[]               // 方案列表
  activeId: string | null    // 当前激活方案ID
  snapshots: Snapshot[]      // 快照列表
  maxSnapshots: number       // 最大快照数（5）
  
  // 方案管理
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
  
  // 快照管理
  loadSnapshots: () => void
  saveSnapshots: () => void
  takeSnapshot: () => void
  restoreSnapshot: (snapshotId: string) => void
  deleteSnapshot: (snapshotId: string) => void
}
```

## 数据结构

### Plan - 方案

```typescript
interface Plan {
  id: string           // 唯一标识
  name: string        // 方案名称
  data: DamageInputs  // 完整配置数据
}
```

### Snapshot - 快照

```typescript
interface Snapshot {
  id: string          // 唯一标识
  time: string        // 时间戳 (MM/DD HH:mm)
  planName: string    // 对应方案名称
  data: DamageInputs  // 快照数据
}
```

## 功能说明

### 方案列表

显示所有已保存的方案：

```tsx
<div className="plan-list">
  {plans.map(plan => (
    <div 
      key={plan.id}
      className={`plan-item ${plan.id === activeId ? 'active' : ''}`}
      onClick={() => switchPlan(plan.id)}
    >
      <span className="plan-name">{plan.name}</span>
      <div className="plan-actions">
        <button onClick={(e) => { e.stopPropagation(); handleRename(plan.id) }}>
          重命名
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(plan.id) }}>
          删除
        </button>
      </div>
    </div>
  ))}
</div>
```

### 新建方案

创建空白方案：

```typescript
newPlan: () => {
  const { plans } = get()
  const newPlan: Plan = {
    id: generateId(),
    name: `方案 ${plans.length + 1}`,
    data: getDefaultData()  // 从 BD_DATA 导入默认数据
  }
  set(state => ({
    plans: [...state.plans, newPlan],
    activeId: newPlan.id
  }))
  get().savePlans()
}
```

### 复制方案

克隆当前方案：

```typescript
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
}
```

### 切换方案

切换到指定方案：

```typescript
switchPlan: (planId: string) => {
  const { plans } = get()
  if (plans.find(p => p.id === planId)) {
    set({ activeId: planId })
    get().savePlans()
    // 通知 damageStore 更新数据
  }
}
```

### 重命名方案

修改方案名称：

```typescript
renamePlan: (planId: string, newName: string) => {
  set(state => ({
    plans: state.plans.map(p => 
      p.id === planId ? { ...p, name: newName || '未命名方案' } : p
    )
  }))
  get().savePlans()
}
```

### 删除方案

删除指定方案（至少保留一个）：

```typescript
deletePlan: (planId: string) => {
  const { plans, activeId } = get()
  if (plans.length <= 1) return  // 至少保留一个
  
  const newPlans = plans.filter(p => p.id !== planId)
  let newActiveId = activeId
  
  if (activeId === planId) {
    newActiveId = newPlans[0]?.id || null
  }
  
  set({ plans: newPlans, activeId: newActiveId })
  get().savePlans()
}
```

### 导出方案

导出为JSON文件：

```typescript
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
}
```

### 导入方案

从JSON文件导入：

```typescript
importPlan: async (file: File) => {
  try {
    const content = await file.text()
    const importedPlan = JSON.parse(content) as Plan
    
    // 验证数据完整性
    if (!importedPlan.id || !importedPlan.name || !importedPlan.data) {
      throw new Error('无效的方案文件')
    }
    
    // 生成新ID避免冲突
    const newPlan: Plan = {
      ...importedPlan,
      id: generateId()  // 重新生成ID
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
}
```

## 快照功能

### 保存快照

```typescript
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
  
  // 限制最多保存5个快照
  const newSnapshots = [snapshot, ...snapshots].slice(0, maxSnapshots)
  set({ snapshots: newSnapshots })
  get().saveSnapshots()
}
```

### 恢复快照

```typescript
restoreSnapshot: (snapshotId: string) => {
  const { snapshots, activeId } = get()
  const snapshot = snapshots.find(s => s.id === snapshotId)
  if (!snapshot || !activeId) return
  
  // 更新当前方案数据
  set(state => ({
    plans: state.plans.map(p => 
      p.id === activeId ? { ...p, data: deepClone(snapshot.data) } : p
    )
  }))
  get().savePlans()
}
```

### 快照列表显示

```tsx
<div className="snapshot-list">
  <h4>历史快照 ({snapshots.length}/{maxSnapshots})</h4>
  {snapshots.map(snap => (
    <div key={snap.id} className="snapshot-item">
      <div className="snapshot-info">
        <span className="snapshot-time">{snap.time}</span>
        <span className="snapshot-name">{snap.planName}</span>
      </div>
      <div className="snapshot-actions">
        <button onClick={() => restoreSnapshot(snap.id)}>恢复</button>
        <button onClick={() => deleteSnapshot(snap.id)}>删除</button>
      </div>
    </div>
  ))}
</div>
```

## 数据存储

### localStorage Keys

| Key | 说明 |
|-----|------|
| `d4_s13_v2` | 方案数据 |
| `d4_s13_snaps` | 快照数据 |

### 存储格式

```typescript
// d4_s13_v2
{
  plans: Plan[],
  activeId: string
}

// d4_s13_snaps
Snapshot[]
```

## 生命周期

### 初始化

```typescript
// App.tsx
useEffect(() => {
  loadPlans()      // 加载方案
  loadSnapshots()  // 加载快照
  
  // 同步到 damageStore
  const plan = getActivePlan()
  if (plan) {
    setInputs(plan.data)
  }
}, [])
```

### 同步机制

```typescript
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
```

## 工具函数

### generateId

生成唯一ID：

```typescript
const generateId = (): string => {
  return 'p' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}
```

### deepClone

深拷贝数据：

```typescript
const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
```

## 样式定义

```css
.plan-list {
  background: #1a1a1a;
  border: 1px solid var(--d4-border);
  border-radius: 2px;
  max-height: 200px;
  overflow-y: auto;
}

.plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--d4-border);
  cursor: pointer;
}

.plan-item:hover {
  background: rgba(165, 9, 5, 0.2);
}

.plan-item.active {
  background: var(--d4-red);
  color: #fff;
}

.plan-name {
  font-weight: bold;
}

.plan-actions button {
  background: transparent;
  border: none;
  color: var(--d4-gold);
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
}

.plan-actions button:hover {
  text-decoration: underline;
}

.snapshot-list {
  margin-top: 16px;
}

.snapshot-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: var(--d4-bg-section);
  border: 1px solid var(--d4-border);
  border-radius: 2px;
  margin-bottom: 4px;
}

.snapshot-time {
  color: var(--d4-gold);
  margin-right: 8px;
}

.snapshot-name {
  color: var(--d4-text);
}
```

## JSON文件格式

### 导出文件示例

```json
{
  "id": "p1234567890_abc123",
  "name": "野蛮人旋风斩",
  "data": {
    "class_id": "barbarian",
    "wpn1": 3000,
    "wpn2": 0,
    "aps": 1.2,
    "str": 5000,
    "skill_pct": 215,
    "is_dot": false,
    "hits": 1,
    "affix_a": [...],
    "affix_b": [...],
    "multi_leg": [...],
    "crit_chance": 50,
    "crit_active": true,
    "vuln_add": 0,
    "vuln_active": true,
    "vuln_uptime": 80,
    "op_stacks": 0,
    "op_stack_add": 15,
    "monster_dr": 80,
    "apply_dr": false
  }
}
```
