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
  const file = formData.get("file") as File
  const title = formData.get("title") as string
  const artist = formData.get("artist") as string
  const album = formData.get("album") as string

  if (!file || !title || !artist) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // Sauvegarde le fichier dans /public/music
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const fileName = file.name.replace(/\s/g, "_")
  const filePath = path.join(process.cwd(), "public", "music", fileName)
  await writeFile(filePath, buffer)

  // Récupère les métadonnées avec gestion d’erreur
  let meta = null
  try {
    meta = await fetchAudioDbMetadata(artist, title)
  } catch (e) {
    // Log l’erreur mais continue
    console.error("Erreur fetchAudioDbMetadata:", e)
  }

  const cover = meta?.strTrackThumb || null
  const genre = meta?.strGenre || null
  const year = meta?.intYearReleased || null

  // Enregistre la piste en BDD avec les métadonnées
  const track = await prisma.track.create({
    data: {
      title,
      artist,
      album,
      url: `/music/${fileName}`,
      cover,
      genre,
      year,
    },
  })

  return NextResponse.json(track)
}
