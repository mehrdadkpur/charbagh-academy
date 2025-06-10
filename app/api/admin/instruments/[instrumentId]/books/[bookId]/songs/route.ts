import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"


interface RouteParams {
  params: {
    instrumentId: string;
    bookId: string;
  };
}


export async function GET(req: NextRequest, { params }: RouteParams) {
  
  const instrumentId = Number(params.instrumentId)
  if (isNaN(instrumentId)) {
    return new Response("Invalid instrument ID", { status: 400 })
  }
  try {

    const instrumentWithSongs = await prisma.instrument.findUnique({
      where: { id: instrumentId },
      include: {
        books: {
          include: {
            book: {
              include: {
                songs: true
              }
            }
          }
        }
      }
    })

    if (!instrumentWithSongs) {
      return new Response("Instrument not found", { status: 404 })
    }

    const songs = instrumentWithSongs.books.flatMap((ib) => ib.book.songs)

    return new Response(JSON.stringify(songs), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error: any) {
    console.error("Error fetching songs:", error)
    return new Response("Failed to fetch songs", { status: 500 })
  }
}


export async function POST(req: NextRequest, { params }: RouteParams) {
  const instrumentId = Number(params.instrumentId);
  const bookId = Number(params.bookId);

  if (isNaN(instrumentId) || isNaN(bookId)) {
    return NextResponse.json({ error: "Invalid instrument or book ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { song_title, song_artist, song_url } = body;

    if (!song_title || !song_artist || !song_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newSong = await prisma.song.create({
      data: {
        song_title,
        song_artist,
        song_url,
        book: {
          connect: { id: bookId },
        },
      },
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    console.error("Error creating song:", error);
    return NextResponse.json({ error: "Failed to create song" }, { status: 500 });
  }
}
