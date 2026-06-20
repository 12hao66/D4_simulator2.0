import type { D2CoreBuild, D2CoreAffix, EquipmentItem, Build, EquipmentAffix } from '../types/database';
import { useDatabaseStore } from '../store/databaseStore';
const SLOT_MAP: Record<string, string> = {
 'helm': 'helmet',
 'chest': 'chest',
 'gloves': 'gloves',
 'pants': 'pants',
 'boots': 'boots',
 'mainhand': 'weapon1',
 'offhand': 'weapon2',
 'amulet': 'amulet',
 'ring1': 'ring1',
 'ring2': 'ring2'
};
const RARITY_MAP: Record<string, string> = {
 'common': 'common',
 'magic': 'magic',
 'rare': 'rare',
 'legendary': 'legendary',
 'unique': 'unique'
};
export class D2CoreImporter {
 private static convertAffix(d2coreAffix: D2CoreAffix): EquipmentAffix {
 const type = d2coreAffix.unit === '%' ? 'multiplicative' : 'additive';
 return {
 id: d2coreAffix.id,
 name: d2coreAffix.name,
 description: `增加${d2coreAffix.name}`,
 value: d2coreAffix.value,
 type: type as 'additive' | 'multiplicative' | 'independent',
 category: this.determineCategory(d2coreAffix.name),
 minValue: Math.floor(d2coreAffix.value * 0.6),
 maxValue: Math.floor(d2coreAffix.value * 1.4)
 };
 }
 private static determineCategory(name: string): string {
 if (['力量', '敏捷', '智力', '活力', '全属性'].includes(name)) {
 return 'primary';
 }
 if (['暴击几率', '暴击伤害', '攻击速度', '武器伤害', '技能伤害', '易伤伤害', '压制伤害', '远程伤害', '暗影伤害', '火焰伤害'].includes(name)) {
 return 'offense';
 }
 if (['护甲', '最大生命', '减伤', '闪避几率', '格挡几率', '全抗'].includes(name)) {
 return 'defense';
 }
 if (['移动速度', '冷却缩减', '资源消耗降低'].includes(name)) {
 return 'utility';
 }
 return 'other';
 }
 private static convertEquipment(d2coreItem: D2CoreBuild['equipment'][string]): EquipmentItem | null {
 if (!d2coreItem)
 return null;
 const slot = SLOT_MAP[d2coreItem.slot] || d2coreItem.slot;
 const rarity = RARITY_MAP[d2coreItem.rarity] || 'rare';
 const affixes = d2coreItem.affixes.map(this.convertAffix.bind(this));
 return {
 id: d2coreItem.id,
 name: d2coreItem.name,
 slot: slot as EquipmentItem['slot'],
 rarity: rarity as EquipmentItem['rarity'],
 level: d2coreItem.level,
 affixes,
 legendaryPower: d2coreItem.legendaryPower?.name,
 legendaryPowerDescription: d2coreItem.legendaryPower?.description,
 icon: d2coreItem.icon || './images/icons/helmet02.png'
 };
 }
 static async importFromUrl(url: string): Promise<Build | null> {
 try {
 const response = await fetch(url);
 if (!response.ok) {
 throw new Error(`Failed to fetch: ${response.status}`);
 }
 const d2coreBuild: D2CoreBuild = await response.json();
 return this.convertBuild(d2coreBuild);
 }
 catch (error) {
 console.error('Failed to import from d2core:', error);
 return null;
 }
 }
 static importFromJson(jsonString: string): Build | null {
 try {
 const d2coreBuild: D2CoreBuild = JSON.parse(jsonString);
 return this.convertBuild(d2coreBuild);
 }
 catch (error) {
 console.error('Failed to parse JSON:', error);
 return null;
 }
 }
 private static convertBuild(d2coreBuild: D2CoreBuild): Build {
 const equipment: Record<string, EquipmentItem | null> = {};
 Object.entries(d2coreBuild.equipment).forEach(([slot, item]) => {
 const convertedSlot = SLOT_MAP[slot] || slot;
 equipment[convertedSlot] = this.convertEquipment(item);
 });
 return {
 id: `build-${Date.now()}`,
 name: d2coreBuild.character.class + ' Build',
 description: `Imported from d2core.com`,
 characterClass: d2coreBuild.character.class as Build['characterClass'],
 level: d2coreBuild.character.level,
 equipment: equipment as Record<EquipmentItem['slot'], EquipmentItem | null>,
 skills: d2coreBuild.skills.map(skill => ({
 skillId: skill.id,
 rank: skill.rank,
 slot: skill.slot
 })),
 paragonNodes: d2coreBuild.paragon?.nodes || [],
 paragon: {
 selectedNodes: d2coreBuild.paragon?.nodes || [],
 allocatedPoints: d2coreBuild.paragon?.nodes.length || 0
 },
 createdAt: Date.now(),
 updatedAt: Date.now()
 };
 }
 static async importAndSave(url: string): Promise<boolean> {
 const build = await this.importFromUrl(url);
 if (build) {
 useDatabaseStore.getState().addBuild(build);
 return true;
 }
 return false;
 }
 static validateD2CoreFormat(jsonString: string): {
 valid: boolean;
 errors: string[];
 } {
 try {
 const data: D2CoreBuild = JSON.parse(jsonString);
 const errors: string[] = [];
 if (!data.version) {
 errors.push('缺少 version 字段');
 }
 if (!data.character) {
 errors.push('缺少 character 字段');
 }
 else {
 if (!data.character.class) {
 errors.push('character 缺少 class 字段');
 }
 if (!data.character.level) {
 errors.push('character 缺少 level 字段');
 }
 }
 if (!data.equipment) {
 errors.push('缺少 equipment 字段');
 }
 return {
 valid: errors.length === 0,
 errors
 };
 }
 catch {
 return {
 valid: false,
 errors: ['无效的 JSON 格式']
 };
 }
 }
}