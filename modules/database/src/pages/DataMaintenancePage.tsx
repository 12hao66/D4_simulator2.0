import React, { useState, useEffect } from 'react';
import { useDatabaseStore } from '../store/databaseStore';
import { readJsonFile, saveJsonFile, downloadJsonFile, isFileSystemAccessSupported } from '../utils/fileSystem';
import type { UniqueEquipment, LegendaryPower, Affix, Rune } from '../types';
import { AffixManager } from '../components/AffixManager';

type DataType = 'unique' | 'power' | 'affix' | 'rune';

interface FileHandleStore {
  unique: FileSystemFileHandle | null;
  power: FileSystemFileHandle | null;
  affix: FileSystemFileHandle | null;
  rune: FileSystemFileHandle | null;
}

export const DataMaintenancePage: React.FC = () => {
  const { uniqueEquipment, legendaryPowers, affixes, runes, reloadUniqueEquipment, reloadLegendaryPowers, reloadAffixes, reloadRunes, addUniqueEquipment, addLegendaryPower, addAffix, addRune } = useDatabaseStore();
  
  const [activeTab, setActiveTab] = useState<DataType>('unique');
  const [fileHandles, setFileHandles] = useState<FileHandleStore>({ unique: null, power: null, affix: null, rune: null });
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化加载数据
  useEffect(() => {
    const init = async () => {
      await reloadUniqueEquipment();
      await reloadLegendaryPowers();
      await reloadAffixes();
      await reloadRunes();
      setIsInitialized(true);
    };
    init();
  }, []);

  // 获取当前数据
  const getCurrentData = () => {
    switch (activeTab) {
      case 'unique': return uniqueEquipment;
      case 'power': return legendaryPowers;
      case 'affix': return affixes;
      case 'rune': return runes;
    }
  };

  // 获取当前文件handle
  const getCurrentHandle = () => fileHandles[activeTab];

  // 获取JSON文件名
  const getJsonFileName = () => {
    switch (activeTab) {
      case 'unique': return 'uniqueEquipment.json';
      case 'power': return 'legendary-powers.json';
      case 'affix': return 'affixes.json';
      case 'rune': return 'runes.json';
    }
  };

  // 从JSON文件加载
  const handleLoadFromFile = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data, fileHandle } = await readJsonFile<any[]>();
      
      if (data && Array.isArray(data)) {
        setFileHandles(prev => ({ ...prev, [activeTab]: fileHandle }));
        
        // 更新store数据
        switch (activeTab) {
          case 'unique':
            useDatabaseStore.getState().uniqueEquipment = data;
            break;
          case 'power':
            useDatabaseStore.getState().legendaryPowers = data;
            break;
          case 'affix':
            useDatabaseStore.getState().affixes = data;
            break;
          case 'rune':
            useDatabaseStore.getState().runes = data;
            break;
        }
        
        // 强制重新渲染
        useDatabaseStore.setState({});
        
        alert(`成功从文件加载 ${data.length} 条数据！`);
      }
    } catch (err: any) {
      setError(`加载失败: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 保存到JSON文件
  const handleSaveToFile = async () => {
    const data = getCurrentData();
    
    try {
      const handle = getCurrentHandle();
      const fileName = getJsonFileName();
      const newHandle = await saveJsonFile(data, handle, fileName);
      
      if (newHandle) {
        setFileHandles(prev => ({ ...prev, [activeTab]: newHandle }));
        alert(`成功保存 ${data.length} 条数据到文件！`);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        alert(`保存失败: ${err.message}`);
      }
    }
  };

  // 导出下载
  const handleExport = () => {
    const data = getCurrentData();
    const fileName = getJsonFileName();
    downloadJsonFile(data, fileName);
  };

  // 解析文本
  const handleParseText = () => {
    setError('');
    setParsedData(null);

    if (!inputText.trim()) {
      setError('请输入数据');
      return;
    }

    try {
      let parsed: any[] = [];
      
      switch (activeTab) {
        case 'unique':
          parsed = parseUniqueText(inputText);
          break;
        case 'power':
          parsed = parsePowerText(inputText);
          break;
        case 'affix':
          parsed = parseAffixText(inputText);
          break;
        case 'rune':
          parsed = parseRuneText(inputText);
          break;
      }

      if (parsed.length === 0) {
        setError('无法解析数据，请检查格式');
        return;
      }

      setParsedData(parsed);
    } catch (err: any) {
      setError(`解析失败: ${err.message}`);
    }
  };

  // 解析符文文本
  const parseRuneText = (text: string): Rune[] => {
    const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b);
    const results: Rune[] = [];

    const typeMap: Record<string, 'legendary' | 'ritual'> = {
      '传奇': 'legendary',
      '仪祭': 'ritual'
    };

    const categoryMap: Record<string, 'Invocation' | 'Supplication'> = {
      '祈告': 'Invocation',
      '仪祭': 'Supplication'
    };

    for (const block of blocks) {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length === 0) continue;

      // 解析名称（可能包含英文名称）
      const nameParts = lines[0].split(/\s+/);
      const name = nameParts[0];
      const nameEn = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

      const rune: Rune = {
        id: `rune-${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        nameEn,
        type: 'legendary',
        category: 'Invocation',
        icon: `./images/runes/${name.toLowerCase().replace(/\s+/g, '-')}.png`,
        obtainedFrom: '',
        effects: [],
        runeWordDesc: ''
      };

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // 解析类型
        for (const [cn, en] of Object.entries(typeMap)) {
          if (line.includes(cn)) rune.type = en;
        }
        
        // 解析类别
        for (const [cn, en] of Object.entries(categoryMap)) {
          if (line.includes(cn)) rune.category = en;
        }

        // 解析获得方式
        if (line.includes('获得')) {
          rune.obtainedFrom = line.replace(/获得[：:]?\s*/, '');
        }
        
        // 解析效果
        if (line.includes('幸运一击') || line.includes('每') || line.includes('行进') || line.includes('战斗')) {
          rune.effects.push(line);
        }
        
        // 解析符文之语说明
        if (line.includes('符文之语')) {
          rune.runeWordDesc = line;
        }
      }

      // 默认符文之语说明
      if (!rune.runeWordDesc) {
        rune.runeWordDesc = '与一枚祈告符文共同插入装备上的两个镶孔即可关联，组成一段符文之语。同一时间只能激活两段符文之语。';
      }

      results.push(rune);
    }

    return results;
  };

  // 解析暗金装备文本
  const parseUniqueText = (text: string): UniqueEquipment[] => {
    const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b);
    const results: UniqueEquipment[] = [];

    const slotMap: Record<string, string> = {
      '头盔': 'helmet', '头': 'helmet',
      '胸甲': 'chest', '衣服': 'chest',
      '手套': 'gloves',
      '靴子': 'boots', '鞋子': 'boots',
      '裤子': 'pants',
      '护符': 'amulet', '项链': 'amulet',
      '戒指': 'ring1',
      '武器': 'weapon1', '主手': 'weapon1',
      '副手': 'weapon2'
    };

    const itemTypeMap: Record<string, 'unique' | 'mythic'> = {
      '暗金': 'unique', '神话': 'mythic', '普通': 'unique'
    };

    for (const block of blocks) {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length === 0) continue;

      const item: UniqueEquipment = {
        id: `unique-${lines[0].toLowerCase().replace(/\s+/g, '-')}`,
        name: lines[0],
        itemType: 'unique',
        slot: 'helmet',
        description: '',
        level: 80,
        affixes: [],
        uniqueEffects: [],
        icon: `./images/items/unique/${lines[0].toLowerCase().replace(/\s+/g, '-')}.png`,
        manuallyVerified: false
      };

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        for (const [cn, en] of Object.entries(itemTypeMap)) {
          if (line.includes(cn)) item.itemType = en;
        }
        for (const [cn, en] of Object.entries(slotMap)) {
          if (line.includes(cn)) item.slot = en;
        }

        const levelMatch = line.match(/等级\s*[:：]?\s*(\d+)/);
        if (levelMatch) item.level = parseInt(levelMatch[1]);

        if (line.includes('效果') || line.includes('特效') || line.includes('特殊')) {
          item.uniqueEffects.push({
            id: `ue-${item.name}-${i}`,
            name: item.name,
            description: line,
            condition: ''
          });
        }
      }

      results.push(item);
    }

    return results;
  };

  // 解析威能文本
  const parsePowerText = (text: string): LegendaryPower[] => {
    const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b);
    const results: LegendaryPower[] = [];

    const typeMap: Record<string, string> = {
      '资源': 'resource', '攻击': 'offense', '防御': 'defense',
      '机动': 'mobility', '通用': 'general', '武器': 'weapon'
    };

    const classMap: Record<string, 'barbarian' | 'necromancer' | 'sorc' | 'druid' | 'rogue' | 'spiritborn' | 'paladin'> = {
      '野蛮人': 'barbarian', '死灵法师': 'necromancer',
      '法师': 'sorc', '德鲁伊': 'druid', '游侠': 'rogue',
      '灵巫': 'spiritborn', '圣骑士': 'paladin'
    };

    const slotMap: Record<string, string> = {
      '头盔': 'helmet', '胸甲': 'chest', '手套': 'gloves',
      '靴子': 'boots', '裤子': 'pants', '护符': 'amulet',
      '戒指': 'ring', '武器': 'weapon', '副手': 'offhand'
    };

    for (const block of blocks) {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length === 0) continue;

      const power: LegendaryPower = {
        id: `power-${lines[0].toLowerCase().replace(/\s+/g, '-')}`,
        name: lines[0],
        type: 'all',
        powerType: 'general',
        description: '',
        applicableSlots: [],
        applicableClasses: []
      };

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // 解析类型和职业
        const typeClassMatch = line.match(/(.+?)\s*·\s*(.+)/);
        if (typeClassMatch) {
          const classPart = typeClassMatch[1].trim();
          const typePart = typeClassMatch[2].trim();
          
          // 检查是否是全职业
          if (classPart.includes('全职业')) {
            power.applicableClasses = undefined; // undefined表示全职业
          } else {
            for (const [cn, en] of Object.entries(classMap)) {
              if (classPart.includes(cn)) {
                if (!power.applicableClasses) power.applicableClasses = [];
                power.applicableClasses.push(en);
              }
            }
          }
          for (const [cn, en] of Object.entries(typeMap)) {
            if (typePart.includes(cn)) power.powerType = en;
          }
        }

        // 解析适用装备
        if (line.includes('护符') || line.includes('胸甲') || line.includes('头盔')) {
          const slots: string[] = [];
          for (const [cn, en] of Object.entries(slotMap)) {
            if (line.includes(cn)) slots.push(en);
          }
          power.applicableSlots = slots;
        }

        // 解析描述
        if (i === lines.length - 1 || line.length > 50) {
          power.description = line;
        }
      }

      if (power.applicableClasses?.length === 0) power.applicableClasses = undefined;
      results.push(power);
    }

    return results;
  };

  // 解析词缀文本
  const parseAffixText = (text: string): Affix[] => {
    const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b);
    const results: Affix[] = [];

    const rarityMap: Record<string, string> = {
      '普通': 'normal', '嬗变': 'transmute', '回火': 'temper'
    };

    const subcategoryMap: Record<string, string> = {
      '武器': 'weapon', '攻击': 'offense', '防御': 'defense',
      '机动': 'mobility', '资源': 'resource', '通用': 'general'
    };

    for (const block of blocks) {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length === 0) continue;

      const affix: Affix = {
        id: `affix-${lines[0].toLowerCase().replace(/\s+/g, '-')}`,
        name: lines[0],
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

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        for (const [cn, en] of Object.entries(rarityMap)) {
          if (line.includes(cn)) affix.rarity = en as any;
        }
        for (const [cn, en] of Object.entries(subcategoryMap)) {
          if (line.includes(cn)) affix.subcategory = en as any;
        }

        const valueMatch = line.match(/\[(\d+(?:\.\d+)?%?)\s*-\s*(\d+(?:\.\d+)?%?)\]/);
        if (valueMatch) {
          affix.minValue = parseFloat(valueMatch[1].replace('%', ''));
          affix.maxValue = parseFloat(valueMatch[2].replace('%', ''));
          affix.unit = valueMatch[1].includes('%') ? '%' : '';
        }

        if (line.length > 30) {
          affix.description = line;
        }
      }

      results.push(affix);
    }

    return results;
  };

  // 确认导入
  const handleConfirmImport = () => {
    if (!parsedData || parsedData.length === 0) return;

    for (const item of parsedData) {
      switch (activeTab) {
        case 'unique':
          addUniqueEquipment(item);
          break;
        case 'power':
          addLegendaryPower(item);
          break;
        case 'affix':
          addAffix(item);
          break;
        case 'rune':
          addRune(item);
          break;
      }
    }

    setInputText('');
    setParsedData(null);
    alert(`成功导入 ${parsedData.length} 条数据！\n点击"保存到文件"将数据写入JSON文件。`);
  };

  // Tab配置
  const tabs = [
    { id: 'unique', label: '暗金装备', icon: '💎', count: uniqueEquipment.length },
    { id: 'power', label: '威能', icon: '✨', count: legendaryPowers.length },
    { id: 'affix', label: '词缀', icon: '📊', count: affixes.length },
    { id: 'rune', label: '符文', icon: '🔤', count: runes.length }
  ];

  const supported = isFileSystemAccessSupported();

  // 显示加载状态
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-d4-dark text-d4-text flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-d4-gold mx-auto mb-4"></div>
          <p className="text-d4-gold">正在加载数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-d4-dark text-d4-text p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-d4-gold">数据维护工具</h1>
        <p className="text-gray-400 mt-1">管理暗金装备、威能、词缀数据，支持读取和保存JSON文件</p>
      </div>

      {/* 浏览器兼容性提示 */}
      {!supported && (
        <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4 mb-6">
          <p className="text-amber-300">
            ⚠️ 您的浏览器不支持 File System Access API。请使用 Chrome、Edge 或 Opera 浏览器以获得完整的文件读写功能。
            当前仅支持导出下载功能。
          </p>
        </div>
      )}

      {/* Tab切换 */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as DataType); setParsedData(null); setInputText(''); setError(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-d4-gold text-black'
                : 'bg-d4-card border border-d4-gold/30 text-d4-text hover:bg-d4-gold/20'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span className="text-sm opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* 词缀管理 - 使用独立组件 */}
      {activeTab === 'affix' ? (
        <AffixManager />
      ) : (
        <>
          {/* 文件操作区域 */}
          <div className="bg-d4-card rounded-lg border border-d4-gold/20 p-6 mb-6">
            <h2 className="text-lg font-medium text-d4-gold mb-4">文件操作</h2>
            
            <div className="flex gap-3">
              {supported && (
                <>
                  <button
                    onClick={handleLoadFromFile}
                    disabled={isLoading}
                    className="flex-1 py-3 bg-blue-900/30 border border-blue-500/50 rounded-lg text-blue-300 hover:bg-blue-900/50 transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? '加载中...' : '📂 从JSON文件加载'}
                  </button>
                  <button
                    onClick={handleSaveToFile}
                    className="flex-1 py-3 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 hover:bg-green-900/50 transition-colors font-medium"
                  >
                    💾 保存到JSON文件
                  </button>
                </>
              )}
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-gray-700/30 border border-gray-500/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors"
              >
                ⬇️ 导出下载
              </button>
            </div>

            {getCurrentHandle() && supported && (
              <p className="mt-3 text-xs text-gray-400">
                ✅ 已选择文件: {getCurrentHandle()!.name}（后续保存将覆盖此文件）
              </p>
            )}
          </div>

          {/* 批量导入区域 */}
          <div className="bg-d4-card rounded-lg border border-d4-gold/20 p-6 mb-6">
            <h2 className="text-lg font-medium text-d4-gold mb-4">批量导入</h2>
            
            <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full h-48 px-4 py-3 bg-d4-input border border-d4-gold/30 rounded-lg text-gray-300 placeholder-gray-500 focus:border-d4-gold resize-none"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleParseText}
                  className="px-6 py-2 bg-d4-gold/20 border border-d4-gold/50 rounded-lg text-d4-gold hover:bg-d4-gold/30 transition-colors"
                >
                  解析文本
                </button>
                <button
                  onClick={handleConfirmImport}
                  disabled={!parsedData || parsedData.length === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    parsedData && parsedData.length > 0
                      ? 'bg-d4-gold text-black hover:bg-d4-gold/80'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  确认导入 ({parsedData?.length || 0})
                </button>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 解析结果预览 */}
      {parsedData && parsedData.length > 0 && (
        <div className="bg-d4-card rounded-lg border border-d4-gold/20 p-6">
          <h2 className="text-lg font-medium text-d4-gold mb-4">
            解析结果预览 ({parsedData.length} 条)
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {parsedData.map((item, index) => (
              <div key={index} className="bg-d4-dark/50 rounded-lg border border-d4-gold/10 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white font-bold">{item.name}</span>
                  {activeTab === 'unique' && (
                    <>
                      <span className={`px-2 py-0.5 ${item.itemType === 'mythic' ? 'bg-purple-600' : 'bg-amber-600'} text-white text-xs rounded`}>
                        {item.itemType === 'mythic' ? '神话' : '暗金'}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                        {item.slot}
                      </span>
                    </>
                  )}
                  {activeTab === 'power' && (
                    <>
                      <span className="px-2 py-0.5 bg-blue-700 text-blue-200 text-xs rounded">
                        {item.powerType}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                        {item.applicableClasses?.join(', ') || 'all'}
                      </span>
                    </>
                  )}
                  {activeTab === 'affix' && (
                    <>
                      <span className={`px-2 py-0.5 ${
                        item.rarity === 'temper' ? 'bg-amber-600' :
                        item.rarity === 'transmute' ? 'bg-blue-600' : 'bg-gray-600'
                      } text-white text-xs rounded`}>
                        {item.rarity}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                        {item.subcategory}
                      </span>
                    </>
                  )}
                  {activeTab === 'rune' && (
                    <>
                      <span className={`px-2 py-0.5 ${
                        item.type === 'legendary' ? 'bg-purple-600' : 'bg-amber-600'
                      } text-white text-xs rounded`}>
                        {item.type === 'legendary' ? '传奇符文' : '仪祭符文'}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                        {item.category === 'Invocation' ? '祈告' : '仪祭'}
                      </span>
                    </>
                  )}
                </div>
                {item.description && (
                  <p className="text-gray-400 text-sm">{item.description}</p>
                )}
                {item.effects && item.effects.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {item.effects.map((effect: string, idx: number) => (
                      <p key={idx} className="text-gray-400 text-sm">✦ {effect}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 获取placeholder提示
  function getPlaceholder(): string {
    switch (activeTab) {
      case 'unique':
        return `暗金装备格式示例：

命运之拳
暗金 手套 等级: 80
幸运一击几率 +51.8%
暴击几率 +8.67%
特效: 幸运一击：最多有 51.8% 的几率...`;
      case 'power':
        return `威能格式示例：

暗影覆身威能
全职业 · 防御
护符[+50%], 胸甲, 头盔, 裤子, 副手
使用治疗药水会使你的全元素抗性提高 [20 - 30]%...`;
      case 'affix':
        return ''; // 词缀使用独立的 AffixManager 组件
      case 'rune':
        return `符文格式示例：

阿胡 Ahu
传奇符文
祈告符文
获得: 15 份供品
幸运一击：攻击非健康敌人时，最多有 [100%] 几率...`;
    }
  }
};