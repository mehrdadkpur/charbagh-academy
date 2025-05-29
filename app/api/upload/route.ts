import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    // Convert File to ArrayBuffer then to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(bytes))
    
    const uploadDir = join(process.cwd(), 'public/uploads', type)
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const filepath = join(uploadDir, filename)
    
    await writeFile(filepath, buffer)
    return Response.json({ url: `/uploads/${type}/${filename}` })
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
