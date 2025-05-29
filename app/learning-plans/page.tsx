import Image from "next/image";
import RoutesHeader from "../ui/components/RoutesHeader";

const Plans = () => {
    return ( 
        <section>
            <div className="w-full bg-[#F6F4EE]">
                <RoutesHeader pageTitle={'پلن های آموزشی'} boldText={'کلاس ها و '} Highlight={'برنامه ریزی آموزشی'} />
                <div className="container">
                    <div className="plans w-full grid grid-cols-3 mb-20">
                        <div className="relative w-[400px] h-[555px] bg-white rounded-xl ">
                            <div className="w-[90%] mx-auto pt-5">
                                <Image width={330} height={555} className=" rounded-xl" src="/images/plans/01.jpg" alt="course" />
                            </div>
                            <div className="w-full text-center mt-3">
                                <div className="text-2xl font-DanaDemiBold text-[#152422] my-2">کلاس های آن لاین</div>
                                <div className="text-sm font-DanaMedium text-[#018A75]">همه سنین</div>
                            </div>
                            <div className="text-center px-5 leading-5 mt-5 text-base font-DanaMedium text-[#152422]/75 ">لورم ایپسوم متن ساختگی با تولید سدهایپسوم متن ساختگی از طراحان گرافیک است</div>
                            <div>
                                <div className=" absolute w-[68px] h-[68px] flex justify-center items-center rounded-full bottom-[-34px] right-[160px] bg-[#F6F4EE]">
                                    <div className=" w-[47px] h-[47px] rounded-full bg-white flex justify-center items-center">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#018A75" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-[400px] h-[555px] bg-white rounded-xl ">
                            <div className="w-[90%] mx-auto pt-5">
                                <Image width={370} height={555} className=" rounded-xl" src="/images/plans/02.jpg" alt="course" />
                            </div>
                            <div className="w-full text-center mt-3">
                                <div className="text-2xl font-DanaDemiBold text-[#152422] my-2">کلاس های گروهی</div>
                                <div className="text-sm font-DanaMedium text-[#018A75]">6 سال به بالا</div>
                            </div>
                            <div className="text-center px-5 leading-5 mt-5 text-base font-DanaMedium text-[#152422]/75 ">لورم ایپسوم متن ساختگی با تولید سدهایپسوم متن ساختگی از طراحان گرافیک است</div>
                            <div>
                                <div className=" absolute w-[68px] h-[68px] flex justify-center items-center rounded-full bottom-[-34px] right-[160px] bg-[#F6F4EE]">
                                    <div className=" w-[47px] h-[47px] rounded-full bg-white flex justify-center items-center">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#018A75" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-[400px] h-[555px] bg-white rounded-xl ">
                            <div className="w-[90%] mx-auto pt-5">
                                <Image width={370} height={555} className=" rounded-xl" src="/images/plans/03.jpg" alt="course" />
                            </div>
                            <div className="w-full text-center mt-3">
                                <div className="text-2xl font-DanaDemiBold text-[#152422] my-2">کلاس های خصوصی </div>
                                <div className="text-sm font-DanaMedium text-[#018A75]">3 سال به بالا</div>
                            </div>
                            <div className="text-center px-5 leading-5 mt-5 text-base font-DanaMedium text-[#152422]/75 ">لورم ایپسوم متن ساختگی با تولید سدهایپسوم متن ساختگی از طراحان گرافیک است</div>
                            <div>
                                <div className=" absolute w-[68px] h-[68px] flex justify-center items-center rounded-full bottom-[-34px] right-[160px] bg-[#F6F4EE]">
                                    <div className=" w-[47px] h-[47px] rounded-full bg-white flex justify-center items-center">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#018A75" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Image width={1920} height={134} src="../images/shapes/footer-1.png" alt="" />
                </div>
            </div>
        </section>
     );
}
 
export default Plans;