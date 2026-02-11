import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Compass,
  Search,
  Folder,
  User,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
}

function NavItem({ to, icon }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <RouterNavLink
      to={to}
      className={cn(
        'flex items-center justify-center flex-1 py-3 transition-all duration-200',
        'border-t-2 border-transparent',
        isActive && 'border-t-neon-blue text-neon-blue'
      )}
    >
      {icon}
    </RouterNavLink>
  );
}

export function BottomNav() {
  const { isAuthenticated } = useAuth();

  const navItems = [
    { to: '/', icon: <Compass size={24} /> },
    { to: '/search', icon: <Search size={24} /> },
    { to: '/library', icon: <Folder size={24} /> },
    { to: isAuthenticated ? '/settings' : '/sign-in', icon: <User size={24} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t border-border flex md:hidden shadow-lg">
      {navItems.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}
    </nav>
  );
}
