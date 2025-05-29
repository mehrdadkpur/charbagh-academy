'use client'
import { useState } from 'react'

export default function FileUpload({ 
  accept, 
  onUpload, 
  type 
}: { 
  accept: string
  onUpload: (url: string) => void
  type: 'images' | 'songs' | 'videos'
}) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const { url } = await response.json()
      onUpload(url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        id="file-upload"
      />
      <label 
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? 'در حال آپلود...' : 'انتخاب فایل'}
      </label>
    </div>
  )
}
