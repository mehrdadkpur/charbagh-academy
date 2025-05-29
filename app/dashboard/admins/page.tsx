"use client"

import Search from "@/app/ui/components/Search";
import AddButton from "@/app/ui/components/AddButton";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { IUser } from "@/lib/types";
import { fetchAdmins } from "@/lib/requests";
import StatusBadge from "@/app/ui/components/StatusBadge";
import Swal from "sweetalert2";

const Admins = () => {
  const [admins, setAdmins] = useState<IUser[]>([]);
  const [query, setQuery] = useState({ text: "" });
  const [filteredAdmins, setFilteredAdmins] = useState<IUser[]>([]);

  useEffect(() => {
    const loadAdmins = async () => {
      const data = await fetchAdmins();
      
      setAdmins(data);
      setFilteredAdmins(data);
    };
    loadAdmins();
  }, []);

  const handleDeleteAdmin = async (adminId: number) => {
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
        const res = await fetch(`/api/admins/${adminId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          setAdmins((prev) => prev.filter((s) => s.id !== adminId));
          setFilteredAdmins((prev) => prev.filter((s) => s.id !== adminId));

          await Swal.fire({
            icon: "success",
            title: "حذف شد!",
            text: "هنرجو با موفقیت حذف شد.",
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Error deleting Admin:", error);
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

    const filtered = admins.filter((admin) => {
      const firstMatch = admin.firstname.toLowerCase().includes(value);
      const lastMatch = admin.lastname.toLowerCase().includes(value);
      return firstMatch || lastMatch;
    });

    setFilteredAdmins(filtered);
  };

  return (
    <section className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="w-full p-5 flex justify-center rounded-xl">
        <div className="w-full mt-5">
          <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مدیران سایت</span>         
         
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            {/* Search Box & Add Button */}
            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
              <Search query={query} handleSearch={handleSearch} baseSearch={"نام و نام خانوادگی"} />
              <AddButton route={"/dashboard/admins/add-admin"} />
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left font-DanaMedium rtl:text-right">
              <thead>
                <tr>
                  <th className="px-6 py-3">نام و نام خانوادگی</th>
                  <th className="px-6 py-3">شماره ملی</th>
                  <th className="px-6 py-3">وضعیت</th>
                  <th className="px-6 py-3">شماره موبایل</th>
                  <th className="flex justify-center items-center py-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0">
                          <Image
                            width={40}
                            height={40}
                            className="w-full h-full rounded-full object-cover"
                            src={admin.user_img || "/images/avatar.png"}
                            alt={`${admin.firstname} ${admin.lastname}`}
                          />
                        </div>
                        <div className="mr-3">
                          <div className="text-base font-semibold">
                            {admin.firstname} {admin.lastname}
                          </div>
                          <div className="font-normal text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{admin.nationality_number}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={admin.status} />
                    </td>
                    <td className="px-6 py-4">{admin.mobile}</td>
                    <td className="flex justify-center items-center py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/admins/${admin.id}`}
                          className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                        >
                          مشاهده
                        </Link>
                        <Link
                          href={`/dashboard/admins/${admin.id}/edit`}
                          className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
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

export default Admins;
