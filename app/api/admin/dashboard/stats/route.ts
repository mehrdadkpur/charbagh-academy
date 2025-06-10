import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET() {
  try {
    // Count users by role
    const [
      students,
      teachers,
      admins,
      songs,
      courses,
      photos,
      videos,
      instruments,
      blogs
    ] = await Promise.all([
      // Count users with STUDENT role
      prisma.user.count({
        where: {
          role: Role.STUDENT
        }
      }),
      
      // Count users with TEACHER role
      prisma.user.count({
        where: {
          role: Role.TEACHER 
        
        }
      }),
      prisma.user.count({
        where: {
          role: Role.ADMIN 
        
        }
      }),
      
      // Count other entities
      prisma.song.count(),
      prisma.course.count(),
      prisma.photo.count(),
      prisma.video.count(),
      prisma.instrument.count(),
      prisma.blog.count(),
    ]);

    // Get total users count
    const totalUsers = await prisma.user.count();

    // Calculate other useful stats
    const activeUsers = await prisma.user.count({
      where: {
        status: 'ACTIVE'
      }
    });

    return NextResponse.json({
      students,
      teachers,
      admins,
      songs,
      courses,
      photos,
      videos,
      instruments,
      blogs,
      totalUsers,
      activeUsers
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch stats',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
