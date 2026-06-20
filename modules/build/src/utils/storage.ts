// 与装备模拟器共享数据的工具函数
import type { Build } from '../types';

// localStorage key
const EQUIPMENT_STORAGE_KEY = 'equipment-simulator-storage';

// 临时导入数据key
const PENDING_IMPORT_KEY = 'pending-build-import';

export interface ImportBuildData {
  name: string
  characterClass: string
  equipment: any
  source: 'ladder' | 'build'
  importedAt: number
}

// 检查装备模拟器存储是否存在
export const checkEquipmentSimulatorExists = (): boolean => {
  try {
    const data = localStorage.getItem(EQUIPMENT_STORAGE_KEY);
    return data !== null;
  } catch {
    return false;
  }
};

// 将构筑导入到装备模拟器（存储到临时区域）
export const importBuildToEquipment = (build: Build): boolean => {
  try {
    const importData: ImportBuildData = {
      name: build.name,
      characterClass: build.characterClass,
      equipment: build.equipment,
      source: 'build',
      importedAt: Date.now()
    };
    
    localStorage.setItem(PENDING_IMPORT_KEY, JSON.stringify(importData));
    return true;
  } catch (error) {
    console.error('Failed to import build:', error);
    return false;
  }
};

// 获取待导入的构筑数据
export const getPendingImport = (): ImportBuildData | null => {
  try {
    const data = localStorage.getItem(PENDING_IMPORT_KEY);
    if (data) {
      return JSON.parse(data) as ImportBuildData;
    }
    return null;
  } catch {
    return null;
  }
};

// 清除待导入数据
export const clearPendingImport = (): void => {
  try {
    localStorage.removeItem(PENDING_IMPORT_KEY);
  } catch {
    // ignore
  }
};

// 直接导入到装备模拟器的 builds 列表
export const directImportToEquipment = (build: Build): boolean => {
  try {
    // 获取现有的装备模拟器数据
    let equipmentData: any = null;
    try {
      const rawData = localStorage.getItem(EQUIPMENT_STORAGE_KEY);
      if (rawData) {
        equipmentData = JSON.parse(rawData);
      }
    } catch {
      equipmentData = null;
    }

    // 创建新方案（与装备模拟器的Build接口兼容）
    const newBuild: any = {
      id: `build-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: build.name,
      characterClass: build.characterClass,
      equipment: build.equipment,
      createdAt: Date.now()
    };

    // 获取现有的 builds 列表
    let builds: any[] = [];
    if (equipmentData && equipmentData.state && equipmentData.state.builds) {
      builds = equipmentData.state.builds;
    }

    // 添加新方案
    builds.unshift(newBuild);

    // 更新数据
    if (equipmentData && equipmentData.state) {
      equipmentData.state.builds = builds;
      equipmentData.state.currentBuildId = newBuild.id;
      localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(equipmentData));
    } else {
      // 如果没有现有数据，创建新结构
      const newData = {
        state: {
          character: {
            class: build.characterClass,
            level: 100
          },
          equipment: build.equipment,
          equipmentConfig: {
            helmet: { selectedPower: null, selectedAffixes: [] },
            chest: { selectedPower: null, selectedAffixes: [] },
            gloves: { selectedPower: null, selectedAffixes: [] },
            pants: { selectedPower: null, selectedAffixes: [] },
            boots: { selectedPower: null, selectedAffixes: [] },
            weapon1: { selectedPower: null, selectedAffixes: [] },
            weapon2: { selectedPower: null, selectedAffixes: [] },
            weapon3: { selectedPower: null, selectedAffixes: [] },
            weapon4: { selectedPower: null, selectedAffixes: [] },
            shield: { selectedPower: null, selectedAffixes: [] },
            amulet: { selectedPower: null, selectedAffixes: [] },
            ring1: { selectedPower: null, selectedAffixes: [] },
            ring2: { selectedPower: null, selectedAffixes: [] }
          },
          builds: builds,
          currentBuildId: newBuild.id
        },
        version: 0
      };
      localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(newData));
    }

    return true;
  } catch (error) {
    console.error('Failed to directly import build:', error);
    return false;
  }
};
