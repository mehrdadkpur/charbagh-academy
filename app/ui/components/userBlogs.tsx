'use client'

import { useEffect, useState } from 'react'
import { IUser } from '@/lib/types'
import toast from 'react-hot-toast'
import Image from 'next/image'
import jalaali from "jalaali-js"
import Loading from '@/app/loading'
import Link from 'next/link'
import Swal from 'sweetalert2'


interface IBlog {
  id: number
  blog_title: string
  blog_text: string
  blog_img?: string
  status: string
  createdAt: string
}

const statusLabels: Record<string, string> = {
  PENDING: "در انتظار بررسی",
  ACTIVE: "منتشر شده",
  DEACTIVE: "غیرفعال",
};

export default function UserBlogsPage({ user }: { user: IUser }) {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return;
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs/user?authorId=${user.id}`);        

        const data = await res.json();
        
        if (res.ok) {
          setBlogs(data.blogs)
        } else {
          toast.error(data.error || 'خطا در دریافت پست‌ها')
        }
      } catch (err) {
        toast.error('خطای سرور')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchBlogs()
  }, [user])
  const handleDeleteConfirm = async (blogId:number) => {

    const result = await Swal.fire({
        title: "آیا مطمئن هستید؟",
        text: "این عملیات قابل بازگشت نیست!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "بله، حذف کن",
        cancelButtonText: "لغو",
      });

    if(result.isConfirmed){

        
        try {
            const res = await fetch(`/api/blogs/${blogId}`, {
                method: "DELETE"
            })
            
            if (res.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== blogId))
                toast.success('پست با موفقیت حذف شد', { duration: 5000 })
                
        }
    } catch (error) {
        toast.error('خطا در حذف پست')
        console.error("Error deleting Blog:", error)
    }
}
}

  return (
    <div className="p-6 font-Dana">
      <h1 className="text-xl font-bold mb-4">پست‌های من</h1>

      {loading && <Loading/>}

      {!loading && blogs.length === 0 && 
      <div className='w-2/3 h-96 flex justify-center items-center text-center flex-col font-DanaDemiBold text-2xl '>
        <span className='p-2 bg-mango rounded-lg'>  {user.firstname} عزیز </span>
        <span>  تا حالا پستی ایجاد نکردی.برای شروع از منوی سمت راست استفاده کن.</span>
      </div>
      }

      <div className="w-2/3 space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="border border-gray-400 p-4 rounded bg-gray-50 dark:bg-gray-700">
            <h2 className="text-lg font-semibold">{blog.blog_title}</h2>
            <p className="my-2 text-justify">{blog.blog_text}</p>
            {blog.blog_img && (
              <Image width={200} height={100} className="scale-95 rounded-3xl " src={blog.blog_img} alt="blog" />
            )}
            <p className="text-sm my-2 text-gray-600 dark:text-gray-300">وضعیت: {statusLabels[blog.status]}</p>
            <div className="w-[80%] mt-10 text-sm font-Dana dark:text-gray-50"> تاریخ انتشار: {jalaali.toJalaali(new Date(blog.createdAt)).jy}/{jalaali.toJalaali(new Date(blog.createdAt)).jm}/{jalaali.toJalaali(new Date(blog.createdAt)).jd}</div>
            <span className="text-sm">ساعت: {new Date(blog.createdAt).toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'})}</span>
            <div className="flex justify-center items-center gap-2">
              <Link 
              href={`/user/profile/${blog.id}/edit`}
              className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
              >
              ویرایش
              </Link>
              <button 
              onClick={() => handleDeleteConfirm(blog.id)}
              className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
              >
              حذف
              </button>
              </div>
          </div>
        ))}

        
      </div>
    </div>
  )
}
