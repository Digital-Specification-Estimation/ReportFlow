import { FileText, Menu, Download, History, Save, Check, Loader2, X, ChevronDown, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUIStore } from '@/store/uiStore';
import { useEditorStore } from '@/store/editorStore';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';

interface TopBarProps {
  reportTitle?: string;
}

const TopBar = ({ reportTitle }: TopBarProps) => {
  const navigate = useNavigate();
  const { toggleSidebar, setExportModalOpen, setVersionHistoryOpen } = useUIStore();
  const { saveStatus, lastSaved, isDirty, isReadOnly, setIsReadOnly } = useEditorStore();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <Loader2 className="h-4 w-4 animate-spin text-accent" />;
      case 'saved':
        return <Check className="h-4 w-4 text-success" />;
      case 'error':
        return <X className="h-4 w-4 text-destructive" />;
      default:
        return isDirty ? <div className="h-2 w-2 rounded-full bg-accent" /> : null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return lastSaved ? `Saved ${formatTime(lastSaved)}` : 'Saved';
      case 'error':
        return 'Save failed';
      default:
        return isDirty ? 'Unsaved changes' : '';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">ReportFlow</span>
          </Link>

          {reportTitle && (
            <>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <h1 className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-[300px] hidden sm:block">
                {reportTitle}
              </h1>
            </>
          )}
        </div>

        {/* Center Section - Save Status */}
        {reportTitle && (
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            {getSaveStatusIcon()}
            <span>{getSaveStatusText()}</span>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {reportTitle && (
            <>
              {/* View/Edit Toggle */}
              <div className="hidden sm:flex items-center bg-secondary rounded-lg p-0.5">
                <Button
                  variant={!isReadOnly ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setIsReadOnly(false)}
                  className={cn('h-7 px-3', !isReadOnly && 'shadow-sm')}
                >
                  <Edit className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button
                  variant={isReadOnly ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setIsReadOnly(true)}
                  className={cn('h-7 px-3', isReadOnly && 'shadow-sm')}
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  View
                </Button>
              </div>

              {/* Version History */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVersionHistoryOpen(true)}
                className="hidden sm:flex"
              >
                <History className="h-4 w-4 mr-1.5" />
                History
              </Button>

              {/* Export */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1.5" />
                    Export
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setExportModalOpen(true)}>
                    Export Options...
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Export as PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Export as Word</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/templates">Templates</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
