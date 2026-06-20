/**
 * 工具函数库 - 共享工具函数
 */

const Utils = {
  /**
   * 格式化数字（千分位）
   * @param {number} num - 数字
   * @returns {string} 格式化后的字符串
   */
  formatNumber: function(num) {
    if (num === undefined || num === null || isNaN(num)) return '0';
    return num.toLocaleString('zh-CN');
  },

  /**
   * 格式化百分比
   * @param {number} num - 小数
   * @param {number} decimals - 小数位数
   * @returns {string} 百分比字符串
   */
  formatPercent: function(num, decimals = 1) {
    if (num === undefined || num === null || isNaN(num)) return '0%';
    return (num * 100).toFixed(decimals) + '%';
  },

  /**
   * 格式化大数字
   * @param {number} num - 数字
   * @returns {string} 格式化后的字符串（如 1.2M, 5.6B）
   */
  formatLargeNumber: function(num) {
    if (num === undefined || num === null || isNaN(num)) return '0';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  },

  /**
   * 生成唯一ID
   * @returns {string} 唯一ID
   */
  generateId: function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * 深拷贝对象
   * @param {object} obj - 源对象
   * @returns {object} 拷贝后的对象
   */
  deepClone: function(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = this.deepClone(obj[key]);
        }
      }
      return cloned;
    }
  },

  /**
   * 防抖函数
   * @param {function} fn - 函数
   * @param {number} delay - 延迟时间(ms)
   * @returns {function} 防抖后的函数
   */
  debounce: function(fn, delay = 300) {
    let timer = null;
    return function(...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * 节流函数
   * @param {function} fn - 函数
   * @param {number} delay - 节流时间(ms)
   * @returns {function} 节流后的函数
   */
  throttle: function(fn, delay = 300) {
    let lastTime = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  },

  /**
   * 获取URL参数
   * @param {string} name - 参数名
   * @returns {string|null} 参数值
   */
  getUrlParam: function(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  /**
   * 设置URL参数
   * @param {string} name - 参数名
   * @param {string} value - 参数值
   */
  setUrlParam: function(name, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(name, value);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
  },

  /**
   * 计算数组平均值
   * @param {number[]} arr - 数字数组
   * @returns {number} 平均值
   */
  average: function(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  },

  /**
   * 限制数字范围
   * @param {number} num - 数字
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number} 限制后的数字
   */
  clamp: function(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },

  /**
   * 随机数生成
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number} 随机数
   */
  random: function(min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * 随机整数生成
   * @param {number} min - 最小值
   * @param {number} max - 最大值（包含）
   * @returns {number} 随机整数
   */
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * 数组随机排序
   * @param {array} arr - 数组
   * @returns {array} 排序后的数组
   */
  shuffle: function(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },

  /**
   * 格式化时间
   * @param {Date} date - 日期对象
   * @returns {string} 格式化后的时间字符串
   */
  formatTime: function(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  /**
   * 检查对象是否为空
   * @param {object} obj - 对象
   * @returns {boolean} 是否为空
   */
  isEmpty: function(obj) {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
  },

  /**
   * 数组去重
   * @param {array} arr - 数组
   * @returns {array} 去重后的数组
   */
  unique: function(arr) {
    return [...new Set(arr)];
  },

  /**
   * 数组分组
   * @param {array} arr - 数组
   * @param {function} keyFn - 分组函数
   * @returns {object} 分组结果
   */
  groupBy: function(arr, keyFn) {
    return arr.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}