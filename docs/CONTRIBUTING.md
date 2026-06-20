# 🤝 暗黑4模拟器 - 贡献指南

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

## 📖 如何贡献

### 1. Fork 项目
```bash
# 点击 GitHub 页面的 Fork 按钮
```

### 2. 克隆到本地
```bash
git clone https://github.com/your-username/D4_simulator.git
cd D4_simulator
```

### 3. 创建分支
```bash
git checkout -b feature/your-feature-name
```

### 4. 开发
- 按照代码规范编写代码
- 添加必要的测试
- 更新相关文档

### 5. 提交
```bash
git add .
git commit -m "feat: 添加功能描述"
```

### 6. 推送
```bash
git push origin feature/your-feature-name
```

### 7. 创建 Pull Request
- 访问 GitHub 仓库
- 点击 "Compare & pull request"
- 填写 PR 描述

---

## 🎯 贡献类型

### 代码贡献
- 修复 Bug
- 新增功能
- 性能优化
- 代码重构

### 文档贡献
- 更新 README
- 补充技术文档
- 编写使用指南

### 资源贡献
- 图标设计
- UI优化
- 数据更新

---

## 📝 开发规范

### 分支命名
```
feature/xxx        # 新功能
bugfix/xxx         # 修复Bug
docs/xxx           # 文档更新
refactor/xxx       # 代码重构
```

### 提交信息规范
```
feat: 添加伤害计算器功能
fix: 修复装备选择弹窗问题
docs: 更新API文档
refactor: 重构存储模块
style: 优化暗黑风格UI
test: 添加单元测试
```

---

## 📋 PR 检查清单

- [ ] 代码符合规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 通过所有测试
- [ ] 无冲突

---

## 💬 沟通方式

### 问题反馈
- 使用 GitHub Issues
- 描述清晰的问题场景
- 提供复现步骤

### 讨论
- 使用 GitHub Discussions
- 提出改进建议
- 讨论技术方案

---

## 🌟 贡献者

感谢所有为项目做出贡献的开发者！

---

## 📜 许可证

本项目采用 MIT 许可证，详见 LICENSE 文件。