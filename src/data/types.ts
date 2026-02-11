export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  genres: string[];
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artwork: string;
  releaseYear: number;
  genre: string;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumTitle: string;
  artwork: string;
  duration: number; // in seconds
  url: string;
  genre: string;
  trackNumber: number;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  color: string; // HSL color for theming
  image: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface UserLibrary {
  likedSongIds: string[];
  playlists: Playlist[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  isSubscribed: boolean;
  subscribedAt?: number;
}
