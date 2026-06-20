import type { Build, Season, ClassInfo, FilterOptions } from '../types';

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 缓存数据
let cachedSeasons: Season[] | null = null;
let cachedClasses: ClassInfo[] | null = null;
let cachedBuilds: Build[] | null = null;

// 加载元数据
const loadMetadata = async (): Promise<{ seasons: Season[], classes: ClassInfo[] }> => {
  if (cachedSeasons && cachedClasses) {
    return { seasons: cachedSeasons, classes: cachedClasses };
  }
  
  try {
    const response = await fetch('./data/metadata.json');
    const data = await response.json();
    cachedSeasons = data.seasons || [];
    cachedClasses = data.classes || [];
    return { seasons: cachedSeasons as Season[], classes: cachedClasses as ClassInfo[] };
  } catch (error) {
    console.error('Failed to load metadata:', error);
    return {
      seasons: [],
      classes: []
    };
  }
};

// 加载构筑数据
const loadBuilds = async (): Promise<Build[]> => {
  if (cachedBuilds !== null) {
    return cachedBuilds;
  }
  
  try {
    const response = await fetch('./data/builds.json');
    const data = await response.json();
    cachedBuilds = data.builds || [];
    return cachedBuilds as Build[];
  } catch (error) {
    console.error('Failed to load builds:', error);
    cachedBuilds = [];
    return [];
  }
};

// 获取赛季列表
export const fetchSeasons = async (): Promise<Season[]> => {
  await delay(100);
  const { seasons } = await loadMetadata();
  return seasons;
};

// 获取职业列表
export const fetchClasses = async (): Promise<ClassInfo[]> => {
  await delay(100);
  const { classes } = await loadMetadata();
  return classes;
};

// 获取当前激活赛季
export const fetchActiveSeason = async (): Promise<Season | undefined> => {
  await delay(50);
  const { seasons } = await loadMetadata();
  return seasons.find(s => s.isActive);
};

// 获取构筑列表
export const fetchBuilds = async (filters: FilterOptions): Promise<Build[]> => {
  await delay(200);
  const builds = await loadBuilds();
  
  let filteredBuilds = [...builds];
  
  // 按赛季筛选
  if (filters.season && filters.season !== 'all') {
    filteredBuilds = filteredBuilds.filter(b => b.season === filters.season);
  }
  
  // 按职业筛选
  if (filters.characterClass && filters.characterClass !== 'all') {
    filteredBuilds = filteredBuilds.filter(b => b.characterClass === filters.characterClass);
  }
  
  // 按玩法风格筛选
  if (filters.playStyle) {
    filteredBuilds = filteredBuilds.filter(b => b.playStyle === filters.playStyle);
  }
  
  // 按难度筛选
  if (filters.difficulty) {
    filteredBuilds = filteredBuilds.filter(b => b.difficulty === filters.difficulty);
  }
  
  // 排序
  switch (filters.sortBy) {
    case 'popular':
      filteredBuilds.sort((a, b) => (b.likes + b.downloads) - (a.likes + a.downloads));
      break;
    case 'latest':
      filteredBuilds.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'rating':
      filteredBuilds.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default:
      filteredBuilds.sort((a, b) => b.views - a.views);
  }
  
  return filteredBuilds;
};

// 获取构筑详情
export const fetchBuildDetail = async (id: string): Promise<Build | undefined> => {
  await delay(150);
  const builds = await loadBuilds();
  return builds.find(b => b.id === id);
};

// 搜索构筑
export const searchBuilds = async (keyword: string, filters: FilterOptions): Promise<Build[]> => {
  await delay(200);
  const builds = await fetchBuilds(filters);
  const lowerKeyword = keyword.toLowerCase();
  
  return builds.filter(build => 
    build.name.toLowerCase().includes(lowerKeyword) ||
    build.author.toLowerCase().includes(lowerKeyword) ||
    build.description.toLowerCase().includes(lowerKeyword) ||
    build.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
};

// 导出构筑为 JSON 文件
export const exportBuildAsJson = (build: Build): void => {
  const dataStr = JSON.stringify(build, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${build.name.replace(/\s+/g, '_')}_${build.id}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 导出所有构筑为 JSON 文件
export const exportAllBuilds = async (): Promise<void> => {
  const builds = await loadBuilds();
  const dataStr = JSON.stringify({ builds }, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `all_builds_${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 刷新数据（重新从 JSON 文件加载）
export const refreshData = async (): Promise<void> => {
  cachedSeasons = null;
  cachedClasses = null;
  cachedBuilds = null;
};
