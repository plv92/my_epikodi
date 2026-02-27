import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "TMDB_API_KEY manquante" }, { status: 500 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID requis" }, { status: 400 });
  }

  const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
