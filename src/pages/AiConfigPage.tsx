
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AiModelConfigPage from './AiModelConfigPage';

// This is a wrapper page that will redirect to the AI Model Config Page
// We create this to maintain a consistent URL structure in our application
const AiConfigPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/ai-model-config', { replace: true });
  }, [navigate]);

  return <AiModelConfigPage />;
};

export default AiConfigPage;
