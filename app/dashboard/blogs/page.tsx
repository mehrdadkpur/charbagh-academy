"use client"

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react"
import {fetchAllBlogs} from '../../../lib/requests'
import Search from "@/app/ui/components/Search";
import jalaali from 'jalaali-js'
import Image from "next/image";
import { IBlog } from "@/lib/types";

const statusLabels: Record<string, string> = {
  PENDING: "در انتظار بررسی",
  ACTIVE: "منتشر شده",
  DEACTIVE: "غیرفعال",
};


interface QueryState {
  text: string;
}

const Blogs = () => {

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [query,setQuery]=useState<QueryState>({text:""});
    const [filteredBlogs , setFilteredBlogs]=useState<IBlog[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchAllBlogs();      
      setBlogs(data.blogs);
      setFilteredBlogs(data.blogs);
    };
    loadBlogs();
  }, []);


  const handleSearch = (e: ChangeEvent<HTMLInputElement>)=>{
    setQuery({...query , text:e.target.value});
    const allBlogs = blogs.filter((blog)=>{
        return blog.blog_title.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setFilteredBlogs(allBlogs);
  }

    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">خبرنامه های آموزشگاه</span>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                                <Search query={query} handleSearch={handleSearch} baseSearch={"موضوع و نویسنده"}/>
                            </div>

                        <table className="w-full text-sm font-DanaMedium">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">موضوع پست</th>
                                    <th scope="col" className="px-6 py-3">نویسنده</th>
                                    <th scope="col" className="px-6 py-3">تاریخ</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map((blog) => {
                                    const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
                                return(       
                                <tr key={blog.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            <Image width={40} height={40} className="w-full h-full rounded-full object-cover" src={blog.blog_img} alt={blog.blog_title}/>
                                        </div>
                                        <div className="mr-3">
                                        <div className="text-base font-semibold"> {blog.blog_title}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">{blog.author.firstname} {' '} {blog.author.lastname}</td>
                                    <td className="px-6 py-4">{shamsiCreatedDate.jy}/{shamsiCreatedDate.jm}/{shamsiCreatedDate.jd}</td>
                                    <td className="px-6 py-4">{statusLabels[blog.status]}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/blogs/${blog.id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده
                                        </Link>
                                    </div>
                                    </td>
                                </tr>
)})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

     );
}
 
export default Blogs;

