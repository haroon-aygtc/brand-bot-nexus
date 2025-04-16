
import { MessageSquareMore, X } from 'lucide-react';

interface WidgetPreviewProps {
  config: any;
}

const WidgetPreview = ({ config }: WidgetPreviewProps) => {
  const {
    appearance: {
      primaryColor,
      headerBgColor,
      textColor,
      borderRadius,
      widgetWidth,
      widgetHeight,
      darkMode
    },
    general: {
      botName,
      welcomeMessage,
      placeholderText
    }
  } = config;

  return (
    <div 
      className={`flex flex-col shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      style={{ 
        width: `${widgetWidth}px`, 
        height: `${widgetHeight}px`,
        borderRadius: `${borderRadius}px`,
        maxWidth: '100%',
        maxHeight: '650px'
      }}
    >
      {/* Widget Header */}
      <div 
        className="p-4 flex items-center justify-between"
        style={{ 
          backgroundColor: headerBgColor,
          borderTopLeftRadius: `${borderRadius}px`,
          borderTopRightRadius: `${borderRadius}px`
        }}
      >
        <div className="flex items-center">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: primaryColor }}
          >
            <MessageSquareMore className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-white">{botName}</h3>
        </div>
        <button className="text-white hover:bg-white/10 rounded-full p-1">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Chat Area */}
      <div 
        className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={{ color: textColor }}
      >
        {/* Bot Message */}
        <div className="mb-4 flex">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: primaryColor }}
          >
            <MessageSquareMore className="w-4 h-4 text-white" />
          </div>
          <div 
            className={`py-3 px-4 rounded-lg max-w-[80%] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ borderRadius: `${Math.max(8, borderRadius - 2)}px` }}
          >
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {welcomeMessage}
            </p>
          </div>
        </div>
        
        {/* Sample user message */}
        <div className="mb-4 flex justify-end">
          <div 
            className="py-3 px-4 rounded-lg max-w-[80%]"
            style={{ 
              backgroundColor: primaryColor,
              borderRadius: `${Math.max(8, borderRadius - 2)}px` 
            }}
          >
            <p className="text-sm text-white">
              Hello! I have a question about your services.
            </p>
          </div>
        </div>
        
        {/* Sample bot response */}
        <div className="mb-4 flex">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: primaryColor }}
          >
            <MessageSquareMore className="w-4 h-4 text-white" />
          </div>
          <div 
            className={`py-3 px-4 rounded-lg max-w-[80%] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ borderRadius: `${Math.max(8, borderRadius - 2)}px` }}
          >
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Of course! I'd be happy to help you with information about our services. What specific aspect are you interested in learning more about?
            </p>
          </div>
        </div>
      </div>
      
      {/* Input Area */}
      <div 
        className={`p-3 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        style={{ 
          borderBottomLeftRadius: `${borderRadius}px`,
          borderBottomRightRadius: `${borderRadius}px`
        }}
      >
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder={placeholderText}
            className={`flex-1 py-2 px-3 text-sm rounded-md border outline-none ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' 
                : 'bg-gray-50 text-gray-800 border-gray-300 focus:border-blue-300'
            }`}
            style={{ borderRadius: `${Math.max(6, borderRadius - 4)}px` }}
          />
          <button 
            className="ml-2 p-2 rounded-md"
            style={{ 
              backgroundColor: primaryColor,
              borderRadius: `${Math.max(6, borderRadius - 4)}px` 
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Minimized Bubble Preview */}
      <div 
        className="absolute -bottom-16 right-0"
        style={{ 
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          backgroundColor: primaryColor,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <MessageSquareMore className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default WidgetPreview;
