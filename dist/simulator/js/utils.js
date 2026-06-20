// ══════════════════════════════════════════════════
// 工具函数
// ══════════════════════════════════════════════════

// 存储到全局对象
window.D4Sim = window.D4Sim || {};
window.D4Sim.Utils = {
  /**
   * DOM 元素获取快捷方式
   */
  $: (id) => document.getElementById(id),

  /**
   * 获取数字输入框的值
   */
  getNum: (id) => parseFloat(window.D4Sim.Utils.$(id)?.value) || 0,

  /**
   * 获取复选框的值
   */
  getChecked: (id) => window.D4Sim.Utils.$(id)?.checked || false,

  /**
   * 设置输入框的值
   */
  setVal: (id, value) => {
    const el = window.D4Sim.Utils.$(id);
    if (el) el.value = value;
  },

  /**
   * 设置复选框的值
   */
  setChecked: (id, value) => {
    const el = window.D4Sim.Utils.$(id);
    if (el) el.checked = !!value;
  },

  /**
   * 数字格式化
   */
  formatNumber: (n) => {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + ' 亿';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + ' M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + ' K';
    return Math.round(n).toLocaleString();
  },

  /**
   * 创建词缀条目
   */
  makeAffix: (name = '', val = 0) => ({ name, val, enabled: true }),

  /**
   * 计算某个词缀数组的启用合计（A类用）
   */
  affixTotal: (arr) => {
    return (arr || [])
      .filter(r => r.enabled !== false)
      .reduce((s, r) => s + (r.val || 0), 0);
  },

  /**
   * B类乘区计算：同名词缀先合并相加，不同名各自独立相乘
   */
  calcBMult: (arr) => {
    const rows = (arr || []).filter(r => r.enabled !== false && (r.val || 0) > 0);
    if (!rows.length) return 1;

    const groups = {};
    rows.forEach(r => {
      const key = (r.name || '').trim() || '__unnamed__';
      if (!groups[key]) groups[key] = 0;
      groups[key] += r.val || 0;
    });

    let mult = 1;
    Object.values(groups).forEach(total => {
      mult *= (1 + total / 100);
    });
    return mult;
  },

  /**
   * B类分组展示（用于步骤说明）
   */
  getBGroups: (arr) => {
    const rows = (arr || []).filter(r => r.enabled !== false && (r.val || 0) > 0);
    const groups = {};
    rows.forEach(r => {
      const key = (r.name || '').trim() || '未命名';
      if (!groups[key]) groups[key] = 0;
      groups[key] += r.val || 0;
    });
    return groups;
  },

  /**
   * 显示提示消息
   */
  showToast: (message) => {
    const toast = window.D4Sim.Utils.$('toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    }
  },

  /**
   * 防抖函数
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 节流函数
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * 深拷贝对象
   */
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => window.D4Sim.Utils.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = window.D4Sim.Utils.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  },

  /**
   * 生成唯一ID
   */
  generateId: () => {
    return 'p' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * 安全的文件名处理
   */
  sanitizeFileName: (name) => {
    return name.replace(/[\\/:*?"<>|]/g, '_');
  },

  /**
   * 下载文件
   */
  downloadFile: (content, filename, mimeType = 'application/json') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  /**
   * 读取文件内容
   */
  readFile: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file, 'utf-8');
    });
  },

  /**
   * 验证JSON格式
   */
  validateJSON: (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * 延迟执行
   */
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};

// 为了兼容性，将常用函数挂到全局
window.$ = window.D4Sim.Utils.$;
window.getNum = window.D4Sim.Utils.getNum;
window.getChecked = window.D4Sim.Utils.getChecked;
window.setVal = window.D4Sim.Utils.setVal;
window.setChecked = window.D4Sim.Utils.setChecked;
window.generateId = window.D4Sim.Utils.generateId;
window.showToast = window.D4Sim.Utils.showToast;