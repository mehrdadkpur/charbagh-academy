import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
      if (!token) {
      return NextResponse.json({ error: 'احراز هویت انجام نشد' }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 })
    }

    const { nationalityNumber } = await req.json()
    if (!nationalityNumber) {
      return NextResponse.json({ error: 'کد ملی ارسال نشده است' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { nationality_number: nationalityNumber }
    })

    if (!user) {
      return NextResponse.json({ error: 'کاربری با این کد ملی یافت نشد' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ error: 'خطا در جستجوی کاربر' }, { status: 500 })
  }
}
