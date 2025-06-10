"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProfileNav from "./ProfileNav";

const MobileNav = () => {
    const pathname = usePathname();

    const [navMenu, setNavMenu] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNavMenu(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navOpenMenuFunc = () => { 
        setNavMenu(!navMenu)
    }
    const navCloseMenuFunc = () => {
        setNavMenu(false);
    };
    return ( 
        <div className=" flex md:hidden justify-between items-center bg-white dark:bg-gray-900 px-4 h-20 z-50" ref={notificationRef}>
            <div onClick={navOpenMenuFunc} className="text-gray-900 dark:text-white">
                <div className="cursor-pointer">
                    <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            <div className={`${navMenu?'right-0 overlay__visible':'-right-64'} nav fixed top-0 bottom-0 w-64 pt-3 px-4 bg-white dark:bg-gray-900 z-20 transition-all overflow-y-auto` }>
                <div className="flex justify-between items-center  pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10">
                    <div className="w-full flex flex-col justify-center items-center gap-y-2 font-MorabbaBold">
                        <h2 className="  text-lg text-center text-mango mt-3">آموزشگاه موسیقی </h2>
                        <h2 className="bg-mango rounded-2xl py-1 px-2 flex justify-center items-center text-elf">چهـــاربــــاغ</h2>
                    </div>
                    <div onClick={navCloseMenuFunc} className="nva__close__btn cursor-pointer">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-zinc-600 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <ul className="text-greenDark dark:text-white font-DanaMedium space-y-6 child:pr-2.5">
                    <li className={pathname === '/'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <Link className="flex items-center gap-x-2" href="/">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            صفحه اصلی
                        </Link>
                    </li>
                    <li className={pathname === '/courses'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <div className="flex justify-between items-center mt-4">
                            <Link className="flex items-center gap-x-2" href="/courses">
                                <span >
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </span>
                                دوره های آموزشی
                            </Link >                            
                        </div>
                    </li>
                    <li className={pathname === '/teachers'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <Link className="flex items-center gap-x-2" href="/teachers">
                        <svg className="w-5 h-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg> 
                            مدرسین   
                        </Link>
                    </li>
                    <li className={pathname === '/instruments'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <Link className="flex items-center gap-x-2" href="/instruments">
                            <svg fill="none" viewBox="0 0 32 32" strokeWidth="1.5" stroke="currentColor" className="size-7" >
                                <path d="M 26.59375 3.0625 C 26.488281 3.0625 26.386719 3.113281 26.28125 3.21875 L 25.53125 3.96875 L 25.21875 3.65625 L 24.78125 4.0625 L 25.125 4.40625 L 24.6875 4.8125 L 24.375 4.5 L 23.9375 4.9375 L 24.25 5.25 L 23.53125 6 C 23.316406 6.214844 23.316406 6.410156 23.53125 6.625 L 19.34375 10.8125 C 18.410156 10.066406 17.414063 9.5 16.46875 9.21875 C 14.710938 8.699219 13.148438 9.074219 11.9375 10.28125 C 11.402344 10.816406 11.074219 11.46875 10.9375 12.25 C 10.71875 13.515625 9.601563 14.503906 8.28125 14.59375 C 6.839844 14.691406 5.574219 15.269531 4.625 16.21875 C 2.121094 18.722656 2.574219 23.265625 5.65625 26.34375 C 7.40625 28.09375 9.636719 29 11.6875 29 C 13.25 29 14.699219 28.457031 15.78125 27.375 C 16.730469 26.425781 17.308594 25.160156 17.40625 23.71875 C 17.496094 22.398438 18.453125 21.28125 19.71875 21.0625 C 20.5 20.925781 21.183594 20.597656 21.71875 20.0625 C 22.925781 18.855469 23.300781 17.289063 22.78125 15.53125 C 22.609375 14.945313 22.300781 14.347656 21.9375 13.75 L 20.46875 15.21875 C 20.625 15.519531 20.757813 15.808594 20.84375 16.09375 C 21.152344 17.132813 20.988281 17.980469 20.3125 18.65625 C 20.070313 18.894531 19.78125 19.027344 19.40625 19.09375 C 17.242188 19.46875 15.554688 21.367188 15.40625 23.59375 C 15.34375 24.542969 14.976563 25.363281 14.375 25.96875 C 12.648438 27.691406 9.394531 27.238281 7.09375 24.9375 C 4.792969 22.636719 4.308594 19.347656 6.03125 17.625 C 6.636719 17.023438 7.457031 16.65625 8.40625 16.59375 C 10.632813 16.445313 12.527344 14.757813 12.90625 12.59375 C 12.972656 12.21875 13.101563 11.929688 13.34375 11.6875 C 13.808594 11.222656 14.339844 11 14.96875 11 C 15.253906 11 15.582031 11.058594 15.90625 11.15625 C 16.535156 11.34375 17.238281 11.714844 17.90625 12.21875 L 14.5625 15.5625 C 14.382813 15.519531 14.195313 15.5 14 15.5 C 12.621094 15.5 11.5 16.621094 11.5 18 C 11.5 19.378906 12.621094 20.5 14 20.5 C 15.378906 20.5 16.5 19.378906 16.5 18 C 16.5 17.847656 16.464844 17.707031 16.4375 17.5625 L 25.53125 8.4375 C 25.746094 8.652344 25.972656 8.652344 26.1875 8.4375 L 26.9375 7.6875 L 27.25 8 L 27.65625 7.59375 L 27.34375 7.28125 L 27.78125 6.84375 L 28 7.28125 L 28.40625 6.84375 L 28.09375 6.53125 L 28.84375 5.78125 C 29.058594 5.566406 29.058594 5.339844 28.84375 5.125 L 26.9375 3.21875 C 26.832031 3.113281 26.699219 3.0625 26.59375 3.0625 Z M 26.5 4.28125 L 26.9375 4.71875 L 25 6.625 L 24.59375 6.21875 Z M 27.34375 5.03125 L 27.78125 5.46875 L 25.84375 7.375 L 25.4375 6.9375 Z M 9.09375 19.6875 L 7.6875 21.09375 L 10.90625 24.3125 L 12.3125 22.90625 Z"/>
                            </svg>
                                سازشناسی
                        </Link>
                    </li>               
                    <li className={pathname === '/gallery'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <a className="flex items-center gap-x-2" href="/galleries">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                                گالری
                        </a>
                    </li>
                    <li className={pathname === '/blogs'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <Link className="flex items-center gap-x-2" href="/blogs">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                        </svg>
                            مجله موسیقی
                        </Link>
                    </li>
                    <li className={pathname === '/songs'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <Link className="flex items-center gap-x-2" href="/songs">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                        </svg>
                            دانلود موسیقی
                        </Link>
                    </li>                         
                    <li className={pathname === '/about'? "flex items-center rounded-md bg-orange-200/20 text-mango pr-0 h-10":""}>
                        <Link className="flex items-center gap-x-2" href="/about">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                        </svg>
                            درباره ما 
                        </Link>
                    </li>          
                </ul>
            </div>
            <div className="w-12 ">
                <Image width={48} height={48} src="/images/logo.png" className="w-auto h-auto" alt="logo" />
            </div>
            <div>
                <ProfileNav/>
            </div>
        </div>
     );
}
 
export default MobileNav;