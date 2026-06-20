import type { Build, EquipmentItem, Skill, ParagonNode } from '../types/database';
export class DataExporter {
 static exportBuildToJson(build: Build): string {
 const exportData = {
 version: '1.0.0',
 format: 'd4-simulator-build',
 data: {
 id: build.id,
 name: build.name,
 description: build.description,
 characterClass: build.characterClass,
 level: build.level,
 equipment: build.equipment,
 skills: build.skills,
 paragon: build.paragon,
 createdAt: build.createdAt,
 updatedAt: build.updatedAt
 }
 };
 return JSON.stringify(exportData, null, 2);
 }
 static exportEquipmentToJson(equipment: EquipmentItem[]): string {
 const exportData = {
 version: '1.0.0',
 format: 'd4-simulator-equipment',
 data: equipment
 };
 return JSON.stringify(exportData, null, 2);
 }
 static exportSkillsToJson(skills: Skill[]): string {
 const exportData = {
 version: '1.0.0',
 format: 'd4-simulator-skills',
 data: skills
 };
 return JSON.stringify(exportData, null, 2);
 }
 static exportParagonNodesToJson(nodes: ParagonNode[]): string {
 const exportData = {
 version: '1.0.0',
 format: 'd4-simulator-paragon',
 data: nodes
 };
 return JSON.stringify(exportData, null, 2);
 }
 static downloadJson(content: string, filename: string): void {
 const blob = new Blob([content], { type: 'application/json' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = filename;
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 }
 static downloadBuild(build: Build): void {
 const json = this.exportBuildToJson(build);
 this.downloadJson(json, `${build.name}.json`);
 }
 static downloadAllEquipment(equipment: EquipmentItem[]): void {
 const json = this.exportEquipmentToJson(equipment);
 this.downloadJson(json, 'equipment-database.json');
 }
 static downloadAllSkills(skills: Skill[]): void {
 const json = this.exportSkillsToJson(skills);
 this.downloadJson(json, 'skills-database.json');
 }
 static downloadAllParagonNodes(nodes: ParagonNode[]): void {
 const json = this.exportParagonNodesToJson(nodes);
 this.downloadJson(json, 'paragon-nodes.json');
 }
 static convertToD2CoreFormat(build: Build): string {
 const d2coreFormat = {
 version: '3.0',
 character: {
 class: build.characterClass,
 level: build.level
 },
 equipment: build.equipment,
 skills: build.skills.map(skill => ({
 id: skill.skillId,
 name: '',
 rank: skill.rank,
 slot: skill.slot || 0
 })),
 paragon: {
 nodes: build.paragon?.selectedNodes || []
 }
 };
 return JSON.stringify(d2coreFormat, null, 2);
 }
 static downloadAsD2CoreFormat(build: Build): void {
 const json = this.convertToD2CoreFormat(build);
 this.downloadJson(json, `${build.name}-d2core.json`);
 }
}