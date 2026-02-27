export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  media_type: 'movie';
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  media_type: 'tv';
}

export type MediaItem = Movie | TVShow;

export interface AudioTrack {
  id: string;
  file?: File;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  genre?: string;
  year?: string;
  artistThumb?: string;
  albumThumb?: string;
  playCount?: number;
  lastPlayed?: number;
  isFavorite?: boolean;
  isJamendo?: boolean;
  licenseUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackIds: string[]; 
  createdAt: number;
}

export interface ListeningStats {
  totalPlays: number;
  totalListeningTime: number;
  topTracks: { trackId: string; playCount: number }[];
  topArtists: { artist: string; playCount: number }[];
  recentlyPlayed: { trackId: string; timestamp: number }[];
}

export interface UserSettings {
  tmdbApiKey: string;
  jamendoApiKey: string;
  darkMode: boolean;
  username: string;
}
