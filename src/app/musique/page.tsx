import { mockTracks } from "@/data/tracks"
import TrackItem from "@/components/TrackItem"

export default function MusiquePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎵 Ma musique</h2>
      <div className="space-y-4">
        {mockTracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
