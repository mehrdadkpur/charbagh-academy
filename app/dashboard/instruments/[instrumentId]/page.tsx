"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect, ChangeEvent } from "react"
import { fetchBooks } from "@/lib/requests"
import Loading from "@/app/loading"
import Search from "@/app/ui/components/Search"
import AddButton from "@/app/ui/components/AddButton"
import toast from "react-hot-toast"
import Image from "next/image"
import { IBook, Instrument } from "@/lib/types"
import Swal from "sweetalert2"

interface QueryState {
  text: string
}

const Books = () => {
  const { instrumentId } = useParams();

  const [instrument, setInstrument] = useState<Instrument | null>(null)
  const [books, setBooks] = useState<IBook[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState<QueryState>({ text: "" })
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])

  useEffect(() => {
    const fetchBookData = async () => {
      if (!instrumentId) return
      try {
        const data = await fetchBooks(Number(instrumentId));
        const normalizedBooks = data.books.map((b:any) => ({
          id: b.book.id,
          book_name: b.book.book_name,
          songs: b.book.songs,
        }));
        setInstrument(data)
        setBooks(normalizedBooks);
        setFilteredBooks(normalizedBooks);
        

      } catch (error) {
        toast.error("خطا در دریافت اطلاعات")
      } finally {
        setLoading(false)
      }
    }
    fetchBookData()
  }, [instrumentId])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase()
    setQuery({ text: e.target.value })

    const filtered = books.filter((book) =>
      book.book_name.toLowerCase().includes(searchText)
    )
    setFilteredBooks(filtered)
  }

  const handleDeleteBook = async (bookId: number) => {
    const result = await Swal.fire({
      title: "آیا مطمئنی؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذفش کن",
      cancelButtonText: "نه، منصرف شدم",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    })

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/instruments/${instrumentId}/books/${bookId}`, {
          method: "DELETE",
        })

        if (res.ok) {
          setBooks((prev) => prev.filter((book) => book.id !== bookId))
          setFilteredBooks((prev) => prev.filter((book) => book.id !== bookId))
          Swal.fire("حذف شد!", "کتاب با موفقیت حذف شد.", "success")
        } else {
          Swal.fire("خطا", "مشکلی در حذف کتاب رخ داد.", "error")
        }
      } catch (error) {
        Swal.fire("خطا", "مشکلی در حذف کتاب رخ داد.", "error")
        console.error("Error deleting book:", error)
      }
    }
  }

  if (loading) return <Loading />
  
  return (
    <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
      <div className="w-full p-5 flex justify-center rounded-xl">
        <div className="w-full mt-5">
          <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
            کتاب‌های موسیقی ساز{" "}
            <span className="bg-mango p-2 rounded-xl mx-2">
              {instrument?.instrument_name}
            </span>
          </span>

          {/* Search & Add */}
          <div className="w-full flex justify-center items-center gap-x-5 mb-5">
            <Search query={query} handleSearch={handleSearch} baseSearch="نام کتاب" />
            <AddButton route={`/dashboard/instruments/${instrumentId}/add-book`} />
          </div>

          {/* Table */}
          <div className="relative w-full overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left font-DanaMedium rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">نام کتاب</th>
                  <th scope="col" className="px-6 py-3">تعداد موسیقی</th>
                  <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
  {filteredBooks.map((book) => (
    <tr key={book.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0">
            <Image width={40} height={40} className="rounded-full" src="/images/songs/book.png" alt="book" />
          </div>
          <div className="mr-3">
            <div className="text-base font-semibold">{book.book_name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">{book.songs?.length || 0}</td>
      <td className="flex justify-center items-center py-4">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/instruments/${instrumentId}/books/${book.id}`} className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors">
            مشاهده موسیقی ها
          </Link>
          <Link href={`/dashboard/instruments/${instrumentId}/books/${book.id}/edit-book`} className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors">
            ویرایش
          </Link>
          <button onClick={() => handleDeleteBook(book.id)} className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors">
            حذف
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* Back Button */}
          <div className="w-full mt-5 flex justify-center items-center font-DanaDemiBold">
            <Link href="/dashboard/instruments" className="w-1/6 flex justify-center items-center bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors">
              بازگشت به لیست سازها
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Books
