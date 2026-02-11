import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  ChevronDown,
  Star,
  ListMusic,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/context/PlayerContext';
import { useAuth } from '@/context/AuthContext';
import { useLibrary } from '@/context/LibraryContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function FullScreenPlayer() {
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
    showSubscriptionBanner,
    dismissSubscriptionBanner,
  } = usePlayer();
  const { isSubscribed } = useAuth();
  const { isLiked, toggleLike } = useLibrary();
  const navigate = useNavigate();

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const liked = isLiked(currentSong.id);

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * (duration || currentSong.duration);
    seek(newTime);
  };

  const handleSubscribe = () => {
    setIsFullScreen(false);
    dismissSubscriptionBanner();
    navigate('/subscribe');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden"
    >
      {/* Blurred Album Artwork Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          key={`bg-${currentSong.id}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={currentSong.artwork}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-70"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
      </div>
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFullScreen(false)}
          className="text-foreground hover:text-neon-blue"
        >
          <ChevronDown size={28} />
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Now Playing</p>
          <p className="text-sm font-bold">{currentSong.albumTitle}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-neon-blue"
        >
          <Share2 size={20} />
        </Button>
      </div>

      {/* Artwork */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-4">
        <motion.img
          key={currentSong.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={currentSong.artwork}
          alt={currentSong.title}
          className="w-full max-w-sm aspect-square object-cover rounded-2xl shadow-2xl"
          style={{
            boxShadow: '0 0 40px hsl(var(--neon-blue) / 0.4), 0 0 80px hsl(var(--neon-blue) / 0.2), 0 25px 50px -12px rgba(0,0,0,0.25)'
          }}
        />
      </div>

      {/* Song Info */}
      <div className="relative z-10 px-8 mb-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold truncate text-foreground">{currentSong.title}</h2>
            <p className="text-lg text-muted-foreground truncate">{currentSong.artistName}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleLike(currentSong.id)}
            className={cn(
              'ml-4',
              liked ? 'text-neon-blue' : 'text-muted-foreground hover:text-neon-blue'
            )}
          >
            <Star size={24} fill={liked ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-8 mb-4">
        <Slider
          value={[progress]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          disabled={!isSubscribed}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || currentSong.duration)}</span>
        </div>
      </div>

      {/* Subscription Gate - Only shown when user tries to play */}
      {showSubscriptionBanner && !isSubscribed && (
        <div className="relative z-10 px-8 mb-4">
          <div className="bg-muted/50 p-4 rounded-2xl border border-neon-blue/30">
            <p className="text-center text-sm mb-3">Subscribe to play music</p>
            <Button
              onClick={handleSubscribe}
              className="w-full"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="relative z-10 px-8 mb-4">
        <div className="flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={previous}
            className="text-foreground hover:text-neon-blue w-12 h-12"
          >
            <SkipBack size={28} />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="w-16 h-16"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="text-foreground hover:text-neon-blue w-12 h-12"
          >
            <SkipForward size={28} />
          </Button>
        </div>
      </div>

      {/* Volume */}
      <div className="relative z-10 px-8 pb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            onValueChange={([v]) => setVolume(v / 100)}
            max={100}
            step={1}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <ListMusic size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
