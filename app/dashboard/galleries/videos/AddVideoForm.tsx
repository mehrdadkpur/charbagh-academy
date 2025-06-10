"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IVideo } from "@/lib/types";
import ShamsiDatePicker from "@/app/ui/components/ShamsiDatePicker";
import toast from "react-hot-toast";

const AddVideoForm = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: number; category_name: string }[]>([]);
  const [fields, setFields] = useState <IVideo> ({
    id: 0,
    title: "",
    url: "",
    videoDate: "",
    description: "",
    category: {id: 0, category_name: ""},
    createdAt:"",
    updatedAt:""
  });

  useEffect(() => {
    const fetchCategories = async () => {
        const response = await fetch('/api/public/categories')
        const data = await response.json();
        setCategories(data);

    }

    fetchCategories()
}, [])

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  if (name === "category") {
    const selectedCategory = categories.find(cat => cat.id === parseInt(value));
    if (selectedCategory) {
      setFields(prev => ({
        ...prev,
        category: { id: selectedCategory.id, category_name: selectedCategory.category_name }
      }));
    }
  } else {
    setFields(prev => ({ ...prev, [name]: value }));
  }
};


const handleDateChange = (gregorianDate: string) => {
  setFields(prev => ({ ...prev, videoDate: gregorianDate }))
}

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData();
  
  if (fields.category) {
    const categoryId = fields.category.id;
    if (!isNaN(categoryId)) {
      formData.append("categoryId", String(categoryId));
    } else {
      console.error("❌ Invalid category ID:", fields.category.id);
      toast.error("دسته‌بندی نامعتبر است");
      return;
    }
  } else {
    console.error("❌ No category selected");
    toast.error("لطفاً یک دسته‌بندی انتخاب کنید");
    return;
  }
  formData.append("title", fields.title);
  formData.append("url", fields.url);
  if (fields.description) {
    formData.append("description", fields.description);
  }
  if (fields.videoDate) {
    formData.append("videoDate", fields.videoDate);
  }    

  try {
    const response = await fetch("/api/admin/galleries/videos", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.message) {
      toast.success("فیلم با موفقیت اضافه شد");
      router.push("/dashboard/galleries/videos");
      router.refresh();
    }
  } catch (error) {
    toast.error("خطا در ثبت فیلم");
  }
};

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
      <div className="w-full flex justify-center items-center gap-x-2">
        <label className="w-1/3" htmlFor="title">
          نام فیلم:
        </label>
        <input
          name="title"
          type="text"
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder="نام فیلم"
          required
          value={fields.title}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-x-2">
        <label className="w-1/3" htmlFor="description">
          {" "}
          توضیحات:
        </label>
        <input
          name="description"
          type="text"
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder=" توضیحات"
          required
          value={fields.description}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-x-2">
        <label className="w-1/3" htmlFor="url">
          {" "}
          آدرس فیلم:
        </label>
        <input
          name="url"
          type="text"
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder=" آدرس فیلم"
          required
          value={fields.url}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-x-2 ">
          <label className="w-1/3">تاریخ تهیه فیلم:</label>
          <div className="w-2/3">
          <ShamsiDatePicker
            onChange={handleDateChange}
            initialDate={fields.videoDate ? new Date(fields.videoDate) : new Date()}
          />
          </div>
      </div> 
      <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="category">
            دسته بندی :
          </label>
          <select
            name="category"
            className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
            required
            onChange={handleChange}
          >
            <option value="">دسته بندی</option>
            {categories && categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.category_name}
            </option>
            ))}

          </select>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-y-3">
        <button
          type="submit"
          className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
        >
          ایجاد فیلم
        </button>
        <Link
          href="/dashboard/galleries/videos"
          className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
        >
          انصراف
        </Link>
      </div>
    </form>
  );
};

export default AddVideoForm;
