import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from 'fs'

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;

  const filePath = path.join(process.cwd(), 'public/uploads/songs', filename);

  try {
    const file = fs.readFileSync(filePath);
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `inline; filename="${filename}"`,
      }
    });
  } catch (error) {
    console.error("❌ خطا در باز کردن فایل:", error);
    return new NextResponse('File not found', { status: 404 });
  }
}
