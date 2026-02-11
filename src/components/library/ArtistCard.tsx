import { Link } from 'react-router-dom';
import { Artist } from '@/data/types';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link 
      to={`/artist/${artist.id}`}
      className="group block text-center"
    >
      <div className="relative aspect-square overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-all mx-auto">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-3">
        <h3 className="font-bold truncate group-hover:text-primary transition-colors">
          {artist.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate">
          {artist.genres.slice(0, 2).join(', ')}
        </p>
      </div>
    </Link>
  );
}
