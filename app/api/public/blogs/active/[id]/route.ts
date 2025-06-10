import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";


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
        },
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



