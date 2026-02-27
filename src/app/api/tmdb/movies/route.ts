import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "TMDB_API_KEY manquante" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  if (!query) {
    return NextResponse.json({ error: "Paramètre 'query' requis" }, { status: 400 });
  }

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=fr-FR`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Erreur TMDB" }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
