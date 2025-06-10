import prisma from "@/lib/prisma";

export async function GET() {
    try {
      const videos = await prisma.video.findMany({
        include: {
          category: true,
        },
      });
  
      return new Response(JSON.stringify(videos), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      console.error('Error in GET /api/videos:', error.message);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch videos' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }



