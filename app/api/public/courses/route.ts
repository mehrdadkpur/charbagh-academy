import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select:{
        id:true,
        course_name:true,
        course_description:true,
        course_img:true,
        teacher: {
          select: {  firstname: true, lastname: true }
        },
        instrument: {
          select: {  instrument_name: true }
        },
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
