import RoutesHeader from "@/app/ui/components/RoutesHeader";
import BlogCard from "@/app/ui/components/BlogCard";
import { fetchActiveBlogs } from "@/lib/requests";
import jalaali from 'jalaali-js';
import Image from "next/image";
import { IBlog } from "@/lib/types";

export const metadata = {
    title: 'آموزشگاه چهارباغ | پست ها',
    description: 'این صفحه پست ها و خبرنامه و رویدادهای مهم آموزشگاه موسیقی چهارباغ است.',
  };

const Blogs = async () => {
    const { blogs } = await fetchActiveBlogs();

    return (
        <section className="bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader pageTitle={'خبرنامه'} boldText={' خبرنامه و'} Highlight={'رویدادها'}/>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center mb-20">
                    {blogs?.map((blog:IBlog) => {
                        const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
                        return (
                            <BlogCard key={blog.id} blog={blog} shamsiCreatedDate={shamsiCreatedDate}/>
                        );
                    })}
                </div>
            </div>
            <div className="w-full">
                <Image 
                    width={1920} 
                    height={134} 
                    src="/images/shapes/footer-1.png" 
                    alt="footer"
                    className="w-full"
                    priority
                />
            </div>
        </section>
    );
}

export default Blogs;
