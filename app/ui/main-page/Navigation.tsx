'use client'

import Link from "next/link";
import Profile from "@/app/ui/components/ProfileNav"
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navigation = () => {
    const pathname = usePathname();

    return ( 
        <div className="hidden md:flex items-center gap-x-6 lg:gap-x-10 p-4  w-full xl:w-[88%]">
            <Link href={'/'}>
                <Image width={65} height={65} className="w-auto h-auto"  src="/images/logo.png" alt="logo" />
            </Link>
            <div className="w-full  flex justify-between items-center gap-x-4 p-2 ">
                    <ul className="flex items-center gap-x-3 lg:gap-x-6 xl:gap-x-8 font-DanaMedium text-sm lg:text-lg xl:text-xl text-gray-900 dark:text-gray-50 ">
                        <Link href='/courses' className={`transition-colors duration-200 ${pathname.startsWith('/courses') ? 'text-mango' : 'hover:text-mango'}`}>
                            دوره ها 
                        </Link>
                        <Link href='/teachers' className={`transition-colors duration-200 ${pathname.startsWith('/teachers') ? 'text-mango' : 'hover:text-mango'}`}>
                            مدرسین
                        </Link>
                        <Link href='/instruments' className={`transition-colors duration-200 ${pathname.startsWith('/instruments') ? 'text-mango' : 'hover:text-mango'}`}>
                            سازشناسی
                        </Link>
                        <Link href='/galleries' className={`transition-colors duration-200 ${pathname.startsWith('/galleries') ? 'text-mango' : 'hover:text-mango'}`}>
                            گالری
                        </Link>
                        <Link href='/blogs' className={`transition-colors duration-200 ${pathname.startsWith('/blogs') ? 'text-mango' : 'hover:text-mango'}`}>
                             بلاگ
                        </Link>
                        <Link href='/songs' className={`transition-colors duration-200 ${pathname.startsWith('/songs') ? 'text-mango' : 'hover:text-mango'}`}>
                         موسیقی
                        </Link>
                        <Link href='/about' className={`transition-colors duration-200 ${pathname.startsWith('/about') ? 'text-mango' : 'hover:text-mango'}`}>
                            درباره ما
                        </Link>
                    </ul>
                <Profile/>
            </div>
        </div>
    )
}

export default Navigation;
