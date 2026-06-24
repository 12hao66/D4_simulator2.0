import React from 'react';
import { GridNode, NODE_TYPE_LABELS } from '../types';

interface NodeTooltipProps {
  node: GridNode;
  mouseX: number;
  mouseY: number;
  language: 'zhCN' | 'enUS';
  equipIndex?: number;
  className?: string;
}

const getNodeName = (node: GridNode, language: 'zhCN' | 'enUS'): string => {
  if (language === 'zhCN' && node.nameCn) return node.nameCn;
  return node.nameEn || node.name || NODE_TYPE_LABELS[node.type][language];
};

// 翻译常见英文术语
const translateTerms = (text: string): string => {
  const translations: [string, string][] = [
    ['Physical', '物理'],
    ['Damage', '伤害'],
    ['Strength', '力量'],
    ['Intelligence', '智力'],
    ['Willpower', '意力'],
    ['Dexterity', '敏捷'],
    ['Armor', '护甲'],
    ['Life', '生命'],
    ['Bonus', '加成'],
    ['Another', '额外'],
    ['if requirements met', '满足门槛要求'],
    ['requirements', '门槛要求'],
    ['met', '满足'],
    ['\\+', '+'],
    ['%', '%']
  ];
  
  let result = text;
  for (const [en, cn] of translations) {
    const regex = new RegExp(en, 'g');
    result = result.replace(regex, cn);
  }
  
  // 清理多余的空行和空格
  result = result.replace(/\n{3,}/g, '\n\n').trim();
  
  return result;
};

// 计算门槛要求的实际值
const calculateThresholdRequirements = (node: GridNode, equipIndex: number = 1, className: string = 'Barbarian'): string => {
  if (!node.thresholdRequirements) return '';
  
  const classRequirements = node.thresholdRequirements[className];
  if (!classRequirements || classRequirements.length === 0) return '';
  
  // 计算第一个门槛要求
  let requirement = classRequirements[0];
  
  // 替换 {160 + (90 * ParagonBoardEquipIndex)} 这样的表达式
  const expressionMatch = requirement.match(/\{(.+?)\}/);
  if (expressionMatch) {
    const expression = expressionMatch[1];
    // 替换 ParagonBoardEquipIndex 为实际值
    const evaluatedExpression = expression.replace(/ParagonBoardEquipIndex/g, equipIndex.toString());
    try {
      // 使用 eval 计算表达式（注意安全风险，但这里是受控数据）
      const result = eval(evaluatedExpression);
      requirement = requirement.replace(/\{.+?\}/, Math.round(result).toString());
    } catch (e) {
      console.error('Failed to evaluate threshold expression:', e);
    }
  }
  
  return requirement;
};

// 属性名称翻译映射
const attributeTranslations: Record<string, string> = {
  'Strength': '力量',
  'Intelligence': '智力',
  'Willpower': '意力',
  'Dexterity': '敏捷'
};

// 翻译门槛要求中的属性名称
const translateAttributeName = (requirement: string): string => {
  for (const [en, cn] of Object.entries(attributeTranslations)) {
    requirement = requirement.replace(new RegExp(en, 'g'), cn);
  }
  return requirement;
};

const getNodeDesc = (node: GridNode, language: string, equipIndex: number = 1, className: string = 'Barbarian'): string => {
  let desc = '';
  if (language === 'zhCN' && node.descCn) {
    desc = node.descCn;
  } else {
    desc = node.descEn || node.desc || '';
  }
  
  // 去掉 "Tags:" 及其后面的内容
  const tagsIndex = desc.indexOf('\n\nTags:');
  if (tagsIndex !== -1) {
    desc = desc.substring(0, tagsIndex);
  }
  
  // 翻译英文术语（仅中文模式）- 先翻译
  if (language === 'zhCN') {
    desc = translateTerms(desc);
  }
  
  // 动态替换 {thresholdRequirements} 为实际计算值 - 后替换
  if (desc.includes('{thresholdRequirements}')) {
    const thresholdRequirement = calculateThresholdRequirements(node, equipIndex, className);
    if (thresholdRequirement) {
      // 根据语言翻译属性名称
      let translatedRequirement = thresholdRequirement;
      if (language === 'zhCN') {
        translatedRequirement = translateAttributeName(thresholdRequirement);
      }
      desc = desc.replace(/{thresholdRequirements}/g, translatedRequirement);
    }
  }
  
  return desc.trim();
};

export const NodeTooltip: React.FC<NodeTooltipProps> = ({ node, mouseX, mouseY, language, equipIndex = 1, className = 'Barbarian' }) => {
  const name = getNodeName(node, language);
  const desc = getNodeDesc(node, language, equipIndex, className);
  
  // 根据节点类型获取样式
  const getTypeStyles = () => {
    switch (node.type) {
      case 'normal':
        return {
          iconBg: '#6b6052',
          iconBorder: '#8a7a6a',
          titleColor: '#c0c0c0',
          borderColor: '#4a453d',
          typeColor: '#9c8c6f'
        };
      case 'magic':
        return {
          iconBg: '#3d6b8a',
          iconBorder: '#5d8baa',
          titleColor: '#6bb8e6',
          borderColor: '#2d5b7a',
          typeColor: '#6bb8e6'
        };
      case 'rare':
        return {
          iconBg: '#c9a13b',
          iconBorder: '#ffd700',
          titleColor: '#ffffff',
          borderColor: '#c9a13b',
          typeColor: '#c9a13b'
        };
      case 'legendary':
        return {
          iconBg: '#b8362a',
          iconBorder: '#ff6b6b',
          titleColor: '#ffffff',
          borderColor: '#b8362a',
          typeColor: '#ff6b6b'
        };
      case 'gate':
        return {
          iconBg: '#e8833a',
          iconBorder: '#ffaa66',
          titleColor: '#ffaa66',
          borderColor: '#c8631a',
          typeColor: '#e8833a'
        };
      case 'socket':
        return {
          iconBg: '#8a4a9e',
          iconBorder: '#c88aeb',
          titleColor: '#c88aeb',
          borderColor: '#6a2a7e',
          typeColor: '#8a4a9e'
        };
      case 'start':
        return {
          iconBg: '#d9c9a8',
          iconBorder: '#fff8dc',
          titleColor: '#fff8dc',
          borderColor: '#b9a988',
          typeColor: '#d9c9a8'
        };
      default:
        return {
          iconBg: '#666',
          iconBorder: '#888',
          titleColor: '#ccc',
          borderColor: '#444',
          typeColor: '#888'
        };
    }
  };
  
  const styles = getTypeStyles();
  
  // 获取节点图标
  const getNodeIcon = () => {
    switch (node.type) {
      case 'normal':
        return '⚪';
      case 'magic':
        return '✦';
      case 'rare':
        return '✧';
      case 'legendary':
        return '◆';
      case 'gate':
        return '▸';
      case 'socket':
        return '◈';
      case 'start':
        return '★';
      default:
        return '●';
    }
  };
  
  // 计算tooltip位置（避免超出屏幕）
  const tooltipX = Math.min(mouseX, window.innerWidth - 340);
  const tooltipY = Math.min(mouseY, window.innerHeight - 300);
  
  // 生成属性列表
  const renderAttributes = () => {
    // 优先使用 desc（包含完整的属性数值）
    if (desc) {
      const attributes = desc.split('\n').filter(attr => attr.trim());
      return attributes.map((attr, index) => (
        <div key={index} className="attr-item">
          <span className="attr-dot" style={{ backgroundColor: node.type === 'rare' ? '#c9a13b' : '#00ff00' }}></span>
          <span className="attr-text">{attr.trim()}</span>
        </div>
      ));
    }
    
    // 使用 value
    if (node.value !== undefined) {
      return (
        <div className="attr-item">
          <span className="attr-dot" style={{ backgroundColor: node.type === 'rare' ? '#c9a13b' : '#00ff00' }}></span>
          <span className="attr-text">{node.value} 主属性</span>
        </div>
      );
    }
    
    // 最后使用 tags（作为后备）
    if (node.tags && node.tags.length > 0) {
      return node.tags.map((tag, index) => (
        <div key={index} className="attr-item">
          <span className="attr-dot" style={{ backgroundColor: node.type === 'rare' ? '#c9a13b' : '#00ff00' }}></span>
          <span className="attr-text">{tag}</span>
        </div>
      ));
    }
    
    return null;
  };
  
  // 计算门槛进度
  const getThresholdProgress = () => {
    if (!node.tierValues || node.tierValues.length === 0) return { current: 0, total: 0, percentage: 0 };
    // 简单模拟门槛值
    const total = 630;
    const current = 932; // 模拟值
    return {
      current,
      total,
      percentage: Math.min(100, (current / total) * 100)
    };
  };
  
  const threshold = getThresholdProgress();
  
  return (
    <div 
      className="node-tooltip"
      style={{
        left: tooltipX + 15,
        top: tooltipY + 15,
        borderColor: styles.borderColor
      }}
    >
      {/* 图标 */}
      <div className="tooltip-icon-wrapper">
        <div 
          className="tooltip-icon"
          style={{ 
            backgroundColor: styles.iconBg,
            borderColor: styles.iconBorder
          }}
        >
          {getNodeIcon()}
        </div>
      </div>
      
      {/* 头部 */}
      <div className="tooltip-header">
        <div className="tooltip-type" style={{ color: styles.typeColor }}>
          {NODE_TYPE_LABELS[node.type][language]}
        </div>
        <div className="tooltip-title" style={{ color: styles.titleColor }}>
          {name}
        </div>
      </div>
      
      {/* 分隔线 */}
      <div className="tooltip-divider">
        <div className="divider-line"></div>
        <div className="divider-decoration">
          <span>◈</span>
          <span>◈</span>
        </div>
        <div className="divider-line"></div>
      </div>
      
      {/* 内容 */}
      <div className="tooltip-content">
        {node.type === 'legendary' ? (
          // 传奇节点：显示描述文本
          <div className="legendary-desc">
            {desc}
          </div>
        ) : node.type === 'socket' ? (
          // 雕纹插槽：简洁显示
          <div className="socket-hint">点击安装雕纹</div>
        ) : node.type === 'gate' ? (
          // Gate节点：显示属性 + 提示
          <div className="attributes">
            {renderAttributes()}
            <div className="gate-hint">点击连接或替换巅峰盘</div>
          </div>
        ) : node.type === 'start' ? (
          // 起始节点
          <div className="start-hint">巅峰盘起始节点</div>
        ) : (
          // 普通/魔法/稀有节点：显示属性列表
          <div className="attributes">
            {renderAttributes()}
            
            {/* 稀有节点的加成和门槛要求 */}
            {node.type === 'rare' && (
              <div className="bonus-section">
                <div className="bonus-label">加成:</div>
                <div className="bonus-text">如果满足要求则额外加+10.0%非物理伤害:</div>
                <div className="threshold-info">
                  <div className="threshold-bar">
                    <div 
                      className="threshold-fill"
                      style={{ width: `${threshold.percentage}%` }}
                    />
                  </div>
                  <div className="threshold-text">
                    <span className="threshold-current">{threshold.current}</span>
                    <span className="threshold-separator"> / </span>
                    <span className="threshold-total">{threshold.total}</span>
                    <span className="threshold-unit"> 点智力</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
