import { writeFile, unlink, access, constants, mkdir } from 'fs/promises'
import { join } from 'path'
import { verifyToken } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

type DecodedToken = {
  id: number | string
  role: string
}

// Helper to check if file exists
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'احراز هویت انجام نشد' }, { status: 401 })
    }

    const decoded = await verifyToken(token) as DecodedToken
    const userId = typeof decoded.id === 'string' ? parseInt(decoded.id, 10) : decoded.id

    if (isNaN(userId) || !Number.isInteger(userId)) {
      return NextResponse.json({ error: 'شناسه کاربر نامعتبر است' }, { status: 400 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'فایلی ارسال نشده است' }, { status: 400 })
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'نوع فایل پشتیبانی نمی‌شود' }, { status: 400 })
    }

    // Check file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'حجم فایل بیشتر از ۵ مگابایت است' }, { status: 400 })
    }

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        user_img: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'کاربر یافت نشد' }, { status: 404 })
    }

    // Create directories
    const baseDir = 'public/uploads/images/users/profile'
    const uploadDir = join(process.cwd(), baseDir)
    await mkdir(uploadDir, { recursive: true })

    // Sanitize names
    const timestamp = Date.now()
    const sanitizedFirstname = user.firstname.replace(/[^a-zA-Z0-9]/g, '')
    const sanitizedLastname = user.lastname.replace(/[^a-zA-Z0-9]/g, '')

    // Determine file extension
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp'
    }
    const fileExtension = mimeToExt[file.type] || 'jpg'

    const filename = `${user.id}-${sanitizedFirstname}-${sanitizedLastname}-${timestamp}.${fileExtension}`
    const filepath = join(uploadDir, filename)

    // Delete previous image if exists
    if (user.user_img) {
      try {
        const previousImageUrl = user.user_img.split('?')[0]
        const previousImagePath = previousImageUrl.replace(/^\/uploads\//, 'public/uploads/')
        const fullPreviousPath = join(process.cwd(), previousImagePath)

        if (await fileExists(fullPreviousPath)) {
          await unlink(fullPreviousPath)
        }
      } catch (error) {
        console.error('Error deleting old image:', error)
      }
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(bytes))
    await writeFile(filepath, buffer)

    // Update DB
    const imageUrl = `/uploads/images/users/profile/${filename}`
    await prisma.user.update({
      where: { id: user.id },
      data: { user_img: imageUrl }
    })

    return NextResponse.json({
      success: true,
      url: imageUrl,
      timestamp
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      error: 'آپلود ناموفق بود',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
