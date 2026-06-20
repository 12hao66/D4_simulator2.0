# BD数据格式规范

## 一、概述

BD（Build Definition）数据格式用于存储和分享游戏角色的装备配置和伤害计算参数。本规范定义了BD数据的结构和字段说明。

## 二、数据结构

### 完整BD数据结构

```json
{
  "id": "bd_unique_identifier",
  "name": "BD名称",
  "icon": "🌀",
  "tier": "T0 · 天梯 Top 0.5%",
  "desc": "BD描述说明",
  "data": {
    "class_id": "barbarian",
    "wpn1": 4500,
    "wpn2": 0,
    "aps": 1.3,
    "str": 7200,
    "skill_pct": 215,
    "is_dot": false,
    "hits": 1,
    "affix_a": [],
    "affix_b": [],
    "multi_leg": [],
    "crit_chance": 60,
    "crit_active": true,
    "vuln_add": 45,
    "vuln_active": true,
    "vuln_uptime": 85,
    "op_stacks": 3,
    "op_stack_add": 20,
    "monster_dr": 80,
    "apply_dr": false
  }
}
```

## 三、字段说明

### 顶层字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 唯一标识符，建议使用 `bd_` 前缀 |
| name | String | 是 | BD显示名称 |
| icon | String | 是 | 图标emoji（如 🌀、⚔、🩸） |
| tier | String | 是 | 天梯等级标识 |
| desc | String | 是 | 简短描述，不超过50字 |
| data | Object | 是 | 伤害计算数据 |

### data字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| class_id | String | 是 | barbarian | 职业ID |
| wpn1 | Number | 是 | 0 | 主武器伤害 |
| wpn2 | Number | 否 | 0 | 副武器伤害 |
| aps | Number | 是 | 1.0 | 攻击速度 |
| str | Number | 是 | 5000 | 主属性（力量/敏捷/智力） |
| skill_pct | Number | 是 | 100 | 技能倍率(%) |
| is_dot | Boolean | 否 | false | 是否DoT伤害 |
| hits | Number | 否 | 1 | 每次攻击命中次数 |
| affix_a | Array | 否 | [] | A类词缀列表 |
| affix_b | Array | 否 | [] | B类词缀列表 |
| multi_leg | Array | 否 | [] | Legendary乘区列表 |
| crit_chance | Number | 否 | 50 | 暴击率(%) |
| crit_active | Boolean | 否 | true | 是否计算暴击 |
| vuln_add | Number | 否 | 0 | 易伤加成(%) |
| vuln_active | Boolean | 否 | true | 是否计算易伤 |
| vuln_uptime | Number | 否 | 80 | 易伤覆盖时间(%) |
| op_stacks | Number | 否 | 0 | 压制叠层数 |
| op_stack_add | Number | 否 | 15 | 每层压制加成(%) |
| monster_dr | Number | 否 | 80 | 怪物减伤(%) |
| apply_dr | Boolean | 否 | false | 是否应用怪物减伤 |

### 词缀数据结构

```json
{
  "name": "词缀名称",
  "val": 30,
  "enabled": true
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| name | String | 词缀名称（用于B类分组） |
| val | Number | 词缀数值(%) |
| enabled | Boolean | 是否启用 |

## 四、职业ID对照表

| 职业ID | 职业名称 | 主属性 |
|--------|----------|--------|
| barbarian | 野蛮人 | 力量 |
| sorcerer | 法师 | 智力 |
| rogue | 游侠 | 敏捷 |
| necromancer | 死灵法师 | 智力 |
| druid | 德鲁伊 | 敏捷 |
| paladin | 圣骑士 | 力量 |
| warlock | 术士 | 智力 |

## 五、Tier等级规范

| Tier | 含义 | 说明 |
|------|------|------|
| T0 · 天梯 Top 0.5% | 顶级BD | 服务器前0.5%玩家使用 |
| T1 · 天梯 Top 1% | 高端BD | 服务器前1%玩家使用 |
| T2 · 天梯 Top 5% | 中高端BD | 服务器前5%玩家使用 |
| T3 · 天梯 Top 10% | 中端BD | 服务器前10%玩家使用 |

## 六、可用图标参考

| 图标 | 适用职业/技能 |
|------|--------------|
| ⚔ | 通用/武器 |
| 🌀 | 旋风斩 |
| 🩸 | 流血/撕裂 |
| 🔨 | 锤击/重击 |
| 🗡 | 游侠/匕首 |
| 🔥 | 法师/火焰 |
| 💀 | 死灵法师 |
| 🌿 | 德鲁伊/自然 |
| 🛡 | 圣骑士/防御 |
| 🦅 | 术士/召唤 |
| ⚡ | 闪电/快速 |
| 🌑 | 暗影/暗黑 |
| 💥 | 爆炸/范围 |
| 🏹 | 远程/弓箭 |

## 七、导入导出流程

### 导出BD（天梯维护工作流）

**核心目的**：将手动配置的BD导出，补充元数据后添加到天梯参考列表，供其他玩家参考和套用。

**完整流程**：

1. **配置BD数据**
   - 在左侧面板输入武器伤害、主属性、技能倍率等参数
   - 配置A类、B类、Legendary词缀加成
   - 设置暴击率、易伤覆盖等战斗参数

2. **导出BD文件**
   - 点击页面顶部的「导出BD」按钮
   - 浏览器自动下载JSON文件

3. **补充元数据**
   - 使用文本编辑器打开下载的JSON文件
   - 补充 `icon` 字段：选择合适的emoji图标（参考第六章）
   - 补充 `tier` 字段：设置天梯等级（参考第五章）
   - 补充 `desc` 字段：添加简短描述（不超过50字）

4. **添加到参考数据**
   - 打开 `js/config.js` 文件
   - 将完整的BD对象添加到 `BD_DATA.builds` 数组中
   - 保存文件并刷新页面

5. **验证生效**
   - 新BD会自动出现在「BD参考」列表中
   - 可以点击「套用数据」测试是否正常工作

### 导入方案（玩家使用）

**核心目的**：导入其他玩家分享的方案配置。

**流程**：
1. 准备符合格式的JSON文件（方案格式，非BD格式）
2. 点击「导入方案」按钮
3. 选择JSON文件
4. 方案自动添加到方案列表

### 赛季维护建议

**每个赛季维护流程**：
1. 为每个职业配置3套BD（低配/中配/顶配）
2. 依次导出并补充元数据
3. 更新到 `js/config.js`
4. 刷新页面验证

**BD命名规范**：
- ID格式：`bd_{职业}_{技能}_{等级}` → 如 `bd_barb_ww_t0`
- 名称格式：`技能名 等级` → 如 `旋风斩 顶配`

## 八、BD示例

### 示例1：野蛮人旋风斩BD

```json
{
  "id": "bd_ww_top",
  "name": "旋风斩 顶配",
  "icon": "🌀",
  "tier": "T0 · 天梯 Top 0.5%",
  "desc": "旋风斩持续输出，高攻速高生存",
  "data": {
    "class_id": "barbarian",
    "wpn1": 4500,
    "wpn2": 0,
    "aps": 1.35,
    "str": 7500,
    "skill_pct": 220,
    "is_dot": false,
    "hits": 1,
    "affix_a": [
      {"name": "力量加成", "val": 45, "enabled": true},
      {"name": "核心技能伤害", "val": 30, "enabled": true}
    ],
    "affix_b": [
      {"name": "狂暴伤害", "val": 50, "enabled": true},
      {"name": "物理伤害", "val": 25, "enabled": true}
    ],
    "multi_leg": [
      {"name": "旋风斩伤害", "val": 40, "enabled": true}
    ],
    "crit_chance": 55,
    "crit_active": true,
    "vuln_add": 40,
    "vuln_active": true,
    "vuln_uptime": 85,
    "op_stacks": 3,
    "op_stack_add": 20,
    "monster_dr": 80,
    "apply_dr": false
  }
}
```

### 示例2：法师火球BD

```json
{
  "id": "bd_fireball",
  "name": "火球术 高配",
  "icon": "🔥",
  "tier": "T1 · 天梯 Top 1%",
  "desc": "火球术爆发输出，远程AOE",
  "data": {
    "class_id": "sorcerer",
    "wpn1": 4200,
    "wpn2": 0,
    "aps": 1.1,
    "str": 6800,
    "skill_pct": 280,
    "is_dot": false,
    "hits": 1,
    "affix_a": [
      {"name": "智力加成", "val": 50, "enabled": true},
      {"name": "攻击伤害", "val": 20, "enabled": true}
    ],
    "affix_b": [
      {"name": "火焰伤害", "val": 60, "enabled": true},
      {"name": "暴击伤害", "val": 40, "enabled": true}
    ],
    "multi_leg": [
      {"name": "火球伤害", "val": 50, "enabled": true}
    ],
    "crit_chance": 60,
    "crit_active": true,
    "vuln_add": 50,
    "vuln_active": true,
    "vuln_uptime": 90,
    "op_stacks": 0,
    "op_stack_add": 15,
    "monster_dr": 80,
    "apply_dr": false
  }
}
```

## 九、格式验证

### 验证规则

1. **必填字段检查**：确保 `id`、`name`、`icon`、`tier`、`desc`、`data` 字段存在
2. **类型检查**：确保数值字段为数字类型
3. **范围检查**：数值在合理范围内
4. **职业ID检查**：确保 `class_id` 是有效的职业ID
5. **词缀格式检查**：词缀数组中的每个对象必须包含 `name`、`val`、`enabled` 字段

### 验证工具

可使用JSON验证工具检查格式：
- 在线工具：JSONLint (https://jsonlint.com/)
- 命令行：`cat bd.json | python -m json.tool`

## 十、版本兼容性

### 版本历史

| 版本 | 变更说明 |
|------|----------|
| S13 | 新增 `op_stacks`、`op_stack_add` 字段 |
| S12 | 新增 `monster_dr`、`apply_dr` 字段 |
| S11 | 新增 `hits`、`vuln_uptime` 字段 |
| S10 | 初始版本 |

### 向后兼容

- 新版本可以读取旧版本数据
- 缺失字段使用默认值
- 旧版本无法读取新版本新增字段

---

**注意**：修改BD数据后需刷新页面才能生效。