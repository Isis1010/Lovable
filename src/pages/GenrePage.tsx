import { useParams } from 'react-router-dom';
import { getGenreById, getSongsByGenre, getAlbumsByGenre, getArtistsByGenre } from '@/data/mockData';
import { SongRow } from '@/components/library/SongRow';
import { AlbumCard } from '@/components/library/AlbumCard';
import { ArtistCard } from '@/components/library/ArtistCard';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export default function GenrePage() {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();

  const genre = id ? getGenreById(id) : undefined;
  const songs = id ? getSongsByGenre(id) : [];
  const albums = id ? getAlbumsByGenre(id) : [];
  const artists = id ? getArtistsByGenre(id) : [];

  if (!genre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Genre not found</p>
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
      <div className="relative h-48 md:h-64">
        <img
          src={genre.image}
          alt={genre.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 neon-text-blue">
            {genre.name}
          </h1>
          <p className="text-muted-foreground mb-4">
            {genre.description}
          </p>
          <Button onClick={handlePlayAll}>
            <Play className="w-5 h-5 mr-2" fill="currentColor" />
            Play All
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* Artists */}
        {artists.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-neon-blue rounded-full" />
              Popular Artists
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        )}

        {/* Albums */}
        {albums.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-neon-blue rounded-full" />
              Top Albums
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}

        {/* Songs */}
        {songs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-neon-blue rounded-full" />
              All Songs
            </h2>
            <div className="border border-border rounded-xl overflow-hidden">
              {songs.map((song, index) => (
                <SongRow 
                  key={song.id} 
                  song={song} 
                  index={index}
                  queue={songs}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
