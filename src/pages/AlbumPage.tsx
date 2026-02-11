import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAlbumById, getSongsByAlbum, getArtistById } from '@/data/mockData';
import { SongRow } from '@/components/library/SongRow';
import { usePlayer } from '@/context/PlayerContext';

function formatTotalDuration(songs: { duration: number }[]): string {
  const totalSeconds = songs.reduce((acc, song) => acc + song.duration, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} hr ${mins} min`;
  }
  return `${mins} min`;
}

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();

  const album = id ? getAlbumById(id) : undefined;
  const songs = id ? getSongsByAlbum(id) : [];
  const artist = album ? getArtistById(album.artistId) : undefined;

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Album not found</p>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Album Header */}
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
          {/* Artwork */}
          <div className="w-full md:w-64 aspect-square flex-shrink-0">
            <img
              src={album.artwork}
              alt={album.title}
              className="w-full h-full object-cover rounded-xl border-2 border-neon-blue neon-glow-blue"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-end">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              Album
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text-blue">
              {album.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-6 flex-wrap">
              <Link 
                to={`/artist/${album.artistId}`}
                className="hover:text-neon-blue transition-colors"
              >
                {album.artistName}
              </Link>
              <span>•</span>
              <span>{album.releaseYear}</span>
              <span>•</span>
              <span>{songs.length} songs</span>
              <span>•</span>
              <span>{formatTotalDuration(songs)}</span>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handlePlayAll}>
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                Play
              </Button>
              <Button variant="outline">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2rem_1fr_1fr_4rem] gap-4 px-4 py-3 border-b border-border text-sm text-muted-foreground">
            <span>#</span>
            <span>Title</span>
            <span>Artist</span>
            <span className="flex items-center justify-end">
              <Clock className="w-4 h-4" />
            </span>
          </div>

          {/* Songs */}
          {songs.map((song, index) => (
            <SongRow 
              key={song.id} 
              song={song} 
              index={index}
              queue={songs}
              showArtwork={false}
              showAlbum={false}
            />
          ))}
        </div>

        {/* Artist Link */}
        {artist && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">More from {artist.name}</h2>
            <Link
              to={`/artist/${artist.id}`}
              className="inline-flex items-center gap-4 p-4 border border-border rounded-xl hover:border-neon-blue transition-colors"
            >
              <img 
                src={artist.image} 
                alt={artist.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{artist.name}</p>
                <p className="text-sm text-muted-foreground">View Artist</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
