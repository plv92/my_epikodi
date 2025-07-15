"use client"
import { useAudio } from "@/context/AudioContext"

export default function AudioQueueHUD() {
  const { queue, playTrack, removeFromQueue } = useAudio()

  if (queue.length === 0) return null

  return (
    <div className="fixed top-24 right-4 z-50 w-80 bg-gray-900/95 border border-gray-800 rounded-lg shadow-lg p-4">
      <h4 className="text-lg font-bold text-white mb-2">File d’attente</h4>
      <ul className="space-y-2">
        {queue.map((track, i) => (
          <li key={i} className="flex items-center gap-2 bg-gray-800 rounded p-2">
            <img src={track.cover || "/default-cover.png"} alt="" className="w-10 h-10 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <div className="truncate text-white">{track.title}</div>
              <div className="truncate text-xs text-gray-400">{track.artist}</div>
            </div>
            <button
              className="text-kodi-blue hover:underline text-xs"
              onClick={() => playTrack(track)}
              title="Lire ce morceau"
            >Lire</button>
            <button
              className="text-red-400 hover:underline text-xs"
              onClick={() => removeFromQueue(i)}
              title="Retirer de la file"
            >✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}