import { genres, albums, artists } from '@/data/mockData';
import { GenreCard } from '@/components/library/GenreCard';
import { AlbumCard } from '@/components/library/AlbumCard';
import { ArtistCard } from '@/components/library/ArtistCard';

export default function HomePage() {
  // Get featured content
  const featuredGenres = genres.slice(0, 4);
  const newReleases = albums.filter(a => a.releaseYear === 2024).slice(0, 6);
  const popularArtists = artists.slice(0, 6);
  const trendingAlbums = albums.slice(0, 6);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Hero Section */}
      <section className="mb-12 mt-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 neon-text-blue">
          NeonStream
        </h1>
        <p className="text-xl text-muted-foreground">
          Music for the digital age
        </p>
      </section>

      {/* Genres */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          Browse Genres
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredGenres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          New Releases
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {newReleases.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          Popular Artists
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Trending Albums */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          Trending Now
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* All Genres */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          All Genres
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>
    </div>
  );
}
