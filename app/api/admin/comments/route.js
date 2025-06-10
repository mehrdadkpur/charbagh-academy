import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const comments = await prisma.comment.findMany(); 
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in GET /api/comments:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch comments' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
