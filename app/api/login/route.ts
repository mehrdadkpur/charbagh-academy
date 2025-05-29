import { NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { verifyPassword } from '@/lib/password'

export async function POST(req: Request) {
  try {
    const { nationality_number, password } = await req.json()
    
    // Add validation for required fields
    if (!nationality_number || !password) {
      return NextResponse.json({
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // Find the user by nationality_number
    const user = await prisma.user.findUnique({
      where: {
        nationality_number: nationality_number
      }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    if (!user.password) {
      return NextResponse.json({ error: 'Account has no password set' }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Create token data with proper null checks
    const tokenData = {
      id: user.id,
      nationality_number: user.nationality_number,
      role: user.role,
      image: user.user_img || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      isAdmin: user.isAdmin
    }
    
    const token = await signToken(tokenData)
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: tokenData
      },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
