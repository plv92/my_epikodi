"use client"

import { useState } from "react"

export default function AjouterMorceau() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) return alert("Ajoute un fichier audio")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("artist", artist)
    formData.append("album", album)

    const res = await fetch("/api/tracks", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      alert("Morceau ajouté !")
    } else {
      alert("Erreur lors de l'ajout")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ajouter un morceau</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="text" placeholder="Artiste" value={artist} onChange={(e) => setArtist(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="text" placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="file" accept=".mp3" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-white" />
        <button type="submit" className="px-4 py-2 bg-kodi-blue rounded">Ajouter</button>
      </form>
    </div>
  )
}
