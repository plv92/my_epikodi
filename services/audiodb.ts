// TheAudioDB API service for fetching music metadata
// API Key: 523532 (public test key)

const AUDIO_DB_BASE_URL = 'https://www.theaudiodb.com/api/v1/json/523532';

export interface AudioMetadata {
  artist?: string;
  album?: string;
  genre?: string;
  year?: string;
  artistThumb?: string;
  albumThumb?: string;
  artistBio?: string;
}

export const searchArtist = async (artistName: string): Promise<AudioMetadata | null> => {
  if (!artistName || artistName === 'Unknown Artist') return null;
  
  try {
    const response = await fetch(`${AUDIO_DB_BASE_URL}/search.php?s=${encodeURIComponent(artistName)}`);
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.artists && data.artists.length > 0) {
      const artist = data.artists[0];
      return {
        artist: artist.strArtist,
        genre: artist.strGenre,
        artistThumb: artist.strArtistThumb,
        artistBio: artist.strBiographyEN
      };
    }
    return null;
  } catch (error) {
    console.error('AudioDB fetch error:', error);
    return null;
  }
};

export const searchAlbum = async (artistName: string, albumName: string): Promise<AudioMetadata | null> => {
  if (!artistName || !albumName) return null;
  
  try {
    const response = await fetch(`${AUDIO_DB_BASE_URL}/searchalbum.php?s=${encodeURIComponent(artistName)}&a=${encodeURIComponent(albumName)}`);
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.album && data.album.length > 0) {
      const album = data.album[0];
      return {
        artist: album.strArtist,
        album: album.strAlbum,
        genre: album.strGenre,
        year: album.intYearReleased,
        albumThumb: album.strAlbumThumb
      };
    }
    return null;
  } catch (error) {
    console.error('AudioDB album fetch error:', error);
    return null;
  }
};

export const extractMetadataFromFile = async (file: File): Promise<Partial<AudioMetadata>> => {
  // Extract metadata from filename patterns
  // Common patterns: "Artist - Song.mp3", "Song - Artist.mp3"
  const filename = file.name.replace(/\.[^/.]+$/, '');
  
  let artist = 'Unknown Artist';
  let title = filename;
  
  if (filename.includes(' - ')) {
    const parts = filename.split(' - ');
    if (parts.length >= 2) {
      artist = parts[0].trim();
      title = parts[1].trim();
    }
  }
  
  // Try to fetch additional metadata from TheAudioDB
  const metadata = await searchArtist(artist);
  
  return {
    artist: metadata?.artist || artist,
    genre: metadata?.genre,
    artistThumb: metadata?.artistThumb
  };
};
