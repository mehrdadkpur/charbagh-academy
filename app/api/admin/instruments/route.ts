import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const InstrumentSchema = z.object({
  instrument_name: z.string(),
  instrument_description: z.string().optional(),
  instrument_img: z.string().optional(),
  instrument_origin: z.enum(['WESTREN', 'EASTREN', 'PERSIAN']),
  instrument_type: z.enum(['STRING', 'WIND', 'PERCUSSION', 'KEYBOARD', 'ELECTRIC']),
  instrument_teachers: z.array(z.string()).optional()
});


export async function GET() {
  try {
    const instruments = await prisma.instrument.findMany({
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
          include: {
            teacher:true
          }
        }
      }
    });

    const result = instruments.map(inst => ({
      id: inst.id,
      instrument_name: inst.instrument_name,
      instrument_type: inst.instrument_type,
      instrument_origin: inst.instrument_origin,
      instrument_description: inst.instrument_description,
      instrument_img: inst.instrument_img,
      createdAt: inst.createdAt,
      updatedAt: inst.updatedAt,
      books: inst.books.map(item => ({
        id: item.book.id,
        book_name: item.book.book_name,
        createdAt: item.book.createdAt,
        updatedAt: item.book.updatedAt,
        songs: item.book.songs
      })),
      instrument_teachers: inst.instrument_teachers.map(it => ({
        id:it.id,
        firstname: it.teacher.firstname,
        lastname: it.teacher.lastname
      }))
    }));
    
    
    
    

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in GET /api/instruments:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch instruments' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    const isFormData = contentType.includes('multipart/form-data');
    let rawData: any;

    if (isFormData) {
      const formData = await req.formData();
      rawData = Object.fromEntries(formData.entries());

      // Convert instrument_teachers from string -> array<string>
      if (typeof rawData.instrument_teachers === 'string') {
        rawData.instrument_teachers = rawData.instrument_teachers
          .split(',')
          .map((id: string) => id.trim())
          .filter((id: string) => id !== '');
      }
    } else {
      const body = await req.json();
      rawData = body;
    }

    // Validate and sanitize data
    const validated = InstrumentSchema.parse(rawData);
    const teacherIds = (validated.instrument_teachers || []).map(id => parseInt(id));

    const newInstrument = await prisma.instrument.create({
      data: {
        instrument_name: validated.instrument_name,
        instrument_description: validated.instrument_description,
        instrument_img: validated.instrument_img || '/images/avatar.png',
        instrument_origin: validated.instrument_origin,
        instrument_type: validated.instrument_type,
    
        instrument_teachers: {
          create: teacherIds.map(teacherId => ({
            teacherId: teacherId
          }))
        }
        
      },
      include: {
        instrument_teachers: {
          include: {
            teacher: true
          }
        }
      }
    });
    
    

    return NextResponse.json({
      message: 'ساز با موفقیت ایجاد شد',
      instrument: {
        ...newInstrument,
        teacherDetails: newInstrument.instrument_teachers.map(t => t.teacher)
      }
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'اعتبارسنجی ناموفق بود',
        issues: error.errors
      }, { status: 400 });
    }

    console.error('Error creating instrument:', error);
    return NextResponse.json({
      error: 'خطا در ایجاد ساز',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
