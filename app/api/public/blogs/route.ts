import  prisma  from '@/lib/prisma';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id:true,
        blog_title:true,
        blog_text:true,
        blog_img:true,
        createdAt:true,
        updatedAt:true,
        author: {
          select: { firstname: true, lastname: true },
        },
      },
    });

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in GET /api/blogs:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Blogs' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
