# 🏗️ 暗黑4模拟器 - 构建指南

## 📋 目录

1. [构建脚本说明](#构建脚本说明)
2. [构建流程](#构建流程)
3. [常见错误与解决方案](#常见错误与解决方案)
4. [构建注意事项](#构建注意事项)
5. [服务启动说明](#服务启动说明)

---

## 🔧 构建脚本说明

### build-all.ps1（推荐）

**位置：** `D:\ClaudeProject\D4_simulator2.0\build-all.ps1`

**功能：** 统一构建所有模块到 `dist/` 目录

**执行步骤：**
1. 清理旧的 `dist/` 目录
2. 依次构建所有 React 模块（calculator、database、equipment、skills、paragon、build、bbs）
3. 将构建产物复制到 `dist/` 对应目录
4. 复制静态模块（simulator）到 `dist/`
5. 复制首页导航 `index.html` 到 `dist/`

**使用方式：**
```powershell
cd D:\ClaudeProject\D4_simulator2.0
.\build-all.ps1
```

### build-all.bat（不推荐）

**位置：** `D:\ClaudeProject\D4_simulator2.0\build-all.bat`

**问题：**
- 直接复制 `skills` 和 `paragon` 模块的源代码，而不是先构建
- 可能导致资源路径错误
- 已被 `build-all.ps1` 替代

---

## 🚀 构建流程

### 完整构建与启动步骤

```powershell
# 1. 进入项目目录
cd D:\ClaudeProject\D4_simulator2.0

# 2. 运行构建脚本（生成 dist 目录）
.\build-all.ps1

# 3. 切换到 dist 目录
cd dist

# 4. 启动静态服务器（端口8080）
npx http-server -p 8080 -s -c-1

# 5. 访问导航页
# http://localhost:8080
```

### 构建输出结构

```
dist/
├── index.html          # 首页导航
├── calculator/         # 伤害计算器 3.0（构建后）
├── simulator/          # 伤害计算器 2.0（静态文件）
├── equipment/          # 装备模拟器（构建后）
├── skills/             # 技能模拟器（构建后）
├── paragon/            # 巅峰盘模拟器（构建后）
├── build/              # 构筑浏览器（构建后）
├── bbs/                # 社区论坛（构建后）
└── database/           # 数据库管理（构建后）
```

---

## ❌ 常见错误与解决方案

### 错误1：导航链接报404错误

**现象：** 点击导航菜单后页面无法加载，控制台显示404错误

**根源：** 根目录 `index.html` 使用了错误路径 `dist/calculator/`，构建后被复制到 `dist/` 目录，导致路径错误

**解决方案：**
```powershell
# 错误路径
dist/calculator/ → dist/dist/calculator/ (404)

# 正确路径
calculator/ → dist/calculator/ (正确)
```

**修复文件：** `D:\ClaudeProject\D4_simulator2.0\index.html`
```javascript
// 修改前
const paths = {
  calculator: 'dist/calculator/',
  skills: 'dist/skills/',
  ...
};

// 修改后
const paths = {
  calculator: 'calculator/',
  skills: 'skills/',
  ...
};
```

### 错误2：服务启动后路径不对

**现象：** 服务已启动，但导航模块无法访问

**根源：** 服务从项目根目录启动，而不是从 `dist/` 目录启动

**解决方案：**
```powershell
# 错误方式
cd D:\ClaudeProject\D4_simulator2.0
npx serve -l 8080  # 服务根目录是项目根目录

# 正确方式
cd D:\ClaudeProject\D4_simulator2.0\dist
npx serve -l 8080  # 服务根目录是 dist 目录
```

### 错误3：paragon/skills 模块资源加载失败

**现象：** 模块页面显示空白，控制台显示 CSS/JS 资源404

**根源：** `vite.config.ts` 配置了绝对路径 `base: '/dist/paragon/'`

**解决方案：** 修改 `modules/paragon/vite.config.ts`
```typescript
// 修改前
export default defineConfig({
  base: '/dist/paragon/',
  ...
});

// 修改后
export default defineConfig({
  base: '',  // 使用相对路径
  ...
});
```

### 错误4：旧版脚本未正确构建模块

**现象：** skills/paragon 模块功能不正常

**根源：** `build-all.bat` 直接复制源代码而不是构建产物

**解决方案：** 使用 `build-all.ps1` 替代

### 错误5：服务启动后不稳定，过一会就停止

**现象：** 服务启动后可以访问，但过一段时间后无法访问

**根源：** 使用 `npx serve -l 8080` 启动服务，该工具在某些环境下可能因为终端断开或后台运行而停止

**解决方案：** 使用 `http-server` 替代 `serve`
```powershell
# 错误方式（不稳定）
npx -y serve -l 8080

# 正确方式（稳定）
npx http-server -p 8080 -s -c-1
```

**推荐理由：**
- `http-server` 更稳定，适合长期运行
- `-s` 参数启用静默模式，减少日志输出
- 不会因为终端断开而停止服务

### 错误6：CSV导入功能无响应

**现象：** 点击「导入CSV」按钮选择文件后，没有任何反应，预览表格不显示数据

**根源：** 两个问题叠加
1. **编码问题**：Excel导出的CSV文件使用GBK编码，而代码默认用UTF-8读取，导致中文乱码
2. **构建失败**：存在未使用的函数 `isGarbageContent`，导致TypeScript编译失败，代码未更新

**解决方案：**
```typescript
// 1. 修改CSV导入逻辑，支持UTF-8和GBK编码
const handleImportCSV = (event) => {
  // 先尝试UTF-8解码
  let content = new TextDecoder('utf-8').decode(arrayBuffer);
  
  // 检查表头是否包含预期的中文关键词
  const expectedHeaders = ['名称', '稀有度', '分类', ...];
  const hasValidHeader = expectedHeaders.some(header => firstLine?.includes(header));
  
  // 如果UTF-8解码结果无效，尝试GBK解码
  if (!hasValidHeader) {
    content = new TextDecoder('GBK').decode(arrayBuffer);
  }
};

// 2. 删除未使用的函数
// 删除 isGarbageContent 函数（如果未使用）
```

**修复文件：** `modules/database/src/components/AffixManager.tsx`

### 错误7：浏览器缓存导致修改不生效

**现象：** 代码已修改并重新构建，但浏览器显示的仍然是旧版本

**根源：** 浏览器缓存了旧的JS/CSS文件

**解决方案：**
```powershell
# 强制刷新浏览器（清除缓存）
# Windows/Linux: Ctrl + Shift + R
# Mac: Cmd + Shift + R
```

**验证方法：**
1. 修改按钮文本（如「导入CSV」→「新导入CSV」）
2. 重新构建项目
3. 强制刷新浏览器
4. 如果按钮文本更新，说明代码生效

### 错误8：CSV导入时空单位被错误解析为%

**现象：** 导入CSV文件时，单位列为空的数据全部被解析成 `%`

**根源：** 代码中使用了 `unit || '%'`，当单位为空时默认填充为 `%`

**解决方案：** 修改 `AffixManager.tsx`
```typescript
// 修改前
unit: unit || '%',

// 修改后
unit: unit || '',
```

**修复文件：** `modules/database/src/components/AffixManager.tsx`

### 错误9：系统数据更新后用户看不到最新数据

**现象：** 服务器已更新词缀、宝石等数据，但用户刷新页面后仍然显示旧数据

**根源：** 使用 zustand 的 `persist` 中间件将所有数据缓存到 localStorage，包括系统数据

**解决方案：** 使用 `partialize` 只持久化用户数据
```typescript
// 修改前：持久化了所有数据
partialize: (state) => ({
  skills: state.skills,
  amulets: state.amulets,
  craftingMaterials: state.craftingMaterials,
  runes: state.runes,
  gems: state.gems,
  // 系统数据也被缓存了
})

// 修改后：只持久化用户数据
partialize: () => ({})
```

**架构说明：**
| 数据类型 | 存储位置 | 说明 |
|---------|---------|------|
| 系统数据（词缀、宝石、暗金装备等） | **内存** | 每次刷新从 JSON 加载，永远是最新的 |
| 用户自定义数据 | **localStorage** | 通过 customDataStore 持久化 |

**修复文件：** `modules/database/src/store/databaseStore.ts`

### 错误10：Mock数据覆盖真实JSON数据

**现象：** 通过导航页访问数据库时，词缀/威能数据显示10条；直接访问数据库页面时，显示316条

**根源：** `loadMockData()` 函数将硬编码的10条词缀数据覆盖了从JSON加载的316条真实数据

```typescript
// App.tsx 中的问题代码
if (skills.length === 0) {
  loadMockData();  // ❌ 这个函数会覆盖 ALL 数据，包括 affixes！
}
```

**解决方案：** 完全移除 loadMockData 相关代码
- 删除 mockData.ts、uniqueEquipmentData.ts、legendaryPowersData.ts
- 移除 App.tsx 中的 loadMockData 调用
- 移除 databaseStore.ts 中的 loadMockData 函数

**架构说明：**
- 所有数据统一从 JSON 文件加载
- 不再需要 mock 数据作为后备

**修复文件：**
- `modules/database/src/App.tsx`（移除 loadMockData 调用）
- `modules/database/src/store/databaseStore.ts`（移除 loadMockData 函数）
- `modules/database/src/data/mockData.ts`（已删除）
- `modules/database/src/data/uniqueEquipmentData.ts`（已删除）
- `modules/database/src/data/legendaryPowersData.ts`（已删除）

---

## ⚠️ 构建注意事项

### 1. 环境要求

| 依赖 | 版本 | 说明 |
|------|------|------|
| Node.js | ≥ 18.x | 构建工具依赖 |
| npm | ≥ 9.x | 包管理器 |
| PowerShell | ≥ 5.1 | 运行 build-all.ps1 |

### 2. 构建前准备

```powershell
# 确保所有模块依赖已安装
cd D:\ClaudeProject\D4_simulator2.0
npm install  # 如果有根目录 package.json

# 或者逐个模块安装
cd modules/calculator
npm install
cd ../equipment
npm install
cd ../database
npm install
cd ../skills
npm install
cd ../paragon
npm install
cd ../build
npm install
cd ../bbs
npm install
```

### 3. 构建脚本输出说明

```powershell
.\build-all.ps1
# 输出示例：
# ==============================================
#         Diablo 4 Simulator - Build Script
# ==============================================
#
# [1/3] Cleaning output directory...
#       OK Output directory ready
#
# [2/3] Building modules...
#       Building: calculator...
#       OK calculator built successfully
#       Building: database...
#       OK database built successfully
#       Building: equipment...
#       OK equipment built successfully
#       Building: skills...
#       OK skills built successfully
#       Building: paragon...
#       OK paragon built successfully
#       Building: build...
#       OK build built successfully
#       Building: bbs...
#       OK bbs built successfully
#
# [3/3] Deploying to dist...
#       OK calculator deployed
#       ...
# ==============================================
#              Build Complete!
# ==============================================
#
# Output: D:\ClaudeProject\D4_simulator2.0\dist
# Start: cd 'D:\ClaudeProject\D4_simulator2.0\dist'; npx http-server -p 8080 -s -c-1
```

### 4. 端口占用处理

如果端口8080被占用，可以更换端口：
```powershell
# 使用其他端口
npx http-server -p 8081 -s

# 或者先释放端口
Get-NetTCPConnection -LocalPort 8080 | Select-Object OwningProcess
Stop-Process -Id <进程ID> -Force
npx http-server -p 8080 -s -c-1
```

---

## 🖥️ 服务启动说明

### 方式一：使用 http-server（推荐）

**推荐理由：** 更稳定，适合长期运行，不会因为终端断开而停止。`-c-1` 参数禁用缓存，方便开发调试。

```powershell
cd D:\ClaudeProject\D4_simulator2.0\dist
npx http-server -p 8080 -s -c-1 -c-1
```

**参数说明：**
- `-p 8080`：指定端口为 8080
- `-s`：静默模式，减少日志输出
- `-c-1`：禁用缓存，开发时每次刷新获取最新数据

### 方式二：使用 serve（不推荐）

**注意：** `serve` 在某些环境下可能因为终端断开而停止。

```powershell
cd D:\ClaudeProject\D4_simulator2.0\dist
npx -y serve -l 8080
```

### 服务验证

启动后访问以下地址验证：

| 模块 | 地址 | 预期状态 |
|------|------|----------|
| 首页 | http://localhost:8080/ | ✅ 200 |
| 伤害计算器3.0 | http://localhost:8080/calculator/ | ✅ 200 |
| 伤害计算器2.0 | http://localhost:8080/simulator/ | ✅ 200 |
| 装备模拟器 | http://localhost:8080/equipment/ | ✅ 200 |
| 技能模拟器 | http://localhost:8080/skills/ | ✅ 200 |
| 巅峰盘模拟器 | http://localhost:8080/paragon/ | ✅ 200 |
| 构筑浏览器 | http://localhost:8080/build/ | ✅ 200 |
| 社区论坛 | http://localhost:8080/bbs/ | ✅ 200 |
| 数据库 | http://localhost:8080/database/ | ✅ 200 |

---

## 💾 数据文件说明

### 数据文件位置

数据库模块的数据文件位于构建后的 `dist` 目录：

```
dist/database/data/
├── affixes.json           # 词缀数据
├── uniqueEquipment.json   # 暗金装备数据
├── legendaryPowers.json   # 威能数据
├── amulets.json           # 护身符数据
├── gems.json              # 宝石数据
├── runes.json             # 符文数据
└── ...
```

### 数据更新流程

1. **直接修改 JSON 文件**：更新 `dist/database/data/*.json`
2. **刷新页面**：即可看到最新数据
3. **无需清除缓存**：因为使用了 `-c-1` 参数启动服务，缓存已禁用

### 注意事项

- ⚠️ 如果是直接修改 `modules/database/public/data/*.json` 源文件，需要**重新构建**才能生效
- ✅ 推荐直接修改 `dist/database/data/*.json`，修改后刷新即可生效

### http-server 缓存参数说明

```powershell
npx http-server -p 8080 -s -c-1
# -c-1 表示禁用缓存，方便开发时实时看到数据变化
```

---

## 📝 更新记录

### v1.1.0 (2026-06-19)
- 添加数据文件说明章节
- 说明数据更新流程和注意事项
- 记录 http-server `-c-1` 缓存参数的作用

### v1.0.0 (2026-06-18)
- 初始版本
- 记录构建脚本说明
- 记录常见错误与解决方案
- 添加构建流程和注意事项

---

**暗黑4模拟器 © 2024 | S13 憎恨之躯版本**