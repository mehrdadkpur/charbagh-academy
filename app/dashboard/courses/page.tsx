"use client"

import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import { fetchCourses } from "@/lib/requests"
import Search from "@/app/ui/components/Search"
import AddButton from "@/app/ui/components/AddButton"
import toast from "react-hot-toast"
import Image from "next/image"
import { ICourse } from "@/lib/types"
import Swal from "sweetalert2"

interface QueryState {
    text: string
}

const Courses = () => {
    const [courses, setCourses] = useState<ICourse[]>([])
    const [query, setQuery] = useState<QueryState>({ text: "" })
    const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([])

    useEffect(() => {
        const loadCourses = async () => {
            const data = await fetchCourses()
            setFilteredCourses(data.courses)
            setCourses(data.courses)
        }
        loadCourses()
    }, [])

    const handleDeleteConfirm = async (courseId:number) => {

        const result = await Swal.fire({
            title: "آیا مطمئن هستید؟",
            text: "این عملیات قابل بازگشت نیست!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "بله، حذف کن",
            cancelButtonText: "لغو",
          });

        if(result.isConfirmed){

            
            try {
                const res = await fetch(`/api/courses/${courseId}`, {
                    method: "DELETE"
                })
                
                if (res.ok) {
                    setCourses(courses.filter((course) => course.id !== courseId))
                    toast.success('دوره با موفقیت حذف شد', { duration: 5000 })
                    
                    const updatedCourses = await fetchCourses()
                setCourses(updatedCourses.courses)
                setFilteredCourses(updatedCourses.courses)
            }
        } catch (error) {
            toast.error('خطا در حذف دوره')
            console.error("Error deleting Course:", error)
        }
    }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase()
        setQuery({ text: e.target.value })

        const allCourses = courses.filter((course) => {
            const firstnameMath = course.teacher.firstname.toLowerCase().includes(searchText)             
            const lastnameMath = course.teacher.lastname.toLowerCase().includes(searchText)             
            const courseNameMatch = course.course_name.toLowerCase().includes(searchText)
            
            return firstnameMath || lastnameMath || courseNameMatch
        })
        
        setFilteredCourses(allCourses)
    }
    
    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">دوره های آموزشگاه</span>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                                                                    {/* Search Box & Add Blogs Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام و نام خانوادگی استاد و دوره"}/>
                            <AddButton route={'/dashboard/courses/add-course'}/>  
                        </div>
                        <table className="w-full text-sm text-left font-DanaMedium rtl:text-right">
                            <thead className="text-xs">
                                <tr>
                                <th scope="col" className="px-6 py-3">نام دوره</th>
                                <th scope="col" className="px-6 py-3">مدرس دوره</th>
                                <th scope="col" className="px-6 py-3">وضعیت</th>
                                <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses?.map((course) => (
                                <tr key={course.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                        <Image width={40} height={40} className="w-full h-full rounded-full object-cover" src={course.course_img} alt={course.course_name }/>
                                        </div>
                                        <div className="mr-3">
                                        <div className="text-base font-semibold">
                                            {course.course_name}
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">{course.teacher ? `${course.teacher.firstname} ${course.teacher.lastname}` : "بدون استاد"}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${course.course_status === "ACTIVE" ? "bg-green-500" : "bg-red-500"} ml-2`}></div>
                                        <span>{course.course_status=== "ACTIVE"? "فعال": "غیرفعال"}</span>
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/courses/${course.id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                         مشاهده
                                        </Link>
                                        <Link 
                                        href={`/dashboard/courses/${course.id}/edit`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleDeleteConfirm(course.id)}
                                        className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                                        >
                                        حذف
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

     );
}
 
export default Courses;

