import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, ListMusic } from 'lucide-react';
import { AudioTrack } from '../types';

interface AudioPlayerProps {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  isShuffle,
  toggleShuffle,
  isRepeat,
  toggleRepeat
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
        if (isRepeat) {
            audio.currentTime = 0;
            audio.play();
        } else {
            onNext();
        }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext, isRepeat]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border px-4 flex items-center justify-between z-50 shadow-lg backdrop-blur-md bg-opacity-90 dark:bg-opacity-95 transition-all duration-300">
      <audio ref={audioRef} src={currentTrack.url} />
      
      {/* Track Info */}
      <div className="flex items-center w-1/4 min-w-[200px]">
        <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-purple-600 rounded-md flex items-center justify-center text-white shadow-md">
            <ListMusic size={24} />
        </div>
        <div className="ml-4 overflow-hidden">
          <h4 className="text-sm font-semibold truncate dark:text-white">{currentTrack.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentTrack.artist || 'Unknown Artist'}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center space-x-6 mb-2">
          <button onClick={toggleShuffle} className={`text-gray-400 hover:text-brand-500 transition ${isShuffle ? 'text-brand-500' : ''}`}>
            <Shuffle size={18} />
          </button>
          <button onClick={onPrev} className="text-gray-800 dark:text-gray-200 hover:text-brand-500">
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button 
            onClick={onPlayPause} 
            className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-lg transform hover:scale-105 transition"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={onNext} className="text-gray-800 dark:text-gray-200 hover:text-brand-500">
            <SkipForward size={24} fill="currentColor" />
          </button>
          <button onClick={toggleRepeat} className={`text-gray-400 hover:text-brand-500 transition ${isRepeat ? 'text-brand-500' : ''}`}>
            <Repeat size={18} />
          </button>
        </div>
        <div className="w-full max-w-md flex items-center text-xs text-gray-400 space-x-2">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-1/4 flex justify-end items-center space-x-2">
        <button onClick={() => setIsMuted(!isMuted)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
      </div>
    </div>
  );
};
