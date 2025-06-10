import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams {
  params: {
    bookId: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const bookId = Number(params.bookId);
    if (isNaN(bookId)) {
      return new Response("Invalid book ID", { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        songs: true, // در صورت نیاز به آهنگ‌های کتاب
      },
    });

    if (!book) {
      return new Response("Book not found", { status: 404 });
    }

    return new Response(JSON.stringify(book), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching book:", error);
    return new Response("Failed to fetch book", { status: 500 });
  }
}
