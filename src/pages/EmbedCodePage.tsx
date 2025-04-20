
import { EmbedCodeGenerator } from '@/components/widget/EmbedCodeGenerator';

const EmbedCodePage = () => {
  // Mock config for now - this would come from your actual widget configuration
  const mockConfig = {
    general: {
      name: "My Chat Widget",
      widgetPosition: "bottom-right"
    },
    appearance: {
      widgetWidth: 350,
      widgetHeight: 550,
      primaryColor: "#8B5CF6",
      darkMode: false,
      glassMorphism: true,
      customCSS: ""
    },
    advanced: {
      webhookUrl: "",
      abTesting: false
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Embed Code</h1>
        <p className="text-sm text-muted-foreground">
          Get the code to embed your chat widget on your website
        </p>
      </div>

      <EmbedCodeGenerator config={mockConfig} />
    </div>
  );
};

export default EmbedCodePage;
