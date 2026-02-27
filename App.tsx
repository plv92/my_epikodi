import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Home, Film, Music, Settings, Heart, Search, Menu, X, Upload, Trash2, Play, History, List, Plus, MoreHorizontal, Clock, Disc, ListMusic, TrendingUp, BarChart3, Tv, CloudDownload, Radio, Info } from 'lucide-react';
import { MediaItem, AudioTrack, UserSettings, Playlist, ListeningStats } from './types';
import { fetchTrending, searchMedia, getImageUrl } from './services/tmdb';
import { extractMetadataFromFile } from './services/audiodb';
import { getJamendoPopularTracks, searchJamendoTracks, getJamendoTracksByTag, convertJamendoToAudioTrack, JamendoTrack } from './services/jamendo';
import { AudioPlayer } from './components/AudioPlayer';
import { MediaCard } from './components/MediaCard';

// --- Global State Helper ---
const usePersistedState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [key, state]);

  return [state, setState];
};

// --- Components ---

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold' 
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface'
    }`}
  >
    <Icon size={20} />
    <span className="medium">{label}</span>
  </Link>
);

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-dark-surface rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 z-10 transition">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ 
  settings, 
  favorites, 
  toggleFavorite,
  onOpenDetails
}: { 
  settings: UserSettings, 
  favorites: MediaItem[], 
  toggleFavorite: (m: MediaItem) => void,
  onOpenDetails: (m: MediaItem) => void
}) => {
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [heroItem, setHeroItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetchTrending(settings.tmdbApiKey).then(data => {
      setTrending(data);
      if (data.length > 0) setHeroItem(data[0]);
    });
  }, [settings.tmdbApiKey]);

  if (!heroItem) return <div className="p-10 text-center dark:text-white">Loading...</div>;

  const heroTitle = 'title' in heroItem ? heroItem.title : heroItem.name;

  return (
    <div className="pb-24 animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(heroItem.backdrop_path, 'original')} 
            alt={heroTitle} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-bg via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 lg:w-1/2 space-y-4">
          <span className="px-2 py-1 bg-brand-500 text-white text-xs font-bold rounded uppercase tracking-wider">
            Trending Now
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            {heroTitle}
          </h1>
          <p className="text-gray-200 line-clamp-3 text-sm md:text-lg drop-shadow-md">
            {heroItem.overview}
          </p>
          <div className="flex space-x-4 pt-4">
             <button 
               onClick={() => onOpenDetails(heroItem)}
               className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition flex items-center space-x-2"
             >
               <Film size={20} />
               <span>Details</span>
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(heroItem); }}
                className="px-6 py-3 bg-gray-500/50 backdrop-blur-md text-white font-bold rounded-lg hover:bg-gray-500/70 transition flex items-center space-x-2 border border-white/20"
             >
               <Heart size={20} fill={favorites.some(f => f.id === heroItem.id) ? "currentColor" : "none"} />
               <span>{favorites.some(f => f.id === heroItem.id) ? 'Saved' : 'My List'}</span>
             </button>
          </div>
        </div>
      </div>

      {/* Trending Grid */}
      <div className="px-6 md:px-12 mt-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Trending Movies & Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {trending.map(item => (
            <MediaCard 
              key={item.id} 
              item={item} 
              isFavorite={favorites.some(f => f.id === item.id)}
              onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(item); }}
              onClick={() => onOpenDetails(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LibraryPage = ({ 
  settings, 
  favorites, 
  history,
  toggleFavorite,
  onOpenDetails,
  filter
}: { 
  settings: UserSettings, 
  favorites: MediaItem[], 
  history: MediaItem[],
  toggleFavorite: (m: MediaItem) => void,
  onOpenDetails: (m: MediaItem) => void,
  filter: 'search' | 'favorites' | 'history'
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter === 'favorites') {
      setResults(favorites);
    } else if (filter === 'history') {
      setResults(history);
    } else if (query.length > 2) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        searchMedia(settings.tmdbApiKey, query).then(data => {
          setResults(data);
          setLoading(false);
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query, filter, favorites, history, settings.tmdbApiKey]);

  const getTitle = () => {
    switch (filter) {
      case 'favorites': return 'My Library';
      case 'history': return 'Watch History';
      default: return 'Search TMDB';
    }
  };

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold dark:text-white capitalize">
          {getTitle()}
        </h2>
        
        {filter === 'search' && (
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search movies & TV shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
            />
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map(item => (
            <MediaCard 
              key={item.id} 
              item={item} 
              isFavorite={favorites.some(f => f.id === item.id)}
              onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(item); }}
              onClick={() => onOpenDetails(item)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          {filter === 'favorites' 
            ? "You haven't added any favorites yet." 
            : filter === 'history'
            ? "No history yet. Start watching!"
            : query.length > 0 ? "No results found." : "Type to search..."}
        </div>
      )}
    </div>
  );
};

const MusicPage = ({ 
  tracks, 
  playlists,
  addTracks, 
  removeTrack,
  playTrack,
  addToPlaylist,
  toggleFavoriteTrack,
  currentTrackId,
  isPlaying
}: {
  tracks: AudioTrack[],
  playlists: Playlist[],
  addTracks: (files: FileList) => void,
  removeTrack: (id: string) => void,
  playTrack: (track: AudioTrack) => void,
  addToPlaylist: (trackId: string, playlistId: string) => void,
  toggleFavoriteTrack: (trackId: string) => void,
  currentTrackId: string | undefined,
  isPlaying: boolean
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addTracks(e.target.files);
    }
  };

  const displayTracks = viewMode === 'favorites' ? tracks.filter(t => t.isFavorite) : tracks;

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-bold dark:text-white">Music Library</h2>
           <div className="flex items-center gap-4 mt-2">
             <p className="text-gray-500">Local Playback • {tracks.length} Tracks</p>
             <div className="flex gap-2">
               <button 
                 onClick={() => setViewMode('all')}
                 className={`px-3 py-1 rounded-md text-sm font-medium transition ${viewMode === 'all' ? 'bg-brand-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
               >
                 All
               </button>
               <button 
                 onClick={() => setViewMode('favorites')}
                 className={`px-3 py-1 rounded-md text-sm font-medium transition ${viewMode === 'favorites' ? 'bg-brand-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
               >
                 ❤️ Favorites
               </button>
             </div>
           </div>
        </div>
        <label className="cursor-pointer px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition flex items-center space-x-2 shadow-md hover:shadow-lg">
           <Upload size={20} />
           <span>Upload Songs</span>
           <input type="file" multiple accept="audio/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-dark-border">
        {displayTracks.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Music size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">{viewMode === 'favorites' ? 'No favorite tracks yet.' : 'Your library is empty.'}</p>
            <p className="text-sm">{viewMode === 'favorites' ? 'Heart some tracks to see them here.' : 'Upload MP3/WAV files to start listening.'}</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 w-12">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 hidden md:table-cell">Artist</th>
                <th className="px-6 py-4 hidden lg:table-cell">Genre</th>
                <th className="px-6 py-4 hidden xl:table-cell">Plays</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {displayTracks.map((track, index) => {
                const isCurrent = currentTrackId === track.id;
                return (
                  <tr 
                    key={track.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition group cursor-pointer ${isCurrent ? 'bg-brand-50 dark:bg-brand-900/20' : ''}`}
                    onClick={() => playTrack(track)}
                  >
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {isCurrent && isPlaying ? (
                         <div className="w-3 h-3 bg-brand-500 rounded-full animate-pulse" />
                      ) : (
                         <span className="group-hover:hidden">{index + 1}</span>
                      )}
                      <Play size={14} className="hidden group-hover:block text-brand-500" />
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${isCurrent ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white'}`}>
                        {track.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-gray-500 dark:text-gray-400 text-sm">
                      {track.artist}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-sm">
                      {track.genre || '-'}
                    </td>
                    <td className="px-6 py-4 hidden xl:table-cell text-gray-500 dark:text-gray-400 text-sm">
                      {track.playCount || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                           {/* Favorite Button */}
                           <button 
                             onClick={(e) => { e.stopPropagation(); toggleFavoriteTrack(track.id); }}
                             className={`p-2 transition rounded-full ${track.isFavorite ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                           >
                             <Heart size={16} fill={track.isFavorite ? 'currentColor' : 'none'} />
                           </button>
                           
                           {/* Add to Playlist Button */}
                           <div className="relative group/dropdown">
                               <button 
                                 onClick={(e) => { e.stopPropagation(); setSelectedTrackId(selectedTrackId === track.id ? null : track.id); }}
                                 className="p-2 text-gray-400 hover:text-brand-500 transition rounded-full hover:bg-brand-50 dark:hover:bg-brand-900/20"
                               >
                                  <Plus size={16} />
                               </button>
                               {/* Dropdown for playlists */}
                               {selectedTrackId === track.id && (
                                   <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-gray-200 dark:border-dark-border z-10 p-1">
                                       <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Add to Playlist</p>
                                       {playlists.length > 0 ? playlists.map(pl => (
                                           <button
                                              key={pl.id}
                                              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  addToPlaylist(track.id, pl.id);
                                                  setSelectedTrackId(null);
                                              }}
                                           >
                                               {pl.name}
                                           </button>
                                       )) : (
                                           <div className="px-3 py-2 text-sm text-gray-400 italic">No playlists</div>
                                       )}
                                   </div>
                               )}
                           </div>

                           <button 
                             onClick={(e) => { e.stopPropagation(); removeTrack(track.id); }}
                             className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                           >
                             <Trash2 size={16} />
                           </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* Click outside to close dropdown */}
      {selectedTrackId && (
          <div className="fixed inset-0 z-0" onClick={() => setSelectedTrackId(null)} />
      )}
    </div>
  );
};

const PlaylistsPage = ({ 
  playlists, 
  onCreatePlaylist,
}: { 
  playlists: Playlist[], 
  onCreatePlaylist: (name: string) => void, 
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
        onCreatePlaylist(newName);
        setNewName('');
        setIsCreating(false);
    }
  };

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold dark:text-white">Playlists</h2>
            <button 
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition flex items-center space-x-2"
            >
                <Plus size={20} />
                <span>New Playlist</span>
            </button>
        </div>

        {isCreating && (
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Playlist Name</label>
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={e => setNewName(e.target.value)}
                        className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="My Awesome Mix"
                        autoFocus
                    />
                    <button type="submit" className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600">Create</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">Cancel</button>
                </div>
            </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map(playlist => (
                <Link to={`/playlists/${playlist.id}`} key={playlist.id} className="block group">
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm hover:shadow-lg transition-all transform group-hover:-translate-y-1 h-full flex flex-col">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-brand-500 rounded-lg flex items-center justify-center text-white">
                                <ListMusic size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{playlist.name}</h3>
                                <p className="text-sm text-gray-500">{playlist.trackIds.length} tracks</p>
                            </div>
                        </div>
                        <div className="mt-auto text-xs text-gray-400">
                            Created {new Date(playlist.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </Link>
            ))}
            {playlists.length === 0 && !isCreating && (
                <div className="col-span-full py-12 text-center text-gray-500">
                    <Disc size={48} className="mx-auto mb-4 opacity-30" />
                    <p>No playlists yet. Create one to get started!</p>
                </div>
            )}
        </div>
    </div>
  );
};

// Jamendo Music Discovery Page
const JamendoPage = ({ 
  settings,
  onPlayJamendoTrack,
  onAddToLibrary,
}: { 
  settings: UserSettings,
  onPlayJamendoTrack: (track: AudioTrack) => void,
  onAddToLibrary: (track: AudioTrack) => void,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [popularTracks, setPopularTracks] = useState<AudioTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'popular' | 'genres'>('popular');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['rock', 'pop', 'electronic', 'jazz', 'classical', 'ambient', 'indie', 'metal', 'acoustic', 'hiphop'];

  // Load popular tracks on mount
  useEffect(() => {
    if (settings.jamendoApiKey && activeTab === 'popular') {
      loadPopularTracks();
    }
  }, [settings.jamendoApiKey, activeTab]);

  const loadPopularTracks = async () => {
    if (!settings.jamendoApiKey) return;
    setLoading(true);
    try {
      const results = await getJamendoPopularTracks(settings.jamendoApiKey, 20);
      setPopularTracks(results);
    } catch (error) {
      console.error('Failed to load popular tracks:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !settings.jamendoApiKey) return;
    
    setLoading(true);
    try {
      const results = await searchJamendoTracks(settings.jamendoApiKey, searchQuery, 20);
      setTracks(results);
      setActiveTab('search');
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const handleGenreSelect = async (genre: string) => {
    if (!settings.jamendoApiKey) return;
    setSelectedGenre(genre);
    setActiveTab('genres');
    setLoading(true);
    try {
      const results = await getJamendoTracksByTag(settings.jamendoApiKey, [genre], 20);
      setTracks(results);
    } catch (error) {
      console.error('Failed to load genre tracks:', error);
    }
    setLoading(false);
  };

  if (!settings.jamendoApiKey) {
    return (
      <div className="px-6 md:px-12 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Radio size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold dark:text-white mb-2">Jamendo API Key Required</h2>
          <p className="text-gray-500 mb-4">Please add your Jamendo Client ID in Settings to discover royalty-free music.</p>
          <Link to="/settings" className="px-6 py-3 bg-brand-500 text-white rounded-lg inline-block hover:bg-brand-600">
            Go to Settings
          </Link>
        </div>
      </div>
    );
  }

  const displayTracks = activeTab === 'popular' ? popularTracks : tracks;

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Royalty-Free Music</h2>
        <Radio size={32} className="text-brand-500" />
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for tracks, artists, albums..."
            className="flex-1 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-surface dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-dark-border">
        <button 
          onClick={() => setActiveTab('popular')}
          className={`pb-3 px-4 font-medium transition ${activeTab === 'popular' ? 'border-b-2 border-brand-500 text-brand-500' : 'text-gray-500'}`}
        >
          Popular
        </button>
        <button 
          onClick={() => setActiveTab('genres')}
          className={`pb-3 px-4 font-medium transition ${activeTab === 'genres' ? 'border-b-2 border-brand-500 text-brand-500' : 'text-gray-500'}`}
        >
          Genres
        </button>
        {activeTab === 'search' && (
          <button 
            className="pb-3 px-4 font-medium border-b-2 border-brand-500 text-brand-500"
          >
            Search Results
          </button>
        )}
      </div>

      {/* Genre Pills */}
      {activeTab === 'genres' && (
        <div className="mb-8 flex flex-wrap gap-3">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedGenre === genre 
                  ? 'bg-brand-500 text-white' 
                  : 'bg-gray-200 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      )}

      {/* Tracks List */}
      {!loading && displayTracks.length > 0 && (
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">#</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Title</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Artist</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Album</th>
                <th className="text-right p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayTracks.map((track, idx) => (
                <tr 
                  key={track.id} 
                  className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-black/20 transition"
                >
                  <td className="p-4 text-gray-500 dark:text-gray-400">{idx + 1}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white">{track.title}</div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{track.artist}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{track.album}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onPlayJamendoTrack(track)}
                        className="p-2 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-full transition"
                        title="Play Now"
                      >
                        <Play size={18} />
                      </button>
                      <button
                        onClick={() => onAddToLibrary(track)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                        title="Add to Library"
                      >
                        <CloudDownload size={18} />
                      </button>
                      {track.licenseUrl && (
                        <a
                          href={track.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                          title="View License"
                        >
                          <Info size={18} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && displayTracks.length === 0 && activeTab !== 'popular' && (
        <div className="text-center py-12 text-gray-500">
          <Music size={48} className="mx-auto mb-4 opacity-30" />
          <p>No tracks found. Try a different search or genre.</p>
        </div>
      )}

      {/* License Info Footer */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <Info size={16} className="inline mr-2" />
          All music is provided by Jamendo under Creative Commons licenses. Please check individual track licenses before commercial use.
        </p>
      </div>
    </div>
  );
};

const PlaylistDetailsPage = ({
    playlists,
    libraryTracks,
    playPlaylist,
    deletePlaylist,
    removeTrackFromPlaylist
}: {
    playlists: Playlist[],
    libraryTracks: AudioTrack[],
    playPlaylist: (playlist: Playlist) => void,
    deletePlaylist: (id: string) => void,
    removeTrackFromPlaylist: (playlistId: string, trackId: string) => void
}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const playlist = playlists.find(p => p.id === id);

    if (!playlist) return <div className="p-12 text-center text-gray-500">Playlist not found</div>;

    // Resolve tracks. Note: Since libraryTracks are session based, some IDs might not be found if reloaded.
    const playlistTracks = playlist.trackIds
        .map(tid => libraryTracks.find(t => t.id === tid))
        .filter((t): t is AudioTrack => !!t);

    const handleDelete = () => {
        if(confirm('Are you sure you want to delete this playlist?')) {
            deletePlaylist(playlist.id);
            navigate('/playlists');
        }
    }

    return (
        <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <ListMusic size={40} />
                    </div>
                    <div>
                        <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">Playlist</span>
                        <h1 className="text-4xl font-bold dark:text-white mt-1">{playlist.name}</h1>
                        <p className="text-gray-500 mt-2">{playlistTracks.length} Tracks • {new Date(playlist.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={() => playPlaylist(playlist)}
                        disabled={playlistTracks.length === 0}
                        className="px-8 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition flex items-center space-x-2 shadow-lg"
                    >
                        <Play size={20} fill="currentColor" />
                        <span>Play All</span>
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="px-4 py-3 bg-gray-200 dark:bg-gray-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-dark-border">
                {playlistTracks.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p>This playlist is empty (or tracks are missing from library).</p>
                        <p className="text-sm mt-2">Go to Music Library to add songs.</p>
                        <Link to="/music" className="inline-block mt-4 text-brand-500 font-medium hover:underline">Browse Music</Link>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4 w-12">#</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Artist</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                             {playlistTracks.map((track, i) => (
                                 <tr key={track.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                     <td className="px-6 py-4 text-gray-400 text-sm">{i + 1}</td>
                                     <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{track.title}</td>
                                     <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{track.artist}</td>
                                     <td className="px-6 py-4 text-right">
                                         <button 
                                            onClick={() => removeTrackFromPlaylist(playlist.id, track.id)}
                                            className="text-gray-400 hover:text-red-500"
                                         >
                                             <X size={16} />
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const SettingsPage = ({ settings, setSettings }: { settings: UserSettings, setSettings: (s: UserSettings) => void }) => {
  return (
    <div className="px-6 md:px-12 py-8 min-h-screen max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold dark:text-white mb-8">Settings</h2>
      
      <div className="space-y-6">
        {/* API Key */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
          <h3 className="text-lg font-semibold dark:text-white mb-4">TMDB Configuration</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">API Key (v3 auth)</label>
            <input 
              type="text" 
              value={settings.tmdbApiKey} 
              onChange={(e) => setSettings({...settings, tmdbApiKey: e.target.value})}
              placeholder="Enter TMDB API Key"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <p className="text-xs text-gray-500">
              Required to fetch movie metadata. Get one at <a href="https://www.themoviedb.org/" target="_blank" className="text-brand-500 underline">themoviedb.org</a>.
            </p>
          </div>
        </div>

        {/* Jamendo API Key */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Jamendo Configuration</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Client ID</label>
            <input 
              type="text" 
              value={settings.jamendoApiKey} 
              onChange={(e) => setSettings({...settings, jamendoApiKey: e.target.value})}
              placeholder="Enter Jamendo Client ID"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/20 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <p className="text-xs text-gray-500">
              Stream royalty-free music. Get one at <a href="https://devportal.jamendo.com/" target="_blank" className="text-brand-500 underline">devportal.jamendo.com</a>.
            </p>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button 
              onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${settings.darkMode ? 'bg-brand-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition duration-200 ${settings.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Account (Mock) */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Profile</h3>
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Username</label>
             <input 
              type="text" 
              value={settings.username} 
              onChange={(e) => setSettings({...settings, username: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/20 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Statistics Page
const StatsPage = ({ tracks }: { tracks: AudioTrack[] }) => {
  const totalPlays = tracks.reduce((sum, t) => sum + (t.playCount || 0), 0);
  const totalTracks = tracks.length;
  const favoritesCount = tracks.filter(t => t.isFavorite).length;
  
  const topTracks = [...tracks]
    .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
    .slice(0, 10);
  
  const artistPlayCounts = tracks.reduce((acc, t) => {
    acc[t.artist] = (acc[t.artist] || 0) + (t.playCount || 0);
    return acc;
  }, {} as Record<string, number>);
  
  const topArtists = Object.entries(artistPlayCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const recentlyPlayed = [...tracks]
    .filter(t => t.lastPlayed)
    .sort((a, b) => (b.lastPlayed || 0) - (a.lastPlayed || 0))
    .slice(0, 10);

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
      <h2 className="text-3xl font-bold dark:text-white mb-8">Music Statistics</h2>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-brand-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Plays</p>
              <p className="text-3xl font-bold">{totalPlays}</p>
            </div>
            <Play size={40} className="opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Tracks</p>
              <p className="text-3xl font-bold">{totalTracks}</p>
            </div>
            <Music size={40} className="opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Favorites</p>
              <p className="text-3xl font-bold">{favoritesCount}</p>
            </div>
            <Heart size={40} className="opacity-50" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tracks */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-6">
          <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center">
            <TrendingUp size={24} className="mr-2 text-brand-500" />
            Top Tracks
          </h3>
          <div className="space-y-3">
            {topTracks.length > 0 ? topTracks.map((track, i) => (
              <div key={track.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 w-8">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium dark:text-white truncate">{track.title}</p>
                  <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                </div>
                <span className="text-sm font-medium text-brand-500">{track.playCount || 0} plays</span>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No listening data yet</p>
            )}
          </div>
        </div>

        {/* Top Artists */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-6">
          <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center">
            <BarChart3 size={24} className="mr-2 text-brand-500" />
            Top Artists
          </h3>
          <div className="space-y-3">
            {topArtists.length > 0 ? topArtists.map(([artist, plays], i) => (
              <div key={artist} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 w-8">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium dark:text-white truncate">{artist}</p>
                </div>
                <span className="text-sm font-medium text-brand-500">{plays} plays</span>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No artist data yet</p>
            )}
          </div>
        </div>

        {/* Recently Played */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-6 lg:col-span-2">
          <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center">
            <Clock size={24} className="mr-2 text-brand-500" />
            Recently Played
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentlyPlayed.length > 0 ? recentlyPlayed.map(track => (
              <div key={track.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <Play size={16} className="text-brand-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium dark:text-white truncate">{track.title}</p>
                  <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {track.lastPlayed ? new Date(track.lastPlayed).toLocaleDateString() : ''}
                </span>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4 col-span-2">No listening history yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Movies Page
const MoviesPage = ({ 
  settings, 
  favorites, 
  toggleFavorite,
  onOpenDetails
}: { 
  settings: UserSettings, 
  favorites: MediaItem[], 
  toggleFavorite: (m: MediaItem) => void,
  onOpenDetails: (m: MediaItem) => void
}) => {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!settings.tmdbApiKey) {
        setMovies([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${settings.tmdbApiKey}`);
        const data = await response.json();
        setMovies(data.results.map((m: any) => ({ ...m, media_type: 'movie' as const })));
      } catch (error) {
        console.error('Failed to fetch movies', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [settings.tmdbApiKey]);

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
      <h2 className="text-3xl font-bold dark:text-white mb-8 flex items-center">
        <Film className="mr-3 text-brand-500" size={36} />
        Popular Movies
      </h2>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !settings.tmdbApiKey ? (
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-12 text-center">
          <Film size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-xl font-medium dark:text-white mb-2">TMDB API Key Required</p>
          <p className="text-gray-500 mb-4">Please add your TMDB API key in settings to browse movies.</p>
          <Link to="/settings" className="inline-block px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition">
            Go to Settings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MediaCard 
              key={movie.id}
              item={movie}
              isFavorite={favorites.some(f => f.id === movie.id)}
              onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(movie); }}
              onClick={() => onOpenDetails(movie)}
              onPlay={(e) => {
                e.stopPropagation();
                window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// TV Series Page
const SeriesPage = ({ 
  settings, 
  favorites, 
  toggleFavorite,
  onOpenDetails
}: { 
  settings: UserSettings, 
  favorites: MediaItem[], 
  toggleFavorite: (m: MediaItem) => void,
  onOpenDetails: (m: MediaItem) => void
}) => {
  const [series, setSeries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      if (!settings.tmdbApiKey) {
        setSeries([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${settings.tmdbApiKey}`);
        const data = await response.json();
        setSeries(data.results.map((s: any) => ({ ...s, media_type: 'tv' as const })));
      } catch (error) {
        console.error('Failed to fetch series', error);
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, [settings.tmdbApiKey]);

  return (
    <div className="px-6 md:px-12 py-8 pb-24 min-h-screen animate-fade-in">
      <h2 className="text-3xl font-bold dark:text-white mb-8 flex items-center">
        <Tv className="mr-3 text-brand-500" size={36} />
        Popular TV Series
      </h2>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !settings.tmdbApiKey ? (
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-12 text-center">
          <Tv size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-xl font-medium dark:text-white mb-2">TMDB API Key Required</p>
          <p className="text-gray-500 mb-4">Please add your TMDB API key in settings to browse TV series.</p>
          <Link to="/settings" className="inline-block px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition">
            Go to Settings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {series.map(show => (
            <MediaCard 
              key={show.id}
              item={show}
              isFavorite={favorites.some(f => f.id === show.id)}
              onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(show); }}
              onClick={() => onOpenDetails(show)}
              onPlay={(e) => {
                e.stopPropagation();
                window.open(`https://www.themoviedb.org/tv/${show.id}`, '_blank');
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main App Logic ---

function App() {
  // --- State ---
  const [settings, setSettings] = usePersistedState<UserSettings>('epikodi_settings', {
    tmdbApiKey: '',
    jamendoApiKey: '',
    darkMode: true,
    username: 'Guest User'
  });

  const [favorites, setFavorites] = usePersistedState<MediaItem[]>('epikodi_favorites', []);
  const [history, setHistory] = usePersistedState<MediaItem[]>('epikodi_history', []);
  const [playlists, setPlaylists] = usePersistedState<Playlist[]>('epikodi_playlists', []);

  // Music State - now persisted with metadata
  const [libraryTracks, setLibraryTracks] = usePersistedState<AudioTrack[]>('epikodi_library', []);
  const [queue, setQueue] = useState<AudioTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  
  // Player Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // UI State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const location = useLocation();

  // --- Effects ---
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Track play count and history
  useEffect(() => {
    const currentTrack = queue[currentTrackIndex];
    if (isPlaying && currentTrack) {
      setLibraryTracks(prev => prev.map(t => 
        t.id === currentTrack.id 
          ? { ...t, playCount: (t.playCount || 0) + 1, lastPlayed: Date.now() }
          : t
      ));
    }
  }, [currentTrackIndex, isPlaying]);

  // --- Handlers ---
  
  // Media Handlers

  const toggleFavorite = (item: MediaItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === item.id)) {
        return prev.filter(f => f.id !== item.id);
      }
      return [item, ...prev];
    });
  };

  const handleOpenDetails = (item: MediaItem) => {
      setSelectedMedia(item);
      // Add to History (avoid duplicates at top)
      setHistory(prev => {
          const filtered = prev.filter(h => h.id !== item.id);
          return [item, ...filtered].slice(0, 50); // Keep last 50
      });
  };

  // Music Handlers
  const handleAddTracks = async (files: FileList) => {
    const newTracksPromises = Array.from(files).map(async (file) => {
      // Extract metadata
      const metadata = await extractMetadataFromFile(file);
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: metadata.artist || 'Unknown Artist',
        album: 'Unknown Album',
        duration: 0,
        url: URL.createObjectURL(file),
        genre: metadata.genre,
        artistThumb: metadata.artistThumb,
        playCount: 0,
        isFavorite: false
      } as AudioTrack;
    });
    
    const newTracks = await Promise.all(newTracksPromises);
    setLibraryTracks(prev => [...prev, ...newTracks]);
  };

  const handleRemoveTrack = (id: string) => {
    setLibraryTracks(prev => prev.filter(t => t.id !== id));
    if (queue[currentTrackIndex]?.id === id) {
      setIsPlaying(false);
    }
  };

  const toggleFavoriteTrack = (trackId: string) => {
    setLibraryTracks(prev => prev.map(t => 
      t.id === trackId ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const playTrackInLibrary = (track: AudioTrack) => {
      setQueue(libraryTracks);
      const index = libraryTracks.findIndex(t => t.id === track.id);
      setCurrentTrackIndex(index);
      setIsPlaying(true);
  };

  const playPlaylist = (playlist: Playlist) => {
      const tracks = playlist.trackIds
        .map(tid => libraryTracks.find(t => t.id === tid))
        .filter((t): t is AudioTrack => !!t);
      
      if (tracks.length > 0) {
          setQueue(tracks);
          setCurrentTrackIndex(0);
          setIsPlaying(true);
      }
  };

  // Playlist Management
  const createPlaylist = (name: string) => {
      const newPlaylist: Playlist = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          trackIds: [],
          createdAt: Date.now()
      };
      setPlaylists(prev => [newPlaylist, ...prev]);
  };

  const deletePlaylist = (id: string) => {
      setPlaylists(prev => prev.filter(p => p.id !== id));
  };

  const addToPlaylist = (trackId: string, playlistId: string) => {
      setPlaylists(prev => prev.map(p => {
          if (p.id === playlistId && !p.trackIds.includes(trackId)) {
              return { ...p, trackIds: [...p.trackIds, trackId] };
          }
          return p;
      }));
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
      setPlaylists(prev => prev.map(p => {
          if (p.id === playlistId) {
              return { ...p, trackIds: p.trackIds.filter(id => id !== trackId) };
          }
          return p;
      }));
  };

  // Player Control Logic
  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    if (isShuffle) {
       setCurrentTrackIndex(Math.floor(Math.random() * queue.length));
    } else {
       setCurrentTrackIndex((prev) => (prev + 1) % queue.length);
    }
  }, [queue.length, isShuffle]);

  const handlePrev = () => {
    if (queue.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + queue.length) % queue.length);
  };

  // Jamendo Handlers
  const handlePlayJamendoTrack = (track: AudioTrack) => {
    // Ajouter automatiquement à la bibliothèque si pas déjà présent
    if (!libraryTracks.some(t => t.id === track.id)) {
      setLibraryTracks(prev => [...prev, track]);
    }
    // Jouer le morceau
    setQueue([track]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  const handleAddJamendoToLibrary = (track: AudioTrack) => {
    // Check if already in library
    if (libraryTracks.some(t => t.id === track.id)) {
      alert('Track already in library!');
      return;
    }
    setLibraryTracks(prev => [...prev, track]);
    alert(`Added "${track.title}" to your library!`);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 overflow-hidden font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent">
            Epikodi
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          <div className="pb-4">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Discover</p>
            <SidebarItem to="/" icon={Home} label="Home" active={location.pathname === '/'} />
            <SidebarItem to="/movies" icon={Film} label="Movies" active={location.pathname === '/movies'} />
            <SidebarItem to="/series" icon={Tv} label="TV Series" active={location.pathname === '/series'} />
            <SidebarItem to="/search" icon={Search} label="Search" active={location.pathname === '/search'} />
          </div>

          <div className="pb-4">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Library</p>
            <SidebarItem to="/favorites" icon={Heart} label="Favorites" active={location.pathname === '/favorites'} />
            <SidebarItem to="/history" icon={History} label="History" active={location.pathname === '/history'} />
          </div>
          
          <div className="pb-4">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Music</p>
            <SidebarItem to="/music" icon={Music} label="All Tracks" active={location.pathname === '/music'} />
            <SidebarItem to="/jamendo" icon={Radio} label="Free Music" active={location.pathname === '/jamendo'} />
            <SidebarItem to="/playlists" icon={List} label="Playlists" active={location.pathname.startsWith('/playlists')} />
            <SidebarItem to="/stats" icon={BarChart3} label="Statistics" active={location.pathname === '/stats'} />
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
             <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              {settings.username.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{settings.username}</p>
              <p className="text-xs text-gray-500 truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border z-30 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent">
            Epikodi
        </h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
           {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-dark-surface z-20 overflow-y-auto pb-20 animate-fade-in">
           <nav className="p-4 space-y-2">
            <SidebarItem to="/" icon={Home} label="Home" active={location.pathname === '/'} />
            <SidebarItem to="/movies" icon={Film} label="Movies" active={location.pathname === '/movies'} />
            <SidebarItem to="/series" icon={Tv} label="TV Series" active={location.pathname === '/series'} />
            <SidebarItem to="/search" icon={Search} label="Search" active={location.pathname === '/search'} />
            <SidebarItem to="/favorites" icon={Heart} label="Favorites" active={location.pathname === '/favorites'} />
            <SidebarItem to="/history" icon={History} label="History" active={location.pathname === '/history'} />
            <SidebarItem to="/music" icon={Music} label="Music" active={location.pathname === '/music'} />
            <SidebarItem to="/jamendo" icon={Radio} label="Free Music" active={location.pathname === '/jamendo'} />
            <SidebarItem to="/playlists" icon={List} label="Playlists" active={location.pathname.startsWith('/playlists')} />
            <SidebarItem to="/stats" icon={BarChart3} label="Statistics" active={location.pathname === '/stats'} />
            <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0" onClick={() => setMobileMenuOpen(false)}>
        <Routes>
          <Route path="/" element={
            <HomePage 
              settings={settings} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
              onOpenDetails={handleOpenDetails}
            />
          } />
          <Route path="/search" element={
            <LibraryPage 
              settings={settings} 
              favorites={favorites}
              history={history}
              toggleFavorite={toggleFavorite} 
              onOpenDetails={handleOpenDetails}
              filter="search"
            />
          } />
          <Route path="/favorites" element={
            <LibraryPage 
              settings={settings} 
              favorites={favorites} 
              history={history}
              toggleFavorite={toggleFavorite} 
              onOpenDetails={handleOpenDetails}
              filter="favorites"
            />
          } />
          <Route path="/history" element={
            <LibraryPage 
              settings={settings} 
              favorites={favorites}
              history={history} 
              toggleFavorite={toggleFavorite} 
              onOpenDetails={handleOpenDetails}
              filter="history"
            />
          } />
          <Route path="/music" element={
            <MusicPage 
               tracks={libraryTracks} 
               playlists={playlists}
               addTracks={handleAddTracks}
               removeTrack={handleRemoveTrack}
               playTrack={playTrackInLibrary}
               addToPlaylist={addToPlaylist}
               toggleFavoriteTrack={toggleFavoriteTrack}
               currentTrackId={queue[currentTrackIndex]?.id}
               isPlaying={isPlaying}
            />
          } />
          <Route path="/jamendo" element={
            <JamendoPage 
              settings={settings}
              onPlayJamendoTrack={handlePlayJamendoTrack}
              onAddToLibrary={handleAddJamendoToLibrary}
            />
          } />
          <Route path="/movies" element={
            <MoviesPage 
              settings={settings} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onOpenDetails={handleOpenDetails}
            />
          } />
          <Route path="/series" element={
            <SeriesPage 
              settings={settings} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onOpenDetails={handleOpenDetails}
            />
          } />
          <Route path="/stats" element={
            <StatsPage tracks={libraryTracks} />
          } />
          <Route path="/playlists" element={
             <PlaylistsPage 
                playlists={playlists}
                onCreatePlaylist={createPlaylist}
             />
          } />
          <Route path="/playlists/:id" element={
              <PlaylistDetailsPage 
                 playlists={playlists}
                 libraryTracks={libraryTracks}
                 playPlaylist={playPlaylist}
                 deletePlaylist={deletePlaylist}
                 removeTrackFromPlaylist={removeTrackFromPlaylist}
              />
          } />
          <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Details Modal */}
      <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
         {selectedMedia && (
           <div className="relative">
             <div className="h-64 md:h-96 w-full rounded-t-xl overflow-hidden relative">
               <img 
                 src={getImageUrl(selectedMedia.backdrop_path, 'original')} 
                 className="w-full h-full object-cover" 
                 alt="Backdrop"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-surface to-transparent" />
             </div>
             <div className="p-6 md:p-8 -mt-20 relative">
               <div className="flex flex-col md:flex-row gap-6">
                 <img 
                   src={getImageUrl(selectedMedia.poster_path)} 
                   className="w-32 md:w-48 rounded-lg shadow-xl" 
                   alt="Poster"
                 />
                 <div className="flex-1">
                   <h2 className="text-3xl font-bold dark:text-white mb-2">
                     {'title' in selectedMedia ? selectedMedia.title : selectedMedia.name}
                   </h2>
                   <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{selectedMedia.vote_average?.toFixed(1)} Rating</span>
                      <span>•</span>
                      <span>{'release_date' in selectedMedia ? selectedMedia.release_date : selectedMedia.first_air_date}</span>
                      <span>•</span>
                      <span className="uppercase">{selectedMedia.media_type}</span>
                   </div>
                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                     {selectedMedia.overview || "No overview available."}
                   </p>
                   
                   <div className="flex space-x-3">
                     <button 
                       onClick={() => toggleFavorite(selectedMedia)}
                       className={`flex-1 py-3 rounded-lg font-bold flex justify-center items-center space-x-2 transition ${
                         favorites.some(f => f.id === selectedMedia.id) 
                         ? 'bg-red-500 text-white hover:bg-red-600' 
                         : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                       }`}
                     >
                        <Heart size={20} fill={favorites.some(f => f.id === selectedMedia.id) ? "currentColor" : "none"} />
                        <span>{favorites.some(f => f.id === selectedMedia.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                     </button>
                   </div>

                   {/* Watch on Platform Button */}
                   <button 
                     onClick={() => {
                       const mediaType = selectedMedia.media_type === 'tv' ? 'tv' : 'movie';
                       window.open(`https://www.themoviedb.org/${mediaType}/${selectedMedia.id}/watch`, '_blank');
                     }}
                     className="w-full mt-3 py-3 rounded-lg font-bold flex justify-center items-center space-x-2 bg-brand-500 text-white hover:bg-brand-600 transition"
                   >
                     <Play size={20} />
                     <span>Watch on Streaming Platforms</span>
                   </button>
                 </div>
               </div>
             </div>
           </div>
         )}
      </Modal>

      {/* Sticky Player */}
      <AudioPlayer 
        currentTrack={queue[currentTrackIndex] || null}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
        isShuffle={isShuffle}
        toggleShuffle={() => setIsShuffle(!isShuffle)}
        isRepeat={isRepeat}
        toggleRepeat={() => setIsRepeat(!isRepeat)}
      />
    </div>
  );
}

// Wrapper to provide Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;