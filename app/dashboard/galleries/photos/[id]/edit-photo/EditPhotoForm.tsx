'use client'

import Link from 'next/link'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import UploadInput from '@/app/ui/components/UploadInput'
import { IPhoto } from '@/lib/types'
import ShamsiDatePicker from '@/app/ui/components/ShamsiDatePicker'
import toast from 'react-hot-toast'
import { fetchFullPhoto } from '@/lib/requests'

const EditPhotoForm = () => {
  const { id } = useParams()
  const router = useRouter()
  const photoId = Number(id)

  const [fields, setFields] = useState<IPhoto>({
    id: 0,
    title: '',
    url: '',
    photoDate: '',
    description: '',
    category: { id: 0, category_name: '' },
    createdAt: '',
    updatedAt: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<{ id: number; category_name: string }[]>([])
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoId) return
      try {
        const data = await fetchFullPhoto(photoId)
        setFields({
          ...data,
          category: data.category || { id: 0, category_name: '' }
        })
      } catch (error) {
        console.error('Error fetching photo:', error)
        setError('خطا در بارگیری اطلاعات عکس')
      } finally {
        setLoading(false)
      }
    }

    fetchPhoto()
  }, [photoId])

  useEffect(() => {
    setImagePreview(fields.url)
  }, [fields.url])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/public/categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'category') {
      const selected = categories.find(c => c.id === Number(value))
      if (selected) {
        setFields(prev => ({
          ...prev,
          category: { id: selected.id, category_name: selected.category_name }
        }))
      }
    } else {
      setFields(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleDateChange = (gregorianDate: string) => {
    setFields(prev => ({ ...prev, photoDate: gregorianDate }))
  }

  const handlePhotoUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', fields.title)
    formData.append('id', fields.id.toString())
    if (fields.url) {
      formData.append('previousUrl', fields.url)
    }

    try {
      const response = await fetch('/api/admin/galleries/upload-gallery-photo', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.url) {
        toast.success('بارگذاری فایل موفقیت‌آمیز بود')
        setFields(prev => ({ ...prev, url: data.url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('خطا در بارگذاری تصویر')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/admin/galleries/photos/${photoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      })

      if (res.ok) {
        toast.success('ویرایش عکس با موفقیت انجام شد')
        router.push('/dashboard/galleries/photos')
        router.refresh()
      } else {
        throw new Error('Update failed')
      }
    } catch (err) {
      console.error(err)
      setError('خطا در ویرایش عکس')
    }
  }

  if (loading) return <Loading />
  if (error) return <div className="text-red-600 text-center py-4 font-bold">{error}</div>

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5">
      <div className="w-full flex items-center gap-x-2">
        <label className="w-1/3">نام عکس:</label>
        <input
          name="title"
          type="text"
          required
          value={fields.title}
          onChange={handleChange}
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <div className="w-full flex items-center gap-x-2">
        <label className="w-1/3">توضیحات:</label>
        <input
          name="description"
          type="text"
          required
          value={fields.description}
          onChange={handleChange}
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <div className="w-full flex items-center gap-x-2">
        <label className="w-1/3">تاریخ تهیه عکس:</label>
        <div className="w-2/3">
          <ShamsiDatePicker onChange={handleDateChange} initialDate={fields.photoDate ? new Date(fields.photoDate) : new Date()} />
        </div>
      </div>

      <div className="w-full flex items-center gap-x-2">
        <label className="w-1/3">دسته‌بندی:</label>
        <select
          name="category"
          required
          value={fields.category?.id || ''}
          onChange={handleChange}
          disabled={categories.length === 0}
          className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.category_name}
            </option>
          ))}
        </select>
      </div>

      <UploadInput uploadedImage={imagePreview} handleImageUpload={handlePhotoUpdate} uploading={uploading} />

      <div className="w-full flex flex-col items-center gap-y-3">
        <button
          type="submit"
          disabled={uploading}
          className={`w-full p-3 rounded-lg text-white transition-colors ${
            uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {uploading ? 'در حال بارگذاری...' : 'ویرایش عکس'}
        </button>
        <Link
          href="/dashboard/galleries/photos"
          className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700"
        >
          انصراف
        </Link>
      </div>
    </form>
  )
}

export default EditPhotoForm
