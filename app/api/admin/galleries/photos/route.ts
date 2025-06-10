import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        category: {
          select:{
            category_name:true
          }
        }
      }
    })
     
    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error:any) {
    console.error('Error in GET /api/photos:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch photos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const rawCategoryId = formData.get("categoryId");

    const categoryId = rawCategoryId ? parseInt(rawCategoryId as string) : null;

    console.log(categoryId);
    

    if (!categoryId || isNaN(categoryId)) {
      return NextResponse.json(
        { error: "دسته‌بندی انتخاب نشده یا نامعتبر است" },
        { status: 400 }
      );
    }

    const newPhoto = await prisma.photo.create({
      data: {
        title: formData.get("title") as string,
        url: formData.get("url") as string,
        description: formData.get("description") as string,
        photoDate: new Date(formData.get("photoDate") as string),
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json(
      { message: "عکس با موفقیت ایجاد شد", photo: newPhoto },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating photo:", error);
    return NextResponse.json(
      { error: "خطا در ایجاد عکس" },
      { status: 500 }
    );
  }
}


