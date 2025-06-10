
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const authorId = searchParams.get('authorId')

  if (!authorId) {
    return NextResponse.json({ error: 'شناسه نویسنده الزامی است' }, { status: 400 })
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: Number(authorId),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ blogs })
  } catch (error) {
    console.error('Error fetching user blogs:', error)
    return NextResponse.json({ error: 'خطا در واکشی پست‌ها' }, { status: 500 })
  }
}
