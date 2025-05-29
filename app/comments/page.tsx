import RoutesHeader from "@/app/ui/components/RoutesHeader";
import { fetchComments } from "@/lib/requests";
import Image from "next/image";

export const metadata = {
    title: 'آموزشگاه موسیقی چهارباغ |نطرات',
    description: 'این صفحه نظرات هنرجویان و اساتید و مدرسین آموزشگاه موسیقی چهارباغ است.',
  };

const Comments = async () => {
    const {comments} = await fetchComments();

    

    return ( 
        <section>
            <div className="w-full bg-[#F6F4EE]">
                <RoutesHeader pageTitle={"نظرات شما"} boldText={"نظرات فارغ التحصیلان و"} Highlight={"هنرجوبان"}/>
                <div className="container">
                    <div className="blogs w-full grid grid-cols-3 mb-20 gap-x-5 gap-y-8">
                        {comments&&comments.map((comment:any)=>(
                        <div key={comment._id} className=" w-[400px] py-4 bg-white rounded-xl flex justify-center items-center flex-col gap-y-6 ">
                            <div className=" w-30 h-30 "> 
                                <Image width={120} height={120} className="rounded-full" src="/images/comments/01.jpg" alt="img" /> 
                            </div>
                            <div className="text-[#152422] text-2xl font-DanaDemiBold">{comment.author}</div>
                            <div className="text-[#018A75] text-lg font-DanaMedium">فارغ التحصیل</div>
                            <div className="text-[#018A75] text-lg font-DanaMedium">{comment.date}</div>
                            <div className="w-[85%] text-[#152422]/75 text-base font-Dana text-center">{comment.text}</div>
                            <div className="w-8 h-8">  
                                <Image width={32} height={24} src="/images/comments/quote.png" alt="quote" /> 
                            </div>
                        </div>
                        ))}
                        
                    </div>
                </div>
                <div>
                    <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
                </div>
            </div>
        </section>
     );
}
 
export default Comments;