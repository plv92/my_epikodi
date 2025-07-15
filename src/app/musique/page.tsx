"use client"

import { useEffect, useState } from "react"
import TrackItem from "@/components/TrackItem"

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

type DeezerTrack = {
  id: number
  title: string
  artist: { name: string }
  album: { title: string, cover_medium: string }
  preview: string // extrait mp3 30s
}

export default function MusiquePage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [deezerTracks, setDeezerTracks] = useState<DeezerTrack[]>([])

  // Suppression d'un morceau
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce morceau ?")) return
    const res = await fetch(`/api/tracks/${id}`, { method: "DELETE" })
    if (res.ok) setTracks(tracks => tracks.filter(t => t.id !== id))
    else alert("Erreur lors de la suppression")
  }

  useEffect(() => {
    // Fetch local tracks
    fetch("/api/tracks")
      .then(res => res.json())
      .then(setTracks)
    // Fetch Deezer world hits
    fetch("/api/world-hits")
      .then(res => res.json())
      .then(setDeezerTracks)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-kodi-blue/40 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-white drop-shadow">🎵 Ma musique</h2>
          <a
            href="/musique/ajouter"
            className="bg-kodi-blue hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            + Ajouter un morceau
          </a>
        </div>

        {/* Section locale */}
        <h3 className="text-xl font-bold text-white mb-4">Mes morceaux</h3>
        {tracks.length === 0 ? (
          <p className="text-gray-400 text-center">Aucun morceau trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {tracks.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                onDelete={handleDelete}
                onQueue={id => alert("À implémenter : ajout à la file d’attente")}
              />
            ))}
          </div>
        )}

        {/* Section mondiale Deezer */}
        <h3 className="text-xl font-bold text-white mb-4 mt-10">Top mondial Deezer</h3>
        {deezerTracks.length === 0 ? (
          <p className="text-gray-400 text-center">Chargement des hits Deezer...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {deezerTracks.slice(0, 10).map((track) => (
              <a
                key={track.id}
                href={`https://www.deezer.com/track/${track.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 rounded p-4 flex flex-col gap-1 shadow hover:bg-kodi-blue/80 transition cursor-pointer"
                title="Écouter sur Deezer"
              >
                {track.album.cover_medium ? (
                  <img src={track.album.cover_medium} alt="cover" className="w-32 h-32 object-cover rounded mb-2 mx-auto" />
                ) : (
                  <div className="w-32 h-32 bg-gray-600 rounded mb-2 mx-auto flex items-center justify-center text-gray-400">Pas de cover</div>
                )}
                <div className="font-semibold text-lg">{track.title}</div>
                <div className="text-sm text-gray-300">{track.artist.name} — <span className="italic">{track.album.title}</span></div>
                <audio controls src={track.preview} className="w-full mt-2" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
