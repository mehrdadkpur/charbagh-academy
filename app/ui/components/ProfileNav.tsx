'use client'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import Notifications from './Notifications'
import Image from 'next/image'
import Theme from './Theme'
import { useClickOutside } from "@/app/Hooks/useClickOutside"
import { IUser } from '@/lib/types'
import UserRole from './UserRole'

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  useClickOutside(menuRef, () => setIsOpen(false))
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.log('Failed to fetch user data:', error)
      }
    }
    fetchUserData()
  }, [])
  
  const handleLogout = async () => {
    await fetch('/api/public/logout', { method: 'POST' })
    window.location.href = '/'
  }
  
  if (!isLoggedIn) {
    return (
      <div className='flex gap-x-5 lg:gap-x-6 xl:gap-x-8 font-DanaMedium text-sm lg:text-lg xl:text-xl text-gray-900 dark:text-gray-50 rounded-xl shadow-xl'>
        <Link 
          href="/login"
          className="flex justify-center items-center px-4 text-lg font-medium font-DanaMedium text-gray-900 Dark:text-white dark:text-gray-50 hover:text-mango dark:hover:text-mango transition-colors duration-200 z-50"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="hidden sm:inline">ورود</span>
        </Link>
        <Theme/>
      </div>
    )
  }
  
  if (!user) return null
  
  const MenuLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
  
  // Check if user has admin access - convert to number if needed
  const isAdmin = user.isAdmin == 1;
  
  // Fix the role condition
  const hasRoleBasedAccess = ["TEACHER", "STUDENT", "ADMIN"].includes(user.role);
  return (
    <div className="flex items-center gap-4 px-7 font-Dana z-50 rounded-xl shadow-xl">
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <Image
            width={40}
            height={40}
            src={user.user_img || '/images/default-avatar.png'} // Add fallback image
            alt={`${user.firstname} ${user.lastname}`}
            className="rounded-full ring-2 ring-gray-600 dark:ring-gray-200"
          />
          <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-200">
            {/* Username if needed */}
          </span>
        </button>
        
        {isOpen && (
          <div className="absolute -right-28 mt-2 w-56 rounded-xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium font-DanaMedium py-2">{user.firstname} {user.lastname}</p>
                <UserRole role={user.role}/>
              </div>
              
              {/* Show dashboard link if user is admin */}
              {isAdmin && (
                <MenuLink
                  href="/dashboard"
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>}
                >
                  داشبورد مدیریت
                </MenuLink>
              )}
              
              {/* User menu items */}
              <div>
                <MenuLink
                  href="/user/profile"
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>}
                >
                  پروفایل کاربری
                </MenuLink>
                
                <MenuLink
                  href="/user/change-password"
                  icon={<svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                  </svg>}
                >
                  تغییر کلمه عبور
                </MenuLink>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>خروج</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isAdmin && <Notifications />}
      <Theme />
    </div>
  )
}
