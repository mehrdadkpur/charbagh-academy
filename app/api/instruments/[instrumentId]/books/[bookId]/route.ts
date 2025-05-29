import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    instrumentId: number;     
    bookId: number;   
  };
}

export async function GET(req: NextRequest, { params }: { params: { instrumentId: string, bookId: string } }) {
  const instrumentId = parseInt(params.instrumentId)
  const bookId = parseInt(params.bookId)

  const instrument = await prisma.instrument.findUnique({
    where: { id: instrumentId },
    select: { id: true, instrument_name: true },
  })

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      songs: true,
    },
  })

  if (!instrument || !book) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 })
  }

  return NextResponse.json({ instrument, book })
}

export async function PUT(req: NextRequest , {params}:{ params: { instrumentId: string, bookId: string } }) {
  const bookId = Number(params.bookId);

  if (isNaN(bookId)) {
    return new Response("Invalid book ID", { status: 400 });
  }

  try {
    const body = await req.json();

    const { id, createdAt, updatedAt, songs, ...bookData } = body;

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: bookData,
    });
    

    return new Response(JSON.stringify(updatedBook), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error updating Book:", error);
    return new Response("Failed to update Book", { status: 500 });
  }
}


export async function POST(req: NextRequest, { params }: RouteParams) {
    const instrumentId = Number(params.instrumentId);
    const bookId = Number(params.bookId);
  
    if (isNaN(instrumentId) || isNaN(bookId)) {
      return new Response("Invalid instrument or book ID", { status: 400 });
    }
  
    try {
      // بررسی اینکه ارتباط از قبل وجود نداشته باشه
      const existing = await prisma.instrumentBook.findFirst({
        where: {
           instrumentId,
           bookId,
        },
      });
  
      if (existing) {
        return new Response("Relation already exists", { status: 409 });
      }
  
      // ایجاد ارتباط
      const newRelation = await prisma.instrumentBook.create({
        data: {
           instrumentId,
           bookId,
        },
      });
  
      return new Response(JSON.stringify(newRelation), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (error: any) {
      console.error("Error creating relation:", error);
      return new Response("Failed to create relation", { status: 500 });
    }
}

  export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const instrumentId = Number(params.instrumentId);
    const bookId = Number(params.bookId);
  
    if (isNaN(instrumentId) || isNaN(bookId)) {
      return new Response("Invalid instrument or book ID", { status: 400 });
    }
  
    try {
     
      const existing = await prisma.instrumentBook.findFirst({
        where: {
            instrumentId,
            bookId,
        },
      });
  
      if (!existing) {
        return new Response("Relation not found", { status: 404 });
      }
  
  
      await prisma.instrumentBook.delete({
        where: {
          id: existing.id,
        },
      });
  
      return new Response("Relation deleted successfully", { status: 200 });
  
    } catch (error: any) {
      console.error("Error deleting relation:", error);
      return new Response("Failed to delete relation", { status: 500 });
    }
}
  
  
