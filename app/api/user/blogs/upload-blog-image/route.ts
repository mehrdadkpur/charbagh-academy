import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const blog_title = formData.get('blog_title') as string;
        
        
        const baseDir = 'public/uploads/images/blogs'
        const uploadDir = join(process.cwd(), baseDir)
        
        await mkdir(uploadDir, { recursive: true })
        
        const filename = `${blog_title}.${file.name.split('.').pop()}`
        const filepath = join(uploadDir, filename)
        
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(new Uint8Array(bytes))
        await writeFile(filepath, buffer)
        
        const imageUrl = `/uploads/images/blogs/${filename}`

        return Response.json({ url: imageUrl })
    } catch (error) {
        return Response.json({ error: 'Upload failed' }, { status: 500 })
    }
}
