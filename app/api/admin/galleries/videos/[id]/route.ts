import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from '@prisma/client';


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

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const videoId = parseInt(params.id, 10);

  if (isNaN(videoId)) {
    return NextResponse.json({ error: 'Invalid Video ID' }, { status: 400 });
  }

  try {
    const videoData = await request.json();

    const updatedVideo = await prisma.video.update({
      where: { id: videoId },
      data: {
        title: videoData.title,
        description: videoData.description,
        url: videoData.url,
        videoDate: videoData.videoDate,
        category: {
          connect: { id: videoData.category.id , category_name:videoData.category.category_name },
        },
      },
      select: {
        id: true,
        title: true,
        url: true,
        description: true,
        videoDate: true,
        category: true,
      },
    });

    return NextResponse.json(
      { message: 'Video updated successfully', video: updatedVideo },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Video:', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: 'Failed to update Video',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const videoId = parseInt(params.id, 10);
  
  if (isNaN(videoId)) {
    return NextResponse.json(
      { error: 'Invalid Video ID' },
      { status: 400 }
    );
  }

  try {

    const video = await prisma.video.findUnique({
      where: { id: videoId },
    })

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    const deletedVideo = await prisma.video.delete({
      where: { id: videoId },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        videoDate: true,
      }
    });
    
    return NextResponse.json(
      { 
        message: 'Video deleted successfully',
        video: deletedVideo
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting Video:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to delete Video',
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
