export type Track = {
  id: number
  title: string
  artist: string
  album?: string
  url: string
}

export const mockTracks: Track[] = [
  {
    id: 1,
    title: "PLUG",
    artist: "Laylow",
    album: "Prototype",
    url: "/Music/PLUG.mp3",
  },
  {
    id: 2,
    title: "Negocie Pas",
    artist: "Sto",
    album: "Test Tape",
    url: "/Music/Négocie Pas.mp3",
  },
]
