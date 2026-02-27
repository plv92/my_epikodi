import React from 'react';
import { Heart, Star, PlayCircle, Play } from 'lucide-react';
import { MediaItem } from '../types';
import { getImageUrl } from '../services/tmdb';

interface MediaCardProps {
  item: MediaItem;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
  onPlay?: (e: React.MouseEvent) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ 
  item, 
  isFavorite, 
  onToggleFavorite, 
  onClick,
  onPlay 
}) => {
  const title = 'title' in item ? item.title : item.name;
  const year = 'release_date' in item 
    ? item.release_date?.split('-')[0] 
    : item.first_air_date?.split('-')[0];

  return (
    <div 
      className="group relative bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={getImageUrl(item.poster_path)} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {onPlay ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(e);
                }}
                className="w-16 h-16 rounded-full bg-brand-500 hover:bg-brand-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl"
              >
                <Play size={28} className="text-white ml-1" fill="white" />
              </button>
            ) : (
              <PlayCircle size={48} className="text-brand-500" fill="white" />
            )}
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button 
             onClick={onToggleFavorite}
             className={`p-2 rounded-full backdrop-blur-sm ${isFavorite ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-red-500'}`}
           >
             <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
           </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm md:text-base" title={title}>
          {title}
        </h3>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{year || 'N/A'}</span>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            <span>{item.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
