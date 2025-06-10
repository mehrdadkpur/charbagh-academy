import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: "ACTIVE" },
      include: {
        author: {
          select: { id: true, firstname: true, lastname: true },
        },
      },
    });

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching Active blogs:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Active blogs' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
