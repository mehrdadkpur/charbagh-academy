import { fetchComments } from "@/lib/requests"
import Link from "next/link"
import CommentCard from "../components/CommentCard"
import Image from "next/image"

interface Comment {
  id: string
  comment_author: string
  comment_text: string
  comment_date: Date
}

const Comments = async () => {
  const { comments } = await fetchComments()

  return (
    <section className="bg-[#F0EEE6] dark:bg-gray-900">  
        <div className="flex flex-col items-center gap-16">
          {/* Header */}
          <div className="pt-3 text-center">
            <h4 className="text-xs md:text-lg font-DanaMedium text-elf"> اعتبارنامه </h4>
            <h2 className="text-3xl md:text-5xl font-MorabbaBold text-gray-900 dark:text-gray-50 leading-[60px] md:leading-[80px]">
              فارغ التحصیلان و مــردم دربــاره مــا چه نظــــری دارنـد
            </h2>
          </div>

          {/* Comments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {comments?.slice(0, 3).map((comment:Comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/comments"
            className="font-DanaMedium bg-mango dark:bg-elf md:text-2xl text-gray-900 dark:text-gray-50 text-sm p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700"
          >
            نظرات بیشتر
          </Link>
        </div>
      <Image
              src="/images/shapes/wave-3.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/wave-3-dark-2.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
    </section>
  )
}

export default Comments
