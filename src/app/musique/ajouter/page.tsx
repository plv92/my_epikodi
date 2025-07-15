"use client"

import { useState } from "react"

export default function AjouterMorceau() {
  const [mode, setMode] = useState<"file" | "link">("file")
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "file" && !file) {
      alert("Ajoute un fichier audio")
      return
    }
    if (mode === "link" && !mediaUrl) {
      alert("Ajoute un lien YouTube/Spotify")
      return
    }

    const formData = new FormData()
    if (mode === "file" && file) formData.append("file", file)
    formData.append("title", title)
    formData.append("artist", artist)
    formData.append("album", album)
    if (mode === "link") formData.append("mediaUrl", mediaUrl)

    const res = await fetch("/api/tracks", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      alert("Morceau ajouté !")
      setFile(null)
      setTitle("")
      setArtist("")
      setAlbum("")
      setMediaUrl("")
    } else {
      alert("Erreur lors de l'ajout")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ajouter un morceau</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="file"
              checked={mode === "file"}
              onChange={() => setMode("file")}
            />
            Uploader un fichier
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="link"
              checked={mode === "link"}
              onChange={() => setMode("link")}
            />
            Ajouter via un lien
          </label>
        </div>
        <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="text" placeholder="Artiste" value={artist} onChange={e => setArtist(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="text" placeholder="Album" value={album} onChange={e => setAlbum(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
        {mode === "file" && (
          <input
            type="file"
            accept=".mp3"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="w-full text-white"
          />
        )}
        {mode === "link" && (
          <input
            type="url"
            placeholder="Lien YouTube ou Spotify"
            value={mediaUrl}
            onChange={e => setMediaUrl(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        )}
        <button type="submit" className="px-4 py-2 bg-kodi-blue rounded">Ajouter</button>
      </form>
    </div>
  )
}
