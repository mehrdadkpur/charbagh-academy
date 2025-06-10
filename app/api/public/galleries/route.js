import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany(); 
    return new Response(JSON.stringify(galleries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in GET /api/galleries:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch galleries' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

