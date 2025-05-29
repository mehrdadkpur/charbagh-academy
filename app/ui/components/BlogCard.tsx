import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  blog: {
    id: number
    authorId:number
    blog_title: string
    blog_img: string
    blog_text: string
    createdAt: string
    updatedAt:string
  }
  shamsiCreatedDate: {
    jy: number
    jm: number
    jd: number
  }
}

const BlogCard = ({ blog, shamsiCreatedDate }: BlogCardProps) => (
  <Link
    key={blog.id} 
    href={`/blogs/${blog.id}`} 
    className="group relative flex flex-col w-full sm:w-[350px] lg:w-[400px] p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
  >
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      <Image 
        fill 
        src={blog?.blog_img} 
        alt={blog.blog_title} 
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>

    <div className="mt-4 sm:mt-6 md:mt-8 text-center">
      <time className="text-xs sm:text-sm font-DanaMedium text-mango dark:text-mango-400">
        {`${shamsiCreatedDate.jy}/${shamsiCreatedDate.jm}/${shamsiCreatedDate.jd}`}
      </time>
      
      <h2 className="py-2 text-lg sm:text-xl font-DanaDemiBold text-gray-800 dark:text-gray-100 ">
        {blog.blog_title}
      </h2>
      
      <p className=" max-h-10 mb-7 sm:mt-4 text-xs sm:text-sm font-DanaMedium text-gray-600 dark:text-gray-300 line-clamp-2 ">
        {blog.blog_text}
      </p>
    </div>

    <div className="absolute left-1/2 -bottom-8 -translate-x-1/2">
      <div className="relative size-12 sm:size-14 md:size-16 bg-gray-100 dark:bg-gray-700 rounded-full 
      transition-transform duration-500 group-hover:rotate-180 group-hover:scale-125">
        <div className="absolute inset-0 m-auto size-[35px] sm:size-[40px] md:size-[47px] 
        bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg 
            className="size-4 sm:size-5 md:size-6 text-mango dark:text-mango-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="3" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
)

export default BlogCard
