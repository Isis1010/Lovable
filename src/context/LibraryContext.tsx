import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Playlist, UserLibrary } from '@/data/types';

interface LibraryContextType {
  likedSongIds: string[];
  playlists: Playlist[];
  isLiked: (songId: string) => boolean;
  toggleLike: (songId: string) => void;
  createPlaylist: (name: string, description?: string) => Playlist;
  updatePlaylist: (id: string, updates: Partial<Pick<Playlist, 'name' | 'description'>>) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  getPlaylistById: (id: string) => Playlist | undefined;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const STORAGE_KEY = 'neonstream_library';

const defaultLibrary: UserLibrary = {
  likedSongIds: [],
  playlists: [],
};

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<UserLibrary>(defaultLibrary);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLibrary({
          likedSongIds: parsed.likedSongIds || [],
          playlists: parsed.playlists || [],
        });
      } catch (e) {
        console.error('Failed to parse library:', e);
      }
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  const isLiked = (songId: string): boolean => {
    return library.likedSongIds.includes(songId);
  };

  const toggleLike = (songId: string) => {
    setLibrary(prev => ({
      ...prev,
      likedSongIds: prev.likedSongIds.includes(songId)
        ? prev.likedSongIds.filter(id => id !== songId)
        : [...prev.likedSongIds, songId],
    }));
  };

  const createPlaylist = (name: string, description: string = ''): Playlist => {
    const now = Date.now();
    const newPlaylist: Playlist = {
      id: `playlist_${now}`,
      name,
      description,
      songIds: [],
      createdAt: now,
      updatedAt: now,
    };

    setLibrary(prev => ({
      ...prev,
      playlists: [...prev.playlists, newPlaylist],
    }));

    return newPlaylist;
  };

  const updatePlaylist = (id: string, updates: Partial<Pick<Playlist, 'name' | 'description'>>) => {
    setLibrary(prev => ({
      ...prev,
      playlists: prev.playlists.map(p =>
        p.id === id
          ? { ...p, ...updates, updatedAt: Date.now() }
          : p
      ),
    }));
  };

  const deletePlaylist = (id: string) => {
    setLibrary(prev => ({
      ...prev,
      playlists: prev.playlists.filter(p => p.id !== id),
    }));
  };

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    setLibrary(prev => ({
      ...prev,
      playlists: prev.playlists.map(p =>
        p.id === playlistId && !p.songIds.includes(songId)
          ? { ...p, songIds: [...p.songIds, songId], updatedAt: Date.now() }
          : p
      ),
    }));
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setLibrary(prev => ({
      ...prev,
      playlists: prev.playlists.map(p =>
        p.id === playlistId
          ? { ...p, songIds: p.songIds.filter(id => id !== songId), updatedAt: Date.now() }
          : p
      ),
    }));
  };

  const getPlaylistById = (id: string): Playlist | undefined => {
    return library.playlists.find(p => p.id === id);
  };

  return (
    <LibraryContext.Provider
      value={{
        likedSongIds: library.likedSongIds,
        playlists: library.playlists,
        isLiked,
        toggleLike,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        getPlaylistById,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
