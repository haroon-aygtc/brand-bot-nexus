
import { BrandingConfig } from "@/components/ai-models/BrandingConfig";

const BrandingPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Branding Settings</h1>
        <p className="text-muted-foreground">
          Customize the appearance and branding of your AI assistant
        </p>
      </div>
      <BrandingConfig />
    </div>
  );
};

export default BrandingPage;
