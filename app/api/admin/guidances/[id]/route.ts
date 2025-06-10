import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Status } from '@prisma/client'; 


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const guidance = await prisma.guidance.findUnique({
      where: { id }
    });
    
    if (!guidance) {
      return NextResponse.json(
        { error: 'Guidance not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(guidance, { status: 200 });
  } catch (error: any) {
    console.error(`Error fetching guidance ${params.id}:`, error.message);
    return NextResponse.json(
      { error: 'Failed to fetch guidance', details: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Check if guidance exists
    const existingGuidance = await prisma.guidance.findUnique({
      where: { id }
    });
    
    if (!existingGuidance) {
      return NextResponse.json(
        { error: 'Guidance not found' },
        { status: 404 }
      );
    }
    
    // Validate status if provided
    let statusValue;
    if (data.status) {
      // Convert string to Status enum
      switch (data.status) {
        case 'ACTIVE':
          statusValue = Status.ACTIVE;
          break;
        case 'DEACTIVE':
          statusValue = Status.DEACTIVE;
          break;
        case 'PENDING':
          statusValue = Status.PENDING;
          break;
        case 'SUSPENDED':
          statusValue = Status.SUSPENDED;
          break;
        default:
          return NextResponse.json(
            { error: 'Invalid status value. Must be ACTIVE, DEACTIVE, PENDING, or SUSPENDED' },
            { status: 400 }
          );
      }
    }
    
    // Update the guidance
    const updatedGuidance = await prisma.guidance.update({
      where: { id },
      data: {
        fullname: data.fullname !== undefined ? data.fullname : undefined,
        mobile: data.mobile !== undefined ? data.mobile : undefined,
        status: statusValue
      }
    });
    
    return NextResponse.json(
      { message: 'Guidance updated successfully', guidance: updatedGuidance },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error updating guidance ${params.id}:`, error.message);
    
    return NextResponse.json(
      { error: 'Failed to update guidance', details: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    // Check if guidance exists
    const existingGuidance = await prisma.guidance.findUnique({
      where: { id }
    });
    
    if (!existingGuidance) {
      return NextResponse.json(
        { error: 'Guidance not found' },
        { status: 404 }
      );
    }
    
    // Delete the guidance
    await prisma.guidance.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Guidance deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error deleting guidance ${params.id}:`, error.message);
    return NextResponse.json(
      { error: 'Failed to delete guidance', details: error.message },
      { status: 500 }
    );
  }
}
