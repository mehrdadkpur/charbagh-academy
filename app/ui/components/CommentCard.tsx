'use client'

import Image from "next/image"

interface Comment {
  id: string
  comment_author: string
  comment_text: string
  comment_date: Date
}

const CommentCard = ({ comment }: { comment: Comment }) => (
  <div className="w-full max-w-[380px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex flex-col items-center gap-6">
      <Image
        src="/images/comments/01.jpg"
        alt={comment.comment_author}
        width={120}
        height={120}
        className="rounded-full"
      />
      
      <h3 className="text-2xl font-DanaDemiBold text-gray-800 dark:text-gray-100">
        {comment.comment_author}
      </h3>
      
      <span className="text-lg font-DanaMedium text-mango dark:text-mango-400">
        هنرآموز
      </span>
      
      <p className="text-base font-Dana text-gray-600 dark:text-gray-300 text-center">
        {comment.comment_text}
      </p>
      
      <Image
        src="/images/comments/quote.png"
        alt="quote"
        width={32}
        height={32}
        className="opacity-50 dark:opacity-30"
      />
    </div>
  </div>
)
export default CommentCard;