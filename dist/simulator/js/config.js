// ══════════════════════════════════════════════════
// 配置数据和BD参考数据
// ══════════════════════════════════════════════════

// 存储到全局对象
window.D4Sim = window.D4Sim || {};
window.D4Sim.Config = {
  // BD参考数据
  BD_DATA: {
    version: "S13",
    season: "第13赛季·憎恨之躯",
    updated: "2025-06",
    builds: [
      {
        id: "ww_top",
        name: "旋风斩 顶配",
        icon: "🌀",
        tier: "T0 · 天梯 Top 0.1%",
        desc: "超高攻速 + 旋风威能，主流顶配流派",
        data: {
          class_id: "barbarian",
          wpn1: 4800, wpn2: 4500, aps: 2.1, str: 9500,
          skill_pct: 215, is_dot: false, hits: 1,
          affix_a: [
            { name: "核心技能伤害", val: 120, enabled: true },
            { name: "近战伤害", val: 80, enabled: true },
            { name: "暴击伤害[+]", val: 250, enabled: true },
            { name: "易伤伤害[+]", val: 45, enabled: true },
            { name: "巅峰盘A类", val: 80, enabled: true }
          ],
          affix_b: [
            { name: "物理伤害倍增宝石×2", val: 44, enabled: true },
            { name: "核心技能倍增", val: 22, enabled: true }
          ],
          crit_chance: 72, crit_active: true,
          vuln_add: 45, vuln_active: true, vuln_uptime: 90,
          op_stacks: 3, op_stack_add: 20,
          monster_dr: 80, apply_dr: false,
          multi_leg: [
            { name: "旋风斩传奇威能", val: 60, enabled: true },
            { name: "血腥战意套装", val: 40, enabled: true },
            { name: "巅峰独立X节点", val: 25, enabled: true }
          ]
        }
      },
      {
        id: "rend_top",
        name: "撕裂 顶配",
        icon: "🩸",
        tier: "T0 · 天梯 Top 0.5%",
        desc: "流血持续伤害，爆发恢复强，生存流",
        data: {
          class_id: "barbarian",
          wpn1: 5200, wpn2: 0, aps: 1.0, str: 8800,
          skill_pct: 47, is_dot: true, hits: 3,
          affix_a: [
            { name: "流血伤害", val: 120, enabled: true },
            { name: "核心技能伤害", val: 80, enabled: true },
            { name: "近战伤害", val: 60, enabled: true },
            { name: "易伤伤害[+]", val: 40, enabled: true },
            { name: "巅峰盘A类", val: 70, enabled: true }
          ],
          affix_b: [
            { name: "流血倍增宝石", val: 30, enabled: true },
            { name: "物理伤害倍增", val: 18, enabled: true }
          ],
          crit_chance: 50, crit_active: false,
          vuln_add: 40, vuln_active: true, vuln_uptime: 85,
          op_stacks: 0, op_stack_add: 15,
          monster_dr: 80, apply_dr: false,
          multi_leg: [
            { name: "撕裂传奇威能", val: 80, enabled: true },
            { name: "流血专属套装", val: 50, enabled: true },
            { name: "巅峰独立X", val: 20, enabled: true }
          ]
        }
      },
      {
        id: "hammer_top",
        name: "锤击 顶配",
        icon: "🔨",
        tier: "T1 · 天梯 Top 1%",
        desc: "单次爆发极高，压制叠层配合伤害惊人",
        data: {
          class_id: "barbarian",
          wpn1: 6200, wpn2: 0, aps: 0.95, str: 10200,
          skill_pct: 160, is_dot: false, hits: 1,
          affix_a: [
            { name: "核心技能伤害", val: 140, enabled: true },
            { name: "近战伤害", val: 80, enabled: true },
            { name: "对精英伤害", val: 70, enabled: true },
            { name: "暴击伤害[+]", val: 300, enabled: true },
            { name: "易伤伤害[+]", val: 50, enabled: true },
            { name: "压制叠层5×25%", val: 125, enabled: true },
            { name: "巅峰盘A类", val: 90, enabled: true }
          ],
          affix_b: [
            { name: "物理伤害倍增宝石", val: 22, enabled: true },
            { name: "近战倍增", val: 18, enabled: true }
          ],
          crit_chance: 65, crit_active: true,
          vuln_add: 50, vuln_active: true, vuln_uptime: 80,
          op_stacks: 5, op_stack_add: 25,
          monster_dr: 80, apply_dr: false,
          multi_leg: [
            { name: "锤击传奇威能", val: 70, enabled: true },
            { name: "压制专属套装", val: 55, enabled: true },
            { name: "祖父之剑暴击", val: 150, enabled: true }
          ]
        }
      }
    ]
  },

  // 默认方案数据
  getDefaultData: () => {
    return {
      class_id: 'barbarian',
      wpn1: 3000, wpn2: 0, aps: 1.2, str: 5000,
      skill_pct: 215, is_dot: false, hits: 1,
      affix_a: [],
      affix_b: [],
      crit_dmg_add: 0, crit_chance: 50, crit_active: true,
      vuln_add: 0, vuln_active: true, vuln_uptime: 80,
      op_stacks: 0, op_stack_add: 15,
      monster_dr: 80, apply_dr: false,
      multi_leg: []
    };
  },

  // 获取职业配置
  getClassConfig: (classId) => {
    const CLASSES = window.D4Sim.Constants.CLASSES;
    return CLASSES.find(c => c.id === classId) || CLASSES[0];
  },

  // 加载BD数据
  loadBDData: () => {
    try {
      const BD_DATA = window.D4Sim.Config.BD_DATA;
      const builds = (BD_DATA.builds || []).map((b, i) => ({
        ...b,
        id: b.id || ('bd_' + i)
      }));
      return {
        builds,
        season: BD_DATA.season,
        updated: BD_DATA.updated
      };
    } catch (e) {
      console.error('BD数据解析失败:', e);
      return { builds: [], season: '', updated: '' };
    }
  }
};