/**
 * 存储管理模块 - 共享存储工具
 */

const Storage = {
  // 存储键前缀
  PREFIX: 'd4_simulator_',

  /**
   * 获取存储数据
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值
   * @returns {*} 存储的数据
   */
  get: function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error('Storage.get error:', e);
      return defaultValue;
    }
  },

  /**
   * 设置存储数据
   * @param {string} key - 键名
   * @param {*} value - 值
   */
  set: function(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage.set error:', e);
    }
  },

  /**
   * 删除存储数据
   * @param {string} key - 键名
   */
  remove: function(key) {
    try {
      localStorage.removeItem(this.PREFIX + key);
    } catch (e) {
      console.error('Storage.remove error:', e);
    }
  },

  /**
   * 清除所有存储数据
   */
  clear: function() {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.PREFIX));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error('Storage.clear error:', e);
    }
  },

  /**
   * 获取所有存储的键
   * @returns {string[]} 键列表
   */
  keys: function() {
    try {
      return Object.keys(localStorage).filter(key => key.startsWith(this.PREFIX));
    } catch (e) {
      console.error('Storage.keys error:', e);
      return [];
    }
  },

  /**
   * 检查键是否存在
   * @param {string} key - 键名
   * @returns {boolean} 是否存在
   */
  has: function(key) {
    return localStorage.getItem(this.PREFIX + key) !== null;
  },

  /**
   * 获取存储数据数量
   * @returns {number} 数量
   */
  size: function() {
    return this.keys().length;
  },

  // ========== 方案管理 ==========

  /**
   * 保存方案
   * @param {object} scheme - 方案对象
   */
  saveScheme: function(scheme) {
    const schemes = this.getSchemes();
    const index = schemes.findIndex(s => s.id === scheme.id);
    if (index >= 0) {
      schemes[index] = scheme;
    } else {
      schemes.push(scheme);
    }
    this.set('schemes', schemes);
  },

  /**
   * 获取所有方案
   * @returns {object[]} 方案列表
   */
  getSchemes: function() {
    return this.get('schemes', []);
  },

  /**
   * 获取单个方案
   * @param {string} id - 方案ID
   * @returns {object|null} 方案对象
   */
  getScheme: function(id) {
    const schemes = this.getSchemes();
    return schemes.find(s => s.id === id) || null;
  },

  /**
   * 删除方案
   * @param {string} id - 方案ID
   */
  deleteScheme: function(id) {
    const schemes = this.getSchemes().filter(s => s.id !== id);
    this.set('schemes', schemes);
  },

  /**
   * 复制方案
   * @param {string} id - 源方案ID
   * @param {string} newName - 新方案名称
   * @returns {object|null} 复制后的方案
   */
  copyScheme: function(id, newName) {
    const scheme = this.getScheme(id);
    if (!scheme) return null;
    
    const copied = {
      ...scheme,
      id: Utils.generateId(),
      name: newName,
      createdAt: Date.now()
    };
    
    this.saveScheme(copied);
    return copied;
  },

  // ========== 配置管理 ==========

  /**
   * 保存配置
   * @param {object} config - 配置对象
   */
  saveConfig: function(config) {
    this.set('config', config);
  },

  /**
   * 获取配置
   * @param {string} key - 配置键名（可选）
   * @param {*} defaultValue - 默认值
   * @returns {*} 配置值
   */
  getConfig: function(key = null, defaultValue = null) {
    const config = this.get('config', {});
    if (key === null) return config;
    return config[key] !== undefined ? config[key] : defaultValue;
  },

  /**
   * 更新配置（合并）
   * @param {object} updates - 更新的配置对象
   */
  updateConfig: function(updates) {
    const config = this.getConfig();
    this.saveConfig({ ...config, ...updates });
  },

  // ========== 快照管理 ==========

  /**
   * 保存快照
   * @param {string} module - 模块名称
   * @param {object} data - 快照数据
   */
  saveSnapshot: function(module, data) {
    const snapshots = this.get('snapshots', {});
    snapshots[module] = {
      data,
      timestamp: Date.now()
    };
    this.set('snapshots', snapshots);
  },

  /**
   * 获取快照
   * @param {string} module - 模块名称
   * @returns {object|null} 快照数据
   */
  getSnapshot: function(module) {
    const snapshots = this.get('snapshots', {});
    return snapshots[module] || null;
  },

  /**
   * 删除快照
   * @param {string} module - 模块名称
   */
  deleteSnapshot: function(module) {
    const snapshots = this.get('snapshots', {});
    delete snapshots[module];
    this.set('snapshots', snapshots);
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}