import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/PlayerContext';
import { Album } from '@/data/types';
import { getSongsByAlbum } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const { playSong, currentSong } = usePlayer();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const songs = getSongsByAlbum(album.id);
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  const isPlayingFromAlbum = currentSong?.albumId === album.id;

  return (
    <Link 
      to={`/album/${album.id}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <img
          src={album.artwork}
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          onClick={handlePlay}
          size="icon"
          className={cn(
            'absolute bottom-4 right-4 w-12 h-12',
            'opacity-0 group-hover:opacity-100 transition-all duration-300',
            'hover:scale-110',
            isPlayingFromAlbum && 'opacity-100'
          )}
        >
          <Play size={24} fill="currentColor" />
        </Button>
      </div>
      <div className="mt-3">
        <h3 className="font-bold truncate group-hover:text-primary transition-colors">
          {album.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">
          {album.artistName} • {album.releaseYear}
        </p>
      </div>
    </Link>
  );
}
