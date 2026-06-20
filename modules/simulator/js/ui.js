// ══════════════════════════════════════════════════
// UI交互逻辑模块
// ══════════════════════════════════════════════════

// 存储到全局对象
window.D4Sim = window.D4Sim || {};

/**
 * UI管理类
 * 负责所有UI交互和渲染
 */
class UIManager {
  constructor(appState) {
    this.appState = appState;
    this.stepsMode = 'simple';
    this.AFFIX_CONFIG = window.D4Sim.Constants.AFFIX_CONFIG;
  }

  /**
   * 渲染方案标签页
   */
  renderPlanTabs() {
    const container = window.$('plan-tabs');
    if (!container) return;

    const { plans, activeId } = this.appState;
    container.innerHTML = '';

    plans.forEach(plan => {
      const isActive = plan.id === activeId;
      const div = document.createElement('div');
      div.className = 'ptab' + (isActive ? ' active' : '');
      div.innerHTML = `
        <span class="ptab-name">${plan.name}</span>
        <button class="ptab-x" onclick="event.stopPropagation(); window.app.deletePlan('${plan.id}')">✕</button>
      `;
      div.onclick = () => this.appState.switchPlan(plan.id);
      container.appendChild(div);
    });
  }

  /**
   * 渲染词缀区域
   */
  renderAffix(zone) {
    const cfg = this.AFFIX_CONFIG[zone];
    const activePlan = this.appState.getActivePlan();
    if (!activePlan) return;

    const rows = activePlan.data[cfg.key] || [];
    const container = window.$(cfg.container);
    if (!container) return;

    container.innerHTML = '';
    rows.forEach((r, i) => {
      const on = r.enabled !== false;
      const div = document.createElement('div');
      div.className = 'xrow' + (on ? '' : ' disabled');
      div.innerHTML = `
        <button class="xtoggle ${on ? 'on' : 'off'}" 
                onclick="window.app.toggleAffix('${zone}', ${i})"
                title="${on ? '禁用' : '启用'}">${on ? '●' : '○'}</button>
        <input class="xname" type="text" value="${r.name || ''}"
               placeholder="${cfg.placeholder}"
               oninput="window.app.updateAffixName('${zone}', ${i}, this.value)">
        <input class="ni" type="number" value="${r.val || 0}" min="0" step="0.1"
               style="width:76px" 
               oninput="window.app.updateAffixVal('${zone}', ${i}, this.value)">
        <button class="xdel" onclick="window.app.deleteAffix('${zone}', ${i})" title="删除">✕</button>
      `;
      container.appendChild(div);
    });

    this.updateZoneTotal(zone);
  }

  /**
   * 更新区域合计显示
   */
  updateZoneTotal(zone) {
    const cfg = this.AFFIX_CONFIG[zone];
    const activePlan = this.appState.getActivePlan();
    if (!activePlan) return;

    const rows = activePlan.data[cfg.key] || [];
    const total = window.D4Sim.Utils.affixTotal(rows);
    const el = window.$(cfg.total);
    if (!el) return;

    if (zone === 'leg') {
      let mult = 1;
      rows.filter(r => r.enabled !== false && r.val > 0)
          .forEach(r => mult *= (1 + r.val / 100));
      el.innerHTML = `<span class="zone-total-label">独立X连乘</span>
        <span class="zone-total-val">×${mult.toFixed(4)}</span>`;
    } else if (zone === 'b') {
      const bm = window.D4Sim.Utils.calcBMult(rows);
      const groups = {};
      rows.filter(r => r.enabled !== false && (r.val || 0) > 0)
          .forEach(r => {
            const key = (r.name || '').trim() || '未命名';
            if (!groups[key]) groups[key] = 0;
            groups[key] += r.val || 0;
          });

      const groupCount = Object.keys(groups).length;
      const detail = groupCount > 1
        ? Object.entries(groups).map(([k, v]) => `×${(1 + v / 100).toFixed(3)}`).join(' × ')
        : '';

      el.innerHTML = `<span class="zone-total-label">B类乘区${groupCount > 1 ? ' (' + groupCount + '组)' : ''}</span>
        <span class="zone-total-val" title="${detail}">×${bm.toFixed(4)}</span>`;
    } else {
      el.innerHTML = `<span class="zone-total-label">A类合计</span>
        <span class="zone-total-val">+${total.toFixed(1)}% → ×${(1 + total / 100).toFixed(4)}</span>`;
    }
  }

  /**
   * 渲染BD列表
   */
  renderBDs(builds) {
    const container = window.$('bd-list');
    if (!container) return;

    const { selectedBdId } = this.appState;
    container.innerHTML = '';

    // 兼容两种格式：直接数组或带builds属性的对象
    const bdList = builds.builds || builds;

    bdList.forEach(bd => {
      const div = document.createElement('div');
      div.className = 'bd-card' + (bd.id === selectedBdId ? ' selected' : '');
      div.innerHTML = `
        <div class="bd-head" onclick="window.app.toggleBD('${bd.id}')">
          <div class="bd-icon">${bd.icon}</div>
          <div class="bd-info">
            <div class="bd-name">${bd.name}</div>
            <div class="bd-meta">${bd.desc}</div>
          </div>
          <div class="bd-tier">${bd.tier}</div>
        </div>
        <div class="bd-body">
          <div class="bd-stat-grid">
            <div class="bd-stat">武器伤害: <span>${bd.data.wpn1}${bd.data.wpn2 > 0 ? '+' + bd.data.wpn2 : ''}</span></div>
            <div class="bd-stat">主属性: <span>${bd.data.str}</span></div>
            <div class="bd-stat">A类合计: <span>+${window.D4Sim.Utils.affixTotal(bd.data.affix_a || [])}%</span></div>
            <div class="bd-stat">暴击率: <span>${bd.data.crit_chance}%</span></div>
            <div class="bd-stat">技能倍率: <span>${bd.data.skill_pct}%</span></div>
          </div>
          <div class="bd-actions">
            <button class="btn-bd" onclick="event.stopPropagation(); window.app.selectBDForCompare('${bd.id}')">选为对比</button>
            <button class="btn-bd primary" onclick="event.stopPropagation(); window.app.applyBD('${bd.id}')">套用数据</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  /**
   * 渲染计算结果
   */
  renderResult(result, inputData) {
    if (!result) {
      window.$('r-empty').style.display = 'block';
      window.$('r-content').style.display = 'none';
      return;
    }

    window.$('r-empty').style.display = 'none';
    window.$('r-content').style.display = 'block';

    const isCrit = !result.isDot && inputData.crit_active;
    const finalVal = inputData.apply_dr ? result.finalDisplay : result.finalHit;

    window.$('r-mode').textContent = result.isDot ? 'DoT 基础伤害值' : (isCrit ? '暴击命中' : '普通命中');
    window.$('r-num').textContent = window.D4Sim.Utils.formatNumber(finalVal);

    if (!result.isDot) {
      const normalFinal = result.normalHit * result.vulnMult * result.legMult;
      const critFinal = result.critHit * result.vulnMult * result.legMult;
      window.$('r-sub').textContent =
        `普通: ${window.D4Sim.Utils.formatNumber(normalFinal)}  ·  暴击: ${window.D4Sim.Utils.formatNumber(critFinal)}`
        + (result.opStackBonus > 0 ? `  ·  含压制叠层 +${result.opStackBonus.toFixed(0)}% A类` : '');
    } else {
      window.$('r-sub').textContent = 'DoT — 不触发暴击';
    }

    this.renderSteps(result, inputData);
  }

  /**
   * 渲染计算步骤
   */
  renderSteps(result, inputData) {
    const steps = this.appState.calculator.buildStepData(result, inputData);

    // 简单步骤
    this.renderSimpleSteps(steps);

    // 详细步骤
    this.renderDetailSteps(steps);
  }

  /**
   * 渲染简单步骤
   */
  renderSimpleSteps(steps) {
    const container = window.$('steps-simple-content');
    if (!container) return;

    container.innerHTML = steps.map((step, index) => `
      <div class="step-s ${step.isFinal ? 'hl' : ''}">
        <div class="step-icon">${step.icon}</div>
        <div class="step-label">
          ${step.label}
          ${step.note ? `<small class="note">${step.note}</small>` : ''}
        </div>
        <div class="step-mult">${step.mult}</div>
        <div class="step-val">${window.D4Sim.Utils.formatNumber(step.val)}</div>
      </div>
      ${index < steps.length - 1 ? '<div class="step-arrow">↓</div>' : ''}
    `).join('');
  }

  /**
   * 渲染详细步骤
   */
  renderDetailSteps(steps) {
    const container = window.$('steps-detail-content');
    if (!container) return;

    container.innerHTML = steps.map(step => `
      <div class="step-d ${step.isFinal ? 'final' : ''}">
        <div class="step-d-head" onclick="this.parentElement.classList.toggle('open')">
          <div class="step-d-icon">${step.icon}</div>
          <div class="step-d-name">${step.label}</div>
          <div class="step-d-result">${window.D4Sim.Utils.formatNumber(step.val)}</div>
        </div>
        <div class="step-d-body">
          <div><strong>计算结果：</strong>${window.D4Sim.Utils.formatNumber(step.val)}</div>
          <div><strong>乘数：</strong>${step.mult || '×1.000'}</div>
          ${step.note ? `<div><strong>说明：</strong>${step.note}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * 渲染DPS数据
   */
  renderDPS(dpsData) {
    if (!dpsData) return;

    // 显示DPS内容区域
    const dpsEmpty = window.$('dps-empty');
    const dpsContent = window.$('dps-content');
    if (dpsEmpty) dpsEmpty.style.display = 'none';
    if (dpsContent) dpsContent.style.display = 'block';

    // 计算DPS相关数据
    const { result, inputData } = dpsData;
    const aps = inputData.aps || 1;
    const hits = inputData.hits || 1;
    const hps = aps * hits;
    const cc = Math.min(inputData.crit_chance || 0, 100) / 100;
    const cdMult = 1.5;  // 固定基础暴击乘数
    const critExp = result.isDot ? 1 : ((1 - cc) + cc * cdMult);
    const vuln_up = (inputData.vuln_uptime || 0) / 100;
    const baseNoVuln = (result.afterB || result.afterAdd) * critExp * result.legMult;
    const baseVuln = baseNoVuln * 1.2;
    const avg = baseVuln * vuln_up + baseNoVuln * (1 - vuln_up);
    const dps = avg * hps;

    // 更新主显示
    const dpsMain = window.$('dps-main');
    const dpsSub = window.$('dps-sub');
    if (dpsMain) dpsMain.textContent = window.D4Sim.Utils.formatNumber(dps);
    if (dpsSub) dpsSub.textContent = `APS ${aps.toFixed(2)} × ${hits}次/挥  ·  易伤覆盖 ${inputData.vuln_uptime || 0}%`;

    // 更新详细数据网格
    const dpsGrid = window.$('dps-grid');
    if (dpsGrid) {
      dpsGrid.innerHTML = `
        <div class="dps-stat"><div class="dps-key">命中/秒</div><div class="dps-val">${hps.toFixed(2)}</div><div class="dps-sub">APS×${hits}</div></div>
        <div class="dps-stat"><div class="dps-key">暴击期望系数</div><div class="dps-val">${critExp.toFixed(3)}</div><div class="dps-sub">CC${inputData.crit_chance}%</div></div>
        <div class="dps-stat"><div class="dps-key">无易伤 DPS</div><div class="dps-val">${window.D4Sim.Utils.formatNumber(baseNoVuln * hps)}</div><div class="dps-sub">目标无易伤</div></div>
        <div class="dps-stat"><div class="dps-key">满易伤 DPS</div><div class="dps-val">${window.D4Sim.Utils.formatNumber(baseVuln * hps)}</div><div class="dps-sub">全程易伤</div></div>
        <div class="dps-stat"><div class="dps-key">易伤覆盖</div><div class="dps-val">${inputData.vuln_uptime}%</div><div class="dps-sub">加权平均</div></div>
        <div class="dps-stat"><div class="dps-key">APS</div><div class="dps-val">${aps.toFixed(3)}</div><div class="dps-sub">已含加成</div></div>
      `;
    }
  }

  /**
   * 更新职业标签
   */
  updateClassLabel(classId) {
    const cls = window.D4Sim.Config.getClassConfig(classId);
    const statEl = window.$('stat-label');
    if (statEl) {
      const small = statEl.querySelector('small');
      statEl.childNodes[0].textContent = cls.stat_label + '（主属性）';
      if (small) small.id = 'stat-div-label';
    }

    const divEl = window.$('stat-div-label');
    if (divEl) {
      divEl.textContent = `系数：1 + ${cls.stat_label}/${cls.stat_div}`;
    }
  }

  /**
   * 切换步骤显示模式
   */
  setStepsMode(mode) {
    this.stepsMode = mode;

    document.querySelectorAll('.stoggle').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    window.$('steps-simple').style.display = mode === 'simple' ? 'block' : 'none';
    window.$('steps-detail').style.display = mode === 'detail' ? 'block' : 'none';
  }

  /**
   * 切换页面
   */
  switchPage(pageName) {
    document.querySelectorAll('.ttab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageName);
    });

    if (pageName === 'guide') {
      window.$('cols').style.display = 'none';
      window.$('page-guide').style.display = 'block';
    } else {
      window.$('cols').style.display = 'grid';
      window.$('page-guide').style.display = 'none';
    }
  }

  /**
   * 切换右侧标签页
   */
  switchRtab(tabName) {
    document.querySelectorAll('.rtab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.rtab === tabName);
    });

    document.querySelectorAll('.rtab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'rtab-' + tabName);
    });
  }

  /**
   * 显示提示消息
   */
  showToast(message) {
    window.showToast(message);
  }
}

// 存储构造函数到全局
window.D4Sim.UIManager = UIManager;