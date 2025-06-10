import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { Prisma, Status } from '@prisma/client';

interface RouteSegment {
  params: {
    id: string;
  };
}

export const GET = async (
  request: NextRequest,
  { params }: RouteSegment
) => {
  try {
    
    const blogId = parseInt(params.id);
    
    if (isNaN(blogId)) {
      return new Response('Invalid blog ID', { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: {id: blogId},
      include:{
        author:{
          select:{
            firstname:true,
            lastname:true
          }
        }
      }
    });

    if (!blog) return new Response('Blog Not Found', { status: 404 });

    return new Response(JSON.stringify(blog), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response("Something Went Wrong", {
      status: 500
    });
  }
};

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const blogId = parseInt(params.id, 10);

  if (isNaN(blogId)) {
    return NextResponse.json({ error: 'شناسه پست نامعتبر است' }, { status: 400 });
  }

  try {
    const body = await request.json();

    const sanitizedData = {
      blog_title: body.blog_title,
      blog_text: body.blog_text,
      blog_img: body.blog_img,
      status: Status.PENDING, 
    };

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: sanitizedData,
      select: {
        id: true,
        blog_title: true,
        blog_text: true,
        blog_img: true,
        status: true,
        authorId: true,
        author: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'پست با موفقیت به‌روزرسانی شد', blog: updatedBlog },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating blog:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'پست یافت نشد' }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: 'خطا در ویرایش پست',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const blogId = parseInt(params.id, 10);
  
  if (isNaN(blogId)) {
    return NextResponse.json(
      { error: 'Invalid Blog ID' },
      { status: 400 }
    );
  }
  
  try {
    const deletedBlog = await prisma.blog.delete({
      where: { id: blogId },
      select: {
        id: true,
        authorId: true,
        blog_img: true,
        blog_text: true,
        blog_title: true,
      }
    });
    
    return NextResponse.json(
      { 
        message: 'Blog deleted successfully',
        blog: deletedBlog
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting Blog:', error);
    
    // Check if it's a Prisma error with the P2025 code (record not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to delete Blog',
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}


