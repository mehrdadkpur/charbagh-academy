import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Status } from '@prisma/client'; 


export async function GET(request: NextRequest) {
  try {
    const guidances = await prisma.guidance.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(
      { guidances },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in GET /api/guidances:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch guidances', details: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.fullname || !data.mobile) {
      return NextResponse.json(
        { error: 'Full name and mobile number are required' },
        { status: 400 }
      );
    }
    
    // Create the new guidance with explicit Status enum value
    const newGuidance = await prisma.guidance.create({
      data: {
        fullname: data.fullname,
        mobile: data.mobile,
        status: Status.PENDING // Use the enum directly
      }
    });
    
    return NextResponse.json(
      { message: 'Guidance created successfully', guidance: newGuidance },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating Guidance:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A guidance with this mobile number already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create Guidance', details: error.message },
      { status: 500 }
    );
  }
}
