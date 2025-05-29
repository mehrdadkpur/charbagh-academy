'use client'

import Link from 'next/link'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import toast from 'react-hot-toast'
import { ISong , IBook } from '@/lib/types'

const EditSongForm = () => {
    const { instrumentId, bookId, songId } = useParams()
    const router = useRouter()
    
    const [fields, setFields] = useState<ISong>({
        id:0,
        song_title: "",
        song_artist: "",
        song_url: "",
        createdAt:"",
        updatedAt:""
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const fetchSong = async () => {
            try {
              const response = await fetch(`/api/instruments/${instrumentId}/books/${bookId}/songs/${songId}`)
              const data = await response.json();
          
              setFields(data)
            } catch (error) {
              console.error("Error fetching song:", error)
              toast.error("خطا در دریافت اطلاعات")
            } finally {
              setLoading(false)
            }
          }
          
      
        fetchSong()
      }, [instrumentId, bookId, songId])
      

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSongUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('songTitle', fields.song_title)
        formData.append('songArtist', fields.song_artist)
        formData.append('previousUrl', fields.song_url)
        
        try {
            const response = await fetch('/api/instruments/upload-song', {
                method: 'POST',
                body: formData
            })
    
            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, song_url: data.url }))
                toast.success('آپلود موفقیت آمیز')
            }
        } catch (error) {
            toast.error('خطا در آپلود فایل')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/instruments/${instrumentId}/books/${bookId}/songs/${songId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })

            if (response.ok) {
                toast.success('ویرایش موفقیت آمیز بود')
                router.push(`/dashboard/instruments/${instrumentId}/books/${bookId}`)
                router.refresh()
            }
        } catch (error) {
            toast.error('خطا در ویرایش موسیقی')
            setError('An error occurred while updating the Song.')
        }
    }

    if (loading) return <Loading />
    if (error) return <p>{error}</p>

  

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="song_title">نام موسیقی:</label>
          <input
            name="song_title"
            type="text"
            className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
            placeholder="نام موسیقی"
            required
            value={fields.song_title}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="song_artist"> نوازنده:</label>
          <input
            name="song_artist"
            type="text"
            className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
            placeholder="نوازنده"
            required
            value={fields.song_artist}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="">آپلود موسیقی:</label>
          <input
            type="file"
            accept="audio/mp3"
            onChange={handleSongUpload}
            className="block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
          {uploading && <span className="absolute right-0 top-0">در حال آپلود...</span>}
        </div>
        <div className="w-full flex justify-center items-center flex-col gap-y-3">
          <button type="submit" className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors">ویرایش</button>
          <Link href={`/dashboard/instruments/${instrumentId}/books/${bookId}`} className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"> انصراف </Link>
        </div>
      </form>
    );
};

export default EditSongForm;
