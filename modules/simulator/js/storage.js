// ══════════════════════════════════════════════════
// 存储管理模块
// ══════════════════════════════════════════════════

// 存储到全局对象
window.D4Sim = window.D4Sim || {};

/**
 * 存储管理类
 * 负责数据的持久化、导入导出
 */
class StorageManager {
  constructor() {
    const Constants = window.D4Sim.Constants;
    this.storageKey = Constants.STORAGE_KEYS.PLANS;
    this.VALID_DATA_KEYS = Constants.VALID_DATA_KEYS;
  }

  /**
   * 保存所有方案
   */
  savePlans(plans) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(plans));
      return true;
    } catch (e) {
      console.error('保存方案失败:', e);
      window.showToast('❌ 保存失败，存储空间不足');
      return false;
    }
  }

  /**
   * 加载所有方案
   */
  loadPlans() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      
      // 确保返回的是数组
      if (!Array.isArray(parsed)) {
        console.warn('存储数据格式不正确，已重置');
        return [];
      }
      
      return parsed;
    } catch (e) {
      console.error('加载方案失败:', e);
      return [];
    }
  }

  /**
   * 保存活跃方案ID
   */
  saveActiveId(activeId) {
    try {
      localStorage.setItem(this.storageKey + '_active', activeId);
      return true;
    } catch (e) {
      console.error('保存活跃ID失败:', e);
      return false;
    }
  }

  /**
   * 加载活跃方案ID
   */
  loadActiveId() {
    try {
      return localStorage.getItem(this.storageKey + '_active');
    } catch (e) {
      console.error('加载活跃ID失败:', e);
      return null;
    }
  }

  /**
   * 数据清理和兼容转换
   */
  cleanData(raw) {
    const d = { ...raw };

    // add_gear / add_paragon → affix_a
    if (!d.affix_a) d.affix_a = [];
    if ((d.add_gear || 0) > 0) {
      d.affix_a.push({ name: '装备A类合计(旧格式)', val: d.add_gear, enabled: true });
    }
    if ((d.add_paragon || 0) > 0) {
      d.affix_a.push({ name: '巅峰A类合计(旧格式)', val: d.add_paragon, enabled: true });
    }

    // b_multis → affix_b（旧字段名）
    if (!d.affix_b) d.affix_b = [];
    if (d.b_multis && d.b_multis.length > 0) {
      d.affix_b = [...d.affix_b, ...d.b_multis];
    }

    // add_b → affix_b（另一种旧格式）
    if ((d.add_b || 0) > 0 && d.affix_b.length === 0) {
      d.affix_b.push({ name: 'B类合计(旧格式)', val: d.add_b, enabled: true });
    }

    // crit_dmg_add 旧字段 → 迁移到 affix_a
    if ((d.crit_dmg_add || 0) > 0) {
      if (!d.affix_a) d.affix_a = [];
      const alreadyIn = d.affix_a.some(x => x.name === '暴击伤害[+]' || x.name === '暴击伤害');
      if (!alreadyIn) {
        d.affix_a.push({ name: '暴击伤害[+]', val: d.crit_dmg_add, enabled: true });
      }
    }

    // multi_leg 确保每条有 enabled 字段
    if (d.multi_leg) {
      d.multi_leg = d.multi_leg.map(r => ({
        name: r.name || '',
        val: r.val || 0,
        enabled: r.enabled !== false
      }));
    }

    // 只输出当前有效字段
    const clean = {};
    this.VALID_DATA_KEYS.forEach(k => {
      if (d[k] !== undefined) clean[k] = d[k];
    });

    // 确保数组字段存在
    if (!clean.affix_a) clean.affix_a = [];
    if (!clean.affix_b) clean.affix_b = [];
    if (!clean.multi_leg) clean.multi_leg = [];

    return clean;
  }

  /**
   * 导出当前方案为JSON文件
   */
  async exportPlan(plan) {
    if (!plan) {
      window.showToast('❌ 没有可导出的方案');
      return false;
    }

    try {
      const cleanedData = this.cleanData(plan.data);
      const payload = JSON.stringify({ name: plan.name, data: cleanedData }, null, 2);
      const safeName = window.D4Sim.Utils.sanitizeFileName(plan.name);
      const filename = `D4_${safeName}_${new Date().toISOString().slice(0, 10)}.json`;

      window.D4Sim.Utils.downloadFile(payload, filename);
      window.showToast('✓ 已导出方案：' + safeName);
      return true;
    } catch (e) {
      console.error('导出方案失败:', e);
      window.showToast('❌ 导出失败：' + e.message);
      return false;
    }
  }

  /**
   * 导出为BD参考格式
   */
  async exportAsBD(plan) {
    if (!plan) {
      window.showToast('❌ 没有可导出的方案');
      return false;
    }

    try {
      const cleanedData = this.cleanData(plan.data);
      const bd = {
        id: 'bd_' + Date.now(),
        name: plan.name,
        icon: '⚔',
        tier: 'T? · 待填写',
        desc: '待填写描述',
        data: cleanedData
      };

      const payload = JSON.stringify(bd, null, 2);
      const safeName = window.D4Sim.Utils.sanitizeFileName(plan.name);
      const filename = `D4_BD_${safeName}_${new Date().toISOString().slice(0, 10)}.json`;

      window.D4Sim.Utils.downloadFile(payload, filename);
      window.showToast('✓ 已导出BD格式，补充 icon/tier/desc 后粘贴到 bd-data');
      return true;
    } catch (e) {
      console.error('导出BD失败:', e);
      window.showToast('❌ 导出失败：' + e.message);
      return false;
    }
  }

  /**
   * 导入方案文件
   */
  async importPlan(file) {
    if (!file) {
      window.showToast('❌ 请选择文件');
      return null;
    }

    try {
      const content = await window.D4Sim.Utils.readFile(file);
      const obj = JSON.parse(content);

      if (!obj || !obj.name || !obj.data) {
        window.showToast('❌ 文件格式不对，缺少 name 或 data 字段');
        return null;
      }

      return this.importPlanObj(obj);
    } catch (err) {
      console.error('导入方案失败:', err);
      window.showToast('❌ JSON 解析失败：' + err.message);
      return null;
    }
  }

  /**
   * 导入方案对象（通用）— 自动兼容旧格式
   */
  importPlanObj(obj) {
    const id = 'p' + Date.now();
    const existingPlans = this.loadPlans();
    const name = existingPlans.find(p => p.name === obj.name) ? obj.name + ' (导入)' : obj.name;

    // 清理并兼容转换旧字段
    const cleanedData = this.cleanData(obj.data || {});

    return {
      id,
      name,
      data: cleanedData
    };
  }

  /**
   * 清除所有数据
   */
  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.storageKey + '_active');
      window.showToast('✓ 已清除所有数据');
      return true;
    } catch (e) {
      console.error('清除数据失败:', e);
      window.showToast('❌ 清除失败');
      return false;
    }
  }

  /**
   * 获取存储使用情况
   */
  getStorageInfo() {
    try {
      const data = localStorage.getItem(this.storageKey);
      const size = data ? new Blob([data]).size : 0;
      const quota = 5 * 1024 * 1024;
      const percent = (size / quota * 100).toFixed(2);

      return {
        size,
        quota,
        percent,
        used: percent + '%'
      };
    } catch (e) {
      return { size: 0, quota: 0, percent: 0, used: '0%' };
    }
  }
}

// 创建单例并存储到全局
window.D4Sim.Storage = new StorageManager();