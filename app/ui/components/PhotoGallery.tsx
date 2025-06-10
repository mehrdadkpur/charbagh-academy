"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IPhoto } from '@/lib/types'
import { fetchPhotos } from '@/lib/requests';
import { shamsiDate } from '@/lib/shamsiDate';
import Link from 'next/link';

export default function PhotoGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [categories, setCategories] = useState<string[]>(['all'])
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [hoveredPhotoId, setHoveredPhotoId] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const photosPerPage = 12
    
    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await fetchPhotos()
                setPhotos(data)
            } catch (error) {
                console.error("Error fetching photos:", error)
            }
        }

        loadPhotos()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/public/categories')
            const data = await response.json()

            // Use only category names as strings
            const categoryNames = data.map((item: any) => item.category_name)
            setCategories(["all", ...data.map((item: any) => item.category_name)])

        }

        fetchCategories()
    }, [])

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category?.category_name === selectedCategory)

    const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)
    const indexOfLastPhoto = currentPage * photosPerPage
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
    const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto)

    const Pagination = () => (
        <div className="flex justify-center gap-2 mt-8 font-DanaMedium">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
            >
                قبلی
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                            ? 'bg-blue-600 text-white dark:bg-elf'
                            : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 dark:bg-gray-600 text-white rounded-lg disabled:bg-gray-300"
            >
                بعدی
            </button>
        </div>
    )

    return (
        <div className=''>
            <main className="flex-1 p-4">
                {/* Category Buttons */}
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap font-DanaMedium">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`${
                                selectedCategory === category
                                    ? 'text-blue-700 dark:text-mango dark:border-mango dark:bg-gray-600 border-blue-600 hover:bg-blue-700 hover:text-white'
                                    : 'text-gray-900 dark:text-gray-50 dark:bg-gray-600 border-white hover:border-gray-200'
                            } border bg-white rounded-full px-5 py-2.5 text-center me-3 mb-3`}
                        >
                            {category === 'all' ? 'همه دسته بندی ها' : category}
                        </button>
                    ))}
                </div>

                {/* Photos Grid */}
                {currentPhotos.length === 0 ? (
                    <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                        <p> هیچ عکسی در این دسته بندی وجود ندارد.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
                            {currentPhotos.map((photo) => (
                                <div
                                    key={photo.id}
                                    onMouseEnter={() => setHoveredPhotoId(photo.id)}
                                    onMouseLeave={() => setHoveredPhotoId(null)}
                                    className="aspect-square relative overflow-hidden rounded-lg"
                                >
                                    <Image
                                        src={photo.url}
                                        alt={photo.title}
                                        fill
                                        sizes="(max-width: 768px) 20vw, 33vw"
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className={`absolute bottom-0 w-full bg-black/60 text-white px-4 py-2 transition-transform duration-500 ${hoveredPhotoId === photo.id ? 'translate-y-0' : 'translate-y-full'}`}>
                                        <div>{photo.title}</div>
                                        <div>{photo.description}</div>
                                        <div> {photo.photoDate ? shamsiDate({ date: photo.photoDate }) : "نامشخص"}</div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination />
                    </>
                )}
            </main>
            <div className="w-40 mx-auto mt-5 font-DanaMedium">
                <Link href={"/galleries"} className="w-full p-2 bg-red-600 rounded-lg text-xl text-center text-white" > بازگشت به گالری</Link>
            </div>
        </div>
    )
}
