import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"

interface RouteParams {
  params: {
    instrumentId: string
    bookId: string
    songId: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const instrumentId = Number(params.instrumentId)
  const bookId = Number(params.bookId)
  const songId = Number(params.songId)

  if ([instrumentId, bookId, songId].some(isNaN)) {
    return new Response("Invalid parameters", { status: 400 })
  }

  try {
  
    const instrument_Book = await prisma.instrumentBook.findFirst({
      where: {
        instrumentId,
        bookId,
      },
    })

    if (!instrument_Book) {
      return new Response("Book not found for this instrument", { status: 404 })
    }

    const song = await prisma.song.findFirst({
      where: {
        id: songId,
        bookId: bookId,
      },
    })

    if (!song) {
      return new Response("Song not found", { status: 404 })
    }

    return new Response(JSON.stringify(song), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })

  } catch (error: any) {
    console.error("Error fetching song:", error)
    return new Response("Internal server error", { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const instrumentId = Number(params.instrumentId);
  const bookId = Number(params.bookId);

  if (isNaN(instrumentId) || isNaN(bookId)) {
    return new Response("Invalid parameters", { status: 400 });
  }

  try {
    const { song_title, song_artist, song_url }: { song_title: string, song_artist: string, song_url: string } = await req.json();

    // چک کردن ورودی‌ها
    if (!song_title || !song_artist || !song_url) {
      return new Response("Missing required fields", { status: 400 });
    }

    // ایجاد موسیقی جدید
    const newSong = await prisma.song.create({
      data: {
        song_title,
        song_artist,
        song_url,
        bookId: bookId,
      },
    });

    return new Response(JSON.stringify(newSong), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating song:", error);
    return new Response("Failed to create song", { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const instrumentId = Number(params.instrumentId);
  const bookId = Number(params.bookId);
  const songId = Number(params.songId);

  if ([instrumentId, bookId, songId].some(isNaN)) {
    return new Response("Invalid parameters", { status: 400 });
  }

  try {
    const { song_title, song_artist, song_url }: { song_title?: string, song_artist?: string, song_url?: string } = await req.json();

    // اطمینان از وجود موسیقی
    const existingSong = await prisma.song.findFirst({
      where: {
        id: songId,
        bookId: bookId,
      },
    });

    if (!existingSong) {
      return new Response("Song not found", { status: 404 });
    }

    // به‌روزرسانی اطلاعات موسیقی
    const updatedSong = await prisma.song.update({
      where: { id: songId },
      data: {
        song_title: song_title || existingSong.song_title,
        song_artist: song_artist || existingSong.song_artist,
        song_url: song_url || existingSong.song_url,
      },
    });

    return new Response(JSON.stringify(updatedSong), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating song:", error);
    return new Response("Failed to update song", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const instrumentId = Number(params.instrumentId);
  const bookId = Number(params.bookId);
  const songId = Number(params.songId);

  if ([instrumentId, bookId, songId].some(isNaN)) {
    return new Response("Invalid parameters", { status: 400 });
  }

  try {
   
    const existingSong = await prisma.song.findFirst({
      where: {
        id: songId,
        bookId: bookId,
      },
    });

    if (!existingSong) {
      return new Response("Song not found", { status: 404 });
    }

    await prisma.song.delete({
      where: { id: songId },
    });

    return new Response("Song deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting song:", error);
    return new Response("Failed to delete song", { status: 500 });
  }
}

