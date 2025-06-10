import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);

  if (isNaN(courseId)) {
    return NextResponse.json({ error: "Invalid Course ID" }, { status: 400 });
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        instrument: {
          select: {
            instrument_name: true,
          },
        },
        teacher: {
          select: {  firstname: true, lastname: true }
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: course.id,
      course_name: course.course_name,
      course_description: course.course_description,
      course_img: course.course_img,
      instrument: course.instrument?.instrument_name || null,
      teacher: course.teacher,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

