"use client"

import Link from "next/link"
import { useState } from "react"

type Track = {
  id: number
  title: string
  artist: string
  album?: string
  url: string
  createdAt: string
  cover?: string
  genre?: string
  year?: number
}

export default function TrackItem({ track, onDelete, onQueue }: {
  track: Track,
  onDelete?: (id: number) => void,
  onQueue?: (id: number) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative group">
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
      <button
        className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600"
        onClick={() => setMenuOpen((v) => !v)}
        type="button"
      >
        ⋮
      </button>
      {menuOpen && (
        <div className="absolute right-2 top-10 bg-gray-900 rounded shadow z-10 flex flex-col min-w-[120px]">
          <button
            className="px-4 py-2 text-left hover:bg-red-600 hover:text-white"
            onClick={() => {
              setMenuOpen(false)
              onDelete?.(track.id)
            }}
          >
            Supprimer
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-blue-600 hover:text-white"
            onClick={() => {
              setMenuOpen(false)
              onQueue?.(track.id)
            }}
          >
            Mettre en file d’attente
          </button>
        </div>
      )}
    </div>
  )
}
