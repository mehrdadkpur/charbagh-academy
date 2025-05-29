import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Link from "next/link";
import { fetchInstruments } from "@/lib/requests";
import Image from "next/image";

export const metadata = {
    title: 'آموزشگاه چهارباغ | صفحه موسیقی',
    description: 'این صفحه گالری عکس آموزشگاه موسیقی چهارباغ است.',
  };
  

const SongsCategories = async () => {   
 const {instruments} = await fetchInstruments();

    return ( 
            <div className="bg-[#F6F4EE] h-full dark:bg-gray-900">
                <RoutesHeader pageTitle={'مجله موسیقی'} boldText={'پــخش و دانلــود'} Highlight={'موسیقــــی'}/>
                <div className="container">
                    <div className="w-full pb-10 text-3xl font-DanaDemiBold text-greenDark dark:text-gray-50 text-center ">
                        <h2>ساز مورد نظرتان را انتخاب کنید</h2>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-3">
                            { instruments && instruments?.map((instrument)=>(
                                <div key={instrument.id} className="w-full h-52 gird grid-cols-4 content-center rounded-3xl border">
                                    <Link href={`/songs/${instrument.id}`} className="w-full h-full flex justify-center text-greenDark items-center rounded-3xl hover:shadow-xl dark:hover:bg-gray-800 ">
                                    <div className=" flex justify-between items-center text-lg font-Dana gap-x-5 ">
                                    <div className="w-32 h-32 flex items-center justify-center">
                                        <Image
                                        src={instrument.instrument_img} 
                                        alt={instrument.instrument_name} 
                                        width={128}
                                        height={128}
                                        className="w-32 h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div>
                                        <h2 className=" font-DanaDemiBold dark:text-gray-50">{instrument.instrument_name}</h2>                             
                                        <h5 className=" text-greenDark/70 font-Dana text-sm  dark:text-gray-500">بی کلام</h5>
                                    </div>
                                    </div>
                                    </Link>
                                </div>
                            ))}
                            </div>
                    </div>    
                    <Image className="" width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
                </div>
     );
}
 
export default SongsCategories;