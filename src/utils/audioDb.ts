export async function fetchAudioDbMetadata(artist: string, track: string) {
  const url = `https://theaudiodb.com/api/v1/json/2/searchtrack.php?s=${encodeURIComponent(
    artist
  )}&t=${encodeURIComponent(track)}`

  const res = await fetch(url)
  const data = await res.json()
  if (data.track && data.track.length > 0) {
    return data.track[0] // Contient cover, genre, album, etc.
  }
  return null
}

export async function fetchWorldHits() {
  // Ex: les 10 derniers singles ajoutés sur TheAudioDB
  const url = "https://theaudiodb.com/api/v1/json/2/trending.php?country=us&type=itunes&format=singles"
  const res = await fetch(url)
  const data = await res.json()
  return data.trending || []
}