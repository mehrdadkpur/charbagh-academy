'use client'

import Link from 'next/link'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import toast from 'react-hot-toast'
import { IBook } from '@/lib/types'

const EditBookForm = () => {
    const { instrumentId, bookId } = useParams()
    const router = useRouter()

    const [fields, setFields] = useState<IBook>({
        id: 0,
        book_name: '',
        createdAt:"",
        updatedAt:""
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`/api/admin/instruments/${instrumentId}/books/${bookId}`)
                const data = await response.json();
                
                setFields(data.book)
            } catch (error) {
                toast.error('خطا در دریافت اطلاعات')
            } finally {
                setLoading(false)
            }
        }

        if (instrumentId && bookId) {
            fetchBook()
        }
    }, [instrumentId, bookId])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/admin/instruments/${instrumentId}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })

            if (response.ok) {
                toast.success('ویرایش کتاب موفقیت آمیز بود')
                router.push(`/dashboard/instruments/${instrumentId}`)
                router.refresh()
            }
        } catch (error) {
            toast.error('خطا در ویرایش کتاب')
        }
    }

    if (loading) return <Loading />

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
                    ویرایش کتاب
                </button>
                <Link
                    href={`/dashboard/instruments/${instrumentId}`}
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
    )
}

export default EditBookForm
