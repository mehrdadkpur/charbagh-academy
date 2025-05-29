import { writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const firstname = formData.get('firstname') as string
    const lastname = formData.get('lastname') as string
    const teacherId = formData.get('teacherId') as string
    
    const baseDir = 'public/uploads/images/teachers/main-img'
    const uploadDir = join(process.cwd(), baseDir)
    
    // Using teacher's information for the filename
    const filename = `${teacherId}-${firstname}-${lastname}.${file.name.split('.').pop()}`
    const filepath = join(uploadDir, filename)
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(bytes))
    await writeFile(filepath, buffer)
    
    const imageUrl = `/${baseDir.replace('public/', '')}/${filename}`

    return Response.json({ url: imageUrl })
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
