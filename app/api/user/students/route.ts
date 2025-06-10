import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client'; 

export async function GET(req: NextRequest) {
  try {
    const where = {
      role: Role.STUDENT,
    };
    const [students] = await Promise.all([
      prisma.user.findMany({
        where,
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
          nationality_number:true,
          birthdate:true,
          registry_date:true,
          address:true
        },
      }),
      
    ]);
    return NextResponse.json({
      students
    });
  } catch (error) {
    console.error('Error in GET /api/students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const requiredFields = ['firstname', 'lastname', 'email', 'password', 'mobile'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { mobile: data.mobile },
          { nationality_number: data.nationality_number },
          { identity_number: data.identity_number },
        ],
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email, mobile, nationality number, or identity number already exists' },
        { status: 400 }
      );
    }
    
    // Clean up the data object before sending to Prisma
    const cleanedData = { ...data };
    
    // Remove id field if it's empty or convert to number if it's a string
    if (cleanedData.id === "" || cleanedData.id === undefined || cleanedData.id === 0) {
      delete cleanedData.id;
    } else if (typeof cleanedData.id === 'string') {
      cleanedData.id = parseInt(cleanedData.id, 10);
      if (isNaN(cleanedData.id)) {
        delete cleanedData.id;
      }
    }
    
    // Handle birthdate field
    if (cleanedData.birthdate) {
      cleanedData.birthdate = new Date(cleanedData.birthdate);
    }
    
    // Handle birthDate field (if it exists instead of birthdate)
    if (cleanedData.birthDate) {
      cleanedData.birthdate = new Date(cleanedData.birthDate);
      delete cleanedData.birthDate;
    }
    
    // Handle registry_date field
    if (cleanedData.registry_date) {
      cleanedData.registry_date = new Date(cleanedData.registry_date);
    } else {
      // Set default registry_date to current date if not provided
      cleanedData.registry_date = new Date();
    }
    
    // Convert identity_number to string if it's a number
    if (typeof cleanedData.identity_number === 'number') {
      cleanedData.identity_number = cleanedData.identity_number.toString().padStart(6, '0');
    }
    
    // Ensure role is set properly
    cleanedData.role = Role.STUDENT;
    
    // Remove empty fields that might cause issues
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        delete cleanedData[key];
      }
    })
  
    const newStudent = await prisma.user.create({
      data: cleanedData
    });
    
    // Remove password from response
    const { password, ...studentWithoutPassword } = newStudent;
    
    return NextResponse.json(
      { message: 'Student created successfully', student: studentWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating Student:', error);
    return NextResponse.json(
      {
        error: 'Failed to create Student',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

