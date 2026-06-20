import { useEffect, useState, useMemo } from 'react';
import { useDatabaseStore } from './store/databaseStore';
import Header from './components/Header';
import ItemCard from './components/ItemCard';
import { PowerCard } from './components/PowerCard';
import { AffixPanel } from './components/AffixPanel';
import ItemDetailModal from './components/ItemDetailModal';
import Pagination from './components/Pagination';
import { DataMaintenancePage } from './pages/DataMaintenancePage';
import './index.css';
import type { UniqueEquipment, LegendaryPower, Affix, Skill, Amulet, CraftingMaterial, Rune, Gem } from './types';

type DataCategory = 'unique' | 'power' | 'affix' | 'skill' | 'amulet' | 'material' | 'rune' | 'gem';
type CharacterClass = 'barbarian' | 'necromancer' | 'sorc' | 'druid' | 'rogue' | 'spiritborn' | 'paladin';
type PageMode = 'query' | 'maintenance';

function App() {
  const { getStats, uniqueEquipment, legendaryPowers, affixes, skills, amulets, craftingMaterials, runes, gems, reloadUniqueEquipment, reloadLegendaryPowers, reloadAffixes, reloadGems, reloadRunes, reloadAmulets, isLoading, dataLoadError } = useDatabaseStore();
  
  // 从URL参数获取初始模式
  const getInitialMode = (): PageMode => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'maintenance' ? 'maintenance' : 'query';
  };
  
  const [pageMode, setPageMode] = useState<PageMode>(getInitialMode());
  const [activeCategory, setActiveCategory] = useState<DataCategory>('unique');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('全部');
  const [selectedRarity, setSelectedRarity] = useState('全部');
  const [selectedClass, setSelectedClass] = useState<CharacterClass | 'all'>('all');
  const [selectedBoss, setSelectedBoss] = useState('全部');
  const [selectedSubcategory, setSelectedSubcategory] = useState('全部');
  const [selectedItem, setSelectedItem] = useState<UniqueEquipment | LegendaryPower | Affix | Skill | Amulet | CraftingMaterial | Rune | Gem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const stats = getStats();

  // 监听来自父窗口的postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'switchToMaintenance') {
        setPageMode('maintenance');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 初始化加载数据（只在首次时加载mock数据）
  useEffect(() => {
    const init = async () => {
      // 从JSON加载暗金装备数据
      await reloadUniqueEquipment();
      // 从JSON加载威能数据
      await reloadLegendaryPowers();
      // 从JSON加载词缀数据
      await reloadAffixes();
      // 从JSON加载宝石数据
      await reloadGems();
      // 从JSON加载符文数据
      await reloadRunes();
      // 从JSON加载护身符数据
      await reloadAmulets();
      
      // 标记初始化完成
      setIsInitialized(true);
    };
    
    init();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm, selectedSlot, selectedClass, selectedBoss, selectedSubcategory]);

  const categories = [
    { id: 'unique', label: '暗金', icon: '💎', count: stats.totalUniqueEquipment },
    { id: 'power', label: '威能', icon: '✨', count: stats.totalLegendaryPowers },
    { id: 'affix', label: '词缀', icon: '📊', count: stats.totalAffixes },
    { id: 'skill', label: '技能', icon: '⚔️', count: stats.totalSkills },
    { id: 'amulet', label: '护身符', icon: '📿', count: stats.totalAmulets },
    { id: 'material', label: '制作材料', icon: '🧪', count: stats.totalCraftingMaterials },
    { id: 'rune', label: '符文', icon: '🔤', count: stats.totalRunes },
    { id: 'gem', label: '宝石', icon: '💠', count: stats.totalGems }
  ];

  const slots = ['全部', 'helmet', 'chest', 'gloves', 'pants', 'boots', 'amulet', 'ring1', 'ring2', 'weapon1', 'weapon2'];
  const characterClasses: (CharacterClass | 'all')[] = ['all', 'barbarian', 'necromancer', 'sorc', 'druid', 'rogue', 'spiritborn', 'paladin'];

  const getSlotLabel = (slot: string): string => {
    const slotMap: Record<string, string> = {
      helmet: '头盔',
      chest: '胸甲',
      gloves: '手套',
      pants: '裤子',
      boots: '靴子',
      amulet: '护符',
      ring1: '戒指',
      ring2: '戒指',
      weapon1: '武器',
      weapon2: '副手',
    };
    return slotMap[slot] || slot;
  };

  const getClassLabel = (charClass: string): string => {
    const classMap: Record<string, string> = {
      barbarian: '野蛮人',
      necromancer: '死灵法师',
      sorc: '法师',
      druid: '德鲁伊',
      rogue: '游侠',
      spiritborn: '灵巫',
      paladin: '圣骑士',
      all: '全职业'
    };
    return classMap[charClass] || charClass;
  };

  const filteredItems = useMemo(() => {
    const allData: Record<DataCategory, any[]> = {
      unique: uniqueEquipment,
      power: legendaryPowers,
      affix: affixes,
      skill: skills,
      amulet: amulets,
      material: craftingMaterials,
      rune: runes,
      gem: gems
    };
    
    let filtered = allData[activeCategory] || [];
    
    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term)
      );
    }
    
    // 暗金装备过滤：部位
    if (activeCategory === 'unique' && selectedSlot !== '全部') {
      filtered = filtered.filter((item: UniqueEquipment) => item.slot === selectedSlot);
    }
    
    // 暗金装备过滤：稀有度
    if (activeCategory === 'unique' && selectedRarity !== '全部') {
      filtered = filtered.filter((item: UniqueEquipment) => item.rarity === selectedRarity);
    }
    
    // 威能过滤：职业
    if (activeCategory === 'power' && selectedClass !== 'all') {
      filtered = filtered.filter((item: LegendaryPower) => 
        item.type === 'all' || 
        item.type === 'all-classes' ||
        item.applicableClasses?.includes(selectedClass as CharacterClass)
      );
    }
    
    // 威能过滤：威能类型
    if (activeCategory === 'power' && selectedBoss !== '全部') {
      filtered = filtered.filter((item: LegendaryPower) => item.powerType === selectedBoss);
    }
    
    // 词缀过滤：稀有度
    if (activeCategory === 'affix' && selectedRarity !== '全部') {
      filtered = filtered.filter((item: Affix) => item.rarity === selectedRarity);
    }
    
    // 词缀过滤：子分类
    if (activeCategory === 'affix' && selectedSubcategory !== '全部') {
      filtered = filtered.filter((item: Affix) => item.subcategory === selectedSubcategory);
    }
    
    // 技能过滤：职业
    if (activeCategory === 'skill' && selectedClass !== 'all') {
      filtered = filtered.filter((item: Skill) => item.characterClass === selectedClass);
    }
    
    return filtered;
  }, [activeCategory, searchTerm, selectedSlot, selectedRarity, selectedClass, selectedBoss, selectedSubcategory, uniqueEquipment, legendaryPowers, affixes, skills, amulets, craftingMaterials, runes, gems]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

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

  // 显示数据维护页面
  if (pageMode === 'maintenance') {
    return (
      <div className="min-h-screen bg-d4-dark text-d4-text">
        <Header />
        
        {/* 页面切换按钮 */}
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => setPageMode('query')}
            className="flex items-center gap-2 px-4 py-2 bg-d4-card border border-d4-gold/30 rounded-lg text-d4-gold hover:bg-d4-gold/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回数据查询
          </button>
        </div>
        
        <DataMaintenancePage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-d4-dark text-d4-text">
      <Header />
      
      {/* 数据加载状态提示 */}
      {dataLoadError && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 text-center">
          数据加载失败: {dataLoadError}
        </div>
      )}
      
      <div className="container mx-auto px-6 py-6">
        {/* 页面切换按钮 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setPageMode('maintenance')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-900/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            数据维护工具
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as DataCategory)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-d4-gold text-d4-dark'
                    : 'bg-d4-card text-d4-text-secondary hover:bg-d4-hover'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
          
          {/* 暗金装备数据刷新按钮 */}
          {activeCategory === 'unique' && (
            <div className="flex gap-2">
              <button
                onClick={() => reloadUniqueEquipment()}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-d4-gold/20 border border-d4-gold/50 rounded-lg text-d4-gold hover:bg-d4-gold/30 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isLoading ? '加载中...' : '刷新数据'}
              </button>
            </div>
          )}
          
          {/* 威能数据刷新按钮 */}
          {activeCategory === 'power' && (
            <div className="flex gap-2">
              <button
                onClick={() => reloadLegendaryPowers()}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-d4-gold/20 border border-d4-gold/50 rounded-lg text-d4-gold hover:bg-d4-gold/30 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isLoading ? '加载中...' : '刷新数据'}
              </button>
            </div>
          )}
          
          {/* 词缀数据刷新按钮 */}
          {activeCategory === 'affix' && (
            <div className="flex gap-2">
              <button
                onClick={() => reloadAffixes()}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-d4-gold/20 border border-d4-gold/50 rounded-lg text-d4-gold hover:bg-d4-gold/30 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isLoading ? '加载中...' : '刷新数据'}
              </button>
            </div>
          )}
          
          {/* 符文数据刷新按钮 */}
          {activeCategory === 'rune' && (
            <div className="flex gap-2">
              <button
                onClick={() => reloadRunes()}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-d4-gold/20 border border-d4-gold/50 rounded-lg text-d4-gold hover:bg-d4-gold/30 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isLoading ? '加载中...' : '刷新数据'}
              </button>
            </div>
          )}
          
          {/* 护身符数据刷新按钮 */}
          {activeCategory === 'amulet' && (
            <div className="flex gap-2">
              <button
                onClick={() => reloadAmulets()}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-d4-gold/20 border border-d4-gold/50 rounded-lg text-d4-gold hover:bg-d4-gold/30 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isLoading ? '加载中...' : '刷新数据'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-d4-card rounded-lg border border-d4-border p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={`搜索${categories.find(c => c.id === activeCategory)?.label || '数据'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-4 py-2 text-d4-text placeholder-d4-placeholder focus:border-d4-gold"
              />
            </div>
            <div className="flex items-center gap-2">
              {/* 暗金装备过滤 */}
              {activeCategory === 'unique' && (
                <>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                  >
                    <option value="全部">装备类型</option>
                    {slots.filter(s => s !== '全部').map(slot => (
                      <option key={slot} value={slot}>{getSlotLabel(slot)}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                  >
                    <option value="全部">稀有度</option>
                    <option value="common">普通</option>
                    <option value="magic">魔法</option>
                    <option value="rare">稀有</option>
                    <option value="legendary">传奇</option>
                    <option value="unique">暗金</option>
                  </select>
                </>
              )}
              
              {/* 威能过滤 */}
              {activeCategory === 'power' && (
                <>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value as CharacterClass | 'all')}
                    className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                  >
                    <option value="all">职业</option>
                    <option value="barbarian">野蛮人</option>
                    <option value="necromancer">死灵法师</option>
                    <option value="sorc">法师</option>
                    <option value="druid">德鲁伊</option>
                    <option value="rogue">游侠</option>
                    <option value="spiritborn">灵巫</option>
                    <option value="paladin">圣骑士</option>
                    <option value="all-classes">全职业</option>
                  </select>
                  
                  <select
                    value={selectedBoss}
                    onChange={(e) => setSelectedBoss(e.target.value)}
                    className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                  >
                    <option value="全部">威能类型</option>
                    <option value="resource">资源</option>
                    <option value="offense">攻击</option>
                    <option value="defense">防御</option>
                    <option value="mobility">机动</option>
                    <option value="utility">通用</option>
                    <option value="weapon">武器</option>
                  </select>
                </>
              )}
              
              {/* 词缀过滤 */}
              {activeCategory === 'affix' && (
                <>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                  >
                    <option value="全部">稀有度</option>
                    <option value="normal">普通</option>
                    <option value="transmute">嬗变</option>
                    <option value="temper">回火</option>
                  </select>
                  
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                  >
                    <option value="全部">子分类</option>
                    <option value="weapon">武器</option>
                    <option value="offense">攻击</option>
                    <option value="defense">防御</option>
                    <option value="mobility">机动</option>
                    <option value="resource">资源</option>
                    <option value="general">通用</option>
                  </select>
                </>
              )}
              
              {/* 技能过滤 */}
              {activeCategory === 'skill' && (
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as CharacterClass | 'all')}
                  className="bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:border-d4-gold cursor-pointer"
                >
                  <option value="all">职业</option>
                  {characterClasses.filter(c => c !== 'all').map(charClass => (
                    <option key={charClass} value={charClass}>{getClassLabel(charClass)}</option>
                  ))}
                </select>
              )}
              
              <button className="bg-d4-input border border-d4-border rounded-lg px-4 py-2 text-d4-text hover:bg-d4-hover transition-colors">
                筛选
              </button>
            </div>
          </div>
          
          <div className="mt-3 text-d4-text-secondary text-sm">
            共 {totalItems} 条数据
          </div>
        </div>

        {/* 词缀分类使用三列布局 */}
        {activeCategory === 'affix' ? (
          <AffixPanel 
            affixes={filteredItems as Affix[]} 
            onAffixClick={(affix) => handleItemClick(affix)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((item) => {
              // 威能分类使用PowerCard
              if (activeCategory === 'power') {
                return (
                  <PowerCard
                    key={item.id}
                    power={item}
                    onClick={() => handleItemClick(item)}
                  />
                );
              }
              // 其他分类使用ItemCard
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item)}
                />
              );
            })}
          </div>
        )}

        {totalItems > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>
      
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default App;
