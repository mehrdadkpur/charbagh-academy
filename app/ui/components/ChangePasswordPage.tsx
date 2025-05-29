'use client'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      })
  
      const data = await response.json()
      
      if (!response.ok) {
        toast.error('خطا در تغییر رمز عبور')
        throw new Error(data.error)
      }
      toast.success('رمز عبور با موفقیت تغییر کرد')
      setSuccess('رمز عبور با موفقیت تغییر کرد')
      
      // Logout after successful password change
      await fetch('/api/logout', {
        method: 'POST'
      })
  
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500) // 1.5 second delay to show success message
  
    } catch (err:any) {
      setError(err.message || 'خطا در تغییر رمز عبور')
    }
  }
  

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">تغییر رمز عبور</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">رمز عبور فعلی</label>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
            required
          />
        </div>
        <div>
          <label className="block mb-2">رمز عبور جدید</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
            required
          />
        </div>
        <div>
          <label className="block mb-2">تکرار رمز عبور جدید</label>
          <input
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
            required
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <div className='w-full flex flex-col gap-y-3 '>
          <button type="submit" className="w-full bg-elf-900 text-white py-2 rounded hover:bg-elf" > تغییر رمز عبور </button>
          <Link href={'/'} className="w-full flex justify-center items-center bg-red-500 text-white py-2 rounded hover:bg-red-600 p-2">بازگشت به خانه</Link>
        </div>
      </form>
    </div>
  )
}
