'use client';

import Link from 'next/link';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';
import UploadInput from '@/app/ui/components/UploadInput';
import { Instrument, IUser } from '@/lib/types';
import { fetchTeachers } from '@/lib/requests';

const EditInstrumentForm = () => {
  const { instrumentId } = useParams();
  const router = useRouter();

  const initialFields: Instrument = {
    id: 0,
    instrument_name: "",
    instrument_type: "STRING",
    instrument_teachers: [],
    instrument_description: "",
    instrument_origin: "WESTREN",
    instrument_img: "",
    books: [],
    createdAt: "",
    updatedAt: ""
  };

  const [fields, setFields] = useState<Instrument>(initialFields);
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstrument = async () => {
      try {
        const res = await fetch(`/api/instruments/${instrumentId}`);
        if (!res.ok) throw new Error('Failed to fetch instrument');
        const data = await res.json();

        setFields(data);
        setImagePreview(data.instrument_img);
      } catch (err) {
        console.error(err);
        setError('خطا در دریافت اطلاعات ساز');
        toast.error('خطا در دریافت اطلاعات ساز');
      } finally {
        setLoading(false);
      }
    };

    if (instrumentId) fetchInstrument();
  }, [instrumentId]);

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await fetchTeachers();
      setTeachers(data.teachers);
    };
    loadTeachers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFields(prev => ({
      ...prev,
      instrument_teachers: checked
        ? [...new Set([...prev.instrument_teachers, value])]  
        : prev.instrument_teachers.filter(id => id !== value)
    }));
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
    formData.append('file', file);
    formData.append('instrumentName', fields.instrument_name);

    try {
      const res = await fetch('/api/instruments/upload-instrument-image', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.url) {
        setFields(prev => ({ ...prev, instrument_img: data.url }));
        toast.success('تصویر با موفقیت آپلود شد');
      } else {
        toast.error('خطا در آپلود تصویر');
      }
    } catch {
      toast.error('خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/instruments/${instrumentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          teacherIds: fields.instrument_teachers.map(id => Number(id))
        })
      });
  
      if (res.ok) {
        toast.success('ساز با موفقیت ویرایش شد');
        router.push('/dashboard/instruments');
      } else {
        throw new Error('Failed to update instrument');
      }
    } catch (err) {
      console.error(err);
      toast.error('خطا در ویرایش ساز');
    }
  };
  
  

  if (loading) return <Loading />;
  

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5">
      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="instrument_name">نام ساز:</label>
        <input
          type="text"
          name="instrument_name"
          value={fields.instrument_name}
          onChange={handleChange}
          required
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder="نام ساز"
        />
      </div>

      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="instrument_type">نوع ساز:</label>
        <select
          name="instrument_type"
          value={fields.instrument_type}
          onChange={handleChange}
          required
          className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
        >
          <option value="">انتخاب نوع ساز</option>
          <option value="STRING">زهی</option>
          <option value="WIND">بادی</option>
          <option value="PERCUSSION">کوبه‌ای</option>
          <option value="KEYBOARD">صفحه کلید</option>
          <option value="ELECTRIC">الکتریکی</option>
        </select>
      </div>

      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="instrument_origin">مبدا ساز:</label>
        <select
          name="instrument_origin"
          value={fields.instrument_origin}
          onChange={handleChange}
          required
          className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
        >
          <option value="">انتخاب مبدا ساز</option>
          <option value="WESTREN">غربی</option>
          <option value="EASTREN">شرقی</option>
          <option value="PERSIAN">ایرانی</option>
        </select>
      </div>

      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="instrument_description">توضیحات:</label>
        <textarea
          name="instrument_description"
          value={fields.instrument_description}
          onChange={handleChange}
          rows={6}
          required
          className="w-full border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder="توضیحات ساز"
        />
      </div>

      <UploadInput
        uploadedImage={imagePreview}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
      />

      <div className="border p-3 flex flex-col gap-y-2 max-h-40 overflow-y-auto">
        <span className="font-DanaMedium">انتخاب مدرسین:</span>
        {teachers.map((teacher) => (
          <div key={teacher.id} className="flex gap-x-3 items-center">
            <input
              type="checkbox"
              id={`teacher-${teacher.id}`}
              value={teacher.id.toString()}
              checked={fields.instrument_teachers.includes(teacher.id)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`teacher-${teacher.id}`}>
              {teacher.firstname} {teacher.lastname}
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-y-3 w-full">
        <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-lg">ثبت تغییرات</button>
        <Link href="/dashboard/instruments" className="w-full p-3 bg-red-600 text-white text-center rounded-lg">
          انصراف
        </Link>
      </div>
    </form>
  );
};

export default EditInstrumentForm;
