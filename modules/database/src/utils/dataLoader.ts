import type { LegendaryPower, Affix, UniqueEquipment, Gem, Rune, Amulet } from '../types';

/**
 * 获取当前路径下的 data 目录
 */
function getDataBasePath(): string {
  // 如果在 dist 子目录中，返回相对路径
  const path = window.location.pathname;
  if (path.includes('/dist/') || path.includes('/dist\\')) {
    return './data/';
  }
  return './data/';
}

/**
 * 暗金装备数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadUniqueEquipment(): Promise<UniqueEquipment[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}uniqueEquipment.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load unique equipment:', error);
    return [];
  }
}

/**
 * 威能数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadLegendaryPowers(): Promise<LegendaryPower[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}legendary-powers.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load legendary powers:', error);
    return [];
  }
}

/**
 * 词缀数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadAffixes(): Promise<Affix[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}affixes.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load affixes:', error);
    return [];
  }
}

/**
 * 宝石数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadGems(): Promise<Gem[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}gems.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load gems:', error);
    return [];
  }
}

/**
 * 符文数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadRunes(): Promise<Rune[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}runes.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load runes:', error);
    return [];
  }
}

/**
 * 护身符数据加载函数
 * 从 public/data/ 目录动态加载 JSON 数据
 * 更新 JSON 文件后刷新页面即可生效
 */
export async function loadAmulets(): Promise<Amulet[]> {
  try {
    const basePath = getDataBasePath();
    const response = await fetch(`${basePath}amulets.json`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load amulets:', error);
    return [];
  }
}

/**
 * 数据加载状态
 */
export interface DataLoadState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

/**
 * 加载状态管理
 */
export function createDataLoader<T>(url: string) {
  let cachedData: T | null = null;
  let loadState: DataLoadState = {
    isLoading: false,
    error: null,
    lastUpdated: null
  };

  return {
    async load(): Promise<T> {
      if (loadState.isLoading) {
        throw new Error('Already loading');
      }

      loadState.isLoading = true;
      loadState.error = null;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        cachedData = data;
        loadState.lastUpdated = Date.now();
        return data;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        loadState.error = message;
        throw error;
      } finally {
        loadState.isLoading = false;
      }
    },
    getState(): DataLoadState {
      return { ...loadState };
    },
    getCached(): T | null {
      return cachedData;
    }
  };
}
