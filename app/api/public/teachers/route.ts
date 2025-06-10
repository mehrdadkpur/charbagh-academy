import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client'; 

export async function GET(req: NextRequest) {
  try {
    const where = {
      role: Role.TEACHER,
    };
    const [teachers] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstname: true,
          lastname: true,
          user_img: true,
          resume: true,
          skill: {
            select:{
              instrument_name:true
            }
          },
        },
      }),
      
    ]);
    return NextResponse.json({
      teachers
    });
  } catch (error) {
    console.error('Error in GET /api/teachers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}

