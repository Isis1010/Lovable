import { ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';
import { BottomNav } from './BottomNav';
import { MiniPlayer } from '@/components/player/MiniPlayer';
import { FullScreenPlayer } from '@/components/player/FullScreenPlayer';
import { usePlayer } from '@/context/PlayerContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isMiniPlayerVisible, isFullScreen } = usePlayer();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarNav />
      </div>

      {/* Main Content */}
      <main 
        className={`
          md:mr-16 
          min-h-screen 
          ${isMiniPlayerVisible && !isMobile ? 'pb-24' : 'pb-20 md:pb-0'}
        `}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Mini Player */}
      {isMiniPlayerVisible && !isFullScreen && (
        <MiniPlayer />
      )}

      {/* Full Screen Player */}
      {isFullScreen && (
        <FullScreenPlayer />
      )}
    </div>
  );
}
