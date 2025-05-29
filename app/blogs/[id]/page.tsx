'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import jalaali from "jalaali-js";
import { fetchBlog } from "../../../lib/requests";
import Loading from "@/app/loading";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Image from "next/image";
import ErrorHandling from "@/app/ui/components/ErrorHandling";
import { IBlog } from "@/lib/types";

const formatShamsiDate = (date: Date) => {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  const paddedMonth = jm.toString().padStart(2, '0');
  const paddedDay = jd.toString().padStart(2, '0');
  return `${jy}/${paddedMonth}/${paddedDay}`;
};

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const blogData = await fetchBlog(id as string);
        setBlog(blogData);
      } catch (error) {
        if (error instanceof Error) {
          console.error("خطا در واکشی بلاگ:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  useEffect(() => {
    if (typeof window !== 'undefined' && blog) {
      document.title = `${blog.blog_title} | ${blog.author.firstname} ${blog.author.lastname}`;
    }
  }, [blog]);

  if (loading) return <Loading />;
  if (!blog) return <ErrorHandling />;

  const shamsiDate = formatShamsiDate(new Date(blog.createdAt));

  return (
    <section>
      <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
        <RoutesHeader pageTitle="خبرنامه" boldText={blog.blog_title} Highlight="" />
        
        <div className="container relative">
          <div className="content flex justify-center items-center flex-col">
            <div className="mt-20 absolute -top-[190px] md:-top-[250px] bg-white dark:bg-gray-700 p-2 rounded-3xl">
              <Image
                width={400}
                height={200}
                className="scale-95 rounded-3xl"
                src={blog.blog_img}
                alt="blog"
              />
            </div>

            <div
              className="w-[80%] py-3 mt-[330px] md:mt-[300px] text-base font-Dana text-justify leading-10 text-[#152420]/80 dark:text-gray-50"
              dangerouslySetInnerHTML={{ __html: blog.blog_text }}
            ></div>

            <div className="w-[80%] mt-10 text-sm font-Dana dark:text-gray-50">
              نوشته شده توسط: {blog.author.firstname} {blog.author.lastname} در تاریخ: {shamsiDate}
            </div>
          </div>
        </div>

        <div>
          <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer shape" />
        </div>
      </div>
    </section>
  );
};

export default Blog;
