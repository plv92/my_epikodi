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
  let title = ""
  let artist = ""
  let album = ""
  let url = ""
  let cover = null
  let genre = null
  let year = null

  // 1. Détecte le type de contenu
  const contentType = req.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    // --- Cas Jamendo ou ajout externe ---
    const data = await req.json()
    title = data.title
    artist = data.artist
    album = data.album || ""
    url = data.url
    cover = data.cover || null
    genre = data.genre || null
    year = data.year || null
  } else if (contentType.includes("multipart/form-data")) {
    // --- Cas upload local ---
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    title = formData.get("title") as string
    artist = formData.get("artist") as string
    album = formData.get("album") as string

    if (file && file.size > 0) {
      const fileName = file.name.replace(/\s/g, "_")
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filePath = path.join(process.cwd(), "public", "music", fileName)
      await writeFile(filePath, buffer)
      url = `/music/${fileName}`
    }
    // Optionnel : cover, genre, year depuis le formData si tu veux
  }

  // Optionnel : enrichir avec AudioDb si info manquante
  try {
    const meta = await fetchAudioDbMetadata(artist, title)
    genre = genre || meta?.strGenre || null
    year = year || meta?.intYearReleased || null
    cover = cover || meta?.strTrackThumb || null
  } catch (e) {
    // non bloquant
  }

  if (!url || !title || !artist) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
  }

  // Vérifie s'il existe déjà (par url ou par titre/artiste)
  const existing = await prisma.track.findFirst({
    where: {
      OR: [
        { url },
        { AND: [{ title }, { artist }] }
      ]
    }
  });
  if (existing) {
    return NextResponse.json({ error: "Ce morceau existe déjà." }, { status: 409 });
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
      year: year ? Number(year) : null,
    },
  })

  return NextResponse.json(track)
}
