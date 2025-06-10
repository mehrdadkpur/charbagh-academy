import { readdir } from 'fs/promises'
import { NextRequest } from 'next/server'
import { join } from 'path'

interface RouteSegment {
  params: Promise<{
      type: string
  }>
}



export async function GET( request: NextRequest, { params }: RouteSegment) {
  const { type } = await params

  try {
      // Validate type parameter
      const validTypes = ['images', 'songs', 'videos']
      if (!validTypes.includes(type)) {
          return Response.json({ error: 'Invalid type' }, { status: 400 })
      }

      // Read directory contents
      const dir = join(process.cwd(), 'public/uploads', type)
      const files = await readdir(dir)

      // Convert to URLs
      const urls = files.map(file => `/uploads/${type}/${file}`)

      return Response.json({ files: urls })
  } catch (error) {
      return Response.json({ error: 'Failed to read files' }, { status: 500 })
  }
}

