import { useEquipmentStore } from '../store/equipmentStore'

// 职业背景图片路径
const classBackgrounds: Record<string, string> = {
  barbarian: './images/class/bg-barbarian.png',
  necromancer: './images/class/bg-necro.png',
  sorc: './images/class/bg-sorc.png',
  druid: './images/class/bg-druid.png',
  rogue: './images/class/bg-rogue.png',
  spiritborn: './images/class/bg-spiritborn.png',
  paladin: './images/class/bg-paladin.png',
  warlock: './images/class/bg-warlock.png'
}

const classNames: Record<string, string> = {
  barbarian: 'BARBARIAN',
  necromancer: 'NECROMANCER',
  sorc: 'SORCERESS',
  druid: 'DRUID',
  rogue: 'ROGUE',
  spiritborn: 'SPIRITBORN',
  paladin: 'PALADIN',
  warlock: 'WARLOCKER'
}

function CharacterPanel() {
  const { character } = useEquipmentStore()
  
  const getBackgroundImage = (charClass: string): string => {
    return classBackgrounds[charClass] || classBackgrounds.barbarian
  }
  
  return (
    <div className="flex flex-col items-center">
      {/* 角色展示区 */}
      <div 
        className="character-placeholder"
        style={{
          backgroundImage: `url(${getBackgroundImage(character.class)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 背景渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        {/* 角色信息 */}
        <div className="character-info">
          <div className="character-name">{classNames[character.class] || 'UNKNOWN'}</div>
          <div className="character-level">等级 {character.level} </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterPanel
