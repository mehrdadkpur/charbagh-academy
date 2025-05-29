import Image from "next/image"
import Link from "next/link"
import { IUser } from "@/lib/types"

const TeacherCard = ({ teacher }: { teacher: IUser }) => (
  <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
    <div className="flex flex-col items-center gap-4">
      <Image
        src={teacher.user_img || '/images/default-avatar.png'}
        alt={`${teacher.firstname} ${teacher.lastname}`}
        width={144}
        height={144}
        className="rounded-full border border-mango"
        priority
      />
      <div className="text-center space-y-1">
        <h3 className="text-sm md:text-lg font-DanaDemiBold text-gray-800 dark:text-gray-100">
          {teacher.firstname} {teacher.lastname}
        </h3>
        <p className="text-sm font-Dana text-gray-600 dark:text-gray-300">
          مدرس ساز {teacher.skill?.instrument_name}
        </p>
      </div>
      <Link
        href={`/teachers/${teacher.id}`}
        className="font-DanaMedium bg-mango dark:bg-elf text-sm md:text-lg text-gray-900 dark:text-gray-50 p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700"
      >
        مشاهده رزومه
      </Link>
    </div>
  </div>
)

const TeacherGrid = ({ teachers }: { teachers: IUser[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
    {teachers && teachers.length > 0 ? (
      teachers.slice(0, 4).map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))
    ) : (
      <div className="col-span-full text-center py-8 text-gray-500">
        هیچ استادی یافت نشد.
      </div>
    )}
  </div>
)

export default TeacherGrid
