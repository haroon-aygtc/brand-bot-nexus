
import { ReactNode } from 'react';

interface DevicePreviewProps {
  device: 'desktop' | 'tablet' | 'mobile';
  children: ReactNode;
}

const DevicePreview = ({ device, children }: DevicePreviewProps) => {
  const getDeviceStyles = () => {
    switch (device) {
      case 'desktop':
        return {
          wrapper: 'max-w-full mx-auto',
          scale: 1,
          background: 'bg-transparent',
        };
      case 'tablet':
        return {
          wrapper: 'max-w-[768px] mx-auto border-8 border-gray-800 rounded-xl overflow-hidden',
          scale: 0.8,
          background: 'bg-gradient-to-b from-gray-100 to-gray-200',
        };
      case 'mobile':
        return {
          wrapper: 'max-w-[375px] mx-auto border-[12px] border-gray-800 rounded-[36px] overflow-hidden',
          scale: 0.65,
          background: 'bg-gradient-to-b from-gray-100 to-gray-200',
        };
      default:
        return {
          wrapper: 'max-w-full mx-auto',
          scale: 1,
          background: 'bg-transparent',
        };
    }
  };

  const { wrapper, scale, background } = getDeviceStyles();

  return (
    <div className={`${wrapper} ${background} transition-all duration-300`}>
      <div 
        className="device-content"
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DevicePreview;
