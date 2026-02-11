import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X, Clock } from 'lucide-react';
import { searchAll } from '@/data/mockData';
import { SongRow } from '@/components/library/SongRow';
import { AlbumCard } from '@/components/library/AlbumCard';
import { ArtistCard } from '@/components/library/ArtistCard';
import { GenreCard } from '@/components/library/GenreCard';
import { Button } from '@/components/ui/button';

const RECENT_SEARCHES_KEY = 'neonstream_recent_searches';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load recent searches');
      }
    }
  }, []);

  // Save search to recents
  const saveSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 10);
    
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return searchAll(query);
  }, [query]);

  const hasResults = results && (
    results.songs.length > 0 ||
    results.artists.length > 0 ||
    results.albums.length > 0 ||
    results.genres.length > 0
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => saveSearch(query)}
            onKeyDown={(e) => e.key === 'Enter' && saveSearch(query)}
            placeholder="Search songs, artists, albums..."
            className="pl-12 pr-10 h-14 text-lg border-neon-blue focus:ring-neon-blue"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Recent Searches */}
      {!query && recentSearches.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Searches
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearRecentSearches}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setQuery(search)}
              >
                {search}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* No Query State */}
      {!query && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Search NeonStream</h2>
          <p className="text-muted-foreground">
            Find your favorite songs, artists, and albums
          </p>
        </div>
      )}

      {/* No Results */}
      {query && !hasResults && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            No results found for "{query}"
          </p>
        </div>
      )}

      {/* Search Results */}
      {hasResults && (
        <div className="space-y-8">
          {/* Songs */}
          {results.songs.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-neon-blue" />
                Songs
              </h2>
              <div className="border border-border rounded-xl overflow-hidden">
                {results.songs.slice(0, 5).map((song, index) => (
                  <SongRow 
                    key={song.id} 
                    song={song} 
                    index={index}
                    queue={results.songs}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {results.artists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-neon-blue" />
                Artists
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {results.artists.slice(0, 6).map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {results.albums.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-neon-blue" />
                Albums
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {results.albums.slice(0, 6).map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>
          )}

          {/* Genres */}
          {results.genres.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-neon-blue" />
                Genres
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.genres.map((genre) => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
