"use client"
import { Track } from "@/data/tracks"
import { useAudio } from "@/context/AudioContext"

type Props = { track: Track }

export default function TrackItem({ track }: Props) {
  const { playTrack } = useAudio()

  return (
    <div className="p-4 bg-gray-800 rounded mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold">{track.title}</div>
          <div className="text-sm text-gray-400">{track.artist}</div>
        </div>
        <button
          onClick={() => playTrack(track)}
          className="px-4 py-2 bg-kodi-blue hover:bg-blue-700 rounded"
        >
          ▶️ Lire
        </button>
      </div>
    </div>
  )
}
