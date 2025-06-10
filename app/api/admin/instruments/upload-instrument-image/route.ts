import { writeFile, mkdir, unlink } from 'fs/promises'
import { NextRequest } from 'next/server'
import { join } from 'path'

export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData()
      const file = formData.get('file') as File
      const instrumentName = formData.get('instrumentName') as string;
      const previousUrl = formData.get('instrument_img') as string | null;
  
      const baseDir = 'public/uploads/images/instruments'
  
      // Extract the previous filename correctly from the full URL path
      if (previousUrl) {
        const previousFileName = previousUrl.split('/uploads/images/instruments').pop();
        if (previousFileName) {
          const previousFilePath = join(process.cwd(), baseDir, previousFileName);
          await unlink(previousFilePath);
        }
      }
  
      const uploadDir = join(process.cwd(), baseDir)
      await mkdir(uploadDir, { recursive: true })
  

      const filename = `${instrumentName}.${file.name.split('.').pop()}`
      const filepath = join(uploadDir, filename)
  
      const bytes = await file.arrayBuffer()
      const buffer = new Uint8Array(bytes) 
      await writeFile(filepath, buffer)
  
      const imageUrl = `/uploads/images/instruments/${filename}`
  
      return new Response(JSON.stringify({ url: imageUrl }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Upload failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
  
