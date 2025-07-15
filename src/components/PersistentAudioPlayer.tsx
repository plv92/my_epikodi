"use client"

import { useAudio } from "@/context/AudioContext"
import { useState, useEffect } from "react"

export default function PersistentAudioPlayer() {
  const { currentTrack, isPlaying, play, pause, seek, progress, duration } = useAudio()
  const [seeking, setSeeking] = useState(false)
  const [seekValue, setSeekValue] = useState(0)

  useEffect(() => {
    if (!seeking) setSeekValue(progress)
  }, [progress, seeking])

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 border-t border-gray-800 shadow-lg flex items-center px-4 py-2">
      {/* Cover */}
      <img
        src={currentTrack.cover || "/default-cover.png"}
        alt="cover"
        className="w-16 h-16 object-cover rounded shadow mr-4"
      />
      {/* Infos */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="truncate font-semibold text-lg">{currentTrack.title}</div>
        <div className="truncate text-gray-300 text-sm">{currentTrack.artist}{currentTrack.album && <> — <span className="italic">{currentTrack.album}</span></>}</div>
        {/* Barre de progression */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400 w-10 text-right">{formatTime(seekValue)}</span>
          <input
            type="range"
            min={0}
            max={duration || 1}
            value={seeking ? seekValue : progress}
            onChange={e => {
              setSeekValue(Number(e.target.value))
              setSeeking(true)
            }}
            onMouseUp={e => {
              seek(Number((e.target as HTMLInputElement).value))
              setSeeking(false)
            }}
            onTouchEnd={e => {
              seek(seekValue)
              setSeeking(false)
            }}
            className="flex-1 accent-kodi-blue"
          />
          <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>
      {/* Contrôles */}
      <div className="flex items-center gap-2 ml-4">
        <button onClick={pause} className="p-2 hover:bg-gray-700 rounded-full">
          <svg width="20" height="20" fill="currentColor"><rect x="6" y="5" width="5" height="18"/><rect x="17" y="5" width="5" height="18"/></svg>
        </button>
        <button
          onClick={isPlaying ? pause : play}
          className="p-3 bg-kodi-blue hover:bg-blue-700 rounded-full text-white mx-1"
        >
          {isPlaying ? (
            <svg width="28" height="28" fill="currentColor"><rect x="6" y="5" width="5" height="18"/><rect x="17" y="5" width="5" height="18"/></svg>
          ) : (
            <svg width="28" height="28" fill="currentColor"><polygon points="5,3 25,14 5,25"/></svg>
          )}
        </button>
        <button onClick={play} className="p-2 hover:bg-gray-700 rounded-full">
          <svg width="20" height="20" fill="currentColor"><polygon points="5,3 25,14 5,25"/></svg>
        </button>
      </div>
    </div>
  )
}

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}
