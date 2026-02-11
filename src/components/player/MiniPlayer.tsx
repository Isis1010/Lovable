import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/context/PlayerContext';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    setIsFullScreen,
  } = usePlayer();
  const { isSubscribed } = useAuth();
  const isMobile = useIsMobile();

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'fixed z-50 bg-card border-t border-border shadow-lg',
        isMobile 
          ? 'bottom-16 left-0 right-0' 
          : 'bottom-0 left-0 right-16'
      )}
    >
      {/* Progress bar */}
      <div className="h-1 bg-muted relative">
        <div 
          className="h-full bg-neon-blue transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="h-20 px-4 flex items-center gap-4">
        {/* Song Info - Clickable to expand */}
        <button
          onClick={() => setIsFullScreen(true)}
          className="flex items-center gap-3 flex-1 min-w-0 hover:bg-muted/50 p-2 -m-2 transition-colors rounded-xl"
        >
          <img
            src={currentSong.artwork}
            alt={currentSong.title}
            className="w-12 h-12 object-cover rounded-lg shadow-md"
          />
          <div className="min-w-0 text-left">
            <p className="font-bold truncate text-foreground">{currentSong.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentSong.artistName}</p>
          </div>
          <ChevronUp size={20} className="text-muted-foreground ml-2 flex-shrink-0" />
        </button>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={previous}
              disabled={!isSubscribed}
              className="text-foreground hover:text-neon-blue"
            >
              <SkipBack size={20} />
            </Button>
          )}

          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            className="w-10 h-10"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>

          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              disabled={!isSubscribed}
              className="text-foreground hover:text-neon-blue"
            >
              <SkipForward size={20} />
            </Button>
          )}
        </div>

        {/* Time & Volume (Desktop only) */}
        {!isMobile && (
          <>
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration || currentSong.duration)}</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 w-32">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-foreground hover:text-neon-blue"
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={([v]) => setVolume(v / 100)}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
