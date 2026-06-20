# 🛠️ 暗黑4模拟器 - 技术栈文档

## 📋 文档目录分工说明

### 项目级文档（`docs/`）
| 文档 | 定位 | 内容说明 |
|------|------|----------|
| `ARCHITECTURE.md` | 架构设计 | 整体架构、模块划分、数据流 |
| `TECH_STACK.md` | 技术栈 | 前端技术、兼容性、依赖 |
| `CONTRIBUTING.md` | 贡献指南 | 开发规范、PR流程 |
| `CODE_STYLE.md` | 代码规范 | 命名、格式、最佳实践 |
| `ROADMAP.md` | 路线图 | 功能规划、里程碑 |
| `SECURITY.md` | 安全说明 | 安全实践、风险提示 |

### 模块级文档（`modules/{module}/docs/`）
| 文档 | 定位 | 内容说明 |
|------|------|----------|
| `README.md` | 模块介绍 | 功能特性、快速开始 |
| `API.md` | 接口文档 | 函数签名、参数返回值 |
| `CHANGELOG.md` | 更新日志 | 版本历史、变更记录 |
| `USAGE.md` | 使用指南 | 用户操作说明 |

---

## 🎯 技术栈概览

| 分类 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **框架** | React | 18.2.x | UI框架 |
| **语言** | TypeScript | 5.2.x | 类型安全 |
| **构建工具** | Vite | 5.0.x | 快速构建 |
| **状态管理** | Zustand | 4.5.x | 轻量状态管理 |
| **样式** | Tailwind CSS | 3.4.x | 原子化CSS |
| **存储** | LocalStorage | - | 本地数据持久化 |
| **图标** | SVG | - | 矢量图标 |

---

## 🔧 前端技术

### React 18
- 组件化开发
- Hooks 状态管理
- 并发渲染支持

### TypeScript
- 类型安全
- 编译期错误检测
- 更好的IDE支持

### Vite
- 快速冷启动
- 热模块替换（HMR）
- 优化的构建输出

### Zustand
- 轻量状态管理
- 无需Context包装
- 良好的TypeScript支持

### Tailwind CSS
- 原子化CSS
- 快速UI构建
- 响应式设计

---

## 📱 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | ≥ 90 | ✅ 支持 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 15 | ✅ 支持 |
| Edge | ≥ 90 | ✅ 支持 |

### 兼容性说明
- React 18 需要现代浏览器支持
- 使用ES Modules，需注意旧版浏览器
- LocalStorage在隐私模式下可能不可用

---

## 📦 依赖管理

### 新版模块依赖（React + TS）
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### 旧版模块（原生JS）
- 无外部依赖
- 纯原生实现

---

## 🚀 运行方式

### 开发环境（新版模块）
```bash
cd modules/calculator
npm install
npm run dev
# 访问 http://localhost:5173
```

### 开发环境（旧版模块）
```bash
# 方式1：直接打开
start modules/simulator/index.html

# 方式2：本地服务器
python -m http.server 8080
# 访问 http://localhost:8080/modules/simulator/index.html
```

### 生产构建（新版模块）
```bash
cd modules/calculator
npm run build
# 产物输出到 dist/ 目录
```

---

## 📁 项目结构与技术映射

```
D4_simulator/
├── index.html          # HTML5 首页导航
├── shared/
│   ├── css/            # CSS3 共享样式
│   ├── js/             # JavaScript 共享脚本
│   └── data/           # JSON 游戏数据
├── modules/
│   ├── calculator/     # React + TS + Vite
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   └── App.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── equipment/      # React + TS + Vite
│   ├── skills/         # React + TS + Vite (待开发)
│   ├── paragon/        # React + TS + Vite (待开发)
│   └── simulator/      # 原生HTML/CSS/JS (保留)
└── images/             # SVG/PNG 图片资源
```

---

## 🎨 设计系统

### 颜色主题
```css
:root {
  --color-primary: #c9922a;      /* 金色主色 */
  --color-bg-dark: #0d0d0d;      /* 深色背景 */
  --color-bg-card: #1a1510;      /* 卡片背景 */
  --color-border: #2a2018;       /* 边框颜色 */
  --color-text-primary: #ffffff; /* 主文本 */
  --color-text-secondary: #888888; /* 次文本 */
}
```

### 稀有度颜色
| 稀有度 | 颜色 | 变量 |
|--------|------|------|
| 普通 | #888888 | `--color-rarity-common` |
| 魔法 | #1eff00 | `--color-rarity-magic` |
| 稀有 | #0070dd | `--color-rarity-rare` |
| 传奇 | #ff8000 | `--color-rarity-legendary` |
| 暗金 | #e6cc80 | `--color-rarity-unique` |

---

## 📊 性能优化

### 优化策略
1. **代码分割**：Vite自动进行代码分割
2. **懒加载**：React.lazy 按需加载组件
3. **缓存**：利用浏览器缓存和Vite的缓存策略
4. **SVG图标**：矢量图无损缩放
5. **虚拟滚动**：处理大量列表数据

### 注意事项
- 使用 React.memo 避免不必要重渲染
- 使用 useMemo/useCallback 缓存计算结果
- 合理使用 Zustand 的 selector 优化性能

---

## 🔒 安全考虑

### XSS防护
- React自动转义HTML
- 避免使用 dangerouslySetInnerHTML
- 对用户输入进行验证和清理

### 存储安全
- 不存储敏感信息
- 数据加密（可选）
- 定期清理过期数据

---

## 📱 微信小程序

### 技术栈
- 小程序原生框架
- WXML + WXSS + JavaScript
- 微信API

### 开发工具
- 微信开发者工具
- 小程序IDE

### 部署流程
1. 在微信开发者工具中打开项目
2. 配置AppID
3. 预览测试
4. 提交审核
5. 发布上线
