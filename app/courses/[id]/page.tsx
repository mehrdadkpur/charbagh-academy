'use client'
import { useEffect, useState } from "react";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import { useParams } from "next/navigation";
import { fetchCourse } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";
import { ICourse } from "@/lib/types";

const Course = () => {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : undefined;

    const [course, setCourse] = useState<ICourse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!id) return;
            try {
                const course = await fetchCourse(id);
                setCourse(course);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        if (course === null) {
            fetchCourseData();
        }
    }, [id, course]);

    useEffect(() => {
        if (course) {
            document.title = `دوره آموزشی ${course.course_name}`;
        }
    }, [course]);

    if (loading) {
        return <Loading />;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader pageTitle={'دوره ها '} boldText={'دوره آموزشی'} Highlight={course.course_name} />
            <div className="container relative">
                <div className="content flex justify-center items-center flex-col">
                    <div className="w-[85%] md:w-auto flex justify-center items-center p-4 absolute -top-24 md:-top-[200px] bg-white dark:bg-gray-700 rounded-3xl">
                        <Image
                            width={150}
                            height={150}
                            className="rounded-3xl"
                            src={course.course_img}
                            alt={course.course_name}
                        />
                    </div>
                    <div className="md:w-[80%] font-Dana leading-10 pt-60 md:pt-[450px] text-gray-900 dark:text-gray-50">
                        {course.course_description}
                    </div>
                </div>
            </div>
            <div>
                <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
            </div>
        </div>
    );
};

export default Course;
