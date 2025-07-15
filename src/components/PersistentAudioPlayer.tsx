"use client"

import { useAudio } from "@/context/AudioContext"

export default function PersistentAudioPlayer() {
  const { currentTrack } = useAudio()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 text-white p-4 z-50">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{currentTrack.title}</div>
          <div className="text-sm text-gray-400">{currentTrack.artist}</div>
        </div>
        <audio controls autoPlay src={currentTrack.url} className="w-96" />
      </div>
    </div>
  )
}
