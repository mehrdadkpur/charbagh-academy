import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const blogId = parseInt(params.id, 10);
    const { status } = await request.json();
  
    if (!["PENDING", "ACTIVE", "DEACTIVE"].includes(status)) {
      return NextResponse.json({ error: "وضعیت نامعتبر است" }, { status: 400 });
    }
  
    try {
      const updated = await prisma.blog.update({
        where: { id: blogId },
        data: { status },
      });
  
      return NextResponse.json({ message: "وضعیت با موفقیت تغییر کرد", blog: updated });
    } catch (e) {
      return NextResponse.json({ error: "خطا در بروزرسانی" }, { status: 500 });
    }
  }