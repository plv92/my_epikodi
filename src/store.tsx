
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MediaItem, PlaybackState, MediaType, Playlist, User } from '../types';
import { MOCK_MEDIA } from './constants';
import { fetchTrendingMedia } from './services/mediaService';

interface MediaContextType {
  playback: PlaybackState;
  library: MediaItem[];
  playlists: Playlist[];
  user: User | null;
  isLoading: boolean;
  togglePlay: () => void;
  playMedia: (media: MediaItem) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleFavorite: (id: string) => void;
  setVolume: (v: number) => void;
  setProgress: (p: number) => void;
  setVideoPlayerOpen: (open: boolean) => void;
  addMedia: (media: MediaItem) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'epikodi_user_session';
const LOCAL_STORAGE_USERS_DB = 'epikodi_users_db';

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [library, setLibrary] = useState<MediaItem[]>(MOCK_MEDIA);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [playback, setPlayback] = useState<PlaybackState>({
    currentMedia: null,
    isPlaying: false,
    progress: 0,
    volume: 80,
    isShuffle: false,
    isRepeat: false,
    queue: MOCK_MEDIA,
    isVideoPlayerOpen: false,
  });

  useEffect(() => {
    const loadRealData = async () => {
      setIsLoading(true);
      const trending = await fetchTrendingMedia();
      if (trending.length > 0) {
        setLibrary(trending);
        setPlayback(prev => ({ ...prev, queue: trending }));
      }
      setIsLoading(false);
    };
    loadRealData();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    }
  }, []);

  const login = useCallback((email: string, name?: string) => {
    const usersJson = localStorage.getItem(LOCAL_STORAGE_USERS_DB);
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    let existingUser = users.find(u => u.email === email);
    if (!existingUser && name) {
      existingUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        joinedAt: new Date()
      };
      users.push(existingUser);
      localStorage.setItem(LOCAL_STORAGE_USERS_DB, JSON.stringify(users));
    } else if (!existingUser) {
      throw new Error("User not found. Please sign up.");
    }
    setUser(existingUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(existingUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }, []);

  const togglePlay = useCallback(() => {
    setPlayback(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const playMedia = useCallback((media: MediaItem) => {
    const isVideo = media.type === MediaType.MOVIE || media.type === MediaType.SHOW;
    setPlayback(prev => ({
      ...prev,
      currentMedia: media,
      isPlaying: true,
      progress: 0,
      isVideoPlayerOpen: isVideo
    }));
  }, []);

  const nextTrack = useCallback(() => {
    const currentIndex = playback.queue.findIndex(m => m.id === playback.currentMedia?.id);
    let nextIndex = (currentIndex + 1) % playback.queue.length;
    if (playback.isShuffle) {
      nextIndex = Math.floor(Math.random() * playback.queue.length);
    }
    const nextMedia = playback.queue[nextIndex];
    playMedia(nextMedia);
  }, [playback.currentMedia, playback.queue, playback.isShuffle, playMedia]);

  const prevTrack = useCallback(() => {
    const currentIndex = playback.queue.findIndex(m => m.id === playback.currentMedia?.id);
    const nextIndex = (currentIndex - 1 + playback.queue.length) % playback.queue.length;
    const nextMedia = playback.queue[nextIndex];
    playMedia(nextMedia);
  }, [playback.currentMedia, playback.queue, playMedia]);

  const toggleShuffle = () => setPlayback(prev => ({ ...prev, isShuffle: !prev.isShuffle }));
  const toggleRepeat = () => setPlayback(prev => ({ ...prev, isRepeat: !prev.isRepeat }));
  const setVolume = (v: number) => setPlayback(prev => ({ ...prev, volume: v }));
  const setProgress = (p: number) => setPlayback(prev => ({ ...prev, progress: p }));
  const setVideoPlayerOpen = (open: boolean) => setPlayback(prev => ({ ...prev, isVideoPlayerOpen: open }));

  const toggleFavorite = (id: string) => {
    setLibrary(prev => prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m));
  };

  const addMedia = (media: MediaItem) => {
    setLibrary(prev => [media, ...prev]);
    setPlayback(prev => ({ ...prev, queue: [media, ...prev.queue] }));
  };

  return (
    <MediaContext.Provider value={{
      playback, library, playlists, user, isLoading,
      togglePlay, playMedia, nextTrack, prevTrack,
      toggleShuffle, toggleRepeat, toggleFavorite,
      setVolume, setProgress, setVideoPlayerOpen, addMedia, login, logout
    }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMedia must be used within MediaProvider");
  return context;
};
