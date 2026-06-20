import { useEquipmentStore } from '../store/equipmentStore'
import { characterClasses } from '../data/equipmentData'
import type { Character } from '../types/equipment'

function Header() {
  const { character, setCharacterClass } = useEquipmentStore()
  
  const goHome = () => {
    window.location.href = '../../index.html'
  }
  
  const tabs = ['总览', '技能', '巅峰', '雇佣兵', '战争计划']
  const activeTab = '总览'
  
  return (
    <header className="header-bar bg-d4-panel-top border-b border-d4-border px-3 py-1.5 relative">
      {/* 职业选择器 */}
      <div className="class-selector flex gap-1.5 mb-1.5">
        {characterClasses.map((charClass) => (
          <label
            key={charClass.id}
            className={`class-label px-2.5 py-1.5 bg-d4-dark rounded text-[11px] cursor-pointer transition-all flex items-center gap-1.5 ${
              character.class === charClass.id
                ? 'text-d4-gold'
                : 'text-d4-text-secondary'
            }`}
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: character.class === charClass.id ? '#c9922a' : '#2a2018',
              boxShadow: character.class === charClass.id ? '0 0 12px rgba(201, 146, 42, 0.5)' : 'none'
            }}
          >
            <input
              type="radio"
              name="class"
              className="class-radio hidden"
              checked={character.class === charClass.id}
              onChange={() => setCharacterClass(charClass.id as Character['class'])}
            />
            <span>{charClass.icon}</span>
            <span>{charClass.name}</span>
          </label>
        ))}
      </div>
      
      {/* 标签页 - 靠右显示 */}
      <div className="tabs flex gap-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab px-3.5 py-1.5 text-[12px] font-medium transition-all bg-transparent border-b-2 ${
              tab === activeTab
                ? 'text-d4-gold border-b-d4-gold'
                : 'text-d4-text-secondary hover:text-d4-gold border-b-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* 右侧按钮 */}
      <div className="top-right absolute top-10 right-3 flex items-center gap-3">
        <button className="top-btn text-[10px] text-d4-text-secondary hover:text-d4-gold transition-colors">
          C 重置
        </button>
        <button className="top-btn text-[10px] text-d4-text-secondary hover:text-d4-gold transition-colors">
          词缀清单
        </button>
        <button
          onClick={goHome}
          className="d4-button text-[10px] px-2 py-1"
        >
          返回首页
        </button>
      </div>
    </header>
  )
}

export default Header
