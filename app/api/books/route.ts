import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const books = await prisma.book.findMany({
      include: {
        songs: true, 
      },
    });

    if (!books || books.length === 0) {
      return new Response("No books found", { status: 404 });
    }

    return new Response(
      JSON.stringify(books),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in GET /api/books:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch books" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
