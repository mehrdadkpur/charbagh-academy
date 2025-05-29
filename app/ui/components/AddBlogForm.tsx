"use client"

import Link from "next/link"
import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import UploadInput from "@/app/ui/components/UploadInput"
import toast from "react-hot-toast"
import { IUser } from "@/lib/types"

interface IBlog {
    blog_title: string;
    blog_text: string;
    blog_img: string;
    author: string;
    authorId:number;
    status:string;
  }


const AddBlogForm = ({user}: {user:IUser}) => {
    const router = useRouter()

    const [fields, setFields] = useState<IBlog>({
        author: "",
        authorId: 0,
        blog_title: "",
        blog_text: "",
        blog_img: "",
        status: "PENDING",
      });
      
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState('/images/avatar.png')

    useEffect(() => {
        if (user) {
          setFields(prev => ({
            ...prev,
            author: `${user.firstname} ${user.lastname}`,
            authorId: user.id
          }));
        }
      }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const blogData = {
            ...fields,
            authorId: user.id,
            status: "PENDING"
          }

        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            })

            if (response.ok) {
                toast.success("پست جدبد با موفقیت ایجاد شد.")
                router.push('/user/profile')
            }
        } catch (error) {
            toast.error("خطا در ایجاد پست جدید")
            console.error("Error submitting blog:", error)
        }
    }

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('blog_title', fields.blog_title)

        try {
            const response = await fetch('/api/blogs/upload-blog-image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, blog_img: data.url }))
                toast.success('تصویر با موفقیت آپلود شد')
            }
        } catch (error) {
            toast.error('خطا در آپلود تصویر')
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-start flex-col gap-y-5 font-DanaMedium">
        
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="author"> نویسنده: </label>
                <input
                        name="author"
                        className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        value={`${user.firstname} ${user.lastname}`}
                        disabled
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_title"> موضوع: </label>
                <input
                        name="blog_title"
                        className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="موضوع "
                        required
                        value={fields.blog_title}
                        onChange={handleChange}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_text"> متن پست: </label>
                <textarea
                        name="blog_text"
                        className="w-full h-60 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="متن پست "
                        required
                        value={fields.blog_text}
                        onChange={handleChange}
                    />
            </div>
            <UploadInput uploadedImage={imagePreview} uploading={uploading} handleImageUpload={handleImageUpload}  />
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button 
                    type="submit" 
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-gray-50 hover:bg-green-700 transition-colors"
                >
                    ساخت پست
                </button>
                <Link 
                    href="/user/profile" 
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-gray-50 hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
    )
}

export default AddBlogForm

