# 🔒 暗黑4模拟器 - 安全说明

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

## 📌 安全原则

### 1. 数据安全
- 不收集用户个人信息
- 数据仅存储在本地浏览器
- 不向服务器传输数据

### 2. 代码安全
- 不使用第三方脚本
- 不执行动态代码
- 避免XSS攻击

### 3. 隐私保护
- 尊重用户隐私
- 不跟踪用户行为
- 不使用广告追踪

---

## 🔒 安全措施

### XSS防护

#### 危险做法
```javascript
// ❌ 不安全：直接使用innerHTML
element.innerHTML = userInput;
```

#### 安全做法
```javascript
// ✅ 安全：使用textContent
element.textContent = userInput;

// ✅ 安全：使用DOM创建
const div = document.createElement('div');
div.textContent = userInput;
element.appendChild(div);
```

### 输入验证

```javascript
function validateInput(input) {
  // 移除HTML标签
  const clean = input.replace(/<[^>]*>/g, '');
  // 限制长度
  return clean.substring(0, 200);
}
```

### 存储安全

```javascript
// 加密敏感数据（可选）
function encryptData(data) {
  const json = JSON.stringify(data);
  // 使用简单加密
  return btoa(json);
}

function decryptData(encrypted) {
  const json = atob(encrypted);
  return JSON.parse(json);
}
```

---

## ⚠️ 安全风险

### 1. LocalStorage 限制
- 存储容量有限（约5MB）
- 隐私模式下可能不可用
- 数据可被用户手动清除

### 2. XSS 风险
- 用户输入可能包含恶意脚本
- 需要进行输入过滤
- 使用textContent替代innerHTML

### 3. 数据丢失风险
- 清除浏览器数据会丢失方案
- 建议定期导出重要数据

---

## 📋 安全检查清单

### 开发阶段
- [ ] 输入验证
- [ ] 输出转义
- [ ] 避免innerHTML
- [ ] 使用textContent

### 部署阶段
- [ ] HTTPS部署
- [ ] CSP配置
- [ ] 安全头设置

### 维护阶段
- [ ] 定期安全审计
- [ ] 漏洞修复
- [ ] 版本更新

---

## 📧 安全报告

如果发现安全漏洞，请通过以下方式报告：

- GitHub Issues: https://github.com/xxx/D4_simulator/issues
- 邮件: security@xxx.com

### 报告内容
- 漏洞描述
- 复现步骤
- 影响范围
- 建议修复方案

---

## 📜 安全承诺

我们承诺：
1. 及时响应安全报告
2. 定期更新安全措施
3. 保护用户数据安全
4. 遵守隐私保护法规