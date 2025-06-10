"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchFullTeacher } from "@/lib/requests";
import Loading from "@/app/loading";
import jalaali from 'jalaali-js'
import Image from "next/image";
import { IUser } from "@/lib/types";
import StatusBadge from "@/app/ui/components/StatusBadge";


const ViewTeacher = () => {
    const {id} = useParams();
    const [teacher , setTeacher] = useState<IUser|null>(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchTeacherData = async ()=>{
            if(!id) return;
           try{
               const teacher = await fetchFullTeacher(id as string)
               setTeacher(teacher);
               
           } catch(error){
            console.error("Error Fetching Data:", error)
           } finally{
            setLoading(false)
           }
       };
           if(teacher === null){
            fetchTeacherData()
           }
       },[id , teacher]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!teacher) { 
        return <div className="w-full h-screen flex justify-center items-center text-2xl font-DanaDemiBold"> چیزی که دنبالش بودی را پیدا نکردم. دوباره تلاش کن رفیق!</div>; 
    }
    const shamsiRegistryDate = jalaali.toJalaali(new Date(teacher.registry_date));
    const shamsiBirthDate = jalaali.toJalaali(new Date(teacher.birthdate));
    
    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات مدرس </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="w-40 h-40">
                            <Image width={160} height={160} src={teacher.user_img}  alt={teacher.lastname} className=" rounded-full" />
                        </div>
                        <div className="w-full grid grid-cols-2 p-3 gap-3 shadow-xl font-DanaMedium rounded-lg">
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام و نام خانوادگی:</span>
                                    <span className="text-xl">{teacher.firstname}{" "}{teacher.lastname}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> شماره ملی:</span>
                                    <span className="text-xl">{teacher.nationality_number}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  جنسیت:</span>
                                    <span className="text-xl">{teacher.gender === "MALE"?"آقا": "خانم"}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره موبایل:</span>
                                    <span className="text-xl">{teacher.mobile}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  تاریخ تولد:</span>
                                    <span className="text-xl">{shamsiBirthDate.jy}/{shamsiBirthDate.jm}/{shamsiBirthDate.jd}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>   آدرس محل سکونت:</span>
                                    <span className="text-xl">{teacher.address}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره شناسایی:</span>
                                    <span className="text-xl">{teacher.identity_number}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> وضعیت:</span>
                                    <StatusBadge status={teacher.status}/>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  ایمیل:</span>
                                    <span className="text-xl">{teacher.email}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  تاریخ  ثبت نام:</span>
                                <span className="text-xl">{shamsiRegistryDate.jy}/{shamsiRegistryDate.jm}/{shamsiRegistryDate.jd}</span>
                            </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  حوزه فعالیت:</span>
                                    <span className="text-xl">{teacher.skill?.instrument_name}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span> رزومه:</span>
                                <span className="text-xl">{teacher.resume}</span>
                            </div>
                        </div>
                    </div>                        
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/teachers"} className="w-full p-3 bg-red-500 hover:bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
                </div>
            </div>
        
     );
}
 
export default ViewTeacher;