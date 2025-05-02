
import { ModelCard } from '@/components/ai-models/ModelCard';
import { PerformanceMetrics } from '@/components/ai-models/PerformanceMetrics';

export const ModelsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ModelCard
        name="GPT-4 Turbo"
        icon="sparkles"
        color="purple"
        isPrimary
        defaultEnabled
      />
      <ModelCard
        name="Claude 3"
        icon="cpu"
        color="blue"
        defaultEnabled={false}
      />
      <PerformanceMetrics />
    </div>
  );
};
