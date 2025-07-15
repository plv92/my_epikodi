import { NextResponse } from "next/server"

export async function GET() {
  try {
    const url = "https://api.deezer.com/chart"
    const res = await fetch(url)
    const data = await res.json()
    // On retourne uniquement les tracks du top
    return NextResponse.json(data.tracks?.data || [])
  } catch (e) {
    return NextResponse.json([])
  }
}