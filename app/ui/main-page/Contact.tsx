'use client'

import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"

interface FormFields {
  fullname: string
  mobile: string
  status: string
}

const Contact = () => {

  const [fields, setFields] = useState<FormFields>({
    fullname: "",
    mobile: "",
    status: "در انتظار مشاوره"
  })


  const validateForm = () => {
    if (fields.mobile.length !== 11) {
      toast.error('شماره موبایل باید 11 رقم باشد')
      return false
    }
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const response = await fetch("/api/guidances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })

      if (response.ok) {
        toast.success("به زودی به شما تماس خواهیم گرفت")
        toast.success("مشخصات شما با موفقیت ارسال شد")
        setFields({ fullname: "", mobile: "", status: "" })
      }
    } catch (error) {
      toast.error("خطا در ارسال اطلاعات")
      console.error("Error submitting form:", error)
    }
  }

  return (
    <section className="relative bg-elf dark:bg-gray-900 overflow-hidden">
     <Image
              src="/images/shapes/wave-5.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/wave-5-dark-2.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16 relative z-10 ">
          {/* Header */}
          <div className="max-w-2xl text-center">
            <span className="text-amber-400 font-Dana text-sm">
              مشاوره
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-DanaDemiBold text-gray-50 leading-relaxed">
              اگه مشاوره رایگان می خوای شماره موبایلت را اینجا وارد کن تا در اسرع وقت بهت زنگ بزنیم
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center justify-center">
            <input
              name="fullname"
              type="text"
              value={fields.fullname}
              onChange={handleChange}
              required
              placeholder="نام و نام خانوادگی"
              className="w-full md:w-[300px] h-14 px-6 rounded-full text-base font-DanaMedium 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-amber-400 
              transform transition-all duration-300 focus:scale-105"
            />
            
            <input
              name="mobile"
              type="text"
              value={fields.mobile}
              onChange={handleChange}
              required
              maxLength={11}
              placeholder="شماره موبایل"
              className="w-full md:w-[300px] h-14 px-6 rounded-full text-base font-DanaMedium 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-amber-400 
              transform transition-all duration-300 focus:scale-105"
            />
            
            <button
              type="submit"
              className="font-DanaMedium bg-mango dark:bg-elf md:text-2xl text-gray-900 dark:text-gray-50 text-sm p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700">
              ارسال
            </button>
          </form>
        </div>

        {/* Decorative Image */}
        <div className="absolute top-10 right-20 lg:top-5 lg:right-[400px] w-1/4 transform rotate-12 transition-transform duration-[3000ms] group-hover:translate-x-4 group-hover:-translate-y-4">
          <Image
            src="/images/Music-2.png"
            alt="decorative music"
            width={300}
            height={300}
            className="opacity-10"
          />
        </div>
      </div>

      <Image
        src="/images/shapes/footer-1.png"
        alt="decorative footer"
        width={1920}
        height={134}
        className="w-full"
      />
    </section>
  )
}

export default Contact
