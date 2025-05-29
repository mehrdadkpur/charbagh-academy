import type { Metadata } from "next";
import React from "react";
import DashboardSidebar from "../ui/components/DashboardSidebar";
import DashboardHeader from "../ui/components/DashboardHeader";

export const metadata: Metadata = {
  title: "داشبورد مدیر",
  description: "موسیقی هنر برتر",
};

export default function DashboardLayout({children,}: Readonly<{ children: React.ReactNode}>) {
  return (
    <div className="hidden md:block min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 ">
      <DashboardHeader/>
      <DashboardSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
