"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchStudent } from "@/lib/requests";
import Loading from "@/app/loading";
import jalaali from 'jalaali-js'
import Image from "next/image";
import { IUser } from "@/lib/types";
import StatusBadge from "@/app/ui/components/StatusBadge";


const ViewStudent = () => {
    const {id} = useParams();
    const [student , setStudent] = useState<IUser|null>(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchStudentData = async ()=>{
            if(!id) return;
           try{
               const student = await fetchStudent(id as string)
               setStudent(student);
               
           } catch(error){
            console.error("Error Fetching Data:", error)
           } finally{
            setLoading(false)
           }
       };
           if(student === null){
            fetchStudentData()
           }
       },[id , student]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    
    if (!student) { 
        return <div className="w-full h-screen flex justify-center items-center text-2xl font-DanaDemiBold"> چیزی که دنبالش بودی را پیدا نکردم. دوباره تلاش کن رفیق!</div>; 
    }
    const shamsiRegistryDate = jalaali.toJalaali(new Date(student.registry_date));
    const shamsiBirthDate = jalaali.toJalaali(new Date(student.birthdate));

    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات هنرجو </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="w-40 h-40">
                            <Image width={160} height={160} src={student.user_img || "/images/avatar.png"}  alt={student.lastname} className=" rounded-full" />
                        </div>
                        <div className="w-full grid grid-cols-2 p-3 gap-3 shadow-xl font-DanaMedium rounded-lg">
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام و نام خانوادگی:</span>
                                    <span className="text-xl">{student.firstname}{" "}{student.lastname}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> شماره ملی:</span>
                                    <span className="text-xl">{student.nationality_number}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  جنسیت:</span>
                                    <span className="text-xl">{student.gender === "MALE"?"آقا": "خانم"}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره موبایل:</span>
                                    <span className="text-xl">{student.mobile}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  تاریخ تولد:</span>
                                    <span className="text-xl">{shamsiBirthDate.jy}/{shamsiBirthDate.jm}/{shamsiBirthDate.jd}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>   آدرس محل سکونت:</span>
                                    <span className="text-xl">{student.address}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره شناسایی:</span>
                                    <span className="text-xl">{student.identity_number}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> وضعیت:</span>
                                    <StatusBadge status={student.status}/>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  ایمیل:</span>
                                    <span className="text-xl">{student.email}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  تاریخ  ثبت نام:</span>
                                <span className="text-xl">{shamsiRegistryDate.jy}/{shamsiRegistryDate.jm}/{shamsiRegistryDate.jd}</span>
                            </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  حوزه فعالیت:</span>
                                    <span className="text-xl">{student.skill?.instrument_name}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>   بیوگرافی:</span>
                                <span className="text-xl">{student.resume}</span>
                            </div>
                        </div>
                    </div>                        
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/students"} className="w-full p-3 bg-red-500 hover:bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
                </div>
            </div>
        
     );
}
 
export default ViewStudent;