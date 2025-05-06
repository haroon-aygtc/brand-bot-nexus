
import { Navigate, Route, Routes } from 'react-router-dom';
import AiModelConfigPage from '@/pages/AiModelConfigPage';

export const AiConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AiModelConfigPage />} />
      <Route path="*" element={<Navigate to="/ai-config" replace />} />
    </Routes>
  );
};

export default AiConfigRoutes;
