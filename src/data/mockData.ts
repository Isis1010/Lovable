import { Artist, Album, Song, Genre } from './types';

// Placeholder images using picsum for variety
const getArtistImage = (id: number) => `https://picsum.photos/seed/artist${id}/400/400`;
const getAlbumArt = (id: number) => `https://picsum.photos/seed/album${id}/400/400`;
const getGenreImage = (id: number) => `https://picsum.photos/seed/genre${id}/800/400`;

// Sample audio URLs (using free sample tracks)
const sampleAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const genres: Genre[] = [
  {
    id: 'hiphop',
    name: 'Hip-Hop',
    description: 'Beats, bars, and culture',
    color: '300 100% 50%', // Magenta
    image: getGenreImage(1),
  },
  {
    id: 'rnb',
    name: 'R&B',
    description: 'Smooth rhythms and soulful vibes',
    color: '270 100% 60%', // Purple
    image: getGenreImage(2),
  },
  {
    id: 'afrobeats',
    name: 'Afrobeats',
    description: 'African rhythms meet modern sounds',
    color: '45 100% 50%', // Orange/Gold
    image: getGenreImage(3),
  },
  {
    id: 'electronic',
    name: 'Electronic',
    description: 'Synthesized sounds and digital beats',
    color: '180 100% 50%', // Cyan
    image: getGenreImage(4),
  },
  {
    id: 'rock',
    name: 'Rock',
    description: 'Guitar-driven energy and rebellion',
    color: '0 100% 50%', // Red
    image: getGenreImage(5),
  },
  {
    id: 'pop',
    name: 'Pop',
    description: 'Catchy hooks and mainstream appeal',
    color: '330 100% 60%', // Pink
    image: getGenreImage(6),
  },
  {
    id: 'jazz',
    name: 'Jazz',
    description: 'Improvisation and musical freedom',
    color: '200 80% 40%', // Blue
    image: getGenreImage(7),
  },
  {
    id: 'lofi',
    name: 'Lo-Fi',
    description: 'Chill beats to relax and study',
    color: '160 60% 45%', // Teal
    image: getGenreImage(8),
  },
];

export const artists: Artist[] = [
  {
    id: 'artist1',
    name: 'Neon Pulse',
    bio: 'Electronic producer pushing the boundaries of synthwave and cyberpunk soundscapes.',
    image: getArtistImage(1),
    genres: ['electronic', 'lofi'],
  },
  {
    id: 'artist2',
    name: 'Crystal Waves',
    bio: 'R&B vocalist known for ethereal harmonies and emotional depth.',
    image: getArtistImage(2),
    genres: ['rnb', 'pop'],
  },
  {
    id: 'artist3',
    name: 'Metro Kings',
    bio: 'Hip-hop collective bringing raw street poetry to modern beats.',
    image: getArtistImage(3),
    genres: ['hiphop'],
  },
  {
    id: 'artist4',
    name: 'Lagos Nights',
    bio: 'Afrobeats sensation blending traditional rhythms with contemporary production.',
    image: getArtistImage(4),
    genres: ['afrobeats', 'pop'],
  },
  {
    id: 'artist5',
    name: 'Voltage',
    bio: 'Rock band electrifying stages with their fusion of classic and modern sounds.',
    image: getArtistImage(5),
    genres: ['rock'],
  },
  {
    id: 'artist6',
    name: 'Midnight Jazz',
    bio: 'Jazz ensemble exploring the intersection of tradition and innovation.',
    image: getArtistImage(6),
    genres: ['jazz', 'lofi'],
  },
  {
    id: 'artist7',
    name: 'Stellar',
    bio: 'Pop artist creating anthems for the digital generation.',
    image: getArtistImage(7),
    genres: ['pop', 'electronic'],
  },
  {
    id: 'artist8',
    name: 'Urban Flow',
    bio: 'Hip-hop producer crafting beats that move crowds worldwide.',
    image: getArtistImage(8),
    genres: ['hiphop', 'rnb'],
  },
  {
    id: 'artist9',
    name: 'Sunset Collective',
    bio: 'Lo-fi producers creating the perfect soundtrack for late nights.',
    image: getArtistImage(9),
    genres: ['lofi', 'electronic'],
  },
  {
    id: 'artist10',
    name: 'Rhythm Nation',
    bio: 'Afrobeats supergroup pushing African music to global audiences.',
    image: getArtistImage(10),
    genres: ['afrobeats'],
  },
  {
    id: 'artist11',
    name: 'Echo Chamber',
    bio: 'Experimental electronic artist known for immersive soundscapes.',
    image: getArtistImage(11),
    genres: ['electronic', 'jazz'],
  },
  {
    id: 'artist12',
    name: 'Velvet',
    bio: 'R&B singer-songwriter with a voice that captivates millions.',
    image: getArtistImage(12),
    genres: ['rnb', 'pop'],
  },
];

export const albums: Album[] = [
  {
    id: 'album1',
    title: 'Neon Dreams',
    artistId: 'artist1',
    artistName: 'Neon Pulse',
    artwork: getAlbumArt(1),
    releaseYear: 2024,
    genre: 'electronic',
  },
  {
    id: 'album2',
    title: 'Ocean Heart',
    artistId: 'artist2',
    artistName: 'Crystal Waves',
    artwork: getAlbumArt(2),
    releaseYear: 2024,
    genre: 'rnb',
  },
  {
    id: 'album3',
    title: 'Street Chronicles',
    artistId: 'artist3',
    artistName: 'Metro Kings',
    artwork: getAlbumArt(3),
    releaseYear: 2023,
    genre: 'hiphop',
  },
  {
    id: 'album4',
    title: 'African Sun',
    artistId: 'artist4',
    artistName: 'Lagos Nights',
    artwork: getAlbumArt(4),
    releaseYear: 2024,
    genre: 'afrobeats',
  },
  {
    id: 'album5',
    title: 'Electric Thunder',
    artistId: 'artist5',
    artistName: 'Voltage',
    artwork: getAlbumArt(5),
    releaseYear: 2023,
    genre: 'rock',
  },
  {
    id: 'album6',
    title: 'After Hours',
    artistId: 'artist6',
    artistName: 'Midnight Jazz',
    artwork: getAlbumArt(6),
    releaseYear: 2024,
    genre: 'jazz',
  },
  {
    id: 'album7',
    title: 'Starlight',
    artistId: 'artist7',
    artistName: 'Stellar',
    artwork: getAlbumArt(7),
    releaseYear: 2024,
    genre: 'pop',
  },
  {
    id: 'album8',
    title: 'City Beats',
    artistId: 'artist8',
    artistName: 'Urban Flow',
    artwork: getAlbumArt(8),
    releaseYear: 2023,
    genre: 'hiphop',
  },
  {
    id: 'album9',
    title: 'Midnight Study',
    artistId: 'artist9',
    artistName: 'Sunset Collective',
    artwork: getAlbumArt(9),
    releaseYear: 2024,
    genre: 'lofi',
  },
  {
    id: 'album10',
    title: 'Continental',
    artistId: 'artist10',
    artistName: 'Rhythm Nation',
    artwork: getAlbumArt(10),
    releaseYear: 2024,
    genre: 'afrobeats',
  },
];

export const songs: Song[] = [
  // Neon Dreams - Electronic
  {
    id: 'song1',
    title: 'Digital Horizon',
    artistId: 'artist1',
    artistName: 'Neon Pulse',
    albumId: 'album1',
    albumTitle: 'Neon Dreams',
    artwork: getAlbumArt(1),
    duration: 234,
    url: sampleAudioUrl,
    genre: 'electronic',
    trackNumber: 1,
  },
  {
    id: 'song2',
    title: 'Cyber Rain',
    artistId: 'artist1',
    artistName: 'Neon Pulse',
    albumId: 'album1',
    albumTitle: 'Neon Dreams',
    artwork: getAlbumArt(1),
    duration: 198,
    url: sampleAudioUrl,
    genre: 'electronic',
    trackNumber: 2,
  },
  {
    id: 'song3',
    title: 'Neon Streets',
    artistId: 'artist1',
    artistName: 'Neon Pulse',
    albumId: 'album1',
    albumTitle: 'Neon Dreams',
    artwork: getAlbumArt(1),
    duration: 267,
    url: sampleAudioUrl,
    genre: 'electronic',
    trackNumber: 3,
  },
  // Ocean Heart - R&B
  {
    id: 'song4',
    title: 'Tidal Love',
    artistId: 'artist2',
    artistName: 'Crystal Waves',
    albumId: 'album2',
    albumTitle: 'Ocean Heart',
    artwork: getAlbumArt(2),
    duration: 245,
    url: sampleAudioUrl,
    genre: 'rnb',
    trackNumber: 1,
  },
  {
    id: 'song5',
    title: 'Moonlit Waters',
    artistId: 'artist2',
    artistName: 'Crystal Waves',
    albumId: 'album2',
    albumTitle: 'Ocean Heart',
    artwork: getAlbumArt(2),
    duration: 312,
    url: sampleAudioUrl,
    genre: 'rnb',
    trackNumber: 2,
  },
  // Street Chronicles - Hip-Hop
  {
    id: 'song6',
    title: 'Metro Anthem',
    artistId: 'artist3',
    artistName: 'Metro Kings',
    albumId: 'album3',
    albumTitle: 'Street Chronicles',
    artwork: getAlbumArt(3),
    duration: 189,
    url: sampleAudioUrl,
    genre: 'hiphop',
    trackNumber: 1,
  },
  {
    id: 'song7',
    title: 'Concrete Dreams',
    artistId: 'artist3',
    artistName: 'Metro Kings',
    albumId: 'album3',
    albumTitle: 'Street Chronicles',
    artwork: getAlbumArt(3),
    duration: 223,
    url: sampleAudioUrl,
    genre: 'hiphop',
    trackNumber: 2,
  },
  {
    id: 'song8',
    title: 'Rise Up',
    artistId: 'artist3',
    artistName: 'Metro Kings',
    albumId: 'album3',
    albumTitle: 'Street Chronicles',
    artwork: getAlbumArt(3),
    duration: 201,
    url: sampleAudioUrl,
    genre: 'hiphop',
    trackNumber: 3,
  },
  // African Sun - Afrobeats
  {
    id: 'song9',
    title: 'Lagos Groove',
    artistId: 'artist4',
    artistName: 'Lagos Nights',
    albumId: 'album4',
    albumTitle: 'African Sun',
    artwork: getAlbumArt(4),
    duration: 256,
    url: sampleAudioUrl,
    genre: 'afrobeats',
    trackNumber: 1,
  },
  {
    id: 'song10',
    title: 'Sunset Dance',
    artistId: 'artist4',
    artistName: 'Lagos Nights',
    albumId: 'album4',
    albumTitle: 'African Sun',
    artwork: getAlbumArt(4),
    duration: 289,
    url: sampleAudioUrl,
    genre: 'afrobeats',
    trackNumber: 2,
  },
  // Electric Thunder - Rock
  {
    id: 'song11',
    title: 'Lightning Strike',
    artistId: 'artist5',
    artistName: 'Voltage',
    albumId: 'album5',
    albumTitle: 'Electric Thunder',
    artwork: getAlbumArt(5),
    duration: 278,
    url: sampleAudioUrl,
    genre: 'rock',
    trackNumber: 1,
  },
  {
    id: 'song12',
    title: 'Power Surge',
    artistId: 'artist5',
    artistName: 'Voltage',
    albumId: 'album5',
    albumTitle: 'Electric Thunder',
    artwork: getAlbumArt(5),
    duration: 245,
    url: sampleAudioUrl,
    genre: 'rock',
    trackNumber: 2,
  },
  // After Hours - Jazz
  {
    id: 'song13',
    title: 'Blue Notes',
    artistId: 'artist6',
    artistName: 'Midnight Jazz',
    albumId: 'album6',
    albumTitle: 'After Hours',
    artwork: getAlbumArt(6),
    duration: 367,
    url: sampleAudioUrl,
    genre: 'jazz',
    trackNumber: 1,
  },
  {
    id: 'song14',
    title: 'Velvet Night',
    artistId: 'artist6',
    artistName: 'Midnight Jazz',
    albumId: 'album6',
    albumTitle: 'After Hours',
    artwork: getAlbumArt(6),
    duration: 298,
    url: sampleAudioUrl,
    genre: 'jazz',
    trackNumber: 2,
  },
  // Starlight - Pop
  {
    id: 'song15',
    title: 'Shooting Stars',
    artistId: 'artist7',
    artistName: 'Stellar',
    albumId: 'album7',
    albumTitle: 'Starlight',
    artwork: getAlbumArt(7),
    duration: 198,
    url: sampleAudioUrl,
    genre: 'pop',
    trackNumber: 1,
  },
  {
    id: 'song16',
    title: 'Galaxy Girl',
    artistId: 'artist7',
    artistName: 'Stellar',
    albumId: 'album7',
    albumTitle: 'Starlight',
    artwork: getAlbumArt(7),
    duration: 212,
    url: sampleAudioUrl,
    genre: 'pop',
    trackNumber: 2,
  },
  // City Beats - Hip-Hop
  {
    id: 'song17',
    title: 'Urban Legend',
    artistId: 'artist8',
    artistName: 'Urban Flow',
    albumId: 'album8',
    albumTitle: 'City Beats',
    artwork: getAlbumArt(8),
    duration: 234,
    url: sampleAudioUrl,
    genre: 'hiphop',
    trackNumber: 1,
  },
  {
    id: 'song18',
    title: 'Downtown Vibes',
    artistId: 'artist8',
    artistName: 'Urban Flow',
    albumId: 'album8',
    albumTitle: 'City Beats',
    artwork: getAlbumArt(8),
    duration: 267,
    url: sampleAudioUrl,
    genre: 'hiphop',
    trackNumber: 2,
  },
  // Midnight Study - Lo-Fi
  {
    id: 'song19',
    title: 'Coffee & Rain',
    artistId: 'artist9',
    artistName: 'Sunset Collective',
    albumId: 'album9',
    albumTitle: 'Midnight Study',
    artwork: getAlbumArt(9),
    duration: 178,
    url: sampleAudioUrl,
    genre: 'lofi',
    trackNumber: 1,
  },
  {
    id: 'song20',
    title: 'Late Night Thoughts',
    artistId: 'artist9',
    artistName: 'Sunset Collective',
    albumId: 'album9',
    albumTitle: 'Midnight Study',
    artwork: getAlbumArt(9),
    duration: 203,
    url: sampleAudioUrl,
    genre: 'lofi',
    trackNumber: 2,
  },
  // Continental - Afrobeats
  {
    id: 'song21',
    title: 'African Pride',
    artistId: 'artist10',
    artistName: 'Rhythm Nation',
    albumId: 'album10',
    albumTitle: 'Continental',
    artwork: getAlbumArt(10),
    duration: 289,
    url: sampleAudioUrl,
    genre: 'afrobeats',
    trackNumber: 1,
  },
  {
    id: 'song22',
    title: 'Unity Dance',
    artistId: 'artist10',
    artistName: 'Rhythm Nation',
    albumId: 'album10',
    albumTitle: 'Continental',
    artwork: getAlbumArt(10),
    duration: 312,
    url: sampleAudioUrl,
    genre: 'afrobeats',
    trackNumber: 2,
  },
];

// Helper functions
export const getArtistById = (id: string): Artist | undefined => 
  artists.find(a => a.id === id);

export const getAlbumById = (id: string): Album | undefined => 
  albums.find(a => a.id === id);

export const getSongById = (id: string): Song | undefined => 
  songs.find(s => s.id === id);

export const getGenreById = (id: string): Genre | undefined => 
  genres.find(g => g.id === id);

export const getSongsByAlbum = (albumId: string): Song[] => 
  songs.filter(s => s.albumId === albumId).sort((a, b) => a.trackNumber - b.trackNumber);

export const getSongsByArtist = (artistId: string): Song[] => 
  songs.filter(s => s.artistId === artistId);

export const getAlbumsByArtist = (artistId: string): Album[] => 
  albums.filter(a => a.artistId === artistId);

export const getSongsByGenre = (genreId: string): Song[] => 
  songs.filter(s => s.genre === genreId);

export const getAlbumsByGenre = (genreId: string): Album[] => 
  albums.filter(a => a.genre === genreId);

export const getArtistsByGenre = (genreId: string): Artist[] => 
  artists.filter(a => a.genres.includes(genreId));

export const searchAll = (query: string) => {
  const q = query.toLowerCase();
  return {
    songs: songs.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.artistName.toLowerCase().includes(q)
    ),
    artists: artists.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.bio.toLowerCase().includes(q)
    ),
    albums: albums.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.artistName.toLowerCase().includes(q)
    ),
    genres: genres.filter(g => 
      g.name.toLowerCase().includes(q) || 
      g.description.toLowerCase().includes(q)
    ),
  };
};
