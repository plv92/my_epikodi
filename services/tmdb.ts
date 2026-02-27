import { MediaItem } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Mock data for when no API key is present
const MOCK_DATA: MediaItem[] = [
  {
    id: 1,
    title: "Demo Movie 1 (No API Key)",
    poster_path: null,
    backdrop_path: null,
    overview: "Please enter a valid TMDB API Key in settings to fetch real data.",
    release_date: "2023-01-01",
    vote_average: 8.5,
    media_type: 'movie'
  },
  {
    id: 2,
    title: "Demo Movie 2",
    poster_path: null,
    backdrop_path: null,
    overview: "This is a placeholder because the API request failed or no key was provided.",
    release_date: "2023-05-15",
    vote_average: 7.2,
    media_type: 'movie'
  }
];

export const fetchTrending = async (apiKey: string): Promise<MediaItem[]> => {
  if (!apiKey) return MOCK_DATA;
  try {
    const response = await fetch(`${BASE_URL}/trending/all/day?api_key=${apiKey}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.results.map((item: any) => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    return MOCK_DATA;
  }
};

export const searchMedia = async (apiKey: string, query: string): Promise<MediaItem[]> => {
  if (!apiKey || !query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search');
    const data = await response.json();
    return data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
  } catch (error) {
    return [];
  }
};
