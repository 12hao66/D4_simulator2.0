import { useEffect } from 'react';
import { useSkillStore } from './store/skillStore';
import { SkillCanvas } from './components/SkillCanvas';
import { SkillPanel } from './components/SkillPanel';
import { ClassSelector } from './components/ClassSelector';
import { EditorPanel } from './components/EditorPanel';

function App() {
  const { loadSkillTree, editMode } = useSkillStore();
  
  useEffect(() => {
    loadSkillTree();
  }, [loadSkillTree]);

  return (
    <div className="h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)' }}>
      <ClassSelector />
      <div className="flex-1 flex overflow-hidden">
        <SkillCanvas />
        {editMode ? <EditorPanel /> : <SkillPanel />}
      </div>
    </div>
  );
}

export default App;
