"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchBlog } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";
import jalaali from 'jalaali-js';
import { IBlog } from "@/lib/types";
import toast from "react-hot-toast";

const statusLabels: Record<string, string> = {
  PENDING: "در انتظار بررسی",
  ACTIVE: "منتشر شده",
  DEACTIVE: "غیرفعال",
};

const StatusButtons = ({
  status,
  onChange,
}: {
  status: string;
  onChange: (s: "ACTIVE" | "PENDING") => void;
}) => {
  if (status === "PENDING") {
    return (
      <button
        onClick={() => onChange("ACTIVE")}
        className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
      >
        تایید پست
      </button>
    );
  }

  if (status === "ACTIVE") {
    return (
      <button
        onClick={() => onChange("PENDING")}
        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
      >
        رد کردن پست
      </button>
    );
  }

  if (status === "DEACTIVE") {
    return (
      <button
        onClick={() => onChange("ACTIVE")}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        تایید مجدد
      </button>
    );
  }

  return null;
};

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const blog = await fetchBlog(id as string);
        setBlog(blog);
      } catch (error) {
        console.error("Error fetching Blog:", (error as Error).message);
        toast.error("خطا در دریافت اطلاعات پست");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleStatusChange = async (newStatus: "ACTIVE" | "PENDING") => {
    if (!blog) return;

    if (newStatus === blog.status) {
      toast("وضعیت تغییری نکرده است");
      return;
    }

    try {
      const res = await fetch(`/api/blogs/status/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setBlog((prev) => (prev ? { ...prev, status: newStatus } : prev));
        toast.success("وضعیت پست بروزرسانی شد");
      } else {
        toast.error("خطا در بروزرسانی وضعیت");
      }
    } catch (error) {
      toast.error("خطای سرور هنگام بروزرسانی وضعیت");
    }
  };

  if (loading) return <Loading />;
  if (!blog) return <div>پست مورد نظر یافت نشد</div>;

  const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
  const shamsiUpdatedDate = jalaali.toJalaali(new Date(blog.updatedAt));

  return (
    <div className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900">
      <div className="w-full p-5 flex justify-center rounded-xl">
        <div className="w-full flex flex-col justify-center items-center gap-y-5">
          <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
            مشخصات پست
          </span>
          <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
            <Image
              width={350}
              height={350}
              src={blog.blog_img}
              alt={blog.blog_title}
              className="rounded-xl"
            />
            <div className="w-full flex p-3 shadow-xl font-DanaMedium rounded-lg">
              <div className="w-full flex flex-col gap-y-2 p-3">
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>موضوع پست:</span>
                  <span className="text-xl">{blog.blog_title}</span>
                </div>
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>نویسنده پست:</span>
                  <span className="text-xl">
                    {blog.author.firstname} {blog.author.lastname}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>تاریخ ایجاد پست:</span>
                  <span className="text-xl">
                    {shamsiCreatedDate.jy}/{shamsiCreatedDate.jm}/
                    {shamsiCreatedDate.jd}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>ساعت ایجاد پست:</span>
                  <span className="text-xl">
                    {new Date(blog.createdAt).toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>زمان ویرایش پست:</span>
                  <span className="text-xl">
                    {shamsiUpdatedDate.jy}/{shamsiUpdatedDate.jm}/
                    {shamsiUpdatedDate.jd} -{" "}
                    {new Date(blog.updatedAt).toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>متن اصلی پست:</span>
                  <span className="text-xl">{blog.blog_text}</span>
                </div>
                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                  <span>وضعیت:</span>
                  <span className="text-xl">{statusLabels[blog.status]}</span>
                </div>
                <div className="w-full flex justify-center items-center">
                  <StatusButtons status={blog.status} onChange={handleStatusChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 flex justify-center items-center font-DanaMedium">
            <Link
              href={"/dashboard/blogs"}
              className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white"
            >
              بازگشت
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
