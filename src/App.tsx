import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LibraryProvider } from "@/context/LibraryContext";
import { MainLayout } from "@/components/layout/MainLayout";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SubscribePage from "./pages/SubscribePage";
import DonatePage from "./pages/DonatePage";
import SearchPage from "./pages/SearchPage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import GenrePage from "./pages/GenrePage";
import LibraryPage from "./pages/LibraryPage";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LibraryProvider>
          <ThemeProvider>
            <PlayerProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/subscribe" element={<SubscribePage />} />
                    <Route path="/donate" element={<DonatePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/artist/:id" element={<ArtistPage />} />
                    <Route path="/album/:id" element={<AlbumPage />} />
                    <Route path="/genre/:id" element={<GenrePage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/playlist/:id" element={<PlaylistPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </PlayerProvider>
          </ThemeProvider>
        </LibraryProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
