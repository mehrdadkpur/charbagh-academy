'use client';

import Link from 'next/link';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import UploadInput from '@/app/ui/components/UploadInput';
import toast from 'react-hot-toast';
import { IBlog } from '@/lib/types';

const EditBlogForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const [fields, setFields] = useState<IBlog>({
        id:0,
        author:"",
        authorId: 0,
        blog_title: "",
        blog_text: "",
        blog_img: "",
        createdAt:"",
        updatedAt:""
    });
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogs/${id}`);
                const data = await response.json();
                setFields(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Blogs:', error);
                setError('Failed to fetch Blogs data');
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    useEffect(() => { 
        setImagePreview(fields.blog_img); 
    }, [fields.blog_img]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));                
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields)
            });

            if (response.ok) {
                router.push('/user/profile');
                toast.success('پست مورد نظر با موفقیت ویرایش شد');
            }
        } catch (error) {
            toast.error('خطا در ویرایش پست');
            console.error('Error updating Blog:', error);
        }
    };

    const handleImageUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
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
        formData.append('blog_title', fields.blog_title);    

        try {
            const response = await fetch('/api/blogs/upload-blog-image', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.url) {
                setFields(prev => ({ ...prev, blog_img: data.url }));
                toast.success('تصویر با موفقیت آپلود شد');
            }
        } catch (error) {
            toast.error('خطا در آپلود تصویر');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;


    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5 font-DanaMedium">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="authorId"> نویسنده: </label>
                <input
                    name="authorId"
                    className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                    placeholder="نویسنده "
                    required
                    value={`${fields.author?.firstname} ${fields.author?.lastname}`}
                    disabled
                    onChange={handleChange}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_title"> موضوع: </label>
                <input
                        name="blog_title"
                        className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="موضوع "
                        required
                        value={fields.blog_title}
                        onChange={handleChange}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_text"> متن پست: </label>
                <textarea
                        name="blog_text"
                        className="w-full h-60 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="متن پست "
                        required
                        value={fields.blog_text}
                        onChange={handleChange}
                    />
            </div>
            <UploadInput uploadedImage={imagePreview} uploading={uploading} handleImageUpload={handleImageUpdate}  />
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button 
                    type="submit" 
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                    ویرایش پست
                </button>
                <Link 
                    href="/dashboard/blogs" 
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
     );
 }
 export default EditBlogForm;