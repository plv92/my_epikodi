"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"

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

export default function TrackItem({
  track,
  onDelete,
  onQueue,
  onPlay,
}: {
  track: Track,
  onDelete?: (id: number) => void,
  onQueue?: (id: number) => void,
  onPlay?: (track: Track) => void,
}) {
  const [menu, setMenu] = useState<{ x: number, y: number } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    if (!menu) return
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(null)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [menu])

  return (
    <div
      className="relative group"
      onContextMenu={e => {
        e.preventDefault()
        setMenu({ x: e.clientX, y: e.clientY })
      }}
    >
      <div className="flex gap-4 items-center">
        {track.cover ? (
          <img
            src={track.cover}
            alt="cover"
            className="w-20 h-20 object-cover rounded cursor-pointer hover:scale-105 transition"
            onClick={e => {
              e.stopPropagation()
              onPlay?.(track)
            }}
            title="Écouter"
          />
        ) : (
          <div
            className="w-20 h-20 bg-gray-600 rounded flex items-center justify-center text-gray-400 cursor-pointer"
            onClick={e => {
              e.stopPropagation()
              onPlay?.(track)
            }}
            title="Écouter"
          >
            🎵
          </div>
        )}
        <div className="flex-1">
          <Link
            href={`/musique/${track.id}`}
            className="block cursor-pointer hover:underline"
            title="Voir le détail"
          >
            <div className="font-semibold text-lg">{track.title}</div>
            <div className="text-sm text-gray-300">
              {track.artist}
              {track.album && <> — <span className="italic">{track.album}</span></>}
            </div>
          </Link>
        </div>
        {/* ...menu bouton ⋮ ici si besoin... */}
      </div>
      {/* ...menu d'actions ici si besoin... */}
      {menu && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: menu.y, left: menu.x, zIndex: 50 }}
          className="bg-gray-900 border border-gray-700 rounded shadow flex flex-col min-w-[160px]"
        >
          <button
            className="px-4 py-2 text-left hover:bg-red-600 hover:text-white"
            onClick={() => { setMenu(null); onDelete?.(track.id) }}
          >Supprimer</button>
          <button
            className="px-4 py-2 text-left hover:bg-blue-600 hover:text-white"
            onClick={() => { setMenu(null); onQueue?.(track.id) }}
          >Ajouter à la file d’attente</button>
        </div>
      )}
    </div>
  )
}
