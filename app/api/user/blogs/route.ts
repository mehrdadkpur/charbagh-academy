import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';


export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: { id: true, firstname: true, lastname: true },
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


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.blog_title || !data.blog_text || !data.authorId) {
      return NextResponse.json({ error: "اطلاعات ناقص است." }, { status: 400 });
    }

    const newBlog = await prisma.blog.create({
      data: {
        blog_title: data.blog_title,
        blog_text: data.blog_text,
        blog_img: data.blog_img || null,
        authorId: data.authorId,
        status: data.status || 'PENDING',
      }
    });

    return NextResponse.json(
      { message: 'Blog created successfully', blog: newBlog },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating Blog:', error.message || error);
    return NextResponse.json(
      { error: 'خطا در ساخت پست جدید' },
      { status: 500 }
    );
  }
}
