import RoutesHeader from '@/app/ui/components/RoutesHeader'
import { fetchInstruments } from '@/lib/requests'
import InstrumentCard from '../ui/components/InstrumentCard'
import Image from 'next/image'

export const metadata = {
    title: 'آموزشگاه چهارباغ | معرفی سازها',
    description: 'این صفحه گالری عکس آموزشگاه موسیقی چهارباغ است.',
  };
  

const Instruments = async () => {
    const { instruments } = await fetchInstruments();

    return ( 
        <div className="relative w-full bg-[#F6F4EE] dark:bg-gray-900 md:z-50">
            <RoutesHeader 
                pageTitle={'سازشناسی'} 
                boldText={'آشنایی با سازهای'} 
                Highlight={'موسیقی'}
            />
            <div className="container">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-10 mb-20">
                    {instruments?.map((instrument) => (
                        <InstrumentCard instrument={instrument} key={instrument.id}/>
                    ))}
                </div>
            </div>
            <div>
                <Image 
                    width={1920} 
                    height={134} 
                    src="/images/shapes/footer-1.png" 
                    alt="shape" 
                    priority
                />
            </div>
        </div>
    )
}

export default Instruments
