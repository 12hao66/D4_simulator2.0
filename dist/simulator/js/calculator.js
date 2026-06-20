// ══════════════════════════════════════════════════
// 计算引擎核心逻辑
// ══════════════════════════════════════════════════

// 存储到全局对象
window.D4Sim = window.D4Sim || {};

/**
 * 计算引擎类
 * 负责处理所有伤害计算逻辑
 */
class CalculatorEngine {
  constructor() {
    this.classes = window.D4Sim.Constants.CLASSES;
  }

  /**
   * 从输入数据计算伤害
   * 公式：武器 × 技能 × 主属 × A类 × B类 × 暴击 × 易伤 × 独立X×N × 压制
   */
  calculate(inputData) {
    // ① 武器基础
    const wpnBase = (inputData.wpn1 || 0) + (inputData.wpn2 || 0);
    if (wpnBase <= 0) return null;

    const wpnAfterAdd = wpnBase;

    // ② 技能系数
    const skillMult = (inputData.skill_pct || 100) / 100;
    const afterSkill = wpnAfterAdd * skillMult;

    // ③ 主属区（各职业系数不同）
    const cls = this.classes.find(c => c.id === (inputData.class_id || 'barbarian')) || this.classes[0];
    const statMult = 1 + (inputData.str || 0) / cls.stat_div;
    const afterStat = afterSkill * statMult;

    // ④ A类区：[+]% 前缀全部加法合算
    const vulnActive = !!inputData.vuln_active;
    const opStackBonus = (inputData.op_stack_add || 15) * (inputData.op_stacks || 0);
    const aGearTotal = window.D4Sim.Utils.affixTotal(inputData.affix_a || []);
    const addTotal = aGearTotal
      + (inputData.crit_dmg_add || 0)
      + (vulnActive ? (inputData.vuln_add || 0) : 0)
      + opStackBonus;

    const addMult = 1 + addTotal / 100;
    const afterAdd = afterStat * addMult;

    // ⑤ B类区：同名词缀先合并，不同名各自独立相乘
    const bMult = window.D4Sim.Utils.calcBMult(inputData.affix_b);
    const afterB = afterAdd * bMult;

    // ⑥ 暴击
    const isDot = !!inputData.is_dot;
    const critDmgBonus = 0.5;
    let normalHit, critHit, afterCrit;

    if (isDot) {
      normalHit = critHit = afterCrit = afterB;
    } else {
      normalHit = afterB;
      critHit = afterB * (1 + critDmgBonus);
      afterCrit = inputData.crit_active ? critHit : normalHit;
    }

    // ⑦ 易伤区：×1.2 固定
    const vulnMult = vulnActive ? 1.2 : 1.0;
    const afterVuln = afterCrit * vulnMult;

    // ⑧ 独立X乘区：传奇威能/套装，各自独立相乘
    let legMult = 1;
    (inputData.multi_leg || [])
      .filter(r => r.enabled !== false && r.val > 0)
      .forEach(r => {
        legMult *= (1 + r.val / 100);
      });

    const afterLeg = afterVuln * legMult;

    // ⑨ 最终伤害
    const finalHit = afterLeg;

    // ⑩ 怪物减伤（可选展示）
    const finalDisplay = inputData.apply_dr ? finalHit * (1 - (inputData.monster_dr || 0) / 100) : finalHit;

    return {
      wpnBase,
      wpnAfterAdd,
      afterSkill,
      afterStat,
      afterAdd,
      afterB,
      afterCrit,
      afterVuln,
      afterLeg,
      normalHit,
      critHit,
      finalHit,
      finalDisplay,
      statMult,
      addMult,
      bMult,
      vulnMult,
      legMult,
      critDmgBonus,
      addTotal,
      opStackBonus,
      isDot,
      vulnActive,
      cls,
      inputData
    };
  }

  /**
   * 计算DPS
   */
  calculateDPS(result, inputData) {
    if (!result) return null;

    const aps = inputData.aps || 1.0;
    const hits = inputData.hits || 1;
    const critChance = (inputData.crit_chance || 0) / 100;
    const vulnUptime = (inputData.vuln_uptime || 80) / 100;

    // 基础DPS（不考虑易伤覆盖率）
    const baseDPS = result.finalHit * aps * hits;

    // 考虑易伤覆盖率的DPS
    const avgDPS = baseDPS * (1 - vulnUptime + vulnUptime * 1.2);

    // 暴击期望DPS
    const expectedDPS = avgDPS * (1 - critChance + critChance * 1.5);

    return {
      baseDPS,
      avgDPS,
      expectedDPS,
      aps,
      hits,
      critChance,
      vulnUptime
    };
  }

  /**
   * 构建计算步骤数据
   */
  buildStepData(result, inputData) {
    if (!result) return [];

    const isCrit = !result.isDot && inputData.crit_active;
    const cls = result.cls || { stat_label: '力量', stat_div: 900 };

    const noteA = [
      `A类词缀 +${window.D4Sim.Utils.affixTotal(inputData.affix_a || []).toFixed(0)}%`,
      inputData.crit_dmg_add > 0 ? `暴击伤害 +${inputData.crit_dmg_add}%` : '',
      result.vulnActive && inputData.vuln_add > 0 ? `易伤 +${inputData.vuln_add}%` : '',
      result.opStackBonus > 0 ? `压制叠层 +${result.opStackBonus.toFixed(0)}%` : ''
    ].filter(Boolean).join(' + ');

    const steps = [
      {
        icon: '⚔',
        label: '武器基础点伤',
        note: inputData.wpn2 > 0 ? `主手 ${this.formatNumber(inputData.wpn1)} + 副手 ${this.formatNumber(inputData.wpn2)}` : '单手武器',
        mult: '',
        val: result.wpnBase
      },
      {
        icon: '⚡',
        label: `技能系数 ×${inputData.skill_pct}%`,
        note: '',
        mult: `×${(inputData.skill_pct / 100).toFixed(3)}`,
        val: result.afterSkill
      },
      {
        icon: '💪',
        label: `主属区（${cls.stat_label} ${inputData.str}）`,
        note: `1 + ${inputData.str} / ${cls.stat_div} = ×${result.statMult.toFixed(4)}`,
        mult: `×${result.statMult.toFixed(4)}`,
        val: result.afterStat
      },
      {
        icon: '📊',
        label: `A类区 [+] ${result.addTotal.toFixed(0)}%`,
        note: noteA,
        mult: `×${result.addMult.toFixed(4)}`,
        val: result.afterAdd
      },
      {
        icon: '✖',
        label: 'B类区',
        note: this.getBNote(inputData.affix_b),
        mult: `×${result.bMult.toFixed(4)}`,
        val: result.afterB
      }
    ];

    if (!result.isDot) {
      steps.push({
        icon: '💥',
        label: isCrit ? '暴击命中 ×1.5（固定基础加成）' : '普通命中',
        note: isCrit ? '暴击伤害[+]%已归入A类区' : '未触发暴击',
        mult: isCrit ? '×1.500' : '×1.000',
        val: result.afterCrit
      });
    }

    steps.push({
      icon: '🔴',
      label: '易伤区 ×1.2',
      note: result.vulnActive ? '目标携带易伤（固定 ×1.2）' : '目标无易伤',
      mult: result.vulnActive ? '×1.200' : '×1.000',
      val: result.afterVuln
    });

    steps.push({
      icon: '⭐',
      label: '独立X连乘',
      note: this.getLegNote(inputData.multi_leg),
      mult: `×${result.legMult.toFixed(4)}`,
      val: result.afterLeg,
      isFinal: true
    });

    return steps;
  }

  /**
   * 获取B类词缀说明
   */
  getBNote(affixB) {
    const rows = (affixB || []).filter(r => r.enabled !== false && (r.val || 0) > 0);
    if (!rows.length) return '无B类词缀';

    const groups = {};
    rows.forEach(r => {
      const key = (r.name || '').trim() || '未命名';
      if (!groups[key]) groups[key] = 0;
      groups[key] += r.val || 0;
    });

    return Object.entries(groups)
      .map(([k, v]) => `${k} +${v.toFixed(0)}% → ×${(1 + v / 100).toFixed(3)}`)
      .join('  ·  ');
  }

  /**
   * 获取独立X词缀说明
   */
  getLegNote(multiLeg) {
    const rows = (multiLeg || []).filter(r => r.enabled !== false && r.val > 0);
    if (!rows.length) return '无独立X词缀';

    return rows
      .map(r => `${r.name} ×${(1 + r.val / 100).toFixed(3)}`)
      .join(' × ');
  }

  /**
   * 格式化数字
   */
  formatNumber(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + ' 亿';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + ' M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + ' K';
    return Math.round(n).toLocaleString();
  }
}

// 创建单例并存储到全局
window.D4Sim.Calculator = new CalculatorEngine();