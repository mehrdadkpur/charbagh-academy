"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UploadInput from "@/app/ui/components/UploadInput";
import { IUser, Instrument, ICourse } from "@/lib/types";
import { fetchTeachers, fetchFullInstruments } from "@/lib/requests";
import Loading from "@/app/loading";
import Link from "next/link";

const EditCourseForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<ICourse | null>(null);
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [fields, setFields] = useState({
    course_name: "",
    instrument: "",
    course_description: "",
    course_img: "/images/avatar.png",
    course_status: "ACTIVE",
    teacher: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, teacherData, instrumentData] = await Promise.all([
          fetch(`/api/admin/courses/${id}`),
          fetchTeachers(),
          fetchFullInstruments(),
        ]);

        const courseData = await courseRes.json();
        console.log(courseData);
        
        if (!courseRes.ok) {
          toast.error(courseData.error || "خطا در دریافت اطلاعات دوره");
          return;
        }

        setCourse(courseData);
        setTeachers(teacherData.teachers);
        setInstruments(instrumentData.instruments);
        setFields({
          course_name: courseData.course_name || "",
          instrument: courseData.instrument.id?.toString() || "",
          course_description: courseData.course_description || "",
          course_img: courseData.course_img || "/images/avatar.png",
          course_status: courseData.course_status || "ACTIVE",
          teacher: courseData.teacher?.id?.toString() || "",
        });
        setImagePreview(courseData.course_img || "/images/avatar.png");
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!fields.instrument || !fields.teacher) {
      toast.error("لطفاً مدرس و ساز را انتخاب کنید");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        course_name: fields.course_name.trim(),
        course_description: fields.course_description.trim(),
        course_img: fields.course_img,
        course_status: fields.course_status,
        teacher: fields.teacher,
        instrument: fields.instrument,
      };

      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        await Swal.fire({
          title: "ویرایش موفق!",
          text: "دوره با موفقیت به‌روزرسانی شد.",
          icon: "success",
          confirmButtonText: "باشه",
          confirmButtonColor: "#10B981",
        });
        router.push("/dashboard/courses");
        router.refresh();
      } else {
        toast.error(data.message || "خطا در به‌روزرسانی دوره");
      }
    } catch (err) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFields((prev) => ({ ...prev, course_img: reader.result as string }));
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", fields.course_name);

    try {
      const res = await fetch("/api/admin/courses/upload-course-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFields((prev) => ({ ...prev, course_img: data.url }));
        setImagePreview(data.url);
        toast.success("تصویر با موفقیت آپلود شد");
      }
    } catch (err) {
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !course || teachers.length === 0 || instruments.length === 0) {
    return <Loading />;
  }

  console.log();
  

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5 font-Dana">
      <div className="flex gap-x-2 items-center">
        <label className="w-1/3">نام دوره:</label>
        <input
          type="text"
          name="course_name"
          className="w-full h-12 border p-3"
          value={fields.course_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-x-2 items-center">
        <label className="w-1/3">ساز:</label>
        <select
          name="instrument"
          value={fields.instrument}
          onChange={handleChange}
          className="w-2/3 h-12 border p-3"
          required
        >
          <option value="">انتخاب ساز</option>
          {instruments.map((i) => (
            <option key={i.id} value={i.id.toString()}>
              {i.instrument_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-x-2 items-center">
        <label className="w-1/3">مدرس:</label>
        <select
          name="teacher"
          value={fields.teacher}
          onChange={handleChange}
          className="w-2/3 h-12 border p-3"
          required
        >
          <option value="">انتخاب مدرس</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id.toString()}>
              {t.firstname} {t.lastname}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-x-2 items-start">
        <label className="w-1/3">درباره:</label>
        <textarea
          name="course_description"
          value={fields.course_description}
          onChange={handleChange}
          className="w-full h-60 border p-3"
          required
        />
      </div>

      <div className="flex gap-x-2 items-center">
        <label className="w-1/3">وضعیت:</label>
        <select
          name="course_status"
          value={fields.course_status}
          onChange={handleChange}
          className="w-2/3 h-12 border p-3"
          required
        >
          <option value="ACTIVE">فعال</option>
          <option value="DEACTIVE">غیرفعال</option>
        </select>
      </div>

      {/* تصویر دوره */}
      <div className="flex gap-x-2 items-start">
        <label className="w-1/3">تصویر دوره:</label>
        <div className="flex flex-col items-start gap-y-2">
          <UploadInput
            uploadedImage={imagePreview}
            handleImageUpload={handleImageUpload}
            uploading={uploading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`p-3 rounded-lg text-white ${
          submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>

      <Link
        href="/dashboard/courses"
        className="w-full flex justify-center items-center p-3 rounded-lg text-white bg-red-600 hover:bg-red-700"
      >
        بازگشت به صفحه دوره‌ها
      </Link>
    </form>
  );
};

export default EditCourseForm;
