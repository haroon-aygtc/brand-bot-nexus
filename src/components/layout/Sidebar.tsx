
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Database,
  Code,
  BarChart2,
  Users,
  FileText,
  Globe,
  LogOut,
  ChevronLeft,
  Menu,
  Sliders,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  requiredRole?: 'admin' | 'user' | 'guest';
};

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Widget Config', icon: Sliders, path: '/widget-config' },
  { title: 'Context Rules', icon: MessageSquare, path: '/context-rules' },
  { title: 'Templates', icon: FileText, path: '/templates' },
  { title: 'Embed Code', icon: Code, path: '/embed-code' },
  { title: 'Analytics', icon: BarChart2, path: '/analytics' },
  { title: 'Response Formatter', icon: FileText, path: '/response-formatter' },
  { title: 'AI Models', icon: Database, path: '/ai-models' },
  { title: 'Web Scraping', icon: Globe, path: '/scraper' },
  { title: 'User Management', icon: Users, path: '/users', requiredRole: 'admin' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Filter menu items based on user role
  const filteredNavItems = mainNavItems.filter(item => {
    if (!item.requiredRole) return true;
    return user?.role === item.requiredRole;
  });

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-[#1f2937] border-r border-[#2e3846] transition-all duration-300',
        collapsed ? 'w-[70px]' : 'w-[250px]'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#2e3846]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-brand-blue flex items-center justify-center text-white font-bold">
              <MessageSquare size={16} />
            </div>
            <h1 className="font-bold text-lg text-white">ChatAdmin</h1>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-7 h-7 rounded-md bg-brand-blue flex items-center justify-center text-white font-bold">
              <MessageSquare size={16} />
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn('h-8 w-8 rounded-md text-gray-400 hover:bg-[#2e3846] hover:text-white transition-colors', 
            collapsed && 'mx-auto')}
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-shrink-0 px-3 py-4 border-b border-[#2e3846]">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
                alt="Admin User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-sm font-medium text-white truncate">{user?.name || 'Admin User'}</h3>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
                alt="Admin User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1 px-3">
          {filteredNavItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                  location.pathname === item.path
                    ? 'bg-[#2e3846] text-white'
                    : 'text-gray-400 hover:bg-[#2e3846] hover:text-white'
                )}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.title}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto bg-brand-blue text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 mt-auto border-t border-[#2e3846]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md text-gray-400 hover:bg-[#2e3846] hover:text-white transition-colors"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
