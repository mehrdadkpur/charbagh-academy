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



