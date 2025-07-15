import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 })
  await prisma.track.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}