import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

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
            id: true,
            instrument_name: true,
          },
        },
        teacher: {
          select: { id: true, firstname: true, lastname: true }
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
      course_status: course.course_status,
      instrumentId: course.instrument?.id || null,
      instrument: course.instrument?.instrument_name || null,
      teacher: course.teacher,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  if (isNaN(courseId)) {
    return NextResponse.json({ message: "شناسه نامعتبر است." }, { status: 400 });
  }

  try {
    const body = await req.json();
    const {
      course_name,
      course_description,
      course_img,
      course_status,
      instrument,
      teacher,
    } = body;

    // Validate required fields
    if (!course_name || !instrument || !teacher) {
      return NextResponse.json({ message: "همه فیلدهای الزامی را وارد کنید." }, { status: 400 });
    }

    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        course_name,
        course_description,
        course_img,
        course_status,
        instrument: { connect: { id: parseInt(instrument) } },
        teacher: { connect: { id: parseInt(teacher) } },
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "دوره با موفقیت به‌روزرسانی شد", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ message: "خطا در به‌روزرسانی دوره" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);

  if (isNaN(courseId)) {
    return NextResponse.json({ error: "Invalid Course ID" }, { status: 400 });
  }

  try {
    const deletedCourse = await prisma.course.delete({
      where: { id: courseId },
      select: {
        id: true,
        course_name: true,
        course_description: true,
        course_img: true,
        course_status: true,
      },
    });

    return NextResponse.json(
      { message: "Course deleted successfully", course: deletedCourse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Course:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete Course", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
