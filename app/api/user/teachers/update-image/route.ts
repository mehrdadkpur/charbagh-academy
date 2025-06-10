import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest } from 'next/server'
import { unlink } from 'fs/promises'


export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData()
      const file = formData.get('file') as File
      const id = formData.get('id') as string
      const firstname = formData.get('firstname') as string
      const lastname = formData.get('lastname') as string
     
      const previousUrl = formData.get('previousUrl') as string | null;
  
      const baseDir = 'public/uploads/images/teachers/main-img'
  
      if (previousUrl) {
        const previousFileName = previousUrl.split('/uploads/images/teachers/main-img').pop();
        if (previousFileName) {
          const previousFilePath = join(process.cwd(), baseDir, previousFileName);
          await unlink(previousFilePath);
        }
      }
  
      const uploadDir = join(process.cwd(), baseDir)
      await mkdir(uploadDir, { recursive: true })
  

      const filename = `${id}-${firstname}-${lastname}.${file.name.split('.').pop()}`
      const filepath = join(uploadDir, filename)
  
      const bytes = await file.arrayBuffer()
      const buffer = new Uint8Array(bytes) 
      await writeFile(filepath, buffer)
  
      const imageUrl = `/uploads/images/teachers/main-img/${filename}`
  
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
  

