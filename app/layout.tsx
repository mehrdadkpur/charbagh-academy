
import { ReactNode } from 'react'
import "./globals.css";
import FooterWrapper from '@/app/ui/components/FooterWraper'
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import MobileNav from './ui/components/MobileNav';

export const metadata: Metadata = {
  title: 'آموزشگاه موسیقی چهارباغ | خانه',
  description: 'موسیقی هنر برتر',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className='min-h-screen flex flex-col font-Dana'>
        <MobileNav/>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{duration:5000 , style:{fontFamily:'Dana'}}} />
        <main className="flex-grow">
          {children}
        </main>
        <FooterWrapper />
      </body>
    </html>
  )
}


