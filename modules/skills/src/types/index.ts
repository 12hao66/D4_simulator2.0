export type CharacterClass = 
  | 'barbarian' 
  | 'necromancer' 
  | 'sorc' 
  | 'wizard' 
  | 'druid' 
  | 'rogue' 
  | 'ranger' 
  | 'spiritborn' 
  | 'paladin' 
  | 'warlock';

export interface SkillEffect {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
}

export type SkillType = 'basic' | 'core' | 'defensive' | 'ultimate' | 'key' | 'passive';

export interface SkillNode {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  requires: string[];
  rank: number;
  maxRank: number;
  effects: SkillEffect[];
  category: string;
  characterClass: CharacterClass;
  type: SkillType;
  isKeyNode?: boolean;
  color?: string;
}

export interface SkillTree {
  id: string;
  name: string;
  characterClass: CharacterClass;
  nodes: SkillNode[];
}

export interface SkillState {
  selectedClass: CharacterClass;
  skillTree: SkillTree | null;
  unlockedSkills: Record<string, number>;
  selectedSkill: string | null;
  zoom: number;
  position: { x: number; y: number };
  editMode: boolean;
}
