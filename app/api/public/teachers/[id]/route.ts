import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, Role, Status } from "@prisma/client";
import { hashPassword } from "@/lib/password";

interface RouteSegment {
  params: {
    id: string;
  };
}

export async function GET (
  request: NextRequest,
  { params }: RouteSegment
) {
  try {
    const teacherId = parseInt(params.id);
    
    if (isNaN(teacherId)) {
      return NextResponse.json(
        { error: 'Invalid teacher ID' },
        { status: 400 }
      );
    }
    
    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: Role.TEACHER
      },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        user_img: true,
        resume: true,
        skill: {
          select:{
            instrument_name:true
          }
        },
      }
    });
    
    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found or user is not a teacher' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teacher);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
};