import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select:{
        id:true,
        category_name:true
      }
    }); 
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error:any) {
    console.error('Error in GET /api/categories:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch categories' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

