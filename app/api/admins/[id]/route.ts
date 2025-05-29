import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, Role, Status } from "@prisma/client";
import { hashPassword } from "@/lib/password";

interface RouteSegment {
  params: {
    id: string;
  };
}

export async function GET (
  request: NextRequest,
  { params }: RouteSegment
) {
  try {
    const adminId = parseInt(params.id);
    
    if (isNaN(adminId)) {
      return NextResponse.json(
        { error: 'Invalid Admin ID' },
        { status: 400 }
      );
    }
    
    const admin = await prisma.user.findFirst({
      where: {
        id: adminId,
        role: Role.ADMIN
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mobile: true,
        gender: true,
        status: true,
        user_img: true,
        resume: true,
        role: true,
        birthdate: true,
        nationality_number: true,
        registry_date: true,
        address: true,
        identity_number: true,
        skillId: true,
        isAdmin: true
      }
    });
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found or user is not a Admin' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(admin);
  } catch (error) {
    console.error("Error fetching Admin:", error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const adminId = parseInt(id, 10);
  
  if (isNaN(adminId)) {
    return NextResponse.json(
      { error: 'Invalid Admin ID' },
      { status: 400 }
    );
  }
  
  try {
    const adminData = await request.json();
    
    // Check for unique fields
    const uniqueFields = ['nationality_number', 'mobile', 'email'].filter(field => adminData[field]);
    
    if (uniqueFields.length > 0) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: uniqueFields.map(field => ({
            [field]: adminData[field],
            NOT: { id: adminId }
          }))
        }
      });
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'A user with this nationality number, mobile, or email already exists' },
          { status: 409 }
        );
      }
    }
    
    // Clean up the update data by removing fields that shouldn't be directly updated
    const {
      id: _id, // Remove id from update data
      skill, // Remove skill object from update data
      createdAt, // Remove timestamps
      updatedAt,
      ...cleanUpdateData
    } = adminData;
    
    // Handle password update
    if (!cleanUpdateData.password || cleanUpdateData.password.trim() === '') {
      delete cleanUpdateData.password;
    } else {
      cleanUpdateData.password = await hashPassword(cleanUpdateData.password);
    }
    
    // Ensure role is set
    cleanUpdateData.role = Role.ADMIN;
    
    // Handle status field - ensure it's a valid enum value
    if (cleanUpdateData.status) {
      // Check if the status is a valid enum value
      if (!Object.values(Status).includes(cleanUpdateData.status as Status)) {
        console.error(`Invalid status value: ${cleanUpdateData.status}`);
        return NextResponse.json(
          { 
            error: 'Invalid status value',
            validValues: Object.values(Status)
          },
          { status: 400 }
        );
      }
    }
    
    // Convert date strings to Date objects
    if (cleanUpdateData.birthdate) {
      cleanUpdateData.birthdate = new Date(cleanUpdateData.birthdate);
    }
    
    if (cleanUpdateData.registry_date) {
      cleanUpdateData.registry_date = new Date(cleanUpdateData.registry_date);
    }
    
    const updatedAdmin = await prisma.user.update({
      where: { id: adminId },
      data: cleanUpdateData,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mobile: true,
        nationality_number: true,
        gender: true,
        status: true,
        role: true,
        skill: true,
        user_img: true,
        birthdate: true,
        registry_date: true,
        address: true,
        identity_number: true,
        skillId: true,
        isAdmin: true
      }
    });
    
    return NextResponse.json(
      {
        message: 'Admin updated successfully',
        admin: updatedAdmin
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Admin:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Admin not found' },
          { status: 404 }
        );
      } else if (error.code === 'P2003') {
        return NextResponse.json(
          {
            error: 'Cannot update Admin because they are referenced by other records',
            details: error.message
          },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      {
        error: 'Failed to update Admin',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const adminId = parseInt(id, 10);
  
  if (isNaN(adminId)) {
    return NextResponse.json(
      { error: 'Invalid Admin ID' },
      { status: 400 }
    );
  }
  
  try {
    await prisma.user.delete({
      where: { id: adminId },
    });
    
    return NextResponse.json(
      { message: 'Admin deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting Admin:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Admin not found' },
          { status: 404 }
        );
      } else if (error.code === 'P2003') {
        return NextResponse.json(
          {
            error: 'Cannot delete Admin because they are referenced by other records',
            details: error.message
          },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      {
        error: 'Failed to delete Admin',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
