'use client';
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import { fetchPendingBlogs, fetchGuidances } from "@/lib/requests";
import { getStatusDisplayText } from '@/helper/notification-status';
import { IBlog, IGuidance } from "@/lib/types";

const Notifications = () => {
  const [guidances, setGuidances] = useState<IGuidance[]>([]);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadGuides = guidances.filter(g => g.status === "PENDING");
  const unconfirmedBlogs = blogs.filter(b => b.status === "PENDING");

  const totalNotifications = unreadGuides.length + unconfirmedBlogs.length;

  const loadData = async () => {
    try {
      const [guidanceRes, blogRes] = await Promise.all([fetchGuidances(), fetchPendingBlogs()]);
      setGuidances(guidanceRes.guidances || []);
      setBlogs(blogRes.blogs || []);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateGuidanceStatus = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/guidances/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "DEACTIVE" }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'خطا در بروزرسانی وضعیت');
      }

      setGuidances(prev => prev.map(g => g.id === id ? { ...g, status: "DEACTIVE" } : g));
      toast.success('وضعیت با موفقیت بروزرسانی شد');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('خطا در بروزرسانی وضعیت');
    }
  };

  return (
    <div className="relative font-Dana" ref={notificationRef}>
      <button
        type="button"
        className="relative inline-flex items-center p-2 sm:p-3 text-sm font-medium text-gray-900 dark:text-gray-50 rounded-lg hover:bg-mango/10 focus:ring-2 focus:ring-mango/20 transition-all duration-300 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.455 1.31m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        {totalNotifications > 0 && (
          <div className="absolute inline-flex items-center justify-center w-4 h-4 md:w-6 md:h-6 text-xs font-DanaMedium text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
            {totalNotifications}
          </div>
        )}
      </button>

      {isOpen && (
  <div className="absolute -right-28 mt-2 w-64 sm:w-72 rounded-xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 z-50 text-gray-700 dark:text-white">
    <div className="py-2 max-h-[70vh] overflow-y-auto flex flex-col gap-2">

      {/* 🟢 مشاوره‌ها */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <h4 className="text-xs sm:text-sm font-DanaMedium px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          درخواست‌های مشاوره
        </h4>

        {unreadGuides.length > 0 ? (
          unreadGuides.map((guide) => {
            const formattedMobile = guide.mobile.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
            return (
              <button
                key={guide.id}
                onClick={() => updateGuidanceStatus(guide.id)}
                className="w-full text-right px-4 py-3 hover:bg-green-50 dark:hover:bg-green-800/30 transition-colors duration-200"
              >
                <div className="flex flex-col gap-1 text-sm">
                  <span>{guide.fullname}</span>
                  <span className="text-base font-Dana">{formattedMobile}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getStatusDisplayText(guide.status)}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-sm px-4 py-4 text-center text-gray-600 dark:text-gray-300">
            درخواست مشاوره‌ای وجود ندارد
          </div>
        )}
      </div>

      {/* 🔵 بلاگ‌ها */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <h4 className="text-xs sm:text-sm font-DanaMedium px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
          پست‌های تایید نشده
        </h4>

        {unconfirmedBlogs.length > 0 ? (
          unconfirmedBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/dashboard/blogs/${blog.id}`}
              className="w-full block text-right px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-800/30 transition-colors duration-200"
            >
              <div className="flex flex-col gap-1 text-sm">
                <span>{`${blog.author.firstname} ${blog.author.lastname}`}</span>
                <span className="text-base font-Dana">{blog.blog_title}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-sm px-4 py-4 text-center text-gray-600 dark:text-gray-300">
            پست تایید نشده‌ای وجود ندارد
          </div>
        )}
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Notifications;
