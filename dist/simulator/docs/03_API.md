# API接口文档

## 一、全局快捷函数

| 函数名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `$(id)` | `id`: String - 元素ID | HTMLElement/null | 获取DOM元素 |
| `getNum(id)` | `id`: String - 元素ID | Number | 获取输入框数值 |
| `getChecked(id)` | `id`: String - 元素ID | Boolean | 获取复选框状态 |
| `setVal(id, val)` | `id`: String, `val`: Any | void | 设置输入框值 |
| `setChecked(id, val)` | `id`: String, `val`: Boolean | void | 设置复选框状态 |
| `generateId()` | 无 | String | 生成唯一ID |
| `showToast(msg)` | `msg`: String - 消息内容 | void | 显示提示消息 |

## 二、AppState类（window.app）

### 初始化与状态管理

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `init()` | 无 | void | 初始化应用 |
| `loadPlans()` | 无 | void | 加载方案列表 |
| `savePlans()` | 无 | void | 保存方案列表 |
| `getActivePlan()` | 无 | Object/null | 获取当前活跃方案 |
| `switchPlan(planId)` | `planId`: String | void | 切换到指定方案 |

### 方案操作

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `newPlan()` | 无 | void | 创建新方案 |
| `clonePlan()` | 无 | void | 复制当前方案 |
| `deletePlan(planId)` | `planId`: String | void | 删除指定方案 |
| `renamePlan(planId, newName)` | `planId`: String, `newName`: String | void | 重命名方案 |

### 数据操作

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `loadFormData()` | 无 | void | 加载表单数据 |
| `saveFormData()` | 无 | void | 保存表单数据 |
| `addAffix(zone)` | `zone`: 'a'/'b'/'leg' | void | 添加词缀 |
| `deleteAffix(zone, index)` | `zone`: String, `index`: Number | void | 删除词缀 |
| `toggleAffix(zone, index)` | `zone`: String, `index`: Number | void | 切换词缀启用状态 |
| `updateAffixName(zone, index, value)` | `zone`: String, `index`: Number, `value`: String | void | 更新词缀名称 |
| `updateAffixVal(zone, index, value)` | `zone`: String, `index`: Number, `value`: Number | void | 更新词缀数值 |

### 计算与对比

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `calculate()` | 无 | void | 执行伤害计算 |
| `applyBD(bdId)` | `bdId`: String | void | 套用BD参考数据 |
| `selectBDForCompare(bdId)` | `bdId`: String | void | 选择BD进行对比 |
| `runBDCompare()` | 无 | void | 执行BD对比 |
| `getAllComparables()` | 无 | Array | 获取所有可对比项 |

### 快照系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `takeSnapshot()` | 无 | void | 保存快照 |
| `restoreSnapshot(id)` | `id`: String | void | 恢复快照 |
| `deleteSnapshot(id)` | `id`: String | void | 删除快照 |
| `renderSnapList()` | 无 | void | 渲染快照列表 |

### 导入导出

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `exportPlan()` | 无 | Promise | 导出当前方案 |
| `exportAsBD()` | 无 | Promise | 导出为BD格式 |
| `handleImportFile(input)` | `input`: HTMLInputElement | Promise | 处理文件导入 |

## 三、Calculator类（D4Sim.Calculator）

### 核心计算方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `calculate(data)` | `data`: Object - 输入数据 | Object/null | 执行伤害计算 |
| `buildStepData(result, inputData)` | `result`: Object, `inputData`: Object | Array | 构建步骤数据 |

### 计算结果结构

```javascript
{
  wpnDamage: Number,      // 武器基础伤害
  afterAdd: Number,       // A类加成后伤害
  afterB: Number,         // B类乘区后伤害
  afterCrit: Number,      // 暴击后伤害
  afterVuln: Number,      // 易伤后伤害
  afterLeg: Number,       // Legendary乘区后伤害
  finalHit: Number,       // 最终伤害(不含怪物减伤)
  finalDisplay: Number,   // 最终伤害(含怪物减伤)
  critHit: Number,        // 暴击伤害值
  normalHit: Number,      // 普通伤害值
  vulnMult: Number,       // 易伤乘数
  legMult: Number,        // Legendary乘数
  opStackBonus: Number,   // 压制叠层加成
  isDot: Boolean          // 是否DoT伤害
}
```

## 四、Storage类（D4Sim.Storage）

### 存储操作

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `loadPlans()` | 无 | Array | 加载方案列表 |
| `savePlans(plans)` | `plans`: Array | void | 保存方案列表 |
| `loadActiveId()` | 无 | String/null | 加载活跃方案ID |
| `saveActiveId(id)` | `id`: String | void | 保存活跃方案ID |

### 导入导出

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `exportPlan(plan)` | `plan`: Object | Promise | 导出方案为JSON（完整方案数据，含所有字段） |
| `exportAsBD(plan)` | `plan`: Object | Promise | **导出为BD格式**（用于添加到天梯参考，需补充icon/tier/desc字段） |
| `importPlan(file)` | `file`: File | Promise<Object/null> | 从文件导入方案 |

#### BD导出功能说明

**核心用途**：将手动配置的方案导出为BD格式，补充元数据后添加到天梯参考列表。

**导出格式**：
```json
{
  "id": "bd_1718012345678",  // 自动生成的唯一ID
  "name": "方案名称",          // 方案名称
  "icon": "⚔",               // 占位符，需手动补充
  "tier": "T? · 待填写",      // 占位符，需手动补充
  "desc": "待填写描述",       // 占位符，需手动补充
  "data": { ... }             // 完整的伤害计算数据
}
```

**使用流程**：
1. 使用 `exportAsBD(plan)` 导出BD文件
2. 手动补充 `icon`、`tier`、`desc` 字段
3. 将完整对象添加到 `js/config.js` 的 `BD_DATA.builds` 数组中

## 五、UIManager类（D4Sim.UIManager）

### 渲染方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `renderPlanTabs()` | 无 | void | 渲染方案标签页 |
| `renderAffix(zone)` | `zone`: 'a'/'b'/'leg' | void | 渲染词缀区域 |
| `renderBDs(builds)` | `builds`: Object/Array | void | 渲染BD列表 |
| `renderResult(result, inputData)` | `result`: Object, `inputData`: Object | void | 渲染计算结果 |
| `renderDPS(dpsData)` | `dpsData`: Object | void | 渲染DPS数据 |

### 页面控制

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `switchPage(pageName)` | `pageName`: String | void | 切换页面 |
| `switchRtab(tabName)` | `tabName`: String | void | 切换右侧标签页 |
| `setStepsMode(mode)` | `mode`: 'simple'/'detail' | void | 设置步骤显示模式 |
| `showToast(message)` | `message`: String | void | 显示提示消息 |

## 六、Config类（D4Sim.Config）

### 配置方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `loadBDData()` | 无 | Object | 加载BD参考数据 |
| `getClassConfig(classId)` | `classId`: String | Object | 获取职业配置 |
| `getDefaultData()` | 无 | Object | 获取默认方案数据 |

### 职业配置结构

```javascript
{
  stat_label: "力量",     // 主属性名称
  stat_div: 1000,        // 主属性系数分母
  icon: "⚔"              // 职业图标
}
```

## 七、Utils工具函数（D4Sim.Utils）

### 数值处理

| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `affixTotal(arr)` | `arr`: Array | Number | 计算词缀合计 |
| `calcBMult(arr)` | `arr`: Array | Number | 计算B类乘数 |
| `formatNumber(n)` | `n`: Number | String | 格式化数字 |

### DOM操作

| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `$(id)` | `id`: String | HTMLElement/null | 获取DOM元素 |
| `getNum(id)` | `id`: String | Number | 获取数值 |
| `getChecked(id)` | `id`: String | Boolean | 获取复选框状态 |
| `setVal(id, val)` | `id`: String, `val`: Any | void | 设置值 |
| `setChecked(id, val)` | `id`: String, `val`: Boolean | void | 设置复选框 |

### 工具函数

| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `generateId()` | 无 | String | 生成唯一ID |
| `showToast(msg)` | `msg`: String | void | 显示Toast提示 |