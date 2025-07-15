import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { writeFile } from "fs/promises"
import path from "path"
import { fetchAudioDbMetadata } from "@/utils/audioDb"

const prisma = new PrismaClient()

export async function GET() {
  const tracks = await prisma.track.findMany({
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(tracks)
}


export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null
  let title = formData.get("title") as string
  let artist = formData.get("artist") as string
  const album = formData.get("album") as string
  const mediaUrl = formData.get("mediaUrl") as string | null

  let fileName = ""
  let url = ""
  let cover = null
  let genre = null
  let year = null

  // Si fichier uploadé, on l'enregistre
  if (file && file.size > 0) {
    fileName = file.name.replace(/\s/g, "_")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(process.cwd(), "public", "music", fileName)
    await writeFile(filePath, buffer)
    url = `/music/${fileName}`
  }

  // Si mediaUrl fourni, on utilise Noembed pour enrichir
  if (mediaUrl) {
    url = mediaUrl
    const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(mediaUrl)}`)
    if (res.ok) {
      const noembedMeta = await res.json()
      cover = noembedMeta.thumbnail_url || null
      title = noembedMeta.title || title
      artist = noembedMeta.author_name || artist
    }
  }

  // Optionnel : enrichir avec AudioDb si info manquante
  let meta = null
  try {
    meta = await fetchAudioDbMetadata(artist, title)
    genre = meta?.strGenre || null
    year = meta?.intYearReleased || null
    cover = cover || meta?.strTrackThumb || null
  } catch (e) {
    console.error("Erreur fetchAudioDbMetadata:", e)
  }

  if (!url || !title || !artist) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
  }

  // Enregistre la piste en BDD avec les métadonnées
  const track = await prisma.track.create({
    data: {
      title,
      artist,
      album,
      url,
      cover,
      genre,
      year,
    },
  })

  return NextResponse.json(track)
}
