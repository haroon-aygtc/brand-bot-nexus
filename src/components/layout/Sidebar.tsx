
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Database,
  Users,
  Webhook,
  PanelTop,
  BarChart2,
  BookOpen,
  Menu,
} from 'lucide-react';

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Chat History', icon: MessageSquare, path: '/chats' },
  { title: 'Knowledge Base', icon: BookOpen, path: '/knowledge' },
  { title: 'Scraper', icon: Database, path: '/scraper' },
  { title: 'Customers', icon: Users, path: '/customers' },
  { title: 'Analytics', icon: BarChart2, path: '/analytics' },
  { title: 'Prompt Management', icon: Webhook, path: '/prompts' },
  { title: 'Admin Panel', icon: PanelTop, path: '/admin' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-sidebar border-r border-border transition-all duration-300',
        collapsed ? 'w-[70px]' : 'w-[250px]'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-brand-purple flex items-center justify-center text-white font-bold">
              AB
            </div>
            <h1 className="font-bold text-lg">BrandBot</h1>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-7 h-7 rounded-md bg-brand-purple flex items-center justify-center text-white font-bold">
              AB
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn('h-8 w-8', collapsed && 'mx-auto')}
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md mx-2 transition-colors',
                  window.location.pathname === item.path && 'bg-accent text-accent-foreground font-medium'
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to="/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors'
          )}
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
