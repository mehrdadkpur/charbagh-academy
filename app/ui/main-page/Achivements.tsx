'use client'

import { useRef } from "react"
import useIsVisible from '../../Hooks/useIsVisible'
import Image from "next/image"
import AchievementCard from "../components/AchievementCard"

interface AchievementData {
    number: number
    title: string
    description: string
    iconPath: string
    
}

const achievementsData: AchievementData[] = [
    {
        number: 46,
        title: "مدرس",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
        iconPath: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"   
    },
    {
        number: 987,
        title: "هنرجو",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
        iconPath: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
    },
    {
        number: 40000,
        title: "ساعت",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
        iconPath: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    },
    {
        number: 15,
        title: "سال",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
        iconPath: "M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
    },
]

const Achievements = () => {
    const elemRef = useRef<HTMLElement>(null)
    const isVisible = useIsVisible(elemRef)

    return (
        <section 
            ref={elemRef} 
            className="w-full bg-[#F6F4EE] dark:bg-[#25403c]"
        >
            {isVisible && (
                <div className="relative">
                    <div className="container mx-auto p-4">
                        <h4 className="text-xs md:text-lg font-DanaMedium text-elf dark:text-mango text-center pb-5">
                            آمار کلی سایت
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                            {achievementsData.map((item, index) => (
                                <AchievementCard 
                                    key={index} 
                                    number={item.number} 
                                    title={item.title} 
                                    description={item.description}
                                    icon={
                                        <svg 
                                            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-mango dark:text-mango-400" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d={item.iconPath} 
                                            />
                                        </svg>
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <Image
                            src="/images/shapes/vector.png"
                            alt="Decorative shape"
                            width={1920}
                            height={169}
                            className="w-full block dark:hidden"
                            priority
                        />
                        <Image
                            src="/images/shapes/vector-dark-1.png"
                            alt="Decorative shape"
                            width={1920}
                            height={169}
                            className="w-full hidden dark:block"
                            priority
                        />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Achievements
