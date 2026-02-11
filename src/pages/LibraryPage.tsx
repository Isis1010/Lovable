import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ListMusic, Plus, Music } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLibrary } from '@/context/LibraryContext';
import { useAuth } from '@/context/AuthContext';
import { getSongById } from '@/data/mockData';
import { SongRow } from '@/components/library/SongRow';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function LibraryPage() {
  const { isAuthenticated } = useAuth();
  const { likedSongIds, playlists, createPlaylist } = useLibrary();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const likedSongs = likedSongIds
    .map(id => getSongById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getSongById>>[];

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setIsDialogOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Library</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to save songs and create playlists
          </p>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 neon-text-blue">Your Library</h1>

      <Tabs defaultValue="liked" className="w-full">
        <TabsList className="mb-6 bg-muted">
          <TabsTrigger value="liked" className="data-[state=active]:bg-background data-[state=active]:text-neon-blue">
            <Star className="w-4 h-4 mr-2" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="playlists" className="data-[state=active]:bg-background data-[state=active]:text-neon-blue">
            <ListMusic className="w-4 h-4 mr-2" />
            Playlists
          </TabsTrigger>
        </TabsList>

        {/* Liked Songs Tab */}
        <TabsContent value="liked">
          {likedSongs.length === 0 ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No favorite songs yet</h2>
              <p className="text-muted-foreground mb-6">
                Songs you favorite will appear here
              </p>
              <Button asChild variant="outline">
                <Link to="/">Discover Music</Link>
              </Button>
            </div>
          ) : (
            <div className="border border-border rounded-xl overflow-hidden">
              {likedSongs.map((song, index) => (
                <SongRow 
                  key={song.id} 
                  song={song} 
                  index={index}
                  queue={likedSongs}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Playlists Tab */}
        <TabsContent value="playlists">
          <div className="mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Playlist
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Create New Playlist</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                  />
                  <Button
                    onClick={handleCreatePlaylist}
                    disabled={!newPlaylistName.trim()}
                    className="w-full"
                  >
                    Create
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {playlists.length === 0 ? (
            <div className="text-center py-16">
              <ListMusic className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No playlists yet</h2>
              <p className="text-muted-foreground">
                Create a playlist to organize your favorite songs
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="group p-4 border border-border rounded-xl hover:border-neon-blue transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center border border-border rounded-lg">
                      <ListMusic className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-neon-blue transition-colors">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {playlist.songIds.length} songs
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
