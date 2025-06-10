'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {fetchTeacher} from "../../../lib/requests"
import Loading from "@/app/loading";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Image from "next/image";
import ErrorHandling from "@/app/ui/components/ErrorHandling";

const Teacher = () => {
    const {id} = useParams();
    const [teacher , setTeacher] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchTeacherData = async ()=>{
            if(!id) return;
           try{
               const teacher = await fetchTeacher(id)
               setTeacher(teacher);
               
           } catch(error){
               console.log(error.messsage);
           } finally{
            setLoading(false)
           }
       };
           if(teacher === null){
            fetchTeacherData()
           }
       },[id , teacher]);

       useEffect(()=>{
        if(teacher){
            document.title ="رزومه مدرسین" + " | "+ teacher.firstname + " " + teacher.lastname
        }
       })
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!teacher) { 
        return <ErrorHandling/>
    }

    return ( 
        <section>
            <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
                <RoutesHeader pageTitle={"اساتید برتر"} boldText={"آشنایی با استاد"} Highlight={`${teacher.firstname} ${teacher.lastname}`} />
                <div className="container relative">
                    <div className="content flex justify-center items-center flex-col">
                        <div className="w-60 h-60 md:w-96 md:h-96 absolute -top-24 md:-top-52 flex justify-center items-center p-3 bg-white dark:bg-gray-700 rounded-3xl shadow-xl">
                            <Image width={400} height={400} className=" rounded-3xl " src={teacher.user_img} alt="teacher" />
                        </div>
                    </div>
                    <div className="mt-64">
                        <h2 className="w-full text-2xl font-DanaDemiBold">رزومه:</h2>
                        <div className="w-full text-lg font-Dana mt-44 md:mt-60 dark:text-gray-50">{teacher.resume}</div>
                    </div>
                </div>
                <div>
                    <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="" />
                </div>
            </div>
        </section>
     );
}
 
export default Teacher;