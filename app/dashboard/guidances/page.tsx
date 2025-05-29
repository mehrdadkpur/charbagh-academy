'use client';

import { useEffect, useState } from "react";
import { fetchGuidances } from '../../../lib/requests';
import Search from "@/app/ui/components/Search";
import jalaali from 'jalaali-js';
import toast from "react-hot-toast";
import { IGuidance } from "@/lib/types";
import Swal from "sweetalert2";

const Guidances = () => {
    const [guidances, setGuidances] = useState<IGuidance[]>([]);
    const [query, setQuery] = useState({ text: "" });
    const [filteredGuidances, setFilteredGuidances] = useState<IGuidance[]>([]);

    useEffect(() => {
        loadGuidances();
    }, []);

    const loadGuidances = async () => {
        try {
            const data = await fetchGuidances();
            setGuidances(data.guidances);
            setFilteredGuidances(data.guidances);
        } catch (error) {
            toast.error('خطا در بارگذاری اطلاعات');
        }
    };

    const handleStatus = async (guidanceId: number) => {
        try {
            const res = await fetch(`/api/guidances/${guidanceId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'DEACTIVE' })
            });

            if (res.ok) {
                setGuidances(prev => prev.map(guidance => 
                    guidance.id === guidanceId 
                        ? { ...guidance, status: 'DEACTIVE' }
                        : guidance
                ));
                setFilteredGuidances(prev => prev.map(guidance => 
                    guidance.id === guidanceId 
                        ? { ...guidance, status: 'DEACTIVE' }
                        : guidance
                ));
                toast.success('وضعیت با موفقیت بروزرسانی شد');
            }
        } catch (error) {
            toast.error('خطا در بروزرسانی وضعیت');
        }
    };


    const handleDeleteConfirm = async (guidanceId:number) => {
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
                  const res = await fetch(`/api/guidances/${guidanceId}`, {
                      method: "DELETE"
                    });
                    
                    if (res.ok) {
                        setGuidances(prev => prev.filter(guidance => guidance.id !== guidanceId));
                        setFilteredGuidances(prev => prev.filter(guidance => guidance.id !== guidanceId));
                        toast.success('تیکت با موفقیت حذف شد');
                    }
                } catch (error) {
                    toast.error('خطا در حذف تیکت');
                }
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        setQuery({ text: searchText });
        
        const filtered = guidances.filter(guidance => 
            guidance.fullname.toLowerCase().includes(searchText)
        );
        setFilteredGuidances(filtered);
    };

    const convertToTehranTime = (isoDate: string): string => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Tehran',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date);
    };

    const formatJalaaliDate = (date: string): string => {
        const shamsiDate = jalaali.toJalaali(new Date(date));
        return `${shamsiDate.jy}/${shamsiDate.jm}/${shamsiDate.jd}`;
    };

    return (
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5">
                    <h1 className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
                        درخواست های پشتیبانی
                    </h1>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch="نام خانوادگی" />
                        </div>
                        <table className="w-full text-sm">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام و نام خانوادگی</th>
                                    <th scope="col" className="px-6 py-3">موبایل</th>
                                    <th scope="col" className="px-6 py-3">تاریخ</th>
                                    <th scope="col" className="px-6 py-3">ساعت</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGuidances.map((guidance) => (
                                    <tr key={guidance.id} className={`${guidance.status === "DEACTIVE" ? "bg-gray-100 dark:bg-gray-700 opacity-70" : "bg-gray-50 dark:bg-gray-500"} border-b hover:bg-gray-50`}>
                                        <td className="px-6 py-4">{guidance.fullname}</td>
                                        <td className="px-6 py-4">{guidance.mobile}</td>
                                        <td className="px-6 py-4">{formatJalaaliDate(guidance.createdAt)}</td>
                                        <td className="px-6 py-4">{convertToTehranTime(guidance.createdAt)}</td>
                                        <td className="px-6 py-4">{guidance.status }</td>
                                        <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => handleStatus(guidance.id)}
                        disabled={guidance.status === "PENDING"}
                        className={`px-3 py-1.5 rounded-lg text-white transition-colors ${
                            guidance.status === "DEACTIVE" 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-green-700 hover:bg-green-800"
                        }`}
                    >
                        {guidance.status === "PENDING" ? "تکمیل کردن مشاوره" : "مشاوره شد"}
                    </button>
                    <button 
                        onClick={() => handleDeleteConfirm(guidance.id)}
                        className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                    >
                        حذف کردن
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
};

export default Guidances;
