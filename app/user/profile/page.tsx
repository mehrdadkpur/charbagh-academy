'use client';

import AddBlogForm from '@/app/ui/components/AddBlogForm';
import ProfileInfos from '@/app/ui/components/profileInfos';
import Support from '@/app/ui/components/Support';
import UserBlogs from '@/app/ui/components/userBlogs';
import { IUser } from '@/lib/types';
import { useEffect, useState } from 'react';

type Tab = 'profile' | 'edit' | 'support' | 'add_blog' | 'blogs';

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [user, setUser] = useState<IUser | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data.user);
        setProfileImage(data.user?.user_img);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 p-4 flex sm:flex-col gap-4 border-r border-gray-300 dark:border-gray-700">
        <button onClick={() => setActiveTab('profile')} className="bg-green-600 text-white p-3 rounded-lg w-full">
          مشاهده اطلاعات
        </button>
        <button onClick={() => setActiveTab('add_blog')} className="bg-green-600 text-white p-3 rounded-lg w-full">
          ایجاد پست
        </button>
        <button onClick={() => setActiveTab('blogs')} className="bg-green-600 text-white p-3 rounded-lg w-full">
          مشاهده پست ها
        </button>
        <button onClick={() => setActiveTab('support')} className="bg-green-600 text-white p-3 rounded-lg w-full">
          تیکت‌های پشتیبانی
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full sm:w-3/4 p-6 flex flex-col items-center">
        {user && activeTab === 'profile' && <ProfileInfos user={user} profileImage={profileImage || ''} />}
        {user && activeTab === 'add_blog' && <AddBlogForm user={user}/>}
        {user && activeTab === 'blogs' && <UserBlogs user={user} />}
        {activeTab === 'support' && <Support />}
      </div>
    </div>
  );
}
