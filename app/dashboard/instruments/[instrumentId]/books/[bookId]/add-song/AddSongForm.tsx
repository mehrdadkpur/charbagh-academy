"use client"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter, useParams } from 'next/navigation'
import toast from "react-hot-toast";
import { ISong } from "@/lib/types";

const AddSongForm = () => {

    const router = useRouter();

    const {instrumentId}= useParams();
    const { bookId } = useParams();
    const [fields, setFields] = useState<ISong>({
        id:0,
        song_title: "",
        song_artist: "نامشخص",
        song_url: "",
        createdAt:"",
        updatedAt:""
    })
    const [uploading, setUploading] = useState(false)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSongUpload = async (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('songTitle', fields.song_title)
        formData.append('previousSongUrl', fields.song_url)
        formData.append('songArtist', fields.song_artist)

        try {
            const response = await fetch('/api/instruments/upload-song', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, song_url: data.url }))
            }
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const response = await fetch(`/api/instruments/${instrumentId}/books/${bookId}/songs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
          })
          

      const data = await response.json()
      if (response.ok) {
        toast.success('موسیقی با موفقیت اضافه شد.')
        router.push(`/dashboard/instruments/${instrumentId}/books/${bookId}`);
      }
    }


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
        <button type="submit" className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"> افزودن موسیقی</button>
        <Link href={`/dashboard/instruments/${instrumentId}/books/${bookId}`} className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"> انصراف </Link>
      </div>
    </form>
  );
};

export default AddSongForm;
