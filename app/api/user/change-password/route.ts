import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { verifyPassword, hashPassword } from '@/lib/password'
import prisma from '@/lib/prisma';

interface DecodedToken {
  id: number
  nationality_umber: string
  role: string
  [key: string]: any
}


export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json()
    const token = req.cookies.get('token')?.value

    
    
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    // Decode token and get user ID (adjust field depending on your JWT payload)
    const decoded = await verifyToken(token) as DecodedToken
    const userNationalityNumber = decoded.nationality_number


    const user = await prisma.user.findUnique({
      where: { nationality_number: userNationalityNumber }
    })
    

    if (!user) {
      return NextResponse.json({ error: 'کاربر یافت نشد' }, { status: 404 })
    }

    // Verify current password
    if (!user.password) {
      return NextResponse.json({ error: 'رمز عبور کاربر یافت نشد' }, { status: 400 })
    }
    
    const isValid = await verifyPassword(currentPassword, user.password)
    
    if (!isValid) {
      return NextResponse.json({ error: 'رمز عبور فعلی اشتباه است' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}
