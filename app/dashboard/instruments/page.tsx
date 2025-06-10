"use client"

import Link from "next/link"
import { useEffect, useState, ChangeEvent } from "react"
import Search from "@/app/ui/components/Search"
import Image from "next/image"
import { Instrument } from "@/lib/types"
import Swal from "sweetalert2";

interface QueryState {
    text: string
}

const Instruments = () => {

    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [query, setQuery] = useState<QueryState>({ text: "" })
    const [filteredInstruments, setFilteredInstruments] = useState<Instrument[]>([])
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchInstrumentsData = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/admin/instruments')
                if (!response.ok) {
                    throw new Error('Failed to fetch instruments')
                }
                
                const data = await response.json()
                const processedData = data.map((instrument: any) => ({
                    ...instrument,
                    books: typeof instrument.books === 'string' 
                        ? JSON.parse(instrument.books) 
                        : instrument.books || []
                }))
                
                setInstruments(processedData)
                setFilteredInstruments(processedData)
            } catch (err) {
                console.error("Error fetching instruments:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchInstrumentsData()
    }, [])

    const handleDeleteInstrument = async (instrumentId:number) => {
        const result = await Swal.fire({
            title: "آیا مطمئنی؟",
            text: "این عملیات قابل بازگشت نیست!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله، حذفش کن",
            cancelButtonText: "نه، منصرف شدم",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
          });
        
          if (result.isConfirmed) {
            try {
              const res = await fetch(`/api/admin/instruments/${instrumentId}`, {
                method: "DELETE",
              });
        
              if (res.ok) {
                setInstruments((prev) => prev.filter((instrument) => instrument.id !== instrumentId));
                setFilteredInstruments((prev) => prev.filter((instrument) => instrument.id !== instrumentId));
                Swal.fire("حذف شد!", "ساز با موفقیت حذف شد.", "success");
              } else {
                Swal.fire("خطا", "مشکلی در حذف ساز رخ داد.", "error");
              }
            } catch (error) {
              Swal.fire("خطا", "مشکلی در حذف ساز رخ داد.", "error");
              console.error("Error deleting Instrument:", error);
            }
          }
    }

    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setQuery({...query , text:e.target.value});
        const allInstruments = instruments.filter((instrument)=>{
            return instrument.instrument_name.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setFilteredInstruments(allInstruments);
      }
  
    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900 ">
            <div className="w-full p-5 flex justify-center rounded-xl ">
                <div className="w-full mt-5">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">موسیقی های آموزشی</span>
                    <div className="relative w-full h-auto flex flex-col justify-center items-center sm:rounded-lg">
                                                                        {/* Search Box & Add Song Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام ساز"}/>
                            <div className="flex justify-center items-center p-3 bg-blue-500 rounded-xl ">
                                <Link href="/dashboard/instruments/add-instrument"  >
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </Link>
                            </div>  
                        </div>

                                                                         {/* table */}   
                        {
                            instruments.length === 0 ? (
                            <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                                <p>هنوز هیچ سازی اضافه نکردی. برای اضافه کردن اولین ساز از دکمه + بالا استفاده کن.</p>
                            </div>):
                        
                        <table className="w-full text-sm text-left font-DanaMedium rtl:text-right">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام ساز  </th>
                                    <th scope="col" className="px-6 py-3">مدرسین</th>
                                    <th scope="col" className="px-6 py-3">تعداد کتاب ها</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredInstruments.map((instrument) => (
                                <tr key={instrument.id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 flex-shrink-0">
                                                <Image width={40} height={40} className="w-full h-full rounded-full object-cover" src={instrument.instrument_img} alt={instrument.instrument_name}/>
                                            </div>
                                            <div className="mr-3">
                                            <div className="text-base font-semibold">
                                                {instrument.instrument_name}
                                            </div>
                                            </div>
                                        </div>
                                    </td>            
                                    <td className="px-6 py-4">  {instrument.instrument_teachers.map((teacher, index) => (
                                        <li key={index}>
                                        {teacher.firstname} {teacher.lastname}
                                        </li>
                                    ))}</td>
                                    <td className="px-6 py-4">{instrument.books.length}</td>
                                    <td className="flex justify-center items-center py-4">
                                        <div className="flex items-center gap-2">
                                            <Link 
                                            href={`/dashboard/instruments/${instrument.id}`}
                                            className="bg-green-700 px-3 py-1.5 rounded-lg text-gray-50 hover:bg-green-800 transition-colors"
                                            >
                                            مشاهده کتاب ها
                                            </Link>
                                            <Link 
                                            href={`/dashboard/instruments/${instrument.id}/edit`}
                                            className="bg-orange-700 px-3 py-1.5 rounded-lg text-gray-50 hover:bg-orange-800 transition-colors"
                                            >
                                            ویرایش
                                            </Link>
                                            <button 
                                            onClick={() => handleDeleteInstrument(instrument.id)}
                                            className="bg-red-700 px-3 py-1.5 rounded-lg text-gray-50 hover:bg-red-800 transition-colors"
                                            >
                                            حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        </section>

     );
}
 
export default Instruments;

