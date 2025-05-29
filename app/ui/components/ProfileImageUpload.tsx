'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ProfileImageUploadProps {
  currentImage?: string
  onUpdate: (url: string) => void
}

export default function ProfileImageUpload({ currentImage, onUpdate }: ProfileImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])

      const response = await fetch('/api/user/update-image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.url) {
        onUpdate(data.url)
        window.location.reload()
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative group font-DanaMedium">
      <Image width={200} height={200} src={currentImage || "/images/avatar.png"} alt="Profile" className="w-40 h-40 rounded-full object-cover"/>
      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer text-white">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {uploading ? 'در حال آپلود...' : 'تغییر تصویر'}
      </label>
    </div>
  )
}
