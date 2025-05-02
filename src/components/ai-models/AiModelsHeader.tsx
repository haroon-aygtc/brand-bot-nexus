
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';

interface AiModelsHeaderProps {
  onToggleAddModel: () => void;
}

export const AiModelsHeader = ({ onToggleAddModel }: AiModelsHeaderProps) => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">AI Models</h1>
          <Badge variant="outline" className="ml-2">Beta</Badge>
        </div>
        <p className="text-muted-foreground">Configure and manage AI models for your chatbot.</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onToggleAddModel}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Model
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <span className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </span>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
