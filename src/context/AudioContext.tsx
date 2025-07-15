"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Track = {
  title: string
  artist: string
  url: string
}

type AudioContextType = {
  currentTrack: Track | null
  playTrack: (track: Track) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  const playTrack = (track: Track) => {
    setCurrentTrack(track)
  }

  return (
    <AudioContext.Provider value={{ currentTrack, playTrack }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error("useAudio must be used within AudioProvider")
  return ctx
}
