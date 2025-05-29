import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import { join } from 'path'
import { unlink } from 'fs/promises'


export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const photoID = parseInt(context.params.id, 10);

  if (isNaN(photoID)) {
    return NextResponse.json({ error: 'Invalid Photo ID' }, { status: 400 });
  }

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: photoID },
      include: {
        category: {
          select: {
            id: true,
            category_name: true,
          },
        },
      },
    });

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching photo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const photoID = parseInt(params.id, 10);

  if (isNaN(photoID)) {
    return NextResponse.json({ error: 'Invalid Photo ID' }, { status: 400 });
  }

  try {
    const PhotoData = await request.json();

    const updatedPhoto = await prisma.photo.update({
      where: { id: photoID },
      data: {
        title: PhotoData.title,
        description: PhotoData.description,
        url: PhotoData.url,
        photoDate: PhotoData.photoDate,
        category: {
          connect: { id: PhotoData.category.id },
        },
      },
      select: {
        id: true,
        title: true,
        url: true,
        description: true,
        photoDate: true,
        category: true,
      },
    });

    return NextResponse.json(
      { message: 'Photo updated successfully', photo: updatedPhoto },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Photo:', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: 'Failed to update Photo',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const photoId = parseInt(params.id, 10);
  
  if (isNaN(photoId)) {
    return NextResponse.json(
      { error: 'Invalid Photo ID' },
      { status: 400 }
    );
  }

  try {

    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    })

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    // Step 2: Attempt to delete the file
    if (photo.url) {
      const baseDir = 'public/uploads/images/gallery/photos'
      const fileName = photo.url.split('/uploads/images/gallery/photos').pop()
      const filePath = join(process.cwd(), baseDir, fileName || '')

      try {
        await unlink(filePath)
      } catch (err) {
        console.warn('Failed to delete image file:', err)
      }
    }
    const deletedPhoto = await prisma.photo.delete({
      where: { id: photoId },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        photoDate: true,
      }
    });
    
    return NextResponse.json(
      { 
        message: 'Photo deleted successfully',
        photo: deletedPhoto
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting Photo:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to delete Photo',
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}


