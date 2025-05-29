'use client'

import { useState } from 'react'
import jalaali from 'jalaali-js'

import ProfileImageUpload from '@/app/ui/components/ProfileImageUpload'
import StatusBadge from '@/app/ui/components/StatusBadge'
import UserRole from '@/app/ui/components/UserRole'
import { IUser } from '@/lib/types'

interface ProfileInfosProps {
  user: IUser
  profileImage: string
}

const ProfileInfos = ({ user, profileImage }: ProfileInfosProps) => {
  const [currentImage, setCurrentImage] = useState(profileImage || user?.user_img)

  const handleImageUpdate = (newImageUrl: string) => {
    setCurrentImage(newImageUrl)
  }

  const formatBirthDate = (birthdate: string) => {
    if (!birthdate) return ''
    const date = new Date(birthdate)
    const shamsi = jalaali.toJalaali(date)
    return `${shamsi.jy}/${shamsi.jm}/${shamsi.jd}`
  }

  const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
      <span className="font-bold text-gray-800 dark:text-gray-200">{label}:</span>
      <span className="text-lg">{value}</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-1/3">
        <ProfileImageUpload currentImage={currentImage} onUpdate={handleImageUpdate} />
      </div>

      <h2 className="text-2xl font-MorabbaMedium">
        <UserRole role={user?.role} />
      </h2>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <InfoItem label="نام و نام خانوادگی" value={`${user.firstname} ${user.lastname}`} />
        <InfoItem label="شماره ملی" value={user.nationality_number} />
        <InfoItem label="جنسیت" value={user.gender === 'MALE' ? 'آقا' : 'خانم'} />
        <InfoItem label="موبایل" value={user.mobile} />
        <InfoItem label="تاریخ تولد" value={formatBirthDate(user.birthdate)} />
        <InfoItem label="آدرس" value={user.address} />
        <InfoItem label="شماره شناسایی" value={user.identity_number} />
        <InfoItem label="ایمیل" value={user.email} />
        <InfoItem label="وضعیت" value={<StatusBadge status={user.status} />} />
        <InfoItem
          label={user.role === 'TEACHER' ? 'حوزه فعالیت' : 'کلاس آموزش'}
          value={user.skill?.instrument_name}
        />
      </div>
    </div>
  )
}

export default ProfileInfos
