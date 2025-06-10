'use client';

import Link from 'next/link';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { IVideo } from '@/lib/types';
import ShamsiDatePicker from '@/app/ui/components/ShamsiDatePicker';
import Swal from 'sweetalert2';

const EditVideoForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: number; category_name: string }[]>([]);
  const [fields, setFields] = useState<IVideo>({
    id: 0, 
    title: "", 
    url: "", 
    videoDate: "", 
    description: "",
    category: { id: 0, category_name: "" }, 
    createdAt: "", 
    updatedAt: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/admin/galleries/videos/${id}`);
        const data = await response.json();
        setFields(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Video:', error);
        setError('خطا در بارگذاری اطلاعات فیلم');
        setLoading(false);
      }
    };

    if (id) fetchVideo();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/public/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

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
      setFields(prev => ({...prev, videoDate: new Date(gregorianDate).toISOString() })); 
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'ثبت تغییرات؟',
      text: 'آیا از اعمال تغییرات مطمئن هستید؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'بله، ثبت کن',
      cancelButtonText: 'خیر',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/admin/galleries/videos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
        
        if (response.ok) {
          await Swal.fire('ثبت شد!', 'تغییرات با موفقیت ثبت شد.', 'success');
          router.push('/dashboard/galleries/videos');
        } else {
          throw new Error('Failed to update video');
        }
      } catch (error) {
        console.error('Error updating video:', error);
        Swal.fire('خطا', 'مشکلی در ثبت تغییرات به وجود آمد.', 'error');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto flex flex-col gap-y-6">
      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="title">نام فیلم:</label>
        <input
          name="title"
          type="text"
          className="flex-1 h-12 border p-3 rounded bg-gray-50 dark:bg-gray-700"
          placeholder="نام فیلم"
          required
          value={fields.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="description">توضیحات:</label>
        <input
          name="description"
          type="text"
          className="flex-1 h-12 border p-3 rounded bg-gray-50 dark:bg-gray-700"
          placeholder="توضیحات"
          required
          value={fields.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="url">آدرس فیلم:</label>
        <input
          name="url"
          type="text"
          className="flex-1 h-12 border p-3 rounded bg-gray-50 dark:bg-gray-700"
          placeholder="آدرس فیلم"
          required
          value={fields.url}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <label className="w-1/3">تاریخ تهیه فیلم:</label>
        <div className="flex-1">
        <ShamsiDatePicker
          onChange={handleDateChange}
          initialDate={fields.videoDate ? new Date(fields.videoDate) : new Date()}
        />

        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <label className="w-1/3" htmlFor="category">دسته‌بندی:</label>
        <select
          name="category"
          className="flex-1 h-12 border p-3 rounded bg-gray-50 dark:bg-gray-700"
          required
          value={fields.category.id.toString()}
          onChange={handleChange}
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
        >
          ثبت تغییرات
        </button>
        <Link
          href="/dashboard/galleries/videos"
          className="w-full text-center p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition"
        >
          انصراف
        </Link>
      </div>
    </form>
  );
};

export default EditVideoForm;
