"use client"

import { useEffect, useState } from "react"
import { useAudio } from "@/context/AudioContext"
import TrackItem from "@/components/TrackItem"
import AudioQueueHUD from "@/components/AudioQueueHUD"

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

type JamendoTrack = {
  id: string
  name: string
  artist_name: string
  album_name: string
  audio: string
  album_image: string
}

export default function MusiquePage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [jamendoTracks, setJamendoTracks] = useState<JamendoTrack[]>([])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const { play, pause, isPlaying, volume, setVolume, queue, addToQueue, playTrack } = useAudio();

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
    // Fetch Jamendo world hits
    fetch("/api/world-hits")
      .then(res => res.json())
      .then(setJamendoTracks)
  }, [])

  // Filtrage des morceaux selon la recherche
  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(search.toLowerCase()) ||
    track.artist.toLowerCase().includes(search.toLowerCase()) ||
    (track.album?.toLowerCase().includes(search.toLowerCase()) ?? false)
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return; // ignore si focus sur input
      if (e.code === "Space") {
        e.preventDefault();
        isPlaying ? pause() : play();
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setVolume(Math.min(1, volume + 0.05));
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        setVolume(Math.max(0, volume - 0.05));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, play, pause, volume, setVolume]);

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

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher un titre, artiste ou album..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </div>

        {/* Section locale */}
        <h3 className="text-xl font-bold text-white mb-4">Mes morceaux</h3>
        {filteredTracks.length === 0 ? (
          <p className="text-gray-400 text-center">Aucun morceau trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {filteredTracks.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                onDelete={handleDelete}
                onQueue={id => {
                  const t = tracks.find(t => t.id === id)
                  if (t) addToQueue(t)
                }}
                onPlay={track => play(track)}
              />
            ))}
          </div>
        )}

        {/* Section mondiale Jamendo */}
        <h3 className="text-xl font-bold text-white mb-4 mt-10">Top musiques libres de droits</h3>
        {jamendoTracks.length === 0 ? (
          <p className="text-gray-400 text-center">Chargement des musiques libres...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {jamendoTracks.map((track) => {
              const jamendoAsTrack = {
                id: Number(track.id),
                title: track.name,
                artist: track.artist_name,
                album: track.album_name,
                url: track.audio,
                createdAt: "",
                cover: track.album_image,
                genre: "",
                year: undefined,
              };
              // Vérifie si déjà dans la file
              const isInQueue = queue.some(t => t.url === jamendoAsTrack.url);
              // Vérifie si déjà dans la bibliothèque locale
              const isInLibrary = tracks.some(t => t.url === jamendoAsTrack.url);

              return (
                <div key={track.id} className="bg-gray-700 rounded p-4 flex flex-col gap-1 shadow hover:bg-kodi-blue/80 transition">
                  {track.album_image ? (
                    <img src={track.album_image} alt="cover" className="w-32 h-32 object-cover rounded mb-2 mx-auto" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-600 rounded mb-2 mx-auto flex items-center justify-center text-gray-400">Pas de cover</div>
                  )}
                  <div className="font-semibold text-lg">{track.name}</div>
                  <div className="text-sm text-gray-300">{track.artist_name} — <span className="italic">{track.album_name}</span></div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-kodi-blue text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      onClick={() => playTrack(jamendoAsTrack)}
                    >
                      Écouter
                    </button>
                    <button
                      className={`flex-1 bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-500 ${isInQueue ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={async () => {
                        if (isInLibrary) return;
                        const res = await fetch("/api/tracks", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(jamendoAsTrack),
                        });
                        if (res.ok) {
                          fetch("/api/tracks")
                            .then(res => res.json())
                            .then(setTracks);
                          setMessage("Morceau sauvegardé !");
                          setTimeout(() => setMessage(null), 2000);
                        } else {
                          const data = await res.json();
                          setMessage(data.error || "Erreur lors de la sauvegarde");
                        }
                      }}
                    >
                      {isInLibrary ? "Déjà sauvegardé" : "Sauvegarder"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {message && (
          <div className={`mb-4 p-2 rounded text-center ${message.includes("sauvegardé") ? "bg-green-700" : "bg-red-700"} text-white`}>
            {message}
          </div>
        )}
      </div>
      <AudioQueueHUD />
    </div>
  )
}