
import { Navigate, Route, Routes } from 'react-router-dom';
import AiModelConfigPage from '@/pages/AiModelConfigPage';
import DataSourcesPage from '@/pages/ai-config/DataSourcesPage';
import PromptTemplatesPage from '@/pages/ai-config/PromptTemplatesPage';
import ResponseFormatterPage from '@/pages/ai-config/ResponseFormatterPage';
import BrandingPage from '@/pages/ai-config/BrandingPage';
import FollowUpQuestionsPage from '@/pages/ai-config/FollowUpQuestionsPage';

export const AiConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AiModelConfigPage />} />
      <Route path="/data-sources" element={<DataSourcesPage />} />
      <Route path="/prompt-templates" element={<PromptTemplatesPage />} />
      <Route path="/response-formatter" element={<ResponseFormatterPage />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/follow-up-questions" element={<FollowUpQuestionsPage />} />
      <Route path="*" element={<Navigate to="/ai-config" replace />} />
    </Routes>
  );
};

export default AiConfigRoutes;
