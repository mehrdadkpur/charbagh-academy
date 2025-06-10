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
    const teacherId = parseInt(params.id);
    
    if (isNaN(teacherId)) {
      return NextResponse.json(
        { error: 'Invalid teacher ID' },
        { status: 400 }
      );
    }
    
    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: Role.TEACHER
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
        skill: true,
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
    
    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found or user is not a teacher' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teacher);
  } catch (error) {
    console.error("Error fetching teacher:", error);
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
  const teacherId = parseInt(id, 10);
  
  if (isNaN(teacherId)) {
    return NextResponse.json(
      { error: 'Invalid Teacher ID' },
      { status: 400 }
    );
  }
  
  try {
    const teacherData = await request.json();
    
    // Check for unique fields
    const uniqueFields = ['nationality_number', 'mobile', 'email'].filter(field => teacherData[field]);
    
    if (uniqueFields.length > 0) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: uniqueFields.map(field => ({
            [field]: teacherData[field],
            NOT: { id: teacherId }
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
    } = teacherData;
    
    // Handle password update
    if (!cleanUpdateData.password || cleanUpdateData.password.trim() === '') {
      delete cleanUpdateData.password;
    } else {
      cleanUpdateData.password = await hashPassword(cleanUpdateData.password);
    }
    
    // Ensure role is set
    cleanUpdateData.role = Role.TEACHER;
    
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
    
    const updatedTeacher = await prisma.user.update({
      where: { id: teacherId },
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
        message: 'Teacher updated successfully',
        teacher: updatedTeacher
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Teacher:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      } else if (error.code === 'P2003') {
        return NextResponse.json(
          {
            error: 'Cannot update Teacher because they are referenced by other records',
            details: error.message
          },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      {
        error: 'Failed to update Teacher',
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
  const teacherId = parseInt(id, 10);
  
  if (isNaN(teacherId)) {
    return NextResponse.json(
      { error: 'Invalid Teacher ID' },
      { status: 400 }
    );
  }
  
  try {
    await prisma.user.delete({
      where: { id: teacherId },
    });
    
    return NextResponse.json(
      { message: 'Teacher deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting Teacher:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      } else if (error.code === 'P2003') {
        return NextResponse.json(
          {
            error: 'Cannot delete Teacher because they are referenced by other records',
            details: error.message
          },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      {
        error: 'Failed to delete Teacher',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
