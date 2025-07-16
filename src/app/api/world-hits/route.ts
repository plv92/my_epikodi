import { NextResponse } from "next/server"

const JAMENDO_CLIENT_ID = "b6fd5449" // crée un compte gratuit sur Jamendo Developers

export async function GET() {
  try {
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10`
    const res = await fetch(url)
    const data = await res.json()
    // On retourne uniquement les tracks pertinentes
    return NextResponse.json(data.results || [])
  } catch (e) {
    return NextResponse.json([])
  }
}