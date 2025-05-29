import dynamic from 'next/dynamic'
import Header from '@/app/ui/main-page/Header'

const Courses = dynamic(() => import('@/app/ui/main-page/Courses'))
const Instruments = dynamic(() => import('@/app/ui/main-page/Instruments'))
const Teachers = dynamic(() => import('@/app/ui/main-page/Teachers'))
const Achievements = dynamic(() => import('@/app/ui/main-page/Achivements'))
const Comments = dynamic(() => import('@/app/ui/main-page/Comments'))
const Blogs = dynamic(() => import('@/app/ui/main-page/Blogs'))
const Contact = dynamic(() => import('@/app/ui/main-page/Contact'))

export default function MainPage() {
    return (
        <main className="overflow-hidden">
            <Header />
            <Courses />
            <Instruments />
            <Teachers />
            <Achievements />
            <Comments />
            <Blogs /> 
            <Contact />
        </main>
    )
}
