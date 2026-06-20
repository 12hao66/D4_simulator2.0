// ══════════════════════════════════════════════════
// 常量定义
// ══════════════════════════════════════════════════

// 存储到全局对象
window.D4Sim = window.D4Sim || {};
window.D4Sim.Constants = {
  // 存储键名
  STORAGE_KEYS: {
    PLANS: 'd4_s13_v2',
    SNAPS: 'd4_s13_snaps'
  },

  // 最大快照数量
  MAX_SNAPS: 5,

  // 全职业主属性配置
  CLASSES: [
    { id: 'barbarian', name: '野蛮人', icon: '⚔', stat_label: '力量', stat_div: 900 },
    { id: 'druid', name: '德鲁伊', icon: '🌿', stat_label: '意志', stat_div: 800 },
    { id: 'sorc', name: '法师', icon: '🔥', stat_label: '智慧', stat_div: 800 },
    { id: 'necro', name: '死灵法师', icon: '💀', stat_label: '智慧', stat_div: 800 },
    { id: 'rogue', name: '游侠', icon: '🗡', stat_label: '敏捷', stat_div: 800 },
    { id: 'paladin', name: '圣骑士', icon: '🛡', stat_label: '力量', stat_div: 900 },
    { id: 'spiritborn', name: '术士', icon: '🦅', stat_label: '敏捷', stat_div: 800 }
  ],

  // 词缀配置
  AFFIX_CONFIG: {
    a: {
      key: 'affix_a',
      container: 'xsec-a',
      total: 'total-a',
      placeholder: '如：核心技能伤害 / 近战伤害'
    },
    b: {
      key: 'affix_b',
      container: 'xsec-b',
      total: 'total-b',
      placeholder: '如：物理伤害倍增 / 深渊技能倍增'
    },
    leg: {
      key: 'multi_leg',
      container: 'xsec-leg',
      total: 'total-leg',
      placeholder: '如：旋风斩威能 / 套装2件效果'
    }
  },

  // 有效数据字段
  VALID_DATA_KEYS: [
    'class_id', 'wpn1', 'wpn2', 'aps', 'str',
    'skill_pct', 'is_dot', 'hits',
    'affix_a', 'affix_b', 'multi_leg',
    'crit_chance', 'crit_active',
    'vuln_add', 'vuln_active', 'vuln_uptime',
    'op_stacks', 'op_stack_add',
    'monster_dr', 'apply_dr'
  ],

  // 步骤模式
  STEPS_MODE: {
    SIMPLE: 'simple',
    DETAIL: 'detail'
  },

  // 页面模式
  PAGE_MODE: {
    SIM: 'sim',
    BDCMP: 'bdcmp',
    GUIDE: 'guide'
  }
};