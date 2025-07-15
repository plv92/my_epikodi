"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Track = {
  id: number
  title: string
  artist: string
  album?: string
  url: string
  createdAt: string
}

export default function TrackItem({ track }: { track: Track }) {
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    const fetchTracks = async () => {
      const res = await fetch("/api/tracks")
      const data = await res.json()
      setTracks(data)
    }
    fetchTracks()
  }, [])

  return (
    <Link
      href={`/musique/${track.id}`}
      className="block cursor-pointer bg-gray-700 hover:bg-kodi-blue/80 transition rounded p-4 flex flex-col gap-1 shadow"
      title="Voir le détail"
    >
      <div className="font-semibold text-lg">{track.title}</div>
      <div className="text-sm text-gray-300">
        {track.artist}
        {track.album && (
          <>
            {" "}
            —{" "}
            <span className="italic" aria-hidden="true">
              {track.album}
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
