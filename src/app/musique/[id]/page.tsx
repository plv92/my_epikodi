import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Props = {
  params: Promise<{ id: string }>
}

export default async function SingleTrackPage({ params }: Props) {
  const { id } = await params
  const numId = Number(id)
  if (isNaN(numId)) {
    return <div className="text-center text-gray-400">ID invalide.</div>
  }

  const track = await prisma.track.findUnique({
    where: { id: numId },
  })

  if (!track) {
    return <div className="text-center text-gray-400">Morceau introuvable.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-800 rounded shadow mt-10">
      {/* Affiche la cover si dispo */}
      {track.cover ? (
        <img
          src={track.cover}
          alt="cover"
          className="w-48 h-48 object-cover rounded mb-4 mx-auto"
        />
      ) : (
        <div className="w-48 h-48 bg-gray-700 rounded mb-4 mx-auto flex items-center justify-center text-gray-400">
          Pas de cover
        </div>
      )}

      <h2 className="text-2xl font-bold mb-2">{track.title}</h2>
      <div className="mb-2 text-gray-300">
        {track.artist}
        {track.album && <> — <span className="italic">{track.album}</span></>}
      </div>
      {/* Affiche genre et année si dispo */}
      <div className="text-sm text-blue-300 mb-2">Genre : {track.genre || "Inconnu"}</div>
      <div className="text-sm text-blue-300 mb-2">Année : {track.year || "?"}</div>
      <audio controls src={track.url} className="w-full mt-4" />
      <div className="text-xs text-gray-500 mt-4">
        Ajouté le {new Date(track.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}