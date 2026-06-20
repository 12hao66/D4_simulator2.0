/**
 * 数据版本控制工具
 * 用于检测服务器数据是否更新，实现自动刷新缓存
 */

interface VersionInfo {
  version: string;
  affixes: string;
  uniqueEquipment: string;
  legendaryPowers: string;
  gems: string;
  runes: string;
  amulets: string;
}

const CACHE_VERSION_KEY = 'd4-data-version';
const STORE_KEY = 'd4-database-store';

/**
 * 获取服务器版本信息
 */
export async function getServerVersion(): Promise<VersionInfo | null> {
  try {
    const basePath = window.location.pathname.includes('/dist/') ? './data/' : './data/';
    const response = await fetch(`${basePath}version.json`);
    if (!response.ok) {
      console.warn('Failed to fetch version info');
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn('Failed to load version.json:', error);
    return null;
  }
}

/**
 * 获取本地缓存的版本信息
 */
export function getLocalVersion(): VersionInfo | null {
  try {
    const stored = localStorage.getItem(CACHE_VERSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.warn('Failed to get local version:', error);
    return null;
  }
}

/**
 * 保存版本信息到本地缓存
 */
export function saveVersion(version: VersionInfo): void {
  localStorage.setItem(CACHE_VERSION_KEY, JSON.stringify(version));
}

/**
 * 比较版本是否需要更新
 */
export function isVersionUpdated(local: VersionInfo | null, server: VersionInfo | null): boolean {
  if (!server) return false;
  if (!local) return true;
  
  // 比较主版本号
  if (local.version !== server.version) return true;
  
  // 比较各数据版本
  if (local.affixes !== server.affixes) return true;
  if (local.uniqueEquipment !== server.uniqueEquipment) return true;
  if (local.legendaryPowers !== server.legendaryPowers) return true;
  if (local.gems !== server.gems) return true;
  if (local.runes !== server.runes) return true;
  if (local.amulets !== server.amulets) return true;
  
  return false;
}

/**
 * 检查并处理版本更新
 * @returns 是否需要重新加载数据
 */
export async function checkVersionUpdate(): Promise<boolean> {
  const serverVersion = await getServerVersion();
  const localVersion = getLocalVersion();
  
  if (isVersionUpdated(localVersion, serverVersion)) {
    console.log('[Version Check] Data update detected, clearing cache...');
    
    // 清除缓存
    localStorage.removeItem(STORE_KEY);
    
    // 保存新版本
    if (serverVersion) {
      saveVersion(serverVersion);
    }
    
    return true;
  }
  
  return false;
}