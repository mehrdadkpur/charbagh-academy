'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export default function AdminResetPasswordPage() {
  const [nationalityNumber, setNationalityNumber] = useState('')
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    if (!nationalityNumber) {
      Swal.fire('خطا', 'لطفاً کد ملی را وارد کنید', 'warning')
      return
    }

    setLoading(true)
    setUser(null)

    try {
      const res = await fetch('/api/user/find-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationalityNumber })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setUser(data.user)
      toast.success('کاربر یافت شد')
    } catch (err: any) {
      Swal.fire('خطا', err.message || 'خطا در جستجوی کاربر', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    if (!user?.id) return

    const result = await Swal.fire({
      title: 'بازنشانی رمز عبور',
      text: 'آیا مطمئن هستید که می‌خواهید رمز عبور کاربر را به "شماره ملی کاربر" بازنشانی کنید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، بازنشانی کن',
      cancelButtonText: 'لغو',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    })

    if (!result.isConfirmed) return

    try {
      const res = await fetch('/api/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      Swal.fire('موفق', 'رمز عبور با موفقیت بازنشانی شد', 'success');
      setUser(null)
      setNationalityNumber('')
      
    } catch (err: any) {
      Swal.fire('خطا', err.message || 'خطا در بازنشانی رمز عبور', 'error')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">بازنشانی رمز عبور کاربر</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">کد ملی کاربر</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
            value={nationalityNumber}
            onChange={(e) => setNationalityNumber(e.target.value)}
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'در حال جستجو...' : 'جستجوی کاربر'}
        </button>

        {user && (
          <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800">
            <p><strong>نام:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>کد ملی:</strong> {user.nationality_number}</p>
            <p><strong>ایمیل:</strong> {user.email || '---'}</p>

            <button
              onClick={handleReset}
              className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              بازنشانی رمز عبور 
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
