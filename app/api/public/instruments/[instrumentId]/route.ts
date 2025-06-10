import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request: NextRequest, context: { params: { instrumentId: string } }) {
  const instrumentId =await parseInt(context.params.instrumentId, 10);
  

  if (isNaN(instrumentId)) {
    return NextResponse.json({ error: 'Invalid Instrument ID' }, { status: 400 });
  }

  try {
    const instrument = await prisma.instrument.findUnique({
      where: { id: instrumentId },
      include: {
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


