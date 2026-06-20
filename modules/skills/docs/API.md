# 技能模拟器 API 文档

## 概述

技能模拟器提供以下核心函数接口。

## 核心函数

### 1. SkillsSimulator.init()

初始化技能模拟器。

### 2. SkillsSimulator.selectClass(className)

选择职业。

**参数**：
- `className` - 职业名称

### 3. SkillsSimulator.selectSkill(skillId)

选择技能。

**参数**：
- `skillId` - 技能ID

### 4. SkillsSimulator.deselectSkill(skillId)

取消选择技能。

**参数**：
- `skillId` - 技能ID

### 5. SkillsSimulator.getSelectedSkills()

获取已选技能列表。

**返回值**：技能对象数组。

### 6. SkillsSimulator.calculateDamage()

计算技能组合伤害。

**返回值**：伤害数值。

### 7. SkillsSimulator.saveBuild(name)

保存技能Build。

**参数**：
- `name` - Build名称

### 8. SkillsSimulator.loadBuild(id)

加载技能Build。

**参数**：
- `id` - Build ID

## 数据结构

### 技能对象

```javascript
{
  id: 'string',           // 技能ID
  name: 'string',         // 技能名称
  type: 'active|passive', // 技能类型
  category: 'core|defensive|offensive', // 技能分类
  damage: number,         // 伤害值
  cooldown: number,       // 冷却时间(秒)
  requirements: array,    // 前置技能
  description: 'string'   // 技能描述
}
```

### 技能树结构

```javascript
{
  barbarian: {
    core: [...],          // 核心技能
    defensive: [...],     // 防御技能
    offensive: [...]      // 攻击技能
  }
}
```