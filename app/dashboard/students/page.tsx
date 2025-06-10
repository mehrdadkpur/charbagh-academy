"use client"

import Search from "@/app/ui/components/Search";
import AddButton from "@/app/ui/components/AddButton";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { IUser } from "@/lib/types";
import { fetchStudents } from "@/lib/requests";
import StatusBadge from "@/app/ui/components/StatusBadge";
import Swal from "sweetalert2";

const Students = () => {
  const [students, setStudents] = useState<IUser[]>([]);
  const [query, setQuery] = useState({ text: "" });
  const [filteredStudents, setFilteredStudents] = useState<IUser[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents();
      setStudents(data);
      setFilteredStudents(data);
    };
    loadStudents();
  }, []);

  const handleDeleteStudent = async (studentId: number) => {
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
        const res = await fetch(`/api/admin/students/${studentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          setStudents((prev) => prev.filter((s) => s.id !== studentId));
          setFilteredStudents((prev) => prev.filter((s) => s.id !== studentId));

          await Swal.fire({
            icon: "success",
            title: "حذف شد!",
            text: "هنرجو با موفقیت حذف شد.",
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        await Swal.fire({
          icon: "error",
          title: "خطا",
          text: "خطا در حذف هنرجو.",
        });
      }
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery({ ...query, text: value });

    const filtered = students.filter((student) => {
      const firstMatch = student.firstname.toLowerCase().includes(value);
      const lastMatch = student.lastname.toLowerCase().includes(value);
      return firstMatch || lastMatch;
    });

    setFilteredStudents(filtered);
  };

  return (
    <section className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="w-full p-5 flex justify-center rounded-xl">
        <div className="w-full mt-5">
          <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
            هنرجویان آموزشگاه
          </span>
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            {/* Search Box & Add Button */}
            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
              <Search query={query} handleSearch={handleSearch} baseSearch={"نام و نام خانوادگی"} />
              <AddButton route={"/dashboard/students/add-student"} />
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left font-DanaMedium rtl:text-right">
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
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0">
                          <Image
                            width={40}
                            height={40}
                            className="w-full h-full rounded-full object-cover"
                            src={student.user_img || "/images/avatar.png"}
                            alt={`${student.firstname} ${student.lastname}`}
                          />
                        </div>
                        <div className="mr-3">
                          <div className="text-base font-semibold">
                            {student.firstname} {student.lastname}
                          </div>
                          <div className="font-normal text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">هنرجوی ساز {student.skill?.instrument_name}</td>
                    <td className="px-6 py-4">{student.nationality_number}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={student.status} />
                    </td>
                    <td className="px-6 py-4">{student.mobile}</td>
                    <td className="flex justify-center items-center py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/students/${student.id}`}
                          className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                        >
                          مشاهده
                        </Link>
                        <Link
                          href={`/dashboard/students/${student.id}/edit`}
                          className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
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

export default Students;
