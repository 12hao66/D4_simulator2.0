/**
 * 数据转换脚本：将 diablo4-build-calc 的 paragon.js 转换为我们的 ParagonData 格式
 * 
 * 运行方式：node extract-paragon.js
 * 
 * 数据来源：D:\diaoblo4_items\diablo4-build-calc\data\paragon.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取源数据文件
const sourcePath = 'D:/diaoblo4_items/diablo4-build-calc/data/paragon.js';
const sourceCode = fs.readFileSync(sourcePath, 'utf-8');

// 提取 JSON 部分（去掉 let paragonData = 和末尾的 export 语句）
const jsonStart = sourceCode.indexOf('= {') + 2;
const jsonEnd = sourceCode.lastIndexOf('};');
let jsonStr = sourceCode.substring(jsonStart, jsonEnd + 1);
// 移除可能的 export 语句
jsonStr = jsonStr.replace(/\nexport\s*\{[^}]+\};?\s*$/, '');

// 使用 eval 解析（因为包含 JS 对象语法）
let paragonData;
try {
  // 移除 let 声明
  const cleanJson = jsonStr.trim();
  paragonData = eval('(' + cleanJson + ')');
} catch (e) {
  console.error('解析 paragon.js 失败:', e.message);
  process.exit(1);
}

// ============ 数据类型定义 ============

/**
 * 节点类型判断
 */
function getNodeType(nodeId) {
  if (!nodeId) return null;
  if (nodeId === 'StartNodeBarb' || nodeId === 'StartNodeDruid' || 
      nodeId === 'StartNodeNecro' || nodeId === 'StartNodeRogue' || 
      nodeId === 'StartNodeSorcerer') return 'start';
  if (nodeId === 'Generic_Gate') return 'gate';
  if (nodeId === 'Generic_Socket') return 'socket';
  if (nodeId.includes('Legendary')) return 'legendary';
  if (nodeId.includes('Rare') || nodeId.includes('_066') || nodeId.includes('_015') || nodeId.includes('_022') || 
      nodeId.includes('_001') && !nodeId.includes('Legendary')) return 'rare';
  if (nodeId.includes('Magic_')) return 'magic';
  return 'normal';
}

/**
 * 解析雕纹数值（从 "{1/2/3/.../21}" 格式提取）
 */
function parseGlyphTiers(desc) {
  const match = desc.match(/\{([^}]+)\}/);
  if (!match) return [];
  return match[1].split('/').map(v => parseFloat(v));
}

/**
 * 提取 Tags
 */
function extractTags(text) {
  if (!text) return [];
  const tagsMatch = text.match(/Tags:\s*(.+?)(?:\n|$)/i);
  if (!tagsMatch) return [];
  return tagsMatch[1].split(',').map(t => t.trim()).filter(t => t);
}

// ============ 数据转换 ============

/**
 * 转换单个节点
 */
function transformNode(nodeId, nodeData, allNodes) {
  const type = getNodeType(nodeId);
  if (!type) return null;
  
  // 如果有预定义的节点数据
  if (nodeData) {
    return {
      id: nodeId,
      type,
      name: nodeData.nameLocalized?.zhCN || nodeData.nameLocalized?.enUS || nodeData.name || nodeId,
      nameEn: nodeData.name,
      nameCn: nodeData.nameLocalized?.zhCN,
      desc: nodeData.descriptionLocalized?.zhCN || nodeData.description || nodeData.descriptionLocalized?.enUS || '',
      descEn: nodeData.descriptionLocalized?.enUS || nodeData.description,
      descCn: nodeData.descriptionLocalized?.zhCN,
      tags: extractTags(nodeData.descriptionLocalized?.zhCN || nodeData.description || ''),
      tierValues: nodeData.desc?.match(/\{([^}]+)\}/)?.[1]?.split('/')?.map(v => parseFloat(v)) || []
    };
  }
  
  // 通用节点定义
  const genericNode = allNodes[nodeId];
  if (genericNode) {
    return {
      id: nodeId,
      type,
      name: genericNode.nameLocalized?.zhCN || genericNode.name,
      nameEn: genericNode.name,
      nameCn: genericNode.nameLocalized?.zhCN,
      desc: genericNode.descriptionLocalized?.zhCN || genericNode.description,
      descEn: genericNode.descriptionLocalized?.enUS || genericNode.description,
      descCn: genericNode.descriptionLocalized?.zhCN,
      tags: extractTags(genericNode.descriptionLocalized?.zhCN || genericNode.description),
      tierValues: []
    };
  }
  
  return {
    id: nodeId,
    type,
    name: nodeId,
    nameEn: nodeId,
    nameCn: nodeId,
    desc: '',
    descEn: '',
    descCn: '',
    tags: [],
    tierValues: []
  };
}

/**
 * 转换雕纹数据
 */
function transformGlyph(glyphId, glyphData) {
  const tiers = parseGlyphTiers(glyphData.desc);
  const bonusMatch = glyphData.bonus?.match(/\{([^}]+)\}/);
  
  return {
    id: glyphId,
    name: glyphData.nameLocalized?.zhCN || glyphData.name,
    nameEn: glyphData.name,
    nameCn: glyphData.nameLocalized?.zhCN,
    threshold: glyphData.thresholdRequirements,
    thresholdCn: glyphData.thresholdRequirements,
    bonus: glyphData.bonusLocalized?.zhCN || glyphData.bonus,
    bonusEn: glyphData.bonus,
    bonusCn: glyphData.bonusLocalized?.zhCN,
    descTemplate: glyphData.desc?.replace(/\{[^}]+\}/g, '{TIER}'),
    tiers,
    tags: extractTags(glyphData.descLocalized?.zhCN || glyphData.desc),
    // 雕纹等级范围（1-21）
    levels: Array.from({length: 21}, (_, i) => i + 1)
  };
}

/**
 * 转换巅峰盘
 */
function transformBoard(boardName, boardGrid, allNodes, legendaryNodes) {
  const grid = boardGrid.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      if (!cell) return null;
      return transformNode(cell, null, {...allNodes, ...legendaryNodes});
    });
  });
  
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  
  // 找到 Gate 节点的位置并确定方向
  const gates = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell && cell.type === 'gate') {
        // 根据Gate位置确定方向（表示从该Gate出发可以连接的方向）
        let direction = 'top';
        if (rowIndex === 0) {
          // 顶部Gate，连接到下方的盘面
          direction = 'bottom';
        } else if (rowIndex === rows - 1) {
          // 底部Gate，连接到上方的盘面
          direction = 'top';
        } else if (colIndex === 0) {
          // 左侧Gate，连接到右侧的盘面
          direction = 'right';
        } else if (colIndex === cols - 1) {
          // 右侧Gate，连接到左侧的盘面
          direction = 'left';
        }
        gates.push({ row: rowIndex, col: colIndex, id: cell.id, direction });
      }
    });
  });
  
  // 找到 Start 节点的位置
  const startNodes = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell && cell.type === 'start') {
        startNodes.push({ row: rowIndex, col: colIndex, id: cell.id });
      }
    });
  });
  
  return {
    id: `Paragon_Barb_${boardName.replace(/\s+/g, '_')}`,
    name: boardName,
    rows: grid.length,
    cols: grid[0]?.length || 0,
    grid,
    gates,
    startNodes
  };
}

// ============ 分析连接关系 ============

/**
 * 分析巅峰盘之间的连接关系
 * 
 * 在暗黑4中，巅峰盘通过 Gate 节点相互连接。
 * Gate 节点位于巅峰盘的边缘，相邻巅峰盘的 Gate 会连接在一起。
 */
function analyzeBoardConnections(boards) {
  const connections = [];
  
  // 分析每个 Board 的 Gate 位置
  boards.forEach(board => {
    // Gate 通常在边缘位置
    const topGates = board.gates.filter(g => g.row === 0);
    const bottomGates = board.gates.filter(g => g.row === board.rows - 1);
    const leftGates = board.gates.filter(g => g.col === 0);
    const rightGates = board.gates.filter(g => g.col === board.cols - 1);
    
    board.gatePositions = {
      top: topGates.map(g => ({ ...g, direction: 'bottom' })),
      bottom: bottomGates.map(g => ({ ...g, direction: 'top' })),
      left: leftGates.map(g => ({ ...g, direction: 'right' })),
      right: rightGates.map(g => ({ ...g, direction: 'left' }))
    };
  });
  
  // 匹配相邻 Board 的 Gate
  // 根据 Gate 的相对位置推断连接关系
  for (let i = 0; i < boards.length; i++) {
    for (let j = i + 1; j < boards.length; j++) {
      const boardA = boards[i];
      const boardB = boards[j];
      
      // 检查是否有 Gate 在边缘
      // 如果 A 的底部有 Gate，B 的顶部有 Gate，且在同一列位置，则它们连接
      boardA.gatePositions.bottom.forEach(gateA => {
        boardB.gatePositions.top.forEach(gateB => {
          // 允许一定的位置偏差（因为每个 Board 的大小可能不同）
          if (Math.abs(gateA.col - gateB.col) <= 2) {
            connections.push({
              from: { boardId: boardA.id, boardName: boardA.name, row: gateA.row, col: gateA.col },
              to: { boardId: boardB.id, boardName: boardB.name, row: gateB.row, col: gateB.col },
              direction: 'vertical'
            });
          }
        });
      });
      
      // 如果 A 的右侧有 Gate，B 的左侧有 Gate，且在同一行位置，则它们连接
      boardA.gatePositions.right.forEach(gateA => {
        boardB.gatePositions.left.forEach(gateB => {
          if (Math.abs(gateA.row - gateB.row) <= 2) {
            connections.push({
              from: { boardId: boardA.id, boardName: boardA.name, row: gateA.row, col: gateA.col },
              to: { boardId: boardB.id, boardName: boardB.name, row: gateB.row, col: gateB.col },
              direction: 'horizontal'
            });
          }
        });
      });
    }
  }
  
  return connections;
}

// ============ 主转换逻辑 ============

function convertBarbarianData() {
  const barbarian = paragonData.Barbarian;
  const generic = paragonData.Generic;
  
  // 转换所有节点
  const allNodes = { ...generic.Node };
  
  // 转换巅峰盘
  const boards = Object.entries(barbarian.Board).map(([name, grid]) => {
    return transformBoard(name, grid, allNodes, barbarian.Node);
  });
  
  // 分析连接关系
  const connections = analyzeBoardConnections(boards);
  
  // 转换雕纹
  const glyphs = Object.entries(barbarian.Glyph || {}).map(([id, data]) => {
    return transformGlyph(id, data);
  });
  
  // 转换传奇节点
  const legendaryNodes = Object.entries(barbarian.Node || {}).map(([id, data]) => {
    return transformNode(id, data, {});
  });
  
  // 构建完整数据
  const result = {
    version: '52025',
    className: 'Barbarian',
    classNameCn: '野蛮人',
    language: 'zhCN',
    boards,
    glyphs,
    legendaryNodes,
    connections,
    // 所有节点的去重索引
    nodeIndex: {}
  };
  
  // 构建节点索引
  const nodeSet = new Map();
  boards.forEach(board => {
    board.grid.forEach(row => {
      row.forEach(cell => {
        if (cell && !nodeSet.has(cell.id)) {
          nodeSet.set(cell.id, cell);
        }
      });
    });
  });
  result.nodeIndex = Object.fromEntries(nodeSet);
  
  return result;
}

// ============ 执行转换 ============

console.log('开始转换 Barbarian 巅峰盘数据...');

const result = convertBarbarianData();

console.log(`转换完成！`);
console.log(`- 巅峰盘数量: ${result.boards.length}`);
console.log(`- 节点总数: ${Object.keys(result.nodeIndex).length}`);
console.log(`- 雕纹数量: ${result.glyphs.length}`);
console.log(`- 传奇节点数量: ${result.legendaryNodes.length}`);
console.log(`- 连接关系数量: ${result.connections.length}`);

// 保存结果
const outputPath = path.join(__dirname, 'barbarianData.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
console.log(`数据已保存到: ${outputPath}`);

// 同时输出一个简化版本（用于开发）
const simpleVersion = {
  version: result.version,
  className: result.className,
  classNameCn: result.classNameCn,
  boards: result.boards.map(b => ({
    id: b.id,
    name: b.name,
    rows: b.rows,
    cols: b.cols,
    gates: b.gates,
    startNodes: b.startNodes
  })),
  glyphs: result.glyphs,
  legendaryNodes: result.legendaryNodes,
  connections: result.connections,
  nodeIndex: result.nodeIndex
};

const simplePath = path.join(__dirname, 'barbarianDataSimple.json');
fs.writeFileSync(simplePath, JSON.stringify(simpleVersion, null, 2), 'utf-8');
console.log(`简化版本已保存到: ${simplePath}`);
