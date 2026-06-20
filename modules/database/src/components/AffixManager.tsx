import React, { useState, useEffect, useMemo } from 'react';
import { useDatabaseStore } from '../store/databaseStore';
import type { Affix, AffixRarity, AffixCategory, AffixSubcategory, AffixCalculationType, CharacterClass } from '../types';
import { downloadJsonFile } from '../utils/fileSystem';

// 稀有度配置
const rarityOptions: { value: AffixRarity; label: string; color: string }[] = [
  { value: 'normal', label: '普通', color: 'text-gray-300' },
  { value: 'transmute', label: '嬗变', color: 'text-blue-400' },
  { value: 'temper', label: '回火', color: 'text-amber-400' }
];

// 稀有度映射（英文 <-> 中文）
const rarityValueToLabel: Record<string, string> = {
  'normal': '普通', '嬗变': 'normal', 'transmute': '嬗变', '回火': 'temper', 'temper': '回火'
};
const rarityLabelToValue: Record<string, string> = {
  '普通': 'normal', '嬗变': 'transmute', '回火': 'temper'
};

// 大分类配置
const categoryOptions: { value: AffixCategory; label: string }[] = [
  { value: 'primary', label: '主属性' },
  { value: 'offense', label: '进攻' },
  { value: 'defense', label: '防御' },
  { value: 'utility', label: '通用' }
];

// 分类映射
const categoryValueToLabel: Record<string, string> = {
  'primary': '主属性', '主属性': 'primary',
  'offense': '进攻', '进攻': 'offense',
  'defense': '防御', '防御': 'defense',
  'utility': '通用', '通用': 'utility'
};

// 子分类配置
const subcategoryOptions: { value: AffixSubcategory; label: string }[] = [
  { value: 'weapon', label: '武器' },
  { value: 'offense', label: '攻击' },
  { value: 'defense', label: '防御' },
  { value: 'mobility', label: '机动' },
  { value: 'resource', label: '资源' },
  { value: 'general', label: '通用' }
];

// 子分类映射
const subcategoryValueToLabel: Record<string, string> = {
  'weapon': '武器', '武器': 'weapon',
  'offense': '攻击', '攻击': 'offense',
  'defense': '防御', '防御': 'defense',
  'mobility': '机动', '机动': 'mobility',
  'resource': '资源', '资源': 'resource',
  'general': '通用', '通用': 'general'
};

// 计算类型配置
const calculationTypeOptions: { value: AffixCalculationType; label: string }[] = [
  { value: 'additive', label: '加法' },
  { value: 'multiplicative', label: '乘法' },
  { value: 'independent', label: '独立' }
];

// 计算类型映射
const calcTypeValueToLabel: Record<string, string> = {
  'additive': '加法', '加法': 'additive',
  'multiplicative': '乘法', '乘法': 'multiplicative',
  'independent': '独立', '独立': 'independent'
};

// 装备槽位配置
const slotOptions = [
  { value: 'helmet', label: '头盔' },
  { value: 'chest', label: '胸甲' },
  { value: 'gloves', label: '手套' },
  { value: 'pants', label: '裤子' },
  { value: 'boots', label: '靴子' },
  { value: 'amulet', label: '项链' },
  { value: 'ring1', label: '戒指1' },
  { value: 'ring2', label: '戒指2' },
  { value: 'weapon1', label: '武器1' },
  { value: 'weapon2', label: '副手' }
];

// 装备槽映射
const slotValueToLabel: Record<string, string> = {
  'helmet': '头盔', '头盔': 'helmet',
  'chest': '胸甲', '胸甲': 'chest',
  'gloves': '手套', '手套': 'gloves',
  'pants': '裤子', '裤子': 'pants',
  'boots': '靴子', '靴子': 'boots',
  'amulet': '项链', '项链': 'amulet',
  'ring1': '戒指1', '戒指1': 'ring1',
  'ring2': '戒指2', '戒指2': 'ring2',
  'weapon1': '武器1', '武器1': 'weapon1',
  'weapon2': '副手', '副手': 'weapon2'
};

// 职业配置
const classOptions: { value: CharacterClass; label: string }[] = [
  { value: 'barbarian', label: '野蛮人' },
  { value: 'necromancer', label: '死灵法师' },
  { value: 'wizard', label: '巫师' },
  { value: 'druid', label: '德鲁伊' },
  { value: 'ranger', label: '游侠' },
  { value: 'spiritborn', label: '术士' },
  { value: 'paladin', label: '圣骑士' },
  { value: 'warlock', label: '灵巫' }
];

// 职业映射
const classValueToLabel: Record<string, string> = {
  'barbarian': '野蛮人', '野蛮人': 'barbarian',
  'necromancer': '死灵法师', '死灵法师': 'necromancer',
  'wizard': '巫师', '巫师': 'wizard',
  'druid': '德鲁伊', '德鲁伊': 'druid',
  'ranger': '游侠', '游侠': 'ranger',
  'spiritborn': '术士', '术士': 'spiritborn',
  'paladin': '圣骑士', '圣骑士': 'paladin',
  'warlock': '灵巫', '灵巫': 'warlock'
};

// 验证数组（用于导入时校验）
const validRarities: AffixRarity[] = ['normal', 'transmute', 'temper'];
const validCategories: AffixCategory[] = ['primary', 'offense', 'defense', 'utility'];
const validSubcategories: AffixSubcategory[] = ['weapon', 'offense', 'defense', 'mobility', 'resource', 'general'];
const validCalcTypes: AffixCalculationType[] = ['additive', 'multiplicative', 'independent'];

// 空白的词缀模板
const emptyAffix: Omit<Affix, 'id'> = {
  name: '',
  category: 'offense',
  subcategory: 'general',
  rarity: 'normal',
  calculationType: 'additive',
  minValue: 0,
  maxValue: 0,
  unit: '%',
  description: '',
  applicableSlots: []
};

export const AffixManager: React.FC = () => {
  const { affixes, addAffix, updateAffix, deleteAffix } = useDatabaseStore();
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  
  // 筛选状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterRarity, setFilterRarity] = useState<AffixRarity | ''>('');
  const [filterCategory, setFilterCategory] = useState<AffixCategory | ''>('');
  const [filterClass, setFilterClass] = useState<CharacterClass | ''>('');
  
  // 编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [editingAffix, setEditingAffix] = useState<Partial<Affix>>({});
  const [editingSlots, setEditingSlots] = useState<string[]>([]);
  const [editingClasses, setEditingClasses] = useState<CharacterClass[]>([]);
  
  // 行内编辑状态
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineEditingField, setInlineEditingField] = useState<string | null>(null);
  const [inlineEditingValue, setInlineEditingValue] = useState<string>('');
  
  // 删除确认
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // 批量选择状态
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // 批量编辑弹窗状态
  const [batchEditOpen, setBatchEditOpen] = useState(false);
  const [batchEditData, setBatchEditData] = useState<{
    rarity?: AffixRarity;
    category?: AffixCategory;
    subcategory?: AffixSubcategory;
    calculationType?: AffixCalculationType;
    applicableClasses?: CharacterClass[];
    applicableSlots?: string[];
  }>({});
  const [batchEditSlots, setBatchEditSlots] = useState<string[]>([]);
  const [batchEditClasses, setBatchEditClasses] = useState<CharacterClass[]>([]);
  
  // 批量导入弹窗状态
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importMode, setImportMode] = useState<'add' | 'replace' | 'skip'>('add');
  const [importPreview, setImportPreview] = useState<Affix[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  
  // 持久化数据键名
  const STORAGE_KEY = 'd4-affix-manager-data';

  // 从localStorage加载数据
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const customAffixes: Affix[] = JSON.parse(stored);
        // 将本地数据合并到store
        for (const affix of customAffixes) {
          if (!affixes.find(a => a.id === affix.id)) {
            addAffix(affix);
          }
        }
      } catch (e) {
        console.error('Failed to load custom affixes:', e);
      }
    }
  }, []);

  // 保存到localStorage
  const saveToLocalStorage = (affixesToSave: Affix[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(affixesToSave));
  };

  // 筛选后的词缀
  const filteredAffixes = useMemo(() => {
    return affixes.filter(affix => {
      // 搜索过滤
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        const matchName = affix.name.toLowerCase().includes(keyword);
        const matchDesc = affix.description.toLowerCase().includes(keyword);
        if (!matchName && !matchDesc) return false;
      }
      
      // 稀有度过滤
      if (filterRarity && affix.rarity !== filterRarity) return false;
      
      // 分类过滤
      if (filterCategory && affix.category !== filterCategory) return false;
      
      // 职业过滤
      if (filterClass) {
        if (!affix.applicableClasses || affix.applicableClasses.length === 0) {
          // 如果词缀没有设置适用职业，不过滤
        } else if (!affix.applicableClasses.includes(filterClass)) {
          return false;
        }
      }
      
      return true;
    });
  }, [affixes, searchKeyword, filterRarity, filterCategory, filterClass]);

  // 分页数据
  const paginatedAffixes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAffixes.slice(startIndex, startIndex + pageSize);
  }, [filteredAffixes, currentPage, pageSize]);

  // 总页数
  const totalPages = Math.ceil(filteredAffixes.length / pageSize);

  // 生成ID
  const generateId = (name: string): string => {
    return `affix-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  };

  // 打开新增表单
  const handleAdd = () => {
    setEditingAffix({ ...emptyAffix });
    setEditingSlots([]);
    setEditingClasses([]);
    setIsEditing(true);
  };

  // 打开编辑表单
  const handleEdit = (affix: Affix) => {
    setEditingAffix({ ...affix });
    setEditingSlots([...affix.applicableSlots]);
    setEditingClasses([...(affix.applicableClasses || [])]);
    setIsEditing(true);
  };

  // 关闭表单
  const handleClose = () => {
    setIsEditing(false);
    setEditingAffix({});
    setEditingSlots([]);
    setEditingClasses([]);
  };

  // 切换职业选择
  const toggleClass = (charClass: CharacterClass) => {
    setEditingClasses(prev => 
      prev.includes(charClass) 
        ? prev.filter(c => c !== charClass)
        : [...prev, charClass]
    );
  };

  // 保存词缀
  const handleSave = () => {
    if (!editingAffix.name) {
      alert('请输入词缀名称');
      return;
    }

    const slots = editingSlots.length > 0 ? editingSlots : [];
    const classes = editingClasses.length > 0 ? editingClasses : [];
    const description = editingAffix.description || `+[${editingAffix.minValue}${editingAffix.unit} - ${editingAffix.maxValue}${editingAffix.unit}] ${editingAffix.name}`;

    if (editingAffix.id) {
      // 更新现有词缀
      updateAffix(editingAffix.id, {
        ...editingAffix,
        applicableSlots: slots,
        applicableClasses: classes,
        description
      });
    } else {
      // 新增词缀
      const newAffix: Affix = {
        ...emptyAffix,
        ...editingAffix,
        id: generateId(editingAffix.name!),
        applicableSlots: slots,
        applicableClasses: classes,
        description
      } as Affix;
      addAffix(newAffix);
    }

    // 保存到localStorage
    saveToLocalStorage(affixes);

    handleClose();
    alert('保存成功！');
  };

  // 确认删除
  const handleDelete = (id: string) => {
    deleteAffix(id);
    
    // 更新localStorage - 从当前列表中移除（注意：此时 affixes 状态还未更新）
    // 需要等下一次渲染后再保存
    setTimeout(() => {
      const currentAffixes = useDatabaseStore.getState().affixes;
      saveToLocalStorage(currentAffixes);
    }, 0);
    
    setDeleteConfirm(null);
    
    // 调整当前页
    if (paginatedAffixes.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 导出JSON
  const handleExport = () => {
    const dataToExport = filteredAffixes.length === affixes.length 
      ? affixes 
      : filteredAffixes;
    downloadJsonFile(dataToExport, 'affixes-export.json');
  };

  // ========== 批量选择功能 ==========
  
  // 切换单条选中状态
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  // 全选当前页
  const selectAllCurrentPage = () => {
    if (selectedIds.size === paginatedAffixes.length && paginatedAffixes.every(a => selectedIds.has(a.id))) {
      // 取消全选
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        paginatedAffixes.forEach(a => newSet.delete(a.id));
        return newSet;
      });
    } else {
      // 全选
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        paginatedAffixes.forEach(a => newSet.add(a.id));
        return newSet;
      });
    }
  };
  
  // 全选所有筛选结果
  const selectAllFiltered = () => {
    if (selectedIds.size === filteredAffixes.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAffixes.map(a => a.id)));
    }
  };
  
  // 清除选择
  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  // ========== 批量编辑功能 ==========
  
  // 打开批量编辑弹窗
  const openBatchEdit = () => {
    setBatchEditData({});
    setBatchEditSlots([]);
    setBatchEditClasses([]);
    setBatchEditOpen(true);
  };
  
  // 批量保存
  const handleBatchSave = () => {
    const selectedCount = selectedIds.size;
    if (selectedCount === 0) {
      alert('请先选择要编辑的词缀');
      return;
    }
    
    // 构建更新对象
    const updates: Record<string, unknown> = {};
    if (batchEditData.rarity !== undefined) updates.rarity = batchEditData.rarity;
    if (batchEditData.category !== undefined) updates.category = batchEditData.category;
    if (batchEditData.subcategory !== undefined) updates.subcategory = batchEditData.subcategory;
    if (batchEditData.calculationType !== undefined) updates.calculationType = batchEditData.calculationType;
    if (batchEditSlots.length > 0) updates.applicableSlots = batchEditSlots;
    if (batchEditClasses.length > 0) updates.applicableClasses = batchEditClasses;
    
    // 如果没有设置任何属性，提示用户
    if (Object.keys(updates).length === 0) {
      alert('请至少选择一项要修改的属性');
      return;
    }
    
    // 执行批量更新
    selectedIds.forEach(id => {
      updateAffix(id, updates);
    });
    
    // 保存到localStorage
    setTimeout(() => {
      const currentAffixes = useDatabaseStore.getState().affixes;
      saveToLocalStorage(currentAffixes);
    }, 0);
    
    setBatchEditOpen(false);
    alert(`已成功更新 ${selectedCount} 条词缀`);
    clearSelection();
  };
  
  // 批量删除
  const handleBatchDelete = () => {
    const selectedCount = selectedIds.size;
    if (selectedCount === 0) {
      alert('请先选择要删除的词缀');
      return;
    }
    
    const confirmed = confirm(`确定要删除选中的 ${selectedCount} 条词缀吗？此操作不可恢复！`);
    if (!confirmed) return;
    
    selectedIds.forEach(id => {
      deleteAffix(id);
    });
    
    // 保存到localStorage
    setTimeout(() => {
      const currentAffixes = useDatabaseStore.getState().affixes;
      saveToLocalStorage(currentAffixes);
    }, 0);
    
    alert(`已删除 ${selectedCount} 条词缀`);
    clearSelection();
  };

  // ========== CSV导入导出功能 ==========
  
  // CSV导出
  const handleExportCSV = () => {
    const dataToExport = filteredAffixes.length === affixes.length 
      ? affixes 
      : filteredAffixes;
    
    // CSV表头
    const headers = [
      '名称', '稀有度', '分类', '子分类', '计算类型', 
      '最小值', '最大值', '单位', '描述', '适用装备槽', '适用职业'
    ];
    
    // CSV行数据（使用中文名称）
    const rows = dataToExport.map(affix => [
      affix.name,
      rarityValueToLabel[affix.rarity] || affix.rarity,
      categoryValueToLabel[affix.category] || affix.category,
      subcategoryValueToLabel[affix.subcategory] || affix.subcategory,
      calcTypeValueToLabel[affix.calculationType] || affix.calculationType,
      affix.minValue.toString(),
      affix.maxValue.toString(),
      affix.unit,
      affix.description,
      affix.applicableSlots?.map(s => slotValueToLabel[s] || s).join(';') || '',
      affix.applicableClasses?.map(c => classValueToLabel[c] || c).join(';') || ''
    ]);
    
    // 转义CSV字段
    const escapeCSV = (field: string) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };
    
    // 生成CSV内容
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => escapeCSV(cell)).join(','))
    ].join('\n');
    
    // 下载文件
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `affixes-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // 下载CSV模板
  const handleDownloadTemplate = () => {
    const headers = [
      '名称', '稀有度', '分类', '子分类', '计算类型', 
      '最小值', '最大值', '单位', '描述', '适用装备槽', '适用职业'
    ];
    
    // 示例数据（使用中文名称）
    const exampleRows = [
      ['伤害提升', '普通', '进攻', '通用', '加法', '10', '20', '%', '+10%-20% 伤害提升', '武器1;头盔', '野蛮人;死灵法师'],
      ['暴击率', '嬗变', '主属性', '通用', '加法', '5', '15', '%', '+5%-15% 暴击率', '手套;戒指1', ''],
      ['护甲值', '回火', '防御', '通用', '加法', '50', '100', '', '+50-100 护甲值', '胸甲;头盔;靴子', '德鲁伊;圣骑士']
    ];
    
    const escapeCSV = (field: string) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };
    
    const csvContent = [
      headers.join(','),
      ...exampleRows.map(row => row.map(cell => escapeCSV(cell)).join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'affixes-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // 处理CSV导入
  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log('[CSV导入] 未选择文件');
      return;
    }
    
    console.log('[CSV导入] 开始导入文件:', file.name, ', 大小:', file.size, 'bytes');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        console.log('[CSV导入] 文件读取成功，字节数:', arrayBuffer?.byteLength);
        
        // 首先尝试UTF-8解码
        let content = new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer));
        console.log('[CSV导入] UTF-8解码完成');
        
        // 解析第一行作为表头进行检测
        const firstLine = content.split('\n')[0]?.trim();
        console.log('[CSV导入] UTF-8表头:', firstLine?.substring(0, 50) + '...');
        
        // 检测表头是否正确（预期包含"名称"、"稀有度"等关键词）
        const expectedHeaders = ['名称', '稀有度', '分类', '子分类', '计算类型', '最小值', '最大值', '单位', '描述'];
        const hasValidHeader = expectedHeaders.some(header => firstLine?.includes(header));
        console.log('[CSV导入] UTF-8表头有效:', hasValidHeader);
        
        // 如果表头不正确，尝试GBK解码
        if (!hasValidHeader && arrayBuffer) {
          console.log('[CSV导入] UTF-8表头无效，尝试GBK解码');
          try {
            const decoder = new TextDecoder('GBK');
            const gbkContent = decoder.decode(new Uint8Array(arrayBuffer));
            const gbkFirstLine = gbkContent.split('\n')[0]?.trim();
            console.log('[CSV导入] GBK表头:', gbkFirstLine?.substring(0, 50) + '...');
            
            const gbkHasValidHeader = expectedHeaders.some(header => gbkFirstLine?.includes(header));
            console.log('[CSV导入] GBK表头有效:', gbkHasValidHeader);
            
            if (gbkHasValidHeader) {
              content = gbkContent;
              console.log('[CSV导入] 使用GBK解码结果');
            }
          } catch (err) {
            console.warn('[CSV导入] GBK解码失败:', err);
          }
        }
        
        const lines = content.split('\n').filter(line => line.trim());
        console.log('[CSV导入] 总行数:', lines.length);
        
        if (lines.length < 2) {
          alert('CSV文件格式错误：需要包含表头和数据行');
          console.log('[CSV导入] 错误：行数不足');
          return;
        }
        
        // 解析表头
        const headers = parseCSVLine(lines[0]);
        console.log('[CSV导入] 解析表头完成，列数:', headers.length);
        
        // 简单验证表头
        if (headers.length < 9) {
          alert(`CSV文件格式错误：列数不足。期望至少9列，得到${headers.length}列`);
          console.log('[CSV导入] 错误：列数不足，期望9列，实际:', headers.length);
          return;
        }
        
        // 解析数据行
        const parsedAffixes: Affix[] = [];
        const errors: string[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          if (values.length === 0 || !values[0]) continue;
          
          try {
            const affix = parseAffixFromCSV(values, i + 1);
            parsedAffixes.push(affix);
          } catch (err) {
            errors.push(`第${i + 1}行：${err instanceof Error ? err.message : '未知错误'}`);
          }
        }
        
        console.log('[CSV导入] 解析完成，成功:', parsedAffixes.length, '条，错误:', errors.length, '条');
        setImportPreview(parsedAffixes);
        setImportErrors(errors);
        
      } catch (err) {
        console.error('[CSV导入] 解析失败:', err);
        alert('解析CSV文件失败：' + (err instanceof Error ? err.message : '未知错误'));
      }
    };
    
    reader.onerror = (err) => {
      console.error('[CSV导入] 文件读取失败:', err);
      alert('读取文件失败：' + err);
    };
    
    reader.readAsArrayBuffer(file);
    // 清空input值以便重复选择同一文件
    event.target.value = '';
  };
  
  // 解析CSV行
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    
    return result;
  };
  
  // 从CSV行解析词缀（支持中文名称输入）
  const parseAffixFromCSV = (values: string[], rowNum: number): Affix => {
    const [name, rarity, category, subcategory, calcType, minVal, maxVal, unit, description, slots, classes] = values;
    
    if (!name) {
      throw new Error(`第${rowNum}行：名称不能为空`);
    }
    
    // 转换稀有度（支持中文和英文输入）
    let finalRarity: AffixRarity = 'normal';
    if (rarity) {
      if (validRarities.includes(rarity as AffixRarity)) {
        finalRarity = rarity as AffixRarity;
      } else if (rarityLabelToValue[rarity]) {
        finalRarity = rarityLabelToValue[rarity] as AffixRarity;
      } else {
        throw new Error(`第${rowNum}行：无效的稀有度：${rarity}（正确值：普通/嬗变/回火 或 normal/transmute/temper）`);
      }
    }
    
    // 转换分类
    let finalCategory: AffixCategory = 'offense';
    if (category) {
      if (validCategories.includes(category as AffixCategory)) {
        finalCategory = category as AffixCategory;
      } else if (categoryValueToLabel[category]) {
        finalCategory = categoryValueToLabel[category] as AffixCategory;
      } else {
        throw new Error(`第${rowNum}行：无效的分类：${category}（正确值：主属性/进攻/防御/通用 或 primary/offense/defense/utility）`);
      }
    }
    
    // 转换子分类
    let finalSubcategory: AffixSubcategory = 'general';
    if (subcategory) {
      if (validSubcategories.includes(subcategory as AffixSubcategory)) {
        finalSubcategory = subcategory as AffixSubcategory;
      } else if (subcategoryValueToLabel[subcategory]) {
        finalSubcategory = subcategoryValueToLabel[subcategory] as AffixSubcategory;
      } else {
        throw new Error(`第${rowNum}行：无效的子分类：${subcategory}（正确值：武器/攻击/防御/机动/资源/通用 或 weapon/offense/defense/mobility/resource/general）`);
      }
    }
    
    // 转换计算类型
    let finalCalcType: AffixCalculationType = 'additive';
    if (calcType) {
      if (validCalcTypes.includes(calcType as AffixCalculationType)) {
        finalCalcType = calcType as AffixCalculationType;
      } else if (calcTypeValueToLabel[calcType]) {
        finalCalcType = calcTypeValueToLabel[calcType] as AffixCalculationType;
      } else {
        throw new Error(`第${rowNum}行：无效的计算类型：${calcType}（正确值：加法/乘法/独立 或 additive/multiplicative/independent）`);
      }
    }
    
    // 解析数值
    const minValue = parseFloat(minVal) || 0;
    const maxValue = parseFloat(maxVal) || 0;
    
    // 解析装备槽（支持中文和英文，用;分隔）
    const applicableSlots = slots ? slots.split(';').map(s => {
      const trimmed = s.trim();
      if (!trimmed) return '';
      if (slotValueToLabel[trimmed]) {
        return slotValueToLabel[trimmed]; // 中文转英文
      }
      return trimmed; // 保持原样（英文或其他）
    }).filter(s => s) : [];
    
    // 解析职业（支持中文和英文，用;分隔）
    const applicableClasses = classes ? classes.split(';').map(c => {
      const trimmed = c.trim();
      if (!trimmed) return '';
      if (classValueToLabel[trimmed]) {
        return classValueToLabel[trimmed]; // 中文转英文
      }
      return trimmed; // 保持原样（英文或其他）
    }).filter(c => c) as CharacterClass[] : [];
    
    // 生成描述
    const finalDescription = description || `+[${minValue}${unit} - ${maxValue}${unit}] ${name}`;
    
    return {
      id: generateId(name),
      name,
      rarity: finalRarity,
      category: finalCategory,
      subcategory: finalSubcategory,
      calculationType: finalCalcType,
      minValue,
      maxValue,
      unit: unit || '',
      description: finalDescription,
      applicableSlots,
      applicableClasses
    };
  };
  
  // 执行导入
  const executeImport = () => {
    if (importPreview.length === 0) {
      alert('没有可导入的数据');
      return;
    }
    
    let addedCount = 0;
    let skippedCount = 0;
    
    if (importMode === 'replace') {
      // 替换模式：清空现有数据
      affixes.forEach(a => deleteAffix(a.id));
      addedCount = importPreview.length;
      importPreview.forEach(affix => addAffix(affix));
    } else if (importMode === 'skip') {
      // 跳过模式：不导入已存在的
      importPreview.forEach(affix => {
        const exists = affixes.some(a => a.name === affix.name);
        if (exists) {
          skippedCount++;
        } else {
          addedCount++;
          addAffix(affix);
        }
      });
    } else {
      // 添加模式：全部导入
      importPreview.forEach(affix => {
        addedCount++;
        addAffix(affix);
      });
    }
    
    // 保存到localStorage
    setTimeout(() => {
      const currentAffixes = useDatabaseStore.getState().affixes;
      saveToLocalStorage(currentAffixes);
    }, 0);
    
    setImportModalOpen(false);
    setImportPreview([]);
    setImportErrors([]);
    
    alert(`导入完成：新增 ${addedCount} 条${skippedCount > 0 ? `，跳过 ${skippedCount} 条（已存在）` : ''}`);
  };

  // 切换装备槽
  const toggleSlot = (slot: string) => {
    setEditingSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  // 行内编辑开始
  const handleInlineEditStart = (affixId: string, field: string, currentValue: string | number) => {
    setInlineEditingId(affixId);
    setInlineEditingField(field);
    setInlineEditingValue(String(currentValue));
  };

  // 行内编辑结束
  const handleInlineEditEnd = () => {
    if (inlineEditingId && inlineEditingField && inlineEditingValue !== '') {
      const updateData: Record<string, string | number> = {};
      
      // 根据字段类型进行类型转换
      switch (inlineEditingField) {
        case 'minValue':
        case 'maxValue':
          updateData[inlineEditingField] = parseFloat(inlineEditingValue) || 0;
          break;
        case 'name':
        case 'unit':
        case 'description':
          updateData[inlineEditingField] = inlineEditingValue;
          break;
        case 'rarity':
        case 'category':
        case 'subcategory':
        case 'calculationType':
          updateData[inlineEditingField] = inlineEditingValue;
          break;
        default:
          updateData[inlineEditingField] = inlineEditingValue;
      }
      
      updateAffix(inlineEditingId, updateData);
      
      // 保存到localStorage
      setTimeout(() => {
        const currentAffixes = useDatabaseStore.getState().affixes;
        saveToLocalStorage(currentAffixes);
      }, 0);
    }
    
    setInlineEditingId(null);
    setInlineEditingField(null);
    setInlineEditingValue('');
  };

  // 行内编辑取消
  const handleInlineEditCancel = () => {
    setInlineEditingId(null);
    setInlineEditingField(null);
    setInlineEditingValue('');
  };

  // 获取稀有度文字样式
  const getRarityTextStyle = (rarity: AffixRarity) => {
    switch (rarity) {
      case 'normal':
        return 'text-gray-300';
      case 'transmute':
        return 'text-blue-400';
      case 'temper':
        return 'text-amber-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-d4-card rounded-lg border border-d4-gold/20">
        {/* 搜索 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">搜索:</span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
            placeholder="名称/描述"
            className="w-40 px-3 py-1.5 bg-d4-input border border-d4-gold/30 rounded text-gray-200 text-sm focus:border-d4-gold"
          />
        </div>
        
        {/* 稀有度筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">稀有度:</span>
          <select
            value={filterRarity}
            onChange={(e) => { setFilterRarity(e.target.value as AffixRarity | ''); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-d4-input border border-d4-gold/30 rounded text-gray-200 text-sm focus:border-d4-gold"
          >
            <option value="">全部</option>
            {rarityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        {/* 分类筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">分类:</span>
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value as AffixCategory | ''); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-d4-input border border-d4-gold/30 rounded text-gray-200 text-sm focus:border-d4-gold"
          >
            <option value="">全部</option>
            {categoryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        {/* 职业筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">职业:</span>
          <select
            value={filterClass}
            onChange={(e) => { setFilterClass(e.target.value as CharacterClass | ''); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-d4-input border border-d4-gold/30 rounded text-gray-200 text-sm focus:border-d4-gold"
          >
            <option value="">全部</option>
            {classOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        {/* 右侧按钮 */}
        <div className="flex-1 flex justify-end gap-2">
          <button
            onClick={handleAdd}
            className="px-4 py-1.5 bg-d4-gold/20 border border-d4-gold/50 rounded text-d4-gold hover:bg-d4-gold/30 transition-colors text-sm font-medium"
          >
            + 新增词缀
          </button>
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-4 py-1.5 bg-green-700/30 border border-green-600/50 rounded text-green-400 hover:bg-green-700/50 transition-colors text-sm"
          >
            新导入CSV
          </button>
          <div className="relative group">
            <button className="px-4 py-1.5 bg-gray-700/30 border border-gray-500/50 rounded text-gray-300 hover:bg-gray-700/50 transition-colors text-sm">
              导出 ▼
            </button>
            <div className="absolute right-0 top-full mt-1 bg-d4-card border border-d4-gold/30 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-32">
              <button
                onClick={handleExport}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-d4-gold/10 hover:text-d4-gold transition-colors"
              >
                导出 JSON
              </button>
              <button
                onClick={handleExportCSV}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-d4-gold/10 hover:text-d4-gold transition-colors"
              >
                导出 CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 批量操作工具栏 - 选中时显示 */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 p-3 bg-blue-900/30 border border-blue-500/40 rounded-lg">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.size === paginatedAffixes.length && paginatedAffixes.length > 0}
              onChange={selectAllCurrentPage}
              className="w-4 h-4 rounded accent-blue-500"
            />
            <span className="text-blue-300 text-sm">
              已选择 <span className="font-bold">{selectedIds.size}</span> 条词缀
            </span>
          </div>
          
          <div className="h-6 w-px bg-blue-500/40"></div>
          
          <button
            onClick={selectAllFiltered}
            className="px-3 py-1 text-xs text-blue-300 hover:text-blue-200 hover:bg-blue-800/40 rounded transition-colors"
          >
            {selectedIds.size === filteredAffixes.length ? '取消全选' : '全选所有筛选结果'}
          </button>
          
          <button
            onClick={clearSelection}
            className="px-3 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700/40 rounded transition-colors"
          >
            清除选择
          </button>
          
          <div className="flex-1"></div>
          
          <button
            onClick={openBatchEdit}
            className="px-4 py-1.5 bg-blue-600/40 border border-blue-500/50 rounded text-blue-300 hover:bg-blue-600/60 transition-colors text-sm"
          >
            批量编辑
          </button>
          <button
            onClick={handleBatchDelete}
            className="px-4 py-1.5 bg-red-900/40 border border-red-700/50 rounded text-red-400 hover:bg-red-900/60 transition-colors text-sm"
          >
            批量删除
          </button>
        </div>
      )}

      {/* 统计信息 */}
      <div className="text-sm text-gray-400">
        共 {filteredAffixes.length} 条词缀（第 {currentPage}/{totalPages || 1} 页）
        {selectedIds.size > 0 && <span className="text-blue-400 ml-2">（已选 {selectedIds.size} 条）</span>}
      </div>

      {/* 词缀列表 */}
      <div className="bg-d4-card rounded-lg border border-d4-gold/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-d4-dark/50 border-b border-d4-gold/20">
                <th className="px-2 py-3 text-center text-gray-400 text-sm font-medium w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === paginatedAffixes.length && paginatedAffixes.length > 0}
                    onChange={selectAllCurrentPage}
                    className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-center text-gray-400 text-sm font-medium w-12">序号</th>
                <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">名称</th>
                <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">稀有度</th>
                <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">分类</th>
                <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">子分类</th>
                <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">计算类型</th>
                <th className="px-4 py-3 text-left text-gray-400 text-sm font-medium">数值范围</th>
                <th className="px-4 py-3 text-center text-gray-400 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAffixes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    暂无词缀数据
                  </td>
                </tr>
              ) : (
                paginatedAffixes.map((affix, index) => {
                  const rowIndex = (currentPage - 1) * pageSize + index + 1;
                  const isSelected = selectedIds.has(affix.id);
                  return (
                    <tr 
                      key={affix.id} 
                      className={`border-b border-d4-gold/10 transition-colors ${isSelected ? 'bg-blue-900/20' : 'hover:bg-d4-gold/5'}`}
                    >
                      <td className="px-2 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(affix.id)}
                          className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500 text-sm">
                        {rowIndex}
                      </td>
                      <td className="px-4 py-3">
                        {inlineEditingId === affix.id && inlineEditingField === 'name' ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={inlineEditingValue}
                              onChange={(e) => setInlineEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleInlineEditEnd();
                                if (e.key === 'Escape') handleInlineEditCancel();
                              }}
                              className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm w-full"
                              autoFocus
                            />
                            <button
                              onClick={handleInlineEditEnd}
                              className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleInlineEditCancel}
                              className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div 
                              className="text-gray-200 font-medium cursor-pointer hover:text-d4-gold transition-colors"
                              onClick={() => handleInlineEditStart(affix.id, 'name', affix.name)}
                            >
                              {affix.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">{affix.description}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {inlineEditingId === affix.id && inlineEditingField === 'rarity' ? (
                          <div className="flex items-center gap-1">
                            <select
                              value={inlineEditingValue}
                              onChange={(e) => setInlineEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleInlineEditEnd();
                                if (e.key === 'Escape') handleInlineEditCancel();
                              }}
                              className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm"
                              autoFocus
                            >
                              {rarityOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <button
                              onClick={handleInlineEditEnd}
                              className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleInlineEditCancel}
                              className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span 
                            className={`px-2 py-0.5 rounded text-xs font-medium ${getRarityTextStyle(affix.rarity)} cursor-pointer hover:opacity-70`}
                            onClick={() => handleInlineEditStart(affix.id, 'rarity', affix.rarity)}
                          >
                            {rarityOptions.find(r => r.value === affix.rarity)?.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {inlineEditingId === affix.id && inlineEditingField === 'category' ? (
                          <div className="flex items-center gap-1">
                            <select
                              value={inlineEditingValue}
                              onChange={(e) => setInlineEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleInlineEditEnd();
                                if (e.key === 'Escape') handleInlineEditCancel();
                              }}
                              className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm"
                              autoFocus
                            >
                              {categoryOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <button
                              onClick={handleInlineEditEnd}
                              className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleInlineEditCancel}
                              className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span 
                            className="text-gray-300 text-sm cursor-pointer hover:text-d4-gold transition-colors"
                            onClick={() => handleInlineEditStart(affix.id, 'category', affix.category)}
                          >
                            {categoryOptions.find(c => c.value === affix.category)?.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {affix.rarity === 'temper' ? (
                          inlineEditingId === affix.id && inlineEditingField === 'subcategory' ? (
                            <div className="flex items-center gap-1">
                              <select
                                value={inlineEditingValue}
                                onChange={(e) => setInlineEditingValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleInlineEditEnd();
                                  if (e.key === 'Escape') handleInlineEditCancel();
                                }}
                                className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm"
                                autoFocus
                              >
                                {subcategoryOptions.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                              <button
                                onClick={handleInlineEditEnd}
                                className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                              >
                                ✓
                              </button>
                              <button
                                onClick={handleInlineEditCancel}
                                className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span 
                              className="text-gray-300 text-sm cursor-pointer hover:text-d4-gold transition-colors"
                              onClick={() => handleInlineEditStart(affix.id, 'subcategory', affix.subcategory)}
                            >
                              {subcategoryOptions.find(s => s.value === affix.subcategory)?.label}
                            </span>
                          )
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {inlineEditingId === affix.id && inlineEditingField === 'calculationType' ? (
                          <div className="flex items-center gap-1">
                            <select
                              value={inlineEditingValue}
                              onChange={(e) => setInlineEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleInlineEditEnd();
                                if (e.key === 'Escape') handleInlineEditCancel();
                              }}
                              className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm"
                              autoFocus
                            >
                              {calculationTypeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <button
                              onClick={handleInlineEditEnd}
                              className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleInlineEditCancel}
                              className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span 
                            className="text-gray-300 text-sm cursor-pointer hover:text-d4-gold transition-colors"
                            onClick={() => handleInlineEditStart(affix.id, 'calculationType', affix.calculationType)}
                          >
                            {calculationTypeOptions.find(c => c.value === affix.calculationType)?.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {inlineEditingId === affix.id && inlineEditingField === 'minValue' ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={inlineEditingValue}
                                onChange={(e) => setInlineEditingValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleInlineEditEnd();
                                  if (e.key === 'Escape') handleInlineEditCancel();
                                }}
                                className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm w-16"
                                autoFocus
                              />
                              <button
                                onClick={handleInlineEditEnd}
                                className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                              >
                                ✓
                              </button>
                              <button
                                onClick={handleInlineEditCancel}
                                className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span 
                              className="text-gray-300 text-sm cursor-pointer hover:text-d4-gold transition-colors"
                              onClick={() => handleInlineEditStart(affix.id, 'minValue', affix.minValue)}
                            >
                              {affix.minValue}
                            </span>
                          )}
                          <span className="text-gray-500">{affix.unit}</span>
                          <span className="text-gray-500"> - </span>
                          {inlineEditingId === affix.id && inlineEditingField === 'maxValue' ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={inlineEditingValue}
                                onChange={(e) => setInlineEditingValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleInlineEditEnd();
                                  if (e.key === 'Escape') handleInlineEditCancel();
                                }}
                                className="px-2 py-1 bg-d4-input border border-d4-gold/50 rounded text-gray-200 text-sm w-16"
                                autoFocus
                              />
                              <button
                                onClick={handleInlineEditEnd}
                                className="px-2 py-1 text-xs text-green-400 hover:text-green-300"
                              >
                                ✓
                              </button>
                              <button
                                onClick={handleInlineEditCancel}
                                className="px-2 py-1 text-xs text-red-400 hover:text-red-300"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span 
                              className="text-gray-300 text-sm cursor-pointer hover:text-d4-gold transition-colors"
                              onClick={() => handleInlineEditStart(affix.id, 'maxValue', affix.maxValue)}
                            >
                              {affix.maxValue}
                            </span>
                          )}
                          <span className="text-gray-500">{affix.unit}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(affix)}
                            className="px-3 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded transition-colors"
                          >
                            编辑
                          </button>
                          {deleteConfirm === affix.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(affix.id)}
                                className="px-3 py-1 text-xs bg-red-900/50 text-red-400 hover:bg-red-900/70 rounded transition-colors"
                              >
                                确认
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 text-xs bg-gray-700/50 text-gray-400 hover:bg-gray-700/70 rounded transition-colors"
                              >
                                取消
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(affix.id)}
                              className="px-3 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-colors"
                            >
                              删除
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-d4-card border border-d4-gold/30 rounded text-gray-300 hover:bg-d4-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一页
          </button>
          <span className="text-gray-400">
            第 {currentPage} / {totalPages} 页
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-d4-card border border-d4-gold/30 rounded text-gray-300 hover:bg-d4-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一页
          </button>
        </div>
      )}

      {/* 编辑/新增弹窗 */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-d4-card rounded-lg border border-d4-gold/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-d4-gold/20">
              <h3 className="text-lg font-medium text-d4-gold">
                {editingAffix.id ? '编辑词缀' : '新增词缀'}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 表单内容 */}
            <div className="p-6 space-y-4">
              {/* 词缀名称 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  词缀名称 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editingAffix.name || ''}
                  onChange={(e) => setEditingAffix(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="例如：暴击伤害"
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                />
              </div>
              
              {/* 稀有度和分类一行 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">稀有度</label>
                  <select
                    value={editingAffix.rarity || 'normal'}
                    onChange={(e) => setEditingAffix(prev => ({ ...prev, rarity: e.target.value as AffixRarity }))}
                    className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                  >
                    {rarityOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">分类</label>
                  <select
                    value={editingAffix.category || 'offense'}
                    onChange={(e) => setEditingAffix(prev => ({ ...prev, category: e.target.value as AffixCategory }))}
                    className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                  >
                    {categoryOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 子分类和计算类型一行 */}
              <div className={editingAffix.rarity === 'temper' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1'}>
                {editingAffix.rarity === 'temper' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">子分类</label>
                    <select
                      value={editingAffix.subcategory || 'general'}
                      onChange={(e) => setEditingAffix(prev => ({ ...prev, subcategory: e.target.value as AffixSubcategory }))}
                      className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                    >
                      {subcategoryOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">计算类型</label>
                  <select
                    value={editingAffix.calculationType || 'additive'}
                    onChange={(e) => setEditingAffix(prev => ({ ...prev, calculationType: e.target.value as AffixCalculationType }))}
                    className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                  >
                    {calculationTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 数值范围 */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">最小值</label>
                  <input
                    type="number"
                    value={editingAffix.minValue || 0}
                    onChange={(e) => setEditingAffix(prev => ({ ...prev, minValue: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">最大值</label>
                  <input
                    type="number"
                    value={editingAffix.maxValue || 0}
                    onChange={(e) => setEditingAffix(prev => ({ ...prev, maxValue: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">单位</label>
                  <select
                    value={editingAffix.unit !== undefined ? editingAffix.unit : '%'}
                    onChange={(e) => setEditingAffix(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                  >
                    <option value="%">%</option>
                    <option value="">点</option>
                  </select>
                </div>
              </div>
              
              {/* 描述文本 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">描述文本</label>
                <input
                  type="text"
                  value={editingAffix.description || ''}
                  onChange={(e) => setEditingAffix(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="留空将自动生成"
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                />
                <p className="mt-1 text-xs text-gray-500">
                  自动生成格式：+[最小值% - 最大值%] 词缀名称
                </p>
              </div>
              
              {/* 适用装备槽 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">适用装备槽</label>
                <div className="flex flex-wrap gap-2">
                  {slotOptions.map(slot => (
                    <label
                      key={slot.value}
                      className={`px-3 py-1.5 rounded cursor-pointer text-sm transition-colors ${
                        editingSlots.includes(slot.value)
                          ? 'bg-d4-gold/30 border border-d4-gold/60 text-d4-gold'
                          : 'bg-d4-input border border-d4-gold/30 text-gray-400 hover:border-d4-gold/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={editingSlots.includes(slot.value)}
                        onChange={() => toggleSlot(slot.value)}
                        className="hidden"
                      />
                      {slot.label}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 适用职业 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">适用职业</label>
                <div className="flex flex-wrap gap-2">
                  {classOptions.map(cls => (
                    <label
                      key={cls.value}
                      className={`px-3 py-1.5 rounded cursor-pointer text-sm transition-colors ${
                        editingClasses.includes(cls.value)
                          ? 'bg-d4-gold/30 border border-d4-gold/60 text-d4-gold'
                          : 'bg-d4-input border border-d4-gold/30 text-gray-400 hover:border-d4-gold/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={editingClasses.includes(cls.value)}
                        onChange={() => toggleClass(cls.value)}
                        className="hidden"
                      />
                      {cls.label}
                    </label>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  不选择任何职业表示该词缀适用于所有职业
                </p>
              </div>
              
              {/* 图标 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">图标</label>
                <input
                  type="text"
                  value={editingAffix.icon || ''}
                  onChange={(e) => setEditingAffix(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="留空或输入图标URL/路径"
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                />
                <p className="mt-1 text-xs text-gray-500">
                  用于装备模拟器显示词缀图标，暂时可以为空
                </p>
              </div>
            </div>
            
            {/* 底部按钮 */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-d4-gold/20">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gray-700/30 border border-gray-500/50 rounded text-gray-300 hover:bg-gray-700/50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-d4-gold text-black rounded font-medium hover:bg-d4-gold/80 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 批量编辑弹窗 */}
      {batchEditOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-d4-card rounded-lg border border-d4-gold/40 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-d4-gold/20">
              <h3 className="text-lg font-medium text-blue-400">
                批量编辑 ({selectedIds.size} 条词缀)
              </h3>
              <button
                onClick={() => setBatchEditOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 说明 */}
            <div className="px-6 py-3 bg-blue-900/30 border-b border-blue-500/30">
              <p className="text-sm text-blue-300">
                选择要修改的属性，留空表示不修改该属性
              </p>
            </div>
            
            {/* 表单内容 */}
            <div className="p-6 space-y-4">
              {/* 稀有度 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">稀有度</label>
                <select
                  value={batchEditData.rarity || ''}
                  onChange={(e) => setBatchEditData(prev => ({ ...prev, rarity: e.target.value as AffixRarity || undefined }))}
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                >
                  <option value="">不修改</option>
                  {rarityOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              {/* 分类 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">分类</label>
                <select
                  value={batchEditData.category || ''}
                  onChange={(e) => setBatchEditData(prev => ({ ...prev, category: e.target.value as AffixCategory || undefined }))}
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                >
                  <option value="">不修改</option>
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              {/* 子分类 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">子分类</label>
                <select
                  value={batchEditData.subcategory || ''}
                  onChange={(e) => setBatchEditData(prev => ({ ...prev, subcategory: e.target.value as AffixSubcategory || undefined }))}
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                >
                  <option value="">不修改</option>
                  {subcategoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              {/* 计算类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">计算类型</label>
                <select
                  value={batchEditData.calculationType || ''}
                  onChange={(e) => setBatchEditData(prev => ({ ...prev, calculationType: e.target.value as AffixCalculationType || undefined }))}
                  className="w-full px-4 py-2 bg-d4-input border border-d4-gold/30 rounded text-gray-200 focus:border-d4-gold"
                >
                  <option value="">不修改</option>
                  {calculationTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              {/* 适用装备槽 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">适用装备槽（设置将覆盖原有值）</label>
                <div className="flex flex-wrap gap-2">
                  {slotOptions.map(slot => (
                    <label
                      key={slot.value}
                      className={`px-3 py-1.5 rounded cursor-pointer text-sm transition-colors ${
                        batchEditSlots.includes(slot.value)
                          ? 'bg-d4-gold/30 border border-d4-gold/60 text-d4-gold'
                          : 'bg-d4-input border border-d4-gold/30 text-gray-400 hover:border-d4-gold/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={batchEditSlots.includes(slot.value)}
                        onChange={() => {
                          if (batchEditSlots.includes(slot.value)) {
                            setBatchEditSlots(prev => prev.filter(s => s !== slot.value));
                          } else {
                            setBatchEditSlots(prev => [...prev, slot.value]);
                          }
                        }}
                        className="hidden"
                      />
                      {slot.label}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 适用职业 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">适用职业（设置将覆盖原有值）</label>
                <div className="flex flex-wrap gap-2">
                  {classOptions.map(cls => (
                    <label
                      key={cls.value}
                      className={`px-3 py-1.5 rounded cursor-pointer text-sm transition-colors ${
                        batchEditClasses.includes(cls.value)
                          ? 'bg-d4-gold/30 border border-d4-gold/60 text-d4-gold'
                          : 'bg-d4-input border border-d4-gold/30 text-gray-400 hover:border-d4-gold/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={batchEditClasses.includes(cls.value)}
                        onChange={() => {
                          if (batchEditClasses.includes(cls.value)) {
                            setBatchEditClasses(prev => prev.filter(c => c !== cls.value));
                          } else {
                            setBatchEditClasses(prev => [...prev, cls.value]);
                          }
                        }}
                        className="hidden"
                      />
                      {cls.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 底部按钮 */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-d4-gold/20">
              <button
                onClick={() => setBatchEditOpen(false)}
                className="px-6 py-2 bg-gray-700/30 border border-gray-500/50 rounded text-gray-300 hover:bg-gray-700/50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleBatchSave}
                className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-500 transition-colors"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV导入弹窗 */}
      {importModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-d4-card rounded-lg border border-d4-gold/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-d4-gold/20">
              <h3 className="text-lg font-medium text-green-400">
                导入词缀（CSV格式）
              </h3>
              <button
                onClick={() => { setImportModalOpen(false); setImportPreview([]); setImportErrors([]); }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 导入说明 */}
            <div className="px-6 py-4 space-y-3 bg-green-900/20 border-b border-green-500/30">
              <div className="flex items-center justify-between">
                <p className="text-sm text-green-300">步骤：下载模板 → 编辑模板 → 选择文件导入</p>
                <button
                  onClick={handleDownloadTemplate}
                  className="px-4 py-1.5 bg-green-700/40 border border-green-600/50 rounded text-green-300 hover:bg-green-700/60 transition-colors text-sm"
                >
                  下载模板
                </button>
              </div>
              
              <div className="text-xs text-gray-400">
                <p>• 模板中的示例数据仅供参考，请删除后填写您自己的数据</p>
                <p>• 名称为必填项，其他字段可选</p>
                <p>• 稀有度：普通/嬗变/回火</p>
                <p>• 分类：主属性/进攻/防御/通用</p>
                <p>• 子分类：武器/攻击/防御/机动/资源/通用</p>
                <p>• 计算类型：加法/乘法/独立</p>
                <p>• 适用装备槽和职业用分号(;)分隔，如：武器1;头盔</p>
                <p className="text-green-400 mt-1">✓ 支持中文或英文输入，系统会自动识别转换</p>
              </div>
            </div>
            
            {/* 文件选择 */}
            <div className="p-6">
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="px-6 py-4 border-2 border-dashed border-d4-gold/30 rounded-lg hover:border-d4-gold/60 transition-colors text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-300">新导入CSV - 点击选择文件</p>
                    <p className="text-xs text-gray-500 mt-1">支持 .csv 格式文件</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            {/* 预览和错误 */}
            {importPreview.length > 0 && (
              <div className="px-6 pb-4 space-y-4">
                {/* 导入模式选择 */}
                <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded">
                  <span className="text-sm text-gray-300">导入模式：</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      value="add"
                      checked={importMode === 'add'}
                      onChange={() => setImportMode('add')}
                      className="accent-green-500"
                    />
                    <span className="text-sm text-gray-300">新增（全部导入）</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      value="skip"
                      checked={importMode === 'skip'}
                      onChange={() => setImportMode('skip')}
                      className="accent-green-500"
                    />
                    <span className="text-sm text-gray-300">跳过（同名已存在则跳过）</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      value="replace"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="accent-red-500"
                    />
                    <span className="text-sm text-red-400">替换（清空现有数据）</span>
                  </label>
                </div>
                
                {/* 解析错误 */}
                {importErrors.length > 0 && (
                  <div className="p-3 bg-red-900/30 border border-red-700/50 rounded">
                    <p className="text-sm text-red-400 font-medium mb-2">解析错误（{importErrors.length} 条）：</p>
                    <ul className="text-xs text-red-300 space-y-1 max-h-32 overflow-y-auto">
                      {importErrors.slice(0, 10).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                      {importErrors.length > 10 && (
                        <li>...还有 {importErrors.length - 10} 条错误</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {/* 预览数据 */}
                <div>
                  <p className="text-sm text-green-400 mb-2">
                    预览：{importPreview.length} 条词缀将被导入
                  </p>
                  <div className="max-h-64 overflow-y-auto border border-d4-gold/20 rounded">
                    <table className="w-full text-xs">
                      <thead className="bg-d4-dark/50 sticky top-0">
                        <tr>
                          <th className="px-2 py-1 text-left text-gray-400">名称</th>
                          <th className="px-2 py-1 text-left text-gray-400">稀有度</th>
                          <th className="px-2 py-1 text-left text-gray-400">分类</th>
                          <th className="px-2 py-1 text-left text-gray-400">数值范围</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importPreview.slice(0, 20).map((affix, i) => (
                          <tr key={i} className="border-t border-d4-gold/10">
                            <td className="px-2 py-1 text-gray-200">{affix.name}</td>
                            <td className="px-2 py-1 text-gray-400">{affix.rarity}</td>
                            <td className="px-2 py-1 text-gray-400">{affix.category}</td>
                            <td className="px-2 py-1 text-gray-400">{affix.minValue}-{affix.maxValue}{affix.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {importPreview.length > 20 && (
                      <div className="px-2 py-2 text-center text-xs text-gray-500 bg-d4-dark/30">
                        ...还有 {importPreview.length - 20} 条
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* 底部按钮 */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-d4-gold/20">
              <button
                onClick={() => { setImportModalOpen(false); setImportPreview([]); setImportErrors([]); }}
                className="px-6 py-2 bg-gray-700/30 border border-gray-500/50 rounded text-gray-300 hover:bg-gray-700/50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={executeImport}
                disabled={importPreview.length === 0}
                className="px-6 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认导入 ({importPreview.length} 条)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
