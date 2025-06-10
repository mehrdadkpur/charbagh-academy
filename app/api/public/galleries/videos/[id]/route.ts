import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const videoId = parseInt(context.params.id, 10);

  if (isNaN(videoId)) {
    return NextResponse.json({ error: 'Invalid Video ID' }, { status: 400 });
  }

  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        category: {
          select: {
            id: true,
            category_name: true,
          },
        },
      },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching Video' }, { status: 500 });
  }
}
