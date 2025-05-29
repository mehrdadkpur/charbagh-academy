import Link from "next/link";
import Image from "next/image";
import TeacherGrid from "@/app/ui/components/TeacherCard";
import { fetchTeachers } from "@/lib/requests";

const Teachers = async () => {

  const {teachers}= await fetchTeachers();

  return (
    <section>
      <div className="relative w-full flex justify-between items-center flex-col bg-[#018A75] dark:bg-gray-900 overflow-hidden group">
        <div className="z-50">
          <Image
            src="/images/shapes/sug.png"
            alt="Decorative shape"
            width={1920}
            height={169}
            className="block dark:hidden"
            priority
          />
          <Image
            src="/images/shapes/sug-dark-1.png"
            alt="Decorative shape"
            width={1920}
            height={169}
            className="hidden dark:block"
            priority
          />
        </div>
        <div className="container z-10">
          <div className="flex justify-center items-center flex-col py-3">
            <div className="text-center">
              <h4 className="text-xs md:text-lg font-DanaMedium text-mango">اساتید آموزشگاه چهارباغ</h4>
              <h2 className="text-3xl md:text-5xl font-MorabbaBold text-gray-900 dark:text-gray-50 p-4">اسـاتیـد با سـابقــه و متــدهای بـــروز تدریــس</h2>
            </div>
            <TeacherGrid teachers={teachers} />
            <Link 
              href='/teachers' 
              className="font-DanaMedium bg-mango dark:bg-elf md:text-2xl text-gray-900 dark:text-gray-50 text-sm p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700 mt-5"
            >
              مشاهده همه اساتید
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-10 lg:-bottom-48 ease-in-out right-0 z-0 scale-75 transition group-hover:translate-x-4 group-hover:-translate-y-4 duration-[3000ms] group-hover:object-cover delay-150">
          <Image 
            width={1208} 
            height={1661} 
            className="opacity-20" 
            src="/images/Music.png" 
            alt="music" 
          />
        </div>
        <div>
          <Image
            src="/images/shapes/wave-3.png"
            alt="Decorative shape"
            width={1920}
            height={169}
            className="block dark:hidden"
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
        </div>
      </div>
    </section>
  );
};

export default Teachers;
