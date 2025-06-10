import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const instruments = await prisma.instrument.findMany({
      include: {
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
      instrument_teachers: inst.instrument_teachers.map(it => ({
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


