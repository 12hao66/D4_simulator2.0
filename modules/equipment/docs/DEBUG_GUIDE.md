# 装备模拟器调试指南

> 版本: v1.1.0
> 更新日期: 2026-06-17

## 1. 调试环境配置

### 1.1 开发服务器启动

```powershell
# 启动装备模拟器开发服务器
cd modules/equipment
npm.cmd run dev

# 启动数据库模块开发服务器
cd modules/database
npm.cmd run dev
```

### 1.2 构建并部署

```powershell
# 构建装备模拟器
cd modules/equipment
npm.cmd run build

# 复制到 dist 目录
Copy-Item -Path 'modules/equipment/dist/*' -Destination 'dist/equipment/' -Recurse -Force

# 启动统一服务
cd dist
http-server -p 8080
```

### 1.3 浏览器调试工具

- **开发者工具**: F12
- **强制刷新**: Ctrl + Shift + R（清除缓存）
- **控制台**: Console 面板查看日志
- **网络请求**: Network 面板查看 API 请求

---

## 2. 常见问题排查

### 2.1 词缀符号显示错误

#### 问题描述
词缀 `×26% 暴击伤害增倍` 在某个环节显示为 `+26% 暴击伤害增倍`

#### 排查步骤

1. **检查词缀 JSON 数据**
   ```powershell
   # 查看词缀数据文件
   Get-Content 'dist/database/data/affixes.json' | Select-String '暴击伤害增倍'
   ```
   确认 `calculationType` 字段值是否正确

2. **打开浏览器控制台**
   - F12 → Console
   - 查看调试日志输出

3. **追踪数据流向**
   ```
   词缀JSON → 词缀选择弹窗 → 确认添加 → 词缀列表 → 确认装备 → 装备槽显示
   ```

4. **检查关键代码位置**
   | 环节 | 文件 | 检查内容 |
   |-----|------|---------|
   | 词缀类型定义 | `types/equipment.ts` | `Affix` 接口是否包含 `calculationType` |
   | 词缀选择弹窗 | `EquipmentSelectorNew.tsx` | 显示时是否使用 `calculationType` |
   | 确认添加 | `EquipmentSelectorNew.tsx` | 是否传递 `calculationType` |
   | 确认装备 | `EquipmentSelectorNew.tsx` | `handleConfirm` 是否保存 `calculationType` |
   | 装备槽显示 | `EquipmentTooltip.tsx` | 是否使用 `calculationType` 判断符号 |

#### 已修复的问题

| 问题 | 原因 | 修复方案 |
|-----|------|---------|
| 词缀选择弹窗显示 `+` | 硬编码符号，未使用 `calculationType` | 改为根据 `calculationType` 显示符号 |
| 确认装备后显示 `+` | `handleConfirm` 中 `type` 硬编码为 `'additive'` | 传递 `a.calculationType` |
| 选择暗金装备后显示 `+` | `handleSelectUnique` 未传递 `calculationType` | 从词缀数据库查找并传递 |
| 装备槽显示 `+` | `EquipmentTooltip.tsx` 使用 `position` 判断 | 改为使用 `calculationType` 判断 |

---

### 2.2 数据加载失败

#### 问题描述
装备选择器无法加载词缀/暗金/威能数据

#### 排查步骤

1. **检查网络请求**
   - F12 → Network
   - 筛选 `affixes.json`、`uniques.json` 等
   - 查看请求状态码和响应内容

2. **检查数据路径**
   ```typescript
   // 检查 appConfig.ts 中的路径配置
   export const APP_CONFIG = {
     databaseBaseUrl: '../database/'
   }
   ```

3. **检查文件是否存在**
   ```powershell
   Get-ChildItem 'dist/database/data/' -Filter '*.json'
   ```

4. **清除浏览器缓存**
   - Ctrl + Shift + R 强制刷新
   - 或在 Network 面板勾选 "Disable cache"

---

### 2.3 图片显示不正确

#### 问题描述
装备/宝石/符文图片显示错误或缺失

#### 排查步骤

1. **检查图片路径**
   ```typescript
   // 检查 getDatabaseImageUrl 函数
   export function getDatabaseImageUrl(iconPath: string): string {
     const cleanPath = iconPath.replace('./', '')
     return `${APP_CONFIG.databaseBaseUrl}${cleanPath}`
   }
   ```

2. **检查图片文件是否存在**
   ```powershell
   Get-ChildItem 'dist/database/images/' -Recurse
   ```

3. **检查网络请求**
   - F12 → Network
   - 筛选图片请求，查看 404 错误

4. **检查路径判断逻辑**
   ```typescript
   // 暗金装备图标使用数据库路径
   // 槽位图标使用原始相对路径
   src={item.icon.startsWith('./images/items/') ? getDatabaseImageUrl(item.icon) : item.icon}
   ```

---

### 2.4 首页导航问题

#### 问题描述
点击菜单项后右侧内容区未显示或显示错误

#### 排查步骤

1. **检查路径映射配置**
   ```typescript
   // index.html 中的 paths 对象
   const paths = {
     calculator: 'dist/calculator/',
     equipment: 'dist/equipment/',
     database: 'dist/database/index.html',
     dataMaintenance: 'dist/database/index.html?mode=maintenance'
   };
   ```

2. **检查 iframe 加载**
   - F12 → Network
   - 检查 iframe 的 src 属性对应的请求

3. **检查模块是否已构建**
   ```powershell
   Get-ChildItem 'dist/' -Recurse -Filter 'index.html'
   ```

---

## 3. 调试日志使用

### 3.1 内置调试日志

装备选择器中已内置调试日志，用于追踪词缀数据传递：

```typescript
// EquipmentSelectorNew.tsx - handleConfirm 函数
console.log('确认装备 - allAffixes:', JSON.stringify(allAffixes, null, 2))
console.log('确认装备 - equipmentItem.affixes:', JSON.stringify(equipmentItem.affixes, null, 2))
```

### 3.2 添加临时调试日志

在需要调试的位置添加：

```typescript
console.log('调试标签 - 变量名:', JSON.stringify(variable, null, 2))
```

### 3.3 查看调试日志

1. 打开浏览器控制台 (F12 → Console)
2. 执行操作流程
3. 查看日志输出，检查数据是否正确传递

---

## 4. 测试流程

### 4.1 词缀符号显示测试

1. **词缀管理测试**
   - 打开数据库管理 → 词缀管理
   - 查看词缀 `calculationType` 是否正确
   - 编辑词缀，修改计算类型，保存

2. **词缀选择弹窗测试**
   - 打开装备管理 → 选择装备
   - 点击"选择词缀"
   - 查看词缀列表中的符号是否正确
   - 勾选乘法词缀，确认添加

3. **词缀列表测试**
   - 查看已添加的词缀显示是否正确
   - 修改词缀的计算类型
   - 查看符号是否联动更新

4. **装备槽显示测试**
   - 确认装备
   - 查看装备槽卡片中的词缀显示
   - 确认符号是否正确

### 4.2 词缀计算类型统一测试

```
词缀管理 → 词缀选择弹窗 → 确认添加 → 词缀列表 → 确认装备 → 装备槽显示
    ↓            ↓            ↓           ↓            ↓            ↓
 检查类型     检查符号     检查传递    检查显示     检查保存     检查渲染
```

### 4.3 首页导航测试

1. **菜单切换测试**
   - 点击各个菜单项
   - 检查右侧内容区是否正确加载
   - 检查状态栏标题是否更新

2. **菜单收起/展开测试**
   - 点击收起按钮
   - 检查菜单是否收缩为图标模式
   - 再次点击展开，检查恢复正常

3. **数据维护入口测试**
   - 点击"数据维护"菜单
   - 检查是否自动进入维护模式

---

## 5. 常用调试命令

### 5.1 查看词缀数据

```powershell
# 查看所有乘法词缀
Get-Content 'dist/database/data/affixes.json' | Select-String 'multiplicative'

# 查看特定词缀
Get-Content 'dist/database/data/affixes.json' | Select-String '暴击伤害增倍'
```

### 5.2 清除构建缓存

```powershell
# 清除 Vite 缓存
Remove-Item -Recurse -Force -Path 'modules/equipment/node_modules/.vite'

# 重新构建
cd modules/equipment
npm.cmd run build
```

### 5.3 检查类型定义

```powershell
# 查看 Affix 类型定义
Get-Content 'modules/equipment/src/types/equipment.ts' | Select-String 'interface Affix' -Context 0,10
```

---

## 6. 问题记录模板

### 问题描述
- **现象**：
- **预期**：
- **实际**：

### 排查过程
1.
2.
3.

### 根本原因


### 修复方案


### 相关文件
- 文件1：
- 文件2：

---

## 更新历史

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| v1.1.0 | 2026-06-17 | 添加首页导航调试、词缀计算类型统一说明、图片路径修复说明 |
| v1.0.0 | 2026-06-16 | 初始版本，记录词缀符号显示问题排查方法 |
