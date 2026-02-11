import { useParams, Link } from 'react-router-dom';
import { Play, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArtistById, getAlbumsByArtist, getSongsByArtist } from '@/data/mockData';
import { AlbumCard } from '@/components/library/AlbumCard';
import { SongRow } from '@/components/library/SongRow';
import { usePlayer } from '@/context/PlayerContext';

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();

  const artist = id ? getArtistById(id) : undefined;
  const albums = id ? getAlbumsByArtist(id) : [];
  const songs = id ? getSongsByArtist(id) : [];

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Artist not found</p>
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
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 neon-text-blue">
            {artist.name}
          </h1>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            {artist.bio}
          </p>
          <div className="flex items-center gap-4">
            <Button onClick={handlePlayAll}>
              <Play className="w-5 h-5 mr-2" fill="currentColor" />
              Play All
            </Button>
            <Button variant="outline">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* Genres */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {artist.genres.map((genre) => (
            <Link
              key={genre}
              to={`/genre/${genre}`}
              className="px-3 py-1 border border-border text-sm rounded-full hover:border-neon-blue hover:text-neon-blue transition-colors"
            >
              {genre}
            </Link>
          ))}
        </div>

        {/* Popular Songs */}
        {songs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-neon-blue rounded-full" />
              Popular Songs
            </h2>
            <div className="border border-border rounded-xl overflow-hidden">
              {songs.slice(0, 5).map((song, index) => (
                <SongRow 
                  key={song.id} 
                  song={song} 
                  index={index}
                  queue={songs}
                  showAlbum
                />
              ))}
            </div>
          </section>
        )}

        {/* Albums */}
        {albums.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-neon-blue rounded-full" />
              Discography
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
