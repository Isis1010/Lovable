import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Compass,
  Search,
  Folder,
  Music,
  Heart,
  Settings,
  Info,
  User,
  CreditCard,
  Gift,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, icon, label, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <RouterNavLink
          to={to}
          onClick={onClick}
          className={cn(
            'flex items-center justify-center w-12 h-12 transition-all duration-200 rounded-xl',
            'hover:bg-muted border border-transparent',
            isActive && 'bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_12px_hsl(var(--neon-blue)/0.3)]'
          )}
        >
          {icon}
        </RouterNavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="font-bold rounded-lg">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

interface SidebarNavProps {
  onNavClick?: () => void;
}

export function SidebarNav({ onNavClick }: SidebarNavProps) {
  const { isAuthenticated } = useAuth();

  const mainNavItems = [
    { to: '/', icon: <Compass size={20} />, label: 'Home' },
    { to: '/search', icon: <Search size={20} />, label: 'Search' },
    { to: '/library', icon: <Folder size={20} />, label: 'Library' },
  ];

  const authNavItems = isAuthenticated
    ? [
        { to: '/library', icon: <Heart size={20} />, label: 'Liked Songs' },
        { to: '/subscribe', icon: <CreditCard size={20} />, label: 'Subscribe' },
      ]
    : [
        { to: '/sign-in', icon: <User size={20} />, label: 'Sign In' },
      ];

  const bottomNavItems = [
    { to: '/donate', icon: <Gift size={20} />, label: 'Donate' },
    { to: '/about', icon: <Info size={20} />, label: 'About' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className="fixed right-0 top-0 z-40 h-screen w-16 bg-sidebar border-l border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
        <Music className="w-8 h-8 text-primary" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {mainNavItems.map((item) => (
          <NavItem key={item.to} {...item} onClick={onNavClick} />
        ))}

        <div className="h-px bg-sidebar-border my-4" />

        {authNavItems.map((item) => (
          <NavItem key={item.to} {...item} onClick={onNavClick} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <nav className="py-4 flex flex-col gap-1 px-2 border-t border-sidebar-border">
        {bottomNavItems.map((item) => (
          <NavItem key={item.to} {...item} onClick={onNavClick} />
        ))}
      </nav>
    </aside>
  );
}
