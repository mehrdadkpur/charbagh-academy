import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">دسترسی غیرمجاز</h1>
      <p className="text-lg text-gray-600 mb-6">
        شما اجازه دسترسی به این صفحه را ندارید.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  )
}
