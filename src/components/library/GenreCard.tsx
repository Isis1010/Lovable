import { Link } from 'react-router-dom';
import { Genre } from '@/data/types';

interface GenreCardProps {
  genre: Genre;
}

export function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link 
      to={`/genre/${genre.id}`}
      className="group block relative aspect-[4/1] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all"
    >
      <img
        src={genre.image}
        alt={genre.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, hsl(${genre.color} / 0.7) 0%, transparent 100%)`,
        }}
      />
      <div className="absolute inset-0 flex items-end p-4">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
          {genre.name}
        </h3>
      </div>
    </Link>
  );
}
