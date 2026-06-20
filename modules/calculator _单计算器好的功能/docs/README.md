# 伤害计算器 3.0

> Diablo IV Damage Calculator v3.0

精确计算暗黑4角色伤害的工具，支持S13憎恨之躯版本的完整伤害机制。

## 🎯 功能特性

- **多乘区计算**：A类区、B类区、独立X等完整乘区系统
- **暴击机制**：暴击几率、暴击伤害、暴击期望
- **易伤机制**：易伤状态、易伤伤害加成
- **压制机制**：压制几率、压制伤害加成
- **技能系数**：支持全职业技能系数配置
- **实时计算**：输入即更新，实时预览伤害结果
- **暗黑风格UI**：游戏风格的视觉设计

## 📁 文件结构

```
modules/calculator/
├── index.html          # 入口HTML
├── package.json        # 依赖配置
├── vite.config.ts      # Vite配置
├── tsconfig.json       # TypeScript配置
├── tailwind.config.js  # Tailwind CSS配置
├── postcss.config.js   # PostCSS配置
├── src/
│   ├── main.tsx        # React入口
│   ├── App.tsx         # 主应用组件
│   ├── index.css       # 全局样式
│   ├── store/
│   │   └── damageStore.ts  # Zustand状态管理
│   └── components/
│       ├── Header.tsx      # 顶部导航
│       ├── InputPanel.tsx  # 输入面板
│       └── ResultPanel.tsx # 结果展示
└── docs/               # 文档目录
    ├── README.md       # 模块说明
    ├── API.md          # 接口文档
    └── CHANGELOG.md    # 更新日志
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:5173

# 生产构建
npm run build
# 产物输出到 dist/ 目录
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.2.x | UI框架 |
| TypeScript | 5.2.x | 类型安全 |
| Vite | 5.0.x | 构建工具 |
| Zustand | 4.5.x | 状态管理 |
| Tailwind CSS | 3.4.x | 样式框架 |

## 📊 计算公式

### 基础伤害
```
基础伤害 = 武器伤害 × 技能系数 × 主属性加成
```

### A类区（加法）
```
A类区 = 1 + Σ(A类加成)
```

### B类区（分组相乘）
```
B类区 = Π(1 + Σ(同名词缀))
```

### 最终伤害
```
最终伤害 = 基础伤害 × A类区 × B类区 × 独立X × 暴击期望 × 易伤期望 × 压制期望
```

## 📈 伤害分解

| 乘区 | 说明 | 示例 |
|------|------|------|
| 基础伤害 | 武器伤害 × 技能系数 | 1000 × 150% = 1500 |
| A类区 | 所有加法伤害相加 | 50% + 30% = 80% |
| B类区 | 同名组内相加，各组相乘 | (1+20%) × (1+15%) = 1.38 |
| X类区 | 独立乘区各自相乘 | (1+10%) × (1+5%) = 1.155 |
| 暴击期望 | 暴击几率 × 暴击伤害 | 50% × 150% = 75% |
| 易伤期望 | 易伤几率 × (20% + 额外易伤) | 80% × 70% = 56% |

## 🔧 核心模块

### Store (状态管理)
- `useDamageStore` - 伤害计算状态管理
- 包含输入参数和计算结果
- 自动触发重新计算

### Components (组件)
- `Header` - 顶部导航组件
- `InputPanel` - 输入参数面板
- `ResultPanel` - 结果展示面板

## 🔗 API

### 状态接口

```typescript
interface DamageInputs {
  weaponDamageMin: number
  weaponDamageMax: number
  skillCoefficient: number
  mainStat: number
  additiveBonuses: number[]
  multiplicativeGroups: number[][]
  independentMultipliers: number[]
  critChance: number
  critDamage: number
  vulnerableChance: number
  vulnerableDamage: number
  overpowerChance: number
  overpowerDamage: number
}
```

### 计算结果

```typescript
interface DamageResult {
  averageWeaponDamage: number
  baseDamage: number
  classMultiplier: number
  additiveSum: number
  multiplicativeProduct: number
  independentProduct: number
  critMultiplier: number
  vulnerableMultiplier: number
  overpowerMultiplier: number
  finalDamage: number
  dps: number
}
```

## 📱 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | ≥ 90 | ✅ 支持 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 15 | ✅ 支持 |
| Edge | ≥ 90 | ✅ 支持 |
