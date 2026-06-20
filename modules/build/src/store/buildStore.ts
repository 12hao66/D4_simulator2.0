import { create } from 'zustand';
import type { Build, Season, ClassInfo, FilterOptions } from '../types';
import { fetchSeasons, fetchClasses, fetchBuilds, fetchBuildDetail, searchBuilds, exportBuildAsJson, exportAllBuilds, refreshData } from '../services/buildService';

interface BuildStore {
  // 数据状态
  builds: Build[];
  seasons: Season[];
  classes: ClassInfo[];
  selectedBuild: Build | null;
  
  // 筛选状态
  filters: FilterOptions;
  searchKeyword: string;
  
  // 加载状态
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: string | null;
  
  // 操作
  loadInitialData: () => Promise<void>;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSearchKeyword: (keyword: string) => void;
  search: (keyword: string) => Promise<void>;
  selectBuild: (build: Build | null) => void;
  loadBuildDetail: (id: string) => Promise<void>;
  refreshBuilds: () => Promise<void>;
  exportBuild: (build: Build) => void;
  exportAll: () => Promise<void>;
  reloadData: () => Promise<void>;
}

const defaultFilters: FilterOptions = {
  season: 's14',
  characterClass: 'all',
  sortBy: 'default'
};

export const useBuildStore = create<BuildStore>((set, get) => ({
  // 初始状态
  builds: [],
  seasons: [],
  classes: [],
  selectedBuild: null,
  filters: defaultFilters,
  searchKeyword: '',
  isLoading: false,
  isLoadingDetail: false,
  error: null,

  // 加载初始数据
  loadInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [seasons, classes] = await Promise.all([
        fetchSeasons(),
        fetchClasses()
      ]);
      
      // 设置默认赛季为当前激活赛季
      const activeSeason = seasons.find(s => s.isActive);
      const defaultSeason = activeSeason?.id || seasons[0]?.id || 's14';
      
      set({ 
        seasons, 
        classes,
        filters: { ...get().filters, season: defaultSeason }
      });
      
      // 加载构筑列表
      await get().refreshBuilds();
    } catch (error) {
      set({ error: '加载数据失败' });
    } finally {
      set({ isLoading: false });
    }
  },

  // 设置筛选条件
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().refreshBuilds();
  },

  // 设置搜索关键词
  setSearchKeyword: (keyword) => {
    set({ searchKeyword: keyword });
  },

  // 搜索构筑
  search: async (keyword) => {
    set({ isLoading: true, error: null });
    try {
      const builds = await searchBuilds(keyword, get().filters);
      set({ builds, searchKeyword: keyword });
    } catch (error) {
      set({ error: '搜索失败' });
    } finally {
      set({ isLoading: false });
    }
  },

  // 选择构筑
  selectBuild: (build) => {
    set({ selectedBuild: build });
  },

  // 加载构筑详情
  loadBuildDetail: async (id) => {
    set({ isLoadingDetail: true, error: null });
    try {
      const build = await fetchBuildDetail(id);
      set({ selectedBuild: build || null });
    } catch (error) {
      set({ error: '加载详情失败' });
    } finally {
      set({ isLoadingDetail: false });
    }
  },

  // 刷新构筑列表
  refreshBuilds: async () => {
    set({ isLoading: true, error: null });
    try {
      const builds = await fetchBuilds(get().filters);
      set({ builds });
    } catch (error) {
      set({ error: '加载构筑列表失败' });
    } finally {
      set({ isLoading: false });
    }
  },

  // 导出单个构筑
  exportBuild: (build: Build) => {
    exportBuildAsJson(build);
  },

  // 导出所有构筑
  exportAll: async () => {
    await exportAllBuilds();
  },

  // 刷新数据（重新从 JSON 文件加载）
  reloadData: async () => {
    await refreshData();
    await get().loadInitialData();
  }
}));
