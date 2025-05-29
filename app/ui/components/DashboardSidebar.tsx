'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DashboardSidebar = () => {
  const [openLink, setOpenLink] = useState<string | null>(null);

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    e.preventDefault();
    setOpenLink(prev => (prev === key ? null : key));
  };

  const Section = ({
    title,
    icon,
    keyName,
    links,
  }: {
    title: string;
    icon: JSX.Element;
    keyName: string;
    links: { label: string; href: string }[];
  }) => (
    <div>
      <a
        href="#"
        onClick={(e) => handleToggle(e, keyName)}
        className="flex justify-between items-center p-3 rounded-md hover:bg-slate-200 transition"
      >
        <span className="flex gap-2 items-center">
          {icon}
          <span>{title}</span>
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${openLink === keyName ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {openLink === keyName && (
        <div className="px-7 mt-1 space-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block p-2 text-sm text-gray-600 hover:text-gray-800 transition rounded-md">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="absolute top-0 right-0 font-DanaMedium pb-10 rounded-lg min-h-screen z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 w-72 shadow-md">
      <div className="flex flex-col justify-center items-center">
        <Link href='/' className="w-24 h-40 flex justify-center items-center">
          <Image width={96} height={160} src="/images/logo.png" alt="logo" className="object-contain" />
        </Link>

        <div className="w-full px-2 space-y-2 overflow-y-auto">

          {/* داشبورد */}
          <Section
            keyName="dashboard"
            title="داشبورد مدیریت"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            links={[
              { label: "صفحه اصلی داشبورد", href: "/dashboard" }
            ]}
          />

          {/* اشخاص */}
          <Section
            keyName="users"
            title="مدیریت اشخاص"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0Zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0Z"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            }
            links={[
              { label: "مدرسین", href: "/dashboard/teachers" },
              { label: "هنرآموزان", href: "/dashboard/students" },
              { label: "مدیران سایت", href: "/dashboard/admins" },
            ]}
          />

          {/* سازها */}
          <Section
            keyName="instruments"
            title="مدیریت سازها"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
              </svg>            
            }
            links={[
              { label: "سازها", href: "/dashboard/instruments" },
            ]}
          />

          {/* دوره‌ها */}
          <Section
            keyName="courses"
            title="مدیریت دوره‌ها"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.25c0 .414-.336.75-.75.75H6.75A.75.75 0 016 20.25a12.083 12.083 0 01-.16-9.672L12 14z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            links={[
              { label: "دوره‌ها", href: "/dashboard/courses" },
            ]}
          />

          {/* مشاوره */}
          <Section
            keyName="guidances"
            title="مدیریت درخواست های مشاوره"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>

            }
            links={[
              { label: "درخواست های مشاوره", href: "/dashboard/guidances" },
            ]}
          />

          {/* بلاگ */}
          <Section
            keyName="blog"
            title="مدیریت بلاگ"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            links={[
              { label: "بلاگ‌ها", href: "/dashboard/blogs" },
            ]}
          />

          {/* رسانه‌ها */}
          <Section
            keyName="media"
            title="مدیریت رسانه‌ها"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 16V4h16v12M4 16l8-5 8 5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            links={[
              { label: "گالری تصاویر", href: "/dashboard/galleries/photos" },
              { label: "ویدیوها", href: "/dashboard/galleries/videos" },
            ]}
          />

          {/* رمز کاربران */}

          <Section
            keyName="reset-password"
            title="مدیریت رمز کاربران"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            links={[
              { label: "بازنشانی رمز کاربران", href: "/dashboard/reset-password" },
            ]}
          />

        </div>
      </div>
    </section>
  );
};

export default DashboardSidebar;
