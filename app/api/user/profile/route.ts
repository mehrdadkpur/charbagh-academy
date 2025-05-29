import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import  prisma  from '@/lib/prisma';
import { IUser } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie');
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('token='));
    const token = tokenCookie?.split('=')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }
    
    const decoded = await verifyToken(token) as unknown as IUser

    
    
    // Find user in database using Prisma
    const user = await prisma.user.findUnique({
      where: { id:decoded.id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mobile: true,
        nationality_number: true,
        address:true,
        identity_number: true,
        gender: true,
        status: true,
        role: true,
        skill: true,
        user_img: true,
        birthdate: true,
        registry_date: true,
        isAdmin:true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        nationality_number: user.nationality_number,
        role: user.role,
        user_img: user.user_img,
        gender: user.gender,
        mobile: user.mobile,
        birthdate: user.birthdate,
        registry_date: user.registry_date,
        address: user.address,
        status: user.status,
        email: user.email,
        skill: user.skill,
        identity_number:user.identity_number,
        isAdmin:user.isAdmin
        
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ 
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 401 });
  }
}
