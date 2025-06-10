"use client";

import Link from "next/link";
import UploadInput from "@/app/ui/components/UploadInput";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { IUser } from "@/lib/types";
import { Instrument } from "@/lib/types";
import { fetchTeachers, fetchInstruments } from "@/lib/requests";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AddCourseForm = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("/images/avatar.png");
  const [fields, setFields] = useState({
    course_name: "",
    instrument: "",   
    course_description: "",
    course_img: "",
    course_status: "ACTIVE",
    teacher: ""
  });
  

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await fetchTeachers();
      setTeachers(data.teachers);
    };
    loadTeachers();
  }, []);

  useEffect(() => {
    const loadInstruments = async () => {
      const data = await fetchInstruments();
      setInstruments(data.instruments);
    };
    loadInstruments();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    if (!fields.instrument) {
      toast.error("لطفاً یک ساز انتخاب کنید");
      setLoading(false);
      return;
    }
    if (fields.teacher.length === 0) {
      toast.error("لطفاً حداقل یک مدرس انتخاب کنید");
      setLoading(false);
      return;
    }
  
    try {
      const payload = {
        course_name: fields.course_name.trim(),
        course_description: fields.course_description.trim(),
        course_img: fields.course_img,
        course_status: fields.course_status,
        teacher: fields.teacher,
        instrument: fields.instrument
      };      
  
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        await Swal.fire({
          title: '🎉 موفقیت آمیز!',
          text: 'دوره با موفقیت ثبت شد.',
          icon: 'success',
          confirmButtonText: 'باشه',
          confirmButtonColor: '#10B981',
        });
        router.push("/dashboard/courses");
        router.refresh();
      } else {
        toast.error(data.message || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.error("خطا در ثبت دوره");
      console.error("Course submit error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", fields.course_name);

    try {
      const response = await fetch("/api/admin/courses/upload-course-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        setFields(prev => ({ ...prev, course_img: data.url }));
        toast.success("تصویر با موفقیت آپلود شد");
      }
    } catch (error) {
      toast.error("خطا در آپلود تصویر");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5 font-Dana">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="course_name"> نام دوره: </label>
                <input
                name="course_name"
                type="text"
                className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                placeholder="نام دوره"
                required
                value={fields.course_name}
                onChange={(e) => setFields(prev => ({...prev, [e.target.name]: e.target.value}))}
            />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="instrument">
                        نوع ساز:
                    </label>
                    <select
                        name="instrument"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.instrument}
                        onChange={handleChange}
                    >
                        <option value="">انتخاب ساز</option>
                        {instruments && instruments.map((instrument) => (
                        <option key={instrument.id} value={instrument.id}>
                            {instrument.instrument_name}
                        </option>
                        ))}

                    </select>
            </div>    
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="course_description"> درباره: </label>
                <textarea
                        name="course_description"
                        className="w-full h-60 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="درباره دوره"
                        required
                        value={fields.course_description}
                        onChange={(e) => setFields(prev => ({...prev, [e.target.name]: e.target.value}))}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="course_status">
                        وضعیت:
                    </label>
                    <select
                        name="course_status"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.course_status}
                        onChange={handleChange}
                    >
                        <option value="">وضعیت</option>
                        <option value="ACTIVE">فعال</option>
                        <option value="DEACTIVE">غیرفعال</option>
                    </select>
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
              <label className="w-1/3" htmlFor="teacher">
                مدرس:
              </label>
              <select
                name="teacher"
                className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                required
                value={fields.teacher}
                onChange={handleChange}
              >
                <option value="">انتخاب مدرس</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstname} {teacher.lastname}
                  </option>
                ))}
              </select>
            </div>

            <UploadInput uploadedImage={imagePreview} handleImageUpload={handleImageUpload} uploading={uploading} />
            <div className="flex flex-col gap-y-3">
                <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg text-gray-50 flex items-center justify-center gap-2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            >
            {loading && (
                <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
                </svg>
            )}
            {loading ? "در حال ایجاد..." : "ایجاد دوره"}
                </button>
                <Link href="/dashboard/courses" className="p-3 bg-red-600 rounded-lg text-center text-gray-50">
                    انصراف
                </Link>
            </div>
        </form>
    )
}

export default AddCourseForm;
