
import { useState } from 'react';
import { AiModelsHeader } from '@/components/ai-models/AiModelsHeader';
import { AddModelFormContainer } from '@/components/ai-models/AddModelFormContainer';
import { ModelsTabs } from '@/components/ai-models/ModelsTabs';

const AiModelsPage = () => {
  const [activeTab, setActiveTab] = useState('models');
  const [showAddModel, setShowAddModel] = useState(false);

  const handleToggleAddModel = () => {
    setShowAddModel(!showAddModel);
  };

  return (
    <div className="space-y-6">
      <AiModelsHeader onToggleAddModel={handleToggleAddModel} />

      {showAddModel && <AddModelFormContainer />}

      <ModelsTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default AiModelsPage;
