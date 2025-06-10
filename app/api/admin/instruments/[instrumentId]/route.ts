import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from 'fs';
import path from 'path';


export async function GET(request: NextRequest, context: { params: { instrumentId: string } }) {
  const instrumentId =await parseInt(context.params.instrumentId, 10);
  

  if (isNaN(instrumentId)) {
    return NextResponse.json({ error: 'Invalid Instrument ID' }, { status: 400 });
  }

  try {
    const instrument = await prisma.instrument.findUnique({
      where: { id: instrumentId },
      include: {
        books: {
          include: {
            book: {
              include: {
                songs: true
              }
            }
          }
        },
        instrument_teachers: {
          select: {
            teacher: {
              select: {
                id: true,
              }
            }
          }
        },
      },
    });

    if (!instrument) {
      return NextResponse.json({ error: 'Instrument not found' }, { status: 404 });
    }

    const teacherIds = instrument.instrument_teachers.map(teacher => teacher.teacher.id);
    const instrumentWithTeachers = {
      ...instrument,
      instrument_teachers: teacherIds,
    };

    return NextResponse.json(instrumentWithTeachers);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching Instrument' }, { status: 500 });
  }
}



export async function PUT(req: NextRequest, { params }: { params: { instrumentId: string } }) {
  try {
    const instrumentId = await parseInt(params.instrumentId);
    if (isNaN(instrumentId)) {
      return NextResponse.json({ error: "Invalid instrument ID" }, { status: 400 });
    }

    const body = await req.json();
    const {
      instrument_name,
      instrument_description,
      instrument_img,
      instrument_origin,
      instrument_type,
      teacherIds,
    } = body;

   
    const validTeacherIds = Array.isArray(teacherIds)
      ? teacherIds.map((id: any) => Number(id)).filter((id: number) => !isNaN(id))
      : [];

    if (validTeacherIds.length === 0) {
      return NextResponse.json({ error: "No valid teacher IDs provided" }, { status: 400 });
    }

    const updatedInstrument = await prisma.instrument.update({
      where: { id: instrumentId },
      data: {
        instrument_name,
        instrument_description,
        instrument_img,
        instrument_origin,
        instrument_type,
        instrument_teachers: {
          deleteMany: {}, 
          create: validTeacherIds.map((teacherId: number) => ({
            teacher: {
              connect: { id: teacherId }, 
            },
          })),
        },
      },
      include: {
        instrument_teachers: {
          include: { teacher: true },
        },
      },
    });

    return NextResponse.json(updatedInstrument);
  } catch (error) {
    console.error("Error updating Instrument:", error);
    return NextResponse.json({ error: "Failed to update instrument" }, { status: 500 });
  }
}



export async function DELETE(request: NextRequest, { params }: { params: { instrumentId: string } }) {
  const instrumentId =await parseInt(params.instrumentId, 10);

  if (isNaN(instrumentId)) {
    return NextResponse.json({ error: 'Invalid Instrument ID' }, { status: 400 });
  }

  try {
    // پیدا کردن ساز (برای مسیر عکس)
    const instrument = await prisma.instrument.findUnique({
      where: { id: instrumentId },
      include: { instrument_teachers: true },
    });

    if (!instrument) {
      return NextResponse.json({ error: 'Instrument not found' }, { status: 404 });
    }

    // حذف رکوردهای مرتبط و خود ساز به‌صورت اتمیک
    const [deletedTeachers, deletedInstrument] = await prisma.$transaction([
      prisma.instrumentTeacher.deleteMany({ where: { instrumentId } }),
      prisma.instrument.delete({
        where: { id: instrumentId },
        select: {
          id: true,
          instrument_name: true,
          instrument_description: true,
          instrument_type: true,
          instrument_img: true,
          instrument_origin: true,
          instrument_teachers: true,
        },
      }),
    ]);

    // حذف عکس فقط بعد از موفقیت دیتابیس
    if (instrument.instrument_img) {
      const baseDir = 'public/uploads/images/instruments';
      const fileName = instrument.instrument_img.replace('/uploads/images/instruments/', '');
      const filePath = path.join(process.cwd(), baseDir, fileName);

      try {
        // استفاده از unlink برای حذف فایل
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.warn(`Image deletion failed at ${filePath}:`, err);
      }
    }

    return NextResponse.json(
      {
        message: 'Instrument deleted successfully',
        instrument: deletedInstrument,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in instrument deletion:', error);
    return NextResponse.json(
      {
        error: 'Instrument deletion failed',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

