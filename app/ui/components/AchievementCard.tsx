import CountUp from "react-countup"

interface AchievementCardProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}

const AchievementCard = ({ number, title, description, icon }:AchievementCardProps) => (
    <div className="relative flex flex-col items-center text-center p-6">
      <div className="lg:h-[100px] text-5xl md:text-6xl lg:text-8xl font-DanaDemiBold text-mango dark:text-mango-400">
        <CountUp end={number} duration={4} />
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 top-12 lg:top-16">
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-lg transition-transform hover:scale-105">
          {icon}
        </div>
      </div>
  
      <h3 className="text-xl lg:text-2xl font-DanaDemiBold text-gray-800 dark:text-gray-100 mt-10">
        {title}
      </h3>
      
      <p className="mt-4 text-sm lg:text-base font-DanaMedium text-gray-600 dark:text-gray-500">
        {description}
      </p>
    </div>
  )

  export default AchievementCard;