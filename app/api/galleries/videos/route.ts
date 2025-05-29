import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      const videos = await prisma.video.findMany({
        include: {
          category: true,
        },
      });
  
      return new Response(JSON.stringify(videos), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      console.error('Error in GET /api/videos:', error.message);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch videos' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const rawCategoryId = formData.get("categoryId");

    const categoryId = rawCategoryId ? parseInt(rawCategoryId as string) : null;

    if (!categoryId || isNaN(categoryId)) {
      return NextResponse.json(
        { error: "دسته‌بندی انتخاب نشده یا نامعتبر است" },
        { status: 400 }
      );
    }

    const newVideo = await prisma.video.create({
      data: {
        title: formData.get("title") as string,
        url: formData.get("url") as string,
        description: formData.get("description") as string,
        videoDate: new Date(formData.get("videoDate") as string),
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json(
      { message: "فیلم با موفقیت ایجاد شد", video: newVideo },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating video:", error);
    return NextResponse.json(
      { error: "خطا در ایجاد فیلم" },
      { status: 500 }
    );
  }
}


