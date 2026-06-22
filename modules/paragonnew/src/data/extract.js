import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取HTML文件
const htmlPath = path.join(__dirname, '..', '..', '野蛮人巅峰盘图鉴.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// 提取JSON数据
const startTag = '<script id="paragon-data" type="application/json">';
const endTag = '</script>';
const startIndex = html.indexOf(startTag) + startTag.length;
const endIndex = html.indexOf(endTag, startIndex);
const jsonStr = html.substring(startIndex, endIndex).trim();

// 保存JSON文件
const jsonPath = path.join(__dirname, 'paragonData.json');
fs.writeFileSync(jsonPath, jsonStr, 'utf-8');

console.log('JSON数据已提取到:', jsonPath);
console.log('数据大小:', (jsonStr.length / 1024).toFixed(2), 'KB');
