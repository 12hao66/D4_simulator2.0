# 配置说明文档

## 一、配置文件概述

项目配置主要集中在以下文件：

| 文件 | 配置内容 |
|------|----------|
| `js/constants.js` | 全局常量、存储键名、职业数据 |
| `js/config.js` | BD参考数据、默认方案数据 |
| `css/variables.css` | 样式变量（颜色、间距、字体） |

## 二、常量配置（constants.js）

### 存储键名

```javascript
STORAGE_KEYS: {
  PLANS: 'd4_s13_v2',      // 方案数据存储键
  SNAPS: 'd4_s13_snaps'    // 快照数据存储键
}
```

### 词缀配置

```javascript
AFFIX_CONFIG: {
  a: {                    // A类词缀
    key: 'affix_a',       // 数据键名
    container: 'affix-a', // 容器ID
    placeholder: 'A类加成名称',
    total: 'a-total'      // 合计显示ID
  },
  b: {                    // B类词缀
    key: 'affix_b',
    container: 'affix-b',
    placeholder: 'B类乘区名称',
    total: 'b-total'
  },
  leg: {                  // Legendary词缀
    key: 'multi_leg',
    container: 'affix-leg',
    placeholder: '独立X名称',
    total: 'leg-total'
  }
}
```

### 职业配置

| 职业ID | 职业名称 | 主属性 | 属性系数 |
|--------|----------|--------|----------|
| barbarian | 野蛮人 | 力量 | 900 |
| druid | 德鲁伊 | 意志 | 800 |
| sorc | 法师 | 智慧 | 800 |
| necro | 死灵法师 | 智慧 | 800 |
| rogue | 游侠 | 敏捷 | 800 |
| paladin | 圣骑士 | 力量 | 900 |
| spiritborn | 术士 | 敏捷 | 800 |

## 三、BD参考数据配置（config.js）

### BD数据结构

```javascript
{
  id: "bd_unique_id",           // 唯一标识
  name: "BD名称",               // 显示名称
  icon: "🌀",                   // 图标emoji
  tier: "T0 · 天梯 Top 0.5%",  // 天梯等级
  desc: "BD描述说明",           // 简短描述
  data: { ... }                 // 伤害计算数据
}
```

### 新增BD参考

在 `BD_DATA.builds` 数组中添加新对象即可：

```javascript
{
  id: "bd_new_build",
  name: "我的新BD",
  icon: "⚔",
  tier: "T2 · 天梯 Top 5%",
  desc: "这是一个新的BD配置",
  data: {
    class_id: "barbarian",
    wpn1: 4500,
    // ... 其他属性
  }
}
```

### 可用图标参考

| 图标 | 用途 |
|------|------|
| ⚔ | 通用/武器 |
| 🌀 | 旋风斩 |
| 🩸 | 流血/撕裂 |
| 🔨 | 锤击 |
| 🗡 | 游侠 |
| 🔥 | 法师/火焰 |
| 💀 | 死灵 |
| 🌿 | 德鲁伊 |
| 🛡 | 圣骑士 |
| 🦅 | 术士 |

### Tier等级规范

- `T0 · 天梯 Top 0.5%` - 顶级BD
- `T1 · 天梯 Top 1%` - 高端BD
- `T2 · 天梯 Top 5%` - 中高端BD
- `T3 · 天梯 Top 10%` - 中端BD

## 四、默认方案数据

### 默认值说明

| 字段 | 默认值 | 说明 |
|------|--------|------|
| class_id | barbarian | 默认职业为野蛮人 |
| wpn1 | 4500 | 默认主武器伤害 |
| wpn2 | 0 | 默认副武器伤害 |
| aps | 1.3 | 默认攻击速度 |
| str | 5000 | 默认主属性 |
| skill_pct | 200 | 默认技能倍率(%) |
| is_dot | false | 默认非DoT伤害 |
| hits | 1 | 默认单次攻击命中次数 |
| crit_chance | 50 | 默认暴击率(%) |
| crit_active | true | 默认计算暴击 |
| vuln_add | 0 | 默认易伤加成 |
| vuln_active | true | 默认计算易伤 |
| vuln_uptime | 80 | 默认易伤覆盖(%) |
| op_stacks | 0 | 默认压制叠层数 |
| op_stack_add | 15 | 默认每层压制加成(%) |
| monster_dr | 80 | 默认怪物减伤(%) |
| apply_dr | false | 默认不应用怪物减伤 |

## 五、样式配置（variables.css）

### 颜色变量

```css
:root {
  --fire-1: #e0a020;      /* 主色调 - 金色 */
  --fire-2: #c89020;      /* 主色调深色 */
  --sapphire: #4096ff;    /* 蓝色 - 链接/强调 */
  --emerald: #00d68f;     /* 绿色 - 成功/正增长 */
  --crimson: #ff4d4f;     /* 红色 - 错误/负增长 */
  --ink-0: #0a0a0a;       /* 最深背景 */
  --ink-1: #111111;       /* 较深背景 */
  --ink-2: #1a1a1a;       /* 中等背景 */
  --ink-3: #252525;       /* 较浅背景 */
  --border-faint: rgba(255,255,255,.06);
  --border-soft: rgba(255,255,255,.1);
  --border-mid: rgba(255,255,255,.2);
  --text-primary: #f0f0f0;
  --text-secondary: #a0a0a0;
  --text-muted: #606060;
}
```

### 字体配置

```css
:root {
  --font-serif: 'Cinzel', Georgia, serif;
  --font-mono: 'Share Tech Mono', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### 间距配置

```css
:root {
  --gap-xs: 4px;
  --gap-sm: 8px;
  --gap-md: 12px;
  --gap-lg: 16px;
  --gap-xl: 24px;
}
```

## 六、修改配置的注意事项

### 1. 修改BD数据
- 修改 `js/config.js` 中的 `BD_DATA.builds` 数组
- 确保每个BD的 `id` 唯一
- 数据格式必须与现有BD一致

### 2. 修改默认值
- 修改 `js/config.js` 中的 `getDefaultData()` 方法
- 确保所有字段都有合理的默认值

### 3. 修改样式
- 修改 `css/variables.css` 中的CSS变量
- 保持颜色对比度，确保可访问性

### 4. 修改常量
- 修改 `js/constants.js`
- 注意保持兼容性，不要随意删除现有常量