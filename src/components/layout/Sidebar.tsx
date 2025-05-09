
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  Database,
  Code,
  Settings,
  Users,
  Globe,
  Terminal,
  BookOpen,
  Bot,
  BarChart,
  Layout,
  FileText,
  Server
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'API Tester', path: '/api-tester', icon: Terminal },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    { name: 'Chat', path: '/chats', icon: MessageSquare },
    { name: 'AI Models', path: '/ai-models', icon: Bot },
    { name: 'Knowledge', path: '/knowledge', icon: Database },
    { name: 'Widget Config', path: '/widget-config', icon: Layout },
    { name: 'Scraper', path: '/scraper', icon: Globe },
    { name: 'Context Rules', path: '/context-rules', icon: FileText },
    { name: 'Templates', path: '/templates', icon: BookOpen },
    { name: 'Embed Code', path: '/embed-code', icon: Code },
    { name: 'Response Formatter', path: '/response-formatter', icon: Server },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "border-r border-gray-200 bg-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Sidebar header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-gray-800">Brand Bot</h1>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "p-1 rounded hover:bg-gray-100",
            collapsed ? "mx-auto" : ""
          )}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.707 9.293a1 1 0 00-1.414 1.414L9.586 12l-1.293 1.293a1 1 0 101.414 1.414L11 13.414l1.293 1.293a1 1 0 001.414-1.414L12.414 12l1.293-1.293a1 1 0 00-1.414-1.414L11 10.586 9.707 9.293z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation items */}
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-2 my-1 rounded-md text-sm font-medium transition-colors",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
            {/* User initial */}
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
