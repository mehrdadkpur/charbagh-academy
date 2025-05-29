import Image from "next/image";
import Link from "next/link";

interface CourseProps {
  course: {
    id: number;
    course_img: string;
    course_name: string;
    course_description: string;
    course_status: string;
    teacher?: {
      firstname: string;
      lastname: string;
    };
  };
}

const CourseCard = ({ course }: CourseProps) => {
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const teacherName = course.teacher
    ? `${course.teacher.firstname} ${course.teacher.lastname}`
    : "بدون استاد";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group relative flex flex-col w-full sm:w-[350px] lg:w-[400px] p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-center">
            <Image
              src={course.course_img} 
              alt={course.course_name} 
              width={128}
              height={128}
              className="w-32 h-40 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

      <div className="flex flex-col items-center mt-6 space-y-3">
        <h4
          title={course.course_name}
          className="text-lg sm:text-xl font-DanaDemiBold text-gray-800 dark:text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap w-full text-center"
        >
          دوره آموزشی {truncateText(course.course_name, 30)}
        </h4>

        <h5
          title={teacherName}
          className="text-sm font-DanaMedium text-mango dark:text-mango-400"
        >
          مدرس: {truncateText(teacherName, 20)}
        </h5>

        <p
          className="h-16 text-sm font-DanaMedium text-gray-600 dark:text-gray-300 text-center overflow-hidden"
          title={course.course_description}
        >
          {truncateText(course.course_description, 100)}
        </p>
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <div className="relative size-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:rotate-180">
          <div className="size-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="size-6 text-mango dark:text-mango-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
