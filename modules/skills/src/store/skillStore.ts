import { create } from 'zustand';
import { SkillState, CharacterClass, SkillNode } from '../types';
import { getSkillTree } from '../data/skills';

interface SkillActions {
  setClass: (characterClass: CharacterClass) => void;
  selectSkill: (skillId: string | null) => void;
  toggleSkill: (skillId: string) => void;
  setZoom: (zoom: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
  resetView: () => void;
  loadSkillTree: () => void;
  // 编辑模式相关
  toggleEditMode: () => void;
  addSkillNode: (nodeData: Omit<SkillNode, 'id'>) => void;
  deleteSkillNode: (skillId: string) => void;
  updateSkillNode: (skillId: string, updates: Partial<SkillNode>) => void;
  exportSkillTreeConfig: () => string;
}

export const useSkillStore = create<SkillState & SkillActions>((set, get) => ({
  selectedClass: 'barbarian',
  skillTree: null,
  unlockedSkills: {},
  selectedSkill: null,
  zoom: 1,
  position: { x: 0, y: 0 },
  editMode: false,

  setClass: (characterClass: CharacterClass) => {
    set({ selectedClass: characterClass, unlockedSkills: {}, selectedSkill: null });
    get().loadSkillTree();
  },

  selectSkill: (skillId: string | null) => {
    set({ selectedSkill: skillId });
  },

  toggleSkill: (skillId: string) => {
    const { skillTree, unlockedSkills } = get();
    if (!skillTree) return;

    const skill = skillTree.nodes.find(n => n.id === skillId);
    if (!skill) return;

    // 检查前置技能
    const canUnlock = skill.requires.every(reqId => unlockedSkills[reqId] !== undefined);
    if (!canUnlock && unlockedSkills[skillId] === undefined) return;

    set((state) => {
      const newUnlocked = { ...state.unlockedSkills };
      if (newUnlocked[skillId] !== undefined) {
        delete newUnlocked[skillId];
      } else {
        newUnlocked[skillId] = 1;
      }
      return { unlockedSkills: newUnlocked };
    });
  },

  setZoom: (zoom: number) => {
    set({ zoom: Math.max(0.5, Math.min(2, zoom)) });
  },

  setPosition: (position: { x: number; y: number }) => {
    set({ position });
  },

  resetView: () => {
    set({ zoom: 1, position: { x: 0, y: 0 } });
  },

  loadSkillTree: () => {
    const { selectedClass } = get();
    const tree = getSkillTree(selectedClass);
    set({ skillTree: tree });
  },

  // 编辑模式相关
  toggleEditMode: () => {
    set((state) => ({ editMode: !state.editMode }));
  },

  addSkillNode: (nodeData: Omit<SkillNode, 'id'>) => {
    set((state) => {
      if (!state.skillTree) return state;
      
      const newId = `${state.selectedClass}-custom-${Date.now()}`;
      const newNode: SkillNode = {
        ...nodeData,
        id: newId
      };
      
      return {
        skillTree: {
          ...state.skillTree,
          nodes: [...state.skillTree.nodes, newNode]
        }
      };
    });
  },

  deleteSkillNode: (skillId: string) => {
    set((state) => {
      if (!state.skillTree) return state;
      
      return {
        skillTree: {
          ...state.skillTree,
          nodes: state.skillTree.nodes.filter(n => n.id !== skillId)
        },
        selectedSkill: state.selectedSkill === skillId ? null : state.selectedSkill
      };
    });
  },

  updateSkillNode: (skillId: string, updates: Partial<SkillNode>) => {
    set((state) => {
      if (!state.skillTree) return state;
      
      return {
        skillTree: {
          ...state.skillTree,
          nodes: state.skillTree.nodes.map(n => 
            n.id === skillId ? { ...n, ...updates } : n
          )
        }
      };
    });
  },

  exportSkillTreeConfig: () => {
    const { skillTree } = get();
    if (!skillTree) return '';
    
    return JSON.stringify(skillTree, null, 2);
  }
}));
