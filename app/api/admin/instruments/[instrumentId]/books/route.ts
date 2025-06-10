import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    instrumentId: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const instrumentId = Number(params.instrumentId);
    if (isNaN(instrumentId)) {
      return new Response("Invalid instrument ID", { status: 400 });
    }
    const instrumentBooks = await prisma.instrumentBook.findMany({
      where: {
        instrumentId,
      },
      include: {
        book: true
      },
    });
    const books = instrumentBooks.map((ib) => ib.book);

    return new Response(JSON.stringify(books), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching books:", error);
    return new Response("Failed to fetch books", { status: 500 });
  }
}

export async function POST(req:NextRequest , {params}:RouteParams){

  const instrumentId = Number(params.instrumentId);
    if (isNaN(instrumentId)) {
      return new Response("Invalid instrument ID", { status: 400 });
    }

  try {
    const body = await req.json();
    const{book_name}=body

    if (!book_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newBook = await prisma.instrumentBook.create({
      data:{
        instrument:{
          connect:{
            id:instrumentId
          }
        },
        book:{
          create:{
            book_name,
          }
        }
      },
      include:{
        book:true
      }
    })
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
