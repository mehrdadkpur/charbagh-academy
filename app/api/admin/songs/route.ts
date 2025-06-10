import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const songs = await prisma.song.findMany();

    if (!songs || songs.length === 0) {
      return new Response("No Songs found", { status: 404 });
    }

    return new Response(
      JSON.stringify(songs),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in GET /api/songs:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch songs" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
