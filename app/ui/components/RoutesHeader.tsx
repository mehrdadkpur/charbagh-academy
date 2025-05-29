import Navigation from '../main-page/Navigation'
import MusicRotation from '../main-page/MusicRotation'
import Image from 'next/image'

interface HeaderProps {
    pageTitle:string
    boldText:string
    Highlight:string
}

const RoutesHeader = ({pageTitle, boldText, Highlight}:HeaderProps) => {
    return ( 
        <div className="relative group bg-[#018A75] dark:bg-[#25403c] mb-12 sm:mb-16 md:mb-20 overflow-hidden">
            <Navigation/>
            <div className="flex justify-center items-center flex-col gap-y-4 sm:gap-y-5 md:gap-y-6 py-6 sm:py-8 md:py-10">
                <div className="text-base sm:text-lg text-[#F6BE56] font-Dana">
                    {pageTitle}
                </div>
                
                <div className="flex justify-center items-center flex-col 
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 
                    text-[#F6F4EE] font-MorabbaBold text-center 
                    gap-y-6 sm:gap-y-8 md:gap-y-10 py-2">
                    <span>{boldText}</span>
                    <span className="px-2 sm:px-3 py-2 sm:py-3 
                        bg-mango rounded-2xl sm:rounded-3xl text-gray-900">
                        {Highlight}
                    </span>   
                </div>
            </div>
            <MusicRotation/>
            <div className="w-full">
            <Image
              src="/images/shapes/header.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/header-dark.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
            </div>
        </div>
    );
}

export default RoutesHeader;
