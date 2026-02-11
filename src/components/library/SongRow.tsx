import { Play, Pause, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/PlayerContext';
import { useLibrary } from '@/context/LibraryContext';
import { Song } from '@/data/types';
import { cn } from '@/lib/utils';

interface SongRowProps {
  song: Song;
  index?: number;
  queue?: Song[];
  showArtwork?: boolean;
  showAlbum?: boolean;
  compact?: boolean;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function SongRow({ 
  song, 
  index, 
  queue, 
  showArtwork = true, 
  showAlbum = true,
  compact = false 
}: SongRowProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { isLiked, toggleLike } = useLibrary();

  const isCurrentSong = currentSong?.id === song.id;
  const liked = isLiked(song.id);

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, queue);
    }
  };

  return (
    <div 
      className={cn(
        'group flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors rounded-xl border-b border-border/30',
        isCurrentSong && 'bg-muted/30'
      )}
    >
      {/* Track number / Play button */}
      <div className="w-8 flex items-center justify-center">
        <span className={cn(
          'text-sm text-muted-foreground group-hover:hidden',
          isCurrentSong && 'text-primary'
        )}>
          {index !== undefined ? index + 1 : ''}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlay}
          className={cn(
            'hidden group-hover:flex w-8 h-8',
            isCurrentSong ? 'text-primary' : 'text-foreground hover:text-primary'
          )}
        >
          {isCurrentSong && isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>

      {/* Artwork */}
      {showArtwork && (
        <img 
          src={song.artwork} 
          alt={song.title}
          className="w-10 h-10 object-cover rounded-lg shadow-sm"
        />
      )}

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-bold truncate',
          isCurrentSong && 'text-primary'
        )}>
          {song.title}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          {song.artistName}
        </p>
      </div>

      {/* Album (Desktop) */}
      {showAlbum && !compact && (
        <p className="hidden md:block text-sm text-muted-foreground truncate w-40">
          {song.albumTitle}
        </p>
      )}

      {/* Favorite button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(song.id);
        }}
        className={cn(
          'opacity-0 group-hover:opacity-100 transition-opacity',
          liked && 'opacity-100 text-neon-blue'
        )}
      >
        <Star size={16} fill={liked ? 'currentColor' : 'none'} />
      </Button>

      {/* Duration */}
      <span className="text-sm text-muted-foreground w-12 text-right">
        {formatDuration(song.duration)}
      </span>
    </div>
  );
}
