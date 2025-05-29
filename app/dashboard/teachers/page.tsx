"use client"

import AddButton from "@/app/ui/components/AddButton";
import Search from "@/app/ui/components/Search";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "@/lib/types";
import StatusBadge from "@/app/ui/components/StatusBadge";
import Swal from "sweetalert2";

interface QueryState {
  text: string;
}

const getTeachers = async () => {
  const response = await fetch("/api/teachers");
  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }
  return response.json();
};

const Teachers = () => {
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [query, setQuery] = useState<QueryState>({ text: "" });
  const [filteredTeachers, setFilteredTeachers] = useState<IUser[]>([]);

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await getTeachers();
      setTeachers(data.teachers);
      setFilteredTeachers(data.teachers);
    };
    loadTeachers();
  }, []);

  const handleDeleteConfirm = async (teacherId: number) => {
    const result = await Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/teachers/${teacherId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
          setFilteredTeachers((prev) => prev.filter((t) => t.id !== teacherId));
          await Swal.fire({
            icon: "success",
            title: "حذف شد!",
            text: "مدرس با موفقیت حذف شد.",
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Error deleting teacher:", error);
        await Swal.fire({
          icon: "error",
          title: "خطا",
          text: "خطا در حذف مدرس.",
        });
      }
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setQuery({ ...query, text: searchValue });

    const allTeachers = teachers.filter((teacher) => {
      const lastNameMatch = teacher.lastname.toLowerCase().includes(searchValue);
      const firstNameMatch = teacher.firstname.toLowerCase().includes(searchValue);
      return lastNameMatch || firstNameMatch;
    });
    setFilteredTeachers(allTeachers);
  };

  return (
    <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
      <div className="w-full p-5 flex justify-center rounded-xl">
        <div className="w-full mt-5">
          <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
            مدرسین آموزشگاه
          </span>
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
              <Search query={query} handleSearch={handleSearch} baseSearch={"نام و نام خانوادگی"} />
              <AddButton route={"/dashboard/teachers/add-teacher"} />
            </div>

            <table className="w-full text-sm font-DanaMedium bg-white dark:bg-gray-900">
              <thead>
                <tr>
                  <th className="px-6 py-3">نام و نام خانوادگی</th>
                  <th className="px-6 py-3">حوزه هنری</th>
                  <th className="px-6 py-3">شماره ملی</th>
                  <th className="px-6 py-3">وضعیت</th>
                  <th className="px-6 py-3">شماره موبایل</th>
                  <th className="flex justify-center items-center py-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0">
                          <Image
                            width={40}
                            height={40}
                            className="w-full h-full rounded-full object-cover"
                            src={teacher.user_img || "/images/avatar.png"}
                            alt={`${teacher.firstname} ${teacher.lastname}`}
                          />
                        </div>
                        <div className="mr-3">
                          <div className="text-base font-semibold">
                            {teacher.firstname} {teacher.lastname}
                          </div>
                          <div className="font-normal text-gray-500">{teacher.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">مدرس ساز {teacher.skill?.instrument_name}</td>
                    <td className="px-6 py-4">{teacher.nationality_number}</td>
                    <td>
                      <StatusBadge status={teacher.status} />
                    </td>
                    <td className="px-6 py-4">{teacher.mobile}</td>
                    <td className="flex justify-center items-center py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/teachers/${teacher.id}`}
                          className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                        >
                          مشاهده
                        </Link>
                        <Link
                          href={`/dashboard/teachers/${teacher.id}/edit`}
                          className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirm(teacher.id)}
                          className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
