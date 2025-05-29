"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadInput from "@/app/ui/components/UploadInput";
import toast from "react-hot-toast";
import { IPhoto } from "@/lib/types";
import ShamsiDatePicker from "@/app/ui/components/ShamsiDatePicker";

const AddPhotoForm = () => {
  const router = useRouter();
  const [fields, setFields] = useState<IPhoto>({
    id: 0,
    title: "",
    url: "",
    photoDate: "",
    description: "",
    category:{id:0 , category_name:""},
    createdAt:"",
    updatedAt:""
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('/images/avatar.png');
  const [categories, setCategories] = useState<{ id: number; category_name: string }[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
        const response = await fetch('/api/categories')
        const data = await response.json();
        setCategories(data);

    }

    fetchCategories()
}, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (gregorianDate: string) => {
    setFields(prev => ({ ...prev, photoDate: gregorianDate }))
  }

  const handlePhotoUpload = async (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader()
    reader.onloadend = () => {
        setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", fields.title);
    formData.append("id", fields.id.toString());
    
    // Only append previousUrl if it exists and is not empty
    if (fields.url) {
     formData.append('previousUrl', fields.url);
 }
    try {
      const response = await fetch("/api/galleries/upload-gallery-photo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFields((prev) => ({ ...prev, url: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (fields.category) {
      const categoryId = fields.category.id;
      if (!isNaN(categoryId)) {
        formData.append("categoryId", String(categoryId));
      } else {
        console.error("❌ Invalid category ID:", fields.category);
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
    if (fields.photoDate) {
      formData.append("photoDate", fields.photoDate);
    }    
  
    try {
      const response = await fetch("/api/galleries/photos", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.message) {
        toast.success("عکس با موفقیت اضافه شد");
        router.push("/dashboard/galleries/photos");
        router.refresh();
      }
    } catch (error) {
      toast.error("خطا در ثبت عکس");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
      <div className="w-full flex justify-center items-center gap-x-2">
        <label className="w-1/3" htmlFor="title">
          نام عکس:
        </label>
        <input
          name="title"
          type="text"
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder="نام عکس"
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
      <div className="w-full flex justify-center items-center gap-x-2 ">
                    <label className="w-1/3">تاریخ تهیه عکس:</label>
                    <div className="w-2/3">
                    <ShamsiDatePicker
                    onBirthDateChange={handleDateChange}
                    initialDate={fields.photoDate ? new Date(fields.photoDate) : new Date()}
                    fieldName="photoDate"
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
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
            ))}

          </select>
      </div>
      <UploadInput uploadedImage={imagePreview} handleImageUpload={handlePhotoUpload} uploading={uploading} />
      <div className="w-1/2 flex justify-center items-center flex-col gap-y-3">
        <button
          type="submit"
          className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
        >
          ایجاد عکس
        </button>
        <Link
          href="/dashboard/gallery/photos"
          className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
        >
          انصراف
        </Link>
      </div>
    </form>
  );
};

export default AddPhotoForm;
