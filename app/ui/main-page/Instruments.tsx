import Link from "next/link";
import {fetchInstruments} from "../../../lib/requests"
import InstrumentCard from "@/app/ui/components/InstrumentCard";
import { Instrument } from "@/lib/types";

const Instruments = async () => {
    const{instruments}= await fetchInstruments(); 
    return (
        <section>
            <div className="w-full bg-[#F0EEE6] dark:bg-[#25403c] flex justify-between flex-col py-3">
                <div className="container py-25">
                    <div className="content w-full flex justify-between items-center flex-col lg:flex-row gap-y-10">
                        <div className="right lg:w-1/3 md:h-full flex justify-between items-center flex-col gap-y-4 lg:gap-y-6 lg:pb-6">
                            <div className="text-xs md:text-lg font-DanaMedium text-elf">درس های موسیقی که ما تدریس می کنیم</div>
                            <div className="w-full lg:h-[230px] text-[#152422] text-3xl md:text-4xl lg:text-5xl font-MorabbaBold leading-[45px] md:leading-[60px] lg:leading-[80px] text-center">
                                <h3 className="dark:text-gray-50">کدام <span className="bg-mango p-y-[3px] px-2 text-elf rounded-2xl">ســاز</span> برای شروع من <span className="bg-mango p-y-[3px] px-2 text-greenDark rounded-2xl">مناسب</span> است؟</h3>
                            </div>
                            <div className="w-full text-[#152422] dark:text-gray-50 md:text-lg font-DanaMedium text-center px-2 ">اگه تا حالا هیچ ارتباطی با موسیقی و ساز نداشتی هیچ اشکالی نداره. ما اینحا هستیم تا پا به پای شما مسیر یادگیری یک ساز را از اول تا حرفه ای شدن به شما یاد بدیم. برای آشنایی با انواع ساز یکی را انتخاب کن یا اینکه دکمه بزن بریم را فشار بده.</div>
                            <Link href='/instruments' className="font-DanaMedium bg-mango dark:bg-elf md:text-2xl text-gray-900 dark:text-gray-50 text-sm p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700">بزن بریم</Link>
                        </div>
                        <div className="left lg:w-2/3 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:gap-x-8 gap-y-5 md:gap-y-3">
                            {instruments?.map((instrument:Instrument) => (
                                <InstrumentCard instrument={instrument} key={instrument.id}/>
                            ))}
                        </div>
                    </div>         
                </div>
            </div>
        </section>
    );
};

export default Instruments;
