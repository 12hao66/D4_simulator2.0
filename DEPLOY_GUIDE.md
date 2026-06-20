# 🚀 暗黑4模拟器 - GitHub Pages 部署指南

## 📋 目录

1. [准备工作](#准备工作)
2. [创建 GitHub 仓库](#创建-github-仓库)
3. [配置项目](#配置项目)
4. [构建项目](#构建项目)
5. [部署到 GitHub Pages](#部署到-github-pages)
6. [验证部署](#验证部署)
7. [常见问题](#常见问题)

---

## 🔧 准备工作

### 1.1 安装 Git

```powershell
# 检查 Git 是否安装
git --version

# 如果未安装，从 https://git-scm.com/download/win 下载安装
```

### 1.2 创建 GitHub 账号

如果你还没有 GitHub 账号：
1. 访问 https://github.com/
2. 注册账号并登录

---

## 📦 创建 GitHub 仓库

### 2.1 创建新仓库

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `12hao66.github.io`（必须是这个格式）
   - **Description**: 暗黑4模拟器
   - **Visibility**: Public（公开）
   - 勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 2.2 克隆仓库到本地

```powershell
# 克隆仓库
git clone https://github.com/12hao66/12hao66.github.io.git

# 进入仓库目录
cd 12hao66.github.io
```

---

## ⚙️ 配置项目

### 3.1 将项目文件复制到仓库

**注意：** 只需复制必要的文件，不需要复制 `node_modules/` 等目录。

```powershell
# 假设你的项目在 D:\ClaudeProject\D4_simulator2.0
# 复制项目文件到 GitHub 仓库（排除 node_modules）
Copy-Item -Path "D:\ClaudeProject\D4_simulator2.0\modules" -Destination "." -Recurse -Force
Copy-Item -Path "D:\ClaudeProject\D4_simulator2.0\index.html" -Destination "." -Force
Copy-Item -Path "D:\ClaudeProject\D4_simulator2.0\build-all.ps1" -Destination "." -Force
Copy-Item -Path "D:\ClaudeProject\D4_simulator2.0\README.md" -Destination "." -Force
Copy-Item -Path "D:\ClaudeProject\D4_simulator2.0\BUILD_GUIDE.md" -Destination "." -Force
Copy-Item -Path "D:\ClaudeProject\D4_simulator2.0\DEPLOY_GUIDE.md" -Destination "." -Force
```

### 3.2 配置 base 路径（重要！）

由于 GitHub Pages 部署在 `https://12hao66.github.io/`，需要确保所有路径都是相对路径。

**检查以下文件：**

1. **根目录 `index.html`** - 确保路径是相对路径：
   ```javascript
   const paths = {
     calculator: 'calculator/',
     simulator: 'simulator/',
     equipment: 'equipment/',
     skills: 'skills/',
     paragon: 'paragon/',
     database: 'database/'
   };
   ```

2. **各模块的 `vite.config.ts`** - 确保 `base` 为空：
   ```typescript
   export default defineConfig({
     base: '',  // 必须为空或 './'
     ...
   });
   ```

### 3.3 创建 .gitignore 文件

创建 `.gitignore` 文件，排除不需要上传的文件：

```gitignore
# 依赖目录
node_modules/
npm-debug.log
yarn-error.log

# 构建目录（部署时需要包含 dist）
# dist/ 不要排除，因为我们需要部署构建产物

# 编辑器配置
.vscode/
.idea/
*.swp
*.swo
*~

# 操作系统文件
.DS_Store
Thumbs.db

# 日志文件
logs/
*.log
```

---

## 🏗️ 构建项目

### 4.1 运行构建脚本

```powershell
# 进入项目目录
cd D:\ClaudeProject\D4_simulator2.0

# 运行构建脚本
.\build-all.ps1

# 构建完成后，dist/ 目录包含所有构建产物
```

### 4.2 验证构建结果

**重要！** GitHub Pages 部署的是 `dist/` 目录，不是项目根目录。

确保 `dist/` 目录包含以下内容：
```
dist/
├── index.html          # 首页导航
├── calculator/         # 伤害计算器 3.0（构建后）
├── simulator/          # 伤害计算器 2.0（静态文件）
├── equipment/          # 装备模拟器（构建后）
├── skills/             # 技能模拟器（构建后）
├── paragon/            # 巅峰盘模拟器（构建后）
└── database/           # 数据库管理（构建后）
```

**为什么部署 dist 目录？**
- `dist/` 目录包含所有模块的**构建产物**
- GitHub Pages 只能托管静态网站
- 源代码（`modules/`、`node_modules/`）无法直接运行

---

## 🚀 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐）

#### 5.1.1 创建 GitHub Actions 工作流

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 或你的主分支名称

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd modules/calculator && npm install
          cd ../equipment && npm install
          cd ../database && npm install
          cd ../skills && npm install
          cd ../paragon && npm install

      - name: Build all modules
        run: |
          cd modules/calculator && npm run build
          cd ../equipment && npm run build
          cd ../database && npm run build
          cd ../skills && npm run build
          cd ../paragon && npm run build

      - name: Create dist directory
        run: mkdir -p dist

      - name: Copy build outputs
        run: |
          cp -r modules/calculator/dist/* dist/calculator/
          cp -r modules/equipment/dist/* dist/equipment/
          cp -r modules/database/dist/* dist/database/
          cp -r modules/skills/dist/* dist/skills/
          cp -r modules/paragon/dist/* dist/paragon/
          cp -r modules/simulator/* dist/simulator/
          cp index.html dist/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 5.1.2 配置 GitHub Pages 设置

1. 进入仓库 → Settings → Pages
2. 在 "Source" 部分：
   - Branch: `gh-pages`（GitHub Actions 会自动创建）
   - Folder: `/` (root)
3. 点击 "Save"

### 方法二：手动部署

#### 5.2.1 安装 gh-pages 工具

```powershell
# 全局安装 gh-pages
npm install -g gh-pages
```

#### 5.2.2 部署到 gh-pages 分支

```powershell
# 进入项目目录
cd D:\ClaudeProject\D4_simulator2.0

# 确保已构建项目
.\build-all.ps1

# 部署 dist 目录到 gh-pages 分支
gh-pages -d dist -b gh-pages
```

#### 5.2.3 配置 GitHub Pages 设置

1. 进入仓库 → Settings → Pages
2. 在 "Source" 部分：
   - Branch: `gh-pages`
   - Folder: `/` (root)
3. 点击 "Save"

---

## ✅ 验证部署

### 6.1 等待部署完成

GitHub Pages 部署可能需要几分钟时间。

### 6.2 访问网站

部署成功后，访问：https://12hao66.github.io/

### 6.3 验证所有模块

| 模块 | 地址 |
|------|------|
| 首页 | https://12hao66.github.io/ |
| 伤害计算器3.0 | https://12hao66.github.io/calculator/ |
| 伤害计算器2.0 | https://12hao66.github.io/simulator/ |
| 装备模拟器 | https://12hao66.github.io/equipment/ |
| 技能模拟器 | https://12hao66.github.io/skills/ |
| 巅峰盘模拟器 | https://12hao66.github.io/paragon/ |
| 数据库 | https://12hao66.github.io/database/ |

---

## ❌ 常见问题

### 问题1：页面显示 404 错误

**现象：** 首页可以访问，但模块页面显示 404

**根源：** GitHub Pages 默认不支持 SPA（单页应用）的路由

**解决方案：**

创建 `dist/404.html` 文件，内容与 `index.html` 相同：

```powershell
# 复制 index.html 为 404.html
Copy-Item -Path "dist/index.html" -Destination "dist/404.html"
```

### 问题2：资源加载失败

**现象：** 页面显示空白，控制台显示 CSS/JS 资源 404

**根源：** 资源路径使用了绝对路径

**解决方案：**

确保所有资源引用使用相对路径：

1. 检查 `index.html` 中的路径配置
2. 检查各模块的 `vite.config.ts`，确保 `base: ''`

### 问题3：部署后样式错乱

**现象：** 页面样式显示不正常

**根源：** CSS 文件路径错误或未正确构建

**解决方案：**

1. 重新运行构建脚本
2. 检查 CSS 文件是否存在于正确位置
3. 确保 `dist/` 目录结构完整

### 问题4：GitHub Actions 构建失败

**现象：** Actions 日志显示构建失败

**根源：** 依赖未安装或构建命令错误

**解决方案：**

1. 检查 Actions 日志中的错误信息
2. 确保所有模块的 `package.json` 存在
3. 确保 Node.js 版本正确

---

## 📝 更新部署

### 方法一：使用 GitHub Actions（推荐）

只需将代码推送到 `main` 分支，Actions 会自动构建并部署：

```powershell
# 添加所有文件
git add .

# 提交更改
git commit -m "Update: 描述你的更改"

# 推送到 GitHub
git push origin main
```

### 方法二：手动部署

```powershell
# 进入项目目录
cd D:\ClaudeProject\D4_simulator2.0

# 重新构建
.\build-all.ps1

# 重新部署
gh-pages -d dist -b gh-pages
```

---

**暗黑4模拟器 © 2024 | S13 憎恨之躯版本**