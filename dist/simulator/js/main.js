// ══════════════════════════════════════════════════
// 主入口文件
// ══════════════════════════════════════════════════

/**
 * 应用状态管理类
 */
class AppState {
  constructor() {
    this.plans = [];
    this.activeId = null;
    this.selectedBdId = null;
    this.lastCalcResult = null;
    this.lastCalcData = null;
    this.calculator = window.D4Sim.Calculator;
    this.storage = window.D4Sim.Storage;
    this.ui = new window.D4Sim.UIManager(this);
    this.AFFIX_CONFIG = window.D4Sim.Constants.AFFIX_CONFIG;
  }

  /**
   * 初始化应用
   */
  async init() {
    // 加载BD数据
    const bdData = window.D4Sim.Config.loadBDData();
    this.builtInBDs = bdData.builds;

    // 更新BD版本信息
    const badge = window.$('bd-version-badge');
    if (badge && bdData.season) badge.textContent = bdData.season;
    const upd = window.$('bd-updated');
    if (upd && bdData.updated) upd.textContent = '更新：' + bdData.updated;

    // 加载保存的方案
    this.loadPlans();

    // 如果没有方案，创建默认方案
    if (!this.plans.length) {
      this.createDefaultPlan();
    }

    // 确保有活跃方案
    if (!this.activeId || !this.plans.find(p => p.id === this.activeId)) {
      this.activeId = this.plans[0].id;
    }

    // 保存活跃ID
    this.storage.saveActiveId(this.activeId);

    // 暴露到全局（必须在渲染UI之前，因为UI元素有onclick="window.app.xxx()"）
    window.app = this;

    // 渲染UI
    this.renderAll();

    // 初始化BD对比面板
    this.initBDComparePanel();

    // 绑定事件
    this.bindEvents();

    console.log('D4模拟器初始化完成');
  }

  /**
   * 创建默认方案
   */
  createDefaultPlan() {
    const id = window.generateId();
    this.plans.push({
      id,
      name: '方案 1',
      data: window.D4Sim.Config.getDefaultData()
    });
    this.activeId = id;
  }

  /**
   * 加载方案
   */
  loadPlans() {
    this.plans = this.storage.loadPlans();
    this.activeId = this.storage.loadActiveId();
  }

  /**
   * 保存方案
   */
  savePlans() {
    this.storage.savePlans(this.plans);
    this.storage.saveActiveId(this.activeId);
  }

  /**
   * 获取当前活跃方案
   */
  getActivePlan() {
    return this.plans.find(p => p.id === this.activeId);
  }

  /**
   * 切换方案
   */
  switchPlan(planId) {
    if (!this.plans.find(p => p.id === planId)) return;

    this.activeId = planId;
    this.savePlans();
    this.loadFormData();
    this.ui.renderPlanTabs();
  }

  /**
   * 新建方案
   */
  newPlan() {
    const id = window.generateId();
    const newPlan = {
      id,
      name: '方案 ' + (this.plans.length + 1),
      data: window.D4Sim.Config.getDefaultData()
    };

    this.plans.push(newPlan);
    this.activeId = id;
    this.savePlans();
    this.ui.renderPlanTabs();
    this.loadFormData();
    window.showToast('✓ 已创建新方案');
  }

  /**
   * 复制方案
   */
  clonePlan() {
    const activePlan = this.getActivePlan();
    if (!activePlan) return;

    const id = window.generateId();
    const clonedPlan = {
      id,
      name: activePlan.name + ' (副本)',
      data: JSON.parse(JSON.stringify(activePlan.data))
    };

    this.plans.push(clonedPlan);
    this.activeId = id;
    this.savePlans();
    this.ui.renderPlanTabs();
    this.loadFormData();
    window.showToast('✓ 已复制方案');
  }

  /**
   * 删除方案
   */
  deletePlan(planId) {
    if (this.plans.length <= 1) {
      window.showToast('❌ 至少保留一个方案');
      return;
    }

    const index = this.plans.findIndex(p => p.id === planId);
    if (index === -1) return;

    this.plans.splice(index, 1);

    // 如果删除的是当前方案，切换到第一个方案
    if (this.activeId === planId) {
      this.activeId = this.plans[0].id;
    }

    this.savePlans();
    this.ui.renderPlanTabs();
    this.loadFormData();
    window.showToast('✓ 已删除方案');
  }

  /**
   * 重命名方案
   */
  renamePlan(planId, newName) {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) return;

    plan.name = newName || '未命名方案';
    this.savePlans();
    this.ui.renderPlanTabs();
  }

  /**
   * 加载表单数据
   */
  loadFormData() {
    const plan = this.getActivePlan();
    if (!plan) return;

    const data = plan.data;

    // 基础属性
    window.setVal('f_class', data.class_id || 'barbarian');
    window.setVal('f_wpn1', data.wpn1);
    window.setVal('f_wpn2', data.wpn2);
    window.setVal('f_aps', data.aps);
    window.setVal('f_str', data.str || 5000);
    window.setVal('f_skill_pct', data.skill_pct);
    window.setChecked('f_is_dot', data.is_dot);
    window.setVal('f_hits', data.hits || 1);

    // 暴击相关
    window.setVal('f_crit_dmg_add', data.crit_dmg_add);
    window.setVal('f_crit_chance', data.crit_chance || 50);
    window.setChecked('f_crit_active', data.crit_active !== false);

    // 易伤相关
    window.setVal('f_vuln_add', data.vuln_add);
    window.setChecked('f_vuln_active', data.vuln_active !== false);
    window.setVal('f_vuln_uptime', data.vuln_uptime || 80);

    // 压制相关
    window.setVal('f_op_stacks', data.op_stacks || 0);
    window.setVal('f_op_stack_add', data.op_stack_add || 15);

    // 怪物减伤
    window.setVal('f_monster_dr', data.monster_dr || 80);
    window.setChecked('f_apply_dr', data.apply_dr);

    // 更新职业标签
    this.ui.updateClassLabel(data.class_id || 'barbarian');

    // 渲染词缀区域
    this.ui.renderAffix('a');
    this.ui.renderAffix('b');
    this.ui.renderAffix('leg');
  }

  /**
   * 保存表单数据
   */
  saveFormData() {
    const plan = this.getActivePlan();
    if (!plan) return;

    const data = plan.data;

    // 基础属性
    data.class_id = window.$('f_class')?.value || 'barbarian';
    data.wpn1 = window.getNum('f_wpn1');
    data.wpn2 = window.getNum('f_wpn2');
    data.aps = window.getNum('f_aps');
    data.str = window.getNum('f_str');
    data.skill_pct = window.getNum('f_skill_pct');
    data.is_dot = window.getChecked('f_is_dot');
    data.hits = window.getNum('f_hits');

    // 暴击相关
    data.crit_dmg_add = window.getNum('f_crit_dmg_add');
    data.crit_chance = window.getNum('f_crit_chance');
    data.crit_active = window.getChecked('f_crit_active');

    // 易伤相关
    data.vuln_add = window.getNum('f_vuln_add');
    data.vuln_active = window.getChecked('f_vuln_active');
    data.vuln_uptime = window.getNum('f_vuln_uptime');

    // 压制相关
    data.op_stacks = window.getNum('f_op_stacks');
    data.op_stack_add = window.getNum('f_op_stack_add');

    // 怪物减伤
    data.monster_dr = window.getNum('f_monster_dr');
    data.apply_dr = window.getChecked('f_apply_dr');

    this.savePlans();
  }

  /**
   * 添加词缀
   */
  addAffix(zone) {
    const plan = this.getActivePlan();
    if (!plan) return;

    const key = this.AFFIX_CONFIG[zone].key;
    if (!plan.data[key]) plan.data[key] = [];

    plan.data[key].push({ name: '', val: 0, enabled: true });
    this.savePlans();
    this.ui.renderAffix(zone);
  }

  /**
   * 删除词缀
   */
  deleteAffix(zone, index) {
    const plan = this.getActivePlan();
    if (!plan) return;

    const key = this.AFFIX_CONFIG[zone].key;
    if (!plan.data[key]) return;

    plan.data[key].splice(index, 1);
    this.savePlans();
    this.ui.renderAffix(zone);
  }

  /**
   * 切换词缀启用状态
   */
  toggleAffix(zone, index) {
    const plan = this.getActivePlan();
    if (!plan) return;

    const key = this.AFFIX_CONFIG[zone].key;
    if (!plan.data[key]) return;

    plan.data[key][index].enabled = !(plan.data[key][index].enabled !== false);
    this.savePlans();
    this.ui.renderAffix(zone);
  }

  /**
   * 更新词缀名称
   */
  updateAffixName(zone, index, value) {
    const plan = this.getActivePlan();
    if (!plan) return;

    const key = this.AFFIX_CONFIG[zone].key;
    if (!plan.data[key]) return;

    plan.data[key][index].name = value;
    this.savePlans();
  }

  /**
   * 更新词缀数值
   */
  updateAffixVal(zone, index, value) {
    const plan = this.getActivePlan();
    if (!plan) return;

    const key = this.AFFIX_CONFIG[zone].key;
    if (!plan.data[key]) return;

    plan.data[key][index].val = parseFloat(value) || 0;
    this.ui.updateZoneTotal(zone);
    this.savePlans();
  }

  /**
   * 计算伤害
   */
  calculate() {
    console.log('calculate() called');
    this.saveFormData();

    const plan = this.getActivePlan();
    if (!plan) {
      window.showToast('❌ 没有可计算的方案');
      return;
    }

    const result = this.calculator.calculate(plan.data);
    if (!result) {
      window.showToast('❌ 请先填入武器伤害！');
      return;
    }

    this.lastCalcResult = result;
    this.lastCalcData = plan.data;

    console.log('计算结果:', result);

    // 渲染结果
    this.ui.renderResult(result, plan.data);
    
    // 渲染DPS（传递result和inputData）
    this.ui.renderDPS({ result, inputData: plan.data });
    console.log('结果已渲染');

    // 如果有选中的BD，渲染对比
    if (this.selectedBdId) {
      this.renderBDCompare();
    }

    // 切换到结果标签页
    this.ui.switchRtab('result');
  }

  /**
   * 切换BD卡片展开状态
   */
  toggleBD(bdId) {
    document.querySelectorAll('.bd-card').forEach(card => {
      const isThis = card.querySelector('.bd-head')?.getAttribute('onclick')?.includes(bdId);
      card.classList.toggle('open', isThis && !card.classList.contains('open'));
    });
  }

  /**
   * 应用BD数据
   */
  applyBD(bdId) {
    const bd = this.builtInBDs.find(b => b.id === bdId);
    if (!bd) return;

    const plan = this.getActivePlan();
    if (!plan) return;

    plan.data = JSON.parse(JSON.stringify(bd.data));
    this.savePlans();
    this.loadFormData();
    window.showToast('✓ 已套用：' + bd.name);
  }

  /**
   * 选择BD进行对比
   */
  selectBDForCompare(bdId) {
    this.selectedBdId = bdId;
    this.ui.renderBDs(this.builtInBDs);
    window.showToast('✓ 已选为对比：' + this.builtInBDs.find(b => b.id === bdId)?.name);

    // 切换到BD对比标签页
    this.ui.switchRtab('bdcmp');

    // 如果有计算结果，渲染对比
    if (this.lastCalcResult) {
      this.renderBDCompare();
    }
  }

  /**
   * 渲染BD对比
   */
  renderBDCompare() {
    // 旧版本的BD对比功能已被新的runBDCompare()替代
    // 此方法保留但不执行任何操作
  }

  /**
   * 获取所有可对比的方案列表（自建 + 内置BD）
   */
  getAllComparables() {
    const userPlans = this.plans.map(p => ({
      id: 'u_' + p.id,
      name: '⚔ ' + p.name,
      data: p.data,
      type: 'user'
    }));
    const bdPlans = this.builtInBDs.map(b => ({
      id: 'bd_' + b.id,
      name: b.icon + ' ' + b.name + ' (参考)',
      data: b.data,
      type: 'bd'
    }));
    return [...userPlans, ...bdPlans];
  }

  /**
   * 初始化对比面板的选项列表
   */
  initBDComparePanel() {
    const all = this.getAllComparables();
    
    // 基准下拉
    const baseEl = window.$('cmp-base');
    if (!baseEl) return;
    baseEl.innerHTML = all.map(item => `
      <option value="${item.id}" ${item.id === 'u_' + this.activeId ? 'selected' : ''}>
        ${item.name}
      </option>
    `).join('');
    
    // 对比目标多选
    const targEl = window.$('cmp-targets');
    if (!targEl) return;
    targEl.innerHTML = all.map(item => `
      <label style="display:flex;align-items:center;gap:8px;padding:5px 8px;
        border-radius:4px;cursor:pointer;transition:background .15s;
        border:1px solid var(--border-faint);background:var(--ink-2)">
        <input type="checkbox" value="${item.id}"
          style="width:15px;height:15px;accent-color:var(--fire-2);cursor:pointer"
          ${item.id !== 'u_' + this.activeId ? 'checked' : ''}>
        <span style="font-size:12px;font-weight:600;color:${item.type === 'bd' ? 'var(--sapphire)' : 'var(--text-primary)'}">${item.name}</span>
      </label>
    `).join('');
  }

  /**
   * 执行BD对比
   */
  runBDCompare() {
    const all = this.getAllComparables();
    const baseId = window.$('cmp-base')?.value;

    // 勾选的对比目标
    const checked = [...document.querySelectorAll('#cmp-targets input:checked')].map(el => el.value);
    if (!checked.length) {
      window.$('bdcmp-result').innerHTML = '<div class="empty"><div class="empty-icon">⚖</div><div class="empty-text">请至少勾选一个对比目标</div></div>';
      return;
    }

    const baseItem = all.find(x => x.id === baseId);
    if (!baseItem) {
      window.$('bdcmp-result').innerHTML = '<div class="empty"><div class="empty-text">找不到基准方案</div></div>';
      return;
    }

    // 计算所有对比项
    const calcItem = (item) => {
      const d = { ...item.data, crit_active: false, apply_dr: false };
      const r = this.calculator.calculate(d);
      if (!r) return null;
      
      const cc = Math.min(d.crit_chance || 0, 100) / 100;
      const cdMult = 1.5;  // 固定
      const critExp = d.is_dot ? 1 : ((1 - cc) + cc * cdMult);
      const hps = (d.aps || 1) * (d.hits || 1);
      const vuln_up = (d.vuln_uptime || 0) / 100;
      const baseNoVuln = (r.afterB || r.afterAdd) * critExp * r.legMult;
      const dps = (baseNoVuln * 1.2 * vuln_up + baseNoVuln * (1 - vuln_up)) * hps;
      
      return {
        item, r, d,
        dmg: r.afterLeg,
        dps,
        aTotal: this.affixTotal(d.affix_a || []),
        bTotal: (this.calcBMult(d.affix_b || []) - 1) * 100,  // 等效百分比
        legMult: r.legMult
      };
    };

    const baseCalc = calcItem(baseItem);
    if (!baseCalc) {
      window.$('bdcmp-result').innerHTML = '<div class="empty"><div class="empty-text">基准方案无武器数据，无法计算</div></div>';
      return;
    }

    const targets = checked.map(id => {
      const item = all.find(x => x.id === id);
      if (!item) return null;
      return calcItem(item);
    }).filter(Boolean);

    // 渲染结果
    let html = '';

    // 基准卡片
    html += `<div style="background:rgba(224,160,32,.07);border:1.5px solid var(--border-mid);
      border-radius:8px;padding:12px 14px;margin-bottom:10px">
      <div style="font-size:10px;letter-spacing:1.5px;color:var(--fire-2);
        font-family:'Share Tech Mono',monospace;text-transform:uppercase;margin-bottom:6px">基准方案</div>
      <div style="font-family:'Cinzel',serif;font-size:15px;font-weight:700;color:var(--fire-1);margin-bottom:4px">${baseItem.name}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px">
        <div style="color:var(--text-secondary)">单次伤害：<span style="color:var(--fire-1);font-weight:700">${this.formatNumber(baseCalc.dmg)}</span></div>
        <div style="color:var(--text-secondary)">DPS：<span style="color:var(--fire-1);font-weight:700">${this.formatNumber(baseCalc.dps)}</span></div>
        <div style="color:var(--text-secondary)">A类：<span style="color:var(--text-primary)">+${baseCalc.aTotal.toFixed(0)}%</span></div>
        <div style="color:var(--text-secondary)">B类：<span style="color:var(--text-primary)">+${baseCalc.bTotal.toFixed(0)}%</span></div>
        <div style="color:var(--text-secondary)">独立X：<span style="color:var(--text-primary)">×${baseCalc.legMult.toFixed(3)}</span></div>
        <div style="color:var(--text-secondary)">暴击率：<span style="color:var(--text-primary)">${baseCalc.d.crit_chance || 0}%</span></div>
      </div>
    </div>`;

    // 对比项
    targets.forEach(t => {
      const dmgDiff = (t.dmg - baseCalc.dmg) / baseCalc.dmg * 100;
      const dpsDiff = (t.dps - baseCalc.dps) / baseCalc.dps * 100;
      const isAhead = dmgDiff >= 0;
      const isBD = t.item.type === 'bd';

      const rows = [
        { key: 'A类合计', mine: `+${baseCalc.aTotal.toFixed(0)}%`, theirs: `+${t.aTotal.toFixed(0)}%`, diff: t.aTotal - baseCalc.aTotal, unit: '%' },
        { key: 'B类乘区', mine: `×${(1 + baseCalc.bTotal / 100).toFixed(3)}`, theirs: `×${(1 + t.bTotal / 100).toFixed(3)}`, diff: t.bTotal - baseCalc.bTotal, unit: '%' },
        { key: '独立X', mine: `×${baseCalc.legMult.toFixed(3)}`, theirs: `×${t.legMult.toFixed(3)}`, diff: (t.legMult - baseCalc.legMult) * 100, unit: '%' },
        { key: '暴击率', mine: `${baseCalc.d.crit_chance || 0}%`, theirs: `${t.d.crit_chance || 0}%`, diff: (t.d.crit_chance || 0) - (baseCalc.d.crit_chance || 0), unit: '%' },
        { key: '力量', mine: `${baseCalc.d.str || 0}`, theirs: `${t.d.str || 0}`, diff: (t.d.str || 0) - (baseCalc.d.str || 0), unit: '' },
      ];

      html += `<div style="background:var(--ink-2);border:1px solid ${isBD ? 'rgba(64,150,255,.35)' : 'var(--border-soft)'};
        border-radius:8px;padding:12px 14px;margin-bottom:8px">
        <!-- 对比对象名称 + 总差 -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;
          padding-bottom:8px;border-bottom:1px solid var(--border-faint)">
          <div style="font-family:'Cinzel',serif;font-size:13px;font-weight:700;
            color:${isBD ? 'var(--sapphire)' : 'var(--text-primary)'}">${t.item.name}</div>
          <div style="text-align:right">
            <div style="font-family:'Cinzel',serif;font-size:18px;font-weight:900;
              color:${isAhead ? 'var(--emerald)' : 'var(--crimson)'};
              filter:drop-shadow(0 0 8px ${isAhead ? 'rgba(0,214,143,.4)' : 'rgba(255,77,79,.3)'})"
              >${isAhead ? '+' : ''}${dmgDiff.toFixed(1)}%</div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:2px">
              DPS ${dpsDiff >= 0 ? '+' : ''}${dpsDiff.toFixed(1)}%
            </div>
          </div>
        </div>
        <!-- 伤害对比条 -->
        <div style="margin-bottom:10px">
          ${['单次伤害', 'DPS'].map((label, li) => {
            const base = li === 0 ? baseCalc.dmg : baseCalc.dps;
            const them = li === 0 ? t.dmg : t.dps;
            const max = Math.max(base, them);
            const bPct = (base / max * 100).toFixed(0);
            const tPct = (them / max * 100).toFixed(0);
            return `<div style="margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;font-size:10px;
                color:var(--text-muted);margin-bottom:3px;font-family:'Share Tech Mono',monospace">
                <span>${label}</span>
                <span>基准 ${this.formatNumber(base)} | 对比 ${this.formatNumber(them)}</span>
              </div>
              <div style="height:5px;background:var(--ink-0);border-radius:3px;overflow:hidden;margin-bottom:2px">
                <div style="width:${bPct}%;height:100%;background:var(--fire-2);border-radius:3px"></div>
              </div>
              <div style="height:5px;background:var(--ink-0);border-radius:3px;overflow:hidden">
                <div style="width:${tPct}%;height:100%;background:${them >= base ? 'var(--emerald)' : 'var(--crimson)'};border-radius:3px"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <!-- 逐项对比 -->
        <div style="display:flex;flex-direction:column;gap:3px">
          ${rows.map(row => {
            const pos = row.diff > 0, neg = row.diff < 0;
            const clr = pos ? 'var(--emerald)' : neg ? 'var(--crimson)' : 'var(--text-muted)';
            const sign = pos ? '+' : '';
            return `<div style="display:grid;grid-template-columns:1fr auto auto auto;
              gap:8px;align-items:center;padding:4px 8px;
              background:var(--ink-3);border-radius:3px;font-size:11px">
              <span style="color:var(--text-secondary)">${row.key}</span>
              <span style="color:var(--text-primary);font-weight:600">${row.mine}</span>
              <span style="color:${isBD ? 'var(--sapphire)' : 'var(--text-secondary)'}">${row.theirs}</span>
              <span style="color:${clr};font-weight:700;font-family:'Share Tech Mono',monospace;
                min-width:46px;text-align:right">${sign}${row.diff.toFixed(row.unit ? 1 : 0)}${row.unit}</span>
            </div>`;
          }).join('')}
        </div>
        <!-- 切换按钮（仅自建方案） -->
        ${t.item.type === 'user' ? `
        <button onclick="window.app.switchPlan('${t.item.id.replace('u_', '')}');window.app.ui.switchRtab('result')"
          style="width:100%;margin-top:10px;padding:7px;
            background:rgba(224,160,32,.1);border:1px solid var(--border-mid);
            color:var(--fire-1);font-family:'Cinzel',serif;font-size:11px;
            font-weight:700;letter-spacing:1px;cursor:pointer;border-radius:6px">
          切换到此方案
        </button>` : ''}
      </div>`;
    });

    window.$('bdcmp-result').innerHTML = html;
  }

  /**
   * 计算词缀合计
   */
  affixTotal(arr) {
    return (arr || [])
      .filter(r => r.enabled !== false)
      .reduce((s, r) => s + (r.val || 0), 0);
  }

  /**
   * 计算B类乘区
   */
  calcBMult(arr) {
    const rows = (arr || []).filter(r => r.enabled !== false && (r.val || 0) > 0);
    if (!rows.length) return 1;

    // 按名称分组
    const groups = {};
    rows.forEach(r => {
      const key = (r.name || '').trim() || '__unnamed__';
      if (!groups[key]) groups[key] = 0;
      groups[key] += r.val || 0;
    });

    // 每组独立相乘
    let mult = 1;
    Object.values(groups).forEach(total => {
      mult *= (1 + total / 100);
    });
    return mult;
  }

  /**
   * 导出方案
   */
  async exportPlan() {
    const plan = this.getActivePlan();
    if (!plan) return;

    await this.storage.exportPlan(plan);
  }

  /**
   * 导出BD格式
   */
  async exportAsBD() {
    const plan = this.getActivePlan();
    if (!plan) return;

    await this.storage.exportAsBD(plan);
  }

  /**
   * 触发文件导入
   */
  triggerImportFile() {
    const input = window.$('import-file-input');
    if (input) {
      input.value = '';
      input.click();
    }
  }

  /**
   * 处理文件导入
   */
  async handleImportFile(input) {
    const file = input.files[0];
    if (!file) return;

    const importedPlan = await this.storage.importPlan(file);
    if (!importedPlan) return;

    this.plans.push(importedPlan);
    this.activeId = importedPlan.id;
    this.savePlans();
    this.ui.renderPlanTabs();
    this.loadFormData();
    window.showToast('✓ 已导入方案：' + importedPlan.name);
  }

  /**
   * 复制结果
   */
  copyResult() {
    if (!this.lastCalcResult || !this.lastCalcData) return;

    const steps = this.calculator.buildStepData(this.lastCalcResult, this.lastCalcData);
    const text = steps.map(s => `${s.label}: ${this.formatNumber(s.val)}  ${s.mult}`).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      window.showToast('✓ 已复制到剪贴板');
    }).catch(() => {
      window.showToast('❌ 复制失败');
    });
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

  // ══════════════════════════════════════════════════
  // 快照系统 — 最多 5 个，手动保存，可恢复
  // ══════════════════════════════════════════════════

  loadSnaps() {
    try {
      return JSON.parse(localStorage.getItem('d4_snapshots') || '[]');
    } catch (e) {
      return [];
    }
  }

  saveSnaps(snaps) {
    localStorage.setItem('d4_snapshots', JSON.stringify(snaps));
  }

  takeSnapshot() {
    const plan = this.getActivePlan();
    if (!plan) {
      window.showToast('❌ 请先选择一个方案');
      return;
    }

    const snaps = this.loadSnaps();
    const now = new Date();
    const time = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const snap = {
      id: 'snap_' + Date.now(),
      time,
      planName: plan.name,
      data: JSON.parse(JSON.stringify(plan.data))
    };

    snaps.unshift(snap);          // 最新的放最前
    if (snaps.length > 5) snaps.length = 5;  // 超过5个时自动截断，保留最新的
    
    this.saveSnaps(snaps);
    this.renderSnapList();
    window.showToast('✓ 快照已保存：' + snap.time);
  }

  restoreSnapshot(id) {
    const snaps = this.loadSnaps();
    const snap = snaps.find(s => s.id === id);
    if (!snap) return;

    const plan = this.getActivePlan();
    if (!plan) return;

    if (!confirm(`恢复到快照「${snap.time} · ${snap.planName}」？当前数据将被覆盖`)) return;

    plan.data = JSON.parse(JSON.stringify(snap.data));
    this.savePlans();
    this.loadFormData();
    window.showToast('✓ 已恢复快照：' + snap.time);
  }

  deleteSnapshot(id) {
    const snaps = this.loadSnaps().filter(s => s.id !== id);
    this.saveSnaps(snaps);
    this.renderSnapList();
    window.showToast('快照已删除');
  }

  renderSnapList() {
    const el = window.$('snap-list');
    if (!el) return;

    const snaps = this.loadSnaps();
    if (!snaps.length) {
      el.innerHTML = '<div style="font-size:11px;color:var(--text-muted);padding:8px 0;text-align:center">暂无快照</div>';
      return;
    }

    el.innerHTML = snaps.map(s => `
      <div style="display:flex;align-items:center;gap:6px;padding:6px 0;
        border-bottom:1px solid var(--border-faint)">
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text-primary);
            overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.planName}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:1px;
            font-family:'Share Tech Mono',monospace">${s.time}</div>
        </div>
        <button onclick="window.app.restoreSnapshot('${s.id}')" style="
          background:rgba(224,160,32,.1);border:1px solid var(--border-mid);
          color:var(--fire-2);font-size:10px;padding:3px 8px;border-radius:3px;
          cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'Cinzel',serif">恢复</button>
        <button onclick="window.app.deleteSnapshot('${s.id}')" style="
          background:rgba(255,77,79,.1);border:1px solid var(--border-mid);
          color:var(--crimson);font-size:10px;padding:3px 8px;border-radius:3px;
          cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'Cinzel',serif">删除</button>
      </div>
    `).join('');
  }

  /**
   * 渲染所有UI
   */
  renderAll() {
    this.ui.renderPlanTabs();
    this.ui.renderBDs({ builds: this.builtInBDs });
    this.renderSnapList();
    this.loadFormData();
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 页面切换
    document.querySelectorAll('.ttab').forEach(btn => {
      btn.onclick = () => this.ui.switchPage(btn.dataset.page);
    });

    // 右侧标签页切换
    document.querySelectorAll('.rtab').forEach(btn => {
      btn.onclick = () => {
        this.ui.switchRtab(btn.dataset.rtab);
        if (btn.dataset.rtab === 'bdcmp' && this.selectedBdId) {
          this.renderBDCompare();
        }
      };
    });

    // 步骤模式切换
    document.querySelectorAll('.stoggle').forEach(btn => {
      btn.onclick = () => this.ui.setStepsMode(btn.dataset.mode);
    });

    // 文件导入
    const importInput = window.$('import-file-input');
    if (importInput) {
      importInput.onchange = (e) => this.handleImportFile(e.target);
    }

    // 职业切换
    const classSelect = window.$('f_class');
    if (classSelect) {
      classSelect.onchange = () => {
        this.ui.updateClassLabel(classSelect.value);
        this.saveFormData();
      };
    }

    // 计算按钮
    const calcBtn = window.$('btn-calc');
    if (calcBtn) {
      calcBtn.onclick = () => this.calculate();
    }

    // 复制结果按钮
    const copyBtn = window.$('btn-copy-result');
    if (copyBtn) {
      copyBtn.onclick = () => this.copyResult();
    }
  }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded triggered');
  try {
    const app = new AppState();
    app.init();
    console.log('App initialized successfully');
  } catch (e) {
    console.error('App initialization error:', e);
  }
});