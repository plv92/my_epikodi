// Jamendo API service for royalty-free music
// Get your API key at: https://devportal.jamendo.com/

const JAMENDO_BASE_URL = 'https://api.jamendo.com/v3.0';

export interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  audio: string;
  audiodownload: string;
  image: string;
  album_image: string;
  releasedate: string;
  license_ccurl: string;
}

export interface JamendoSearchResult {
  tracks: JamendoTrack[];
  total: number;
}

export const searchJamendoTracks = async (
  apiKey: string, 
  query: string = '', 
  limit: number = 20
): Promise<any[]> => {
  if (!apiKey) {
    console.warn('Jamendo API key not configured');
    return [];
  }

  try {
    const params = new URLSearchParams({
      client_id: apiKey,
      format: 'json',
      limit: limit.toString(),
      audioformat: 'mp32',
      include: 'musicinfo',
      ...(query && { search: query })
    });

    const response = await fetch(
      `${JAMENDO_BASE_URL}/tracks/?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Jamendo API error:', response.status, errorText);
      throw new Error(`Failed to fetch tracks: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Jamendo search results:', data);
    const tracks = (data.results || []).map(convertJamendoToAudioTrack);
    return tracks;
  } catch (error) {
    console.error('Jamendo API error:', error);
    return [];
  }
};

export const getJamendoPopularTracks = async (
  apiKey: string,
  limit: number = 30
): Promise<any[]> => {
  if (!apiKey) return [];

  try {
    const params = new URLSearchParams({
      client_id: apiKey,
      format: 'json',
      limit: limit.toString(),
      audioformat: 'mp32',
      include: 'musicinfo',
      order: 'popularity_month'
    });

    const response = await fetch(
      `${JAMENDO_BASE_URL}/tracks/?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Jamendo API error:', response.status, errorText);
      throw new Error(`Failed to fetch popular tracks: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Jamendo popular tracks:', data);
    const tracks = (data.results || []).map(convertJamendoToAudioTrack);
    return tracks;
  } catch (error) {
    console.error('Jamendo API error:', error);
    return [];
  }
};

export const getJamendoTracksByTag = async (
  apiKey: string,
  tags: string[], // e.g., ['rock', 'electronic', 'jazz']
  limit: number = 20
): Promise<any[]> => {
  if (!apiKey) return [];

  try {
    const params = new URLSearchParams({
      client_id: apiKey,
      format: 'json',
      limit: limit.toString(),
      audioformat: 'mp32',
      tags: tags.join(','),
      include: 'musicinfo'
    });

    const response = await fetch(
      `${JAMENDO_BASE_URL}/tracks/?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Jamendo API error:', response.status, errorText);
      throw new Error(`Failed to fetch tracks by tag: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Jamendo tracks by tag:', data);
    const tracks = (data.results || []).map(convertJamendoToAudioTrack);
    return tracks;
  } catch (error) {
    console.error('Jamendo API error:', error);
    return [];
  }
};

export const convertJamendoToAudioTrack = (jamendoTrack: any) => {
  return {
    id: `jamendo-${jamendoTrack.id}`,
    title: jamendoTrack.name || 'Unknown Title',
    artist: jamendoTrack.artist_name || 'Unknown Artist',
    album: jamendoTrack.album_name || 'Unknown Album',
    duration: jamendoTrack.duration || 0,
    url: jamendoTrack.audio || jamendoTrack.audiodownload,
    coverUrl: jamendoTrack.album_image || jamendoTrack.image,
    playCount: 0,
    isFavorite: false,
    isJamendo: true,
    licenseUrl: jamendoTrack.license_ccurl
  };
};
