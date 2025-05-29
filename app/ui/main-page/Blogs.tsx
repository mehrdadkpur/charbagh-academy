import Link from "next/link"
import { fetchActiveBlogs } from "@/lib/requests"
import jalaali from 'jalaali-js'
import BlogCard from "@/app/ui/components/BlogCard"
import { IBlog } from "@/lib/types"


const Blogs = async () => {
  const { blogs } = await fetchActiveBlogs();
  
  return (
    <section className="bg-[#F6F4EE] dark:bg-[#25403c]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16">
          {/* Header */}
          <div className="text-center">
            <h4 className="ext-xs md:text-lg font-DanaMedium text-elf">
              خبرنامه
            </h4>
            <h2 className="text-3xl md:text-5xl font-MorabbaBold text-gray-900 dark:text-gray-50 leading-[60px] md:leading-[80px]">
              خبرنامه آموزشگاه موسیقی ما و رویدادهای مهم
            </h2>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {blogs?.slice(0,2).map((blog: IBlog) => {
              const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt))
              return (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  shamsiCreatedDate={shamsiCreatedDate}
                />
              )
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="/blogs"
            className="font-DanaMedium bg-mango dark:bg-elf md:text-2xl text-gray-900 dark:text-gray-50 text-sm p-3 mb-4 rounded-3xl hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700"
          >
            بیشتر
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blogs
