import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        category: true
      }
    })
     
    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error:any) {
    console.error('Error in GET /api/photos:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch photos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


