# 📝 暗黑4模拟器 - 代码风格规范

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

## 📌 JavaScript 代码规范

### 1. 命名规范

| 类型 | 规则 | 示例 |
|------|------|------|
| 变量 | 小驼峰 | `let playerName = 'Hero'` |
| 常量 | 大写下划线 | `const MAX_HEALTH = 1000` |
| 函数 | 小驼峰 | `function calculateDamage() {}` |
| 类 | 大驼峰 | `class EquipmentSelector {}` |
| 文件 | 小写下划线 | `calculator.js` |

### 2. 代码格式

- 使用 2 空格缩进
- 语句结尾必须加分号
- 大括号与语句同行
- 逗号后加空格

**示例：**
```javascript
function calculateDamage(weapon, skills) {
  let baseDamage = weapon.min + Math.random() * (weapon.max - weapon.min);
  let multiplier = 1;
  
  skills.forEach(skill => {
    multiplier *= skill.coefficient;
  });
  
  return baseDamage * multiplier;
}
```

### 3. 变量声明

- 使用 `let` 和 `const`，禁止使用 `var`
- 优先使用 `const`
- 变量声明在作用域顶部

**示例：**
```javascript
const PI = 3.14159;
let count = 0;
let result = null;
```

### 4. 条件语句

- 条件表达式前后加空格
- 单行条件也用大括号
- 避免嵌套三元运算符

**示例：**
```javascript
if (damage > 1000) {
  playCriticalAnimation();
} else if (damage > 500) {
  playHitAnimation();
} else {
  playMissAnimation();
}
```

### 5. 函数

- 函数参数不超过 4 个
- 使用默认参数值
- 返回类型保持一致

**示例：**
```javascript
function getEquipmentById(id, defaultValue = null) {
  const equipment = equipmentList.find(e => e.id === id);
  return equipment || defaultValue;
}
```

### 6. 对象与数组

- 使用字面量创建对象和数组
- 对象属性加引号（特别是保留字）
- 使用解构赋值

**示例：**
```javascript
const player = {
  name: 'Barbarian',
  level: 80,
  health: 15000
};

const { name, level } = player;
const [first, second] = skills;
```

### 7. 注释

- 函数前加 JSDoc 注释
- 复杂逻辑加注释
- 注释用中文

**示例：**
```javascript
/**
 * 计算最终伤害
 * @param {object} data - 角色数据
 * @param {number} data.weaponDamage - 武器伤害
 * @param {number} data.skillMultiplier - 技能系数
 * @returns {number} 最终伤害值
 */
function calculateFinalDamage(data) {
  // 基础伤害 = 武器伤害 × 技能系数
  const baseDamage = data.weaponDamage * data.skillMultiplier;
  return baseDamage;
}
```

---

## 📐 CSS 代码规范

### 1. 命名规范

- 使用 BEM 命名法
- 类名全小写，连字符分隔
- 状态类使用 `is-` 前缀

**示例：**
```css
.eq-slot { ... }
.eq-slot__icon { ... }
.eq-slot--selected { ... }
.is-active { ... }
```

### 2. 代码格式

- 每个属性独占一行
- 冒号后加空格
- 选择器分组用逗号分隔

**示例：**
```css
.eq-slot {
  width: 60px;
  height: 60px;
  background: linear-gradient(145deg, #1a1510, #0d0a08);
  border: 1px solid #2a2018;
  border-radius: 4px;
}
```

### 3. 变量使用

- 使用 CSS 变量定义主题色
- 变量名全小写，连字符分隔

**示例：**
```css
:root {
  --color-primary: #c9922a;
  --color-bg-dark: #0d0d0d;
  --spacing-base: 12px;
}
```

### 4. 优先级

- 避免使用 `!important`
- 使用更具体的选择器
- 按 specificity 排序

---

## 📄 HTML 代码规范

### 1. 文档结构

- 使用 HTML5 语义化标签
- 声明 `lang="zh-CN"`
- 指定字符编码

**示例：**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>暗黑4模拟器</title>
</head>
```

### 2. 标签规范

- 标签名小写
- 属性值加双引号
- 自闭合标签不加斜杠

**示例：**
```html
<div class="eq-slot" data-slot="helmet">
  <img src="images/slot-helm.svg" alt="头盔">
</div>
```

### 3. 可访问性

- 添加 `alt` 属性
- 使用语义化标签
- 合理的标题层级

---

## 🎨 暗黑风格规范

### 颜色

| 用途 | 颜色 | 说明 |
|------|------|------|
| 主色 | #c9922a | 金色，用于强调 |
| 背景 | #0d0d0d | 深黑色 |
| 卡片 | #1a1510 | 深色卡片 |
| 边框 | #2a2018 | 金属边框 |
| 文本 | #ffffff | 白色主文本 |
| 次文本 | #888888 | 灰色辅助文本 |

### 效果

- 渐变背景（深色到稍浅色）
- 金属质感边框
- 悬停发光效果
- 稀有度颜色标识

---

## ✅ 代码检查清单

- [ ] 命名符合规范
- [ ] 代码格式正确
- [ ] 注释清晰
- [ ] 无未使用变量
- [ ] 无控制台日志（生产环境）
- [ ] 兼容主流浏览器