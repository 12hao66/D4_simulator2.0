# ⚔️ 暗黑4伤害模拟器 (D4 Simulator)

> Diablo IV Damage Calculator - S13 憎恨之躯 3.0

一个基于 Web 的暗黑破坏神4伤害模拟器，支持全职业伤害计算、BD对比、快照保存等功能。

---

## 🎮 功能特性

### 核心功能
- **全职业支持**：野蛮人、德鲁伊、法师、死灵法师、游侠、圣骑士、术士
- **精确伤害计算**：基于 S13 3.0 伤害公式
- **多乘区计算**：A类区、B类区、独立X乘区
- **暴击/易伤/压制**：完整的伤害机制模拟

### 高级功能
- **BD对比**：支持自建方案与内置参考BD对比
- **方案管理**：创建、复制、删除、重命名方案
- **快照系统**：最多保存5个快照，防止数据丢失
- **导入导出**：支持方案的导入和导出

---

## 📁 项目结构

```
D4_simulator/
├── index.html          # 主页面
├── d4_simulator_v2.0.html  # 旧版本入口
├── css/                # 样式文件
│   ├── variables.css   # 设计变量
│   ├── reset.css       # 重置样式
│   ├── layout.css      # 布局样式
│   ├── components.css  # 组件样式
│   └── utilities.css   # 工具类样式
├── js/                 # JavaScript模块
│   ├── constants.js    # 常量定义
│   ├── utils.js        # 工具函数
│   ├── config.js       # 配置管理
│   ├── calculator.js   # 伤害计算器
│   ├── storage.js      # 本地存储
│   ├── ui.js           # UI管理器
│   └── main.js         # 主入口
└── docs/               # 文档目录
    ├── 01_README.md
    ├── 02_ARCHITECTURE.md
    ├── 03_API.md
    ├── 04_CONFIG.md
    ├── 05_CHANGELOG.md
    ├── 06_CONTRIBUTING.md
    ├── 07_FORMULA.md
    └── 08_BD_FORMAT.md
```

---

## 🚀 快速开始

### 运行方式

直接打开 `index.html` 文件即可运行，无需额外依赖：

```bash
# 方式1：直接在浏览器中打开
start index.html

# 方式2：使用本地服务器（推荐）
python -m http.server 8000
# 然后访问 http://localhost:8000
```

### 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 📊 使用说明

### 基本流程

1. **选择职业**：在左上角选择你的职业
2. **输入武器数据**：填写主手/副手武器点伤（取面板小字中值）
3. **配置属性**：填写力量、技能伤害倍率等
4. **添加词缀**：在 A类区、B类区、独立X区添加词缀
5. **点击计算**：查看伤害结果和详细计算步骤

### 乘区说明

| 乘区 | 类型 | 说明 |
|------|------|------|
| **A类区** | [+]% 前缀 | 所有同名相加后整体相乘 |
| **B类区** | [×]% 前缀 | S13新增，同名相加后作为独立乘区 |
| **独立X** | [×]% 后缀 | 传奇威能、套装效果，各自独立相乘 |

---

## 🔧 技术栈

- **前端框架**：原生 HTML/CSS/JavaScript（ES6+）
- **样式**：CSS3 + CSS Variables
- **存储**：LocalStorage
- **图标**：Emoji + SVG

---

## 📝 更新日志

### S13 3.0 更新

- ✨ 新增 B类区 [×]% 前缀乘区
- ✨ 压制机制改为叠层 [+]% 归入 A类区
- ✨ 移除旧版压制的 HP 加成机制
- ✨ 新增 BD 对比面板，支持多选对比
- ✨ 新增快照系统，最多保存5个快照
- ✨ 优化 DPS 计算，考虑易伤覆盖率

---

## 📄 许可证

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！请参考 `docs/06_CONTRIBUTING.md`。

---

**Made with ⚔️ for Diablo IV Community**
