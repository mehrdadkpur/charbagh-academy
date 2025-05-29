"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchAdmin } from "@/lib/requests";
import Loading from "@/app/loading";
import jalaali from 'jalaali-js'
import Image from "next/image";
import { IUser } from "@/lib/types";
import StatusBadge from "@/app/ui/components/StatusBadge";


const ViewAdmin = () => {
    const {id} = useParams();
    const [admin , setAdmin] = useState<IUser|null>(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchAdminData = async ()=>{
            if(!id) return;
           try{
               const admin = await fetchAdmin(id as string)
               setAdmin(admin);
               
           } catch(error){
            console.error("Error Fetching Data:", error)
           } finally{
            setLoading(false)
           }
       };
           if(admin === null){
            fetchAdminData()
           }
       },[id , admin]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    
    if (!admin) { 
        return <div className="w-full h-screen flex justify-center items-center text-2xl font-DanaDemiBold"> چیزی که دنبالش بودی را پیدا نکردم. دوباره تلاش کن رفیق!</div>; 
    }
    const shamsiRegistryDate = jalaali.toJalaali(new Date(admin.registry_date));
    const shamsiBirthDate = jalaali.toJalaali(new Date(admin.birthdate));

    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات هنرجو </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="w-40 h-40">
                            <Image width={160} height={160} src={admin.user_img || "/images/avatar.png"}  alt={admin.lastname} className=" rounded-full" />
                        </div>
                        <div className="w-full grid grid-cols-2 p-3 gap-3 shadow-xl font-DanaMedium rounded-lg">
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام و نام خانوادگی:</span>
                                    <span className="text-xl">{admin.firstname}{" "}{admin.lastname}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> شماره ملی:</span>
                                    <span className="text-xl">{admin.nationality_number}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  جنسیت:</span>
                                    <span className="text-xl">{admin.gender === "MALE"?"آقا": "خانم"}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره موبایل:</span>
                                    <span className="text-xl">{admin.mobile}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  تاریخ تولد:</span>
                                    <span className="text-xl">{shamsiBirthDate.jy}/{shamsiBirthDate.jm}/{shamsiBirthDate.jd}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>   آدرس محل سکونت:</span>
                                    <span className="text-xl">{admin.address}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره شناسایی:</span>
                                    <span className="text-xl">{admin.identity_number}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> وضعیت:</span>
                                    <StatusBadge status={admin.status}/>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  ایمیل:</span>
                                    <span className="text-xl">{admin.email}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  تاریخ  ثبت نام:</span>
                                <span className="text-xl">{shamsiRegistryDate.jy}/{shamsiRegistryDate.jm}/{shamsiRegistryDate.jd}</span>
                            </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>   بیوگرافی:</span>
                                <span className="text-xl">{admin.resume}</span>
                            </div>
                        </div>
                    </div>                        
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/admins"} className="w-full p-3 bg-red-500 hover:bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
                </div>
            </div>
        
     );
}
 
export default ViewAdmin;