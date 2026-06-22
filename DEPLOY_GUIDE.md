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
├── build/              # 构筑浏览器（构建后）
├── bbs/                # 社区论坛（构建后）
└── database/           # 数据库管理（构建后）
```

**为什么部署 dist 目录？**
- `dist/` 目录包含所有模块的**构建产物**
- GitHub Pages 只能托管静态网站
- 源代码（`modules/`、`node_modules/`）无法直接运行

---

## 🚀 部署到 GitHub Pages

### 方法一：手动创建 GitHub Actions（推荐 - 避免权限问题）

如果你在推送代码时遇到 OAuth App 权限问题（workflow 文件无法推送），可以使用此方法：

#### 5.1.1 先推送代码到 GitHub

```powershell
# 添加所有文件
git add .

# 提交更改（排除 .github 目录）
git commit -m "Add D4 simulator modules"

# 推送到 GitHub
git push origin main
```

#### 5.1.2 在 GitHub 网页上手动创建 Workflow 文件

1. 打开你的 GitHub 仓库：https://github.com/12hao66/D4_simulator2.0
2. 点击 **Add file** → **Create new file**
3. 文件路径输入：`.github/workflows/deploy.yml`
4. 复制以下内容粘贴：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Build calculator
        run: |
          cd modules/calculator
          npm install
          npm run build
          cd ../..

      - name: Build database
        run: |
          cd modules/database
          npm install
          npm run build
          cd ../..

      - name: Build equipment
        run: |
          cd modules/equipment
          npm install
          npm run build
          cd ../..

      - name: Build skills
        run: |
          cd modules/skills
          npm install
          npm run build
          cd ../..

      - name: Build paragon
        run: |
          cd modules/paragon
          npm install
          npm run build
          cd ../..

      - name: Build build browser
        run: |
          cd modules/build
          npm install
          npm run build
          cd ../..

      - name: Build bbs
        run: |
          cd modules/bbs
          npm install
          npm run build
          cd ../..

      - name: Create dist directory
        run: mkdir -p dist

      - name: Copy modules to dist
        run: |
          cp -r modules/calculator/dist dist/calculator
          cp -r modules/database/dist dist/database
          cp -r modules/equipment/dist dist/equipment
          cp -r modules/skills/dist dist/skills
          cp -r modules/paragon/dist dist/paragon
          cp -r modules/build/dist dist/build
          cp -r modules/bbs/dist dist/bbs
          cp -r modules/simulator dist/simulator
          cp index.html dist/

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. 点击 **Commit new file**

#### 5.1.3 配置 GitHub Pages 设置

1. 进入仓库 → **Settings** → **Pages**
2. 在 "Build and deployment" 部分：
   - Source 选择 **GitHub Actions**
3. 保存

#### 5.1.4 触发部署

推送代码后，GitHub Actions 会自动构建并部署：
- 进入仓库 → **Actions** 标签页查看进度
- 部署完成后访问：`https://12hao66.github.io/D4_simulator2.0/`

---

### 方法二：使用本地上传的 Workflow 文件

如果你希望从本地上传 workflow 文件，需要使用 Personal Access Token：

#### 5.2.1 创建 Personal Access Token

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. 点击 **Generate new token (classic)**
3. 勾选 **workflow** 权限
4. 生成 token 并保存

#### 5.2.2 使用 Token 推送

```powershell
# 设置远程仓库 URL 包含 Token
git remote set-url origin https://<YOUR_TOKEN>@github.com/12hao66/D4_simulator2.0.git

# 推送所有文件（包括 .github 目录）
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

#### 5.2.3 配置 GitHub Pages

同方法一 5.1.3

---

### 方法三：手动部署（不使用 Actions）

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

部署成功后，访问：https://12hao66.github.io/D4_simulator2.0/

### 6.3 验证所有模块

| 模块 | 地址 |
|------|------|
| 首页 | https://12hao66.github.io/D4_simulator2.0/ |
| 伤害计算器3.0 | https://12hao66.github.io/D4_simulator2.0/calculator/ |
| 伤害计算器2.0 | https://12hao66.github.io/D4_simulator2.0/simulator/ |
| 装备模拟器 | https://12hao66.github.io/D4_simulator2.0/equipment/ |
| 技能模拟器 | https://12hao66.github.io/D4_simulator2.0/skills/ |
| 巅峰盘模拟器 | https://12hao66.github.io/D4_simulator2.0/paragon/ |
| 构筑浏览器 | https://12hao66.github.io/D4_simulator2.0/build/ |
| 社区论坛 | https://12hao66.github.io/D4_simulator2.0/bbs/ |
| 数据库 | https://12hao66.github.io/D4_simulator2.0/database/ |

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