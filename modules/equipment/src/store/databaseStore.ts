import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EquipmentItem, Skill, ParagonNode, Build, EquipmentSlot, CharacterClass, DatabaseStats } from '../types/database';
interface DatabaseStore {
 equipment: EquipmentItem[];
 skills: Skill[];
 paragonNodes: ParagonNode[];
 builds: Build[];
 selectedCharacterClass: CharacterClass;
 addEquipment: (item: EquipmentItem) => void;
 removeEquipment: (id: string) => void;
 updateEquipment: (id: string, updates: Partial<EquipmentItem>) => void;
 getEquipmentBySlot: (slot: EquipmentSlot) => EquipmentItem[];
 getEquipmentByRarity: (rarity: string) => EquipmentItem[];
 searchEquipment: (query: string) => EquipmentItem[];
 addSkill: (skill: Skill) => void;
 getSkillsByClass: (charClass: CharacterClass) => Skill[];
 getSkillsByType: (type: string) => Skill[];
 addBuild: (build: Build) => void;
 updateBuild: (id: string, updates: Partial<Build>) => void;
 removeBuild: (id: string) => void;
 getBuildById: (id: string) => Build | undefined;
 setSelectedCharacterClass: (charClass: CharacterClass) => void;
 getStats: () => DatabaseStats;
 loadMockData: () => void;
}
const mockEquipment: EquipmentItem[] = [
 {
 id: 'helm-001',
 name: '战争头盔',
 slot: 'helmet',
 rarity: 'rare',
 level: 80,
 affixes: [
 { id: 'affix-1', name: '力量', description: '增加力量属性', value: 50, type: 'additive', category: 'primary', minValue: 30, maxValue: 70 },
 { id: 'affix-2', name: '暴击几率', description: '增加暴击几率', value: 5, type: 'additive', category: 'offense', minValue: 3, maxValue: 8 },
 { id: 'affix-3', name: '攻击速度', description: '增加攻击速度', value: 3, type: 'additive', category: 'offense', minValue: 2, maxValue: 5 }
 ],
 icon: './images/icons/helmet02.png'
 },
 {
 id: 'helm-002',
 name: '不朽之王的冠冕',
 slot: 'helmet',
 rarity: 'legendary',
 level: 80,
 affixes: [
 { id: 'affix-4', name: '力量', description: '增加力量属性', value: 80, type: 'additive', category: 'primary', minValue: 60, maxValue: 100 },
 { id: 'affix-5', name: '暴击伤害', description: '增加暴击伤害', value: 15, type: 'multiplicative', category: 'offense', minValue: 10, maxValue: 20 },
 { id: 'affix-6', name: '压制伤害', description: '增加压制伤害', value: 20, type: 'independent', category: 'offense', minValue: 15, maxValue: 25 }
 ],
 legendaryPower: '旋风斩伤害提高40%',
 legendaryPowerDescription: '你的旋风斩技能伤害提高40%',
 icon: './images/icons/helmet02.png'
 },
 {
 id: 'chest-001',
 name: '铁甲战衣',
 slot: 'chest',
 rarity: 'rare',
 level: 80,
 affixes: [
 { id: 'affix-7', name: '护甲', description: '增加护甲值', value: 200, type: 'additive', category: 'defense', minValue: 150, maxValue: 250 },
 { id: 'affix-8', name: '最大生命', description: '增加最大生命值', value: 500, type: 'additive', category: 'defense', minValue: 300, maxValue: 700 },
 { id: 'affix-9', name: '全属性', description: '增加所有属性', value: 20, type: 'additive', category: 'primary', minValue: 15, maxValue: 25 }
 ],
 icon: './images/icons/chest02.png'
 },
 {
 id: 'chest-002',
 name: '死亡使者的外衣',
 slot: 'chest',
 rarity: 'unique',
 level: 80,
 affixes: [
 { id: 'affix-10', name: '力量', description: '增加力量属性', value: 100, type: 'additive', category: 'primary', minValue: 80, maxValue: 120 },
 { id: 'affix-11', name: '暴击伤害', description: '增加暴击伤害', value: 25, type: 'multiplicative', category: 'offense', minValue: 20, maxValue: 30 },
 { id: 'affix-12', name: '易伤伤害', description: '增加对易伤敌人伤害', value: 20, type: 'multiplicative', category: 'offense', minValue: 15, maxValue: 25 }
 ],
 uniqueEffect: '击杀敌人后获得10%伤害加成',
 uniqueEffectDescription: '击杀敌人后，你获得10%伤害加成，持续5秒',
 icon: './images/icons/chest02.png'
 },
 {
 id: 'weapon1-001',
 name: '传奇双手剑',
 slot: 'weapon1',
 rarity: 'legendary',
 level: 80,
 weaponType: 'twoHandSword',
 damageRange: [180, 350],
 affixes: [
 { id: 'affix-13', name: '武器伤害', description: '增加武器伤害', value: 500, type: 'additive', category: 'offense', minValue: 400, maxValue: 600 },
 { id: 'affix-14', name: '暴击伤害', description: '增加暴击伤害', value: 30, type: 'multiplicative', category: 'offense', minValue: 25, maxValue: 35 },
 { id: 'affix-15', name: '技能伤害', description: '增加技能伤害', value: 20, type: 'multiplicative', category: 'offense', minValue: 15, maxValue: 25 }
 ],
 legendaryPower: '旋风斩攻击次数+2',
 legendaryPowerDescription: '你的旋风斩技能额外攻击2次',
 icon: './images/icons/weapon104.png'
 },
 {
 id: 'amulet-001',
 name: '毁灭护符',
 slot: 'amulet',
 rarity: 'legendary',
 level: 80,
 affixes: [
 { id: 'affix-16', name: '全属性', description: '增加所有属性', value: 50, type: 'additive', category: 'primary', minValue: 40, maxValue: 60 },
 { id: 'affix-17', name: '暴击伤害', description: '增加暴击伤害', value: 20, type: 'multiplicative', category: 'offense', minValue: 15, maxValue: 25 },
 { id: 'affix-18', name: '技能伤害', description: '增加技能伤害', value: 15, type: 'multiplicative', category: 'offense', minValue: 10, maxValue: 20 }
 ],
 legendaryPower: '技能冷却时间减少20%',
 legendaryPowerDescription: '你的技能冷却时间减少20%',
 icon: './images/icons/amulet02.png'
 },
 {
 id: 'ring1-001',
 name: '暴击之环',
 slot: 'ring1',
 rarity: 'rare',
 level: 80,
 affixes: [
 { id: 'affix-19', name: '暴击几率', description: '增加暴击几率', value: 6, type: 'additive', category: 'offense', minValue: 4, maxValue: 8 },
 { id: 'affix-20', name: '暴击伤害', description: '增加暴击伤害', value: 15, type: 'multiplicative', category: 'offense', minValue: 10, maxValue: 20 },
 { id: 'affix-21', name: '攻击速度', description: '增加攻击速度', value: 4, type: 'additive', category: 'offense', minValue: 2, maxValue: 6 }
 ],
 icon: './images/icons/ring02.png'
 },
 {
 id: 'gloves-001',
 name: '战斗手套',
 slot: 'gloves',
 rarity: 'rare',
 level: 80,
 affixes: [
 { id: 'affix-22', name: '暴击几率', description: '增加暴击几率', value: 8, type: 'additive', category: 'offense', minValue: 5, maxValue: 10 },
 { id: 'affix-23', name: '攻击速度', description: '增加攻击速度', value: 5, type: 'additive', category: 'offense', minValue: 3, maxValue: 7 },
 { id: 'affix-24', name: '技能伤害', description: '增加技能伤害', value: 10, type: 'multiplicative', category: 'offense', minValue: 5, maxValue: 15 }
 ],
 icon: './images/icons/gloves02.png'
 },
 {
 id: 'pants-001',
 name: '战争护腿',
 slot: 'pants',
 rarity: 'rare',
 level: 80,
 affixes: [
 { id: 'affix-25', name: '护甲', description: '增加护甲值', value: 150, type: 'additive', category: 'defense', minValue: 100, maxValue: 200 },
 { id: 'affix-26', name: '移动速度', description: '增加移动速度', value: 8, type: 'additive', category: 'utility', minValue: 5, maxValue: 10 },
 { id: 'affix-27', name: '减伤', description: '减少受到的伤害', value: 5, type: 'multiplicative', category: 'defense', minValue: 3, maxValue: 7 }
 ],
 icon: './images/icons/pants02.png'
 },
 {
 id: 'boots-001',
 name: '疾风之靴',
 slot: 'boots',
 rarity: 'rare',
 level: 80,
 affixes: [
 { id: 'affix-28', name: '移动速度', description: '增加移动速度', value: 15, type: 'additive', category: 'utility', minValue: 10, maxValue: 20 },
 { id: 'affix-29', name: '力量', description: '增加力量属性', value: 30, type: 'additive', category: 'primary', minValue: 20, maxValue: 40 },
 { id: 'affix-30', name: '闪避几率', description: '增加闪避几率', value: 5, type: 'additive', category: 'defense', minValue: 3, maxValue: 7 }
 ],
 icon: './images/icons/boots02.png'
 }
];
const mockSkills: Skill[] = [
 {
 id: 'skill-barbarian-001',
 name: '旋风斩',
 description: '快速旋转武器，对周围敌人造成伤害',
 type: 'active',
 category: 'offense',
 damageType: 'physical',
 characterClass: 'barbarian',
 skillTree: '狂暴',
 skillTreePath: ['狂暴', '旋风斩'],
 maxRank: 5,
 baseResourceCost: 20,
 damageCoefficient: 1.2,
 effects: [
 { id: 'effect-1', name: '范围伤害', description: '对周围3码内的所有敌人造成伤害' },
 { id: 'effect-2', name: '持续旋转', description: '持续3秒，每秒造成伤害' }
 ],
 icon: '⚔️'
 },
 {
 id: 'skill-barbarian-002',
 name: '战斗怒吼',
 description: '发出怒吼，增加自身和附近队友的伤害',
 type: 'active',
 category: 'utility',
 damageType: 'physical',
 characterClass: 'barbarian',
 skillTree: '战吼',
 skillTreePath: ['战吼', '战斗怒吼'],
 maxRank: 3,
 baseCooldown: 15,
 effects: [
 { id: 'effect-3', name: '伤害加成', description: '增加10%伤害，持续10秒' },
 { id: 'effect-4', name: '团队增益', description: '附近队友同样获得增益' }
 ],
 icon: '🗣️'
 },
 {
 id: 'skill-paladin-001',
 name: '神圣之盾',
 description: '召唤神圣护盾，吸收伤害',
 type: 'active',
 category: 'defense',
 damageType: 'arcane',
 characterClass: 'paladin',
 skillTree: '防御',
 skillTreePath: ['防御', '神圣之盾'],
 maxRank: 3,
 baseCooldown: 20,
 baseResourceCost: 30,
 effects: [
 { id: 'effect-5', name: '护盾吸收', description: '吸收最大生命值15%的伤害' },
 { id: 'effect-6', name: '神圣光环', description: '护盾存在期间增加5%格挡几率' }
 ],
 icon: '🛡️'
 },
 {
 id: 'skill-sorc-001',
 name: '火球术',
 description: '发射一颗火球，造成火焰伤害并爆炸',
 type: 'active',
 category: 'offense',
 damageType: 'fire',
 characterClass: 'sorc',
 skillTree: '火焰',
 skillTreePath: ['火焰', '火球术'],
 maxRank: 5,
 baseResourceCost: 25,
 damageCoefficient: 2.0,
 effects: [
 { id: 'effect-7', name: '爆炸伤害', description: '火球命中后爆炸，对周围敌人造成伤害' },
 { id: 'effect-8', name: '燃烧', description: '使敌人燃烧，持续3秒' }
 ],
 icon: '🔥'
 }
];
const mockParagonNodes: ParagonNode[] = [
 {
 id: 'paragon-001',
 name: '力量节点',
 description: '增加力量属性',
 type: 'offensive',
 position: { x: 0, y: 0 },
 effects: [
 { id: 'p-effect-1', name: '力量', value: 20, type: 'additive' }
 ],
 adjacentNodes: ['paragon-002', 'paragon-003'],
 icon: '💪'
 },
 {
 id: 'paragon-002',
 name: '暴击节点',
 description: '增加暴击几率',
 type: 'offensive',
 position: { x: 1, y: 0 },
 effects: [
 { id: 'p-effect-2', name: '暴击几率', value: 2, type: 'percent' }
 ],
 adjacentNodes: ['paragon-001', 'paragon-004'],
 icon: '💥'
 },
 {
 id: 'paragon-003',
 name: '护甲节点',
 description: '增加护甲值',
 type: 'defensive',
 position: { x: 0, y: 1 },
 effects: [
 { id: 'p-effect-3', name: '护甲', value: 100, type: 'additive' }
 ],
 adjacentNodes: ['paragon-001', 'paragon-005'],
 icon: '🛡️'
 }
];
export const useDatabaseStore = create<DatabaseStore>()(persist((set, get) => ({
 equipment: [],
 skills: [],
 paragonNodes: [],
 builds: [],
 selectedCharacterClass: 'barbarian',
 addEquipment: (item) => set((state) => ({
 equipment: [...state.equipment, item]
 })),
 removeEquipment: (id) => set((state) => ({
 equipment: state.equipment.filter(item => item.id !== id)
 })),
 updateEquipment: (id, updates) => set((state) => ({
 equipment: state.equipment.map(item =>
 item.id === id ? { ...item, ...updates } : item
 )
 })),
 getEquipmentBySlot: (slot) => {
 return get().equipment.filter(item => item.slot === slot);
 },
 getEquipmentByRarity: (rarity) => {
 return get().equipment.filter(item => item.rarity === rarity);
 },
 searchEquipment: (query) => {
 const lowerQuery = query.toLowerCase();
 return get().equipment.filter(item =>
 item.name.toLowerCase().includes(lowerQuery)
 );
 },
 addSkill: (skill) => set((state) => ({
 skills: [...state.skills, skill]
 })),
 getSkillsByClass: (charClass) => {
 return get().skills.filter(skill => skill.characterClass === charClass);
 },
 getSkillsByType: (type) => {
 return get().skills.filter(skill => skill.type === type);
 },
 addBuild: (build) => set((state) => ({
 builds: [...state.builds, build]
 })),
 updateBuild: (id, updates) => set((state) => ({
 builds: state.builds.map(build =>
 build.id === id ? { ...build, ...updates } : build
 )
 })),
 removeBuild: (id) => set((state) => ({
 builds: state.builds.filter(build => build.id !== id)
 })),
 getBuildById: (id) => {
 return get().builds.find(build => build.id === id);
 },
 setSelectedCharacterClass: (charClass) => set({ selectedCharacterClass: charClass }),
 getStats: () => {
 const { equipment, skills, paragonNodes, builds } = get();
 return {
 totalEquipment: equipment.length,
 totalSkills: skills.length,
 totalParagonNodes: paragonNodes.length,
 totalBuilds: builds.length
 };
 },
 loadMockData: () => set({
 equipment: mockEquipment,
 skills: mockSkills,
 paragonNodes: mockParagonNodes
 })
}), {
 name: 'd4-database-storage'
}));