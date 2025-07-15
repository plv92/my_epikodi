"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Track = {
  id?: number;
  title: string;
  artist: string;
  album?: string;
  cover?: string;
  url: string;
};

type AudioContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  progress: number;
  duration: number;
  queue: Track[];
  addToQueue: (track: Track) => void;
  next: () => void;
  removeFromQueue: (index: number) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 0);
  };

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };
  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };
  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // Ajoute à la file d'attente
  const addToQueue = (track: Track) => {
    setQueue((q) => [...q, track]);
  };

  // Retire un morceau de la file d'attente
  const removeFromQueue = (index: number) => {
    setQueue((q) => q.filter((_, i) => i !== index));
  };

  // Passe au morceau suivant dans la file d'attente
  const next = () => {
    if (queue.length > 0) {
      const [nextTrack, ...rest] = queue;
      setCurrentTrack(nextTrack);
      setQueue(rest);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    } else {
      setIsPlaying(false);
    }
  };

  // Gestion de la progression
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("ended", next);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("ended", next);
    };
  }, [queue, currentTrack]);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        play,
        pause,
        seek,
        progress,
        duration,
        queue,
        addToQueue,
        next,
        removeFromQueue,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        autoPlay={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
