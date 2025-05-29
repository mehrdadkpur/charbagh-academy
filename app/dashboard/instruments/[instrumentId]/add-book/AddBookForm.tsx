"use client"

import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IBook } from "@/lib/types"

const AddBookForm = () => {
    const router = useRouter()
    const params = useParams();

    const {instrumentId} = params;

    const [fields, setFields] = useState<IBook>({
        id:0,
        book_name: "",
        createdAt:"",
        updatedAt:"",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
          
        try {
            const response = await fetch(`/api/instruments/${instrumentId}/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields),
            })

            const data = await response.json();
            if (response.ok) {
              toast.success('کتاب با موفقیت اضافه شد');
              router.push(`/dashboard/instruments/${instrumentId}`);
            } else {
              toast.error(data.error || 'خطا در ثبت کتاب');
            }
          } catch (error) {
            toast.error('خطا در ثبت کتاب');
          }
        
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="book_name">نام کتاب:</label>
                <input
                    name="book_name"
                    type="text"
                    className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                    placeholder="نام کتاب"
                    required
                    value={fields.book_name}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button
                    type="submit"
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                    ایجاد کتاب
                </button>
                <Link
                    href="/dashboard/instruments"
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
    )
}

export default AddBookForm
