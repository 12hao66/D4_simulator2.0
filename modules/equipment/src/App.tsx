import { useEquipmentStore } from './store/equipmentStore'
import Header from './components/Header'
import CharacterPanel from './components/CharacterPanel'
import EquipmentSlots from './components/EquipmentSlots'
import EquipmentSelectorNew from './components/EquipmentSelectorNew'
import ActionBar from './components/ActionBar'
import StatsPanel from './components/StatsPanel'
import BuildManager from './components/BuildManager'

function App() {
  const { selectedSlot } = useEquipmentStore()
  
  return (
    <div className="min-h-screen bg-d4-base flex flex-col w-[950px] h-[820px] mx-auto">
      <Header />
      
      {/* 主内容区 */}
      <main className="flex-1 flex overflow-hidden">
        {/* 方案管理（放在最左侧） */}
        <div className="w-[140px] bg-d4-panel-left border-r border-d4-border flex flex-col items-center py-2.5 gap-2">
          <BuildManager />
        </div>
        
        {/* 左侧装备栏 */}
        <div className="w-[68px] bg-d4-panel-left border-r border-d4-border flex flex-col items-center py-2.5 gap-1.5">
          <EquipmentSlots side="left" />
        </div>
        
        {/* 中间角色展示区 */}
        <div className="flex-1 bg-d4-panel-center flex flex-col items-center justify-center relative">
          <CharacterPanel />
        </div>
        
        {/* 右侧装备栏 */}
        <div className="w-[68px] bg-d4-panel-right border-l border-d4-border flex flex-col items-center py-2.5 gap-1.5">
          <EquipmentSlots side="right" />
        </div>
        
        {/* 属性面板 */}
        <div className="w-[240px]">
          <StatsPanel />
        </div>
      </main>
      
      {/* 底部快捷栏 */}
      <ActionBar />
      
      {/* 装备选择弹窗 */}
      {selectedSlot && <EquipmentSelectorNew slot={selectedSlot} />}
    </div>
  )
}

export default App
