import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Image, 
  Settings, 
  Users,
  Clock,
  Star,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { 
    label: 'Overview', 
    icon: LayoutDashboard, 
    path: '/dashboard',
    exact: true 
  },
  { 
    label: 'My Reports', 
    icon: FileText, 
    path: '/dashboard/reports' 
  },
  { 
    label: 'Templates', 
    icon: FolderOpen, 
    path: '/dashboard/templates' 
  },
  { 
    label: 'Recent', 
    icon: Clock, 
    path: '/dashboard/recent' 
  },
  { 
    label: 'Favorites', 
    icon: Star, 
    path: '/dashboard/favorites' 
  },
  { 
    label: 'Assets', 
    icon: Image, 
    path: '/dashboard/assets' 
  },
];

const bottomMenuItems = [
  { 
    label: 'Team', 
    icon: Users, 
    path: '/dashboard/team' 
  },
  { 
    label: 'Settings', 
    icon: Settings, 
    path: '/dashboard/settings' 
  },
];

const DashboardSidebar = () => {
  const location = useLocation();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center gap-2 px-4 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sidebar-foreground">ReportFlow</span>
      </div>

      {/* New Report Button */}
      <div className="p-4">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/reports/new">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Link>
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
              isActive(item.path, item.exact)
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        {bottomMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
              isActive(item.path)
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
