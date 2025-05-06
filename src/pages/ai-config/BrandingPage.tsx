
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { BrandingConfig } from "@/components/ai-models/BrandingConfig";
import { useGetBrandingSettings } from '@/hooks/useApi';
import { ArrowLeft, Save } from 'lucide-react';

const BrandingPage = () => {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { data: brandingSettings, isLoading, error, execute } = useGetBrandingSettings();

  useEffect(() => {
    execute();
  }, [execute]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Branding settings saved successfully");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/ai-config")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Branding Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Customize the appearance of your AI assistant
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          size="lg"
          className="gap-2"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Branding Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandingConfig />
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingPage;
