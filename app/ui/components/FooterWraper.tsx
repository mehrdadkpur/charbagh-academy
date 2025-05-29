'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/app/ui/main-page/Footer'

export default function FooterWrapper() {
    const pathname = usePathname()
    
    // Routes where footer should not appear
    const noFooterRoutes = [
        '/dashboard',
        '/login',
        '/user',
    ]

    // Check if current path starts with any of the excluded routes
    const shouldHideFooter = noFooterRoutes.some(route => 
        pathname?.startsWith(route)
    )

    return !shouldHideFooter ? <Footer /> : null
}
