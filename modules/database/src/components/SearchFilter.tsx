

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedRarity: string;
  onRarityChange: (rarity: string) => void;
  selectedSlot: string;
  onSlotChange: (slot: string) => void;
  selectedClass: string;
  onClassChange: (charClass: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
  category: string;
}

// 暗金装备部位
const equipSlots = ['全部', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'helmet', 'chest', 'gloves', 'boots', 'amulet', 'ring', 'pants'];
// 暗金装备稀有度
const equipRarities = ['全部', 'common', 'magic', 'rare', 'legendary', 'unique'];
// 职业
const classes = ['全部', 'barbarian', 'necromancer', 'sorc', 'druid', 'rogue', 'spiritborn', 'paladin'];
// 词缀子分类
const affixSubcategories = ['全部', 'weapon', 'offense', 'defense', 'mobility', 'resource', 'general'];
// 词缀稀有度
const affixRarities = ['全部', 'normal', 'transmute', 'temper'];
// Boss
const bosses = ['全部', '乌里瓦尔', '莉莉丝', '安达利尔', '迪亚波罗', '巴尔'];

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedRarity,
  onRarityChange,
  selectedSlot,
  onSlotChange,
  selectedClass,
  onClassChange,
  selectedSubcategory,
  onSubcategoryChange,
  category
}) => {
  return (
    <div className="bg-d4-card rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-d4-label text-sm mb-2">搜索</label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`搜索${getCategoryLabel(category)}...`}
              className="w-full bg-d4-input border border-d4-border rounded-lg px-4 py-2 text-d4-text placeholder-d4-placeholder focus:outline-none focus:border-d4-accent transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-d4-icon">🔍</span>
          </div>
        </div>
        
        {/* 暗金装备过滤 */}
        {category === 'unique' && (
          <>
            <div className="min-w-[120px]">
              <label className="block text-d4-label text-sm mb-2">部位</label>
              <select
                value={selectedSlot}
                onChange={(e) => onSlotChange(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
              >
                {equipSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {getEquipSlotLabel(slot)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="min-w-[120px]">
              <label className="block text-d4-label text-sm mb-2">稀有度</label>
              <select
                value={selectedRarity}
                onChange={(e) => onRarityChange(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
              >
                {equipRarities.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {getEquipRarityLabel(rarity)}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        
        {/* 威能过滤 */}
        {category === 'power' && (
          <>
            <div className="min-w-[120px]">
              <label className="block text-d4-label text-sm mb-2">职业</label>
              <select
                value={selectedClass}
                onChange={(e) => onClassChange(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {getClassLabel(cls)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="min-w-[120px]">
              <label className="block text-d4-label text-sm mb-2">Boss</label>
              <select
                value={selectedRarity}
                onChange={(e) => onRarityChange(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
              >
                {bosses.map((boss) => (
                  <option key={boss} value={boss}>
                    {boss}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        
        {/* 词缀过滤 */}
        {category === 'affix' && (
          <>
            <div className="min-w-[120px]">
              <label className="block text-d4-label text-sm mb-2">稀有度</label>
              <select
                value={selectedRarity}
                onChange={(e) => onRarityChange(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
              >
                {affixRarities.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {getAffixRarityLabel(rarity)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="min-w-[120px]">
              <label className="block text-d4-label text-sm mb-2">子分类</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => onSubcategoryChange(e.target.value)}
                className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
              >
                {affixSubcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {getAffixSubcategoryLabel(sub)}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        
        {/* 技能过滤 */}
        {category === 'skill' && (
          <div className="min-w-[120px]">
            <label className="block text-d4-label text-sm mb-2">职业</label>
            <select
              value={selectedClass}
              onChange={(e) => onClassChange(e.target.value)}
              className="w-full bg-d4-input border border-d4-border rounded-lg px-3 py-2 text-d4-text focus:outline-none focus:border-d4-accent transition-colors"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {getClassLabel(cls)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    unique: '暗金装备',
    power: '威能',
    affix: '词缀',
    skill: '技能',
    amulet: '护身符',
    material: '制作材料',
    rune: '符文',
    gem: '宝石'
  };
  return labels[category] || '';
}

function getEquipSlotLabel(slot: string): string {
  const labels: Record<string, string> = {
    '全部': '全部',
    'weapon1': '单手武器',
    'weapon2': '双手武器',
    'weapon3': '远程武器',
    'weapon4': '副手',
    'helmet': '头盔',
    'chest': '胸甲',
    'gloves': '手套',
    'boots': '靴子',
    'amulet': '护身符',
    'ring': '戒指',
    'pants': '裤子'
  };
  return labels[slot] || slot;
}

function getEquipRarityLabel(rarity: string): string {
  const labels: Record<string, string> = {
    '全部': '全部',
    'common': '普通',
    'magic': '魔法',
    'rare': '稀有',
    'legendary': '传奇',
    'unique': '暗金'
  };
  return labels[rarity] || rarity;
}

function getClassLabel(charClass: string): string {
  const labels: Record<string, string> = {
    '全部': '全部',
    'barbarian': '野蛮人',
    'necromancer': '死灵法师',
    'sorc': '法师',
    'druid': '德鲁伊',
    'rogue': '游侠',
    'spiritborn': '灵巫',
    'paladin': '圣骑士'
  };
  return labels[charClass] || charClass;
}

function getAffixRarityLabel(rarity: string): string {
  const labels: Record<string, string> = {
    '全部': '全部',
    'normal': '普通',
    'transmute': '嬗变',
    'temper': '回火'
  };
  return labels[rarity] || rarity;
}

function getAffixSubcategoryLabel(subcategory: string): string {
  const labels: Record<string, string> = {
    '全部': '全部',
    'weapon': '武器',
    'offense': '攻击',
    'defense': '防御',
    'mobility': '机动',
    'resource': '资源',
    'general': '通用'
  };
  return labels[subcategory] || subcategory;
}

export default SearchFilter;