import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

// اعتبارسنجی داده‌ها
const CourseSchema = z.object({
  course_name: z.string().min(1, "نام دوره الزامی است"),
  course_status: z.string().optional(),
  course_description: z.string().optional(),
  course_img: z.string().optional(),
  teacher: z.string().min(1, "آیدی معلم الزامی است"),
  instrument: z.string().min(1, "آیدی ساز الزامی است")
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    const isFormData = contentType.includes('multipart/form-data');
    let rawData: any = {};

    if (isFormData) {
      const formData = await req.formData();
      rawData = Object.fromEntries(formData.entries());
    } else {
      rawData = await req.json();
    }

    // اعتبارسنجی با Zod
    const validated = CourseSchema.parse(rawData);

    const teacherId = parseInt(validated.teacher);
    const instrumentId = parseInt(validated.instrument);

    if (isNaN(teacherId) || isNaN(instrumentId)) {
      return NextResponse.json({
        error: 'آیدی معلم یا ساز نامعتبر است'
      }, { status: 400 });
    }

    // ایجاد دوره
    const newCourse = await prisma.course.create({
      data: {
        course_name: validated.course_name,
        course_description: validated.course_description || '',
        course_img: validated.course_img || '/images/avatar.png',
        course_status: validated.course_status || 'DEACTIVE',
        teacherId,
        instrumentId
      },
      include: {
        teacher: true,
        instrument: true
      }
    });

    return NextResponse.json({
      message: 'دوره با موفقیت ایجاد شد',
      course: {
        id: newCourse.id,
        name: newCourse.course_name,
        status: newCourse.course_status,
        description: newCourse.course_description,
        img: newCourse.course_img,
        teacher: {
          id: newCourse.teacher.id,
          name: `${newCourse.teacher.firstname} ${newCourse.teacher.lastname}`
        },
        instrument: {
          id: newCourse.instrument.id,
          name: newCourse.instrument.instrument_name
        }
      }
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'اعتبارسنجی ناموفق بود',
        issues: error.errors
      }, { status: 400 });
    }

    console.error('Error creating course:', error);
    return NextResponse.json({
      error: 'خطا در ایجاد دوره',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}



export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: { id: true, firstname: true, lastname: true }
        },
        instrument: {
          select: { id: true, instrument_name: true }
        }
      }
    });

    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in GET /api/courses:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch courses' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
