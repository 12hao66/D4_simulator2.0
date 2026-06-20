import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UniqueEquipment, LegendaryPower, Affix, Skill, Amulet, CraftingMaterial, Rune, Gem, DatabaseStats } from '../types';
import { loadLegendaryPowers, loadAffixes, loadUniqueEquipment, loadGems, loadRunes, loadAmulets } from '../utils/dataLoader';

interface CustomDataStore {
  customLegendaryPowers: LegendaryPower[];
  customAffixes: Affix[];
}

const customDataStore: CustomDataStore = {
  customLegendaryPowers: [],
  customAffixes: []
};

// 从localStorage加载自定义数据
try {
  const stored = localStorage.getItem('d4-custom-data');
  if (stored) {
    const parsed = JSON.parse(stored);
    customDataStore.customLegendaryPowers = parsed.customLegendaryPowers || [];
    customDataStore.customAffixes = parsed.customAffixes || [];
  }
} catch (e) {
  console.error('Failed to load custom data:', e);
}

// 保存自定义数据到localStorage
const saveCustomData = () => {
  localStorage.setItem('d4-custom-data', JSON.stringify({
    customLegendaryPowers: customDataStore.customLegendaryPowers,
    customAffixes: customDataStore.customAffixes
  }));
};

interface DatabaseStore {
  // 数据加载状态
  isLoading: boolean;
  dataLoadError: string | null;
  
  uniqueEquipment: UniqueEquipment[];
  legendaryPowers: LegendaryPower[];
  affixes: Affix[];
  skills: Skill[];
  amulets: Amulet[];
  craftingMaterials: CraftingMaterial[];
  runes: Rune[];
  gems: Gem[];
  
  // 从JSON重新加载数据
  reloadUniqueEquipment: () => Promise<void>;
  reloadLegendaryPowers: () => Promise<void>;
  reloadAffixes: () => Promise<void>;
  reloadGems: () => Promise<void>;
  reloadRunes: () => Promise<void>;
  reloadAmulets: () => Promise<void>;
  
  // Unique Equipment
  addUniqueEquipment: (item: UniqueEquipment) => void;
  updateUniqueEquipment: (id: string, updates: Partial<UniqueEquipment>) => void;
  deleteUniqueEquipment: (id: string) => void;
  
  // Legendary Powers
  addLegendaryPower: (power: LegendaryPower) => void;
  updateLegendaryPower: (id: string, updates: Partial<LegendaryPower>) => void;
  deleteLegendaryPower: (id: string) => void;
  
  // Affixes
  addAffix: (affix: Affix) => void;
  updateAffix: (id: string, updates: Partial<Affix>) => void;
  deleteAffix: (id: string) => void;
  
  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  // Amulets
  addAmulet: (amulet: Amulet) => void;
  updateAmulet: (id: string, updates: Partial<Amulet>) => void;
  deleteAmulet: (id: string) => void;
  
  // Crafting Materials
  addCraftingMaterial: (material: CraftingMaterial) => void;
  updateCraftingMaterial: (id: string, updates: Partial<CraftingMaterial>) => void;
  deleteCraftingMaterial: (id: string) => void;
  
  // Runes
  addRune: (rune: Rune) => void;
  updateRune: (id: string, updates: Partial<Rune>) => void;
  deleteRune: (id: string) => void;
  
  // Gems
  addGem: (gem: Gem) => void;
  updateGem: (id: string, updates: Partial<Gem>) => void;
  deleteGem: (id: string) => void;
  
  // Import
  importUniqueEquipment: (items: UniqueEquipment[], mode: 'merge' | 'replace') => void;
  
  // Stats
  getStats: () => DatabaseStats;
  
  // 获取自定义数据
  getCustomLegendaryPowers: () => LegendaryPower[];
  getCustomAffixes: () => Affix[];
  
  // 合并JSON数据和自定义数据
  getMergedLegendaryPowers: () => LegendaryPower[];
  getMergedAffixes: () => Affix[];
}

export const useDatabaseStore = create<DatabaseStore>()(persist((set, get) => ({
  // 数据加载状态
  isLoading: false,
  dataLoadError: null,
  
  uniqueEquipment: [],
  legendaryPowers: [],
  affixes: [],
  skills: [],
  amulets: [],
  craftingMaterials: [],
  runes: [],
  gems: [],
  
  // 从JSON重新加载暗金装备数据
  reloadUniqueEquipment: async () => {
    set({ isLoading: true, dataLoadError: null });
    try {
      const equipment = await loadUniqueEquipment();
      set({ uniqueEquipment: equipment, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '加载失败';
      set({ dataLoadError: message, isLoading: false });
      console.error('Failed to reload unique equipment:', error);
    }
  },
  
  // 从JSON重新加载威能数据
  reloadLegendaryPowers: async () => {
    set({ isLoading: true, dataLoadError: null });
    try {
      const powers = await loadLegendaryPowers();
      // 合并JSON数据和自定义数据
      const customPowers = customDataStore.customLegendaryPowers;
      const merged = [...powers];
      for (const custom of customPowers) {
        if (!merged.find(p => p.id === custom.id)) {
          merged.push(custom);
        }
      }
      set({ legendaryPowers: merged, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '加载失败';
      set({ dataLoadError: message, isLoading: false });
      console.error('Failed to reload legendary powers:', error);
    }
  },
  
  // 从JSON重新加载词缀数据
  reloadAffixes: async () => {
    set({ isLoading: true, dataLoadError: null });
    try {
      const affixesData = await loadAffixes();
      // 合并JSON数据和自定义数据
      const customAffixes = customDataStore.customAffixes;
      const merged = [...affixesData];
      for (const custom of customAffixes) {
        if (!merged.find(a => a.id === custom.id)) {
          merged.push(custom);
        }
      }
      set({ affixes: merged, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '加载失败';
      set({ dataLoadError: message, isLoading: false });
      console.error('Failed to reload affixes:', error);
    }
  },
  
  // 从JSON重新加载宝石数据
  reloadGems: async () => {
    set({ isLoading: true, dataLoadError: null });
    try {
      const gemsData = await loadGems();
      set({ gems: gemsData, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '加载失败';
      set({ dataLoadError: message, isLoading: false });
      console.error('Failed to reload gems:', error);
    }
  },
  
  // 从JSON重新加载符文数据
  reloadRunes: async () => {
    set({ isLoading: true, dataLoadError: null });
    try {
      const runesData = await loadRunes();
      set({ runes: runesData, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '加载失败';
      set({ dataLoadError: message, isLoading: false });
      console.error('Failed to reload runes:', error);
    }
  },
  
  // 从JSON重新加载护身符数据
  reloadAmulets: async () => {
    set({ isLoading: true, dataLoadError: null });
    try {
      const amuletsData = await loadAmulets();
      set({ amulets: amuletsData, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '加载失败';
      set({ dataLoadError: message, isLoading: false });
      console.error('Failed to reload amulets:', error);
    }
  },
  
  addUniqueEquipment: (item) => set((state) => ({ uniqueEquipment: [...state.uniqueEquipment, item] })),
  updateUniqueEquipment: (id, updates) => set((state) => ({
    uniqueEquipment: state.uniqueEquipment.map(item => item.id === id ? { ...item, ...updates } : item)
  })),
  deleteUniqueEquipment: (id) => set((state) => ({
    uniqueEquipment: state.uniqueEquipment.filter(item => item.id !== id)
  })),
  
  addLegendaryPower: (power) => {
    // 保存到自定义数据
    if (!customDataStore.customLegendaryPowers.find(p => p.id === power.id)) {
      customDataStore.customLegendaryPowers.push(power);
      saveCustomData();
    }
    // 同时更新store
    set((state) => ({ legendaryPowers: [...state.legendaryPowers, power] }));
  },
  updateLegendaryPower: (id, updates) => set((state) => ({
    legendaryPowers: state.legendaryPowers.map(power => power.id === id ? { ...power, ...updates } : power)
  })),
  deleteLegendaryPower: (id) => {
    // 从自定义数据中删除
    customDataStore.customLegendaryPowers = customDataStore.customLegendaryPowers.filter(p => p.id !== id);
    saveCustomData();
    set((state) => ({ legendaryPowers: state.legendaryPowers.filter(power => power.id !== id) }));
  },
  
  addAffix: (affix) => {
    // 保存到自定义数据
    if (!customDataStore.customAffixes.find(a => a.id === affix.id)) {
      customDataStore.customAffixes.push(affix);
      saveCustomData();
    }
    // 同时更新store
    set((state) => ({ affixes: [...state.affixes, affix] }));
  },
  updateAffix: (id, updates) => set((state) => ({
    affixes: state.affixes.map(affix => affix.id === id ? { ...affix, ...updates } : affix)
  })),
  deleteAffix: (id) => {
    // 从自定义数据中删除
    customDataStore.customAffixes = customDataStore.customAffixes.filter(a => a.id !== id);
    saveCustomData();
    set((state) => ({ affixes: state.affixes.filter(affix => affix.id !== id) }));
  },
  
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  updateSkill: (id, updates) => set((state) => ({
    skills: state.skills.map(skill => skill.id === id ? { ...skill, ...updates } : skill)
  })),
  deleteSkill: (id) => set((state) => ({
    skills: state.skills.filter(skill => skill.id !== id)
  })),
  
  addAmulet: (amulet) => set((state) => ({ amulets: [...state.amulets, amulet] })),
  updateAmulet: (id, updates) => set((state) => ({
    amulets: state.amulets.map(amulet => amulet.id === id ? { ...amulet, ...updates } : amulet)
  })),
  deleteAmulet: (id) => set((state) => ({
    amulets: state.amulets.filter(amulet => amulet.id !== id)
  })),
  
  addCraftingMaterial: (material) => set((state) => ({ craftingMaterials: [...state.craftingMaterials, material] })),
  updateCraftingMaterial: (id, updates) => set((state) => ({
    craftingMaterials: state.craftingMaterials.map(m => m.id === id ? { ...m, ...updates } : m)
  })),
  deleteCraftingMaterial: (id) => set((state) => ({
    craftingMaterials: state.craftingMaterials.filter(m => m.id !== id)
  })),
  
  addRune: (rune) => set((state) => ({ runes: [...state.runes, rune] })),
  updateRune: (id, updates) => set((state) => ({
    runes: state.runes.map(rune => rune.id === id ? { ...rune, ...updates } : rune)
  })),
  deleteRune: (id) => set((state) => ({
    runes: state.runes.filter(rune => rune.id !== id)
  })),
  
  addGem: (gem) => set((state) => ({ gems: [...state.gems, gem] })),
  updateGem: (id, updates) => set((state) => ({
    gems: state.gems.map(gem => gem.id === id ? { ...gem, ...updates } : gem)
  })),
  deleteGem: (id) => set((state) => ({
    gems: state.gems.filter(gem => gem.id !== id)
  })),

  importUniqueEquipment: (items, mode) => set((state) => {
    if (mode === 'replace') {
      return { uniqueEquipment: items };
    } else {
      const existingIds = new Set(state.uniqueEquipment.map(item => item.id));
      const newItems = items.filter(item => !existingIds.has(item.id));
      return { uniqueEquipment: [...state.uniqueEquipment, ...newItems] };
    }
  }),
  
  getStats: () => {
    const { uniqueEquipment, legendaryPowers, affixes, skills, amulets, craftingMaterials, runes, gems } = get();
    return {
      totalUniqueEquipment: uniqueEquipment.length,
      totalLegendaryPowers: legendaryPowers.length,
      totalAffixes: affixes.length,
      totalSkills: skills.length,
      totalAmulets: amulets.length,
      totalCraftingMaterials: craftingMaterials.length,
      totalRunes: runes.length,
      totalGems: gems.length
    };
  },
  
  getCustomLegendaryPowers: () => customDataStore.customLegendaryPowers,
  getCustomAffixes: () => customDataStore.customAffixes,
  
  getMergedLegendaryPowers: () => {
    const { legendaryPowers } = get();
    return legendaryPowers;
  },
  getMergedAffixes: () => {
    const { affixes } = get();
    return affixes;
  }
}), {
  name: 'd4-database-manager',
  // 不持久化任何数据，系统数据每次从JSON加载
  // 用户自定义数据已通过 customDataStore 单独处理
  partialize: () => ({})
}));