import Image from "next/image"
import Link from "next/link"
import { Instrument } from "@/lib/types"
  
  const InstrumentCard = ({ instrument   }: { instrument: Instrument , } ) => (
    <Link
      href={`/instruments/${instrument.id}`}
      className="group flex flex-col justify-center items-center w-full sm:w-[290px] h-[200px] p-4 
      border-2 border-white dark:border-gray-700 rounded-2xl 
      bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm
      hover:bg-white dark:hover:bg-gray-800 
      hover:shadow-xl dark:hover:shadow-gray-900/30
      transform transition-all duration-500 ease-out
      hover:scale-105 hover:rotate-2"
    >
      <div className="flex items-center justify-between w-full gap-4 p-2">
        <h3 className="text-xl sm:text-2xl font-MorabbaBold text-gray-800 dark:text-white rtl">
          <span>ســاز</span>
          <span className="mr-2">{instrument.instrument_name}</span>
        </h3>
  
        {instrument.instrument_img && (
          <div className="w-32 h-32 flex items-center justify-center">
            <Image
              src={instrument.instrument_img} 
              alt={instrument.instrument_name} 
              width={128}
              height={128}
              className="w-32 h-40 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
      </div>
  
      <div className="mt-3 text-center">
        <p className="text-sm font-DanaMedium text-mango-400">
          {instrument.instrument_teachers.length > 0 ? (
            instrument.instrument_teachers
              .map((t) => `${t.firstname} ${t.lastname}`)
              .join(" ، ")
          ) : (
            <span className="text-gray-400">بدون استاد</span>
          )}
        </p>
</div>

    </Link>
  )
  
  export default InstrumentCard
  