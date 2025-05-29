import Link from "next/link";
import Image from "next/image";
import { fetchCourses } from "@/lib/requests";
import CourseCard from '@/app/ui/components/CourseCard';

const Courses = async () => {
    const { courses } = await fetchCourses();


    
    
    

    return ( 
        <section className="w-full flex justify-between flex-col bg-[#F6F4EE] dark:bg-gray-900 pt-3">
            <div className="container">
                <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-[350px] md:w-[503px] text-center">
                        <h4 className="text-xs md:text-lg font-DanaMedium text-elf">پیشنهاد های ما به شما</h4>
                        <h2 className="text-3xl md:text-5xl font-MorabbaBold text-gray-900 dark:text-gray-50 leading-[40px] md:leading-[80px]">
                            مهـارت موسیقـی خودتـان را ارتقـا دهیـد
                        </h2>
                    </div>

                    <div className="flex justify-center items-center mb-14 mt-5">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                            {courses?.slice(0, 3).map((course:any) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>

                    <Link 
                        href="/courses" 
                        className="font-DanaMedium bg-mango dark:bg-elf md:text-2xl text-gray-900 dark:text-gray-50 text-sm p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700"
                    >
                        مشاهده همه دوره ها
                    </Link>
                </div>
            </div>
            <div>
            <Image
              src="/images/shapes/courses.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/courses-dark-1.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
            </div>
        </section>
    )
}
export default Courses;